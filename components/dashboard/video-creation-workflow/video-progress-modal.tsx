"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Clock,
    ExternalLink,
    Download,
    Globe,
    Sparkles,
    Video,
    Check,
    Loader2,
    Settings,
    MonitorPlay,
    ArrowLeft,
    AlertCircle
} from "lucide-react"
import Image from "next/image"
import { useProjectProgress } from '@/hooks/useProjectProgress'
import ProgressPhases from '@/components/ui/progress-phases'

interface VideoConfiguration {
    target_platform: string
    target_audience: string
    language: string
    video_length: number
    aspect_ratio: string
    script_style: string
    visual_style: string
    buy_custom_domain: boolean
    custom_domain_name: string
    landing_style: string
    color_scheme: string
    cta_text: string
    background_music_volume: number
    voiceover_volume: number
    no_background_music: boolean
    no_caption: boolean
    no_emotion: boolean
    no_cta: boolean
    caption_style: string
    override_script: string
}

interface VideoProgressModalProps {
    isOpen: boolean
    onClose: () => void
    projectName: string
    projectId?: number | string  // ID del progetto creato
    configuration: VideoConfiguration
    workflowAlreadyStarted?: boolean  // Se true, non avvia il workflow ma solo monitora
}

interface ProcessingStep {
    id: string
    title: string
    description: string
    status: "waiting" | "processing" | "completed" | "error"
    progress: number
    duration?: string
}

export function VideoProgressModal({ isOpen, onClose, projectName, projectId, configuration, workflowAlreadyStarted = false }: VideoProgressModalProps) {
    const [isCompleted, setIsCompleted] = useState(false)
    const [results, setResults] = useState<any>(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [workflowStarted, setWorkflowStarted] = useState(false)

    // 🔥 Nuovo hook per gestire il progresso
    const { progress, isLoading, error } = useProjectProgress({
        projectId: projectId || 0,
        enabled: isOpen && workflowStarted && !!projectId,
        onComplete: (results) => {
            setIsCompleted(true)
            setResults({
                video_url: results?.landing_url || "/example_output.mp4",
                landing_url: results?.landing_url || "https://temp-site-123.vercel.app",
                thumbnail_url: results?.thumbnail_url || "https://example.com/thumb.jpg"
            })
            setTimeout(() => setShowPreview(true), 1000)
        },
        onError: (errorMessage) => {
            alert(`Errore durante la creazione: ${errorMessage}`)
        }
    })

    // 🚀 Avvia il workflow (solo se non già avviato esternamente)
    const startWorkflow = async () => {
        try {
            if (!projectId) {
                throw new Error("Project ID is required")
            }

            setWorkflowStarted(true)
            console.log("🚀 Workflow avviato, inizio monitoring...")

        } catch (error) {
            console.error("❌ Workflow start error:", error)
            alert(`❌ Errore avvio processo: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`)
            setWorkflowStarted(false)
        }
    }

    // Avvia il workflow quando si apre il modal (solo se non è già stato avviato)
    useEffect(() => {
        if (isOpen && !workflowStarted && projectId && !workflowAlreadyStarted) {
            startWorkflow()
        } else if (isOpen && workflowAlreadyStarted) {
            // Se il workflow è già stato avviato, impostiamo workflowStarted = true per iniziare il monitoring
            setWorkflowStarted(true)
        }
    }, [isOpen, projectId, workflowAlreadyStarted])

    const handleClose = () => {
        // Reset state
        setIsCompleted(false)
        setResults(null)
        setIsExpanded(false)
        setShowPreview(false)
        setWorkflowStarted(false)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className={`${showPreview ? 'max-w-2xl w-[95vw]' : 'max-w-lg w-[88vw]'} max-h-[95vh] overflow-y-auto bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-3 sm:p-4 transition-all duration-500`}
                aria-describedby="progress-dialog-description"
            >
                {/* LOADING PHASE */}
                {!showPreview && (
                    <>
                        <DialogHeader className="space-y-1">
                            <div className="flex items-center justify-between">
                                <DialogTitle className="text-sm sm:text-xl font-bold flex items-center text-slate-900 dark:text-white">
                                    <Image src="/fastadslogo.png" alt="FAST ADS AI Logo" width={18} height={18} className="mr-2" />
                                    <span className="truncate">
                                        {isCompleted ? "Video Created!" : "Creating Video Ad"}
                                    </span>
                                </DialogTitle>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-zinc-400">
                                {isCompleted ? "Your video advertisement is ready!" : "AI is working its magic"}
                            </p>
                            <p id="progress-dialog-description" className="sr-only">
                                Video advertisement creation progress with processing steps and completion status
                            </p>
                        </DialogHeader>

                        <div className="space-y-2 sm:space-y-4">
                            {/* 🔥 Nuovo Progress Component */}
                            {progress && (
                                <ProgressPhases
                                    phases={progress.phases || []}
                                    currentProgress={progress.progress || 0}
                                    currentMessage={progress.progress_message}
                                    estimatedTime={progress.estimated_time_remaining}
                                    className="border border-purple-200 dark:border-purple-800 rounded-lg p-4"
                                />
                            )}

                            {/* Loading State */}
                            {!progress && workflowStarted && (
                                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
                                    <div className="flex items-center justify-center gap-3">
                                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                                        <div>
                                            <h3 className="font-medium text-slate-900 dark:text-white">Inizializzazione progetto...</h3>
                                            <p className="text-sm text-slate-600 dark:text-zinc-400">{projectName}</p>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Error State */}
                            {error && (
                                <Card className="bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-6 h-6 text-red-600" />
                                        <div>
                                            <h3 className="font-medium text-red-900 dark:text-red-100">Errore durante l'elaborazione</h3>
                                            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Configuration Summary */}
                            <Card className="bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 p-2 rounded-lg">
                                <h4 className="font-medium text-xs text-slate-900 dark:text-white mb-1 flex items-center">
                                    <Settings className="w-3 h-3 mr-1" />
                                    Configurazione
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-slate-600 dark:text-zinc-400">Piattaforma:</span>
                                        <p className="font-medium text-slate-900 dark:text-white truncate">{configuration.target_platform}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-600 dark:text-zinc-400">Durata:</span>
                                        <p className="font-medium text-slate-900 dark:text-white">{configuration.video_length}s</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Background Process Notice */}
                            {progress && progress.progress > 60 && (
                                <Card className="bg-green-50 dark:bg-green-900/20 p-3 border border-green-200 dark:border-green-800 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <div className="text-xs">
                                            <p className="font-medium text-green-900 dark:text-green-100">
                                                🎬 Processo quasi completato!
                                            </p>
                                            <p className="text-green-700 dark:text-green-200">
                                                Puoi chiudere questa finestra - riceverai un'email quando il video sarà pronto.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center gap-2 pt-2 border-t border-slate-200 dark:border-zinc-700">
                                <Button
                                    variant="outline"
                                    onClick={handleClose}
                                    className="flex-1 px-2 py-1 text-xs"
                                    disabled={workflowStarted && !isCompleted && (!progress || progress.progress < 60)}
                                >
                                    {(progress && progress.progress > 60) || isCompleted ? "Chiudi" : "Annulla"}
                                </Button>

                                <div className="text-xs text-slate-500 dark:text-zinc-500 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {progress?.estimated_time_remaining || "5-8 min"}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* PREVIEW PHASE */}
                {showPreview && results && (
                    <>
                        <DialogHeader className="space-y-2">
                            <div className="flex items-center justify-between">
                                <DialogTitle className="text-lg sm:text-2xl font-bold flex items-center text-slate-900 dark:text-white">
                                    <Image src="/fastadslogo.png" alt="FAST ADS AI Logo" width={24} height={24} className="mr-3" />
                                    <span className="truncate">Your Video is Ready! 🎉</span>
                                </DialogTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowPreview(false)}
                                    className="h-8 px-2"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    Back
                                </Button>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-zinc-400">
                                Preview your professional video advertisement
                            </p>
                            <p id="progress-dialog-description" className="sr-only">
                                Video advertisement preview with download options and landing page access
                            </p>
                        </DialogHeader>

                        <div className="space-y-4">
                            {/* Video Preview */}
                            <Card className="bg-black rounded-xl overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                                <div className="relative flex items-center justify-center min-h-[200px] max-h-[70vh]">
                                    <video
                                        controls
                                        autoPlay
                                        muted
                                        className="max-w-full max-h-full object-contain"
                                        style={{
                                            maxHeight: '70vh',
                                            width: 'auto',
                                            height: 'auto'
                                        }}
                                        poster="https://via.placeholder.com/640x360/000000/FFFFFF?text=Loading+Video..."
                                        onError={(e) => {
                                            console.error("Video failed to load:", e)
                                        }}
                                        onLoadedMetadata={(e) => {
                                            const video = e.target as HTMLVideoElement
                                            console.log(`Video dimensions: ${video.videoWidth}x${video.videoHeight}`)
                                            console.log(`Aspect ratio: ${video.videoWidth / video.videoHeight}`)
                                        }}
                                    >
                                        <source src={results.video_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Video Info Overlay */}
                                    <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                        {projectName} • {configuration.video_length}s
                                    </div>
                                </div>
                            </Card>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Video Actions */}
                                <Card className="p-3 border border-slate-200 dark:border-zinc-700">
                                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3 flex items-center">
                                        <Video className="w-4 h-4 mr-2 text-red-600" />
                                        Video Advertisement
                                    </h4>
                                    <div className="space-y-2">
                                        <Button
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                            onClick={() => window.open(results.video_url, '_blank')}
                                        >
                                            <MonitorPlay className="w-4 h-4 mr-2" />
                                            Open in New Tab
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => {
                                                const link = document.createElement('a')
                                                link.href = results.video_url
                                                link.download = `${projectName}_video.mp4`
                                                link.click()
                                            }}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download MP4
                                        </Button>
                                    </div>
                                </Card>

                                {/* Landing Page Actions */}
                                <Card className="p-3 border border-slate-200 dark:border-zinc-700">
                                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3 flex items-center">
                                        <Globe className="w-4 h-4 mr-2 text-blue-600" />
                                        Landing Page
                                    </h4>
                                    <div className="space-y-2">
                                        <Button
                                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white relative overflow-hidden group animate-pulse hover:animate-none hover:scale-[1.02] transition-all duration-300 hover:shadow-md hover:shadow-green-500/30"
                                            onClick={() => window.open(results.landing_url, '_blank')}
                                        >
                                            {/* Contenuto del bottone */}
                                            <div className="relative flex items-center justify-center">
                                                <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                                                <span className="font-semibold">Visit Website</span>

                                                {/* Sottile indicatore di novità */}
                                                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-300 rounded-full opacity-70"></div>
                                            </div>
                                        </Button>
                                        <p className="text-xs text-slate-500 dark:text-zinc-500 truncate bg-slate-50 dark:bg-zinc-800 p-2 rounded">
                                            {results.landing_url}
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            {/* Project Summary */}
                            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 border border-green-200 dark:border-green-800 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center">
                                            <Sparkles className="w-4 h-4 mr-2 text-green-600" />
                                            Project Completed Successfully!
                                        </h3>
                                        <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                                            Platform: {configuration.target_platform} • Duration: {configuration.video_length}s • Language: {configuration.language.toUpperCase()}
                                        </p>
                                    </div>
                                    <Button
                                        onClick={handleClose}
                                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6"
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Complete
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
} 