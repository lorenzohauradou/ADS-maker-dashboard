import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fetchBackendJson, TIMEOUTS } from '@/lib/backend-fetch'

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

    // Chiama il backend per ottenere i limiti avatar
    const data = await fetchBackendJson(
      `/api/subscriptions/check-avatar-limits/${userId}`,
      {
        method: 'GET',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email || '',
        },
        timeout: TIMEOUTS.QUICK,
      }
    )

    return NextResponse.json(data)

  } catch (error) {
    console.error('❌ Error checking avatar limits:', error)
    
    // Fallback graceful per utenti free
    return NextResponse.json({
      plan: 'free',
      avatars_available: 'basic',
      can_create_custom_avatars: false,
      dyoa_enabled: false,
      byoa_enabled: false,
      templates_available: 'basic',
      languages_supported: ['it', 'en'],
      avatar_library_size: '100+',
      can_use_dyoa: false,
      can_use_byoa: false,
      upgrade_required_for: {
        dyoa: true,
        byoa: true,
        full_avatar_library: true,
        advanced_templates: true
      },
      error: 'Errore temporaneo nel controllo limiti avatar',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 