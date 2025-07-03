import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ personaId: string }> }
) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { personaId } = await params

    // 📡 Chiamata al backend per controllare status persona
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/byoa/${personaId}/status`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ BYOA status check error:', error)
    return NextResponse.json({ 
      error: 'Failed to check persona status', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 