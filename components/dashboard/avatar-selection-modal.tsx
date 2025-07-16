"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, User, Users, X, Crown } from "lucide-react"
import { toast } from "sonner"

interface Avatar {
    id: string
    name: string
    gender: 'male' | 'female'
    preview_url: string
    thumbnail_url: string
    is_premium: boolean
    voice_id?: string
    description?: string
}

interface AvatarSelectionModalProps {
    isOpen: boolean
    onClose: () => void
    onSelectAvatar: (avatarId: string, avatarName: string) => void
    selectedAvatarId?: string
}

export function AvatarSelectionModal({ isOpen, onClose, onSelectAvatar, selectedAvatarId }: AvatarSelectionModalProps) {
    const [avatars, setAvatars] = useState<Avatar[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null)
    const [displayedAvatars, setDisplayedAvatars] = useState<Avatar[]>([])
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
    const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const AVATARS_PER_PAGE = 6

    const fetchAvatars = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/creatify/avatars')

            if (!response.ok) {
                throw new Error('Failed to fetch avatars')
            }

            const result = await response.json()

            if (result.success && result.avatars) {
                const processedAvatars = mapAvatarsFromAPI(result.avatars)

                setAvatars(processedAvatars)
                // Carica i primi avatar
                setDisplayedAvatars(processedAvatars.slice(0, AVATARS_PER_PAGE))
                setHasMore(processedAvatars.length > AVATARS_PER_PAGE)
                setPage(0)
            } else {
                throw new Error(result.error || 'Failed to fetch avatars')
            }
        } catch (error) {
            console.error('Error fetching avatars:', error)
            toast.error('Error loading avatars')
            // Fallback ai dati mock
            const mockAvatars = getMockAvatars()
            setAvatars(mockAvatars)
            setDisplayedAvatars(mockAvatars.slice(0, AVATARS_PER_PAGE))
            setHasMore(mockAvatars.length > AVATARS_PER_PAGE)
            setPage(0)
        } finally {
            setIsLoading(false)
        }
    }

    // Funzione per mappare i dati dall'API (presa da avatar-config-step.tsx)
    const mapAvatarsFromAPI = (apiAvatars: any[]): Avatar[] => {
        return apiAvatars
            .filter((apiAvatar: any) => apiAvatar.is_active !== false) // Filtra solo quelli attivi
            .map((apiAvatar: any) => ({
                id: apiAvatar.id || apiAvatar.avatar_id || `avatar_${Math.random().toString(36).substr(2, 9)}`,
                name: apiAvatar.creator_name || apiAvatar.name || apiAvatar.display_name || `Avatar ${apiAvatar.id?.slice(0, 8) || 'Unknown'}`,
                gender: mapGender(apiAvatar.gender),
                preview_url: apiAvatar.preview_image_1_1 || apiAvatar.preview_image_16_9 || apiAvatar.preview_url || apiAvatar.avatar_url || "/placeholder-user.jpg",
                thumbnail_url: apiAvatar.preview_image_1_1 || apiAvatar.preview_image_16_9 || apiAvatar.thumbnail_url || apiAvatar.preview_url || apiAvatar.avatar_url || "/placeholder-user.jpg",
                is_premium: apiAvatar.is_premium || false,
                voice_id: apiAvatar.voice_id,
                description: apiAvatar.bio || apiAvatar.description || mapStyle(apiAvatar.style, apiAvatar.video_scene)
            }))
    }

    // Funzioni di mappatura (prese da avatar-config-step.tsx)
    const mapGender = (apiGender: string): 'male' | 'female' => {
        switch (apiGender) {
            case 'm': return 'male'
            case 'f': return 'female'
            case 'male': return 'male'
            case 'female': return 'female'
            default: return 'male'
        }
    }

    const mapStyle = (apiStyle: string, scene?: string): string => {
        const baseStyle = apiStyle === 'presenter' ? 'Professional Presenter' :
            apiStyle === 'selfie' ? 'Casual Speaker' : 'Versatile Host'

        if (scene) {
            return `${baseStyle} - ${scene.charAt(0).toUpperCase() + scene.slice(1)}`
        }
        return baseStyle
    }

    // Dati mock come fallback
    const getMockAvatars = (): Avatar[] => {
        return [
            {
                id: "mock_avatar_1",
                name: "Sarah Professional",
                gender: "female" as const,
                preview_url: "/avatar1.png",
                thumbnail_url: "/avatar1.png",
                is_premium: false,
                description: "Professional presenter"
            },
            {
                id: "mock_avatar_2",
                name: "Marco Casual",
                gender: "male" as const,
                preview_url: "/avatar2.png",
                thumbnail_url: "/avatar2.png",
                is_premium: false,
                description: "Friendly presenter"
            },
            {
                id: "mock_avatar_3",
                name: "Elena Tech",
                gender: "female" as const,
                preview_url: "/avatar3.png",
                thumbnail_url: "/avatar3.png",
                is_premium: false,
                description: "Tech speaker"
            },
            {
                id: "mock_avatar_4",
                name: "David Executive",
                gender: "male" as const,
                preview_url: "/avatar4.png",
                thumbnail_url: "/avatar4.png",
                is_premium: false,
                description: "Executive presenter"
            }
        ]
    }

    const loadMoreAvatars = () => {
        if (page >= Math.ceil(avatars.length / AVATARS_PER_PAGE) - 1) {
            setHasMore(false)
            return
        }

        const nextPage = page + 1
        const startIndex = nextPage * AVATARS_PER_PAGE
        const endIndex = startIndex + AVATARS_PER_PAGE

        const newAvatars = avatars.slice(startIndex, endIndex)
        if (newAvatars.length > 0) {
            setDisplayedAvatars(prev => [...prev, ...newAvatars])
            setPage(nextPage)
            setHasMore(endIndex < avatars.length)

            // Scroll automatico verso i nuovi avatar caricati
            setTimeout(() => {
                const scrollContainer = document.querySelector('.scrollable-avatar-container')
                if (scrollContainer) {
                    const lastAvatarElement = scrollContainer.querySelector(`[data-avatar-id="${newAvatars[newAvatars.length - 1].id}"]`)
                    if (lastAvatarElement) {
                        lastAvatarElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                }
            }, 100)
        } else {
            setHasMore(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            setDisplayedAvatars([])
            setLoadedImages(new Set())
            setFailedImages(new Set())
            setPage(0)
            setHasMore(true)
            fetchAvatars()
        }
    }, [isOpen])

    useEffect(() => {
        if (selectedAvatarId && avatars.length > 0) {
            const avatar = avatars.find(a => a.id === selectedAvatarId)
            if (avatar) {
                setSelectedAvatar(avatar)
            }
        }
    }, [selectedAvatarId, avatars])

    const filteredAvatars = displayedAvatars.filter(avatar => {
        if (!searchTerm) return true

        const searchLower = searchTerm.toLowerCase()
        return (
            avatar.name.toLowerCase().includes(searchLower) ||
            avatar.gender.toLowerCase().includes(searchLower) ||
            avatar.description?.toLowerCase().includes(searchLower)
        )
    })



    const getAvatarImageUrl = (avatar: Avatar) => {
        if (failedImages.has(avatar.id)) {
            return `/placeholder-user.jpg` // Fallback image
        }
        return avatar.thumbnail_url || avatar.preview_url || `/placeholder-user.jpg`
    }



    const handleImageLoadSuccess = (avatarId: string) => {
        setLoadedImages(prev => new Set(prev).add(avatarId))
        setFailedImages(prev => {
            const newSet = new Set(prev)
            newSet.delete(avatarId) // Rimuovi da failed se ora carica
            return newSet
        })
    }

    const handleImageLoadError = (avatarId: string) => {
        setFailedImages(prev => new Set(prev).add(avatarId))
        setLoadedImages(prev => {
            const newSet = new Set(prev)
            newSet.delete(avatarId) // Rimuovi da loaded
            return newSet
        })
    }

    const handleAvatarSelect = (avatar: Avatar) => {
        setSelectedAvatar(avatar)
    }

    const handleUseAvatar = () => {
        if (selectedAvatar) {
            onSelectAvatar(selectedAvatar.id, selectedAvatar.name)
            onClose()
            toast.success('Avatar selected successfully!')
        }
    }

    const getGenderIcon = (gender: 'male' | 'female') => {
        return gender === 'male' ? '👨' : '👩'
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl h-[90vh] bg-zinc-900 text-white border-zinc-700">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-500" />
                        Select an Avatar
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col h-full overflow-hidden">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                        <Input
                            placeholder="Search by name, gender, or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400"
                        />
                    </div>

                    <div className="flex-1 flex gap-6 min-h-0">
                        {/* Avatars Grid */}
                        <div className="flex-1 min-h-0">
                            <ScrollArea className="h-full scrollable-avatar-container">
                                {filteredAvatars.length === 0 && !isLoading ? (
                                    <div className="text-center py-12 text-zinc-400">
                                        <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg">No avatars found</p>
                                        <p className="text-sm mt-2">
                                            {searchTerm ? 'Try a different search term' : 'No avatars available'}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-4 gap-3 p-2">
                                        {filteredAvatars.map((avatar) => (
                                            <div
                                                key={avatar.id}
                                                data-avatar-id={avatar.id}
                                                className={`group relative bg-zinc-800 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedAvatar?.id === avatar.id ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-500/50'
                                                    }`}
                                                onClick={() => handleAvatarSelect(avatar)}
                                            >
                                                <div className="aspect-square relative">
                                                    {failedImages.has(avatar.id) ? (
                                                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex flex-col items-center justify-center">
                                                            <User className="w-12 h-12 text-blue-500 mb-2" />
                                                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium text-center px-2 leading-tight">
                                                                {avatar.name}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={getAvatarImageUrl(avatar)}
                                                            alt={avatar.name}
                                                            className={`w-full h-full object-cover transition-opacity ${loadedImages.has(avatar.id) ? 'opacity-100' : 'opacity-0'
                                                                }`}
                                                            onLoad={() => handleImageLoadSuccess(avatar.id)}
                                                            onError={() => handleImageLoadError(avatar.id)}
                                                        />
                                                    )}
                                                    {!loadedImages.has(avatar.id) && !failedImages.has(avatar.id) && (
                                                        <div className="absolute inset-0 bg-zinc-700 flex items-center justify-center">
                                                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                        </div>
                                                    )}
                                                    {avatar.is_premium && (
                                                        <div className="absolute top-2 left-2">
                                                            <Crown className="w-4 h-4 text-amber-500" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            className="bg-white/90 text-black hover:bg-white"
                                                        >
                                                            Select
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-300 px-1">
                                                            {getGenderIcon(avatar.gender)}
                                                        </Badge>
                                                        {avatar.is_premium && (
                                                            <Crown className="w-3 h-3 text-amber-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-zinc-300 truncate font-medium">
                                                        {avatar.name}
                                                    </p>
                                                    {avatar.description && (
                                                        <p className="text-xs text-zinc-400 truncate mt-1 leading-tight">
                                                            {avatar.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Load More Button */}
                                {hasMore && !isLoading && filteredAvatars.length > 0 && !searchTerm && displayedAvatars.length < avatars.length && (
                                    <div className="col-span-4 text-center mt-6">
                                        <Button
                                            onClick={loadMoreAvatars}
                                            variant="outline"
                                            className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700 px-6 py-2"
                                        >
                                            Load more avatars ({displayedAvatars.length}/{avatars.length})
                                        </Button>
                                    </div>
                                )}

                                {/* Messaggio quando tutti gli avatar sono caricati */}
                                {!hasMore && avatars.length > AVATARS_PER_PAGE && !searchTerm && (
                                    <div className="col-span-4 text-center mt-4">
                                        <p className="text-zinc-400 text-sm">
                                            All {avatars.length} avatars loaded
                                        </p>
                                    </div>
                                )}

                                {/* Loading Indicator */}
                                {isLoading && (
                                    <div className="flex justify-center items-center py-8">
                                        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                                        <span className="ml-2 text-zinc-400">Loading avatars...</span>
                                    </div>
                                )}
                            </ScrollArea>
                        </div>

                        {/* Avatar Preview */}
                        {selectedAvatar && (
                            <div className="w-72 bg-zinc-800 rounded-lg p-4 flex-shrink-0">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white">Preview</h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedAvatar(null)}
                                        className="text-zinc-400 hover:text-white"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                                    <img
                                        src={selectedAvatar.preview_url || `/placeholder-user.jpg`}
                                        alt={selectedAvatar.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = `/placeholder-user.jpg`
                                        }}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-zinc-300">Name:</label>
                                        <p className="text-sm text-zinc-400">{selectedAvatar.name}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-zinc-300">Gender:</label>
                                        <p className="text-sm text-zinc-400 capitalize flex items-center gap-1">
                                            {getGenderIcon(selectedAvatar.gender)} {selectedAvatar.gender}
                                        </p>
                                    </div>

                                    {selectedAvatar.description && (
                                        <div>
                                            <label className="text-sm font-medium text-zinc-300">Description:</label>
                                            <p className="text-sm text-zinc-400">{selectedAvatar.description}</p>
                                        </div>
                                    )}

                                    {selectedAvatar.voice_id && (
                                        <div>
                                            <label className="text-sm font-medium text-zinc-300">Voice ID:</label>
                                            <p className="text-sm text-zinc-400">{selectedAvatar.voice_id}</p>
                                        </div>
                                    )}

                                    {selectedAvatar.is_premium && (
                                        <div className="flex items-center gap-2 p-2 bg-amber-500/10 rounded-lg">
                                            <Crown className="w-4 h-4 text-amber-500" />
                                            <span className="text-sm text-amber-400">Premium Avatar</span>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    onClick={handleUseAvatar}
                                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                                >
                                    <Users className="w-4 h-4 mr-2" />
                                    Use this Avatar
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 