import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const resolvedParams = await params
    const projectId = resolvedParams.id

    // 📡 Chiamata al backend per ottenere progresso
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/projects/${projectId}/progress`,
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

    const progressData = await response.json()
    return NextResponse.json(progressData)
    
  } catch (error) {
    console.error('❌ Progress fetch error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch progress', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 