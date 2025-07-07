"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Link2, ImageIcon, Crown, Lock } from "lucide-react"
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

      // STEP 1: Upload immagini su storage se presenti
      let uploadedImageUrls: string[] = []

      if (wizardData.images && wizardData.images.length > 0) {
        console.log(`📸 Caricamento ${wizardData.images.length} immagini su storage...`)

        const formData = new FormData()
        formData.append('project_name', wizardData.projectName || 'Wizard Project')

        // Aggiungi tutte le immagini al FormData
        wizardData.images.forEach((imageFile: any, index: number) => {
          formData.append('images', imageFile.file)
        })

        // Upload immagini
        const uploadResponse = await fetch('/api/upload-product-images', {
          method: 'POST',
          body: formData
        })

        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json()
          throw new Error(uploadError.error || 'Errore durante il caricamento delle immagini')
        }

        const uploadResult = await uploadResponse.json()
        uploadedImageUrls = uploadResult.image_urls || []

        console.log(`✅ ${uploadedImageUrls.length} immagini caricate su storage:`, uploadedImageUrls)
      }

      // STEP 2: Prepara dati per link_to_videos con URL immagini caricate
      const finalWizardData = {
        ...wizardData,
        // Sostituisce le immagini File con gli URL pubblici
        uploadedImageUrls: uploadedImageUrls,
        // Mantieni il primo URL immagine come fallback per link se non c'è productUrl
        primaryImageUrl: uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : null
      }

      console.log('🎬 Dati finali per creazione video:', finalWizardData)

      // STEP 3: CHIAMA API LINK_TO_VIDEOS con i dati del wizard e URL immagini
      const response = await fetch('/api/link_to_videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalWizardData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Errore durante la creazione del video')
      }

      const result = await response.json()

      console.log('✅ VIDEO CREATED:', result)

      // 🎉 NOTIFICA SUCCESSO
      toast.success('🎬 Video Generation Started Successfully!', {
        description: `The video "${wizardData.projectName}" has been started. You will receive a notification when it is ready.`,
        duration: 5000,
        icon: "🎬"
      })

      // 🔄 AGGIORNA LIMITI
      refreshLimits()

      router.push('/dashboard')

    } catch (error) {
      console.error('❌ Video creation error:', error)
      toast.error('❌ Error during video creation', {
        description: error instanceof Error ? error.message : 'Unknown error',
        duration: 5000
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

          {/* 🎯 DUE BOTTONI COME LO STILE ORIGINALE */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">

            {/* 🖼️ PRODUCT TO VIDEO - APRE IL WIZARD */}
            <Button
              size="lg"
              onClick={() => handleVideoCreationClick('image')}
              className={`rounded-xl px-4 sm:px-6 lg:px-8 py-3 lg:py-4 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white ${!can_create_video && !loading
                ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                }`}
              disabled={loading}
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
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="hidden sm:inline">Product to Video</span>
                  <span className="sm:hidden">Product Video</span>
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-yellow-300" />
                </>
              )}
            </Button>

            {/* 🏷️ LIMIT REACHED NOTICE */}
            {!can_create_video && !loading && (
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center justify-center space-x-2 text-amber-700 dark:text-amber-400">
                  <Crown className="w-5 h-5" />
                  <span className="font-medium">
                    Monthly video limit reached - Upgrade or buy extra videos to continue
                  </span>
                </div>
              </div>
            )}
          </div>
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
