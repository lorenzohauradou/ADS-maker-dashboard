import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { userId } = await params

    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Accesso negato' }, { status: 403 })
    }

    // 📋 Leggi FormData con immagini
    const formData = await request.formData()
    
    console.log('📸 UPLOAD_PRODUCT_IMAGES: FormData ricevuta')

    // 📡 Proxy al backend per gestire upload immagini
    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/upload-images`,
      {
        method: 'POST',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: formData, // Passa FormData direttamente
      }
    )

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      console.error('❌ Backend upload error:', errorData)
      throw new Error(errorData.detail || errorData.error || `HTTP ${backendResponse.status}`)
    }

    const result = await backendResponse.json()
    
    console.log('✅ UPLOAD_PRODUCT_IMAGES: Successo:', result)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Upload product images error:', error)
    return NextResponse.json({ 
      error: 'Failed to upload product images', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 