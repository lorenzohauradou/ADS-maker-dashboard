import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const resolvedParams = await params
    const userId = resolvedParams.userId

    // Verifica che l'utente possa accedere solo ai propri dati
    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 })
    }

    // 📡 Chiamata al backend Python per ottenere i limiti
    const response = await fetch(
      `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/subscriptions/check-limits/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const limitsData = await response.json()
    return NextResponse.json(limitsData)
    
  } catch (error) {
    console.error('❌ Check limits error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch user limits', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 