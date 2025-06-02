"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"
import { ImageUploadModal } from "./video-creation-workflow/image-upload-modal"
import { VideoConfigurationModal } from "./video-creation-workflow/video-configuration-modal"
import { VideoProgressModal } from "./video-creation-workflow/video-progress-modal"

interface VideoConfiguration {
  target_platform: string
  target_audience: string
  language: string
  video_length: number
  aspect_ratio: string
  script_style: string
  visual_style: string
  buy_custom_domain: boolean
  custom_domain_name: string
  landing_style: string
  color_scheme: string
  cta_text: string
  background_music_volume: number
  voiceover_volume: number
  no_background_music: boolean
  no_caption: boolean
  no_emotion: boolean
  no_cta: boolean
  caption_style: string
  override_script: string
}

export function CreateVideoSection() {
  const [currentStep, setCurrentStep] = useState<"upload" | "configure" | "progress" | "complete">("upload")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)

  // Project data
  const [projectName, setProjectName] = useState("")
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [customDomain, setCustomDomain] = useState<string | undefined>(undefined)
  const [configuration, setConfiguration] = useState<VideoConfiguration | null>(null)

  const handleStartNewProject = () => {
    setCurrentStep("upload")
    setIsUploadModalOpen(true)
  }

  const handleImagesUploaded = async (images: File[], name: string, domain?: string) => {
    console.log("Images uploaded:", images.length, "Project:", name, "Domain:", domain)

    // Salva i dati del progetto
    setUploadedImages(images)
    setProjectName(name)
    setCustomDomain(domain)

    // Chiudi modal upload e apri configurazione
    setIsUploadModalOpen(false)
    setCurrentStep("configure")
    setIsConfigModalOpen(true)
  }

  const handleConfigurationComplete = async (config: VideoConfiguration) => {
    console.log("Configuration completed:", config)

    // Salva configurazione
    setConfiguration(config)

    // Chiudi modal configurazione e avvia processo
    setIsConfigModalOpen(false)
    setCurrentStep("progress")
    setIsProgressModalOpen(true)

    // TODO: Qui faremo la chiamata al backend FastAPI
    // const response = await fetch('/api/create-video', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     projectName,
    //     images: uploadedImages,
    //     configuration: config
    //   })
    // })
  }

  const handleProgressComplete = () => {
    setIsProgressModalOpen(false)
    setCurrentStep("complete")

    // Reset per permettere nuovo progetto
    setTimeout(() => {
      setCurrentStep("upload")
      setProjectName("")
      setUploadedImages([])
      setCustomDomain(undefined)
      setConfiguration(null)
    }, 2000)
  }

  const handleCloseUpload = () => {
    setIsUploadModalOpen(false)
    setCurrentStep("upload")
  }

  const handleCloseConfig = () => {
    setIsConfigModalOpen(false)
    setCurrentStep("upload")
    setIsUploadModalOpen(true) // Torna all'upload
  }

  return (
    <>
      <div className="text-center py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-responsive-4xl md:text-responsive-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
            Create Professional Video Ads in Minutes
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-6 lg:mb-8 leading-relaxed max-w-3xl mx-auto">
            Transform your product images into stunning video advertisements
            <br className="hidden sm:block" />
            with AI-powered automation
          </p>

          <Button
            size="lg"
            onClick={handleStartNewProject}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white"
            disabled={currentStep === "progress"}
          >
            <Plus className="w-5 h-5 mr-2" />
            {currentStep === "progress" ? "Creating Video..." : "Create New Video Ad"}
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>

          {/* Progress Indicator */}
          {currentStep !== "upload" && (
            <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-slate-600 dark:text-zinc-400">
              <div className={`flex items-center space-x-2 ${currentStep === "configure" ? "text-blue-600 dark:text-blue-400 font-medium" :
                ["progress", "complete"].includes(currentStep) ? "text-green-600 dark:text-green-400" : ""
                }`}>
                <div className={`w-2 h-2 rounded-full ${currentStep === "configure" ? "bg-blue-500 animate-pulse" :
                  ["progress", "complete"].includes(currentStep) ? "bg-green-500" : "bg-slate-300"
                  }`}></div>
                <span>Configure</span>
              </div>
              <div className="w-8 h-px bg-slate-300 dark:bg-zinc-600"></div>
              <div className={`flex items-center space-x-2 ${currentStep === "progress" ? "text-blue-600 dark:text-blue-400 font-medium animate-pulse" :
                currentStep === "complete" ? "text-green-600 dark:text-green-400" : ""
                }`}>
                <div className={`w-2 h-2 rounded-full ${currentStep === "progress" ? "bg-blue-500 animate-pulse" :
                  currentStep === "complete" ? "bg-green-500" : "bg-slate-300"
                  }`}></div>
                <span>Creating</span>
              </div>
              <div className="w-8 h-px bg-slate-300 dark:bg-zinc-600"></div>
              <div className={`flex items-center space-x-2 ${currentStep === "complete" ? "text-green-600 dark:text-green-400 font-medium" : ""
                }`}>
                <div className={`w-2 h-2 rounded-full ${currentStep === "complete" ? "bg-green-500" : "bg-slate-300"
                  }`}></div>
                <span>Complete</span>
              </div>
            </div>
          )}

          {/* Current Project Info */}
          {projectName && currentStep !== "upload" && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg border">
              <p className="text-sm text-slate-600 dark:text-zinc-400">
                Current Project: <span className="font-medium text-slate-900 dark:text-white">{projectName}</span>
                {uploadedImages.length > 0 && (
                  <span className="ml-2">• {uploadedImages.length} images</span>
                )}
                {customDomain && (
                  <span className="ml-2">• Custom domain: {customDomain}</span>
                )}
                {configuration && (
                  <span className="ml-2">• {configuration.target_platform} • {configuration.language}</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Step 1: Image Upload Modal */}
      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUpload}
        onComplete={handleImagesUploaded}
      />

      {/* Step 2: Configuration Modal */}
      <VideoConfigurationModal
        isOpen={isConfigModalOpen}
        onClose={handleCloseConfig}
        onStartCreation={handleConfigurationComplete}
        projectName={projectName}
        imageCount={uploadedImages.length}
      />

      {/* Step 3: Progress Modal */}
      {configuration && (
        <VideoProgressModal
          isOpen={isProgressModalOpen}
          onClose={handleProgressComplete}
          projectName={projectName}
          configuration={configuration}
        />
      )}
    </>
  )
}
