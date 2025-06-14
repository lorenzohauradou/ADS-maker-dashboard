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
    AlertCircle,
    CheckCircle,
    Share2,
    Eye
} from "lucide-react"
import Image from "next/image"
import { useProjectProgress } from '@/hooks/useProjectProgress'
import ProgressPhases from '@/components/ui/progress-phases'
import { VideoConfiguration } from "./types/video-configuration"
import { useSubscriptionLimits } from "@/hooks/use-subscription-limits"
import { useVideoCreationProgress } from "@/hooks/use-progress-status-bar"
import { toast } from "sonner"

interface VideoProgressModalProps {
    isOpen: boolean
    onClose: (success?: boolean | null) => void  // 🚀 null = chiusura manuale, boolean = successo/fallimento
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

interface ProgressData {
    progress: number
    message: string
    status: string
    estimated_time_remaining?: string
}

export function VideoProgressModal({ isOpen, onClose, projectName, projectId, configuration, workflowAlreadyStarted = false }: VideoProgressModalProps) {
    const [progress, setProgress] = useState<ProgressData | null>(null)
    const [isCompleted, setIsCompleted] = useState(false)
    const [results, setResults] = useState<any>(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [workflowStarted, setWorkflowStarted] = useState(workflowAlreadyStarted)
    const [error, setError] = useState<string | null>(null)
    const [videoData, setVideoData] = useState<any>(null)

    // 🔥 Hook per la barra di progresso globale
    const { startVideoCreation, updateFromBackend, completeProgress, failProgress } = useVideoCreationProgress()

    // 🔥 Nuovo hook per gestire il progresso
    const { progress: projectProgress, isLoading, error: projectError } = useProjectProgress({
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

    // ✅ HOOK per aggiornare limiti quando video completato
    const { refreshLimits } = useSubscriptionLimits()

    // ✅ MONITORA PROGRESSO E AGGIORNA BARRA GLOBALE
    useEffect(() => {
        if (projectProgress && workflowStarted) {
            // 🔥 Aggiorna la barra di progresso globale
            updateFromBackend(projectProgress)
        }
    }, [projectProgress, workflowStarted, updateFromBackend])

    // ✅ MONITORA COMPLETAMENTO VIDEO per aggiornare limiti
    useEffect(() => {
        if (projectProgress?.progress === 100 && projectProgress?.status === 'completed') {
            console.log('🎉 Video completato! Aggiorno limiti utente...')

            // Aggiorna i limiti immediatamente
            refreshLimits()

            // 🔥 Completa la barra di progresso globale
            completeProgress()

            // Mostra toast di successo
            toast.success('🎉 Video creato con successo!', {
                description: 'Il tuo video pubblicitario è pronto. I tuoi limiti sono stati aggiornati.',
                duration: 5000
            })

            // ✅ REFRESH MULTIPLI per essere sicuri che i limiti si aggiornino
            setTimeout(() => {
                refreshLimits()
                console.log('🔄 Secondo refresh limiti completato')
            }, 2000)

            setTimeout(() => {
                refreshLimits()
                console.log('🔄 Terzo refresh limiti completato')
            }, 5000)

            setTimeout(() => {
                refreshLimits()
                console.log('🔄 Quarto refresh limiti completato')
            }, 10000)
        }
    }, [projectProgress?.progress, projectProgress?.status]) // Rimosso refreshLimits e completeProgress dalle dipendenze

    // 🚀 Avvia il workflow (solo se non già avviato esternamente)
    const startWorkflow = async () => {
        try {
            if (!projectId) {
                throw new Error("Project ID is required")
            }

            setWorkflowStarted(true)
            console.log("🚀 Workflow avviato, inizio monitoring...")

            // 🔥 Avvia la barra di progresso globale
            startVideoCreation(projectName, projectId)

        } catch (error) {
            console.error("❌ Workflow start error:", error)
            alert(`❌ Errore avvio processo: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`)
            setWorkflowStarted(false)

            // 🔥 Mostra errore nella barra di progresso
            failProgress(error instanceof Error ? error.message : 'Errore sconosciuto')
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
        // Determina se il video è stato completato con successo
        const videoSuccess = isCompleted && results && results.video_url

        // ✅ DISTINGUI tra chiusura manuale e fallimento reale
        const isManualClose = !videoSuccess && !projectError && workflowStarted

        // Reset state
        setIsCompleted(false)
        setResults(null)
        setIsExpanded(false)
        setShowPreview(false)
        setWorkflowStarted(false)

        // 🚀 Passa il successo al componente padre
        // Se è chiusura manuale, passa 'null' invece di false
        if (isManualClose) {
            console.log('⏹️ Chiusura manuale del modal - processo continua in background')
            onClose(null) // null = chiusura manuale, non fallimento
        } else {
            onClose(videoSuccess)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className={`${showPreview ? 'max-w-2xl w-[95vw]' : 'max-w-lg w-[88vw]'} max-h-[95vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 p-3 sm:p-4 transition-all duration-500`}
                aria-describedby="progress-dialog-description"
            >
                {/* LOADING PHASE */}
                {!showPreview && (
                    <>
                        <DialogHeader className="space-y-1">
                            <div className="flex items-center justify-between">
                                <DialogTitle className="text-sm sm:text-xl font-bold flex items-center text-gray-900 dark:text-gray-100">
                                    <Image src="/fastadslogo.png" alt="FAST ADS AI Logo" width={18} height={18} className="mr-2" />
                                    <span className="truncate">
                                        {isCompleted ? "Video Created!" : "Creating Video Ad"}
                                    </span>
                                </DialogTitle>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                {isCompleted ? "Your video advertisement is ready!" : "AI is working its magic"}
                            </p>
                            <p id="progress-dialog-description" className="sr-only">
                                Video advertisement creation progress with processing steps and completion status
                            </p>
                        </DialogHeader>

                        <div className="space-y-3 mt-4">
                            {/* Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                        Progresso Generale
                                    </span>
                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                        {Math.round(projectProgress?.progress || 0)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${Math.round(projectProgress?.progress || 0)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                                    {projectProgress?.progress_message || "In attesa..."}
                                </p>
                            </div>

                            {/* Process Steps */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Fasi del Processo
                                </h4>

                                {/* Analisi immagini */}
                                <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${(projectProgress?.progress || 0) > 10
                                        ? 'bg-green-500'
                                        : (projectProgress?.progress || 0) > 0
                                            ? 'bg-blue-500 animate-pulse'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                        }`}>
                                        {(projectProgress?.progress || 0) > 10 && (
                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Analisi immagini
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Analisi intelligente delle immagini caricate
                                        </p>
                                    </div>
                                </div>

                                {/* Generazione sito web */}
                                <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${(projectProgress?.progress || 0) > 40
                                        ? 'bg-green-500'
                                        : (projectProgress?.progress || 0) > 20
                                            ? 'bg-blue-500 animate-pulse'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                        }`}>
                                        {(projectProgress?.progress || 0) > 40 && (
                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Generazione sito web
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Creazione sito web personalizzato
                                        </p>
                                    </div>
                                </div>

                                {/* Pubblicazione online */}
                                <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${(projectProgress?.progress || 0) > 60
                                        ? 'bg-green-500'
                                        : (projectProgress?.progress || 0) > 50
                                            ? 'bg-blue-500 animate-pulse'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                        }`}>
                                        {(projectProgress?.progress || 0) > 60 && (
                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Pubblicazione online
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Pubblicazione su piattaforma web
                                        </p>
                                    </div>
                                </div>

                                {/* Creazione video */}
                                <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${(projectProgress?.progress || 0) > 90
                                        ? 'bg-green-500'
                                        : (projectProgress?.progress || 0) > 70
                                            ? 'bg-blue-500 animate-pulse'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                        }`}>
                                        {(projectProgress?.progress || 0) > 90 && (
                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Creazione video
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Generazione video pubblicitario con AI
                                        </p>
                                    </div>
                                </div>

                                {/* Finalizzazione */}
                                <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${(projectProgress?.progress || 0) >= 100
                                        ? 'bg-green-500'
                                        : (projectProgress?.progress || 0) > 90
                                            ? 'bg-blue-500 animate-pulse'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                        }`}>
                                        {(projectProgress?.progress || 0) >= 100 && (
                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Finalizzazione
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Completamento e preparazione risultati
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Configuration Card */}
                            <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-2 rounded-lg">
                                <h4 className="font-medium text-xs text-gray-900 dark:text-gray-100 mb-1 flex items-center">
                                    <Settings className="w-3 h-3 mr-1" />
                                    Configuration
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Platform:</span>
                                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{configuration.target_platform}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">{configuration.video_length}s</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Background Process Notice - Show immediately when workflow starts */}
                            {workflowStarted && !isCompleted && (
                                <Card className="bg-blue-50 dark:bg-blue-900/20 p-3 border border-blue-200 dark:border-blue-800 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                        <div className="text-xs">
                                            <p className="font-medium text-blue-900 dark:text-blue-100">
                                                🚀 Process running in background
                                            </p>
                                            <p className="text-blue-700 dark:text-blue-200">
                                                You can safely close this window - we'll email you when your video is ready!
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Almost Done Notice */}
                            {projectProgress && projectProgress.progress > 80 && (
                                <Card className="bg-green-50 dark:bg-green-900/20 p-3 border border-green-200 dark:border-green-800 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <div className="text-xs">
                                            <p className="font-medium text-green-900 dark:text-green-100">
                                                🎬 Almost done!
                                            </p>
                                            <p className="text-green-700 dark:text-green-200">
                                                Your video will be ready in just a few moments.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    variant="outline"
                                    onClick={handleClose}
                                    className="flex-1 px-2 py-1 text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    disabled={!workflowStarted && !isCompleted}
                                >
                                    {workflowStarted || isCompleted ? "Close" : "Cancel"}
                                </Button>

                                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {projectProgress?.estimated_time_remaining || "5-8 min"}
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
                                <DialogTitle className="text-lg sm:text-2xl font-bold flex items-center text-gray-900 dark:text-gray-100">
                                    <Image src="/fastadslogo.png" alt="FAST ADS AI Logo" width={24} height={24} className="mr-3" />
                                    <span className="truncate">Your Video is Ready! 🎉</span>
                                </DialogTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowPreview(false)}
                                    className="h-8 px-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    Back
                                </Button>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Preview your professional video advertisement
                            </p>
                            <p id="progress-dialog-description" className="sr-only">
                                Video advertisement preview with download options and landing page access
                            </p>
                        </DialogHeader>

                        <div className="space-y-4">
                            {/* Video Preview */}
                            <Card className="bg-black rounded-xl overflow-hidden border-2 border-purple-200 dark:border-purple-700">
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
                                <Card className="p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                    <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                                        <Video className="w-4 h-4 mr-2 text-red-600 dark:text-red-500" />
                                        Video Advertisement
                                    </h4>
                                    <div className="space-y-2">
                                        <Button
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                            onClick={() => window.open(results.video_url, '_blank')}
                                        >
                                            <MonitorPlay className="w-4 h-4 mr-2" />
                                            Open in New Tab
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                                <Card className="p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                    <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                                        <Globe className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500" />
                                        Landing Page
                                    </h4>
                                    <div className="space-y-2">
                                        <Button
                                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white relative overflow-hidden group animate-pulse hover:animate-none hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                                            onClick={() => window.open(results.landing_url, '_blank')}
                                        >
                                            <div className="relative flex items-center justify-center">
                                                <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                                                <span className="font-semibold">Visit Website</span>
                                                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-300 rounded-full opacity-70"></div>
                                            </div>
                                        </Button>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate bg-gray-50 dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                                            {results.landing_url}
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            {/* Project Summary */}
                            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 border border-green-200 dark:border-green-700 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center">
                                            <Sparkles className="w-4 h-4 mr-2 text-green-600 dark:text-green-500" />
                                            Project Completed Successfully!
                                        </h3>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            Platform: {configuration.target_platform} • Duration: {configuration.video_length}s • Language: {configuration.language.toUpperCase()}
                                        </p>
                                    </div>
                                    <Button
                                        onClick={handleClose}
                                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 shadow-lg hover:shadow-xl transition-all duration-300"
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