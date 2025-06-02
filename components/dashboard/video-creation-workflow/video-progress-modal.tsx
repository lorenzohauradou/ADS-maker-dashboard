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
    Maximize2
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
                video_url: "https://example.com/video.mp4",
                landing_url: configuration.buy_custom_domain
                    ? `https://${configuration.custom_domain_name || "myproduct.com"}`
                    : "https://temp-site-123.vercel.app",
                thumbnail_url: "https://example.com/thumb.jpg"
            })

        } catch (error) {
            console.error("Workflow error:", error)
        }
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
                className="max-w-lg w-[88vw] max-h-[95vh] overflow-y-auto bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 p-2 sm:p-4"
                aria-describedby="dialog-description"
            >
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-sm sm:text-xl font-bold flex items-center text-slate-900 dark:text-white">
                        <Image src="/adsmakerlogo.png" alt="ADS MAKER AI Logo" width={18} height={18} className="mr-2" />
                        <span className="truncate">
                            {isCompleted ? "Video Created!" : "Creating Video Ad"}
                        </span>
                    </DialogTitle>
                    <p id="dialog-description" className="text-xs text-slate-600 dark:text-zinc-400">
                        {isCompleted ? "Your video advertisement is ready!" : "AI is working its magic"}
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

                    {/* Results Section */}
                    {isCompleted && results && (
                        <Card className="bg-green-50 dark:bg-green-900/20 p-2 border-green-200 dark:border-green-800 rounded-lg">
                            <h3 className="font-semibold text-xs text-slate-900 dark:text-white mb-2 flex items-center">
                                <Sparkles className="w-3 h-3 mr-1 text-green-600" />
                                Your Video Ad is Ready!
                            </h3>

                            <div className="space-y-2">
                                {/* Video Results */}
                                <div>
                                    <h4 className="font-medium text-xs text-slate-900 dark:text-white flex items-center mb-1">
                                        <Video className="w-3 h-3 mr-1 text-red-600" />
                                        Video Advertisement
                                    </h4>
                                    <div className="space-y-1">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-xs p-1 h-auto"
                                            onClick={() => window.open(results.video_url, '_blank')}
                                        >
                                            <MonitorPlay className="w-3 h-3 mr-1" />
                                            Preview Video
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-xs p-1 h-auto"
                                            onClick={() => window.open(results.video_url, '_blank')}
                                        >
                                            <Download className="w-3 h-3 mr-1" />
                                            Download MP4
                                        </Button>
                                    </div>
                                </div>

                                {/* Landing Page Results */}
                                <div>
                                    <h4 className="font-medium text-xs text-slate-900 dark:text-white flex items-center mb-1">
                                        <Globe className="w-3 h-3 mr-1 text-blue-600" />
                                        Landing Page
                                    </h4>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-xs p-1 h-auto"
                                        onClick={() => window.open(results.landing_url, '_blank')}
                                    >
                                        <ExternalLink className="w-3 h-3 mr-1" />
                                        Visit Website
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}

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
                        {!isCompleted ? (
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                className="flex-1 px-2 py-1 text-xs"
                            >
                                Cancel
                            </Button>
                        ) : (
                            <Button
                                onClick={handleClose}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs"
                            >
                                <Check className="w-3 h-3 mr-1" />
                                Complete
                            </Button>
                        )}

                        <div className="text-xs text-slate-500 dark:text-zinc-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            3-5 min
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 