"use client"

import "./styles.css"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Sparkles,
    Download,
    RefreshCw,
    CheckCircle,
    AlertCircle,
    Scissors
} from "lucide-react"
import { useSession } from "next-auth/react"

import { useAIImageStudio } from "./hooks/use-ai-image-studio"
import {
    WelcomeState,
    FileUploadArea,
    PresetSelector,
    CustomPromptInput,
    GeneratingState,
    BeforeAfterSlider
} from "./components"
import { Label } from "@/components/ui/label"

export default function AIImageStudioPage() {
    const { data: session } = useSession()
    const {
        // State
        currentStep,
        uploadedImageUrl,
        selectedStyle,
        customPrompt,
        isGenerating,
        progress,
        result,
        error,

        // Handlers
        handleImageUpload,
        handleStyleSelect,
        handleCustomPromptChange,
        handleEnhanceImage,
        handleDownloadImage,
        handleStartOver,
        handleUseImageAndContinue,
        handleRemoveBackground
    } = useAIImageStudio()

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
            <DashboardHeader />

            <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <img
                                    src="/fastadslogo.png"
                                    alt="FastAdsAI"
                                    className="h-16 w-16 rounded-xl shadow-lg"
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    AI Image Studio
                                </h1>
                                <p className="text-slate-600 dark:text-zinc-400">
                                    Transform product photos into professional e-commerce and marketing assets in seconds
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 animate-in slide-in-from-top-2 fade-in duration-300">
                            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-red-800 dark:text-red-200">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left Panel - Controls */}
                        <div className="lg:col-span-1 order-2 lg:order-1">
                            <Card className="card-hover border-slate-200 dark:border-zinc-800">
                                <CardHeader className="border-b border-slate-200 dark:border-zinc-800">
                                    <CardTitle className="text-slate-900 dark:text-white">
                                        {currentStep === 'initial' && 'Upload Image'}
                                        {currentStep === 'controls' && 'Enhancement Options'}
                                        {currentStep === 'generating' && 'Processing'}
                                        {currentStep === 'result' && 'Actions'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="transition-all duration-300 ease-in-out">
                                        {currentStep === 'initial' && (
                                            <div className="animate-in slide-in-from-left-3 fade-in duration-500">
                                                <FileUploadArea
                                                    onImageUpload={handleImageUpload}
                                                    isUploading={false}
                                                />
                                            </div>
                                        )}

                                        {currentStep === 'controls' && (
                                            <div className="space-y-6 animate-in slide-in-from-left-3 fade-in duration-500">
                                                {/* Uploaded Image Preview */}
                                                {uploadedImageUrl && (
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label className="text-slate-700 dark:text-zinc-300">
                                                                Your Image
                                                            </Label>
                                                            <div className="w-full h-32 bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                                                                <img
                                                                    src={uploadedImageUrl}
                                                                    alt="Uploaded"
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <PresetSelector
                                                    onStyleSelect={handleStyleSelect}
                                                    selectedStyle={selectedStyle}
                                                    isGenerating={isGenerating}
                                                />

                                                <Button
                                                    onClick={handleEnhanceImage}
                                                    disabled={!selectedStyle || isGenerating}
                                                    className="text-white w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-base font-semibold"
                                                >
                                                    <Sparkles className="w-5 h-5 mr-2 text-white" />
                                                    Create Marketing Asset
                                                </Button>

                                                <CustomPromptInput
                                                    value={customPrompt}
                                                    onChange={handleCustomPromptChange}
                                                    disabled={isGenerating}
                                                />
                                            </div>
                                        )}

                                        {currentStep === 'generating' && selectedStyle && (
                                            <div className="animate-in slide-in-from-left-3 fade-in duration-500">
                                                <GeneratingState
                                                    progress={progress}
                                                    style={selectedStyle}
                                                />
                                            </div>
                                        )}

                                        {currentStep === 'result' && (
                                            <div className="space-y-4 animate-in slide-in-from-left-3 fade-in duration-500">
                                                <div className="text-center space-y-3">
                                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                                                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                        Marketing Asset Ready!
                                                    </h3>
                                                    <p className="text-slate-600 dark:text-zinc-400">
                                                        Your product image is now ready for e-commerce and marketing
                                                    </p>
                                                </div>

                                                <div className="space-y-3">
                                                    <Button
                                                        onClick={handleUseImageAndContinue}
                                                        className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-base font-semibold"
                                                    >
                                                        <CheckCircle className="w-5 h-5 mr-2" />
                                                        Use for Video Creation
                                                    </Button>

                                                    <Button
                                                        onClick={handleRemoveBackground}
                                                        disabled={isGenerating}
                                                        className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-base font-semibold"
                                                    >
                                                        <Scissors className="w-5 h-5 mr-2" />
                                                        Remove Background
                                                    </Button>

                                                    <Button
                                                        onClick={handleDownloadImage}
                                                        variant="outline"
                                                        className="w-full h-11 text-base"
                                                    >
                                                        <Download className="w-5 h-5 mr-2" />
                                                        Download Image
                                                    </Button>

                                                    <Button
                                                        onClick={handleStartOver}
                                                        variant="ghost"
                                                        className="w-full h-10"
                                                    >
                                                        <RefreshCw className="w-4 h-4 mr-2" />
                                                        Start Over
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Panel - Canvas */}
                        <div className="lg:col-span-2 order-1 lg:order-2">
                            <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 min-h-[400px] lg:min-h-[600px]">
                                <CardContent className="p-4 lg:p-6 h-full">
                                    <div className="transition-all duration-500 ease-in-out h-full">
                                        {currentStep === 'initial' && (
                                            <div className="h-full flex items-center justify-center animate-in fade-in duration-700">
                                                <WelcomeState />
                                            </div>
                                        )}

                                        {currentStep === 'controls' && uploadedImageUrl && (
                                            <div className="h-full flex items-center justify-center animate-in zoom-in-95 fade-in duration-500">
                                                <div className="max-w-md transform hover:scale-105 transition-transform duration-300">
                                                    <img
                                                        src={uploadedImageUrl}
                                                        alt="Uploaded product"
                                                        className="w-full h-auto rounded-lg shadow-lg"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {currentStep === 'generating' && selectedStyle && (
                                            <div className="h-full flex items-center justify-center animate-in fade-in duration-500">
                                                <GeneratingState
                                                    progress={progress}
                                                    style={selectedStyle}
                                                />
                                            </div>
                                        )}

                                        {currentStep === 'result' && result && uploadedImageUrl && (
                                            <div className="h-full animate-in slide-in-from-bottom-4 fade-in duration-600">
                                                <BeforeAfterSlider
                                                    originalImage={uploadedImageUrl}
                                                    enhancedImage={result}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
