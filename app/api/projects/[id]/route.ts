import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fetchBackendJson, TIMEOUTS } from '@/lib/backend-fetch'

export async function PATCH(
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

    // 📋 Leggi payload della richiesta
    const body = await request.json()
    
    console.log('📝 PROJECT UPDATE: Updating project:', projectId, 'with data:', body)
    console.log('📝 PROJECT UPDATE: User ID:', session.user.id, 'Email:', session.user.email)
    console.log('📝 PROJECT UPDATE: Backend URL:', process.env.BACKEND_URL)

    // 📡 Chiamata al backend per aggiornare il progetto
    const backendUrl = `${process.env.BACKEND_URL}/api/projects/${projectId}`
    console.log('📝 PROJECT UPDATE: Full URL:', backendUrl)
    
    const response = await fetch(backendUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: JSON.stringify(body)
      }
    )
    
    console.log('📝 PROJECT UPDATE: Response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Backend error response:', errorText)
      
      let errorData: any = {}
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        console.error('❌ Failed to parse error response as JSON')
        errorData = { error: errorText }
      }
      
      console.error('❌ Backend error data:', errorData)
      throw new Error(errorData.error || errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json()
    
    console.log('✅ PROJECT UPDATE: Project updated successfully:', result)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Project update error:', error)
    return NextResponse.json({ 
      error: 'Failed to update project', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

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

    console.log('📖 PROJECT GET: Retrieving project:', projectId)

    // 📡 Chiamata al backend per recuperare il progetto
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/projects/${projectId}`,
      {
        method: 'GET',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        }
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
      
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Backend error:', errorData)
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const result = await response.json()
    
    console.log('✅ PROJECT GET: Project retrieved successfully')
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Project get error:', error)
    return NextResponse.json({ 
      error: 'Failed to retrieve project', 
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