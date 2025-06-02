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
    Rocket
} from "lucide-react"
import Image from "next/image"

interface VideoProgressModalProps {
    isOpen: boolean
    onClose: () => void
    projectName: string
    configuration: any
}

interface ProgressStep {
    id: string
    title: string
    description: string
    icon: any
    status: "pending" | "running" | "completed" | "error"
    progress: number
    details?: string
    estimated_time?: string
}

interface WorkflowResult {
    video_url?: string
    site_url?: string
    custom_domain?: string
    social_results?: any
    preview_thumbnail?: string
}

export function VideoProgressModal({ isOpen, onClose, projectName, configuration }: VideoProgressModalProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [overallProgress, setOverallProgress] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [result, setResult] = useState<WorkflowResult | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [steps, setSteps] = useState<ProgressStep[]>([
        {
            id: "upload",
            title: "Image Analysis",
            description: "AI analyzing your product images",
            icon: ImageIcon,
            status: "pending",
            progress: 0,
            estimated_time: "30s"
        },
        {
            id: "landing",
            title: "Landing Page Creation",
            description: "Generating professional landing page",
            icon: Code,
            status: "pending",
            progress: 0,
            estimated_time: "45s"
        },
        {
            id: "deploy",
            title: "Website Deployment",
            description: "Deploying to live URL",
            icon: Rocket,
            status: "pending",
            progress: 0,
            estimated_time: "20s"
        },
        {
            id: "video",
            title: "Video Generation",
            description: "Creating AI video with Creatify",
            icon: Video,
            status: "pending",
            progress: 0,
            estimated_time: "120s"
        },
        {
            id: "domain",
            title: "Domain Setup",
            description: "Configuring custom domain",
            icon: Globe,
            status: "pending",
            progress: 0,
            estimated_time: "30s"
        },
        {
            id: "social",
            title: "Social Publishing",
            description: "Publishing to social platforms",
            icon: Share2,
            status: "pending",
            progress: 0,
            estimated_time: "15s"
        }
    ])

    // Simula il workflow del backend
    useEffect(() => {
        if (!isOpen) return

        const simulateWorkflow = async () => {
            // Step 1: Image Analysis
            await processStep(0, "Analyzing product images with ChatGPT Vision...")

            // Step 2: Landing Page
            await processStep(1, "Generating landing page with Claude AI...")

            // Step 3: Deploy
            await processStep(2, "Deploying to Vercel...")

            // Step 4: Video Generation (longer process)
            await processStep(3, "Creating video with advanced AI models...", 120000)

            // Step 5: Domain (only if enabled)
            if (configuration.buy_custom_domain) {
                await processStep(4, "Setting up custom domain...")
            } else {
                updateStepStatus(4, "completed", 100, "Skipped - using temporary URL")
            }

            // Step 6: Social (only if enabled)
            if (configuration.publish_to_socials) {
                await processStep(5, "Publishing to social platforms...")
            } else {
                updateStepStatus(5, "completed", 100, "Skipped - manual publishing")
            }

            // Completion
            setIsCompleted(true)
            setResult({
                video_url: "https://example.com/video.mp4",
                site_url: configuration.buy_custom_domain ?
                    `https://${configuration.custom_domain_name}` :
                    "https://your-product-abc123.vercel.app",
                custom_domain: configuration.buy_custom_domain ? configuration.custom_domain_name : undefined,
                preview_thumbnail: "/placeholder.svg?height=300&width=400"
            })
        }

        simulateWorkflow()
    }, [isOpen, configuration])

    const processStep = async (stepIndex: number, details: string, duration: number = 30000) => {
        setCurrentStep(stepIndex)
        updateStepStatus(stepIndex, "running", 0, details)

        // Simulate progress
        const progressInterval = setInterval(() => {
            setSteps(prev => {
                const updated = [...prev]
                if (updated[stepIndex].progress < 100) {
                    updated[stepIndex].progress = Math.min(100, updated[stepIndex].progress + Math.random() * 10)
                }
                return updated
            })
        }, duration / 20)

        // Complete after duration
        setTimeout(() => {
            clearInterval(progressInterval)
            updateStepStatus(stepIndex, "completed", 100, "Completed successfully")

            // Update overall progress
            const completedSteps = stepIndex + 1
            const totalSteps = steps.filter(s =>
                s.id !== "domain" || configuration.buy_custom_domain
            ).filter(s =>
                s.id !== "social" || configuration.publish_to_socials
            ).length
            setOverallProgress((completedSteps / totalSteps) * 100)
        }, duration)

        return new Promise(resolve => setTimeout(resolve, duration + 100))
    }

    const updateStepStatus = (stepIndex: number, status: ProgressStep["status"], progress: number, details?: string) => {
        setSteps(prev => {
            const updated = [...prev]
            updated[stepIndex] = {
                ...updated[stepIndex],
                status,
                progress,
                details
            }
            return updated
        })
    }

    const handleClose = () => {
        if (isCompleted) {
            // Reset state
            setCurrentStep(0)
            setOverallProgress(0)
            setIsCompleted(false)
            setResult(null)
            setError(null)
            setSteps(prev => prev.map(step => ({
                ...step,
                status: "pending" as const,
                progress: 0,
                details: undefined
            })))
        }
        onClose()
    }

    const getStepIcon = (step: ProgressStep) => {
        if (step.status === "completed") return CheckCircle
        if (step.status === "error") return AlertCircle
        if (step.status === "running") return Clock
        return step.icon
    }

    const getStepColor = (step: ProgressStep) => {
        switch (step.status) {
            case "completed": return "text-green-500"
            case "error": return "text-red-500"
            case "running": return "text-blue-500"
            default: return "text-slate-400"
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center text-slate-900 dark:text-white">
                        <Image src="/adsmakerlogo.png" alt="ADS MAKER AI Logo" width={34} height={34} className="mr-4" />
                        {isCompleted ? "Video Creation Complete!" : "Creating Your Video Ad"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Project Info */}
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">{projectName}</h3>
                                <p className="text-sm text-slate-600 dark:text-zinc-400">
                                    {configuration.target_platform} • {configuration.language} • {configuration.video_length}s
                                </p>
                            </div>
                            <Badge className={isCompleted ? "bg-green-500 text-white" : "bg-blue-500 text-white"}>
                                {isCompleted ? (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Complete
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-4 h-4 mr-1 animate-pulse" />
                                        Processing
                                    </>
                                )}
                            </Badge>
                        </div>
                    </Card>

                    {!isCompleted ? (
                        <>
                            {/* Overall Progress */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Overall Progress</h3>
                                    <span className="text-sm text-slate-600 dark:text-zinc-400">{Math.round(overallProgress)}%</span>
                                </div>
                                <Progress value={overallProgress} className="h-3" />
                            </div>

                            {/* Step Progress */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Processing Steps</h3>
                                <div className="space-y-3">
                                    {steps.map((step, index) => {
                                        const StepIcon = getStepIcon(step)
                                        const isCurrentStep = index === currentStep
                                        const shouldShow = step.id !== "domain" || configuration.buy_custom_domain
                                        const shouldShowSocial = step.id !== "social" || configuration.publish_to_socials

                                        if (!shouldShow || !shouldShowSocial) return null

                                        return (
                                            <Card
                                                key={step.id}
                                                className={`p-4 transition-all border-2 ${isCurrentStep && step.status === "running"
                                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 animate-pulse"
                                                    : step.status === "completed"
                                                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                                        : step.status === "error"
                                                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                                            : "border-slate-200 dark:border-zinc-700"
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <StepIcon className={`w-6 h-6 ${getStepColor(step)} ${step.status === "running" ? "animate-spin" : ""}`} />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-medium text-slate-900 dark:text-white">{step.title}</h4>
                                                            <span className="text-sm text-slate-500">{step.estimated_time}</span>
                                                        </div>
                                                        <p className="text-sm text-slate-600 dark:text-zinc-400 mb-2">{step.description}</p>
                                                        {step.details && (
                                                            <p className="text-xs text-slate-500 dark:text-zinc-500 mb-2">{step.details}</p>
                                                        )}
                                                        {step.status === "running" && (
                                                            <Progress value={step.progress} className="h-2" />
                                                        )}
                                                    </div>
                                                </div>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Results */
                        <div className="space-y-6">
                            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                                <div className="text-center">
                                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Success! Your video ad is ready</h3>
                                    <p className="text-slate-600 dark:text-zinc-400">
                                        Everything has been created and deployed successfully
                                    </p>
                                </div>
                            </Card>

                            {/* Results Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Video Preview */}
                                <Card className="p-4">
                                    <h4 className="font-semibold mb-3 flex items-center text-slate-900 dark:text-white">
                                        <Video className="w-5 h-5 mr-2" />
                                        Video Ad
                                    </h4>
                                    <div className="aspect-video bg-slate-100 dark:bg-zinc-800 rounded-lg mb-3 flex items-center justify-center">
                                        <Play className="w-12 h-12 text-slate-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <Button size="sm" className="w-full">
                                            <Play className="w-4 h-4 mr-2" />
                                            Watch Video
                                        </Button>
                                        <Button size="sm" variant="outline" className="w-full">
                                            <Download className="w-4 h-4 mr-2" />
                                            Download
                                        </Button>
                                    </div>
                                </Card>

                                {/* Website */}
                                <Card className="p-4">
                                    <h4 className="font-semibold mb-3 flex items-center text-slate-900 dark:text-white">
                                        <Globe className="w-5 h-5 mr-2" />
                                        Landing Page
                                    </h4>
                                    <div className="aspect-video bg-slate-100 dark:bg-zinc-800 rounded-lg mb-3 flex items-center justify-center">
                                        <Eye className="w-12 h-12 text-slate-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <Button size="sm" className="w-full" asChild>
                                            <a href={result?.site_url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                View Live Site
                                            </a>
                                        </Button>
                                        <p className="text-xs text-slate-500 dark:text-zinc-500 truncate">
                                            {result?.site_url}
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            {/* Quick Actions */}
                            <Card className="p-4">
                                <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Quick Actions</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <Button variant="outline" size="sm">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share on Social
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Assets
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Create Another
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Close Button */}
                    <div className="flex justify-center pt-4 border-t border-slate-200 dark:border-zinc-700">
                        <Button
                            onClick={handleClose}
                            variant={isCompleted ? "default" : "outline"}
                            className={isCompleted ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8" : ""}
                        >
                            {isCompleted ? "Done" : "Close"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 