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
        next_public_api_url: process.env.NEXT_PUBLIC_API_URL,
        vercel_env: process.env.VERCEL_ENV,
        vercel_url: process.env.VERCEL_URL,
        // 🔍 DEBUG URL CONFIGURATION
        computed_backend_url: process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'http://localhost:8000',
        upload_endpoint: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/creatify/upload-images`
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
        next_public_api_url_configured: !!process.env.NEXT_PUBLIC_API_URL,
        is_production: process.env.NODE_ENV === 'production',
        is_vercel: !!process.env.VERCEL_ENV,
        is_backend_localhost: (process.env.BACKEND_URL || '').includes('localhost'),
        is_backend_https: (process.env.BACKEND_URL || '').startsWith('https://')
      }
    }

    // 🧪 Test connettività backend
    const backendTests = {
      backend_health: await testEndpoint(`${process.env.BACKEND_URL}/api/health`, 'GET'),
      creatify_config: await testEndpoint(`${process.env.BACKEND_URL}/api/creatify/config-status`, 'GET', {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email || ''
      }),
      // 🧪 Test upload endpoint (POST only, so we test with OPTIONS)
      upload_images: await testEndpoint(`${process.env.BACKEND_URL}/api/creatify/upload-images`, 'OPTIONS'),
      backend_root: await testEndpoint(`${process.env.BACKEND_URL}/`, 'GET')
    }

    // 📊 Analisi problemi e raccomandazioni
    const recommendations = getRecommendations(diagnostics, backendTests)

    return NextResponse.json({
      success: true,
      diagnostics,
      backend_tests: backendTests,
      recommendations,
      debug_info: {
        total_tests: Object.keys(backendTests).length,
        reachable_endpoints: Object.values(backendTests).filter(t => t?.reachable).length,
        failed_endpoints: Object.values(backendTests).filter(t => !t?.reachable).length
      }
    })

  } catch (error) {
    console.error('Debug workflow error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      diagnostics_failed: true
    }, { status: 500 })
  }
}

async function testEndpoint(url: string, method: string = 'GET', headers: Record<string, string> = {}) {
  if (!url || url.includes('undefined') || url.includes('null')) {
    return {
      url,
      reachable: false,
      error: 'Invalid URL (contains undefined/null)',
      configured: false
    }
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

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
      reachable: true,
      status: response.status,
      ok: response.ok,
      configured: true,
      response_time: '< 5s'
    }
  } catch (error) {
    return {
      url,
      reachable: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      configured: true
    }
  }
}

function getRecommendations(diagnostics: any, backendTests: any) {
  const recommendations = []

  if (!diagnostics.checks.backend_url_configured) {
    recommendations.push({
      type: 'ERROR',
      priority: 'HIGH',
      message: 'BACKEND_URL environment variable not configured',
      solution: 'Set BACKEND_URL to your Python backend URL (e.g., https://your-backend.herokuapp.com)',
      action: 'Add BACKEND_URL to your Vercel environment variables'
    })
  }

  if (diagnostics.checks.is_production && diagnostics.checks.is_backend_localhost) {
    recommendations.push({
      type: 'ERROR',
      priority: 'HIGH',
      message: 'Production environment using localhost backend URL',
      solution: 'Replace localhost with your production backend URL',
      action: 'Update BACKEND_URL to use production domain'
    })
  }

  if (!diagnostics.checks.nextauth_url_configured) {
    recommendations.push({
      type: 'WARNING',
      priority: 'MEDIUM',
      message: 'NEXTAUTH_URL not configured, using default localhost',
      solution: 'Set NEXTAUTH_URL to your frontend domain in production'
    })
  }

  if (!backendTests.upload_images?.reachable) {
    recommendations.push({
      type: 'ERROR',
      priority: 'HIGH',
      message: 'Backend upload-images endpoint not reachable',
      solution: 'Check if Python backend is running and accessible',
      debug: `Tried to reach: ${backendTests.upload_images?.url}`,
      error: backendTests.upload_images?.error
    })
  }

  if (!backendTests.creatify_config?.reachable) {
    recommendations.push({
      type: 'ERROR',
      priority: 'HIGH',  
      message: 'Backend Creatify config endpoint not reachable',
      solution: 'Check backend Creatify configuration and API keys'
    })
  }

  if (diagnostics.checks.is_production && !diagnostics.checks.is_backend_https) {
    recommendations.push({
      type: 'WARNING',
      priority: 'MEDIUM',
      message: 'Production environment detected but backend URL is not HTTPS',
      solution: 'Use HTTPS backend URL in production for security'
    })
  }

  // 🔍 SPECIFIC UPLOAD DIAGNOSIS
  if (!backendTests.upload_images?.reachable && diagnostics.checks.backend_url_configured) {
    recommendations.push({
      type: 'ERROR',
      priority: 'CRITICAL',
      message: 'Upload images functionality will fail - backend not reachable',
      solution: 'This explains why "Failed to upload product images" error occurs',
      action: 'Fix backend connectivity first, then test upload again'
    })
  }

  return recommendations
} 