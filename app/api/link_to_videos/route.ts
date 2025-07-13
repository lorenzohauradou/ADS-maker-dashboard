import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    console.log('🚀 LINK_TO_VIDEOS: Iniziando workflow di creazione video...')
    
    // Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      console.error('❌ LINK_TO_VIDEOS: Autenticazione fallita')
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    console.log('✅ LINK_TO_VIDEOS: Utente autenticato:', {
      userId: session.user.id,
      userEmail: session.user.email
    })

    // Leggi payload dal wizard unificato
    const wizardData = await request.json()
    
    console.log('📋 LINK_TO_VIDEOS: Payload ricevuto dal wizard:')
    console.log('🔍 Wizard Data Summary:', {
      projectName: wizardData.projectName,
      platform: wizardData.platform,
      targetAudience: wizardData.targetAudience,
      hasUploadedImageUrls: !!wizardData.uploadedImageUrls,
      uploadedImageCount: wizardData.uploadedImageUrls?.length || 0,
      hasProductUrl: !!wizardData.productUrl?.trim(),
      hasSelectedAvatar: !!wizardData.selectedAvatar,
      videoLength: wizardData.videoLength
    })

    // VALIDAZIONE CRITICA DEI DATI
    if (!wizardData.projectName?.trim()) {
      throw new Error('Project name is required from wizard')
    }

    if (!wizardData.uploadedImageUrls?.length && !wizardData.productUrl?.trim()) {
      throw new Error('Either uploaded images or product URL is required')
    }

    // STEP 1: Crea progetto se non esiste
    let projectId = wizardData.projectId
    console.log('📋 STEP 1: Gestione progetto...')
    
    if (!projectId) {
      console.log('📋 Creando nuovo progetto tramite NextJS...')
      
      // FIX: Usa BACKEND_URL corretto, non NEXT_PUBLIC che è per il frontend
      const nextjsApiUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects/create-for-wizard`
      console.log('📡 Project creation URL:', nextjsApiUrl)
      
      const projectPayload = {
        name: wizardData.projectName || 'Video Project',
        platform: wizardData.platform || 'instagram', 
        target_audience: wizardData.targetAudience || 'young-adults',
        description: 'Video project creato dal wizard unificato'
      }
      
      console.log('📤 Project payload:', projectPayload)
      
      const projectResponse = await fetch(nextjsApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': request.headers.get('cookie') || '', // Per sessione NextAuth
        },
        body: JSON.stringify(projectPayload),
      })

      console.log('📊 Project creation response:', {
        ok: projectResponse.ok,
        status: projectResponse.status,
        statusText: projectResponse.statusText,
        headers: Object.fromEntries(projectResponse.headers.entries())
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
      
      console.log('✅ STEP 1 COMPLETATO: Progetto creato:', {
        projectId,
        projectResult
      })
    } else {
      console.log('✅ STEP 1 SALTATO: Usando progetto esistente:', projectId)
    }

    // CONTROLLO CRITICO
    if (!projectId) {
      throw new Error('Failed to get project ID after creation')
    }

    // STEP 2: Mapping e validazione parametri
    console.log('🔄 STEP 2: Mapping wizard data to Creatify parameters...')
    
    const mappedData = mapWizardToCreatifyParams(wizardData)
    console.log('✅ STEP 2 COMPLETATO: Strategia mappata:', mappedData)

    // STEP 3: Costruisci chiamata backend
    console.log('📡 STEP 3: Preparazione chiamata backend...')
    
    // FIX: Usa BACKEND_URL corretto
    const backendUrl = new URL(`${process.env.BACKEND_URL || 'http://localhost:8000'}/api/creatify/link_to_videos`)
    backendUrl.searchParams.append('project_id', projectId.toString())
    backendUrl.searchParams.append('project_name', wizardData.projectName || 'Video Project')

    console.log('🌐 Backend URL costruito:', backendUrl.toString())

    const backendPayload = {
      // Dati utente per autenticazione backend
      user_id: session.user.id,
      user_email: session.user.email,
      
      // Strategia di creazione link
      strategy: mappedData.strategy,
      
      // Parametri condizionali basati sulla strategia
      ...(mappedData.strategy === 'direct_url' ? {
        // STRATEGIA 1: URL diretto
        link: mappedData.link,
        use_direct_url: true
      } : {
        // STRATEGIA 2: Create link with params
        link_params: mappedData.linkParams,
        use_direct_url: false
      }),
      
      // PARAMETRI VIDEO COMUNI (indipendenti dalla strategia)
      video_params: getVideoParams(wizardData),
      
      // Metadata per debug e tracking
      wizard_metadata: {
        source: 'unified_video_wizard',
        creation_method: mappedData.strategy,
        uploaded_images_count: wizardData.uploadedImageUrls?.length || 0,
        has_product_url: !!wizardData.productUrl?.trim(),
        timestamp: new Date().toISOString(),
        request_duration_ms: Date.now() - startTime
      }
    }

         console.log('📤 Backend payload preparato:', {
       strategy: backendPayload.strategy,
       use_direct_url: backendPayload.use_direct_url,
       video_params_summary: {
         name: backendPayload.video_params?.name,
         target_platform: backendPayload.video_params?.target_platform,
         video_length: backendPayload.video_params?.video_length,
         aspect_ratio: backendPayload.video_params?.aspect_ratio
       },
       link_params_summary: 'link_params' in backendPayload ? {
         title: (backendPayload as any).link_params.title,
         image_count: (backendPayload as any).link_params.image_urls?.length || 0
       } : null,
       link_url: 'link' in backendPayload ? (backendPayload as any).link : null
     })

    // STEP 4: Chiamata al backend con timeout
    console.log('📡 STEP 4: Esecuzione chiamata backend...')
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      console.error('⏱️ TIMEOUT: Backend call dopo 30 secondi')
      controller.abort()
    }, 30000) // 30 secondi timeout

    try {
      const backendResponse = await fetch(backendUrl.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session.user.id,
          'x-user-email': session.user.email || '',
        },
        body: JSON.stringify(backendPayload),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      console.log('📊 Backend response ricevuta:', {
        ok: backendResponse.ok,
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        headers: Object.fromEntries(backendResponse.headers.entries()),
        duration_ms: Date.now() - startTime
      })

      if (!backendResponse.ok) {
        const errorText = await backendResponse.text()
        console.error('❌ BACKEND ERROR RESPONSE:', {
          status: backendResponse.status,
          statusText: backendResponse.statusText,
          errorText
        })
        throw new Error(`Backend error: ${backendResponse.status} - ${errorText}`)
      }

      const result = await backendResponse.json()
      console.log('✅ STEP 4 COMPLETATO: Backend response parsed:', {
        success: result.success,
        hasVideoResult: !!result.video_result,
        videoResultId: result.video_result?.id,
        strategy: result.strategy,
        wizardMetadata: result.wizard_metadata
      })

      // VALIDAZIONE RISPOSTA BACKEND
      if (!result.success) {
        console.error('❌ Backend returned success=false:', result)
        throw new Error(result.error || 'Backend non ha confermato successo')
      }

      if (!result.video_result?.id) {
        console.error('❌ Missing video_result.id in backend response:', result)
        throw new Error('Backend response missing critical video_result.id')
      }

      // STEP 5: Costruisci risposta finale
      console.log('📋 STEP 5: Costruzione risposta finale...')
      
      const finalResponse = {
        ...result,
        project_id: projectId,
        project_name: wizardData.projectName || 'Video Project',
        request_duration_ms: Date.now() - startTime,
        frontend_timestamp: new Date().toISOString()
      }

      console.log('✅ WORKFLOW COMPLETATO CON SUCCESSO:', {
        totalDuration: Date.now() - startTime,
        projectId,
        videoJobId: result.video_result?.id,
        strategy: result.strategy
      })

      return NextResponse.json(finalResponse)

    } catch (fetchError) {
      clearTimeout(timeoutId)
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('⏱️ TIMEOUT: Backend call aborted dopo 30s')
        throw new Error('Backend call timeout dopo 30 secondi')
      }
      
      throw fetchError
    }
    
  } catch (error) {
    const errorDetails = {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      duration_ms: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      request_url: request.url,
      request_method: request.method
    }
    
    console.error('❌ LINK_TO_VIDEOS WORKFLOW FAILED:', errorDetails)
    
    return NextResponse.json(
      { 
        error: 'Failed to create video', 
        details: error instanceof Error ? error.message : 'Unknown error',
        duration_ms: Date.now() - startTime,
        debug_info: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    )
  }
}

// MAPPING FUNCTION: Wizard → Creatify link_to_videos parameters
function mapWizardToCreatifyParams(wizardData: any) {
  console.log('🔄 MAPPING: Determinando strategia di creazione...')
  
  // Determina strategia: URL prodotto vs Multiple immagini
  const hasProductUrl = wizardData.productUrl?.trim()
  const hasImages = wizardData.uploadedImageUrls?.length > 0
  
  console.log('🔍 MAPPING INPUT:', {
    hasProductUrl: !!hasProductUrl,
    productUrl: hasProductUrl || 'none',
    hasImages,
    imageCount: wizardData.uploadedImageUrls?.length || 0,
    uploadedImageUrls: wizardData.uploadedImageUrls || 'none'
  })
  
  if (hasProductUrl) {
    // STRATEGIA 1: URL prodotto esistente
    console.log('🌐 MAPPING: Strategia DIRECT_URL selezionata')
    console.log('🔗 URL prodotto:', wizardData.productUrl)
    
    return {
      strategy: 'direct_url',
      link: wizardData.productUrl.trim(),
      useDirectUrl: true
    }
  } else if (hasImages) {
    // STRATEGIA 2: Multiple immagini → Create link with params
    console.log('📸 MAPPING: Strategia CREATE_LINK_WITH_PARAMS selezionata')
    console.log(`📸 Immagini da utilizzare (${wizardData.uploadedImageUrls.length}):`, wizardData.uploadedImageUrls)
    
    // VALIDAZIONE STRICTA IMMAGINI
    if (!Array.isArray(wizardData.uploadedImageUrls)) {
      console.error('❌ MAPPING ERROR: uploadedImageUrls non è un array:', typeof wizardData.uploadedImageUrls)
      throw new Error('uploadedImageUrls deve essere un array di URL validi')
    }
    
    const validImageUrls = wizardData.uploadedImageUrls.filter((url: any) => 
      typeof url === 'string' && url.trim().length > 0
    )
    
    console.log('🔍 MAPPING: Validazione immagini:', {
      inputCount: wizardData.uploadedImageUrls.length,
      validCount: validImageUrls.length,
      invalidUrls: wizardData.uploadedImageUrls.filter((url: any) => typeof url !== 'string' || !url.trim())
    })
    
    if (validImageUrls.length === 0) {
      console.error('❌ MAPPING ERROR: Nessuna immagine valida trovata')
      throw new Error('Nessuna immagine valida trovata negli uploadedImageUrls')
    }
    
    const linkParams = {
      title: wizardData.projectName,
      description: wizardData.productDescription || `Video creato per ${wizardData.projectName}`,
      image_urls: validImageUrls,
      logo_url: wizardData.logoUrl || null,
      brand_color: wizardData.brandColor || null
    }
    
    console.log('✅ MAPPING: Link params creati:', {
      title: linkParams.title,
      description: linkParams.description,
      imageCount: linkParams.image_urls.length,
      hasLogo: !!linkParams.logo_url,
      hasBrandColor: !!linkParams.brand_color
    })
    
    return {
      strategy: 'create_link_with_params',
      linkParams,
      useDirectUrl: false
    }
  } else {
    const errorData = {
      hasProductUrl: !!hasProductUrl,
      hasImages,
      productUrl: wizardData.productUrl,
      uploadedImageUrls: wizardData.uploadedImageUrls,
      wizardDataKeys: Object.keys(wizardData)
    }
    
    console.error('❌ MAPPING ERROR: Configurazione invalida:', errorData)
    throw new Error('Nessun URL prodotto o immagini fornite per la creazione del video')
  }
}

function getVideoParams(wizardData: any) {
  console.log('🎬 VIDEO_PARAMS: Generando parametri video...')
  
  // Mappa platform a aspect_ratio
  const aspectRatioMap: Record<string, string> = {
    'instagram': '9x16',  // Instagram Stories/Reels
    'tiktok': '9x16',     // TikTok verticale
    'youtube': '16x9',    // YouTube orizzontale
    'facebook': '1x1'     // Facebook quadrato
  }

  // Mappa target audience per Creatify
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

  // Mappa template selection a visual_style
  const visualStyleMap: Record<string, string> = {
    'product_showcase_template': 'DynamicProductTemplate',
    'sales_funnel_template': 'SimpleAvatarOverlayTemplate',
    'brand_story_template': 'AvatarBubbleTemplate',
    'call_to_action_template': 'EnhancedVanillaTemplate',
    'lead_magnet_template': 'FeatureHighlightTemplate',
    'explainer_template': 'VanillaTemplate'
  }

  // Mappa target audience a script_style
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

  // VALIDAZIONE STRICTA: video_length deve essere 15, 30, or 60 (come da documentazione)
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
    // NOME DEL VIDEO - USA NOME PROGETTO DAL WIZARD
    name: wizardData.projectName?.trim() || `Video ${new Date().toISOString().slice(0, 10)}`,
    
    // PIATTAFORMA E FORMATO (Creatify default è 'tiktok', non 'instagram')
    target_platform: wizardData.platform || 'tiktok', 
    aspect_ratio: aspectRatioMap[wizardData.platform] || '9x16',
    
    // TARGET AUDIENCE
    target_audience: audienceMap[wizardData.targetAudience] || wizardData.targetAudience || 'young adults',
    
    // DURATA - CONFORME ALLA DOCUMENTAZIONE 
    video_length: validVideoLength,
    
    // LINGUA (default inglese)
    language: wizardData.language || 'en',
    
    // STILE VISUALE
    visual_style: wizardData.selectedTemplate ? 
      (visualStyleMap[wizardData.selectedTemplate] || 'AvatarBubbleTemplate') : 
      'AvatarBubbleTemplate',
    
    // STILE SCRIPT basato su audience
    script_style: wizardData.scriptStyle || 
      scriptStyleMap[wizardData.targetAudience] || 
      'ProductHighlightsV2',
    
    // AVATAR OVERRIDE (se selezionato nel wizard)
    override_avatar: wizardData.selectedAvatar?.id || null,
    
    // VOICE OVERRIDE (se configurato)
    override_voice: wizardData.selectedVoice?.id || null,
    
    // SCRIPT PERSONALIZZATO (se fornito)
    override_script: wizardData.customScript?.trim() || null,
    
    // CONFIGURAZIONI AUDIO (volumi entro 0.0-1.0)
    background_music_volume: Math.max(0, Math.min(1, wizardData.musicVolume || 0.3)),
    voiceover_volume: Math.max(0, Math.min(1, wizardData.voiceVolume || 0.8)),
    no_background_music: wizardData.backgroundMusic === false,
    
    // CONTROLLI CREATIVI (default abilitati)
    no_caption: false,
    no_emotion: false,
    no_cta: false,
    no_stock_broll: false,
    
    // STILE SOTTOTITOLI (configurabile)
    caption_style: wizardData.captionStyle || 'normal-white'
  }

  console.log('🔧 VIDEO_PARAMS generati:', {
    name: params.name,
    target_platform: params.target_platform,
    aspect_ratio: params.aspect_ratio,
    target_audience: params.target_audience,
    video_length: params.video_length,
    visual_style: params.visual_style,
    script_style: params.script_style,
    override_avatar: params.override_avatar,
    language: params.language
  })
  
  return params
} 