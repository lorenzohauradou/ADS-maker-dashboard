"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight, Sparkles, Zap, Star, Menu, Sun, Moon, Globe, Brain } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { data: session, status } = useSession()

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
            <Link href="#showcase" className="scroll-smooth">
              Watch Demo
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Dynamic Transformation Display */}
        <div className="mt-16 max-w-4xl mx-auto px-4">
          <div className="relative bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl md:rounded-3xl p-2 backdrop-blur-sm border border-blue-500/30 shadow-2xl">

            {/* Step Progress Bar */}
            <div className="flex justify-center mb-4 md:mb-6 px-2 md:px-4">
              <div className="flex items-center space-x-2 md:space-x-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-500 ${index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                    <span className={`ml-1 md:ml-2 text-xs md:text-sm font-medium transition-colors duration-500 ${index === currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'
                      }`}>
                      <span className="hidden sm:inline">{step.name}</span>
                      <span className="sm:hidden">
                        {step.name === "Product Images" ? "Images" :
                          step.name === "AI Processing" ? "AI" : "Video"}
                      </span>
                    </span>
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 mx-2 md:mx-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: taller aspect ratio, Desktop: wider */}
            <div className="relative bg-black rounded-xl md:rounded-2xl overflow-hidden aspect-[9/16] md:aspect-[16/10]">

              {/* Step 0: Product Images */}
              {currentStep === 0 && (
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                  <div className="text-center px-4">
                    <Badge className="mb-3 md:mb-4 bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs md:text-sm">
                      📸 Product Images Input
                    </Badge>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-xs md:max-w-md mx-auto">
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
                          <div className="w-full h-full hidden items-center justify-center text-gray-500">
                            <span className="text-2xl md:text-4xl">🖼️</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-white/80 mt-3 md:mt-4 text-xs md:text-sm">Upload 1-5 images of your product</p>
                  </div>
                </div>
              )}

              {/* Step 1: AI Processing */}
              {currentStep === 1 && (
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                  <div className="text-center px-4">
                    <Badge className="mb-3 md:mb-4 bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs md:text-sm">
                      🤖 AI Processing
                    </Badge>
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-spin">
                        <Brain className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                      <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-dashed border-white/30 animate-pulse"></div>
                    </div>
                    <div className="mt-4 md:mt-6 space-y-2">
                      <div className="flex items-center justify-center space-x-2 text-white/80 text-xs md:text-sm">
                        <Zap className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Analyzing product features...</span>
                        <span className="sm:hidden">Analyzing features...</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-white/80 text-xs md:text-sm">
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Generating optimized script...</span>
                        <span className="sm:hidden">Generating script...</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-white/80 text-xs md:text-sm">
                        <Play className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Creating video with AI avatar...</span>
                        <span className="sm:hidden">Creating video...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Final Video */}
              {currentStep === 2 && (
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Mobile: wider video container, Desktop: narrower */}
                    <div className="relative h-full max-w-[85%] md:max-w-[60%] mx-auto">
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

                      <Badge className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/20 backdrop-blur-sm border-white/30 text-white z-10 text-xs md:text-sm">
                        <span className="hidden sm:inline">🎬 Professional Video Ad Ready</span>
                        <span className="sm:hidden">🎬 Video Ready</span>
                      </Badge>
                      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-green-600/80 to-blue-600/80 backdrop-blur-sm border-green-500/30 text-white text-xs md:text-sm">
                          <span className="hidden sm:inline">✅ Ready to download in HD & 4K</span>
                          <span className="sm:hidden">✅ Ready to download</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Title */}
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-20">
                <Badge className={`bg-gradient-to-r ${currentProjectData.gradient} bg-opacity-80 backdrop-blur-sm text-white text-xs md:text-sm`}>
                  <span className="hidden sm:inline">{currentProjectData.title} • {currentProjectData.category}</span>
                  <span className="sm:hidden">{currentProjectData.title}</span>
                </Badge>
              </div>
            </div>
          </div>

          {/* Multilingual Support Badge - moved below video */}
          <div className="flex justify-center mt-8">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 px-3 py-2 sm:px-6 sm:py-3 rounded-full backdrop-blur-sm"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold mr-2 sm:mr-3 text-sm sm:text-base">Available in 50+ Languages</span>
              <div className="flex items-center space-x-1 sm:space-x-2 ml-1 sm:ml-2 border-l border-emerald-300 dark:border-emerald-600 pl-2 sm:pl-3">
                <span className="text-sm sm:text-lg font-bold">🇮🇹</span>
                <span className="text-sm sm:text-lg font-bold">🇬🇧</span>
                <span className="text-sm sm:text-lg font-bold">🇪🇸</span>
                <span className="hidden sm:inline text-lg font-bold">🇫🇷</span>
                <span className="hidden sm:inline text-lg font-bold">🇩🇪</span>
                <span className="hidden md:inline text-lg font-bold">🇺🇸</span>
                <span className="hidden md:inline text-lg font-bold">🇵🇹</span>
                <span className="hidden lg:inline text-lg font-bold">🇯🇵</span>
                <span className="hidden lg:inline text-lg font-bold">🇰🇷</span>
                <span className="text-xs sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium">+41 more</span>
              </div>
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
