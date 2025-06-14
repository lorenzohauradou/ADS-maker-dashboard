"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Eye, Heart, Share2, TrendingUp, Volume2, VolumeX, MousePointer2 } from "lucide-react"

export function ShowcaseSection() {
  const [audioStates, setAudioStates] = useState<Record<number, boolean>>({})
  const [showAudioHint, setShowAudioHint] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const projects = [
    {
      id: 1,
      title: "Micro Vent",
      category: "Comfort",
      views: "2.4M",
      likes: "89K",
      videoSrc: "/output_ventilatore_avatar.mp4",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Mosquito Repellent",
      category: "Indoor/Outdoor",
      views: "3.1M",
      likes: "124K",
      videoSrc: "/output.mp4",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "Vacuum Cleaner",
      category: "Indoor",
      views: "1.8M",
      likes: "67K",
      videoSrc: "/output_aspirapolvere.mp4",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Snorkling Mask",
      category: "Outdoor",
      views: "956K",
      likes: "43K",
      videoSrc: "/maschera.mp4",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Vegetables Cutter",
      category: "Kitchen",
      views: "1.2M",
      likes: "78K",
      videoSrc: "/Veg-cutter.mp4",
      gradient: "from-indigo-500 to-purple-500",
    },
  ]

  const toggleAudio = (projectId: number, videoElement: HTMLVideoElement) => {
    const currentAudioState = audioStates[projectId] || false
    const newAudioState = !currentAudioState

    // If we're enabling this video, disable all others
    if (newAudioState) {
      // Find all other videos and disable them
      const allVideos = document.querySelectorAll('video')
      allVideos.forEach((video) => {
        if (video !== videoElement) {
          video.muted = true
        }
      })

      // Reset audio state for all other projects
      const resetStates: Record<number, boolean> = {}
      projects.forEach(project => {
        resetStates[project.id] = project.id === projectId
      })

      setAudioStates(resetStates)
    } else {
      // If we're disabling, update only this video
      setAudioStates(prev => ({
        ...prev,
        [projectId]: false
      }))
    }

    // Toggle muted state of current video
    videoElement.muted = !newAudioState
  }

  const handleCardClick = (project: any, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const videoElement = event.currentTarget.querySelector('video') as HTMLVideoElement
    if (videoElement) {
      toggleAudio(project.id, videoElement)
    }
  }

  return (
    <section id="showcase" className="pt-8 md:pt-16 pb-16 md:pb-32 px-4 relative overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Viral Projects Created with FAST ADS AI
          </Badge>

          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
            Videos that{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
              Convert
            </span>
            <br />
            <span className="text-lg md:text-3xl lg:text-4xl text-muted-foreground font-normal">Created in minutes</span>
          </h2>

          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Check out the video ads that are generating millions of views and thousands of conversions for our clients.
          </p>

          {/* Badge per interazione audio */}
          {showAudioHint && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 dark:bg-blue-400/10 border border-blue-600/20 dark:border-blue-400/20 rounded-full text-blue-600 dark:text-blue-400 text-sm animate-pulse mt-6">
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Click on video to hear audio</span>
              <span className="sm:hidden">Tap for audio</span>
              <MousePointer2 className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Video Showcase - Fan Layout for All Devices */}
        <div className="relative">
          <div className="relative h-[400px] sm:h-[500px] lg:h-[700px] flex items-center justify-center perspective-1000 overflow-visible">
            <div className="relative w-full max-w-7xl flex items-center justify-center">
              {projects.map((project, index) => {
                // Calculate position for fan layout
                const centerIndex = Math.floor(projects.length / 2) // 2 for 5 elements
                const offsetFromCenter = index - centerIndex
                // Use responsive spacing based on screen size detection
                const xOffset = offsetFromCenter * (isDesktop ? 200 : 80) // Proper desktop spacing restored
                const yOffset = Math.abs(offsetFromCenter) * (isDesktop ? 20 : 10) // More vertical offset for desktop
                const rotation = offsetFromCenter * (isDesktop ? 8 : 4) // More rotation for desktop
                const scale = index === centerIndex ? (isDesktop ? 1.1 : 1.05) : 0.95 // Center element larger on desktop
                const zIndex = 30 - Math.abs(offsetFromCenter) * 5 // Z-index based on distance from center

                return (
                  <div
                    key={project.id}
                    className="absolute transition-all duration-700 hover:scale-110 hover:rotate-0 hover:z-50 group cursor-pointer"
                    style={{
                      transform: `translateX(${xOffset}px) translateY(${yOffset}px) rotate(${rotation}deg) scale(${scale})`,
                      zIndex: zIndex,
                    }}
                    onClick={(e) => handleCardClick(project, e)}
                  >
                    <div className="relative">
                      {/* Video Card - Responsive sizes */}
                      <div
                        className={`w-40 sm:w-48 lg:w-56 h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${project.gradient} p-1 shadow-xl sm:shadow-2xl group-hover:shadow-2xl sm:group-hover:shadow-4xl transition-all duration-500`}
                      >
                        <div className="w-full h-full bg-card dark:bg-card rounded-2xl sm:rounded-3xl overflow-hidden relative border border-border/50">
                          {/* Video */}
                          <video
                            src={project.videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                          {/* Audio Toggle Indicator */}
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                            <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${audioStates[project.id]
                              ? 'bg-green-500/80 border-green-400 backdrop-blur-sm'
                              : 'bg-white/20 border-white/50 backdrop-blur-sm'
                              }`}>
                              {audioStates[project.id] ? (
                                <Volume2 className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                              ) : (
                                <VolumeX className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                              )}
                            </div>
                            {/* Pulse animation for muted videos */}
                            {!audioStates[project.id] && showAudioHint && (
                              <div className="absolute inset-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-blue-400 animate-ping"></div>
                            )}
                          </div>

                          {/* Click to Play Audio Hint */}
                          {!audioStates[project.id] && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-white/30">
                                <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
                                  <MousePointer2 className="w-3 sm:w-4 h-3 sm:h-4" />
                                  <span className="hidden sm:inline">Click for audio</span>
                                  <span className="sm:hidden">Tap</span>
                                  <Volume2 className="w-3 sm:w-4 h-3 sm:h-4" />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                            <Badge
                              variant="secondary"
                              className="mb-2 text-xs bg-white/20 backdrop-blur-sm border-white/30 text-white"
                            >
                              {project.category}
                            </Badge>
                            <h3 className="text-white font-semibold text-xs sm:text-sm mb-2 line-clamp-2">{project.title}</h3>

                            {/* Stats */}
                            <div className="flex items-center justify-between text-xs text-white/80">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <span className="flex items-center">
                                  <Eye className="w-3 h-3 mr-1" />
                                  {project.views}
                                </span>
                                <span className="flex items-center">
                                  <Heart className="w-3 h-3 mr-1" />
                                  {project.likes}
                                </span>
                              </div>
                              <Share2 className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce">
                        <span className="text-xs">🔥</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-20">
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            These videos have generated over{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">$2.5M in sales</span> for our clients
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 text-white"
          >
            <Play className="w-4 md:w-5 h-4 md:h-5 mr-2" />
            Create Your Viral Video
          </Button>
        </div>
      </div>
    </section>
  )
}