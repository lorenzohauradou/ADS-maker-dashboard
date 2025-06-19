import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fetchBackendJson, TIMEOUTS } from '@/lib/backend-fetch'

// 🚀 CACHE SEMPLICE PER LIMITI (30 secondi)
const limitsCache = new Map<string, { data: any, timestamp: number }>()
const CACHE_DURATION = 30000 // 30 secondi

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    
    // Verifica autenticazione
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    // Verifica che l'utente possa accedere solo ai propri limiti
    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Accesso negato' }, { status: 403 })
    }

    // 🚀 CONTROLLA CACHE PRIMA
    const cacheKey = `limits_${userId}`
    const cached = limitsCache.get(cacheKey)
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      console.log(`🚀 Cache hit per ${userId}`)
      return NextResponse.json({
        ...cached.data,
        cached: true,
        cache_age: Math.round((Date.now() - cached.timestamp) / 1000)
      })
    }

    // ⚡ Usa timeout ottimizzato dalla configurazione centrale
    const data = await fetchBackendJson(
      `/api/subscriptions/check-limits/${userId}`,
      {
        method: 'GET',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email || '',
        },
        timeout: TIMEOUTS.QUICK,
      }
    )

    // 🚀 SALVA IN CACHE
    limitsCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    })

    // Pulizia cache ogni 100 richieste
    if (limitsCache.size > 100) {
      const now = Date.now()
      for (const [key, value] of limitsCache.entries()) {
        if (now - value.timestamp > CACHE_DURATION * 2) {
          limitsCache.delete(key)
        }
      }
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('❌ Error checking limits:', error)
    
    // 🚨 Gestione specifica timeout 
    if (error instanceof Error && error.message.includes('Timeout')) {
      console.warn('⏱️ Check-limits timeout - usando fallback')
      return NextResponse.json({
        plan: 'free',
        videos_per_month: 1,
        videos_used: 0,
        videos_remaining: 1,
        can_create_video: true,
        extra_video_price: 9.0,
        warning: 'Timeout nel controllo limiti - valori predefiniti'
      }, { status: 408 })
    }
    
    // Fallback graceful per altri errori
    return NextResponse.json({
      plan: 'free',
      videos_per_month: 1,
      videos_used: 0,
      videos_remaining: 1,
      can_create_video: true,
      extra_video_price: 9.0,
      error: 'Errore temporaneo nel controllo limiti',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 