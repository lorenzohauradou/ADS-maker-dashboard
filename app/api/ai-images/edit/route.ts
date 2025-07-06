import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { TIMEOUTS } from '@/lib/backend-fetch'

export async function POST(request: NextRequest) {
  try {
    // Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Parse del FormData
    const formData = await request.formData()
    const backendFormData = new FormData()

    // Copia tutti i campi al FormData del backend
    for (const [key, value] of formData.entries()) {
      backendFormData.append(key, value)
    }
    
    // 📡 Chiamata diretta per FormData (utility non compatibile con file upload)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.PROCESSING) // 60s timeout
    
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/ai-images/edit`, {
        method: 'POST',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: backendFormData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const result = await response.json()
      return NextResponse.json(result)
      
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
    
  } catch (error) {
    console.error('❌ AI Image edit error:', error)
    
    // 🚨 Gestione timeout
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'AI edit timeout', 
        details: 'Modifica immagine troppo lenta'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to edit AI image', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 