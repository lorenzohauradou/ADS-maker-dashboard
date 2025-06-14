'use client'

import { useSession } from 'next-auth/react'
import { useCallback } from 'react'
import { trackLimitEvent, trackExtraVideoPurchase, trackBypassAttempt, enforceVideoLimits } from '@/lib/posthog-pricing-enforcement'
import type { PlanType, SubscriptionLimits } from '@/lib/posthog-pricing-enforcement'

/**
 * 🚀 Hook personalizzato per semplificare il tracciamento PostHog dei limiti di pricing
 * 
 * Questo hook fornisce metodi semplificati per:
 * - Tracciare interazioni con la barra di utilizzo
 * - Tracciare tentativi di bypass dei limiti
 * - Tracciare acquisti di video extra
 * - Tracciare upgrade di piano
 */
export function usePostHogPricing() {
  const { data: session } = useSession()

  // 🔥 TRACCIA VISUALIZZAZIONE BARRA DI UTILIZZO
  const trackUsageBarView = useCallback((limits: SubscriptionLimits) => {
    if (!session?.user?.id) return

    trackLimitEvent({
      eventType: 'limit_check',
      userId: session.user.id,
      plan: limits.plan as PlanType,
      videosUsed: limits.videos_used,
      videosLimit: limits.videos_per_month,
      action: 'check_limits',
      metadata: {
        usage_bar_viewed: true,
        usage_percentage: limits.videos_per_month > 0 ? Math.round((limits.videos_used / limits.videos_per_month) * 100) : 0,
        can_create_video: limits.can_create_video,
        videos_remaining: limits.videos_remaining
      }
    })
  }, [session?.user?.id])

  // 🔥 TRACCIA CLICK SU UPGRADE PLAN
  const trackUpgradeClick = useCallback((limits: SubscriptionLimits, source: string) => {
    if (!session?.user?.id) return

    trackLimitEvent({
      eventType: 'upgrade_shown',
      userId: session.user.id,
      plan: limits.plan as PlanType,
      videosUsed: limits.videos_used,
      videosLimit: limits.videos_per_month,
      action: 'upgrade_attempt',
      metadata: {
        source,
        button_clicked: 'upgrade_plan',
        current_usage_percentage: limits.videos_per_month > 0 ? Math.round((limits.videos_used / limits.videos_per_month) * 100) : 0
      }
    })
  }, [session?.user?.id])

  // 🔥 TRACCIA ACQUISTO VIDEO EXTRA
  const trackBuyExtraClick = useCallback((limits: SubscriptionLimits, source: string) => {
    if (!session?.user?.id) return

    trackExtraVideoPurchase(limits, limits.extra_video_price)
  }, [session?.user?.id])

  // 🔥 TRACCIA TENTATIVO DI BYPASS
  const trackBypass = useCallback((limits: SubscriptionLimits, attemptType: string) => {
    if (!session?.user?.id) return

    trackBypassAttempt(limits, attemptType)
  }, [session?.user?.id])

  // 🔥 TRACCIA LIMITE RAGGIUNTO
  const trackLimitReached = useCallback((limits: SubscriptionLimits, source: string) => {
    if (!session?.user?.id) return

    trackLimitEvent({
      eventType: 'limit_exceeded',
      userId: session.user.id,
      plan: limits.plan as PlanType,
      videosUsed: limits.videos_used,
      videosLimit: limits.videos_per_month,
      action: 'create_video',
      metadata: {
        source,
        limit_reached: true,
        recommended_action: limits.plan === 'free' ? 'upgrade_plan' : 'buy_extra_video'
      }
    })
  }, [session?.user?.id])

  // 🔥 TRACCIA COMPLETAMENTO VIDEO (aggiorna contatori)
  const trackVideoCompleted = useCallback((projectId: number, limits: SubscriptionLimits) => {
    if (!session?.user?.id) return

    trackLimitEvent({
      eventType: 'limit_check',
      userId: session.user.id,
      plan: limits.plan as PlanType,
      videosUsed: limits.videos_used + 1, // +1 perché video completato
      videosLimit: limits.videos_per_month,
      action: 'create_video',
      metadata: {
        project_id: projectId,
        video_completed: true,
        usage_bar_should_update: true,
        new_usage_count: limits.videos_used + 1
      }
    })
  }, [session?.user?.id])

  // 🔥 VERIFICA LIMITI CON ENFORCEMENT
  const checkLimitsWithTracking = useCallback((limits: SubscriptionLimits, source: string) => {
    if (!session?.user?.id) return { canCreate: false, message: 'Non autenticato' }

    const enforcement = enforceVideoLimits(limits)
    
    // Traccia il controllo
    trackLimitEvent({
      eventType: 'limit_check',
      userId: session.user.id,
      plan: limits.plan as PlanType,
      videosUsed: limits.videos_used,
      videosLimit: limits.videos_per_month,
      action: 'check_limits',
      metadata: {
        source,
        enforcement_result: enforcement.canCreate,
        can_create_video: limits.can_create_video
      }
    })

    return enforcement
  }, [session?.user?.id])

  // 🔥 TRACCIA ERRORI DI POLLING/FETCH
  const trackFetchError = useCallback((error: string, source: string, limits?: Partial<SubscriptionLimits>) => {
    if (!session?.user?.id) return

    trackLimitEvent({
      eventType: 'limit_check',
      userId: session.user.id,
      plan: (limits?.plan as PlanType) || 'free',
      videosUsed: limits?.videos_used || 0,
      videosLimit: limits?.videos_per_month || 1,
      action: 'check_limits',
      metadata: {
        source,
        error,
        fetch_failed: true,
        error_type: 'network_or_api'
      }
    })
  }, [session?.user?.id])

  return {
    // Metodi di tracciamento
    trackUsageBarView,
    trackUpgradeClick,
    trackBuyExtraClick,
    trackBypass,
    trackLimitReached,
    trackVideoCompleted,
    trackFetchError,
    
    // Metodi di controllo
    checkLimitsWithTracking,
    
    // Stato
    isAuthenticated: !!session?.user?.id,
    userId: session?.user?.id
  }
} 