"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight, Sparkles, Zap, Brain } from "lucide-react"

export function DemoVideoSection() {
    const [currentStep, setCurrentStep] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [currentProject, setCurrentProject] = useState(0)

    // Using the same projects from showcase section
    const projects = [
        {
            id: 1,
            title: "Micro Vent",
            category: "Comfort",
            videoSrc: "/output_ventilatore_avatar.mp4",
            // Mock product images - you'll replace these
            productImages: ["/placeholder.jpg", "/placeholder.svg"],
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            id: 2,
            title: "Mosquito Repellent",
            category: "Indoor/Outdoor",
            videoSrc: "/output.mp4",
            productImages: ["/placeholder.jpg", "/placeholder.svg"],
            gradient: "from-green-500 to-emerald-500",
        },
        {
            id: 3,
            title: "Vacuum Cleaner",
            category: "Indoor",
            videoSrc: "/output_aspirapolvere.mp4",
            productImages: ["/placeholder.jpg", "/placeholder.svg"],
            gradient: "from-purple-500 to-pink-500",
        },
    ]

    const steps = [
        { name: "Product Images", duration: 2000 },
        { name: "AI Processing", duration: 1500 },
        { name: "Video Ad Ready", duration: 3000 }
    ]

    // Auto-cycle through the transformation
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true)
            setCurrentStep((prev) => {
                const nextStep = (prev + 1) % steps.length
                if (nextStep === 0) {
                    // When we complete a cycle, move to next project
                    setCurrentProject((prevProject) => (prevProject + 1) % projects.length)
                }
                return nextStep
            })

            setTimeout(() => setIsAnimating(false), 500)
        }, steps[currentStep].duration)

        return () => clearInterval(interval)
    }, [currentStep])

    const currentProjectData = projects[currentProject]

    return (
        <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="container mx-auto relative z-10">
                {/* Dynamic Transformation Display */}
                <div className="max-w-6xl mx-auto">
                    <div className="relative bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl p-2 backdrop-blur-sm border border-blue-500/30 shadow-2xl">

                        {/* Step Progress Bar */}
                        <div className="flex justify-center mb-6 px-4">
                            <div className="flex items-center space-x-4">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                                            }`} />
                                        <span className={`ml-2 text-sm font-medium transition-colors duration-500 ${index === currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'
                                            }`}>
                                            {step.name}
                                        </span>
                                        {index < steps.length - 1 && (
                                            <ArrowRight className="w-4 h-4 mx-4 text-muted-foreground" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative bg-black rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>

                            {/* Step 0: Product Images */}
                            {currentStep === 0 && (
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                                    <div className="text-center">
                                        <Badge className="mb-4 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                                            📸 Product Images Input
                                        </Badge>
                                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                            {currentProjectData.productImages.map((img, index) => (
                                                <div key={index} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                                                    <img
                                                        src={img}
                                                        alt={`Product ${index + 1}`}
                                                        className="w-full h-full object-cover rounded-lg"
                                                        onError={(e) => {
                                                            // Fallback to placeholder if image fails to load
                                                            const target = e.currentTarget as HTMLImageElement
                                                            const fallback = target.nextElementSibling as HTMLElement
                                                            target.style.display = 'none'
                                                            if (fallback) fallback.style.display = 'flex'
                                                        }}
                                                    />
                                                    <div className="w-full h-full hidden items-center justify-center text-gray-500">
                                                        <span className="text-4xl">🖼️</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-white/80 mt-4 text-sm">Upload 1-5 images of your product</p>
                                    </div>
                                </div>
                            )}

                            {/* Step 1: AI Processing */}
                            {currentStep === 1 && (
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                                    <div className="text-center">
                                        <Badge className="mb-4 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                                            🤖 AI Processing
                                        </Badge>
                                        <div className="relative">
                                            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-spin">
                                                <Brain className="w-12 h-12 text-white" />
                                            </div>
                                            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-dashed border-white/30 animate-pulse"></div>
                                        </div>
                                        <div className="mt-6 space-y-2">
                                            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm">
                                                <Zap className="w-4 h-4" />
                                                <span>Analyzing product features...</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm">
                                                <Sparkles className="w-4 h-4" />
                                                <span>Generating optimized script...</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm">
                                                <Play className="w-4 h-4" />
                                                <span>Creating video with AI avatar...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Final Video */}
                            {currentStep === 2 && (
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {/* Video container with proper aspect ratio for vertical videos */}
                                        <div className="relative h-full max-w-[60%] mx-auto">
                                            <video
                                                key={currentProjectData.id}
                                                className="h-full w-auto object-contain rounded-lg shadow-2xl"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                            >
                                                <source src={currentProjectData.videoSrc} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>

                                            {/* Overlay badges */}
                                            <Badge className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm border-white/30 text-white z-10">
                                                🎬 Professional Video Ad Ready
                                            </Badge>
                                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                                <Badge className="bg-gradient-to-r from-green-600/80 to-blue-600/80 backdrop-blur-sm border-green-500/30 text-white">
                                                    ✅ Ready to download in HD & 4K
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Project Title */}
                            <div className="absolute bottom-4 right-4 z-20">
                                <Badge className={`bg-gradient-to-r ${currentProjectData.gradient} bg-opacity-80 backdrop-blur-sm text-white`}>
                                    {currentProjectData.title} • {currentProjectData.category}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
} 