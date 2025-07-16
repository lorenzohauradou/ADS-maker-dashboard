import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    console.log('📸 UPLOAD_PRODUCT_IMAGES: ====== REQUEST START ======')
    
    // 🔐 Verifica autenticazione NextAuth
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      console.log('❌ UPLOAD_PRODUCT_IMAGES: Authentication failed')
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 📋 Leggi FormData con immagini
    const formData = await request.formData()
    
    console.log('📸 UPLOAD_PRODUCT_IMAGES: FormData ricevuta')
    console.log('📸 UPLOAD_PRODUCT_IMAGES: User ID:', session.user.id)
    console.log('📸 UPLOAD_PRODUCT_IMAGES: User Email:', session.user.email)

    // 🗄️ Inizializza Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const images = formData.getAll('images') as File[]
    
    if (images.length === 0) {
      throw new Error('Nessuna immagine fornita')
    }

    const uploadedImages = []

    // Upload di ogni immagine su Supabase Storage
    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      
      // Validazione file
      if (!image.type.startsWith('image/')) {
        throw new Error(`File ${image.name} non è un'immagine`)
      }

      if (image.size > 50 * 1024 * 1024) { // 50MB
        throw new Error('File troppo grande (max 50MB)')
      }

      // Genera nome file unico
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substring(2)
      const fileExtension = image.name.split('.').pop() || 'jpg'
      const filename = `product-images/${session.user.id}/${timestamp}_${randomId}.${fileExtension}`

      // Converti File a ArrayBuffer
      const arrayBuffer = await image.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)

      // Upload su Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filename, uint8Array, {
          contentType: image.type,
          cacheControl: '3600'
        })

      if (error) {
        console.error('❌ Supabase upload error:', error)
        throw new Error(`Errore upload: ${error.message}`)
      }

      // Ottieni URL pubblico
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filename)

      uploadedImages.push({
        filename: data.path,
        url: publicUrl,
        original_filename: image.name
      })

      console.log(`📸 Immagine ${i + 1} caricata: ${data.path}`)
    }

    // Estrai solo gli URL per il frontend
    const image_urls = uploadedImages.map(img => img.url)
    
    console.log('✅ UPLOAD_PRODUCT_IMAGES: Successo:', image_urls)
    
    return NextResponse.json({
      success: true,
      message: `${image_urls.length} immagini caricate con successo`,
      image_urls,
      uploaded_images: uploadedImages
    })
    
  } catch (error) {
    console.error('❌ UPLOAD_PRODUCT_IMAGES: Critical error:', error)
    console.error('❌ UPLOAD_PRODUCT_IMAGES: Error stack:', error instanceof Error ? error.stack : 'No stack')
    return NextResponse.json({ 
      error: 'Failed to upload product images', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 