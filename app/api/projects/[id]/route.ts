import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fetchBackendJson, TIMEOUTS } from '@/lib/backend-fetch'

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

    // 📡 Chiamata al backend per recuperare progetto con immagini
    const result = await fetchBackendJson(
      `/api/projects/${projectId}`,
      {
        method: 'GET',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        timeout: TIMEOUTS.QUICK, // 15s per get
      }
    )

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Project fetch error:', error)
    
    // 🚨 Gestione specifica timeout
    if (error instanceof Error && error.message.includes('Timeout')) {
      console.warn('⏱️ Fetch timeout')
      return NextResponse.json({ 
        error: 'Backend timeout', 
        details: 'Recupero progetto timeout'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch project', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(
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

    // 📡 Chiamata al backend con utility ottimizzata
    const result = await fetchBackendJson(
      `/api/projects/${projectId}`,
      {
        method: 'DELETE',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        timeout: TIMEOUTS.NORMAL, // 8s per delete
      }
    )

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Project deletion error:', error)
    
    // 🚨 Gestione specifica timeout
    if (error instanceof Error && error.message.includes('Timeout')) {
      console.warn('⏱️ Delete timeout')
      return NextResponse.json({ 
        error: 'Backend timeout', 
        details: 'Eliminazione timeout - potrebbe essere completata in background'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to delete project', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 