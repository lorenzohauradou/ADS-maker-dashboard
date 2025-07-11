"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface UserLimits {
  plan: string
  videos_per_month: number
  videos_used: number
  videos_remaining: number
  can_create_video: boolean
  extra_video_price: number
  subscription_status?: string
  loading: boolean
  error?: string
}

// 🔄 Sistema di eventi globale per sincronizzare hook
const limitsEventBus = {
  listeners: new Set<() => void>(),
  
  emit() {
    this.listeners.forEach(listener => listener())
  },
  
  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }
}

// 🚀 Esporta per uso da altri hook
export const refreshAllLimitsHooks = () => {
  console.log('🔄 GLOBAL REFRESH: Sincronizzando tutti gli hook limiti...')
  limitsEventBus.emit()
}

export function useUserLimits() {
  const { data: session } = useSession()
  const [limits, setLimits] = useState<UserLimits>({
    plan: 'free',
    videos_per_month: 1,
    videos_used: 0,
    videos_remaining: 1,
    can_create_video: true,
    extra_video_price: 9.0,
    loading: true
  })

  const fetchLimits = async () => {
    if (!session?.user?.id) {
      setLimits(prev => ({ ...prev, loading: false }))
      return
    }

    try {
      console.log('🔄 USER-LIMITS: Fetching limits for user:', session.user.id)
      
      const response = await fetch(`/api/subscriptions/check-limits/${session.user.id}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch user limits')
      }

      const data = await response.json()
      
      console.log('✅ USER-LIMITS: Limits updated:', {
        plan: data.plan,
        videos_used: data.videos_used,
        videos_remaining: data.videos_remaining,
        can_create_video: data.can_create_video
      })
      
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

    } catch (error) {
      console.error('❌ USER-LIMITS: Error fetching user limits:', error)
      setLimits(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load user limits'
      }))
    }
  }

  // Funzione per comprare video extra
  const buyExtraVideo = async () => {
    if (!session?.user?.id) return false

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
        console.error('Error buying extra video:', data.error)
        return false
      }
    } catch (error) {
      console.error('Error:', error)
      return false
    }
  }

  // Aggiorna i limiti quando l'utente cambia
  useEffect(() => {
    fetchLimits()
  }, [session?.user?.id])

  // 🔄 SINCRONIZZAZIONE GLOBALE: Ascolta refresh da altri hook
  useEffect(() => {
    const unsubscribe = limitsEventBus.subscribe(() => {
      console.log('🔄 USER-LIMITS: Ricevuto evento di refresh globale')
      fetchLimits()
    })
    
    return unsubscribe
  }, [session?.user?.id])

  // Ricarica i limiti manualmente
  const refreshLimits = () => {
    console.log('🔄 USER-LIMITS: Manual refresh triggered')
    setLimits(prev => ({ ...prev, loading: true }))
    fetchLimits()
    
    // 🚀 NOTIFICA ALTRI HOOK
    setTimeout(() => {
      console.log('🔄 USER-LIMITS: Notifying other hooks of refresh...')
      limitsEventBus.emit()
    }, 500) // Delay per evitare loop
  }

  return {
    ...limits,
    buyExtraVideo,
    refreshLimits
  }
} 