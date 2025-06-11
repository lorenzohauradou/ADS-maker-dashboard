import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { auth } from '@/auth'

// Prezzi video extra per ogni piano
const EXTRA_VIDEO_PRICES = {
  free: { price: 9, priceId: process.env.STRIPE_EXTRA_VIDEO_FREE_PRICE_ID },
  starter: { price: 7, priceId: process.env.STRIPE_EXTRA_VIDEO_STARTER_PRICE_ID },
  pro: { price: 5, priceId: process.env.STRIPE_EXTRA_VIDEO_PRO_PRICE_ID },
  business: { price: 3, priceId: process.env.STRIPE_EXTRA_VIDEO_BUSINESS_PRICE_ID }
} as const

export async function POST(request: NextRequest) {
  try {
    // Verifica autenticazione
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    const { planType } = await request.json()

    // Valida il piano
    if (!planType || !(planType.toLowerCase() in EXTRA_VIDEO_PRICES)) {
      return NextResponse.json({ error: 'Piano non valido' }, { status: 400 })
    }

    const extraVideoConfig = EXTRA_VIDEO_PRICES[planType.toLowerCase() as keyof typeof EXTRA_VIDEO_PRICES]

    if (!extraVideoConfig.priceId) {
      return NextResponse.json({ 
        error: `Price ID non configurato per piano ${planType}. Contatta il supporto.` 
      }, { status: 500 })
    }

    // Crea sessione di checkout per video extra (one-time payment)
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email!,
      payment_method_types: ['card'],
      line_items: [
        {
          price: extraVideoConfig.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment', // One-time payment, non subscription
      success_url: `${request.nextUrl.origin}/dashboard?extra_video=success`,
      cancel_url: `${request.nextUrl.origin}/dashboard?extra_video=canceled`,
      metadata: {
        nextauth_user_id: session.user.id,
        payment_type: 'extra_video',
        plan_type: planType,
        video_price: extraVideoConfig.price.toString()
      }
    })

    return NextResponse.json({ 
      url: checkoutSession.url,
      sessionId: checkoutSession.id 
    })

  } catch (error) {
    console.error('Errore acquisto video extra:', error)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
} 