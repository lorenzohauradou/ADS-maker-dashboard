"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { enforceVideoLimits, trackLimitEvent, trackExtraVideoPurchase, trackBypassAttempt } from '@/lib/posthog-pricing-enforcement'
import { refreshAllLimitsHooks } from './use-user-limits'

interface SubscriptionLimits {
  plan: string
  videos_per_month: number
  videos_used: number
  videos_remaining: number
  can_create_video: boolean
  extra_video_price: number
  subscription_status?: string
}

interface LimitsState extends SubscriptionLimits {
  loading: boolean
  error?: string
}

export function useSubscriptionLimits() {
  const { data: session } = useSession()
  
  // ✅ REF PER TRACCIARE SE IL COMPONENTE È MONTATO
  const isMountedRef = useRef(true)
  
  // ✅ CLEANUP AUTOMATICO QUANDO COMPONENTE SI SMONTA
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])
  
  const [limits, setLimits] = useState<LimitsState>({
    plan: 'free',
    videos_per_month: 1,
    videos_used: 0,
    videos_remaining: 1,
    can_create_video: true,
    extra_video_price: 9.0,
    loading: true
  })

  // ✅ POLLING AUTOMATICO per aggiornare limiti durante elaborazione video
  const [isPolling, setIsPolling] = useState(false)

  const fetchLimits = useCallback(async () => {
    if (!session?.user?.id || !isMountedRef.current) {
      // ⚠️ SAFE STATE UPDATE - Solo se componente è montato
      if (isMountedRef.current) {
        setLimits(prev => ({ ...prev, loading: false }))
      }
      return
    }

    try {
      console.log('🔄 Fetching limits for user:', session.user.id)
      
      // ✅ USA ENDPOINT NEXTJS invece del backend diretto
      const response = await fetch(`/api/subscriptions/check-limits/${session.user.id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      console.log('✅ Limits fetched successfully:', {
        plan: data.plan,
        videos_used: data.videos_used,
        videos_remaining: data.videos_remaining,
        can_create_video: data.can_create_video
      })
      
      // ✅ SAFE STATE UPDATE - Solo se componente è ancora montato
      if (isMountedRef.current) {
        setLimits({
          plan: data.plan,
          videos_per_month: data.videos_per_month,
          videos_used: data.videos_used,
          videos_remaining: data.videos_remaining,
          can_create_video: data.can_create_video,
          extra_video_price: data.extra_video_price,
          subscription_status: data.subscription_status,
          loading: false
        })
      }

      // 🔥 TRACCIAMENTO AUTOMATICO CON POSTHOG
      trackLimitEvent({
        eventType: 'limit_check',
        userId: session.user.id,
        plan: data.plan as any,
        videosUsed: data.videos_used,
        videosLimit: data.videos_per_month,
        action: 'check_limits',
        metadata: {
          fetch_source: 'subscription_limits_hook',
          videos_remaining: data.videos_remaining,
          can_create_video: data.can_create_video,
          subscription_status: data.subscription_status,
          usage_bar_displayed: true
        }
      })

    } catch (error) {
      console.error('❌ Error fetching subscription limits:', error)
      
      // ✅ SAFE STATE UPDATE - Solo se componente è ancora montato
      if (isMountedRef.current) {
        setLimits(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load subscription limits'
        }))
      }

      // 🔥 TRACCIA ERRORI
      if (session?.user?.id) {
        trackLimitEvent({
          eventType: 'limit_check',
          userId: session.user.id,
          plan: limits.plan as any,
          videosUsed: limits.videos_used,
          videosLimit: limits.videos_per_month,
          action: 'check_limits',
          metadata: {
            error: error instanceof Error ? error.message : 'unknown',
            fetch_source: 'subscription_limits_hook',
            error_type: 'fetch_failed'
          }
        })
      }
    }
  }, [session?.user?.id, limits.plan, limits.videos_used, limits.videos_per_month])

  // ✅ AVVIA POLLING quando video in elaborazione
  const startPolling = useCallback(() => {
    console.log('🔄 Avvio polling limiti per aggiornamento real-time...')
    if (isMountedRef.current) {
      setIsPolling(true)
    }
  }, [])

  // ✅ FERMA POLLING
  const stopPolling = useCallback(() => {
    console.log('⏹️ Fermo polling limiti')
    if (isMountedRef.current) {
      setIsPolling(false)
    }
  }, [])

  // ✅ POLLING EFFECT
  useEffect(() => {
    if (!isPolling || !session?.user?.id || !isMountedRef.current) return

    console.log('🔄 Polling attivato - aggiornamento ogni 30 secondi')
    
    // Primo fetch immediato
    fetchLimits()
    
    const interval = setInterval(() => {
      // ⚠️ Controlla se il componente è ancora montato prima di fare fetch
      if (isMountedRef.current) {
        console.log('🔄 Polling aggiornamento limiti...')
        fetchLimits()
      }
    }, 30000) // Ogni 30 secondi durante elaborazione (ridotto da 10s)

    return () => {
      console.log('⏹️ Cleanup polling interval')
      clearInterval(interval)
    }
  }, [isPolling, session?.user?.id, fetchLimits])

  // 🔥 VERIFICA CON ENFORCEMENT E TRACCIAMENTO AUTOMATICO
  const checkCanCreateVideo = async (): Promise<{ canCreate: boolean; message?: string }> => {
    if (!session?.user?.id) {
      return { canCreate: false, message: 'Utente non autenticato' }
    }

    if (limits.loading) {
      await fetchLimits()
    }

    // 🚀 USA IL NUOVO SISTEMA DI ENFORCEMENT
    const enforcement = enforceVideoLimits({
      plan: limits.plan as any,
      videos_per_month: limits.videos_per_month,
      videos_used: limits.videos_used,
      videos_remaining: limits.videos_remaining,
      can_create_video: limits.can_create_video,
      extra_video_price: limits.extra_video_price,
      userId: session.user.id
    })

    if (!enforcement.canCreate) {
      const planName = limits.plan.charAt(0).toUpperCase() + limits.plan.slice(1)
      return {
        canCreate: false,
        message: `Hai raggiunto il limite di ${limits.videos_per_month} video per il piano ${planName}. Aggiorna il piano o acquista video extra.`
      }
    }

    return { canCreate: true }
  }

  // 🔥 ACQUISTA VIDEO EXTRA CON TRACCIAMENTO
  const buyExtraVideo = async (): Promise<boolean> => {
    if (!session?.user?.id) {
      toast.error('Utente non autenticato')
      return false
    }

    // 🚀 TRACCIA TENTATIVO DI ACQUISTO
    trackExtraVideoPurchase({
      plan: limits.plan as any,
      videos_per_month: limits.videos_per_month,
      videos_used: limits.videos_used,
      videos_remaining: limits.videos_remaining,
      can_create_video: limits.can_create_video,
      extra_video_price: limits.extra_video_price,
      userId: session.user.id
    }, limits.extra_video_price)

    try {
      const response = await fetch('/api/stripe/buy-extra-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: limits.plan
        }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
        return true
      } else {
        toast.error(data.error || 'Errore durante l\'acquisto del video extra')
        return false
      }
    } catch (error) {
      console.error('Error buying extra video:', error)
      toast.error('Errore di connessione')
      return false
    }
  }

  // 🔥 MOSTRA TOAST CON TRACCIAMENTO
  const showLimitExceededToast = () => {
    const planName = limits.plan.charAt(0).toUpperCase() + limits.plan.slice(1)
    
    // 🚀 TRACCIA QUANDO VIENE MOSTRATO IL TOAST DI LIMITE
    if (session?.user?.id) {
      trackLimitEvent({
        eventType: 'limit_exceeded',
        userId: session.user.id,
        plan: limits.plan as any,
        videosUsed: limits.videos_used,
        videosLimit: limits.videos_per_month,
        action: 'create_video',
        metadata: {
          toast_shown: true,
          plan_name: planName,
          recommended_action: limits.plan === 'free' ? 'upgrade_plan' : 'buy_extra_video'
        }
      })
    }
    
    toast.error(
      `Limite raggiunto per il piano ${planName}`,
      {
        description: `Hai usato tutti i ${limits.videos_per_month} video del mese. Aggiorna il piano o acquista video extra.`,
        action: {
          label: limits.plan === 'free' ? 'Aggiorna Piano' : 'Acquista Video Extra',
          onClick: () => {
            // 🚀 TRACCIA CLICK SULL'AZIONE DEL TOAST
            if (session?.user?.id) {
              trackLimitEvent({
                eventType: 'upgrade_shown',
                userId: session.user.id,
                plan: limits.plan as any,
                videosUsed: limits.videos_used,
                videosLimit: limits.videos_per_month,
                action: 'upgrade_attempt',
                metadata: {
                  source: 'limit_exceeded_toast',
                  action_clicked: limits.plan === 'free' ? 'upgrade_plan' : 'buy_extra_video'
                }
              })
            }

            if (limits.plan === 'free') {
              window.location.href = '/#pricing'
            } else {
              buyExtraVideo()
            }
          }
        },
        duration: 10000
      }
    )
  }

  // Refresh dopo acquisto o upgrade
  const refreshLimits = () => {
    console.log('🔄 SUBSCRIPTION-LIMITS: Manual refresh triggered')
    fetchLimits()
    
    // 🚀 SINCRONIZZA ALTRI HOOK (banner, ecc)
    setTimeout(() => {
      console.log('🔄 SUBSCRIPTION-LIMITS: Syncing with user-limits hook...')
      refreshAllLimitsHooks()
    }, 500) // Delay per evitare loop
  }

  useEffect(() => {
    if (session?.user?.id && isMountedRef.current) {
      fetchLimits()
    }
  }, [session?.user?.id, fetchLimits])

  return {
    limits,
    checkCanCreateVideo,
    buyExtraVideo,
    showLimitExceededToast,
    refreshLimits,
    fetchLimits,
    startPolling,
    stopPolling,
    isPolling
  }
} 