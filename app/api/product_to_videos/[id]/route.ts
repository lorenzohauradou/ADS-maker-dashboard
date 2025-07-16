import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET(
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

    console.log('📊 PRODUCT_TO_VIDEO STATUS: Checking status for task:', taskId)

    // 📡 Chiamata al backend per controllare lo stato del task
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/product_to_videos/${taskId}`,
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
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
      }
      
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Backend error:', errorData)
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const result = await response.json()
    
    console.log('✅ PRODUCT_TO_VIDEO STATUS: Task status retrieved:', {
      id: result.id,
      status: result.status,
      hasPhoto: !!result.generated_photo_url,
      hasVideo: !!result.generated_video_url
    })
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Product to video status error:', error)
    return NextResponse.json({ 
      error: 'Failed to check task status', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 