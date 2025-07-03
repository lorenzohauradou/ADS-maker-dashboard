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
    
    console.log('🔗 LINK_TO_VIDEOS: Payload ricevuto:', wizardData)

    // 📡 Chiamata al backend Creatify service tramite /api/creatify/create-product-video
    // che gestisce automaticamente il routing a link_to_videos vs product_to_videos
    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/create-from-url`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: JSON.stringify({
          url_data: {
            link: wizardData.link,
            target_audience: wizardData.target_audience,
            script_style: wizardData.script_style || "BenefitsV2",
            visual_style: wizardData.visual_style || "AvatarBubbleTemplate"
          },
          flow_type: 'url_only'
        }),
      }
    )

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      console.error('❌ Backend error:', errorData)
      throw new Error(errorData.detail || errorData.error || `HTTP ${backendResponse.status}`)
    }

    const result = await backendResponse.json()
    
    console.log('✅ LINK_TO_VIDEOS: Successo:', result)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Link to videos error:', error)
    return NextResponse.json({ 
      error: 'Failed to create video from URL', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 