import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const resolvedParams = await params
    const projectId = resolvedParams.projectId
    const body = await request.json()

    // 📡 Chiamata al backend per avviare il workflow asincrono
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/start-video-workflow/${projectId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: JSON.stringify(body),
        // ⚡ TIMEOUT AUMENTATO per startup lento del backend
        signal: AbortSignal.timeout(300000) // 5 minuti timeout per inizializzazione molto lenta
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Async workflow creation error:', error)
    return NextResponse.json({ 
      error: 'Failed to start async workflow', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 