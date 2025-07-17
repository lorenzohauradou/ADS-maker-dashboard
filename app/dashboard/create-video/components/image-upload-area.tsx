"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"

interface ImageUploadAreaProps {
    onImagesChange: (files: File[]) => void
    selectedImages: File[]
    maxImages?: number
}

export function ImageUploadArea({ onImagesChange, selectedImages, maxImages = 10 }: ImageUploadAreaProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (files: FileList) => {
        const newImages = Array.from(files).filter(file =>
            file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024 // 10MB limit
        )

        if (newImages.length + selectedImages.length > maxImages) {
            toast.error(`Maximum ${maxImages} images allowed`)
            return
        }

        const allImages = [...selectedImages, ...newImages]
        onImagesChange(allImages)
    }

    const removeImage = (index: number) => {
        const newImages = selectedImages.filter((_, i) => i !== index)
        onImagesChange(newImages)
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Upload Area - Stile Creatify più compatto */}
            <div
                className="relative border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-gray-500 transition-colors cursor-pointer bg-gray-900/20"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault()
                    const files = e.dataTransfer.files
                    if (files.length > 0) {
                        handleImageUpload(files)
                    }
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files) {
                            handleImageUpload(e.target.files)
                        }
                    }}
                />

                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>

                    <div className="space-y-2">
                        <p className="text-lg font-medium text-white">
                            Click or drag an image to upload
                        </p>
                        <p className="text-sm text-gray-400">
                            Upload image up to 50 MB
                        </p>
                    </div>
                </div>
            </div>

            {/* Selected Images */}
            {selectedImages.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedImages.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Selected ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg bg-gray-800"
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white p-1 h-8 w-8"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 