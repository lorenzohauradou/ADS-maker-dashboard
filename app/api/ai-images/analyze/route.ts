import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { TIMEOUTS } from '@/lib/backend-fetch'

export async function POST(request: NextRequest) {
  try {
    // Verify NextAuth authentication
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Parse FormData
    const formData = await request.formData()
    const backendFormData = new FormData()

    // Copy all fields to backend FormData
    for (const [key, value] of formData.entries()) {
      backendFormData.append(key, value)
    }
    
    // 📡 Direct call for FormData (utility not compatible with file upload)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.PROCESSING) // 60s timeout for AI analysis
    
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/ai-images/analyze`, {
        method: 'POST',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: backendFormData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const result = await response.json()
      return NextResponse.json(result)
      
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
    
  } catch (error) {
    console.error('❌ AI Image analysis error:', error)
    
    // 🚨 Timeout handling
    if (error instanceof Error && error.message.includes('Timeout')) {
      return NextResponse.json({ 
        error: 'AI image analysis timeout', 
        details: 'Image analysis taking too long'
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to analyze image for prompts', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 