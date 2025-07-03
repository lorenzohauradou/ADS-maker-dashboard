import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 📋 Leggi payload dal wizard
    const wizardData = await request.json()
    
    console.log('📸 PRODUCT_TO_VIDEOS: Payload ricevuto:', wizardData)

    // 📡 Chiamata al backend Creatify service tramite endpoint dedicato
    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/create-from-images`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: JSON.stringify({
          existing_project_id: wizardData.existing_project_id,  // 🎯 Passa ID progetto esistente
          image_data: {
            product_showcase_url: wizardData.product_showcase_url,
            type: wizardData.type || "product_avatar",
            aspect_ratio: wizardData.aspect_ratio || "9x16",
            image_prompt: wizardData.image_prompt || "Professional product showcase",
            override_avatar: wizardData.override_avatar
          },
          flow_type: 'images_only'
        }),
      }
    )

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      console.error('❌ Backend error:', errorData)
      throw new Error(errorData.detail || errorData.error || `HTTP ${backendResponse.status}`)
    }

    const result = await backendResponse.json()
    
    console.log('✅ PRODUCT_TO_VIDEOS: Successo:', result)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Product to videos error:', error)
    return NextResponse.json({ 
      error: 'Failed to create video from images', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 