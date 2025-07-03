"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Rocket,
    Eye,
    ImageIcon,
    User,
    Clock,
    Target,
    Zap,
    Settings,
    Globe,
} from "lucide-react"

interface SimpleReviewStepProps {
    wizardData: any
    onFinalizeReady: (isReady: boolean) => void
}

export function SimpleReviewStep({ wizardData, onFinalizeReady }: SimpleReviewStepProps) {
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const handleTermsChange = (checked: boolean) => {
        setAgreedToTerms(checked)
        onFinalizeReady(checked && canProceed)
    }

    // ✅ FIXED: Coerente con ImageUploadStep - accetta URL o immagini
    const canProceed = wizardData.projectName?.trim() &&
        wizardData.selectedAvatar &&
        (wizardData.productUrl?.trim() || wizardData.images?.length > 0)

    const AVATARS = [
        { value: "sarah_pro", label: "Sarah Professional", icon: "👩‍💼", gender: "female" },
        { value: "marco_friendly", label: "Marco Friendly", icon: "👨‍💼", gender: "male" },
        { value: "elena_energica", label: "Elena Dynamic", icon: "⚡", gender: "female" },
        { value: "alessandro_carismatico", label: "Alessandro Charismatic", icon: "🎭", gender: "male" }
    ]

    const AUDIENCES = [
        { value: "giovani", label: "Young Adults (18-35)", icon: "🎯" },
        { value: "famiglie", label: "Families", icon: "👨‍👩‍👧‍👦" },
        { value: "professionisti", label: "Professionals", icon: "💼" },
        { value: "anziani", label: "Seniors (55+)", icon: "👵" },
        { value: "young-adults", label: "Young Adults", icon: "🎯" }
    ]

    const PLATFORMS = [
        { value: "instagram", label: "Instagram", icon: "📱", aspect: "9:16" },
        { value: "tiktok", label: "TikTok", icon: "🎵", aspect: "9:16" },
        { value: "youtube", label: "YouTube", icon: "📺", aspect: "16:9" },
        { value: "facebook", label: "Facebook", icon: "👥", aspect: "1:1" }
    ]

    const selectedAvatar = wizardData.selectedAvatar || AVATARS.find(a => a.value === wizardData.avatar)
    const selectedAudience = AUDIENCES.find(a => a.value === wizardData.targetAudience)
    const selectedPlatform = PLATFORMS.find(p => p.value === wizardData.platform)

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Final Review
                </h2>
                <p className="text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                    Review your configuration and launch your AI video creation
                </p>
            </div>

            {/* Configuration Summary */}
            <Card className="bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Settings className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Video Configuration
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">Project</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="font-medium text-gray-900 dark:text-white text-base">
                                {wizardData.projectName || "Untitled Project"}
                            </div>
                            {wizardData.productUrl?.trim() ? (
                                <>
                                    <div className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center">
                                        <span className="mr-1">🔗</span>
                                        URL-based creation
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-zinc-400 mt-1 truncate">
                                        {wizardData.productUrl}
                                    </div>
                                    {wizardData.images?.length > 0 && (
                                        <div className="text-sm text-gray-600 dark:text-zinc-400 mt-1">
                                            + {wizardData.images.length} additional images
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-sm text-gray-600 dark:text-zinc-400 mt-1">
                                    {wizardData.images?.length || 0} images uploaded
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Presenter */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">Presenter</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{selectedAvatar?.icon || "👤"}</span>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white text-base">
                                        {selectedAvatar?.name || selectedAvatar?.label || "Professional Presenter"}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-zinc-400">
                                        {selectedAvatar?.gender === 'female' ? 'Female voice' : 'Male voice'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                                <Target className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">Target Audience</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{selectedAudience?.icon || "🎯"}</span>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white text-base">
                                        {selectedAudience?.label || wizardData.targetAudience?.replace('-', ' ') || "Optimized Content"}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-zinc-400">
                                        Optimized content
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Format & Duration */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <Clock className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">Format & Duration</span>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{selectedPlatform?.icon || "📱"}</span>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white text-base">
                                        {selectedPlatform?.label || "Instagram"} • {wizardData.videoLength || 30}s
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-zinc-400">
                                        Format {selectedPlatform?.aspect || "9:16"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* URL-based Creation Info */}
            {wizardData.productUrl?.trim() && !wizardData.images?.length && (
                <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <Globe className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            URL-Based Creation
                        </h3>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-green-200 dark:border-green-700 shadow-sm">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    AI will analyze your product page
                                </h4>
                                <div className="text-sm text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 font-mono truncate">
                                    {wizardData.productUrl}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-zinc-400 mt-3">
                                    <span className="mr-1">🤖</span>
                                    Our AI will automatically extract product images, descriptions, and features from the URL to create your video.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Images Preview */}
            {wizardData.images?.length > 0 && (
                <Card className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Product Images
                        </h3>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {wizardData.images.slice(0, 6).map((image: any, index: number) => (
                            <div key={image.id} className="relative">
                                <div className="aspect-square bg-gray-100 dark:bg-zinc-700 rounded-xl overflow-hidden shadow-sm">
                                    <img
                                        src={image.preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {index === 0 && (
                                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1">
                                        Main
                                    </Badge>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* What Will Be Created */}
            <Card className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        What Will Be Created
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* AI Video */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-amber-200 dark:border-amber-700 shadow-sm">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                    AI Video Ad
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-zinc-400">
                                    {wizardData.videoLength || 30}s • {selectedPlatform?.label || "Instagram"} • With presenter
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Landing Page */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-amber-200 dark:border-amber-700 shadow-sm">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Landing Page
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-zinc-400">
                                    Optimized web page for conversions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Estimated Time */}
                <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-700">
                    <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-amber-600" />
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                Estimated Creation Time
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-zinc-400">
                                5-8 minutes to complete both items. You'll receive an email notification when ready.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Terms & Launch */}
            <Card className="bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg">
                {/* Terms */}
                <div className="mb-8">
                    <div className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <Checkbox
                            id="terms"
                            checked={agreedToTerms}
                            onCheckedChange={handleTermsChange}
                            className="border-slate-300 data-[state=checked]:bg-slate-600 mt-1 w-5 h-5"
                        />
                        <div className="flex-1">
                            <label htmlFor="terms" className="text-slate-700 dark:text-zinc-300 cursor-pointer block leading-relaxed">
                                <span className="font-medium">I agree to the terms of service</span> and confirm that I have the rights
                                to use all provided content for the creation of this advertising video.
                            </label>
                            <p className="text-sm text-slate-500 dark:text-zinc-500 mt-2">
                                The video will be created using the most advanced AI. Your data is secure.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Launch Section */}
                <div className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${canProceed && agreedToTerms
                            ? "bg-gradient-to-br from-green-500 to-emerald-600"
                            : "bg-gradient-to-br from-gray-400 to-slate-500"
                            }`}>
                            <Rocket className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    <div>
                        <h3 className={`text-2xl font-bold mb-3 ${canProceed && agreedToTerms
                            ? "text-green-900 dark:text-green-100"
                            : "text-gray-700 dark:text-gray-300"
                            }`}>
                            {canProceed && agreedToTerms ? "Ready to Launch!" : "Complete to Continue"}
                        </h3>
                        <p className={`text-base max-w-md mx-auto ${canProceed && agreedToTerms
                            ? "text-green-700 dark:text-green-300"
                            : "text-gray-600 dark:text-gray-400"
                            }`}>
                            {canProceed && agreedToTerms
                                ? "Click 'Create Video' to start the generation process"
                                : "Make sure everything is configured correctly"
                            }
                        </p>
                    </div>

                    {(!canProceed || !agreedToTerms) && (
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 max-w-md mx-auto">
                            <div className="text-amber-800 dark:text-amber-200 text-sm space-y-1 text-left">
                                {!wizardData.projectName?.trim() && <p>• Enter project name</p>}
                                {!wizardData.selectedAvatar && <p>• Select a presenter</p>}
                                {(!wizardData.productUrl?.trim() && !wizardData.images?.length) && <p>• Provide either product URL or upload images</p>}
                                {!agreedToTerms && <p>• Accept terms of service</p>}
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
} 