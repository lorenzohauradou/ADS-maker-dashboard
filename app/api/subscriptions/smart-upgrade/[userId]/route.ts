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
      return NextResponse.json({ 
        success: false, 
        error: 'Non autorizzato',
        redirect_url: '/#pricing' 
      }, { status: 401 })
    }

    // Verifica che l'utente possa accedere solo al proprio upgrade
    if (session.user.id !== userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Accesso negato',
        redirect_url: '/#pricing' 
      }, { status: 403 })
    }

    // Chiama il backend Python
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/api/subscriptions/smart-upgrade/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend error:', response.status, errorText)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Errore nel processo di upgrade',
          redirect_url: '/#pricing' 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Smart upgrade API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Errore interno del server',
        redirect_url: '/#pricing' // Fallback
      },
      { status: 500 }
    )
  }
} 