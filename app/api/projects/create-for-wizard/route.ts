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

    // 📝 Parse JSON body (non FormData)
    const body = await request.json()
    
    // 🎯 Chiamata al backend per creare progetto senza immagini
    const result = await fetchBackendJson(`/api/projects/create-empty`, {
      method: 'POST',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: body.name || `Nuovo Video Ad - ${new Date().toLocaleDateString()}`,
        description: body.description || 'Progetto creato dal Wizard Unificato',
        platform: body.platform || 'instagram',
        target_audience: body.target_audience || 'giovani adulti'
      }),
      timeout: TIMEOUTS.QUICK,
    })

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Wizard project creation error:', error)
    
    return NextResponse.json({ 
      error: 'Failed to create project for wizard', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 