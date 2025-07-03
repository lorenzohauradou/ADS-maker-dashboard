import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 📋 Ottieni i dati del form multipart
    const formData = await request.formData()
    
    // Validazione files richiesti
    const lipsyncVideo = formData.get('lipsync_video') as File
    const consentVideo = formData.get('consent_video') as File
    const creatorName = formData.get('creator_name') as string
    const gender = formData.get('gender') as string
    const videoScene = formData.get('video_scene') as string || 'office'

    if (!lipsyncVideo || !consentVideo || !creatorName || !gender) {
      return NextResponse.json({ 
        error: 'lipsync_video, consent_video, creator_name and gender are required' 
      }, { status: 400 })
    }

    // 🔄 Prepara FormData per il backend
    const backendFormData = new FormData()
    backendFormData.append('lipsync_video', lipsyncVideo)
    backendFormData.append('consent_video', consentVideo)
    backendFormData.append('creator_name', creatorName)
    backendFormData.append('gender', gender)
    backendFormData.append('video_scene', videoScene)

    // 📡 Chiamata al backend per upload BYOA
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/byoa/upload`,
      {
        method: 'POST',
        headers: {
          'x-user-id': session.user.id,
          'x-user-email': session.user.email,
        },
        body: backendFormData
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ BYOA upload error:', error)
    return NextResponse.json({ 
      error: 'Failed to upload avatar videos', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 