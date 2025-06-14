"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Sparkles,
    Video,
    Globe,
    Eye,
    X,
    CheckCircle,
    AlertCircle,
    Clock,
    Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectPhase {
    name: string
    description: string
    progress_range: [number, number]
    completed: boolean
    current: boolean
}

interface ProgressStatusBarProps {
    isVisible: boolean
    progress?: number
    currentPhase?: string
    phases?: ProjectPhase[]
    projectName?: string
    onDismiss?: () => void
    onViewProgress?: () => void
    status?: 'processing' | 'completed' | 'failed'
}

export function ProgressStatusBar({
    isVisible,
    progress = 0,
    currentPhase = "Initializing",
    phases = [],
    projectName = "your video ad",
    onDismiss,
    onViewProgress,
    status = 'processing'
}: ProgressStatusBarProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    // Auto-hide after completion
    useEffect(() => {
        if (status === 'completed') {
            const timer = setTimeout(() => {
                onDismiss?.()
            }, 5000) // Auto-hide after 5 seconds
            return () => clearTimeout(timer)
        }
    }, [status, onDismiss])

    if (!isVisible) return null

    const getStatusIcon = () => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'failed':
                return <AlertCircle className="w-5 h-5 text-red-500" />
            default:
                return <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
        }
    }

    const getStatusMessage = () => {
        switch (status) {
            case 'completed':
                return `🎉 Your AI-powered video ad and landing page for "${projectName}" are ready!`
            case 'failed':
                return `❌ Failed to create video ad for "${projectName}". Please try again.`
            default:
                return `🚀 AI is creating your video ad and landing page for "${projectName}"...`
        }
    }

    const getCurrentPhaseDescription = () => {
        const current = phases.find(phase => phase.current)
        if (current) {
            return current.description
        }

        // Fallback descriptions based on phase name
        switch (currentPhase?.toLowerCase()) {
            case 'analyzing_product':
                return 'Analyzing your product images and description'
            case 'generating_script':
                return 'Creating compelling ad copy and script'
            case 'creating_video':
                return 'Generating your professional video advertisement'
            case 'building_landing_page':
                return 'Building your custom landing page'
            case 'finalizing':
                return 'Adding final touches and optimizations'
            default:
                return 'Processing your request...'
        }
    }

    return (
        <div className={cn(
            "fixed top-0 left-0 right-0 z-50 bg-gradient-to-r transition-all duration-500 ease-in-out border-b shadow-lg",
            status === 'completed'
                ? "from-green-50 via-emerald-50 to-green-50 dark:from-green-950 dark:via-emerald-950 dark:to-green-950 border-green-200 dark:border-green-800"
                : status === 'failed'
                    ? "from-red-50 via-pink-50 to-red-50 dark:from-red-950 dark:via-pink-950 dark:to-red-950 border-red-200 dark:border-red-800"
                    : "from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 border-blue-200 dark:border-blue-800"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Status Bar */}
                <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-4 flex-1">
                        {/* Status Icon */}
                        <div className="flex-shrink-0">
                            {getStatusIcon()}
                        </div>

                        {/* Status Message */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                {getStatusMessage()}
                            </p>
                            {status === 'processing' && (
                                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                                    {getCurrentPhaseDescription()}
                                </p>
                            )}
                        </div>

                        {/* Progress Bar (only show during processing) */}
                        {status === 'processing' && (
                            <div className="hidden sm:flex items-center space-x-3 flex-shrink-0">
                                <div className="w-32">
                                    <Progress value={progress} className="h-2" />
                                </div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 min-w-[3rem]">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                        {/* View Progress Button */}
                        {onViewProgress && status === 'processing' && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onViewProgress}
                                className="text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-black/20"
                            >
                                <Eye className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline">View Details</span>
                            </Button>
                        )}

                        {/* Dismiss Button */}
                        {onDismiss && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onDismiss}
                                className="text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-black/20"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Mobile Progress Bar */}
                {status === 'processing' && (
                    <div className="sm:hidden pb-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-600 dark:text-slate-300">
                                Progress
                            </span>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>
                )}

                {/* Expanded Phase Details (Optional) */}
                {isExpanded && phases.length > 0 && status === 'processing' && (
                    <div className="border-t border-white/20 dark:border-black/20 pt-3 pb-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {phases.map((phase, index) => (
                                <div
                                    key={phase.name}
                                    className={cn(
                                        "flex items-center space-x-2 p-2 rounded-lg text-xs",
                                        phase.completed
                                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                                            : phase.current
                                                ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                                                : "bg-gray-100 dark:bg-gray-800/20 text-gray-500 dark:text-gray-400"
                                    )}
                                >
                                    <div className={cn(
                                        "w-2 h-2 rounded-full flex-shrink-0",
                                        phase.completed
                                            ? "bg-green-500"
                                            : phase.current
                                                ? "bg-blue-500 animate-pulse"
                                                : "bg-gray-300 dark:bg-gray-600"
                                    )} />
                                    <span className="truncate">{phase.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 