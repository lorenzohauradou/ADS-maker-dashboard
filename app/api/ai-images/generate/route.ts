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

    // 🔍 RILEVA TIPO DI CONTENUTO: JSON (testo puro) o FormData (immagine + stile)
    const contentType = request.headers.get('content-type') || ''
    
    if (contentType.includes('multipart/form-data')) {
      // 📸 CASO: L'utente vuole "generare" un asset marketing dalla sua immagine
      // Tecnicamente è un "edit" OpenAI, ma dal punto di vista UX è la sua prima generazione
      
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
        // 🎯 IMPORTANTE: Usa l'endpoint /edit per immagini, anche se l'UX è "generate"
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
      
    } else {
      // 📝 CASO: JSON - può essere generazione pura da testo O immagine tramite URL
      const body = await request.json()

      // 🔍 Rileva se contiene image_url (studio workflow) vs solo prompt (generazione pura)
      if (body.image_url && (body.style || body.custom_prompt)) {
        // 📸 CASO: AI Image Studio con URL - usa endpoint edit del backend
        const result = await fetchBackendJson(`/api/ai-images/edit-from-url`, {
          method: 'POST',
          headers: {
            'x-user-id': session.user.id,
            'x-user-email': session.user.email,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          timeout: TIMEOUTS.PROCESSING, // 60s per generazione AI
        })

        return NextResponse.json(result)
      } else {
        // 📝 CASO: Generazione pura da testo (senza immagine)
        const result = await fetchBackendJson(`/api/ai-images/generate`, {
          method: 'POST',
          headers: {
            'x-user-id': session.user.id,
            'x-user-email': session.user.email,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          timeout: TIMEOUTS.PROCESSING, // 60s per generazione AI
        })

        return NextResponse.json(result)
      }
    }
    
  } catch (error) {
    console.error('❌ AI Image generation error:', error)
    
    // 🚨 Gestione timeout
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'AI generation timeout', 
        details: 'Generazione immagine troppo lenta'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to generate AI image', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 