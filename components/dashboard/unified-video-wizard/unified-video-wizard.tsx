"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowRight,
    ArrowLeft,
    X,
    Sparkles,
    Zap
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

// Step Components - NEW CONVERSATIONAL WIZARD
import { ImageUploadStep } from "@/components/dashboard/unified-video-wizard/steps/image-upload-step"
import { AvatarConfigStep } from "@/components/dashboard/unified-video-wizard/steps/avatar-config-step"
import { PlatformSelectionStep } from "./steps/platform-selection-step"
import { TargetAudienceStep } from "./steps/target-audience-step"
import { VideoLengthStep } from "./steps/video-length-step"
import { TemplateSelectionStep } from "./steps/template-selection-step"
import { SimpleReviewStep } from "@/components/dashboard/unified-video-wizard/steps/simple-review-step"
import { SuccessStep } from "@/components/dashboard/unified-video-wizard/steps/success-step"

interface ImageFile {
    file: File
    preview: string
    id: string
}

interface UnifiedVideoWizardProps {
    isOpen: boolean
    onClose: () => void
    onComplete: (wizardData: any) => void
    userId?: string
}

// 🎯 NEW CONVERSATIONAL WIZARD - 7 SINGLE-PURPOSE STEPS
interface WizardData {
    // Step 1: Upload Images
    images: ImageFile[]
    projectName: string
    productUrl: string

    // Step 2: Avatar Selection
    avatarType: 'stock' | 'dyoa' | 'byoa' | null
    selectedAvatar: any | null

    // Step 3: Platform Selection
    platform: string

    // Step 4: Target Audience
    targetAudience: string

    // Step 5: Video Length
    videoLength: number

    // Step 6: Template Selection (Optional)
    selectedTemplate: string | null
    templateCategory: string | null
    useCustomTemplate: boolean

    // Step 7: Review & Launch
    finalizeReady: boolean

    // Step 8: Success (after creation)
    isVideoCreated: boolean
}

const WIZARD_STEPS = [
    { id: 1, title: "Upload", subtitle: "Add your product images", icon: "📸", color: "from-blue-500 to-indigo-600" },
    { id: 2, title: "Avatar", subtitle: "Choose your presenter", icon: "👤", color: "from-purple-500 to-pink-600" },
    { id: 3, title: "Platform", subtitle: "Where will you share it?", icon: "📱", color: "from-emerald-500 to-teal-600" },
    { id: 4, title: "Audience", subtitle: "Who are you targeting?", icon: "🎯", color: "from-orange-500 to-red-600" },
    { id: 5, title: "Duration", subtitle: "How long should it be?", icon: "⏱️", color: "from-cyan-500 to-blue-600" },
    { id: 6, title: "Template", subtitle: "Choose your video style (optional)", icon: "🎨", color: "from-indigo-500 to-purple-600" },
    { id: 7, title: "Launch", subtitle: "Review and create video", icon: "🚀", color: "from-green-500 to-emerald-600" },
    { id: 8, title: "Success", subtitle: "Video creation started!", icon: "🎉", color: "from-yellow-500 to-orange-500" }
]

export function UnifiedVideoWizard({ isOpen, onClose, onComplete, userId }: UnifiedVideoWizardProps) {
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [wizardData, setWizardData] = useState<WizardData>({
        // Step 1: Upload Images
        images: [],
        projectName: "",
        productUrl: "",

        // Step 2: Avatar Selection
        avatarType: null,
        selectedAvatar: null,

        // Step 3: Platform Selection
        platform: "instagram",

        // Step 4: Target Audience
        targetAudience: "young-adults",

        // Step 5: Video Length
        videoLength: 30,

        // Step 6: Template Selection (Optional)
        selectedTemplate: null,
        templateCategory: null,
        useCustomTemplate: false,

        // Step 7: Review & Launch
        finalizeReady: false,

        // Step 8: Success (after creation)
        isVideoCreated: false
    })

    const handleStepComplete = async (stepData: Partial<WizardData>) => {
        const updatedData = { ...wizardData, ...stepData }
        setWizardData(updatedData)

        // 🎯 ELEGANT PROGRESS TOAST
        const nextStep = currentStep + 1
        if (nextStep <= 7) {
            const nextStepData = WIZARD_STEPS.find(s => s.id === nextStep)
            toast.success(`Step ${currentStep} completed!`, {
                description: nextStep <= 7 ? `Next: ${nextStepData?.title}` : 'Final preparations...',
                icon: "✅",
                duration: 1500
            })
        }

        if (currentStep < 7) {
            // 🌊 SMOOTH TRANSITION
            setIsLoading(true)

            setTimeout(() => {
                setCurrentStep(currentStep + 1)
                setIsLoading(false)

                // Welcome toast for new step
                const newStepData = WIZARD_STEPS.find(s => s.id === currentStep + 1)
                if (newStepData) {
                    toast.info(`${newStepData.icon} ${newStepData.title}`, {
                        description: newStepData.subtitle,
                        duration: 2000
                    })
                }
            }, 800)
        } else {
            // Finalize and launch creation
            handleFinalizeWizard(updatedData)
        }
    }

    const handleFinalizeWizard = async (finalData: WizardData) => {
        try {
            // Start video creation process
            onComplete(finalData)

            // Show success step
            setWizardData(prev => ({ ...prev, isVideoCreated: true }))
            setCurrentStep(8)

        } catch (error) {
            console.error('Finalization error:', error)
            toast.error('Error during wizard finalization')
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            const prevStepData = WIZARD_STEPS.find(s => s.id === currentStep - 1)
            if (prevStepData) {
                toast.info(`Back to: ${prevStepData.title}`, {
                    description: "You can modify your choices",
                    icon: "↩️",
                    duration: 1500
                })
            }
            setCurrentStep(currentStep - 1)
        }
    }

    const handleClose = () => {
        console.log('🔄 Closing wizard - complete reset for next opening')

        setCurrentStep(1)
        setIsLoading(false)
        setWizardData({
            images: [],
            projectName: "",
            productUrl: "",
            avatarType: null,
            selectedAvatar: null,
            platform: "instagram",
            targetAudience: "young-adults",
            videoLength: 30,
            selectedTemplate: null,
            templateCategory: null,
            useCustomTemplate: false,
            finalizeReady: false,
            isVideoCreated: false
        })

        if (currentStep > 1) {
            toast('🔄 Wizard closed', {
                description: 'Next launch will start fresh with new data.',
                duration: 3000,
                icon: "🔄"
            })
        }

        onClose()
    }

    const currentStepData = WIZARD_STEPS.find(step => step.id === currentStep)

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                // Can proceed with either:
                // 1. Project name + URL (no images required)
                // 2. Project name + at least 1 image
                return wizardData.projectName.trim() !== "" && wizardData.images.length > 0
            case 2: return wizardData.selectedAvatar !== null
            case 3: return wizardData.platform !== ""
            case 4: return wizardData.targetAudience !== ""
            case 5: return wizardData.videoLength > 0
            case 6:
                // Template selection is optional - can always proceed
                // User can choose default templates or custom templates
                return true
            case 7: return wizardData.finalizeReady
            default: return false
        }
    }

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <ImageUploadStep
                        images={wizardData.images}
                        projectName={wizardData.projectName}
                        onImagesUpdate={(images: ImageFile[], projectName: string) => {
                            setWizardData(prev => ({ ...prev, images, projectName }))
                        }}
                        onContinue={() => handleStepComplete({})}
                    />
                )
            case 2:
                return (
                    <AvatarConfigStep
                        avatarType={wizardData.avatarType}
                        selectedAvatar={wizardData.selectedAvatar}
                        onAvatarSelect={(avatar, type) => {
                            setWizardData(prev => ({
                                ...prev,
                                avatarType: type === 'stock' ? 'stock' : wizardData.avatarType,
                                selectedAvatar: avatar
                            }))
                        }}
                        onContinue={() => handleStepComplete({})}
                    />
                )
            case 3:
                return (
                    <PlatformSelectionStep
                        selectedPlatform={wizardData.platform}
                        onPlatformSelect={(platform: string) => {
                            setWizardData(prev => ({ ...prev, platform }))
                        }}
                    />
                )
            case 4:
                return (
                    <TargetAudienceStep
                        selectedAudience={wizardData.targetAudience}
                        onAudienceSelect={(targetAudience: string) => {
                            setWizardData(prev => ({ ...prev, targetAudience }))
                        }}
                    />
                )
            case 5:
                return (
                    <VideoLengthStep
                        selectedLength={wizardData.videoLength}
                        platform={wizardData.platform}
                        onLengthSelect={(videoLength: number) => {
                            setWizardData(prev => ({ ...prev, videoLength }))
                        }}
                    />
                )
            case 6:
                return (
                    <TemplateSelectionStep
                        selectedTemplate={wizardData.selectedTemplate}
                        templateCategory={wizardData.templateCategory}
                        useCustomTemplate={wizardData.useCustomTemplate}
                        onTemplateSelect={(template, category, useCustom) => {
                            setWizardData(prev => ({
                                ...prev,
                                selectedTemplate: template,
                                templateCategory: category,
                                useCustomTemplate: useCustom
                            }))
                        }}
                    />
                )
            case 7:
                return (
                    <SimpleReviewStep
                        wizardData={wizardData}
                        onFinalizeReady={(isReady) => {
                            setWizardData(prev => ({ ...prev, finalizeReady: isReady }))
                        }}
                    />
                )
            case 8:
                return (
                    <SuccessStep
                        projectName={wizardData.projectName}
                        estimatedTime="3-5 minutes"
                        userEmail={userId ? `user@example.com` : undefined}
                        onComplete={() => {
                            handleClose()
                        }}
                    />
                )
            default:
                return null
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className={`max-w-5xl w-[95vw] h-[95vh] sm:max-h-[90vh] overflow-y-auto border-slate-200 dark:border-slate-800 ${currentStep === 8 ? 'bg-transparent border-transparent shadow-none' : 'bg-white dark:bg-slate-900'
                    }`}
                aria-describedby="wizard-description"
            >
                {/* Hide header on success step */}
                {currentStep !== 8 && (
                    <DialogHeader className="pb-4 sm:pb-6">
                        <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                                {/* Left side - Logo and Title */}
                                <div className="flex items-center">
                                    <Image src="/fastadslogo.png" alt="FAST ADS AI Logo" width={28} height={28} className="mr-3 sm:mr-4 w-7 h-7 sm:w-8 sm:h-8" />
                                    <span className="text-lg sm:text-2xl">{isLoading ? "Processing..." : "AI Video Creation"}</span>
                                </div>

                                {/* Right side - Step Indicator */}
                                {!isLoading && (
                                    <div className="sm:mr-12">
                                        <Badge
                                            variant="outline"
                                            className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 border-2 border-slate-400 dark:border-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm"
                                        >
                                            {currentStep} / {WIZARD_STEPS.length}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </DialogTitle>

                        {/* Step Header with Gradient - Only Icon and Title */}
                        {!isLoading && currentStepData && (
                            <div className="flex items-center space-x-3 sm:space-x-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-3 sm:p-4 border border-slate-200 dark:border-slate-600">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${currentStepData.color} rounded-full flex items-center justify-center shadow-md`}>
                                    <span className="text-lg sm:text-xl">{currentStepData.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                                        {currentStepData.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 hidden sm:block">
                                        {currentStepData.subtitle}
                                    </p>
                                </div>
                            </div>
                        )}
                    </DialogHeader>
                )}

                {/* Progress Bar During Loading - Hide on success step */}
                {isLoading && currentStep !== 8 && (
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
                        <div className={`h-full bg-gradient-to-r ${currentStepData?.color || 'from-purple-500 to-blue-500'} rounded-full animate-pulse`}
                            style={{ width: `${(currentStep / WIZARD_STEPS.length) * 100}%` }}>
                        </div>
                    </div>
                )}

                {/* Show success step directly without dialog content */}
                {currentStep === 8 ? (
                    renderCurrentStep()
                ) : (
                    isLoading ? (
                        <div className="flex items-center justify-center h-48 sm:h-64">
                            <div className="text-center">
                                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 animate-spin mx-auto mb-4 text-purple-600" />
                                <p className="text-base sm:text-lg font-medium">Preparing next step...</p>
                                <p className="text-xs sm:text-sm text-gray-600 mt-2">Optimizing experience</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 sm:space-y-6">
                            {/* Current Step Content */}
                            <div className="min-h-[300px] sm:min-h-[400px]">
                                {renderCurrentStep()}
                            </div>

                            {/* Navigation */}
                            <Card className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-slate-900/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                                    <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                                        {/* Previous Button */}
                                        <Button
                                            onClick={handlePrevious}
                                            disabled={currentStep === 1}
                                            variant="outline"
                                            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-sm sm:text-base"
                                        >
                                            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            Back
                                        </Button>
                                    </div>

                                    <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                                        {/* Next/Complete Button */}
                                        <Button
                                            onClick={() => handleStepComplete({})}
                                            disabled={!canProceed()}
                                            className={`flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-white text-sm sm:text-base ${currentStep === 7
                                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                                                : `bg-gradient-to-r ${currentStepData?.color || 'from-purple-600 to-blue-600'} hover:opacity-90`
                                                }`}
                                        >
                                            {currentStep === 7 ? (
                                                <>
                                                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                                    Create Video
                                                </>
                                            ) : (
                                                <>
                                                    Continue
                                                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Close Button */}
                            <div className="flex justify-center sm:justify-end pt-2">
                                <Button
                                    variant="outline"
                                    onClick={handleClose}
                                    className="w-full sm:w-auto px-4 sm:px-6 py-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm sm:text-base"
                                >
                                    <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                    Save and Close
                                </Button>
                            </div>
                        </div>
                    )
                )}
            </DialogContent>
        </Dialog>
    )
} 