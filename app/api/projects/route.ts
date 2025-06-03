import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const response = await fetch(`${process.env.BACKEND_URL}/api/projects/`, {
      method: 'POST',
      headers: {
        'Authorization': request.headers.get('authorization') || '',
      },
      body: formData
    })
    
    const result = await response.json()
    return NextResponse.json(result, { status: response.status })
    
  } catch (error) {
    return NextResponse.json({ error: 'Project creation failed' }, { status: 500 })
  }
}