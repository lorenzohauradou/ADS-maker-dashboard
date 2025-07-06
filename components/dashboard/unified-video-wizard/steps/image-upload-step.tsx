"use client"

import { useState, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Upload,
    X,
    Image as ImageIcon,
    CheckCircle,
    AlertCircle,
    Plus,
    Camera
} from "lucide-react"
import { toast } from "sonner"

interface ImageFile {
    file: File
    preview: string
    id: string
}

interface ImageUploadStepProps {
    images: ImageFile[]
    projectName: string
    onImagesUpdate: (images: ImageFile[], projectName: string) => void
    onContinue?: () => void
}

export function ImageUploadStep({ images, projectName, onImagesUpdate, onContinue }: ImageUploadStepProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateFile = (file: File): boolean => {
        // Check file type
        if (!file.type.startsWith('image/')) {
            setError("Only image files are accepted")
            return false
        }
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("File too large. Maximum 10MB per image")
            return false
        }
        return true
    }

    const handleFileSelect = useCallback((files: FileList | null) => {
        if (!files) return

        const newFiles = Array.from(files)

        // Check maximum limit
        if (images.length + newFiles.length > 6) {
            setError("Maximum 6 images allowed")
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

        const updatedImages = [...images, ...validFiles]
        onImagesUpdate(updatedImages, projectName)

        if (validFiles.length > 0) {
            toast.success(`${validFiles.length} image(s) added!`)
        }
    }, [images, projectName, onImagesUpdate])

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
        const imageToRemove = images.find(img => img.id === id)
        if (imageToRemove) {
            URL.revokeObjectURL(imageToRemove.preview)
        }

        const updatedImages = images.filter(img => img.id !== id)
        onImagesUpdate(updatedImages, projectName)

        toast.success("Image removed")
    }

    const handleProjectNameChange = (name: string) => {
        onImagesUpdate(images, name)
    }

    // Check if user can proceed (project name + at least 1 image)
    const canProceed = () => {
        return projectName.trim() !== "" && images.length > 0
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Add Your Product Content
                </h2>
                <p className="text-gray-600 dark:text-slate-400 max-w-lg mx-auto">
                    Upload your product images and give your project a name
                </p>
            </div>

            {/* Project Details */}
            <Card className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-slate-900/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <div className="space-y-4">
                    <Label className="text-lg font-bold text-slate-900 dark:text-white">
                        Project Name *
                    </Label>
                    <Input
                        placeholder="e.g., Magic Moon Lamp"
                        value={projectName}
                        onChange={(e) => handleProjectNameChange(e.target.value)}
                        className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 text-lg"
                    />
                </div>
            </Card>

            {/* Upload Area */}
            <Card className="border-2 border-dashed rounded-xl overflow-hidden">
                <div
                    className={`p-8 transition-all duration-300 ${isDragging
                        ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30"
                        : "border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-slate-800"
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {images.length === 0 ? (
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                                <Upload className="w-10 h-10 text-white" />
                            </div>

                            <div>
                                <p className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                    Drag and drop images here
                                </p>
                                <p className="text-slate-600 dark:text-slate-400">
                                    or{" "}
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 underline"
                                    >
                                        click to select
                                    </button>
                                </p>
                            </div>

                            <div className="text-sm text-slate-500 dark:text-slate-500 space-y-1">
                                <p>📱 Supported formats: JPG, PNG, WebP</p>
                                <p>📏 Maximum size: 10MB per image</p>
                                <p>🔢 At least 1 image required, maximum 6 images</p>
                            </div>

                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                variant="outline"
                                className="mt-4 border-2 border-dashed border-blue-300 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-500 text-blue-600 dark:text-blue-400"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Images
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold text-slate-900 dark:text-white">
                                        {images.length} Image{images.length !== 1 ? 's' : ''} Added
                                    </span>
                                </div>
                                <Button
                                    onClick={() => fileInputRef.current?.click()}
                                    variant="outline"
                                    size="sm"
                                    className="text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add More
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {images.map((image) => (
                                    <div key={image.id} className="relative group">
                                        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                            <img
                                                src={image.preview}
                                                alt="Product"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeImage(image.id)}
                                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Error Display */}
            {error && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

            {/* Progress Indicator */}
            {canProceed() && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                            <p className="font-semibold text-green-800 dark:text-green-200">
                                Ready to proceed!
                            </p>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Project with {images.length} image{images.length !== 1 ? 's' : ''} ready
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileSelect(e.target.files)}
                multiple
                accept="image/*"
                className="hidden"
            />
        </div>
    )
} 