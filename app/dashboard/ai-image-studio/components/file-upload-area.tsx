import { useState, useRef } from "react"
import { Sparkles, Upload, Camera, ImageIcon, Loader2 } from "lucide-react"
import { FileUploadProps } from "../types"

export const FileUploadArea = ({ onImageUpload, isUploading }: FileUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const cameraInputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleFileSelect = (files: FileList) => {
        const file = files[0]
        if (file && file.type.startsWith('image/')) {
            onImageUpload(file)
        }
    }

    const handleCameraCapture = () => {
        cameraInputRef.current?.click()
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleFileSelect(files)
        }
    }

    return (
        <div className="w-full">
            <div
                className={`
                    relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
                    ${isDragging
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 shadow-lg transform scale-[1.02]'
                        : 'border-slate-300 dark:border-zinc-700 hover:border-slate-400 dark:hover:border-zinc-600'
                    }
                    ${isUploading ? 'pointer-events-none opacity-50' : 'hover:shadow-md'}
                    bg-gradient-to-br from-slate-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-800/50
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Hidden file inputs */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files) {
                            handleFileSelect(e.target.files)
                        }
                    }}
                />
                <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files) {
                            handleFileSelect(e.target.files)
                        }
                    }}
                />

                <div className="space-y-8">
                    <div className="text-center">
                        {/* Upload Icon */}
                        <div className="relative mx-auto mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-sm" />
                                {isUploading ? (
                                    <Loader2 className="w-10 h-10 text-white animate-spin relative z-10" />
                                ) : (
                                    <ImageIcon className="w-10 h-10 text-white relative z-10" />
                                )}
                            </div>

                            {/* Floating decoration */}
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                <Sparkles className="w-3 h-3 text-white" />
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                {isUploading ? 'Uploading...' : 'Add your product photo'}
                            </h3>
                            <p className="text-slate-600 dark:text-zinc-400 text-lg">
                                Drag & drop or choose how to add your image
                            </p>
                        </div>
                    </div>

                    {/* Upload Options */}
                    <div className="space-y-4">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                                group cursor-pointer p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg
                                border-slate-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 
                                bg-white dark:bg-zinc-900/50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100/50 
                                dark:hover:from-blue-900/20 dark:hover:to-blue-800/10
                                ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                                        <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm" />
                                        <Upload className="w-6 h-6 relative z-10" />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-1">
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        Browse Files
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={handleCameraCapture}
                            className={`
                                group cursor-pointer md:hidden p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg
                                border-slate-200 dark:border-zinc-700 hover:border-green-300 dark:hover:border-green-600 
                                bg-white dark:bg-zinc-900/50 hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100/50 
                                dark:hover:from-green-900/20 dark:hover:to-green-800/10
                                ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                                        <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm" />
                                        <Camera className="w-6 h-6 relative z-10" />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-1">
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                        Take Photo
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File Info */}
                    <div className="bg-slate-100/50 dark:bg-zinc-800/50 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-zinc-400">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium">Supports JPEG, PNG, WebP, HEIC</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-zinc-500">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm">Maximum size: 10MB</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-zinc-500">
                                <span className="text-sm">📱 Mobile photos automatically converted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 