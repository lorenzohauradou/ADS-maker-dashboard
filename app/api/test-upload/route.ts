import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 TEST_UPLOAD: Starting test upload...')

    // 📋 Leggi FormData con immagini
    const formData = await request.formData()
    
    console.log('🧪 TEST_UPLOAD: FormData ricevuta')

    // 📡 Test diretto al backend senza autenticazione
    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/api/creatify/test-upload`,
      {
        method: 'POST',
        body: formData, // Passa FormData direttamente
      }
    )

    console.log('🧪 TEST_UPLOAD: Backend response status:', backendResponse.status)

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      console.error('🧪 TEST_UPLOAD: Backend error:', errorData)
      return NextResponse.json({
        success: false,
        error: 'Backend upload failed',
        details: errorData,
        status: backendResponse.status
      }, { status: backendResponse.status })
    }

    const result = await backendResponse.json()
    
    console.log('🧪 TEST_UPLOAD: Success:', result)
    
    return NextResponse.json({
      success: true,
      message: 'Test upload successful',
      result: result
    })
    
  } catch (error) {
    console.error('🧪 TEST_UPLOAD: Error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Test upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 