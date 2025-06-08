import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const formData = await request.formData()

    // 🔗 Chiamata al backend con headers NextAuth
    const response = await fetch(`${process.env.BACKEND_URL}/api/projects/`, {
      method: 'POST',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email,
        // Non passare formData con JSON headers - rimuovo Content-Type per formData
      },
      body: formData
    })
    
    const result = await response.json()
    return NextResponse.json(result, { status: response.status })
    
  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json({ error: 'Project creation failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 🔗 Ottieni progetti utente dal backend
    const response = await fetch(`${process.env.BACKEND_URL}/api/projects/recent`, {
      method: 'GET',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }
    
    const result = await response.json()
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Projects fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}