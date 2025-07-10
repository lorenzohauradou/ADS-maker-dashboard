"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    ExternalLink,
    Download,
    Globe,
    Video,
    MonitorPlay,
    X,
    Calendar,
    Clock,
    Settings,
    Sparkles,
    Wand2,
    Upload
} from "lucide-react"
import Image from "next/image"
import { format } from 'date-fns'
import { Project } from "@/types/project"

interface VideoPreviewModalProps {
    isOpen: boolean
    onClose: () => void
    project: Project | null
}

export function VideoPreviewModal({ isOpen, onClose, project }: VideoPreviewModalProps) {
    // Ref per il video element
    const videoRef = useRef<HTMLVideoElement>(null)

    // Stati per gestire i modali
    const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false)
    const [isWebsiteConfigModalOpen, setIsWebsiteConfigModalOpen] = useState(false)

    // Stati per upload immagini
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [isUploading, setIsUploading] = useState(false)

    // Stati per configurazione sito
    const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'elegant'>('modern')
    const [selectedAiStyle, setSelectedAiStyle] = useState<'professional' | 'casual' | 'creative'>('professional')
    const [isGenerating, setIsGenerating] = useState(false)

    if (!project) return null

    const handleClose = () => {
        // Reset all modal states when closing
        setIsImageUploadModalOpen(false)
        setIsWebsiteConfigModalOpen(false)
        setUploadedFiles([])
        setIsUploading(false)
        setIsGenerating(false)
        setSelectedTemplate('modern')
        setSelectedAiStyle('professional')
        onClose()
    }

    const handleDownload = () => {
        if (project.video?.url && !project.video.url.startsWith('processing_')) {
            const link = document.createElement('a')
            link.href = project.video.url
            link.download = `${project.name}_video.mp4`
            link.click()
        }
    }

    const handleGenerateWebsite = () => {
        // Se il progetto non ha immagini, mostra prima il modale di upload
        if (project.image_count === 0) {
            setIsImageUploadModalOpen(true)
        } else {
            // Altrimenti vai direttamente alla configurazione del sito
            setIsWebsiteConfigModalOpen(true)
        }
    }

    const handleImageUploadComplete = async () => {
        if (uploadedFiles.length === 0) {
            alert('Please select at least one image')
            return
        }

        setIsUploading(true)

        try {
            const formData = new FormData()
            uploadedFiles.forEach((file) => {
                formData.append('files', file)
            })

            const response = await fetch(`/api/projects/${project.id}/upload-additional-images`, {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to upload images')
            }

            console.log('✅ Images uploaded successfully:', data)

            // Update project image count locally
            project.image_count = data.total_images

            setIsImageUploadModalOpen(false)
            setIsWebsiteConfigModalOpen(true)
            setUploadedFiles([])

        } catch (error) {
            console.error('❌ Error uploading images:', error)
            alert(`Error uploading images: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setIsUploading(false)
        }
    }

    const handleWebsiteConfigComplete = async () => {
        setIsGenerating(true)

        try {
            const response = await fetch(`/api/projects/${project.id}/generate-website`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    template_style: selectedTemplate,
                    ai_style: selectedAiStyle,
                    color_scheme: 'auto'
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate website')
            }

            console.log('✅ Website generated successfully:', data)

            // Update project with new site URL
            project.site_url = data.site_url

            setIsWebsiteConfigModalOpen(false)

            // Show success message and trigger a refresh of the parent component
            alert(`Website generated successfully! You can now visit it.`)

            // Optionally trigger a refresh of the project data in the parent component
            // This could be done via a callback prop if needed

        } catch (error) {
            console.error('❌ Error generating website:', error)
            alert(`Error generating website: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setIsGenerating(false)
        }
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files)
            setUploadedFiles(files)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-4 transition-all duration-500"
                aria-describedby="video-preview-description"
            >
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-lg sm:text-2xl font-bold flex items-center text-slate-900 dark:text-white">
                        <Image src="/fastadslogo.png" alt="FAST ADS AI Logo" width={24} height={24} className="mr-3" />
                        <span className="truncate">{project.name}</span>
                    </DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-zinc-400">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {format(new Date(project.created_at), 'dd/MM/yyyy HH:mm')}
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {project.video?.duration ? `${Math.round(project.video.duration)}s` : 'N/A'}
                        </div>
                        <div className="flex items-center">
                            <Settings className="w-4 h-4 mr-1" />
                            {project.product_type}
                        </div>
                    </div>
                    <p id="video-preview-description" className="sr-only">
                        Video advertisement preview with download options and landing page access
                    </p>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Video Player */}
                    {project.video?.url &&
                        !project.video.url.startsWith('processing_') &&
                        !project.video.url.startsWith('pending_') ? (
                        <Card className="bg-black rounded-xl overflow-hidden relative">
                            <div className="relative aspect-video">
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover"
                                    controls
                                    preload="metadata"
                                    onError={(e) => {
                                        console.error("Video failed to load:", project.video?.url || 'No URL', e)
                                    }}
                                    onLoadedMetadata={(e) => {
                                        const video = e.target as HTMLVideoElement
                                        console.log(`Video dimensions: ${video.videoWidth}x${video.videoHeight}`)
                                    }}
                                >
                                    <source src={project.video?.url || ''} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                {/* Video Info Overlay */}
                                <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                    {project.name} • {project.video?.duration ? `${Math.round(project.video.duration)}s` : 'N/A'}
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card className="bg-slate-100 dark:bg-zinc-800 rounded-xl p-12 text-center">
                            <Video className="w-16 h-16 text-slate-400 dark:text-zinc-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                {project.video?.url?.startsWith('processing_') ? 'Video Processing' :
                                    project.video?.url?.startsWith('pending_') ? 'Video Generation Starting' :
                                        'Video Available Soon'}
                            </h3>
                            <p className="text-slate-600 dark:text-zinc-400">
                                {project.video?.url?.startsWith('processing_')
                                    ? 'Your video is being generated with AI technology. You\'ll receive an email notification when it\'s ready.'
                                    : project.video?.url?.startsWith('pending_')
                                        ? 'Your video generation is starting. This may take a few minutes.'
                                        : 'We are working on it. You\'ll receive an email notification when it\'s ready.'
                                }
                            </p>
                            {(project.video?.url?.startsWith('processing_') || project.video?.url?.startsWith('pending_')) && (
                                <div className="mt-4 space-y-2">
                                    <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                                    </div>
                                    <p className="text-xs text-purple-600 dark:text-purple-400">
                                        {project.video?.url?.startsWith('pending_') ? 'Initializing video generation...' : 'Video will be available shortly. Refresh the page in a few minutes.'}
                                    </p>
                                </div>
                            )}
                        </Card>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Video Actions */}
                        <Card className="p-4 border border-slate-200 dark:border-zinc-700">
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-4 flex items-center">
                                <Video className="w-4 h-4 mr-2 text-red-600" />
                                Video Advertisement
                            </h4>
                            <div className="space-y-3">
                                {project.status === 'failed' ? (
                                    <div className="text-center py-4">
                                        <p className="text-sm text-red-500 dark:text-red-400 mb-3">
                                            Video generation failed
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="w-full border-red-200 text-red-600 hover:bg-red-50"
                                            onClick={() => window.location.reload()}
                                        >
                                            <Video className="w-4 h-4 mr-2" />
                                            Try Again
                                        </Button>
                                    </div>
                                ) : project.video?.url && !project.video.url.startsWith('processing_') ? (
                                    <>
                                        <Button
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                            onClick={() => project.video?.url && window.open(project.video.url, '_blank')}
                                        >
                                            <MonitorPlay className="w-4 h-4 mr-2" />
                                            Open in New Tab
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={handleDownload}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download MP4
                                        </Button>
                                    </>
                                ) : (
                                    <p className="text-sm text-slate-500 dark:text-zinc-500 text-center py-4">
                                        {project.video?.url?.startsWith('processing_')
                                            ? 'Video processing...'
                                            : 'Video not available yet'
                                        }
                                    </p>
                                )}
                            </div>
                        </Card>

                        {/* Landing Page Actions */}
                        <Card className="p-4 border border-slate-200 dark:border-zinc-700">
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-4 flex items-center">
                                <Globe className="w-4 h-4 mr-2 text-blue-600" />
                                Landing Page
                            </h4>
                            <div className="space-y-3">
                                {project.site_url ? (
                                    <>
                                        <Button
                                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                                            onClick={() => window.open(project.site_url!, '_blank')}
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Visit Website
                                        </Button>
                                        <p className="text-xs text-slate-500 dark:text-zinc-500 truncate bg-slate-50 dark:bg-zinc-800 p-2 rounded">
                                            {project.site_url}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                            onClick={handleGenerateWebsite}
                                        >
                                            <Wand2 className="w-4 h-4 mr-2" />
                                            Generate Website
                                        </Button>
                                        <p className="text-xs text-slate-500 dark:text-zinc-500 text-center py-2">
                                            {project.image_count === 0
                                                ? "First upload your product images"
                                                : "Automatically create a website for your product"
                                            }
                                        </p>
                                    </>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Project Details */}
                    <Card className={`p-4 rounded-lg ${project.status === 'failed'
                        ? 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800'
                        : 'bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800'
                        }`}>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center mb-2">
                                    {project.status === 'failed' ? (
                                        <X className="w-4 h-4 mr-2 text-red-600" />
                                    ) : (
                                        <Sparkles className="w-4 h-4 mr-2 text-green-600" />
                                    )}
                                    Project Details
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                    <div>
                                        <span className="text-slate-600 dark:text-zinc-400">Status:</span>
                                        <p className="font-medium text-slate-900 dark:text-white capitalize">{project.status}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-600 dark:text-zinc-400">Category:</span>
                                        <p className="font-medium text-slate-900 dark:text-white">{project.product_type}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-600 dark:text-zinc-400">Views:</span>
                                        <p className="font-medium text-slate-900 dark:text-white">{project.views_count || 0}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-600 dark:text-zinc-400">Duration:</span>
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {project.video?.duration ? `${Math.round(project.video.duration)}s` : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Close Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-zinc-700">
                        <Button
                            onClick={handleClose}
                            className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white min-w-24"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>

            {/* Image Upload Modal */}
            <Dialog open={isImageUploadModalOpen} onOpenChange={setIsImageUploadModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <Upload className="w-5 h-5 mr-2 text-purple-600" />
                            Upload Product Images
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600 dark:text-zinc-400">
                            To generate your personalized website, first upload some images of your product.
                        </p>
                        <div className="border-2 border-dashed border-slate-200 dark:border-zinc-700 rounded-lg p-8 text-center">
                            <Upload className="w-12 h-12 text-slate-400 dark:text-zinc-500 mx-auto mb-4" />
                            <p className="text-sm text-slate-600 dark:text-zinc-400 mb-4">
                                Drag images here or click to select them
                            </p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="image-upload"
                            />
                            <Button
                                variant="outline"
                                onClick={() => document.getElementById('image-upload')?.click()}
                            >
                                Select Images
                            </Button>
                            {uploadedFiles.length > 0 && (
                                <div className="mt-4 text-sm text-slate-600 dark:text-zinc-400">
                                    {uploadedFiles.length} image(s) selected
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsImageUploadModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleImageUploadComplete}
                                disabled={uploadedFiles.length === 0 || isUploading}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                {isUploading ? (
                                    <>
                                        <Upload className="w-4 h-4 mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    'Continue'
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Website Configuration Modal */}
            <Dialog open={isWebsiteConfigModalOpen} onOpenChange={setIsWebsiteConfigModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <Wand2 className="w-5 h-5 mr-2 text-purple-600" />
                            Configure Your Website
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Card
                                    className={`p-4 cursor-pointer border-2 transition-colors ${selectedTemplate === 'modern'
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                        : 'border-slate-200 dark:border-zinc-700 hover:border-purple-300'
                                        }`}
                                    onClick={() => setSelectedTemplate('modern')}
                                >
                                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                                        <Globe className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h4 className="font-medium">Modern Template</h4>
                                    <p className="text-sm text-slate-600 dark:text-zinc-400">Clean and minimalist design</p>
                                </Card>
                                <Card
                                    className={`p-4 cursor-pointer border-2 transition-colors ${selectedTemplate === 'elegant'
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                        : 'border-slate-200 dark:border-zinc-700 hover:border-purple-300'
                                        }`}
                                    onClick={() => setSelectedTemplate('elegant')}
                                >
                                    <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
                                        <Sparkles className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h4 className="font-medium">Elegant Template</h4>
                                    <p className="text-sm text-slate-600 dark:text-zinc-400">Sophisticated and professional style</p>
                                </Card>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">AI Style</h3>
                            <div className="grid grid-cols-3 gap-3">
                                <Button
                                    variant={selectedAiStyle === 'professional' ? 'default' : 'outline'}
                                    className="h-auto p-3 flex flex-col items-center space-y-2"
                                    onClick={() => setSelectedAiStyle('professional')}
                                >
                                    <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm">Professional</span>
                                </Button>
                                <Button
                                    variant={selectedAiStyle === 'casual' ? 'default' : 'outline'}
                                    className="h-auto p-3 flex flex-col items-center space-y-2"
                                    onClick={() => setSelectedAiStyle('casual')}
                                >
                                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                                    <span className="text-sm">Casual</span>
                                </Button>
                                <Button
                                    variant={selectedAiStyle === 'creative' ? 'default' : 'outline'}
                                    className="h-auto p-3 flex flex-col items-center space-y-2"
                                    onClick={() => setSelectedAiStyle('creative')}
                                >
                                    <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                                    <span className="text-sm">Creative</span>
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsWebsiteConfigModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleWebsiteConfigComplete}
                                disabled={isGenerating}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            >
                                {isGenerating ? (
                                    <>
                                        <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-4 h-4 mr-2" />
                                        Generate Website
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Dialog>
    )
} 