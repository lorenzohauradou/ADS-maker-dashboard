import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 🔍 Diagnostica completa dell'ambiente
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: {
        node_env: process.env.NODE_ENV,
        nextauth_url: process.env.NEXTAUTH_URL,
        backend_url: process.env.BACKEND_URL,
        next_public_backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
        vercel_env: process.env.VERCEL_ENV,
        vercel_url: process.env.VERCEL_URL
      },
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name
      },
      endpoints: {
        upload_images: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/creatify/upload-images`,
        link_to_videos: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/creatify/link_to_videos`,
        project_creation: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects/create-for-wizard`
      },
      checks: {
        backend_url_configured: !!process.env.BACKEND_URL,
        nextauth_url_configured: !!process.env.NEXTAUTH_URL,
        is_production: process.env.NODE_ENV === 'production',
        is_vercel: !!process.env.VERCEL_ENV
      }
    }

    // 🧪 Test connettività backend
    const backendTests = {
      upload_images: await testEndpoint(`${process.env.BACKEND_URL}/api/creatify/upload-images`, 'GET'),
      creatify_config: await testEndpoint(`${process.env.BACKEND_URL}/api/creatify/config-status`, 'GET', {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email || ''
      })
    }

    return NextResponse.json({
      success: true,
      diagnostics,
      backend_tests: backendTests,
      recommendations: getRecommendations(diagnostics, backendTests)
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

async function testEndpoint(url: string, method: string = 'GET', headers: Record<string, string> = {}) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    return {
      url,
      method,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      reachable: true,
      response_time_ms: Date.now() - Date.now() // Approssimativo
    }

  } catch (error) {
    return {
      url,
      method,
      reachable: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

function getRecommendations(diagnostics: any, backendTests: any) {
  const recommendations = []

  if (!diagnostics.checks.backend_url_configured) {
    recommendations.push({
      type: 'ERROR',
      message: 'BACKEND_URL environment variable not configured',
      solution: 'Set BACKEND_URL to your Python backend URL'
    })
  }

  if (!diagnostics.checks.nextauth_url_configured) {
    recommendations.push({
      type: 'WARNING',
      message: 'NEXTAUTH_URL not configured, using default localhost',
      solution: 'Set NEXTAUTH_URL to your frontend domain in production'
    })
  }

  if (!backendTests.upload_images?.reachable) {
    recommendations.push({
      type: 'ERROR',
      message: 'Backend upload-images endpoint not reachable',
      solution: 'Check if Python backend is running and accessible'
    })
  }

  if (!backendTests.creatify_config?.reachable) {
    recommendations.push({
      type: 'ERROR',
      message: 'Backend Creatify config endpoint not reachable',
      solution: 'Check backend Creatify configuration and API keys'
    })
  }

  if (diagnostics.checks.is_production && !diagnostics.environment.backend_url?.startsWith('https://')) {
    recommendations.push({
      type: 'WARNING',
      message: 'Production environment detected but backend URL is not HTTPS',
      solution: 'Use HTTPS backend URL in production'
    })
  }

  return recommendations
} 