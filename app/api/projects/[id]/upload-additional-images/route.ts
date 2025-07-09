import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get the authenticated session
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { id } = await params
    const projectId = id
    const formData = await request.formData()

    console.log(`📸 Frontend API: Uploading additional images for project ${projectId}`)

    // Call the backend endpoint
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/api/projects/${projectId}/upload-additional-images`, {
      method: 'POST',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email,
      },
      body: formData // Forward the FormData directly
    })

    const data = await response.json()

    if (!response.ok) {
      console.error(`❌ Backend error: ${data.detail || 'Unknown error'}`)
      return NextResponse.json(
        { error: data.detail || 'Failed to upload images' },
        { status: response.status }
      )
    }

    console.log(`✅ Images uploaded successfully: ${data.images_uploaded} images`)

    return NextResponse.json({
      success: true,
      message: data.message,
      project_id: data.project_id,
      images_uploaded: data.images_uploaded,
      total_images: data.total_images,
      uploaded_images: data.uploaded_images
    })

  } catch (error) {
    console.error('❌ Frontend API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 