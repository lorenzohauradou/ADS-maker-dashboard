"use client"

import { useState, useCallback, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Upload,
    X,
    AlertCircle,
    Check,
    Plus,
    ArrowRight,
    Globe,
    Loader2,
    CheckCircle,
    XCircle
} from "lucide-react"
import Image from "next/image"

interface ImageFile {
    file: File
    preview: string
    id: string
}

interface ImageUploadModalProps {
    isOpen: boolean
    onClose: () => void
    onComplete: (images: File[], projectName: string, customDomain?: string, project?: any) => void
}

export function ImageUploadModal({ isOpen, onClose, onComplete }: ImageUploadModalProps) {
    const [images, setImages] = useState<ImageFile[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [projectName, setProjectName] = useState("")
    const [customDomain, setCustomDomain] = useState("")
    const [isDomainChecking, setIsDomainChecking] = useState(false)
    const [domainStatus, setDomainStatus] = useState<"idle" | "available" | "unavailable" | "error">("idle")
    const [domainPrice, setDomainPrice] = useState<number | null>(null)
    const [error, setError] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateFile = (file: File): boolean => {
        // Verifica tipo file
        if (!file.type.startsWith('image/')) {
            setError("Only image files are accepted")
            return false
        }
        // Verifica dimensione (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("File too large. Maximum 10MB per image")
            return false
        }
        return true
    }

    const checkDomainAvailability = async () => {
        if (!customDomain.trim()) return

        setIsDomainChecking(true)
        setDomainStatus("idle")
        setDomainPrice(null)

        try {
            // TODO: Implementare chiamata al backend FastAPI
            // const response = await fetch('/api/check-domain', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ domain: customDomain })
            // })
            // const result = await response.json()

            // Simulazione per ora
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Simula logica di controllo
            const isAvailable = !customDomain.includes('test') // Simula indisponibilità per domini con 'test'
            const price = customDomain.length > 8 ? 25 : 15 // Simula prezzo variabile

            if (price > 15) {
                setDomainStatus("unavailable")
                setError(`Domain "${customDomain}" costs $${price}/year (over our $15 limit)`)
            } else if (isAvailable) {
                setDomainStatus("available")
                setDomainPrice(price)
                setError("")
            } else {
                setDomainStatus("unavailable")
                setError(`Domain "${customDomain}" is not available`)
            }
        } catch (error) {
            setDomainStatus("error")
            setError("Error checking domain availability. Please try again.")
        } finally {
            setIsDomainChecking(false)
        }
    }

    const handleFileSelect = useCallback((files: FileList | null) => {
        if (!files) return

        const newFiles = Array.from(files)

        // Verifica limite massimo
        if (images.length + newFiles.length > 10) {
            setError("Maximum 10 images allowed")
            return
        }

        setError("")

        const validFiles: ImageFile[] = []

        newFiles.forEach(file => {
            if (validateFile(file)) {
                const imageFile: ImageFile = {
                    file,
                    preview: URL.createObjectURL(file),
                    id: Math.random().toString(36).substr(2, 9)
                }
                validFiles.push(imageFile)
            }
        })

        setImages(prev => [...prev, ...validFiles])
    }, [images.length])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        handleFileSelect(e.dataTransfer.files)
    }, [handleFileSelect])

    const removeImage = (id: string) => {
        setImages(prev => {
            const updated = prev.filter(img => img.id !== id)
            // Cleanup object URL
            const toRemove = prev.find(img => img.id === id)
            if (toRemove) {
                URL.revokeObjectURL(toRemove.preview)
            }
            return updated
        })
    }

    const handleSubmit = async () => {
        if (images.length === 0) {
            setError("Upload at least 1 image")
            return
        }

        if (!projectName.trim()) {
            setError("Enter a project name")
            return
        }

        // Verifica dominio se inserito
        if (customDomain.trim() && domainStatus !== "available") {
            setError("Please check domain availability before continuing")
            return
        }

        setIsUploading(true)
        setUploadProgress(0)

        try {
            // 📡 CHIAMATA REALE AL BACKEND
            const formData = new FormData()
            formData.append('name', projectName.trim())
            formData.append('product_type', 'physical')

            if (customDomain.trim() && domainStatus === "available") {
                formData.append('custom_domain', customDomain.trim())
            }

            // Aggiungi tutte le immagini
            images.forEach((img, index) => {
                formData.append('files', img.file)
            })

            // Progresso upload
            setUploadProgress(20)
            await new Promise(resolve => setTimeout(resolve, 200))

            // 🚀 Chiamata API backend per creare progetto
            const response = await fetch('/api/projects', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || `HTTP ${response.status}`)
            }

            const project = await response.json()

            setUploadProgress(80)
            await new Promise(resolve => setTimeout(resolve, 200))

            // Cleanup URLs
            images.forEach(img => URL.revokeObjectURL(img.preview))

            // ✅ Passa i dati del progetto REALE dal backend
            onComplete(
                images.map(img => img.file),
                projectName,
                domainStatus === "available" ? customDomain : undefined,
                project // Aggiungi i dati del progetto dal backend
            )

            setUploadProgress(100)

            // Reset
            setImages([])
            setProjectName("")
            setCustomDomain("")
            setDomainStatus("idle")
            setDomainPrice(null)
            setError("")
        } catch (error) {
            setError("Upload error. Please try again.")
        } finally {
            setIsUploading(false)
            setUploadProgress(0)
        }
    }

    const handleClose = () => {
        // Cleanup URLs when closing
        images.forEach(img => URL.revokeObjectURL(img.preview))
        setImages([])
        setProjectName("")
        setCustomDomain("")
        setDomainStatus("idle")
        setDomainPrice(null)
        setError("")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
                aria-describedby="dialog-description"
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center text-slate-900 dark:text-white">
                        <Image src="/fastadslogo.png" alt="FAST ADS AI Logo" width={34} height={34} className="mr-4" />
                        Create New Video Ad
                    </DialogTitle>
                    <p id="dialog-description" className="sr-only">
                        Upload images to create a new video advertisement project
                    </p>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Project Name */}
                        <div className="space-y-2">
                            <Label htmlFor="projectName" className="text-lg font-semibold text-slate-900 dark:text-white">
                                Project Name
                            </Label>
                            <Input
                                id="projectName"
                                placeholder="e.g. iPhone 15 Pro Campaign, Nike Air Shoes..."
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="text-lg p-3 rounded-xl border-2 border-slate-200 dark:border-zinc-700 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
                                disabled={isUploading}
                            />
                        </div>

                        {/* Custom Domain */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="customDomain" className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Custom Domain
                                </Label>
                                <Badge variant="outline" className="text-xs border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400">
                                    Optional
                                </Badge>
                            </div>
                            <div className="flex space-x-2">
                                <div className="flex-1 relative">
                                    <Input
                                        id="customDomain"
                                        placeholder="e.g. mystore.com, myproduct.ai..."
                                        value={customDomain}
                                        onChange={(e) => {
                                            setCustomDomain(e.target.value)
                                            setDomainStatus("idle")
                                            setDomainPrice(null)
                                        }}
                                        className="text-lg p-3 rounded-xl border-2 border-slate-200 dark:border-zinc-700 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400 pr-10"
                                        disabled={isUploading || isDomainChecking}
                                    />
                                    <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={checkDomainAvailability}
                                    disabled={!customDomain.trim() || isDomainChecking || isUploading}
                                    className="px-4 border-2 border-slate-300 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500"
                                >
                                    {isDomainChecking ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Checking...
                                        </>
                                    ) : (
                                        "Check"
                                    )}
                                </Button>
                            </div>

                            {/* Domain Status */}
                            {domainStatus === "available" && (
                                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        Available for ${domainPrice}/year
                                    </span>
                                </div>
                            )}
                            {domainStatus === "unavailable" && (
                                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                                    <XCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">Not available</span>
                                </div>
                            )}
                            {domainStatus === "error" && (
                                <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">Error checking domain</span>
                                </div>
                            )}

                            <p className="text-xs text-slate-500 dark:text-zinc-500">
                                We'll create a professional website at this domain (or temporary URL if not specified)
                            </p>
                        </div>
                    </div>

                    {/* Upload Zone */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-lg font-semibold text-slate-900 dark:text-white">
                                Upload Product Images
                            </Label>
                            <Badge variant="outline" className="text-sm border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-400">
                                {images.length}/10 images
                            </Badge>
                        </div>

                        {/* Drag & Drop Area */}
                        <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${isDragging
                                ? "border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/20"
                                : "border-slate-300 dark:border-zinc-700 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {images.length === 0 ? (
                                // Empty state - show upload instructions
                                <div className="space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                        <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                    </div>

                                    <div>
                                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                            Drag and drop your images here
                                        </p>
                                        <p className="text-slate-600 dark:text-zinc-400">
                                            or{" "}
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300"
                                                disabled={isUploading}
                                            >
                                                click here to select
                                            </button>
                                        </p>
                                    </div>

                                    <div className="text-sm text-slate-500 dark:text-zinc-500 space-y-1">
                                        <p>Supported formats: JPG, PNG, WebP</p>
                                        <p>Maximum size: 10MB per image</p>
                                        <p>Minimum 1 image, maximum 10</p>
                                    </div>
                                </div>
                            ) : (
                                // Images uploaded - show grid with add more option
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            Uploaded Images ({images.length})
                                        </h3>
                                        {images.length < 10 && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={isUploading}
                                                className="text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add More
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {images.map((image) => (
                                            <Card key={image.id} className="relative group overflow-hidden bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700">
                                                <img
                                                    src={image.preview}
                                                    alt="Preview"
                                                    className="w-full h-32 object-cover"
                                                />

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeImage(image.id)}
                                                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    disabled={isUploading}
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>

                                                {/* File Info */}
                                                <div className="p-2 bg-white dark:bg-zinc-800 border-t border-slate-200 dark:border-zinc-700">
                                                    <p className="text-xs text-slate-600 dark:text-zinc-400 truncate">
                                                        {image.file.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-zinc-500">
                                                        {(image.file.size / 1024 / 1024).toFixed(1)} MB
                                                    </p>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>

                                    <div className="text-sm text-slate-500 dark:text-zinc-500 text-center border-t border-slate-200 dark:border-zinc-700 pt-4">
                                        <p>Drag and drop more images here or click "Add More" to continue</p>
                                    </div>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleFileSelect(e.target.files)}
                                className="hidden"
                                disabled={isUploading}
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            <span className="text-red-700 dark:text-red-300 font-medium">{error}</span>
                        </div>
                    )}

                    {/* Upload Progress */}
                    {isUploading && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-900 dark:text-white">Upload in progress...</span>
                                <span className="text-sm text-slate-600 dark:text-zinc-400">{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} className="h-2" />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-zinc-700">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="px-6 border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800"
                        >
                            {isUploading ? "Close Window" : "Cancel"}
                        </Button>

                        <Button
                            onClick={handleSubmit}
                            disabled={images.length === 0 || !projectName.trim() || isUploading}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
                        >
                            {isUploading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    Continue
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Features Preview */}
                    {!isUploading && images.length > 0 && (
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                                <Check className="w-5 h-5 mr-2" />
                                What will happen next:
                            </h4>
                            <div className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                                <p>• AI will analyze your images to understand the product</p>
                                <p>• It will create a professional landing page automatically</p>
                                {customDomain && domainStatus === "available" && (
                                    <p>• Your custom domain "{customDomain}" will be configured</p>
                                )}
                                <p>• It will generate an optimized video ads for social</p>
                                <p>• Estimated time: 3-5 minutes</p>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
} 