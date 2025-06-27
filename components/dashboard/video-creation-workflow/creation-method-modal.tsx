"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Globe,
    Upload,
    Zap,
    Sparkles,
    Clock,
    ArrowRight,
    X,
    CheckCircle,
    AlertCircle,
    Loader2
} from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface CreationMethodModalProps {
    isOpen: boolean
    onClose: () => void
    onSelectImageUpload: () => void
    onSelectWebsiteUrl: (url: string) => void
}

export function CreationMethodModal({
    isOpen,
    onClose,
    onSelectImageUpload,
    onSelectWebsiteUrl
}: CreationMethodModalProps) {
    const [selectedMethod, setSelectedMethod] = useState<"images" | "url" | null>(null)
    const [websiteUrl, setWebsiteUrl] = useState("")
    const [isValidatingUrl, setIsValidatingUrl] = useState(false)
    const [urlError, setUrlError] = useState("")

    const validateUrl = (url: string): boolean => {
        try {
            new URL(url)
            return url.startsWith('http://') || url.startsWith('https://')
        } catch {
            return false
        }
    }

    const handleUrlSubmit = async () => {
        if (!websiteUrl.trim()) {
            setUrlError("Please enter a website URL")
            return
        }

        if (!validateUrl(websiteUrl)) {
            setUrlError("Please enter a valid URL (must start with http:// or https://)")
            return
        }

        setIsValidatingUrl(true)
        setUrlError("")

        try {
            // Simulate URL validation (you can implement actual validation)
            await new Promise(resolve => setTimeout(resolve, 1500))

            // For demo purposes, reject URLs containing 'invalid'
            if (websiteUrl.toLowerCase().includes('invalid')) {
                throw new Error("Unable to access this website")
            }

            onSelectWebsiteUrl(websiteUrl)
        } catch (error) {
            setUrlError(error instanceof Error ? error.message : "Unable to validate URL")
        } finally {
            setIsValidatingUrl(false)
        }
    }

    const handleClose = () => {
        setSelectedMethod(null)
        setWebsiteUrl("")
        setUrlError("")
        setIsValidatingUrl(false)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
                aria-describedby="creation-method-description"
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center text-slate-900 dark:text-white">
                        <Image src="/fastadslogo.png" alt="FAST ADS AI Logo" width={32} height={32} className="mr-4" />
                        How would you like to create your video ad?
                    </DialogTitle>
                    <p id="creation-method-description" className="text-slate-600 dark:text-zinc-400">
                        Choose the method that works best for your needs
                    </p>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                    {/* Method Selection */}
                    {!selectedMethod && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Website URL Method */}
                            <Card
                                className="p-6 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800"
                                onClick={() => setSelectedMethod("url")}
                            >
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                            From Website URL
                                        </h3>
                                        <p className="text-slate-600 dark:text-zinc-400 mb-4">
                                            Paste your product website URL and we'll create a video ad automatically
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center space-x-2 text-sm">
                                            <Zap className="w-4 h-4 text-blue-600" />
                                            <span className="font-medium text-blue-700 dark:text-blue-300">Faster Creation</span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-2 text-sm">
                                            <Clock className="w-4 h-4 text-green-600" />
                                            <span className="font-medium text-green-700 dark:text-green-300">3-5 minutes</span>
                                        </div>
                                    </div>

                                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                                        Video Ad Only
                                    </Badge>
                                </div>
                            </Card>

                            {/* Image Upload Method */}
                            <Card
                                className="p-6 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:border-purple-400 dark:hover:border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800"
                                onClick={() => setSelectedMethod("images")}
                            >
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                        <Upload className="w-8 h-8 text-white" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                            Upload Product Images
                                        </h3>
                                        <p className="text-slate-600 dark:text-zinc-400 mb-4">
                                            Upload your product images for a complete marketing solution
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center space-x-2 text-sm">
                                            <Sparkles className="w-4 h-4 text-purple-600" />
                                            <span className="font-medium text-purple-700 dark:text-purple-300">Full Marketing Kit</span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-2 text-sm">
                                            <Clock className="w-4 h-4 text-amber-600" />
                                            <span className="font-medium text-amber-700 dark:text-amber-300">5-8 minutes</span>
                                        </div>
                                    </div>

                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                        Video Ad + Landing Page
                                    </Badge>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* URL Input Form */}
                    {selectedMethod === "url" && (
                        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                        Enter Your Product Website
                                    </h3>
                                    <p className="text-slate-600 dark:text-zinc-400">
                                        We'll analyze your website and create a professional video ad
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="website-url" className="text-lg font-semibold text-slate-900 dark:text-white">
                                            Website URL
                                        </Label>
                                        <Input
                                            id="website-url"
                                            placeholder="https://your-product-website.com"
                                            value={websiteUrl}
                                            onChange={(e) => {
                                                setWebsiteUrl(e.target.value)
                                                setUrlError("")
                                            }}
                                            className="text-lg p-4 rounded-xl border-2 border-slate-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-zinc-800"
                                            disabled={isValidatingUrl}
                                        />
                                    </div>

                                    {urlError && (
                                        <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                            <span className="text-red-700 dark:text-red-300 font-medium">{urlError}</span>
                                        </div>
                                    )}

                                    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                                            <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                                            What we'll create:
                                        </h4>
                                        <div className="space-y-2 text-sm text-slate-700 dark:text-zinc-300">
                                            <p>• AI-generated video ad based on your website content</p>
                                            <p>• Optimized for your target platform (Instagram, TikTok, etc.)</p>
                                            <p>• Professional script and visuals</p>
                                            <p>• Ready to download and use</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <Button
                                        onClick={() => setSelectedMethod(null)}
                                        variant="outline"
                                        className="flex-1 py-3 border-2 border-slate-300 dark:border-zinc-700"
                                        disabled={isValidatingUrl}
                                    >
                                        <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                                        Back to Options
                                    </Button>
                                    <Button
                                        onClick={handleUrlSubmit}
                                        disabled={!websiteUrl.trim() || isValidatingUrl}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3"
                                    >
                                        {isValidatingUrl ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Analyzing Website...
                                            </>
                                        ) : (
                                            <>
                                                Create Video Ad
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Images Confirmation */}
                    {selectedMethod === "images" && (
                        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl">
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                                        <Upload className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                        Complete Marketing Solution
                                    </h3>
                                    <p className="text-slate-600 dark:text-zinc-400">
                                        Get both a professional video ad and a custom landing page
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                                        <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                                        What you'll get:
                                    </h4>
                                    <div className="space-y-2 text-sm text-slate-700 dark:text-zinc-300">
                                        <p>• Professional video advertisement</p>
                                        <p>• Custom landing page for your product</p>
                                        <p>• AI-optimized content and design</p>
                                        <p>• Full marketing funnel ready to use</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <Button
                                        onClick={() => setSelectedMethod(null)}
                                        variant="outline"
                                        className="flex-1 py-3 border-2 border-slate-300 dark:border-zinc-700"
                                    >
                                        <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                                        Back to Options
                                    </Button>
                                    <Button
                                        onClick={onSelectImageUpload}
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                                    >
                                        Upload Images
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Close Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-zinc-700">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="px-6 border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 