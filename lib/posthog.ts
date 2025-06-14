import posthog from 'posthog-js'

// Verifica se PostHog è inizializzato
export const isPostHogInitialized = () => {
  return typeof window !== 'undefined' && posthog.__loaded
}

// Funzione per inviare eventi personalizzati
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (isPostHogInitialized()) {
    posthog.capture(eventName, properties)
  }
}

// Funzione per identificare un utente
export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
  if (isPostHogInitialized()) {
    posthog.identify(userId, userProperties)
  }
}

// Funzione per resettare l'utente (logout)
export const resetUser = () => {
  if (isPostHogInitialized()) {
    posthog.reset()
  }
}

// Esempi di eventi specifici per la tua app
export const trackADCreation = (adType: string, adId: string) => {
  trackEvent('ad_created', {
    ad_type: adType,
    ad_id: adId,
    timestamp: new Date().toISOString()
  })
}

export const trackUserSignup = (method: string) => {
  trackEvent('user_signup', {
    signup_method: method,
    timestamp: new Date().toISOString()
  })
}

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', {
    page_name: pageName,
    timestamp: new Date().toISOString()
  })
} 