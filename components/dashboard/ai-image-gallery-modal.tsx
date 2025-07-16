"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, Calendar, Sparkles, ImageIcon, Check } from "lucide-react"
import { toast } from "sonner"

interface AIGeneratedImage {
    id: number
    original_image_url: string
    generated_image_url: string
    generated_filename: string
    style_id: string | null
    custom_prompt: string | null
    dynamic_prompt: string | null
    image_size: string
    image_quality: string
    image_format: string
    created_at: string
    thumbnail_url: string
    original_filename: string | null
}

interface AIImageGalleryModalProps {
    isOpen: boolean
    onClose: () => void
    onSelectImage: (imageUrl: string, filename: string) => void
}

export function AIImageGalleryModal({ isOpen, onClose, onSelectImage }: AIImageGalleryModalProps) {
    const [images, setImages] = useState<AIGeneratedImage[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)

    const fetchImages = async (offset: number = 0, reset: boolean = false) => {
        setIsLoading(true)
        try {
            const response = await fetch(`/api/ai-images/user-images?limit=20&offset=${offset}`)

            if (!response.ok) {
                throw new Error('Failed to fetch images')
            }

            const result = await response.json()

            if (result.success && result.data) {
                if (reset) {
                    setImages(result.data.images)
                } else {
                    setImages(prev => [...prev, ...result.data.images])
                }
                setHasMore(result.data.page_info.has_more)
            } else {
                throw new Error(result.error || 'Failed to fetch images')
            }
        } catch (error) {
            console.error('Error fetching images:', error)
            toast.error('Failed to load images')
        } finally {
            setIsLoading(false)
        }
    }

    const loadMore = () => {
        const nextOffset = (page + 1) * 20
        setPage(prev => prev + 1)
        fetchImages(nextOffset)
    }

    useEffect(() => {
        if (isOpen) {
            setImages([])
            setPage(0)
            setHasMore(true)
            setSelectedImageId(null)
            fetchImages(0, true)
        }
    }, [isOpen])

    const filteredImages = images.filter(image => {
        if (!searchTerm) return true

        const searchLower = searchTerm.toLowerCase()
        return (
            image.generated_filename.toLowerCase().includes(searchLower) ||
            image.style_id?.toLowerCase().includes(searchLower) ||
            image.custom_prompt?.toLowerCase().includes(searchLower) ||
            image.original_filename?.toLowerCase().includes(searchLower)
        )
    })

    const handleImageClick = (image: AIGeneratedImage) => {
        setSelectedImageId(image.id)
    }

    const handleImageDoubleClick = (image: AIGeneratedImage) => {
        onSelectImage(image.generated_image_url, image.generated_filename)
        onClose()
        toast.success('Image selected from AI Image Studio!')
    }

    const handleUseSelectedImage = () => {
        const selectedImage = images.find(img => img.id === selectedImageId)
        if (selectedImage) {
            onSelectImage(selectedImage.generated_image_url, selectedImage.generated_filename)
            onClose()
            toast.success('Image selected from AI Image Studio!')
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStyleLabel = (styleId: string | null) => {
        const styleLabels: { [key: string]: string } = {
            'clean-studio': 'Clean Studio',
            'dramatic-lighting': 'Dramatic Lighting',
            'lifestyle-context': 'Lifestyle Context',
            'transparent-bg': 'Transparent Background',
            'ecommerce-ready': 'E-commerce Ready',
            'premium-luxury': 'Premium Luxury'
        }
        return styleId ? styleLabels[styleId] || styleId : 'Custom'
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl h-[85vh] bg-zinc-900 text-white border-zinc-700">
                <DialogHeader className="pb-4">
                    <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-amber-500" />
                        Choose an image from AI Image Studio
                    </DialogTitle>
                    <p className="text-zinc-400 text-sm">
                        Click to select an image, double-click to use immediately
                    </p>
                </DialogHeader>

                <div className="flex flex-col h-full">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                        <Input
                            placeholder="Search by file name, style or prompt..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>

                    {/* Images Grid */}
                    <div className="flex-1">
                        <ScrollArea className="h-full pr-4">
                            {filteredImages.length === 0 && !isLoading ? (
                                <div className="text-center py-16 text-zinc-400">
                                    <ImageIcon className="w-20 h-20 mx-auto mb-4 opacity-50" />
                                    <p className="text-xl mb-2">No images found</p>
                                    <p className="text-sm">
                                        {searchTerm ? 'Try a different search term' : 'Create your first image in AI Image Studio'}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 gap-4">
                                    {filteredImages.map((image) => (
                                        <div
                                            key={image.id}
                                            className={`group relative bg-zinc-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${selectedImageId === image.id
                                                    ? 'ring-2 ring-amber-500 shadow-lg shadow-amber-500/20'
                                                    : 'hover:ring-2 hover:ring-amber-500/50'
                                                }`}
                                            onClick={() => handleImageClick(image)}
                                            onDoubleClick={() => handleImageDoubleClick(image)}
                                        >
                                            <div className="aspect-square relative">
                                                <img
                                                    src={image.thumbnail_url}
                                                    alt={image.generated_filename}
                                                    className="w-full h-full object-cover"
                                                />

                                                {/* Selection Indicator */}
                                                {selectedImageId === image.id && (
                                                    <div className="absolute top-2 right-2 bg-amber-500 rounded-full p-1">
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                )}

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                                                {/* Style Badge */}
                                                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <Badge variant="secondary" className="text-xs bg-black/70 text-white border-none">
                                                        {getStyleLabel(image.style_id)}
                                                    </Badge>
                                                </div>

                                                {/* Date */}
                                                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <span className="text-xs text-white/80 flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                                                        <Calendar className="w-3 h-3" />
                                                        {formatDate(image.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Load More Button */}
                            {hasMore && !isLoading && filteredImages.length > 0 && (
                                <div className="mt-8 text-center">
                                    <Button
                                        onClick={loadMore}
                                        variant="outline"
                                        className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700 hover:border-amber-500 transition-colors"
                                    >
                                        Load more images
                                    </Button>
                                </div>
                            )}

                            {/* Loading Indicator */}
                            {isLoading && (
                                <div className="flex justify-center items-center py-12">
                                    <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                                    <span className="ml-2 text-zinc-400">Loading images...</span>
                                </div>
                            )}
                        </ScrollArea>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-zinc-700">
                        <p className="text-sm text-zinc-400">
                            {selectedImageId ? 'Image selected' : 'Select an image to continue'}
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUseSelectedImage}
                                disabled={!selectedImageId}
                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Use Selected Image
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 