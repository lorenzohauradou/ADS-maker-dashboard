import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fetchBackend, fetchBackendJson, TIMEOUTS } from '@/lib/backend-fetch'

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 POST /api/projects - START')
    
    // Verifica autenticazione NextAuth
    const session = await auth()
    
    console.log('🔍 Session:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      hasId: !!session?.user?.id,
      hasEmail: !!session?.user?.email,
      userId: session?.user?.id,
      userEmail: session?.user?.email
    })
    
    if (!session?.user?.id || !session?.user?.email) {
      console.log('❌ Authentication failed - missing session data')
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    console.log('🔍 Parsing FormData...')
    const formData = await request.formData()
    const backendFormData = new FormData()

    console.log('🔍 FormData entries:', Array.from(formData.entries()).map(([key, value]) => [key, value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value]))
    
    // Calcola dimensione totale
    let totalSize = 0
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        totalSize += value.size
      }
    }
    console.log('🔍 Total upload size:', `${totalSize} bytes (${(totalSize / 1024 / 1024).toFixed(2)} MB)`)
    
    // Verifica limite Vercel (50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (totalSize > maxSize) {
      console.error('❌ Files too large for Vercel:', `${totalSize} > ${maxSize}`)
      return NextResponse.json({ 
        error: 'Files too large', 
        details: `Total size ${(totalSize / 1024 / 1024).toFixed(2)}MB exceeds 50MB limit`
      }, { status: 413 })
    }

    for (const [key, value] of formData.entries()) {
      backendFormData.append(key, value)
    }
    
    console.log('🔍 Backend URL:', process.env.BACKEND_URL)
    console.log('🔍 Headers to send:', {
      'x-user-id': session.user.id,
      'x-user-email': session.user.email
    })
    
    // 📡 Chiamata diretta per FormData (utility non compatibile)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15s timeout
    
    try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email,
        // NON impostare Content-Type per FormData - il browser lo fa automaticamente con boundary
      },
      body: backendFormData,
        signal: controller.signal,
    })

      clearTimeout(timeoutId)

    console.log('🔍 Backend response status:', response.status)
    console.log('🔍 Backend response ok:', response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.log('❌ Backend error response:', errorText)
      
      let errorData: { error?: string } = {}
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        errorData = { error: errorText }
      }
      
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const result = await response.json()
    console.log('✅ Backend success response:', result)
    return NextResponse.json(result)
    } catch (error) {
      clearTimeout(timeoutId)
      console.log('❌ Fetch error:', error)
      throw error
    }
    
  } catch (error) {
    console.error('❌ Project creation error:', error)
    
    // 🚨 Gestione timeout per upload
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'Upload timeout', 
        details: 'Upload delle immagini troppo lento'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to create project', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 📡 Usa utility per fetch progetti
    const result = await fetchBackendJson(`/api/projects/recent`, {
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email || '',
      },
      timeout: TIMEOUTS.QUICK,
    })

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Projects fetch error:', error)
    
    // 🚨 Gestione timeout per fetch
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'Fetch timeout', 
        details: 'Caricamento progetti troppo lento'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch projects', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}