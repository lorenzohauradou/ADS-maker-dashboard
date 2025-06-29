"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles, Crown, Lock } from "lucide-react"
import { useUserLimits } from "@/hooks/use-user-limits"
import { useSubscriptionLimits } from "@/hooks/use-subscription-limits"
import { UserLimitsBanner } from "./user-limits-banner"
import { LimitReachedModal } from "./limit-reached-modal"
import { CreationMethodModal } from "./video-creation-workflow/creation-method-modal"
import { ImageUploadModal } from "./video-creation-workflow/image-upload-modal"
import { VideoConfigurationModal } from "./video-creation-workflow/video-configuration-modal"
import { VideoProgressModal } from "./video-creation-workflow/video-progress-modal"
import { VideoConfiguration } from "./video-creation-workflow/types/video-configuration"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { trackBypassAttempt, trackLimitEvent } from '@/lib/posthog-pricing-enforcement'

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
      window.history.replaceState({}, '', '/dashboard')
    }
  }, [searchParams, onCreateAction])

  return null
}

export function CreateVideoSection() {
  const { data: session } = useSession()
  const { can_create_video, loading, buyExtraVideo } = useUserLimits()
  const { checkCanCreateVideo, showLimitExceededToast, refreshLimits, startPolling, stopPolling } = useSubscriptionLimits()

  // ✅ REF PER TRACCIARE SE IL COMPONENTE È MONTATO
  const isMountedRef = useRef(true)

  // ✅ CLEANUP AUTOMATICO QUANDO COMPONENTE SI SMONTA
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const [currentStep, setCurrentStep] = useState<"method" | "upload" | "config" | "progress" | "complete">("method")
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)

  // Project data
  const [projectId, setProjectId] = useState<number | null>(null)
  const [projectName, setProjectName] = useState("")
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [customDomain, setCustomDomain] = useState<string | undefined>(undefined)
  const [configuration, setConfiguration] = useState<VideoConfiguration | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<"images" | "url" | null>(null)
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [error, setError] = useState("")

  // ✅ GESTIONE POLLING tramite hook useSubscriptionLimits
  useEffect(() => {
    if (currentStep === "progress" && isProgressModalOpen) {
      console.log('🔄 Avvio polling tramite hook...')
      startPolling()
    } else {
      console.log('⏹️ Fermo polling tramite hook')
      stopPolling()
    }
  }, [currentStep, isProgressModalOpen, startPolling, stopPolling])

  const handleCreateAction = () => {
    if (!isMethodModalOpen && !isUploadModalOpen && !isConfigModalOpen && !isProgressModalOpen) {
      handleStartNewProject()
    }
  }

  // 🔥 TRACCIA TENTATIVO DI AVVIO PROGETTO CON CONTROLLI LIMITI
  const handleStartNewProject = async () => {
    // 🚀 CONTROLLO LIMITI CON TRACCIAMENTO AUTOMATICO
    const { canCreate, message } = await checkCanCreateVideo()

    if (!canCreate) {
      // 🔥 TRACCIA TENTATIVO DI BYPASS
      if (session?.user?.id) {
        trackBypassAttempt({
          plan: 'free',
          videos_per_month: 1,
          videos_used: 1,
          videos_remaining: 0,
          can_create_video: false,
          extra_video_price: 9.0,
          userId: session.user.id
        }, 'create_video_button_click')
      }

      showLimitExceededToast()
      return
    }

    // 🔥 TRACCIA AVVIO PROGETTO AUTORIZZATO
    if (session?.user?.id) {
      trackLimitEvent({
        eventType: 'limit_check',
        userId: session.user.id,
        plan: 'free',
        videosUsed: 0,
        videosLimit: 1,
        action: 'create_video',
        metadata: {
          source: 'create_video_section',
          button_clicked: 'create_new_video',
          step: 'project_start_authorized'
        }
      })
    }

    setIsMethodModalOpen(true)
  }

  const handleImagesUploaded = async (images: File[], name: string, domain?: string, project?: any) => {
    console.log("🎉 Progetto creato:", project?.id, "Nome:", name, "Immagini:", images.length)

    // ⚠️ Controlla se il componente è ancora montato prima di aggiornare stati
    if (!isMountedRef.current) return

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
    setCurrentStep("config")
    setIsConfigModalOpen(true)
  }

  const handleConfigurationComplete = async (config: VideoConfiguration) => {
    console.log("Configuration completed:", config)

    // ⚠️ Controlla se il componente è ancora montato
    if (!isMountedRef.current) return

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

    // ✅ AVVIA POLLING quando inizia elaborazione video
    startPolling()

    try {
      // 🚀 Avvia la creazione del video chiamando il backend
      console.log("🎬 Starting video creation for project:", projectId)

      const response = await fetch(`/api/creatify/start-video-workflow/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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

      // ⚠️ Controlla se il componente è ancora montato prima di aggiornare stati
      if (!isMountedRef.current) return

      setError(`Failed to start video creation: ${error instanceof Error ? error.message : 'Unknown error'}`)

      // Se errore, torna al step di configurazione
      setIsProgressModalOpen(false)
      setCurrentStep("config")
      setIsConfigModalOpen(true)
    }
  }

  const handleProgressComplete = async (videoSuccess: boolean | null = true) => {
    // ⚠️ Controlla se il componente è ancora montato prima di aggiornare stati
    if (!isMountedRef.current) return

    setIsProgressModalOpen(false)
    setCurrentStep("complete")

    // ✅ GESTIONE BASATA SUL TIPO DI CHIUSURA
    if (videoSuccess === true) {
      // 🎉 VIDEO COMPLETATO CON SUCCESSO
      console.log('✅ Video completato con successo, aggiorno banner...')

      // 🔄 REFRESH MULTIPLI per garantire aggiornamento banner
      console.log('🔄 Avvio refresh multipli per aggiornamento banner...')

      // Refresh immediato
      refreshLimits()

      // Refresh dopo 2 secondi
      setTimeout(() => {
        if (isMountedRef.current) {
          console.log('🔄 Refresh banner dopo 2s...')
          refreshLimits()
        }
      }, 2000)

      // Refresh dopo 5 secondi
      setTimeout(() => {
        if (isMountedRef.current) {
          console.log('🔄 Refresh banner dopo 5s...')
          refreshLimits()
        }
      }, 5000)

      // Refresh dopo 10 secondi
      setTimeout(() => {
        if (isMountedRef.current) {
          console.log('🔄 Refresh banner dopo 10s...')
          refreshLimits()
        }
      }, 10000)

      // Mostra toast di successo
      toast.success('🎉 Video creato con successo!', {
        description: 'Il tuo video pubblicitario è pronto. Controlla la dashboard per i dettagli.',
        duration: 5000
      })

      // ✅ Usage già incrementato automaticamente nel backend durante il processo video
      console.log('✅ Usage incrementato automaticamente dal backend')

    } else if (videoSuccess === null) {
      // ⏹️ CHIUSURA MANUALE - PROCESSO CONTINUA
      console.log('⏹️ Modal chiuso manualmente - processo continua in background')

      toast('🔄 Processo in corso', {
        description: 'Il video continua ad essere elaborato in background. Riceverai un\'email quando sarà pronto.',
        duration: 6000
      })

      // NON fermare il polling - potrebbe completarsi
      // Il polling continuerà e aggiornerà i limiti quando il video sarà pronto

    } else {
      // ❌ VERO FALLIMENTO DEL VIDEO
      console.log('❌ Video creation failed - errore reale')

      toast.error('❌ Errore nella creazione del video', {
        description: 'Si è verificato un problema durante la creazione. Riprova.',
        duration: 5000
      })
    }

    // Reset per permettere nuovo progetto
    setTimeout(() => {
      if (isMountedRef.current) {
        setCurrentStep("method")
        setProjectId(null)
        setProjectName("")
        setUploadedImages([])
        setCustomDomain(undefined)
        setConfiguration(null)
        setSelectedMethod(null)
        setWebsiteUrl("")
        setError("")
      }
    }, 2000)
  }

  const handleCloseMethod = () => {
    if (!isMountedRef.current) return
    setIsMethodModalOpen(false)
    setCurrentStep("method")
  }

  const handleSelectImageUpload = () => {
    if (!isMountedRef.current) return
    setSelectedMethod("images")
    setIsMethodModalOpen(false)
    setCurrentStep("upload")
    setIsUploadModalOpen(true)
  }

  const handleSelectWebsiteUrl = async (url: string) => {
    if (!isMountedRef.current) return
    setSelectedMethod("url")
    setWebsiteUrl(url)
    setIsMethodModalOpen(false)

    // For URL method, we skip image upload and go straight to configuration
    // But first we need to create a project with the URL
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Video from ${new URL(url).hostname}`,
          product_type: 'url',
          website_url: url
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const project = await response.json()

      if (project?.id) {
        setProjectId(project.id)
        setProjectName(project.name)
        setCurrentStep("config")
        setIsConfigModalOpen(true)
      } else {
        throw new Error("No project ID received")
      }
    } catch (error) {
      console.error("❌ Error creating URL project:", error)
      setError(`Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`)
      // Return to method selection
      setIsMethodModalOpen(true)
    }
  }

  const handleCloseUpload = () => {
    if (!isMountedRef.current) return
    setIsUploadModalOpen(false)
    setCurrentStep("method")
    setIsMethodModalOpen(true) // Return to method selection
  }

  const handleCloseConfig = () => {
    if (!isMountedRef.current) return
    setIsConfigModalOpen(false)

    // Return to appropriate previous step based on selected method
    if (selectedMethod === "images") {
      setCurrentStep("upload")
      setIsUploadModalOpen(true)
    } else if (selectedMethod === "url") {
      setCurrentStep("method")
      setIsMethodModalOpen(true)
    } else {
      setCurrentStep("method")
      setIsMethodModalOpen(true)
    }
  }

  const handleCloseProgress = () => {
    if (!isMountedRef.current) return
    setIsProgressModalOpen(false)
    setCurrentStep("method")

    // ✅ FERMA POLLING se chiuso manualmente
    stopPolling()
  }

  return (
    <>
      {/* SearchParams Handler avvolto in Suspense */}
      <Suspense fallback={null}>
        <SearchParamsHandler onCreateAction={handleCreateAction} />
      </Suspense>

      {/* User Limits Banner */}
      <UserLimitsBanner />

      <div className="text-center py-8 lg:py-12" data-create-video>
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
            className={`rounded-xl px-4 sm:px-6 lg:px-8 py-3 lg:py-4 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white ${!can_create_video && !loading
              ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              }`}
            disabled={currentStep === "progress" || loading}
          >
            {!can_create_video && !loading ? (
              <>
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Limit Reached - Buy Extra Video</span>
                <span className="sm:hidden">Limit Reached</span>
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">{currentStep === "progress" ? "Creating Video..." : "Create New Video Ad"}</span>
                <span className="sm:hidden">{currentStep === "progress" ? "Creating..." : "Create Video"}</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </>
            )}
          </Button>

          {/* Progress Indicator */}
          {!["method", "upload"].includes(currentStep) && (
            <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-slate-600 dark:text-zinc-400">
              <div className={`flex items-center space-x-2 ${currentStep === "config" ? "text-blue-600 dark:text-blue-400 font-medium" :
                ["progress", "complete"].includes(currentStep) ? "text-green-600 dark:text-green-400" : ""
                }`}>
                <div className={`w-2 h-2 rounded-full ${currentStep === "config" ? "bg-blue-500 animate-pulse" :
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
          {projectName && !["method", "upload"].includes(currentStep) && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg border">
              <p className="text-sm text-slate-600 dark:text-zinc-400">
                Current Project: <span className="font-medium text-slate-900 dark:text-white">{projectName}</span>
                {selectedMethod === "images" && uploadedImages.length > 0 && (
                  <span className="ml-2">• {uploadedImages.length} images</span>
                )}
                {selectedMethod === "url" && websiteUrl && (
                  <span className="ml-2">• From URL: {new URL(websiteUrl).hostname}</span>
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

      {/* Step 0: Creation Method Selection Modal */}
      <CreationMethodModal
        isOpen={isMethodModalOpen}
        onClose={handleCloseMethod}
        onSelectImageUpload={handleSelectImageUpload}
        onSelectWebsiteUrl={handleSelectWebsiteUrl}
      />

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

      {/* Limit Reached Modal */}
      <LimitReachedModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onBuyExtra={() => {
          refreshLimits()
        }}
        onUpgrade={() => {
          refreshLimits()
        }}
      />
    </>
  )
}
