import { trackEvent } from './posthog'

// Tipi per i piani di pricing
export type PlanType = 'free' | 'starter' | 'pro' | 'business'

export interface LimitEnforcementEvent {
  userId: string
  plan: PlanType
  videosUsed: number
  videosLimit: number
  action: 'create_video' | 'check_limits' | 'upgrade_attempt' | 'buy_extra'
  metadata?: Record<string, any>
}

export interface SubscriptionLimits {
  plan: PlanType
  videos_per_month: number
  videos_used: number
  videos_remaining: number
  can_create_video: boolean
  extra_video_price: number
  userId: string
}

// 🎯 CONFIGURAZIONE PIANI PRICING (dai tuoi dati)
const PLAN_CONFIGS = {
  free: { 
    videos: 1, 
    extra_price: 9.0, 
    websites: 1,
    monthly_price: 0,
    annual_price: 0 
  },
  starter: { 
    videos: 10, 
    extra_price: 7.0, 
    websites: 1,
    monthly_price: 39,
    annual_price: 390 
  },
  pro: { 
    videos: 25, 
    extra_price: 5.0, 
    websites: 'unlimited',
    monthly_price: 79,
    annual_price: 790 
  },
  business: { 
    videos: 55, 
    extra_price: 3.0, 
    websites: 'unlimited',
    monthly_price: 149,
    annual_price: 1490 
  }
} as const

// 🔥 FUNZIONI PRINCIPALI DI TRACCIAMENTO

/**
 * Traccia eventi specifici dei limiti di pricing
 */
export const trackLimitEvent = (event: LimitEnforcementEvent & { 
  eventType: 'limit_check' | 'limit_exceeded' | 'limit_bypass_attempt' | 'upgrade_shown' | 'extra_video_purchase'
}) => {
  const config = PLAN_CONFIGS[event.plan]
  
  trackEvent(event.eventType, {
    // Dati utente
    user_id: event.userId,
    plan: event.plan,
    
    // Metriche di utilizzo
    videos_used: event.videosUsed,
    videos_limit: event.videosLimit,
    videos_remaining: event.videosLimit - event.videosUsed,
    usage_percentage: Math.round((event.videosUsed / event.videosLimit) * 100),
    
    // Dati piano
    plan_monthly_price: config.monthly_price,
    plan_annual_price: config.annual_price,
    extra_video_price: config.extra_price,
    websites_limit: config.websites,
    
    // Azione e contesto
    action: event.action,
    timestamp: Date.now(),
    
    // Metadata aggiuntiva
    ...event.metadata
  })
}

/**
 * Enforcement semplificato dei limiti con tracking automatico
 */
export const enforceVideoLimits = (limits: SubscriptionLimits): { 
  canCreate: boolean, 
  shouldShowUpgrade: boolean,
  recommendedPlan?: PlanType,
  trackingCompleted: boolean 
} => {
  const canCreate = limits.can_create_video
  const usagePercentage = (limits.videos_used / limits.videos_per_month) * 100
  
  // Traccia ogni tentativo di controllo limiti
  trackLimitEvent({
    eventType: canCreate ? 'limit_check' : 'limit_exceeded',
    userId: limits.userId,
    plan: limits.plan,
    videosUsed: limits.videos_used,
    videosLimit: limits.videos_per_month,
    action: 'check_limits',
    metadata: {
      usage_percentage: usagePercentage,
      extra_video_price: limits.extra_video_price,
      check_timestamp: new Date().toISOString()
    }
  })
  
  // Logica di raccomandazione upgrade
  let recommendedPlan: PlanType | undefined
  let shouldShowUpgrade = false
  
  if (!canCreate || usagePercentage >= 80) {
    shouldShowUpgrade = true
    
    // Raccomanda piano basato sull'utilizzo
    if (limits.plan === 'free') {
      recommendedPlan = 'starter'
    } else if (limits.plan === 'starter' && usagePercentage >= 90) {
      recommendedPlan = 'pro'
    } else if (limits.plan === 'pro' && usagePercentage >= 90) {
      recommendedPlan = 'business'
    }
    
    // Traccia raccomandazione upgrade
    if (recommendedPlan) {
      trackLimitEvent({
        eventType: 'upgrade_shown',
        userId: limits.userId,
        plan: limits.plan,
        videosUsed: limits.videos_used,
        videosLimit: limits.videos_per_month,
        action: 'upgrade_attempt',
        metadata: {
          recommended_plan: recommendedPlan,
          current_plan_price: PLAN_CONFIGS[limits.plan].monthly_price,
          recommended_plan_price: PLAN_CONFIGS[recommendedPlan].monthly_price,
          potential_savings: calculateSavings(limits.plan, recommendedPlan, limits.videos_used),
          trigger_reason: !canCreate ? 'limit_exceeded' : 'high_usage'
        }
      })
    }
  }
  
  return { 
    canCreate, 
    shouldShowUpgrade,
    recommendedPlan,
    trackingCompleted: true 
  }
}

/**
 * Traccia tentativi di bypass dei limiti
 */
export const trackBypassAttempt = (limits: SubscriptionLimits, attemptType: string) => {
  trackLimitEvent({
    eventType: 'limit_bypass_attempt',
    userId: limits.userId,
    plan: limits.plan,
    videosUsed: limits.videos_used,
    videosLimit: limits.videos_per_month,
    action: 'create_video',
    metadata: {
      bypass_attempt_type: attemptType,
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      attempt_timestamp: new Date().toISOString()
    }
  })
}

/**
 * Traccia acquisti di video extra
 */
export const trackExtraVideoPurchase = (
  limits: SubscriptionLimits, 
  purchaseAmount: number,
  paymentMethod: string = 'stripe'
) => {
  trackLimitEvent({
    eventType: 'extra_video_purchase',
    userId: limits.userId,
    plan: limits.plan,
    videosUsed: limits.videos_used,
    videosLimit: limits.videos_per_month,
    action: 'buy_extra',
    metadata: {
      purchase_amount: purchaseAmount,
      payment_method: paymentMethod,
      videos_before_purchase: limits.videos_used,
      videos_remaining_before: limits.videos_remaining,
      purchase_timestamp: new Date().toISOString()
    }
  })
}

/**
 * Traccia eventi specifici per ogni piano
 */
export const trackPlanSpecificEvent = (
  plan: PlanType, 
  eventType: string, 
  additionalData: Record<string, any> = {}
) => {
  const config = PLAN_CONFIGS[plan]
  
  trackEvent(`${plan}_plan_${eventType}`, {
    plan_name: plan,
    video_limit: config.videos,
    extra_video_price: config.extra_price,
    websites_limit: config.websites,
    monthly_price: config.monthly_price,
    annual_price: config.annual_price,
    ...additionalData
  })
}

/**
 * Calcola potenziali risparmi per upgrade
 */
function calculateSavings(currentPlan: PlanType, recommendedPlan: PlanType, videosUsed: number): number {
  const current = PLAN_CONFIGS[currentPlan]
  const recommended = PLAN_CONFIGS[recommendedPlan]
  
  // Calcola costo attuale (piano + video extra necessari)
  const videosOverLimit = Math.max(0, videosUsed - current.videos)
  const currentCost = current.monthly_price + (videosOverLimit * current.extra_price)
  
  // Costo piano raccomandato
  const recommendedCost = recommended.monthly_price
  
  return Math.max(0, currentCost - recommendedCost)
}

/**
 * Hook personalizzato per l'enforcement semplificato
 */
export const usePricingEnforcement = () => {
  return {
    enforceVideoLimits,
    trackLimitEvent,
    trackBypassAttempt,
    trackExtraVideoPurchase,
    trackPlanSpecificEvent,
    PLAN_CONFIGS
  }
}

export default {
  enforceVideoLimits,
  trackLimitEvent,
  trackBypassAttempt,
  trackExtraVideoPurchase,
  trackPlanSpecificEvent,
  usePricingEnforcement,
  PLAN_CONFIGS
} 