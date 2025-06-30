"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LanguageBadge } from "@/components/ui/LanguageBadge"
import { Play, ArrowRight, Sparkles, Zap, Globe, Brain } from "lucide-react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useVideoControls } from "@/hooks/useVideoControls"

export function HeroSection() {
  const { data: session, status } = useSession()
  const { activeVideo, toggleVideoAudio, handleVideoClick, setActiveVideo } = useVideoControls()

  // Dynamic video transformation states
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
      productImages: ["/vent.jpg", "/vent1.jpg"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Snorkeling",
      category: "Outdoor",
      videoSrc: "/maschera.mp4",
      productImages: ["/mask.jpg", "/mask1.jpg"],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "Vacuum Cleaner",
      category: "Indoor",
      videoSrc: "/output_aspirapolvere.mp4",
      productImages: ["/aspiratore.jpg", "/aspiratore1.jpg"],
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  const steps = [
    { name: "Product Images", duration: 2000 },
    { name: "AI Processing", duration: 1500 },
    { name: "Video Ad Ready", duration: 4000 }
  ]

  // Auto-cycle through the transformation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % steps.length
        if (nextStep === 0) {
          setCurrentProject((prevProject) => (prevProject + 1) % projects.length)
        }
        return nextStep
      })
    }, steps[currentStep].duration)

    return () => clearInterval(interval)
  }, [currentStep])

  // Disattiva l'audio quando il video non è più visibile
  useEffect(() => {
    const currentProjectData = projects[currentProject]

    // Se il video attualmente con audio non è quello visibile, disattiva l'audio
    if (activeVideo && activeVideo !== currentProjectData.id && currentStep !== 2) {
      setActiveVideo(null)
    }

    // Se cambia progetto e c'era audio attivo, disattivalo
    if (activeVideo && activeVideo !== currentProjectData.id) {
      setActiveVideo(null)
    }
  }, [currentStep, currentProject, activeVideo, setActiveVideo])

  const currentProjectData = projects[currentProject]

  return (
    <section className="pt-32 pb-16 px-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-500"></div>
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-1000"></div>

      <div className="container mx-auto text-center relative z-10">
        <Badge
          variant="secondary"
          className="mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-semibold">
            Transform Your Video Marketing
          </span>
        </Badge>

        <h1 className="text-4xl md:text-8xl font-bold mb-8 leading-tight">
          From{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-600 bg-clip-text text-transparent">
              1-5 images
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50"></div>
          </span>
          <br />to professional video ads
          <br />
          <span className="relative">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 dark:from-purple-400 dark:via-pink-400 dark:to-purple-600 bg-clip-text text-transparent">
              in 5 minutes
            </span>
            <div className="absolute -top-4 -right-4">
              <Zap className="w-8 h-8 text-yellow-500 animate-bounce" />
            </div>
          </span>
        </h1>

        <p className="text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          The AI that transforms your product images into{" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium">high-converting video ads</span> & {" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium">websites</span>.
          <br />
          <span className="hidden md:inline">Optimized scripts, ultra-realistic voice, and perfect output for every social platform.</span>
        </p>

        <div className="mb-12">
          <LanguageBadge />
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-purple-600 hover:to-purple-700 text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group text-white"
            asChild
          >
            <Link href={session ? "/dashboard" : "/login"}>
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              {session ? "Go to Dashboard" : "Start Free Trial"}
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-border text-foreground hover:bg-accent text-xl px-12 py-6 rounded-2xl backdrop-blur-sm hover:border-border/80 transition-all duration-300 group"
            asChild
          >
            <Link href="/demo">
              Watch Demo
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Dynamic Transformation Display - Competitor Style */}
        <div className="mt-16 max-w-7xl mx-auto px-4">
          {/* Mobile: Vertical Layout */}
          <div className="md:hidden">
            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-2xl p-4 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
              <div className="relative bg-black rounded-xl overflow-hidden aspect-[9/16]">
                {/* Mobile content remains the same as before */}
                {/* Step 0: Product Images */}
                {currentStep === 0 && (
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                    <div className="text-center px-4">
                      <Badge className="mb-4 bg-white/20 backdrop-blur-sm border-white/30 text-white text-sm">
                        📸 Product Images
                      </Badge>
                      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                        {currentProjectData.productImages.map((img, index) => (
                          <div key={index} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                            <img
                              src={img}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement
                                const fallback = target.nextElementSibling as HTMLElement
                                target.style.display = 'none'
                                if (fallback) fallback.style.display = 'flex'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: AI Processing */}
                {currentStep === 1 && (
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                    <div className="text-center px-4">
                      <Badge className="mb-4 bg-white/20 backdrop-blur-sm border-white/30 text-white text-sm">
                        🤖 AI Processing
                      </Badge>
                      <div className="relative">
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-spin">
                          <Brain className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Final Video */}
                {currentStep === 2 && (
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="relative h-full max-w-[85%] mx-auto">
                        <video
                          key={currentProjectData.id}
                          className="h-full w-auto object-contain rounded-lg shadow-2xl cursor-pointer"
                          autoPlay
                          loop
                          muted={activeVideo !== currentProjectData.id}
                          playsInline
                          data-project-id={currentProjectData.id.toString()}
                          onClick={(e) => handleVideoClick(e, currentProjectData.id)}
                        >
                          <source src={currentProjectData.videoSrc} type="video/mp4" />
                        </video>
                        {/* Mobile Audio Control Hint - Bottom Left */}
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-black/60 text-white text-xs px-2 py-1">
                            {activeVideo === currentProjectData.id ? 'Tap to mute' : 'Tap for audio'}
                          </Badge>
                        </div>
                        {/* Mobile Audio Status Icon - Bottom Right */}
                        <div className="absolute bottom-4 right-4">
                          <Badge className="bg-green-500/90 text-white text-xs px-2 py-1">
                            {activeVideo === currentProjectData.id ? '🔊' : '🔇'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop: Horizontal Layout like Competitor */}
          <div className="hidden md:block">
            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 rounded-3xl p-8 border border-slate-700/40 shadow-xl backdrop-blur-md">
              {/* Elegant overlay with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-3xl pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl pointer-events-none"></div>

              {/* Step Labels */}
              <div className="flex justify-between items-center mb-8 px-8 relative z-10">
                <div className="text-center">
                  <h3 className="text-white text-lg font-semibold">Product Upload</h3>
                  <p className="text-slate-300 text-sm mt-1">Upload your images</p>
                </div>
                <ArrowRight className="w-8 h-8 text-slate-400" />
                <div className="text-center">
                  <h3 className="text-white text-lg font-semibold">AI Avatar - Music & Voice</h3>
                  <p className="text-slate-300 text-sm text-left mt-1">AI processes content</p>
                </div>
                <ArrowRight className="w-8 h-8 text-slate-400" />
                <div className="text-center">
                  <h3 className="text-white text-lg font-semibold">Final Video + Landing Page</h3>
                  <p className="text-slate-300 text-sm text-left mt-1">Professional result</p>
                </div>
              </div>

              {/* Three Phase Cards */}
              <div className="grid grid-cols-3 gap-8 relative z-10">

                {/* Phase 1: Product Images */}
                <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${currentStep === 0 ? 'ring-4 ring-slate-400' : currentStep === 2 ? 'ring-2 ring-slate-400/50' : 'ring-2 ring-slate-500/30'
                  }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative bg-black/80 h-80 flex items-center justify-center">
                    {(currentStep === 0 || currentStep === 2) ? (
                      <div className="text-center p-6">
                        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-4">
                          {currentProjectData.productImages.map((img, index) => (
                            <div key={index} className="aspect-square bg-white rounded-lg p-2 shadow-lg">
                              <img
                                src={img}
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-cover rounded"
                                onError={(e) => {
                                  const target = e.currentTarget as HTMLImageElement
                                  const fallback = target.nextElementSibling as HTMLElement
                                  target.style.display = 'none'
                                  if (fallback) fallback.style.display = 'flex'
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <Badge className={`text-white text-sm ${currentStep === 0 ? 'bg-blue-500/90' : 'bg-blue-400/70'}`}>
                          📸 Product Images {currentStep === 2 ? '→' : ''}
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-center p-6 opacity-50">
                        <div className="w-16 h-16 mx-auto bg-gray-600 rounded-lg flex items-center justify-center mb-4">
                          <span className="text-2xl">📷</span>
                        </div>
                        <p className="text-gray-400 text-sm">Product Images</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Phase 2: AI Processing */}
                <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${currentStep === 1 ? 'ring-4 ring-slate-400' : 'ring-2 ring-slate-500/30'
                  }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
                  <div className="relative bg-black/80 h-80 flex items-center justify-center">
                    {currentStep === 1 ? (
                      <div className="text-center p-6">
                        <div className="relative mb-6">
                          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <Brain className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        <Badge className="bg-purple-500/90 text-white text-sm">
                          🤖 AI Avatar Processing
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-center p-6 opacity-50">
                        <div className="w-16 h-16 mx-auto bg-gray-600 rounded-full flex items-center justify-center mb-4">
                          <Brain className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-400 text-sm">AI Avatar</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Phase 3: Final Video */}
                <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${currentStep === 2 ? 'ring-4 ring-slate-400' : 'ring-2 ring-slate-500/30'
                  }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-cyan-600/20"></div>
                  <div className="relative bg-black/80 h-80 flex items-center justify-center">
                    {currentStep === 2 ? (
                      <div className="relative w-full h-full flex items-center justify-center p-4">
                        <div className="relative w-full h-full max-w-xs">
                          <video
                            key={currentProjectData.id}
                            className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                            autoPlay
                            loop
                            muted={activeVideo !== currentProjectData.id}
                            playsInline
                            data-project-id={currentProjectData.id.toString()}
                            onClick={(e) => handleVideoClick(e, currentProjectData.id)}
                          >
                            <source src={currentProjectData.videoSrc} type="video/mp4" />
                          </video>
                          <Badge className="absolute top-2 left-2 bg-green-500/90 text-white text-xs">
                            🎬 Final Video
                          </Badge>
                          {/* Audio Control Hint - Top Right */}
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-black/60 text-white text-xs px-2 py-1">
                              {activeVideo === currentProjectData.id ? 'Click to mute' : 'Click for audio'}
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-gradient-to-r from-green-600/80 to-cyan-600/80 text-white text-xs">
                              ✅ Ready for download
                            </Badge>
                          </div>
                          {/* Audio Status Icon - Bottom Right */}
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-green-500/90 text-white text-xs px-2 py-1">
                              {activeVideo === currentProjectData.id ? '🔊' : '🔇'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6 opacity-50">
                        <div className="w-16 h-16 mx-auto bg-gray-600 rounded-lg flex items-center justify-center mb-4">
                          <Play className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-400 text-sm">Final Video</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Title */}
              <div className="flex justify-center mt-6">
                <Badge className={`bg-gradient-to-r ${currentProjectData.gradient} text-white text-sm px-4 py-2`}>
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
