import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { fetchBackendJson } from "@/lib/backend-fetch"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '20'
    const offset = searchParams.get('offset') || '0'

    const result = await fetchBackendJson(`/api/ai-images/user-images?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'x-user-id': session.user.id,
        'x-user-email': session.user.email!,
        'Content-Type': 'application/json',
      },
    })

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Error fetching user images:', error)
    
    return NextResponse.json({ 
      error: 'Failed to fetch user images', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 