import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 📋 Leggi payload dal wizard unificato
    const wizardData = await request.json()
    
    console.log('🔗 LINK_TO_VIDEOS: Dati wizard ricevuti:', wizardData)

    // 🎯 MAPPING COMPLETO: Wizard Data → Creatify link_to_videos
    const mappedData = mapWizardToCreatifyParams(wizardData)
    
    console.log('🔗 LINK_TO_VIDEOS: Strategia mappata:', mappedData)

    // Chiamata al backend
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/creatify/link_to_videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // 👤 Dati utente per autenticazione backend
        user_id: session.user.id,
        user_email: session.user.email,
        
        // 🎯 Strategia di creazione link
        strategy: mappedData.strategy,
        
        // 🔗 Parametri condizionali basati sulla strategia
        ...(mappedData.strategy === 'direct_url' ? {
          // STRATEGIA 1: URL diretto
          link: mappedData.link,
          use_direct_url: true
        } : {
          // STRATEGIA 2: Create link with params
          link_params: mappedData.linkParams,
          use_direct_url: false
        }),
        
        // 🎬 PARAMETRI VIDEO COMUNI (indipendenti dalla strategia)
        video_params: getVideoParams(wizardData),
        
        // 🔧 Metadata per debug e tracking
        wizard_metadata: {
          source: 'unified_video_wizard',
          creation_method: mappedData.strategy,
          uploaded_images_count: wizardData.uploadedImageUrls?.length || 0,
          has_product_url: !!wizardData.productUrl?.trim(),
          timestamp: new Date().toISOString()
        }
      }),
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.text()
      console.error('❌ BACKEND ERROR:', errorData)
      return NextResponse.json(
        { error: `Errore backend: ${errorData}` }, 
        { status: backendResponse.status }
      )
    }

    const result = await backendResponse.json()
    console.log('✅ LINK_TO_VIDEOS: Risposta backend ricevuta:', result)

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ LINK_TO_VIDEOS Error:', error)
    return NextResponse.json(
      { error: 'Failed to create video', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// 🎯 MAPPING FUNCTION: Wizard → Creatify link_to_videos parameters
function mapWizardToCreatifyParams(wizardData: any) {
  // 🔗 Determina strategia: URL prodotto vs Multiple immagini
  const hasProductUrl = wizardData.productUrl?.trim()
  const hasImages = wizardData.uploadedImageUrls?.length > 0
  
  if (hasProductUrl) {
    // STRATEGIA 1: URL prodotto esistente
    console.log('🌐 Usando URL prodotto:', wizardData.productUrl)
    return {
      strategy: 'direct_url',
      link: wizardData.productUrl.trim(),
      useDirectUrl: true
    }
  } else if (hasImages) {
    // STRATEGIA 2: Multiple immagini → Create link with params
    console.log(`📸 Usando ${wizardData.uploadedImageUrls.length} immagini caricate`)
    return {
      strategy: 'create_link_with_params',
      linkParams: {
        title: wizardData.projectName || 'Prodotto FastAds',
        description: wizardData.productDescription || 'Prodotto di qualità creato con FastAds',
        image_urls: wizardData.uploadedImageUrls,  // ✅ TUTTE LE IMMAGINI!
        logo_url: wizardData.logoUrl || null,
        brand_color: wizardData.brandColor || null
      },
      useDirectUrl: false
    }
  } else {
    throw new Error('Nessun URL prodotto o immagini fornite per la creazione del video')
  }
}

function getVideoParams(wizardData: any) {
  // 🎭 Mappa platform a aspect_ratio
  const aspectRatioMap: Record<string, string> = {
    'instagram': '9x16',  // Instagram Stories/Reels
    'tiktok': '9x16',     // TikTok verticale
    'youtube': '16x9',    // YouTube orizzontale
    'facebook': '1x1'     // Facebook quadrato
  }

  // 📱 Mappa target audience per Creatify
  const audienceMap: Record<string, string> = {
    'young-adults': 'young adults',
    'giovani': 'young adults',
    'families': 'families',
    'famiglie': 'families', 
    'professionals': 'professionals',
    'professionisti': 'professionals',
    'seniors': 'seniors',
    'anziani': 'seniors'
  }

  // 🎨 Mappa template selection a visual_style
  const visualStyleMap: Record<string, string> = {
    'product_showcase_template': 'DynamicProductTemplate',
    'sales_funnel_template': 'SimpleAvatarOverlayTemplate',
    'brand_story_template': 'AvatarBubbleTemplate',
    'call_to_action_template': 'EnhancedVanillaTemplate',
    'lead_magnet_template': 'FeatureHighlightTemplate',
    'explainer_template': 'VanillaTemplate'
  }

  // 📝 Mappa target audience a script_style
  const scriptStyleMap: Record<string, string> = {
    'young-adults': 'TrendingTopicsV2',
    'giovani': 'TrendingTopicsV2',
    'families': 'BenefitsV2',
    'famiglie': 'BenefitsV2',
    'professionals': 'ProductHighlightsV2', 
    'professionisti': 'ProductHighlightsV2',
    'seniors': 'ProblemSolutionV2',
    'anziani': 'ProblemSolutionV2'
  }

  return {
    // 📛 NOME DEL VIDEO - USA NOME PROGETTO DAL WIZARD
    name: wizardData.projectName?.trim() || `Video ${new Date().toISOString().slice(0, 10)}`,
    
    // 📱 PIATTAFORMA E FORMATO
    target_platform: wizardData.platform || 'instagram',
    aspect_ratio: aspectRatioMap[wizardData.platform] || '9x16',
    
    // 🎯 TARGET AUDIENCE
    target_audience: audienceMap[wizardData.targetAudience] || wizardData.targetAudience || 'young adults',
    
    // ⏱️ DURATA
    video_length: wizardData.videoLength || 30,
    
    // 🌍 LINGUA (default inglese, configurabile)
    language: wizardData.language || 'en',
    
    // 🎨 STILE VISUALE
    visual_style: wizardData.selectedTemplate ? 
      (visualStyleMap[wizardData.selectedTemplate] || 'AvatarBubbleTemplate') : 
      'AvatarBubbleTemplate',
    
    // 📝 STILE SCRIPT basato su audience
    script_style: wizardData.scriptStyle || 
      scriptStyleMap[wizardData.targetAudience] || 
      'ProductHighlightsV2',
    
    // 🎭 AVATAR OVERRIDE (se selezionato nel wizard)
    override_avatar: wizardData.selectedAvatar?.id || null,
    
    // 🎤 VOICE OVERRIDE (se configurato)
    override_voice: wizardData.selectedVoice?.id || null,
    
    // 📝 SCRIPT PERSONALIZZATO (se fornito)
    override_script: wizardData.customScript?.trim() || null,
    
    // 🎵 CONFIGURAZIONI AUDIO (default ottimizzati)
    background_music_volume: wizardData.musicVolume || 0.3,
    voiceover_volume: wizardData.voiceVolume || 0.8,
    no_background_music: wizardData.backgroundMusic === false,
    
    // 🎬 CONTROLLI CREATIVI (default abilitati)
    no_caption: false,
    no_emotion: false,
    no_cta: false,
    no_stock_broll: false,
    
    // 📝 STILE SOTTOTITOLI (configurabile)
    caption_style: wizardData.captionStyle || 'normal-white'
  }
} 