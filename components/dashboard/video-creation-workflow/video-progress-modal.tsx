"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    CheckCircle,
    Clock,
    AlertCircle,
    ExternalLink,
    Download,
    Share2,
    Play,
    Eye,
    Globe,
    Sparkles,
    Zap,
    Image as ImageIcon,
    Code,
    Video,
    Rocket,
    Check,
    Loader2,
    Settings,
    MonitorPlay,
    ChevronDown,
    ChevronUp,
    Minimize2,
    Maximize2,
    ArrowLeft
} from "lucide-react"
import Image from "next/image"

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
    configuration: VideoConfiguration
}

interface ProcessingStep {
    id: string
    title: string
    description: string
    status: "waiting" | "processing" | "completed" | "error"
    progress: number
    duration?: string
}

export function VideoProgressModal({ isOpen, onClose, projectName, configuration }: VideoProgressModalProps) {
    const [steps, setSteps] = useState<ProcessingStep[]>([
        {
            id: "analysis",
            title: "Image Analysis",
            description: "Analyzing your product images with AI",
            status: "waiting",
            progress: 0
        },
        {
            id: "landing",
            title: "Landing Page",
            description: "Creating professional landing page",
            status: "waiting",
            progress: 0
        },
        {
            id: "domain",
            title: "Domain Setup",
            description: "Configuring domain and deployment",
            status: "waiting",
            progress: 0
        },
        {
            id: "script",
            title: "Video Script",
            description: "AI writing optimized video script",
            status: "waiting",
            progress: 0
        },
        {
            id: "video",
            title: "Video Generation",
            description: "Creating professional video advertisement",
            status: "waiting",
            progress: 0
        }
    ])

    const [currentStep, setCurrentStep] = useState(0)
    const [overallProgress, setOverallProgress] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [results, setResults] = useState<any>(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [showPreview, setShowPreview] = useState(false)

    const updateStepStatus = (stepId: string, status: ProcessingStep["status"], progress: number = 0) => {
        setSteps(prev => prev.map(step =>
            step.id === stepId
                ? { ...step, status, progress }
                : step
        ))
    }

    const processStep = async (stepIndex: number, message: string) => {
        const step = steps[stepIndex]
        if (!step) return

        setCurrentStep(stepIndex)
        updateStepStatus(step.id, "processing")

        // Simula progresso graduale
        for (let i = 0; i <= 100; i += 20) {
            updateStepStatus(step.id, "processing", i)
            await new Promise(resolve => setTimeout(resolve, 300))
        }

        updateStepStatus(step.id, "completed", 100)
    }

    const simulateWorkflow = async () => {
        try {
            // Step 1: Image Analysis
            await processStep(0, "Analyzing images with ChatGPT Vision...")

            // Step 2: Landing Page
            await processStep(1, "Generating landing page with Claude...")

            // Step 3: Domain (only if custom domain requested)
            if (configuration.buy_custom_domain) {
                await processStep(2, "Setting up custom domain...")
            } else {
                updateStepStatus("domain", "completed", 100)
            }

            // Step 4: Script Generation
            await processStep(3, "Writing video script with AI...")

            // Step 5: Video Creation
            await processStep(4, "Creating video with Creatify...")

            // Completion
            setIsCompleted(true)
            setResults({
                video_url: "/example_output.mp4",
                landing_url: configuration.buy_custom_domain
                    ? `https://${configuration.custom_domain_name || "myproduct.com"}`
                    : "https://temp-site-123.vercel.app",
                thumbnail_url: "https://example.com/thumb.jpg"
            })

            // Attendi un momento poi mostra la preview
            await new Promise(resolve => setTimeout(resolve, 1000))
            setShowPreview(true)

        } catch (error) {
            console.error("Workflow error:", error)
        }
    }

    // Funzione per testare la preview (solo per sviluppo)
    const skipToPreview = () => {
        // Completa tutti gli step
        setSteps(prev => prev.map(step => ({ ...step, status: "completed", progress: 100 })))
        setOverallProgress(100)
        setIsCompleted(true)
        setResults({
            video_url: "/example_output.mp4",
            landing_url: configuration.buy_custom_domain
                ? `https://${configuration.custom_domain_name || "myproduct.com"}`
                : "https://temp-site-123.vercel.app",
            thumbnail_url: "https://example.com/thumb.jpg"
        })
        setShowPreview(true)
    }

    useEffect(() => {
        if (isOpen) {
            simulateWorkflow()
        }
    }, [isOpen])

    useEffect(() => {
        const completedSteps = steps.filter(step => step.status === "completed").length
        const totalSteps = steps.filter(s =>
            s.id !== "domain" || configuration.buy_custom_domain
        ).length

        setOverallProgress((completedSteps / totalSteps) * 100)
    }, [steps, configuration.buy_custom_domain])

    const handleClose = () => {
        // Reset state
        setSteps(prev => prev.map(step => ({ ...step, status: "waiting", progress: 0 })))
        setCurrentStep(0)
        setOverallProgress(0)
        setIsCompleted(false)
        setResults(null)
        setIsExpanded(false)
        setShowPreview(false)
        onClose()
    }

    const getVisibleSteps = () => {
        const visibleSteps = steps.filter(s => s.id !== "domain" || configuration.buy_custom_domain)

        if (isCompleted || isExpanded) {
            return visibleSteps
        }

        // Durante il processing, mostra solo la corrente e quelle completate
        const currentProcessingIndex = visibleSteps.findIndex(step => step.status === "processing")
        if (currentProcessingIndex !== -1) {
            return visibleSteps.slice(0, currentProcessingIndex + 1)
        }

        return visibleSteps
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
                                    <Image src="/adsmakerlogo.png" alt="ADS MAKER AI Logo" width={18} height={18} className="mr-2" />
                                    <span className="truncate">
                                        {isCompleted ? "Video Created!" : "Creating Video Ad"}
                                    </span>
                                </DialogTitle>
                                {/* Debug button for testing */}
                                {process.env.NODE_ENV === 'development' && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={skipToPreview}
                                        className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700"
                                    >
                                        Skip to Preview
                                    </Button>
                                )}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-zinc-400">
                                {isCompleted ? "Your video advertisement is ready!" : "AI is working its magic"}
                            </p>
                            <p id="progress-dialog-description" className="sr-only">
                                Video advertisement creation progress with processing steps and completion status
                            </p>
                        </DialogHeader>

                        <div className="space-y-2 sm:space-y-4">
                            {/* Project Overview */}
                            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-2 border border-purple-200 dark:border-purple-800 rounded-lg">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white truncate">{projectName}</h3>
                                        <p className="text-xs text-slate-600 dark:text-zinc-400">
                                            {configuration.target_platform} • {configuration.video_length}s
                                        </p>
                                    </div>
                                    <div className="text-center flex-shrink-0">
                                        <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            {Math.round(overallProgress)}%
                                        </div>
                                        <div className="text-xs text-slate-600 dark:text-zinc-400">Complete</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Progress
                                        value={overallProgress}
                                        className="h-1 sm:h-2 bg-slate-200 dark:bg-zinc-700 rounded-full"
                                    />
                                </div>
                            </Card>

                            {/* Steps Header with Toggle */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                                    Processing Steps
                                </h3>
                                {!isCompleted && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="h-6 px-2 text-xs"
                                    >
                                        {isExpanded ? (
                                            <>
                                                <Minimize2 className="w-3 h-3 mr-1" />
                                                Collapse
                                            </>
                                        ) : (
                                            <>
                                                <Maximize2 className="w-3 h-3 mr-1" />
                                                Expand
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>

                            {/* Processing Steps */}
                            <div className="space-y-1">
                                {getVisibleSteps().map((step, index) => {
                                    const isActive = step.status === "processing"
                                    const isCollapsed = !isCompleted && !isExpanded && step.status === "waiting"

                                    return (
                                        <Card
                                            key={step.id}
                                            className={`border transition-all duration-300 ${step.status === "completed"
                                                ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                                                : step.status === "processing"
                                                    ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                                    : "border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                                                } ${isCollapsed ? "h-8 overflow-hidden" : "h-auto"}`}
                                        >
                                            <div className={`flex items-center gap-2 ${isCollapsed ? "p-1" : "p-2"}`}>
                                                <div className={`flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${step.status === "completed"
                                                    ? "bg-green-500 text-white w-5 h-5"
                                                    : step.status === "processing"
                                                        ? "bg-blue-500 text-white w-5 h-5"
                                                        : "bg-slate-200 dark:bg-zinc-700 text-slate-500 w-4 h-4"
                                                    }`}>
                                                    {step.status === "completed" && <Check className="w-3 h-3" />}
                                                    {step.status === "processing" && <Loader2 className="w-3 h-3 animate-spin" />}
                                                    {step.status === "waiting" && <Clock className="w-2.5 h-2.5" />}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                                                        {step.title}
                                                    </h4>
                                                    {!isCollapsed && (
                                                        <p className="text-xs text-slate-600 dark:text-zinc-400 truncate">
                                                            {step.description}
                                                        </p>
                                                    )}
                                                </div>

                                                {!isCollapsed && (
                                                    <div className="flex items-center gap-1 flex-shrink-0">
                                                        {step.status === "processing" && (
                                                            <div className="w-8 sm:w-16">
                                                                <Progress
                                                                    value={step.progress}
                                                                    className="h-1 bg-slate-200 dark:bg-zinc-700"
                                                                />
                                                            </div>
                                                        )}
                                                        <Badge className={`px-1 py-0.5 text-xs ${step.status === "completed"
                                                            ? "bg-green-500 text-white"
                                                            : step.status === "processing"
                                                                ? "bg-blue-500 text-white"
                                                                : "bg-slate-200 text-slate-700"
                                                            }`}>
                                                            {step.status === "completed" ? "✓" :
                                                                step.status === "processing" ? "⚡" : "⏳"}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                        </Card>
                                    )
                                })}
                            </div>

                            {/* Configuration Summary */}
                            <Card className="bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 p-2 rounded-lg">
                                <h4 className="font-medium text-xs text-slate-900 dark:text-white mb-1 flex items-center">
                                    <Settings className="w-3 h-3 mr-1" />
                                    Configuration
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-slate-600 dark:text-zinc-400">Platform:</span>
                                        <p className="font-medium text-slate-900 dark:text-white truncate">{configuration.target_platform}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-600 dark:text-zinc-400">Duration:</span>
                                        <p className="font-medium text-slate-900 dark:text-white">{configuration.video_length}s</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center gap-2 pt-2 border-t border-slate-200 dark:border-zinc-700">
                                <Button
                                    variant="outline"
                                    onClick={handleClose}
                                    className="flex-1 px-2 py-1 text-xs"
                                    disabled={!isCompleted}
                                >
                                    Cancel
                                </Button>

                                <div className="text-xs text-slate-500 dark:text-zinc-500 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    3-5 min
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
                                    <Image src="/adsmakerlogo.png" alt="ADS MAKER AI Logo" width={24} height={24} className="mr-3" />
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