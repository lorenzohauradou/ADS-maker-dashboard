import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 📋 Ottieni i dati della richiesta
    const body = await request.json()
    
    // Validazione basic
    if (!body.video_inputs || !Array.isArray(body.video_inputs) || body.video_inputs.length === 0) {
      return NextResponse.json({ 
        error: 'video_inputs è obbligatorio e deve essere un array non vuoto' 
      }, { status: 400 })
    }

    // Validazione struttura video_inputs
    for (const input of body.video_inputs) {
      if (!input.character || !input.voice) {
        return NextResponse.json({ 
          error: 'Ogni video_input deve avere character e voice' 
        }, { status: 400 })
      }
    }

    // 📡 Chiamata al backend per creare video multi-scena
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/avatar-v2/create-multiscene`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: JSON.stringify(body)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Multi-scene video creation error:', error)
    return NextResponse.json({ 
      error: 'Failed to create multi-scene video', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 