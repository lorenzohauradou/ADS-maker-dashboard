import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await request.json()
    
    console.log('📸 PRODUCT_TO_VIDEOS GEN_IMAGE: Payload ricevuto:', body)

    if (!body.product_url) {
      return NextResponse.json({ error: 'product_url is required' }, { status: 400 })
    }

    // MAPPING between frontend choices and Creatify API
    let creatifyType: string
    let motionStyle: string | null = null

    switch (body.type) {
      case 'product_shot':
        creatifyType = 'product_anyshot'
        motionStyle = null // Not relevant for product_anyshot
        break
      case 'avatar_showcase':
        creatifyType = 'product_avatar'
        motionStyle = 'display'
        break
      case 'product_avatar':
      default:
        creatifyType = 'product_avatar'
        motionStyle = 'talking'
        break
    }

    console.log(' Mapped video type:', {
      frontend_choice: body.type,
      creatify_type: creatifyType,
      motion_style: motionStyle
    })

    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/product_to_videos/gen_image/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: JSON.stringify({
          product_url: body.product_url,
          type: creatifyType,
          aspect_ratio: body.aspect_ratio || "9x16",
          image_prompt: body.image_prompt || "Professional product showcase with clean background",
          override_avatar: body.override_avatar || null,
          product_showcase_url: body.product_showcase_url || null,
          webhook_url: body.webhook_url || null,
          motion_style: motionStyle, // ✅ Pass motion_style for step 2
          project_id: body.project_id,
          user_id: body.user_id,
          user_email: body.user_email
        }),
      }
    )

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      console.error('❌ Backend error:', errorData)
      throw new Error(errorData.detail || errorData.error || `HTTP ${backendResponse.status}`)
    }

    const result = await backendResponse.json()
    
    console.log('✅ PRODUCT_TO_VIDEOS GEN_IMAGE: Scene preview generated successfully:', {
      id: result.id,
      status: result.status,
      hasPhoto: !!result.generated_photo_url
    })
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Product to videos gen_image error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate scene preview', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 