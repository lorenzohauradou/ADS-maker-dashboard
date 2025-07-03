import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fetchBackendJson, TIMEOUTS } from '@/lib/backend-fetch'

export async function GET(request: NextRequest) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 📡 Chiamata al backend per ottenere avatar personalizzati dell'utente
    const result = await fetchBackendJson('/api/creatify/users/me/custom-avatars', {
      method: 'GET',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email,
      },
      timeout: TIMEOUTS.NORMAL,
    })

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Custom avatars fetch error:', error)
    
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'Custom avatars fetch timeout', 
        details: 'Caricamento avatar personalizzati troppo lento'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch custom avatars', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 