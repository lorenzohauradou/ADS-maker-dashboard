"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles, Crown, Lock } from "lucide-react"
import { useUserLimits } from "@/hooks/use-user-limits"
import { UserLimitsBanner } from "./user-limits-banner"
import { ImageUploadModal } from "./video-creation-workflow/image-upload-modal"
import { VideoConfigurationModal } from "./video-creation-workflow/video-configuration-modal"
import { VideoProgressModal } from "./video-creation-workflow/video-progress-modal"
import { VideoConfiguration } from "./video-creation-workflow/types/video-configuration"

// Componente che usa useSearchParams avvolto in Suspense
function SearchParamsHandler({
  onCreateAction
}: {
  onCreateAction: () => void
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const action = searchParams.get('action')
    if (action === 'create') {
      onCreateAction()
      // Rimuovi il parametro dall'URL
      window.history.replaceState({}, '', '/dashboard')
    }
  }, [searchParams, onCreateAction])

  return null
}

export function CreateVideoSection() {
  const { can_create_video, loading, buyExtraVideo } = useUserLimits()
  const [currentStep, setCurrentStep] = useState<"upload" | "configure" | "progress" | "complete">("upload")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)

  // Project data
  const [projectId, setProjectId] = useState<number | null>(null)
  const [projectName, setProjectName] = useState("")
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [customDomain, setCustomDomain] = useState<string | undefined>(undefined)
  const [configuration, setConfiguration] = useState<VideoConfiguration | null>(null)
  const [error, setError] = useState("")

  const handleCreateAction = () => {
    if (!isUploadModalOpen && !isConfigModalOpen && !isProgressModalOpen) {
      handleStartNewProject()
    }
  }

  const handleStartNewProject = () => {
    // Controlla i limiti prima di procedere
    if (!can_create_video) {
      // Mostra modal per comprare video extra o upgrade
      const confirmed = confirm(
        `Hai raggiunto il limite mensile di video. Vuoi comprare un video extra o fare l'upgrade del piano?`
      )
      if (confirmed) {
        buyExtraVideo()
      }
      return
    }

    setCurrentStep("upload")
    setIsUploadModalOpen(true)
  }

  const handleImagesUploaded = async (images: File[], name: string, domain?: string, project?: any) => {
    console.log("🎉 Progetto creato:", project?.id, "Nome:", name, "Immagini:", images.length)

    // ✅ USA L'ID REALE DAL BACKEND
    if (project?.id) {
      setProjectId(project.id)
      console.log("✅ Project ID reale:", project.id)
    } else {
      console.error("❌ Nessun project ID ricevuto dal backend")
      setError("Errore creazione progetto")
      return
    }

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

    if (!projectId) {
      console.error("❌ No project ID available")
      setError("Project ID missing")
      return
    }

    // Salva configurazione
    setConfiguration(config)

    // Chiudi modal configurazione e avvia processo
    setIsConfigModalOpen(false)
    setCurrentStep("progress")
    setIsProgressModalOpen(true)

    try {
      // 🚀 Avvia la creazione del video chiamando il backend
      console.log("🎬 Starting video creation for project:", projectId)

      const response = await fetch(`/api/creatify/start-video-workflow/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // 🎯 Mappa tutti i parametri della configurazione
          target_platform: config.target_platform,
          target_audience: config.target_audience,
          language: config.language,
          video_length: config.video_length,
          script_style: config.script_style,
          visual_style: config.visual_style,

          // 🎨 Landing page customization
          landing_style: config.landing_style,
          color_scheme: config.color_scheme,
          cta_text: config.cta_text,

          // 🎵 Audio settings
          background_music_volume: config.background_music_volume,
          voiceover_volume: config.voiceover_volume,
          no_background_music: config.no_background_music,

          // 🎭 Creative controls
          no_caption: config.no_caption,
          no_emotion: config.no_emotion,
          no_cta: config.no_cta,
          override_script: config.override_script,

          // 🎨 Subtitle customization
          caption_style: config.caption_style,
          caption_font_family: config.caption_font_family,
          caption_font_size: config.caption_font_size,
          caption_font_style: config.caption_font_style,
          caption_background_color: config.caption_background_color,
          caption_text_color: config.caption_text_color,
          caption_highlight_text_color: config.caption_highlight_text_color,
          caption_text_shadow: config.caption_text_shadow,
          caption_max_width: config.caption_max_width,
          caption_line_height: config.caption_line_height,
          caption_offset_x: config.caption_offset_x,
          caption_offset_y: config.caption_offset_y,

          // 🎭 Premium avatar/voice selection
          avatar_id: config.avatar_id,
          voice_id: config.voice_id,

          // 📋 Metadata
          project_name: projectName,
          image_count: uploadedImages.length
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const result = await response.json()
      console.log("✅ Video creation started:", result)

    } catch (error) {
      console.error("❌ Error starting video creation:", error)
      setError(`Failed to start video creation: ${error instanceof Error ? error.message : 'Unknown error'}`)

      // Se errore, torna al step di configurazione
      setIsProgressModalOpen(false)
      setCurrentStep("configure")
      setIsConfigModalOpen(true)
    }
  }

  const handleProgressComplete = async (videoSuccess: boolean = true) => {
    setIsProgressModalOpen(false)
    setCurrentStep("complete")

    // Incrementa usage counter SOLO se video completato con successo
    if (videoSuccess) {
      try {
        const response = await fetch('/api/subscriptions/increment-usage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          console.log('✅ Usage incremented successfully')
          // Ricarica i limiti nel banner
          // refreshLimits() // Se abbiamo accesso al hook qui
        } else {
          console.error('❌ Failed to increment usage:', await response.text())
        }
      } catch (error) {
        console.error('❌ Error incrementing usage:', error)
      }
    } else {
      console.log('⚠️ Video creation failed, usage not incremented')
    }

    // Reset per permettere nuovo progetto
    setTimeout(() => {
      setCurrentStep("upload")
      setProjectId(null)
      setProjectName("")
      setUploadedImages([])
      setCustomDomain(undefined)
      setConfiguration(null)
      setError("")
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
      {/* SearchParams Handler avvolto in Suspense */}
      <Suspense fallback={null}>
        <SearchParamsHandler onCreateAction={handleCreateAction} />
      </Suspense>

      {/* User Limits Banner */}
      <UserLimitsBanner />

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
            className={`rounded-xl px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white ${!can_create_video && !loading
              ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              }`}
            disabled={currentStep === "progress" || loading}
          >
            {!can_create_video && !loading ? (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Limit Reached - Buy Extra Video
                <Crown className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                {currentStep === "progress" ? "Creating Video..." : "Create New Video Ad"}
                <Sparkles className="w-5 h-5 ml-2" />
              </>
            )}
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
      {configuration && projectId && (
        <VideoProgressModal
          isOpen={isProgressModalOpen}
          onClose={(success) => handleProgressComplete(success)}
          projectName={projectName}
          projectId={projectId}
          configuration={configuration}
        />
      )}
    </>
  )
}
