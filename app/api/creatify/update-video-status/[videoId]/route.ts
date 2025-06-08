import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const videoId = params.videoId

    // 📡 Chiamata al backend per aggiornare video status
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/update-video-status/${videoId}`,
      {
        method: 'POST',
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

    const result = await response.json()
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Video status update error:', error)
    return NextResponse.json({ 
      error: 'Failed to update video status', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 