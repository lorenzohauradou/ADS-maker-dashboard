import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the authenticated session
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const projectId = params.id
    const body = await request.json()

    // Validate request body
    const {
      template_style = 'modern',
      ai_style = 'professional',
      color_scheme = 'auto',
      custom_cta
    } = body

    console.log(`🌐 Frontend API: Generating website for project ${projectId}`)
    console.log(`🌐 Template: ${template_style}, AI Style: ${ai_style}`)

    // Call the backend endpoint
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/api/projects/${projectId}/generate-website`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.email}`, // Pass user info for auth
      },
      body: JSON.stringify({
        template_style,
        ai_style,
        color_scheme,
        custom_cta
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error(`❌ Backend error: ${data.detail || 'Unknown error'}`)
      return NextResponse.json(
        { error: data.detail || 'Failed to generate website' },
        { status: response.status }
      )
    }

    console.log(`✅ Website generated successfully: ${data.site_url}`)

    return NextResponse.json({
      success: true,
      message: data.message,
      site_url: data.site_url,
      project_id: data.project_id,
      template_style: data.template_style,
      ai_style: data.ai_style,
      action: data.action
    })

  } catch (error) {
    console.error('❌ Frontend API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 