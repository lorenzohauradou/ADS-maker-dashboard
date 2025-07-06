import { NextRequest } from 'next/server'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    // Verifica autenticazione
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return new Response('Authentication required', { status: 401 })
    }

    const body = await request.json()
    const encoder = new TextEncoder()
    
    const stream = new ReadableStream({
      async start(controller) {
        // Funzione helper per inviare eventi SSE
        const sendEvent = (data: any) => {
          const message = `data: ${JSON.stringify(data)}\n\n`
          controller.enqueue(encoder.encode(message))
        }

        try {
          // 🚀 FASE 1: Inizializzazione
          sendEvent({
            type: 'progress',
            progress: 5,
            message: '🤖 Inizializzazione AI...',
            stage: 'initializing'
          })

          await new Promise(resolve => setTimeout(resolve, 500))

          // 🔍 FASE 2: Analisi immagine
          sendEvent({
            type: 'progress',
            progress: 15,
            message: '🔍 Analisi immagine originale...',
            stage: 'analyzing'
          })

          await new Promise(resolve => setTimeout(resolve, 800))

          // 🎨 FASE 3: Preparazione prompt
          sendEvent({
            type: 'progress',
            progress: 25,
            message: '📝 Preparazione istruzioni AI...',
            stage: 'preparing'
          })

          await new Promise(resolve => setTimeout(resolve, 600))

          // 🎯 FASE 4: Inizio generazione
          sendEvent({
            type: 'progress',
            progress: 35,
            message: '🎯 Inizio trasformazione AI...',
            stage: 'generating'
          })

          await new Promise(resolve => setTimeout(resolve, 1000))

          // 🔄 FASE 5: Generazione in corso (con simulazione partial images)
          const generationSteps = [
            { progress: 45, message: '🎨 Elaborazione dettagli...', stage: 'processing' },
            { progress: 60, message: '✨ Applicazione stile...', stage: 'styling' },
            { progress: 75, message: '🔧 Ottimizzazione qualità...', stage: 'optimizing' },
            { progress: 90, message: '🎯 Finalizzazione...', stage: 'finalizing' }
          ]

          for (const step of generationSteps) {
            sendEvent({
              type: 'progress',
              ...step
            })
            await new Promise(resolve => setTimeout(resolve, 1500))
          }

          // 🚀 CHIAMATA REALE ALL'API BACKEND
          console.log('🎨 Starting real AI generation...')
          
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'x-user-id': session.user!.id!,
            'x-user-email': session.user!.email!,
          }

          const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/ai-images/edit-from-url`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
          })

          if (!backendResponse.ok) {
            const errorData = await backendResponse.json().catch(() => ({}))
            throw new Error(errorData.detail || `HTTP ${backendResponse.status}`)
          }

          const result = await backendResponse.json()

          // ✅ FASE 6: Completamento
          sendEvent({
            type: 'complete',
            progress: 100,
            message: '✅ Trasformazione completata!',
            stage: 'complete',
            result: result
          })

          console.log('✅ AI generation completed successfully')

        } catch (error) {
          console.error('❌ Streaming generation error:', error)
          
          sendEvent({
            type: 'error',
            progress: 0,
            message: `❌ Errore: ${error instanceof Error ? error.message : 'Unknown error'}`,
            stage: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          })
        } finally {
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })

  } catch (error) {
    console.error('❌ Stream endpoint error:', error)
    return new Response('Internal server error', { status: 500 })
  }
} 