import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, configuration } = body
    
    // Mappa parametri dal frontend al backend
    const backendParams = {
      target_platform: configuration.platform,
      target_audience: configuration.audience, 
      language: configuration.language,
      video_length: configuration.duration,
      script_style: configuration.scriptStyle,
      visual_style: configuration.visualStyle,
      landing_style: configuration.landingStyle,
      color_scheme: configuration.colorScheme,
      cta_text: configuration.ctaText,
      buy_custom_domain: configuration.buyCustomDomain,
      // Audio settings
      background_music_volume: configuration.audioSettings?.musicVolume || 50,
      voiceover_volume: configuration.audioSettings?.voiceVolume || 80,
      no_background_music: configuration.audioSettings?.noMusic || false,
      // Caption settings
      caption_style: configuration.captionSettings?.style || "normal-black",
      caption_font_family: configuration.captionSettings?.fontFamily || "Montserrat",
      caption_font_size: configuration.captionSettings?.fontSize || 24,
      // Premium features
      avatar_id: configuration.avatarId,
      voice_id: configuration.voiceId
    }
    
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/create-video/${projectId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': request.headers.get('authorization') || '',
        },
        body: JSON.stringify(backendParams)
      }
    )
    
    const result = await response.json()
    return NextResponse.json(result, { status: response.status })
    
  } catch (error) {
    console.error('Video creation error:', error)
    return NextResponse.json({ error: 'Video creation failed' }, { status: 500 })
  }
}