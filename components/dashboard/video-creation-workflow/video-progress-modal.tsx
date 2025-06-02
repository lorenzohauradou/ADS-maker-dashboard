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
    MonitorPlay
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
                        <Image src="/adsmakerlogo.png" alt="ADS MAKER AI Logo" width={34} height={34} className="mr-4" />
                        {isCompleted ? "Video Created Successfully!" : "Creating Your Video Ad"}
                    </DialogTitle>
                    <p id="dialog-description" className="text-slate-600 dark:text-zinc-400 mt-2">
                        {isCompleted ? "Your professional video advertisement is ready!" : "AI is working its magic to create your perfect video advertisement"}
                    </p>
                </DialogHeader>

                <div className="space-y-8">
                    {/* Project Overview */}
                    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 border-2 border-purple-200 dark:border-purple-800 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{projectName}</h3>
                                <p className="text-slate-600 dark:text-zinc-400 mt-1">
                                    {configuration.target_platform} • {configuration.video_length}s • {configuration.language.toUpperCase()}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    {Math.round(overallProgress)}%
                                </div>
                                <div className="text-sm text-slate-600 dark:text-zinc-400">Complete</div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Progress
                                value={overallProgress}
                                className="h-3 bg-slate-200 dark:bg-zinc-700 rounded-full"
                            />
                        </div>
                    </Card>

                    {/* Processing Steps */}
                    <div className="space-y-4">
                        {steps.map((step, index) => {
                            const shouldShow = step.id !== "domain" || configuration.buy_custom_domain

                            if (!shouldShow) return null

                            return (
                                <Card
                                    key={step.id}
                                    className={`p-6 border-2 transition-all duration-500 rounded-xl ${step.status === "completed"
                                        ? "border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 dark:border-green-600 shadow-lg"
                                        : step.status === "processing"
                                            ? "border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 dark:border-blue-600 shadow-lg"
                                            : step.status === "error"
                                                ? "border-red-400 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 dark:border-red-600"
                                                : "border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${step.status === "completed"
                                                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                                                : step.status === "processing"
                                                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                                                    : step.status === "error"
                                                        ? "bg-gradient-to-r from-red-500 to-rose-500 text-white"
                                                        : "bg-slate-200 dark:bg-zinc-700 text-slate-500 dark:text-zinc-400"
                                                }`}>
                                                {step.status === "completed" && <Check className="w-6 h-6" />}
                                                {step.status === "processing" && <Loader2 className="w-6 h-6 animate-spin" />}
                                                {step.status === "error" && <AlertCircle className="w-6 h-6" />}
                                                {step.status === "waiting" && <Clock className="w-6 h-6" />}
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h4>
                                                <p className="text-slate-600 dark:text-zinc-400">{step.description}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            {step.status === "processing" && (
                                                <div className="w-32">
                                                    <Progress
                                                        value={step.progress}
                                                        className="h-2 bg-slate-200 dark:bg-zinc-700"
                                                    />
                                                    <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1 text-center">
                                                        {step.progress}%
                                                    </p>
                                                </div>
                                            )}

                                            <Badge className={`px-3 py-1 rounded-full font-semibold ${step.status === "completed" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" :
                                                step.status === "processing" ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white" :
                                                    step.status === "error" ? "bg-gradient-to-r from-red-500 to-rose-500 text-white" :
                                                        "bg-slate-200 text-slate-700 dark:bg-zinc-700 dark:text-zinc-300"
                                                }`}>
                                                {step.status === "completed" ? "✅ Done" :
                                                    step.status === "processing" ? "⚡ Processing" :
                                                        step.status === "error" ? "❌ Error" : "⏳ Waiting"}
                                            </Badge>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Results Section */}
                    {isCompleted && results && (
                        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 border-green-200 dark:border-green-800">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                                <Sparkles className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                                Your Video Ad is Ready!
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Video Results */}
                                <div className="space-y-3">
                                    <h4 className="font-medium text-slate-900 dark:text-white flex items-center">
                                        <Video className="w-4 h-4 mr-2 text-red-600 dark:text-red-400" />
                                        Video Advertisement
                                    </h4>
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={() => window.open(results.video_url, '_blank')}
                                        >
                                            <MonitorPlay className="w-4 h-4 mr-2" />
                                            Preview Video
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={() => window.open(results.video_url, '_blank')}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download MP4
                                        </Button>
                                    </div>
                                </div>

                                {/* Landing Page Results */}
                                <div className="space-y-3">
                                    <h4 className="font-medium text-slate-900 dark:text-white flex items-center">
                                        <Globe className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                                        Landing Page
                                    </h4>
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={() => window.open(results.landing_url, '_blank')}
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Visit Website
                                        </Button>
                                        <p className="text-xs text-slate-500 dark:text-zinc-500 truncate">
                                            {results.landing_url}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Configuration Summary */}
                    <Card className="bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 p-4">
                        <h4 className="font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                            <Settings className="w-4 h-4 mr-2" />
                            Configuration Used
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-slate-600 dark:text-zinc-400">Platform:</span>
                                <p className="font-medium text-slate-900 dark:text-white capitalize">{configuration.target_platform}</p>
                            </div>
                            <div>
                                <span className="text-slate-600 dark:text-zinc-400">Duration:</span>
                                <p className="font-medium text-slate-900 dark:text-white">{configuration.video_length}s</p>
                            </div>
                            <div>
                                <span className="text-slate-600 dark:text-zinc-400">Language:</span>
                                <p className="font-medium text-slate-900 dark:text-white">{configuration.language.toUpperCase()}</p>
                            </div>
                            <div>
                                <span className="text-slate-600 dark:text-zinc-400">Style:</span>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {configuration.visual_style.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-zinc-700">
                        {!isCompleted ? (
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                className="px-6 border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300"
                            >
                                Cancel
                            </Button>
                        ) : (
                            <Button
                                onClick={handleClose}
                                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8"
                            >
                                <Check className="w-4 h-4 mr-2" />
                                Complete
                            </Button>
                        )}

                        <div className="text-sm text-slate-500 dark:text-zinc-500 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Estimated: 3-5 minutes
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 