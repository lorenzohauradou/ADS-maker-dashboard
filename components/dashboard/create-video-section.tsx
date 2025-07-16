"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Link2, ImageIcon, Crown, Lock, Sparkles } from "lucide-react"
import { useUserLimits } from "@/hooks/use-user-limits"
import { useSubscriptionLimits } from "@/hooks/use-subscription-limits"
import { UserLimitsBanner } from "./user-limits-banner"
import { LimitReachedModal } from "./limit-reached-modal"
import { UnifiedVideoWizard } from "@/components/dashboard/unified-video-wizard"
import { useSession } from "next-auth/react"
import { trackBypassAttempt, trackLimitEvent } from '@/lib/posthog-pricing-enforcement'
import { useSidebar } from "@/components/ui/sidebar"
import { toast } from "sonner"

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
  const router = useRouter()
  const { can_create_video, loading } = useUserLimits()
  const { checkCanCreateVideo, showLimitExceededToast, refreshLimits } = useSubscriptionLimits()
  const { setOpen } = useSidebar()

  const [showLimitModal, setShowLimitModal] = useState(false)
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  const handleCreateAction = () => {
    // Default action - could open a method selection modal if needed
    console.log('Create action triggered')
  }

  // 🎯 GESTIONE CLICK BOTTONI CON CONTROLLI LIMITI
  const handleVideoCreationClick = async (type: 'image' | 'link') => {
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
        }, `${type}_to_video_button_click`)
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
          button_clicked: `${type}_to_video`,
          step: 'navigation_authorized'
        }
      })
    }

    // APRI IL WIZARD UNIFICATO
    if (type === 'image') {
      setIsWizardOpen(true)
    } else {
      // NAVIGA ALLA PAGINA DEDICATA per "Link to Video"
      setOpen(false) // Chiudi sidebar
      router.push('/dashboard/create-video/link-input')
    }
  }

  const handleWizardComplete = async (wizardData: any) => {
    try {
      console.log('🧙‍♂️ WIZARD COMPLETATO: Avvio creazione video con dati:', wizardData)

      // 📊 DIAGNOSTICA INIZIALE
      const diagnosticData = {
        hasImages: wizardData.images?.length > 0,
        imageCount: wizardData.images?.length || 0,
        hasProjectName: !!wizardData.projectName?.trim(),
        projectName: wizardData.projectName,
        timestamp: new Date().toISOString()
      }
      console.log('🔍 DIAGNOSTICA WIZARD:', diagnosticData)

      // STEP 1: Upload immagini su storage se presenti
      let uploadedImageUrls: string[] = []

      if (wizardData.images && wizardData.images.length > 0) {
        console.log(`📸 STEP 1: Caricamento ${wizardData.images.length} immagini su storage...`)

        const formData = new FormData()
        formData.append('project_name', wizardData.projectName || 'Wizard Project')

        // Aggiungi tutte le immagini al FormData
        wizardData.images.forEach((imageFile: any, index: number) => {
          formData.append('images', imageFile.file)
          console.log(`📸 Aggiunta immagine ${index + 1}: ${imageFile.file.name} (${imageFile.file.size} bytes)`)
        })

        // Upload immagini
        console.log('📡 Chiamata /api/upload-product-images...')
        const uploadResponse = await fetch('/api/upload-product-images', {
          method: 'POST',
          body: formData
        })

        console.log('📊 UPLOAD RESPONSE:', {
          ok: uploadResponse.ok,
          status: uploadResponse.status,
          statusText: uploadResponse.statusText,
          headers: Object.fromEntries(uploadResponse.headers.entries())
        })

        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json().catch(() => ({}))
          console.error('❌ UPLOAD ERROR:', uploadError)
          throw new Error(uploadError.error || `Upload failed: HTTP ${uploadResponse.status}`)
        }

        const uploadResult = await uploadResponse.json()
        uploadedImageUrls = uploadResult.image_urls || []

        console.log(`✅ STEP 1 COMPLETATO: ${uploadedImageUrls.length} immagini caricate:`, uploadedImageUrls)

        // 🚨 CONTROLLO CRITICO
        if (uploadedImageUrls.length === 0) {
          throw new Error('Nessun URL immagine ricevuto dal backend dopo upload')
        }
      } else {
        console.log('⚠️ STEP 1 SALTATO: Nessuna immagine da caricare')
      }

      // STEP 2: Prepara dati per link_to_videos con URL immagini caricate
      const finalWizardData = {
        ...wizardData,
        // Sostituisce le immagini File con gli URL pubblici
        uploadedImageUrls: uploadedImageUrls,
        // Mantieni il primo URL immagine come fallback per link se non c'è productUrl
        primaryImageUrl: uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : null
      }

      console.log('🎬 STEP 2: Dati finali preparati per creazione video:')
      console.log('📊 Final Wizard Data:', {
        projectName: finalWizardData.projectName,
        platform: finalWizardData.platform,
        uploadedImageCount: finalWizardData.uploadedImageUrls?.length || 0,
        uploadedImageUrls: finalWizardData.uploadedImageUrls,
        hasProductUrl: !!finalWizardData.productUrl,
        avatarType: finalWizardData.avatarType,
        selectedAvatar: finalWizardData.selectedAvatar
      })

      // STEP 3: CHIAMA API LINK_TO_VIDEOS con i dati del wizard e URL immagini
      console.log('📡 STEP 3: Avvio chiamata /api/link_to_videos...')

      const response = await fetch('/api/link_to_videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalWizardData)
      })

      console.log('📊 LINK_TO_VIDEOS RESPONSE:', {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('❌ LINK_TO_VIDEOS ERROR:', errorData)
        throw new Error(errorData.error || `Video creation failed: HTTP ${response.status} - ${response.statusText}`)
      }

      const result = await response.json()

      console.log('✅ STEP 3 COMPLETATO - VIDEO CREATED:', result)

      // 🚨 CONTROLLO CRITICO DEL RISULTATO
      if (!result.success) {
        console.error('❌ Backend returned success=false:', result)
        throw new Error(result.error || 'Backend non ha confermato successo creazione video')
      }

      if (!result.video_result?.id && !result.project_id) {
        console.error('❌ Missing critical data in response:', result)
        throw new Error('Risposta backend incompleta: mancano video_result.id o project_id')
      }

      // 🎉 NOTIFICA SUCCESSO
      toast.success('🎬 Video Generation Started Successfully!', {
        description: `The video "${wizardData.projectName}" has been started. You will receive a notification when it is ready.`,
        duration: 5000,
        icon: "🎬"
      })

      // 🔄 AGGIORNA LIMITI
      refreshLimits()

      console.log('📧 Email sarà inviata automaticamente al completamento tramite webhook')

      router.push('/dashboard')

    } catch (error) {
      console.error('❌ VIDEO CREATION ERROR:', error)

      // 📊 DIAGNOSTICA ERRORE DETTAGLIATA
      const errorDetails = {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
      console.error('🔍 ERROR DIAGNOSTICS:', errorDetails)

      toast.error('❌ Error during video creation', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        duration: 8000
      })
    }
  }

  // 🎯 GESTIONE CHIUSURA WIZARD
  const handleWizardClose = () => {
    setIsWizardOpen(false)
    console.log('🧙‍♂️ Wizard closed')
  }

  return (
    <div>
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
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 lg:mb-10 leading-relaxed max-w-3xl mx-auto">
            Transform your product images into stunning video advertisements
            <br className="hidden sm:block" />
            with AI-powered automation
          </p>

          {/* 🎯 THREE VISUAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {/* 🖼️ IMAGE TO VIDEOS CARD */}
            <div
              className={`relative group cursor-pointer transition-all duration-300 ${!can_create_video && !loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              onClick={() => !(!can_create_video && !loading) && handleVideoCreationClick('image')}
            >
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200 dark:border-zinc-800">
                {/* Preview Image */}
                <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <ImageIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
                      Multiple Images → Professional Video
                    </div>
                  </div>
                  {!can_create_video && !loading && (
                    <div className="absolute top-3 right-3">
                      <Lock className="w-5 h-5 text-amber-500" />
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Image to Videos
                    </h3>
                    <Crown className="w-5 h-5 text-yellow-500" />
                  </div>

                  <p className="text-slate-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                    Upload multiple product images and create professional video ads with AI avatars and custom scripts.
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-slate-500 dark:text-zinc-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Multiple images support
                    </div>
                    <div className="flex items-center text-xs text-slate-500 dark:text-zinc-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      AI avatar integration
                    </div>
                    <div className="flex items-center text-xs text-slate-500 dark:text-zinc-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Custom scripts & voiceovers
                    </div>
                  </div>

                  <div className={`text-center ${!can_create_video && !loading ? 'text-amber-600' : 'text-blue-600'
                    }`}>
                    <div className="text-sm font-medium">
                      {!can_create_video && !loading ? 'Limit Reached' : 'Click to Start'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LINK TO VIDEOS CARD */}
            <div
              className={`relative group cursor-pointer transition-all duration-300 ${!can_create_video && !loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              onClick={() => !(!can_create_video && !loading) && handleVideoCreationClick('link')}
            >
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200 dark:border-zinc-800">
                {/* Preview Image */}
                <div className="h-48 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Link2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
                      Website URL → Automated Video
                    </div>
                  </div>
                  {!can_create_video && !loading && (
                    <div className="absolute top-3 right-3">
                      <Lock className="w-5 h-5 text-amber-500" />
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Link to Videos
                    </h3>
                    <div className="flex items-center">
                      <Crown className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                    Share your website URL and let AI analyze and create compelling video advertisements automatically.
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-slate-500 dark:text-zinc-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Auto website analysis
                    </div>
                    <div className="flex items-center text-xs text-slate-500 dark:text-zinc-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Product info extraction
                    </div>
                    <div className="flex items-center text-xs text-slate-500 dark:text-zinc-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Automated script generation
                    </div>
                  </div>

                  <div className={`text-center ${!can_create_video && !loading ? 'text-amber-600' : 'text-green-600'
                    }`}>
                    <div className="text-sm font-medium">
                      {!can_create_video && !loading ? 'Limit Reached' : 'Click to Start'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCT TO VIDEOS CARD */}
            <div
              className={`relative group cursor-pointer transition-all duration-300 ${!can_create_video && !loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              onClick={() => {
                if (!(!can_create_video && !loading)) {
                  setOpen(false) // Close sidebar
                  router.push('/dashboard/product-to-video')
                }
              }}
            >
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200 dark:border-zinc-800 relative">
                {/* Premium Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                    NEW
                  </div>
                </div>

                {/* Preview Image */}
                <div className="h-48 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center relative overflow-hidden">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/ptv_preview.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
                      Single Image → Cinematic Scene
                    </div>
                  </div>
                  {!can_create_video && !loading && (
                    <div className="absolute top-3 left-3">
                      <Lock className="w-5 h-5 text-amber-500" />
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Product to Video
                    </h3>
                    <Crown className="w-5 h-5 text-yellow-500" />
                  </div>

                  <p className="text-slate-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                    Upload a single product image and transform it into a professional cinematic scene with AI-generated backgrounds and avatars.
                  </p>

                  <div className={`text-center ${!can_create_video && !loading ? 'text-amber-600' : 'text-purple-600'
                    }`}>
                    <div className="text-sm font-medium">
                      {!can_create_video && !loading ? 'Limit Reached' : 'Click to Start'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LIMIT REACHED NOTICE */}
          {!can_create_video && !loading && (
            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-amber-700 dark:text-amber-400">
                <Crown className="w-5 h-5" />
                <span className="font-medium">
                  Monthly video limit reached - Upgrade or buy extra videos to continue
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 🧙‍♂️ WIZARD UNIFICATO */}
        {isWizardOpen && (
          <UnifiedVideoWizard
            isOpen={isWizardOpen}
            onClose={handleWizardClose}
            onComplete={handleWizardComplete}
            userId={session?.user?.id}
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
      </div>
    </div>
  )
}
