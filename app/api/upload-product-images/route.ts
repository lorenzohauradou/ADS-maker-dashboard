import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 📋 Leggi FormData con immagini
    const formData = await request.formData()
    
    console.log('📸 UPLOAD_PRODUCT_IMAGES: FormData ricevuta')
    console.log('📸 UPLOAD_PRODUCT_IMAGES: User ID:', session.user.id)
    console.log('📸 UPLOAD_PRODUCT_IMAGES: User Email:', session.user.email)
    console.log('📸 UPLOAD_PRODUCT_IMAGES: Backend URL:', process.env.BACKEND_URL)

    // 📡 Proxy al backend per gestire upload immagini
    const backendUrl = `${process.env.BACKEND_URL}/api/creatify/upload-images`
    console.log('📸 UPLOAD_PRODUCT_IMAGES: Full backend URL:', backendUrl)
    
    const backendResponse = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: formData, // Passa FormData direttamente
      }
    )
    
    console.log('📸 UPLOAD_PRODUCT_IMAGES: Backend response status:', backendResponse.status, backendResponse.statusText)

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text()
      console.error('❌ Backend upload error response:', errorText)
      
      let errorData: any = {}
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        console.error('❌ Failed to parse backend error as JSON')
        errorData = { error: errorText }
      }
      
      console.error('❌ Backend upload error data:', errorData)
      throw new Error(errorData.detail || errorData.error || `HTTP ${backendResponse.status}: ${backendResponse.statusText}`)
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