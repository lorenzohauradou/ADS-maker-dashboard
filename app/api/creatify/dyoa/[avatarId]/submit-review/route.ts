import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ avatarId: string }> }
) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { avatarId } = await params
    const body = await request.json()
    const { chosen_photo_id, accent_id, hold_prod = false } = body

    if (!chosen_photo_id) {
      return NextResponse.json({ error: 'chosen_photo_id is required' }, { status: 400 })
    }

    // 📡 Chiamata al backend per submittare per review
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/dyoa/${avatarId}/submit-review`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: JSON.stringify({
          chosen_photo_id,
          accent_id,
          hold_prod
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ DYOA submit review error:', error)
    return NextResponse.json({ 
      error: 'Failed to submit avatar for review', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 