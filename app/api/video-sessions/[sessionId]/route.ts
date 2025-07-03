import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fetchBackendJson, TIMEOUTS } from '@/lib/backend-fetch'

interface RouteParams {
  sessionId: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    // Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { sessionId } = await params

    // 📡 Fetch sessione specifica dal backend
    const result = await fetchBackendJson(`/api/video-sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email || '',
      },
      timeout: TIMEOUTS.QUICK,
    })

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Video session fetch error:', error)
    
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'Session fetch timeout', 
        details: 'Caricamento sessione troppo lento'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch video session', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    // Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { sessionId } = await params
    const body = await request.json()

    // 📡 Aggiorna sessione nel backend
    const result = await fetchBackendJson(`/api/video-sessions/${sessionId}`, {
      method: 'PATCH',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email,
      },
      body: JSON.stringify(body),
      timeout: TIMEOUTS.NORMAL,
    })

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Video session update error:', error)
    
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'Session update timeout', 
        details: 'Aggiornamento sessione troppo lento'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to update video session', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    // Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { sessionId } = await params

    // 📡 Elimina sessione dal backend
    const result = await fetchBackendJson(`/api/video-sessions/${sessionId}`, {
      method: 'DELETE',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email || '',
      },
      timeout: TIMEOUTS.NORMAL,
    })

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Video session delete error:', error)
    
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'Session delete timeout', 
        details: 'Eliminazione sessione troppo lenta'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to delete video session', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 