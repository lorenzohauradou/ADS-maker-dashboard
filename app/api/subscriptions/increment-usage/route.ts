import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fetchBackendJson, TIMEOUTS } from '@/lib/backend-fetch'

export async function POST(request: NextRequest) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 📡 Chiamata al backend con utility ottimizzata
    const result = await fetchBackendJson(
      `/api/subscriptions/increment-usage/${session.user.id}`,
      {
        method: 'POST',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        timeout: TIMEOUTS.NORMAL, // 8s per increment-usage
      }
    )

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Increment usage error:', error)
    
    // 🚨 Gestione specifica timeout (ora dalla utility)
    if (error instanceof Error && error.message.includes('Timeout')) {
      console.warn('⏱️ Increment-usage timeout')
      return NextResponse.json({ 
        error: 'Backend timeout', 
        details: 'La richiesta al backend ha superato i tempi limite',
        warning: 'Il conteggio potrebbe essere stato aggiornato comunque'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to increment usage', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 