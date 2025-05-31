"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Eye, Heart, Share2, TrendingUp, Volume2, VolumeX } from "lucide-react"

export function ShowcaseSection() {
  const [audioStates, setAudioStates] = useState<Record<number, boolean>>({})

  const projects = [
    {
      id: 1,
      title: "SaaS Dashboard Demo",
      category: "Tech/SaaS",
      views: "2.4M",
      likes: "89K",
      thumbnail: "/placeholder.svg?height=400&width=225",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Fitness App Promo",
      category: "Mobile App",
      views: "3.1M",
      likes: "124K",
      thumbnail: "/placeholder.svg?height=400&width=225",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "E-commerce Product",
      category: "E-commerce",
      views: "1.8M",
      likes: "67K",
      thumbnail: "/example_output.mp4",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Restaurant Menu",
      category: "Food & Beverage",
      views: "956K",
      likes: "43K",
      thumbnail: "/placeholder.svg?height=400&width=225",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Real Estate Tour",
      category: "Real Estate",
      views: "1.2M",
      likes: "78K",
      thumbnail: "/placeholder.svg?height=400&width=225",
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
    // Only for videos with audio
    if (project.thumbnail?.endsWith('.mp4') || project.thumbnail?.endsWith('.webm') || project.thumbnail?.endsWith('.mov')) {
      const videoElement = event.currentTarget.querySelector('video') as HTMLVideoElement
      if (videoElement) {
        toggleAudio(project.id, videoElement)
      }
    }
  }

  return (
    <section className="pt-16 pb-32 px-4 relative overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Viral Projects Created with ADS MAKER AI
          </Badge>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Videos that{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
              Convert
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-muted-foreground font-normal">Created in 1 minute</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Check out the video ads that are generating millions of views and thousands of conversions for our clients.
          </p>
        </div>

        {/* Video Showcase - Fan Layout */}
        <div className="relative h-[700px] flex items-center justify-center perspective-1000 overflow-visible">
          <div className="relative w-full max-w-7xl flex items-center justify-center">
            {projects.map((project, index) => {
              // Calculate position for fan layout
              const centerIndex = Math.floor(projects.length / 2) // 2 for 5 elements
              const offsetFromCenter = index - centerIndex
              const xOffset = offsetFromCenter * 200 // Greater horizontal spacing
              const yOffset = Math.abs(offsetFromCenter) * 20 // Slight vertical offset
              const rotation = offsetFromCenter * 8 // Rotation based on position
              const scale = index === centerIndex ? 1.1 : 0.95 // Center element larger
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
                    {/* Video Card */}
                    <div
                      className={`w-56 h-96 rounded-3xl overflow-hidden bg-gradient-to-br ${project.gradient} p-1 shadow-2xl group-hover:shadow-4xl transition-all duration-500`}
                    >
                      <div className="w-full h-full bg-card rounded-3xl overflow-hidden relative border border-border/50">
                        {/* Video/Image Thumbnail */}
                        {project.thumbnail?.endsWith('.mp4') || project.thumbnail?.endsWith('.webm') || project.thumbnail?.endsWith('.mov') ? (
                          <video
                            src={project.thumbnail}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={project.thumbnail || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                        {/* Audio Toggle Button - only for videos */}
                        {(project.thumbnail?.endsWith('.mp4') || project.thumbnail?.endsWith('.webm') || project.thumbnail?.endsWith('.mov')) && (
                          <div className="absolute top-4 left-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {audioStates[project.id] ? (
                              <Volume2 className="w-4 h-4 text-white" />
                            ) : (
                              <VolumeX className="w-4 h-4 text-white" />
                            )}
                          </div>
                        )}

                        {/* Play Button - only for images */}
                        {!(project.thumbnail?.endsWith('.mp4') || project.thumbnail?.endsWith('.webm') || project.thumbnail?.endsWith('.mov')) && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <Badge
                            variant="secondary"
                            className="mb-2 text-xs bg-white/20 backdrop-blur-sm border-white/30 text-white"
                          >
                            {project.category}
                          </Badge>
                          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{project.title}</h3>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-xs text-white/80">
                            <div className="flex items-center space-x-3">
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
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce">
                      <span className="text-xs">🔥</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-muted-foreground mb-6">
            These videos have generated over{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">$2.5M in sales</span> for our clients
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 text-white"
          >
            <Play className="w-5 h-5 mr-2" />
            Create Your Viral Video
          </Button>
        </div>
      </div>
    </section>
  )
}