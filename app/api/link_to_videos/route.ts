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

    // 🎯 STEP 1: Crea progetto se non esiste
    let projectId = wizardData.projectId
    if (!projectId) {
      // 📋 USA ENDPOINT NEXTJS che attiva il polling automatico
      const projectResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/api/projects/create-for-wizard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': request.headers.get('cookie') || '', // Per sessione NextAuth
        },
        body: JSON.stringify({
          name: wizardData.projectName || 'Video Project',
          platform: wizardData.platform || 'instagram', 
          target_audience: wizardData.targetAudience || 'young-adults',
          description: 'Video project creato dal wizard unificato'
        }),
      })

      if (!projectResponse.ok) {
        const errorData = await projectResponse.text()
        console.error('❌ PROJECT CREATION ERROR:', errorData)
        return NextResponse.json(
          { error: `Errore creazione progetto: ${errorData}` }, 
          { status: projectResponse.status }
        )
      }

      const projectResult = await projectResponse.json()
      projectId = projectResult.project?.id || projectResult.id
      console.log('✅ Progetto creato tramite NextJS:', projectId)
    }

    // 🎯 MAPPING COMPLETO: Wizard Data → Creatify link_to_videos
    console.log('🔍 LINK_TO_VIDEOS: Wizard data ricevuti:', {
      hasImages: !!wizardData.uploadedImageUrls?.length,
      imageCount: wizardData.uploadedImageUrls?.length || 0,
      hasProductUrl: !!wizardData.productUrl?.trim(),
      projectName: wizardData.projectName,
      platform: wizardData.platform
    })
    
    const mappedData = mapWizardToCreatifyParams(wizardData)
    
    console.log('🔗 LINK_TO_VIDEOS: Strategia mappata:', mappedData)

    // 🔗 STEP 2: Costruisci URL con query parameters obbligatori
    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/creatify/link_to_videos`)
    backendUrl.searchParams.append('project_id', projectId.toString())
    backendUrl.searchParams.append('project_name', wizardData.projectName || 'Video Project')

    console.log('📡 LINK_TO_VIDEOS: Chiamata backend in corso...', backendUrl.toString())

    // Chiamata al backend
    const backendResponse = await fetch(backendUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': session.user.id,
        'x-user-email': session.user.email || '',
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
        })
    })

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text()
      console.error('❌ LINK_TO_VIDEOS: Errore backend:', errorText)
      throw new Error(`Backend error: ${backendResponse.status} - ${errorText}`)
    }

    const result = await backendResponse.json()
    console.log('✅ LINK_TO_VIDEOS: Risposta backend ricevuta:', result)

    // 🎯 Il controllo automatico è gestito dal frontend polling

         // 🎯 Aggiungi project_id alla risposta per la navigazione frontend
     return NextResponse.json({
       ...result,
       project_id: projectId,
       project_name: wizardData.projectName || 'Video Project'
     })
    
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
    console.log(`📸 Usando ${wizardData.uploadedImageUrls.length} immagini caricate:`, wizardData.uploadedImageUrls)
    
    // ✅ VALIDAZIONE STRICTA IMMAGINI
    if (!Array.isArray(wizardData.uploadedImageUrls)) {
      throw new Error('uploadedImageUrls deve essere un array di URL validi')
    }
    
    const validImageUrls = wizardData.uploadedImageUrls.filter((url: any) => 
      typeof url === 'string' && url.trim().length > 0
    )
    
    if (validImageUrls.length === 0) {
      throw new Error('Nessuna immagine valida trovata negli uploadedImageUrls')
    }
    
    console.log(`✅ ${validImageUrls.length} immagini valide per link_with_params`)
    
    return {
      strategy: 'create_link_with_params',
      linkParams: {
        title: wizardData.projectName,
        description: wizardData.productDescription,
        image_urls: validImageUrls,
        logo_url: wizardData.logoUrl || null,
        brand_color: wizardData.brandColor || null
      },
      useDirectUrl: false
    }
  } else {
    console.error('❌ MAPPING ERROR: Dati ricevuti:', {
      hasProductUrl,
      hasImages,
      productUrl: wizardData.productUrl,
      uploadedImageUrls: wizardData.uploadedImageUrls
    })
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

  // ✅ VALIDAZIONE STRICTA: video_length deve essere 15, 30, or 60 (come da documentazione)
  const rawVideoLength = wizardData.videoLength || 30
  let validVideoLength = 30 // default sicuro
  
  if (rawVideoLength <= 15) {
    validVideoLength = 15
  } else if (rawVideoLength <= 30) {
    validVideoLength = 30
  } else {
    validVideoLength = 60
  }

  console.log(`🔧 VIDEO_PARAMS: video_length ${rawVideoLength} → ${validVideoLength} (Creatify compliance)`)

  const params = {
    // 📛 NOME DEL VIDEO - USA NOME PROGETTO DAL WIZARD
    name: wizardData.projectName?.trim() || `Video ${new Date().toISOString().slice(0, 10)}`,
    
    // 📱 PIATTAFORMA E FORMATO (Creatify default è 'tiktok', non 'instagram')
    target_platform: wizardData.platform || 'tiktok', 
    aspect_ratio: aspectRatioMap[wizardData.platform] || '9x16',
    
    // 🎯 TARGET AUDIENCE
    target_audience: audienceMap[wizardData.targetAudience] || wizardData.targetAudience || 'young adults',
    
    // ⏱️ DURATA - CONFORME ALLA DOCUMENTAZIONE 
    video_length: validVideoLength,
    
    // 🌍 LINGUA (default inglese)
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
    
    // 🎵 CONFIGURAZIONI AUDIO (volumi entro 0.0-1.0)
    background_music_volume: Math.max(0, Math.min(1, wizardData.musicVolume || 0.3)),
    voiceover_volume: Math.max(0, Math.min(1, wizardData.voiceVolume || 0.8)),
    no_background_music: wizardData.backgroundMusic === false,
    
    // 🎬 CONTROLLI CREATIVI (default abilitati)
    no_caption: false,
    no_emotion: false,
    no_cta: false,
    no_stock_broll: false,
    
    // 📝 STILE SOTTOTITOLI (configurabile)
    caption_style: wizardData.captionStyle || 'normal-white'
  }

  console.log('🔧 VIDEO_PARAMS generati:', params)
  return params
} 