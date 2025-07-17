import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { fetchBackendJson, TIMEOUTS } from '@/lib/backend-fetch'

export async function POST(request: NextRequest) {
  try {
    console.log('🏗️ PROJECTS: ====== CREATE PROJECT REQUEST START ======')
    
    // Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      console.log('❌ PROJECTS: Authentication failed')
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    
    console.log('🏗️ PROJECTS: User authenticated:', session.user.email)

    console.log('🏗️ PROJECTS: Reading FormData...')
    const formData = await request.formData()
    
    console.log('🏗️ PROJECTS: FormData keys:', Array.from(formData.keys()))
    console.log('🏗️ PROJECTS: FormData entries count:', Array.from(formData.entries()).length)
    
    const backendFormData = new FormData()

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`🏗️ PROJECTS: ${key} = File(${value.name}, ${value.size} bytes)`)
      } else {
        console.log(`🏗️ PROJECTS: ${key} = ${value}`)
      }
      backendFormData.append(key, value)
    }
    
    console.log('🏗️ PROJECTS: FormData processing complete')
    
    // 📡 Chiamata diretta per FormData (utility non compatibile)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15s timeout
    
    try {
    console.log('🏗️ PROJECTS: Making request to backend...')
    console.log('🏗️ PROJECTS: Backend URL:', `${process.env.BACKEND_URL}/api/projects/`)
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/projects/`, {
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