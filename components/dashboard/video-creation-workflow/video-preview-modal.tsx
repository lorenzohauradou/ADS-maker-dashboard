"use client"

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
    Sparkles
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
    if (!project) return null

    const handleDownload = () => {
        if (project.video?.url && !project.video.url.startsWith('processing_')) {
            const link = document.createElement('a')
            link.href = project.video.url
            link.download = `${project.name}_video.mp4`
            link.click()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
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
                    {/* Video Preview */}
                    {project.video?.url && !project.video.url.startsWith('processing_') ? (
                        <Card className="bg-black rounded-xl overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                            <div className="relative flex items-center justify-center min-h-[300px] max-h-[70vh]">
                                <video
                                    controls
                                    autoPlay
                                    muted={false}
                                    className="max-w-full max-h-full object-contain"
                                    style={{
                                        maxHeight: '70vh',
                                        width: 'auto',
                                        height: 'auto'
                                    }}
                                    onError={(e) => {
                                        console.error("Video failed to load:", e)
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
                                {project.video?.url?.startsWith('processing_') ? 'Video Processing' : 'Video Not Available'}
                            </h3>
                            <p className="text-slate-600 dark:text-zinc-400">
                                {project.video?.url?.startsWith('processing_')
                                    ? 'Your video is being generated with AI technology. You\'ll receive an email notification when it\'s ready.'
                                    : 'No video has been generated for this project yet.'
                                }
                            </p>
                            {project.video?.url?.startsWith('processing_') && (
                                <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                                    Video will be available shortly. Refresh the page in a few minutes.
                                </p>
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
                                {project.video?.url && !project.video.url.startsWith('processing_') ? (
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
                                            : 'Video not available'
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
                                    <p className="text-sm text-slate-500 dark:text-zinc-500 text-center py-4">
                                        Landing page not available
                                    </p>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Project Details */}
                    <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center mb-2">
                                    <Sparkles className="w-4 h-4 mr-2 text-green-600" />
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
                            onClick={onClose}
                            className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white min-w-24"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 