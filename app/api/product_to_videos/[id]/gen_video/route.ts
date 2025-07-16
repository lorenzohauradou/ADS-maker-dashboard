import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const resolvedParams = await params
    const taskId = resolvedParams.id

    const body = await request.json()
    
    console.log('🎬 PRODUCT_TO_VIDEO GEN_VIDEO: Starting video generation for task:', taskId)
    console.log('🎬 Payload ricevuto:', body)

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/product_to_videos/${taskId}/gen_video/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: JSON.stringify({
          motion_style: body.motion_style || 'talking', // Backend will use saved config if available
          video_prompt: body.video_prompt || 'Professional product presentation with engaging narration',
          webhook_url: body.webhook_url || null,
          user_id: body.user_id,
          user_email: body.user_email
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Backend error:', errorData)
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const result = await response.json()
    
    console.log('PRODUCT_TO_VIDEO GEN_VIDEO: Video generation started successfully:', result)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Product to video gen_video error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate video', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 