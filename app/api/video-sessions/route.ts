import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fetchBackendJson, TIMEOUTS } from '@/lib/backend-fetch'

export async function POST(request: NextRequest) {
  try {
    // Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await request.json()

    // 📡 Proxy al backend Python
    const result = await fetchBackendJson('/api/video-sessions/', {
      method: 'POST',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email,
      },
      body: JSON.stringify(body),
      timeout: TIMEOUTS.NORMAL,
    })

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Video session creation error:', error)
    
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'Session creation timeout', 
        details: 'Inizializzazione sessione troppo lenta'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to create video session', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 📡 Fetch sessioni utente dal backend
    const result = await fetchBackendJson('/api/video-sessions/', {
      method: 'GET',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email || '',
      },
      timeout: TIMEOUTS.QUICK,
    })

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Video sessions fetch error:', error)
    
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'Sessions fetch timeout', 
        details: 'Caricamento sessioni troppo lento'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch video sessions', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 