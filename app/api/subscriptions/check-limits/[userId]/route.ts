import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    
    // Verifica autenticazione
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    // Verifica che l'utente possa accedere solo ai propri limiti
    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Accesso negato' }, { status: 403 })
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/subscriptions/check-limits/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': session.user.id,
        'x-user-email': session.user.email || '',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend error:', response.status, errorText)
      
      // Fallback per utenti free se il backend non risponde
      if (response.status >= 500) {
        return NextResponse.json({
          plan: 'free',
          videos_per_month: 1,
          videos_used: 0,
          videos_remaining: 1,
          can_create_video: true,
          extra_video_price: 9.0,
          warning: 'Backend temporaneamente non disponibile'
        })
      }
      
      return NextResponse.json(
        { error: 'Errore nel controllo dei limiti' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error checking limits:', error)
    
    // Fallback graceful per evitare blocchi totali
    return NextResponse.json({
      plan: 'free',
      videos_per_month: 1,
      videos_used: 0,
      videos_remaining: 1,
      can_create_video: true,
      extra_video_price: 9.0,
      error: 'Errore temporaneo nel controllo limiti',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 