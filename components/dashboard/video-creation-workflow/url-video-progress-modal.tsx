"use client"

import { useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Clock, ArrowRight, Globe, Zap } from "lucide-react"
import Image from "next/image"
import { VideoConfiguration } from "./types/video-configuration"
import { toast } from "sonner"

interface UrlVideoProgressModalProps {
    isOpen: boolean
    onClose: (success?: boolean | null) => void
    websiteUrl: string
    projectId?: number | string
    configuration: VideoConfiguration
}

export function UrlVideoProgressModal({
    isOpen,
    onClose,
    websiteUrl,
    configuration
}: UrlVideoProgressModalProps) {
    // Track component mounting state
    const isMountedRef = useRef(true)

    useEffect(() => {
        isMountedRef.current = true
        return () => {
            isMountedRef.current = false
        }
    }, [])

    const handleClose = () => {
        if (isMountedRef.current) {
            toast.success('Video Creation Started Successfully', {
                description: 'Your video is being created from your website. You\'ll receive an email when ready.',
                duration: 5000
            })
        }
        onClose(null)
    }

    const getDomainName = (url: string) => {
        try {
            return new URL(url).hostname
        } catch {
            return url
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className="max-w-lg"
                aria-describedby="url-video-creation-description"
            >
                <DialogHeader className="text-center space-y-4">
                    <div className="flex justify-center">
                        <Image
                            src="/fastadslogo.png"
                            alt="FAST ADS AI Logo"
                            width={32}
                            height={32}
                        />
                    </div>
                    <DialogTitle className="text-2xl font-bold">
                        Video Creation Started!
                    </DialogTitle>
                    <DialogDescription
                        id="url-video-creation-description"
                        className="text-base text-muted-foreground"
                    >
                        Your video ad is being generated from your website
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-6">
                    {/* Success Message */}
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                        <div className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                                    <CheckCircle className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">
                                    Website Analysis Started
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Our AI is analyzing your website and creating a professional video ad
                                </p>
                                <div className="bg-white dark:bg-background rounded-lg p-4 border text-left">
                                    <h4 className="font-medium text-sm mb-3">Source Details:</h4>
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                        <div>
                                            <span className="font-medium text-muted-foreground">Website:</span>
                                            <p className="truncate">{getDomainName(websiteUrl)}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-muted-foreground">Platform:</span>
                                            <p className="capitalize">{configuration.target_platform}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-muted-foreground">Duration:</span>
                                            <p>{configuration.video_length}s</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-muted-foreground">Language:</span>
                                            <p className="capitalize">{configuration.language}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Faster Creation Info */}
                    <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                                <Zap className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-green-900 dark:text-green-100">
                                    Faster Creation Mode
                                </h4>
                                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                    Estimated completion: 3-5 minutes
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Time Estimate */}
                    <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-full">
                                <Clock className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                                    What's happening now:
                                </h4>
                                <div className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                                    <p>• Analyzing your website content</p>
                                    <p>• Extracting product information</p>
                                    <p>• Creating AI-generated video content</p>
                                    <p>• Optimizing for {configuration.target_platform}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Action Button */}
                    <div className="text-center">
                        <Button
                            onClick={handleClose}
                            className="w-full"
                            size="lg"
                        >
                            Continue
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                            The process will continue in the background
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 