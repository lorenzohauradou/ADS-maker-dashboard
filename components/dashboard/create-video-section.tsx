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
import { UnifiedVideoWizard } from "./unified-video-wizard/index"
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

  // REF PER TRACCIARE SE IL COMPONENTE È MONTATO
  const isMountedRef = useRef(true)

  // CLEANUP AUTOMATICO QUANDO COMPONENTE SI SMONTA
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

  // NUOVO WIZARD UNIFICATO
  const [isUnifiedWizardOpen, setIsUnifiedWizardOpen] = useState(false)
  // Project data
  const [projectId, setProjectId] = useState<number | null>(null)
  const [projectName, setProjectName] = useState("")
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [customDomain, setCustomDomain] = useState<string | undefined>(undefined)
  const [configuration, setConfiguration] = useState<VideoConfiguration | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<"images" | "url" | null>(null)
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [error, setError] = useState("")

  // GESTIONE POLLING tramite hook useSubscriptionLimits
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
    if (!isMethodModalOpen && !isUploadModalOpen && !isConfigModalOpen && !isProgressModalOpen && !isUnifiedWizardOpen) {
      handleStartNewProject()
    }
  }

  // GESTIONE WIZARD UNIFICATO
  const handleStartUnifiedWizard = async () => {
    // CONTROLLO LIMITI CON TRACCIAMENTO AUTOMATICO
    const { canCreate, message } = await checkCanCreateVideo()

    if (!canCreate) {
      if (session?.user?.id) {
        trackBypassAttempt({
          plan: 'free',
          videos_per_month: 1,
          videos_used: 1,
          videos_remaining: 0,
          can_create_video: false,
          extra_video_price: 9.0,
          userId: session.user.id
        }, 'unified_wizard_button_click')
      }
      showLimitExceededToast()
      return
    }

    // APRI DIRETTAMENTE IL WIZARD
    // Il progetto verrà creato solo quando l'utente completa tutto il wizard
    setIsUnifiedWizardOpen(true)
  }

  const handleCloseUnifiedWizard = () => {
    setIsUnifiedWizardOpen(false)
  }

  const handleCompleteUnifiedWizard = async (wizardData: any) => {
    try {
      // DETERMINE CREATION METHOD
      const hasImages = wizardData.images && wizardData.images.length > 0
      const hasUrl = wizardData.productUrl && wizardData.productUrl.trim() !== ""

      if (hasUrl && !hasImages) {
        // URL-ONLY FLOW: Use Creatify link_to_videos endpoint directly
        console.log("🔗 URL-only flow: calling /api/link_to_videos/")

        // Map wizard data to Creatify API parameters
        const aspectRatio = wizardData.platform === 'youtube' ? '16:9' :
          wizardData.platform === 'facebook' ? '1:1' : '9:16'

        // Map target audience to expected format
        const audienceMap: { [key: string]: string } = {
          'young-adults': 'young_adults',
          'families': 'families',
          'professionals': 'professionals',
          'seniors': 'seniors',
          'teens': 'teenagers',
          'general': 'general'
        }

        const creatifyPayload = {
          name: wizardData.projectName,
          target_platform: wizardData.platform.toLowerCase(),
          target_audience: audienceMap[wizardData.targetAudience] || wizardData.targetAudience,
          language: "en", // Default to English
          video_length: wizardData.videoLength,
          aspect_ratio: aspectRatio,
          script_style: "BenefitsV2",
          visual_style: "AvatarBubbleTemplate",
          override_avatar: null, // TODO: Mappare correttamente gli UUID degli avatar
          override_voice: null,
          override_script: null,
          background_music_url: null,
          background_music_volume: 0.4,
          voiceover_volume: 0.8,
          webhook_url: null,
          link: wizardData.productUrl,
          no_background_music: false,
          no_caption: false,
          no_emotion: false,
          no_cta: false,
          no_stock_broll: false,
          caption_style: "normal-black",
          caption_offset_x: null,
          caption_offset_y: null,
          caption_setting: {
            style: "normal-black",
            offset: {
              x: 0,
              y: 0.4
            },
            font_family: "Montserrat",
            font_size: 32,
            font_style: "font-bold",
            background_color: null,
            text_color: null,
            highlight_text_color: null,
            max_width: 400,
            line_height: 1.2,
            text_shadow: null,
            hidden: false
          }
        }

        const linkVideoResponse = await fetch('/api/link_to_videos/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(creatifyPayload)
        })

        if (!linkVideoResponse.ok) {
          const errorData = await linkVideoResponse.json()
          throw new Error(errorData.detail || errorData.error || `HTTP ${linkVideoResponse.status}`)
        }

        const linkVideoResult = await linkVideoResponse.json()

        toast.success('🎬 Video creation started from URL!', {
          description: `Your video will be ready in 2-3 minutes. Project ID: ${linkVideoResult.project_id}`,
          duration: 5000
        })

        // Refresh limits after video creation
        refreshLimits()
        setIsUnifiedWizardOpen(false)

        return

      } else if (hasImages) {
        // IMAGE-BASED FLOW: Use Creatify product_to_videos/gen_image endpoint
        console.log("🖼️ Image-based flow: calling /api/product_to_videos/gen_image/")

        // First, create a project with images to get public URLs
        const formData = new FormData()
        formData.append('name', wizardData.projectName)
        formData.append('product_type', 'physical')

        // Add images for upload
        wizardData.images.forEach((image: any, index: number) => {
          formData.append('files', image.file)
        })

        // Create project and upload images to get public URLs
        const projectResponse = await fetch('/api/projects', {
          method: 'POST',
          body: formData
        })

        if (!projectResponse.ok) {
          throw new Error('Failed to create project with images')
        }

        const projectResult = await projectResponse.json()

        // Get the first image URL from the created project
        const projectDetailResponse = await fetch(`/api/projects/${projectResult.id}`)
        if (!projectDetailResponse.ok) {
          throw new Error('Failed to fetch project details')
        }

        const projectDetails = await projectDetailResponse.json()
        const productShowcaseUrl = projectDetails.images?.[0]?.url || ""

        // Map wizard data to Creatify product_to_videos API parameters
        const aspectRatio = wizardData.platform === 'youtube' ? '16x9' :
          wizardData.platform === 'facebook' ? '1x1' : '9x16'

        // Determine type based on whether avatar is selected
        const videoType = wizardData.selectedAvatar ? "product_avatar" : "product_anyshot"

        const productVideoPayload = {
          type: videoType,
          product_url: wizardData.productUrl || productShowcaseUrl, // Usa l'URL dell'immagine se non c'è product URL
          image_prompt: `Professional ${wizardData.targetAudience} promotional image for ${wizardData.projectName}`,
          aspect_ratio: aspectRatio,
          override_avatar: null, // TODO: Mappare correttamente gli UUID degli avatar
          product_showcase_url: productShowcaseUrl,
          webhook_url: null // Could be configured for status updates
        }

        const productVideoResponse = await fetch('/api/product_to_videos/gen_image/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...productVideoPayload,
            existing_project_id: projectResult.id  // 🎯 Passa ID progetto esistente
          })
        })

        if (!productVideoResponse.ok) {
          const errorData = await productVideoResponse.json()
          throw new Error(errorData.detail || errorData.error || `HTTP ${productVideoResponse.status}`)
        }

        const productVideoResult = await productVideoResponse.json()

        toast.success('📸 Step 1/2: Image optimization started!', {
          description: `Video generation is starting. Step 2 will begin automatically. Project ID: ${productVideoResult.project_id}`,
          duration: 5000
        })

        // Refresh limits after video creation
        refreshLimits()
        setIsUnifiedWizardOpen(false)

        console.log("✅ Product video generation started:", productVideoResult.project_id)

      } else {
        throw new Error('No images or URL provided')
      }

    } catch (error) {
      console.error('Error completing unified wizard:', error)
      toast.error('Error during video creation', {
        description: error instanceof Error ? error.message : 'Unknown error',
        duration: 7000
      })
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

    // Controlla se il componente è ancora montato prima di aggiornare stati
    if (!isMountedRef.current) return

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

    startPolling()

    try {
      // DETERMINE CREATION METHOD BASED ON PROJECT DATA
      const hasUrl = websiteUrl && websiteUrl.trim() !== ""
      const hasImages = uploadedImages && uploadedImages.length > 0

      console.log(`🎯 Creation method: URL=${hasUrl}, Images=${hasImages}`)

      if (hasUrl && !hasImages) {
        // URL-ONLY FLOW: Use Link to Videos
        console.log("🔗 Using Link to Videos workflow")

        const aspectRatio = config.target_platform === 'youtube' ? '16x9' :
          config.target_platform === 'facebook' ? '1x1' : '9x16'

        // Map target audience to expected format
        const audienceMap: { [key: string]: string } = {
          'young-adults': 'young_adults',
          'families': 'families',
          'professionals': 'professionals',
          'seniors': 'seniors',
          'teens': 'teenagers',
          'general': 'general'
        }

        const linkVideoPayload = {
          name: projectName,
          target_platform: config.target_platform.toLowerCase(),
          target_audience: audienceMap[config.target_audience] || config.target_audience,
          language: config.language,
          video_length: config.video_length,
          aspect_ratio: aspectRatio,
          script_style: config.script_style,
          visual_style: config.visual_style,
          override_avatar: null, // TODO: Mappare correttamente gli UUID degli avatar
          override_voice: config.voice_id || null,
          override_script: config.override_script || null,
          background_music_url: null,
          background_music_volume: config.background_music_volume,
          voiceover_volume: config.voiceover_volume,
          webhook_url: null,
          link: websiteUrl,
          no_background_music: config.no_background_music,
          no_caption: config.no_caption,
          no_emotion: config.no_emotion,
          no_cta: config.no_cta,
          no_stock_broll: false,
          caption_style: config.caption_style,
          caption_offset_x: config.caption_offset_x,
          caption_offset_y: config.caption_offset_y,
          caption_setting: {
            style: config.caption_style,
            offset: {
              x: config.caption_offset_x || 0,
              y: config.caption_offset_y || 0.4
            },
            font_family: config.caption_font_family,
            font_size: config.caption_font_size,
            font_style: config.caption_font_style,
            background_color: config.caption_background_color,
            text_color: config.caption_text_color,
            highlight_text_color: config.caption_highlight_text_color,
            max_width: config.caption_max_width,
            line_height: config.caption_line_height,
            text_shadow: config.caption_text_shadow,
            hidden: config.no_caption
          }
        }

        const response = await fetch('/api/link_to_videos/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(linkVideoPayload)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || errorData.error || `HTTP ${response.status}`)
        }

        const result = await response.json()
        console.log("✅ Link to Videos creation started:", result)

      } else if (hasImages) {
        // IMAGE-BASED FLOW: Use Product to Videos
        console.log("🖼️ Using Product to Videos workflow")

        // Get existing project images from database instead of re-uploading
        const projectResponse = await fetch(`/api/projects/${projectId}`)

        if (!projectResponse.ok) {
          throw new Error('Failed to fetch project images')
        }

        const projectData = await projectResponse.json()
        const projectImages = projectData.images || []

        if (projectImages.length === 0) {
          throw new Error('No images found in project')
        }

        const productShowcaseUrl = projectImages[0].url // Use first image as showcase

        // Map configuration to Product to Videos API parameters
        const aspectRatio = config.target_platform === 'youtube' ? '16x9' :
          config.target_platform === 'facebook' ? '1x1' : '9x16'

        // Determine type based on whether avatar is selected
        const videoType = config.avatar_id ? "product_avatar" : "product_anyshot"

        const productVideoPayload = {
          type: videoType,
          product_url: websiteUrl || productShowcaseUrl, // Usa l'URL dell'immagine se non c'è website URL
          image_prompt: `Professional ${config.target_audience} promotional image for ${projectName}`,
          aspect_ratio: aspectRatio,
          override_avatar: null, // TODO: Mappare correttamente gli UUID degli avatar
          product_showcase_url: productShowcaseUrl,
          webhook_url: null // Could be configured for status updates
        }

        const response = await fetch('/api/product_to_videos/gen_image/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...productVideoPayload,
            existing_project_id: projectId  // Passa ID progetto esistente
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || errorData.error || `HTTP ${response.status}`)
        }

        const result = await response.json()
        console.log("✅ Product to Videos generation started:", result)

      } else {
        throw new Error('No images or URL provided')
      }

      // Refresh limits after video creation
      refreshLimits()

    } catch (error) {
      console.error("❌ Error starting video creation:", error)

      // Controlla se il componente è ancora montato prima di aggiornare stati
      if (!isMountedRef.current) return

      setError(`Failed to start video creation: ${error instanceof Error ? error.message : 'Unknown error'}`)

      // Se errore, torna al step di configurazione
      setIsProgressModalOpen(false)
      setCurrentStep("config")
      setIsConfigModalOpen(true)
    }
  }

  const handleProgressComplete = async (videoSuccess: boolean | null = true) => {
    // Controlla se il componente è ancora montato prima di aggiornare stati
    if (!isMountedRef.current) return

    setIsProgressModalOpen(false)
    setCurrentStep("complete")

    // GESTIONE BASATA SUL TIPO DI CHIUSURA
    if (videoSuccess === true) {
      // VIDEO COMPLETATO CON SUCCESSO
      console.log('✅ Video completato con successo, aggiorno banner...')

      // REFRESH MULTIPLI per garantire aggiornamento banner
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

      // Usage già incrementato automaticamente nel backend durante il processo video
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

    // FERMA POLLING se chiuso manualmente
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* 🎯 NEW UNIFIED WIZARD (FEATURED) */}
            <Button
              size="lg"
              onClick={handleStartUnifiedWizard}
              className={`rounded-xl px-4 sm:px-6 lg:px-8 py-3 lg:py-4 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white ${!can_create_video && !loading
                ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                }`}
              disabled={loading || isUnifiedWizardOpen}
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
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="hidden sm:inline">🎯 New AI Wizard</span>
                  <span className="sm:hidden">🎯 AI Wizard</span>
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-yellow-300" />
                </>
              )}
            </Button>

            {/* Original workflow button (for compatibility) */}
            <Button
              size="lg"
              variant="outline"
              onClick={handleStartNewProject}
              className="rounded-xl px-4 sm:px-6 lg:px-8 py-3 lg:py-4 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={currentStep === "progress" || loading}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">{currentStep === "progress" ? "Creating Video..." : "Classic Workflow"}</span>
              <span className="sm:hidden">{currentStep === "progress" ? "Creating..." : "Classic"}</span>
            </Button>
          </div>

          {/* Information note */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-center justify-center gap-2">
              <Crown className="w-4 h-4 text-yellow-500" />
              <span><strong>New!</strong> The AI Wizard combines all features in one intuitive conversational flow</span>
            </p>
          </div>

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

      {/* WIZARD UNIFICATO */}
      <UnifiedVideoWizard
        isOpen={isUnifiedWizardOpen}
        onClose={handleCloseUnifiedWizard}
        onComplete={handleCompleteUnifiedWizard}
        userId={session?.user?.id}
      />
    </>
  )
}
