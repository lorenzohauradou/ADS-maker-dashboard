import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PLANS, PlanType } from '@/lib/stripe'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    // Verifica autenticazione
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    const { planType } = await request.json()

    // Valida il piano
    if (!planType || !(planType in STRIPE_PLANS)) {
      return NextResponse.json({ error: 'Piano non valido' }, { status: 400 })
    }

    const plan = STRIPE_PLANS[planType as PlanType]

    // Non creare checkout per piano gratuito
    if (planType === 'FREE' || !plan.priceId) {
      return NextResponse.json({ error: 'Il piano gratuito non richiede pagamento' }, { status: 400 })
    }

    // Crea o recupera customer Stripe
    let customerId: string
    const existingCustomers = await stripe.customers.list({
      email: session.user.email!,
      limit: 1
    })

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id
    } else {
      const newCustomer = await stripe.customers.create({
        email: session.user.email!,
        name: session.user.name || undefined,
        metadata: {
          nextauth_user_id: session.user.id
        }
      })
      customerId = newCustomer.id
    }

    // Crea sessione di checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email!,
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId!,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/dashboard?success=true&plan=${planType}`,
      cancel_url: `${request.nextUrl.origin}/?canceled=true`,
      metadata: {
        nextauth_user_id: session.user.id,
        plan_type: planType,
      },
      subscription_data: {
        metadata: {
          nextauth_user_id: session.user.id,
          plan_type: planType,
        }
      }
    })

    return NextResponse.json({ 
      url: checkoutSession.url,
      sessionId: checkoutSession.id 
    })

  } catch (error) {
    console.error('Errore checkout Stripe:', error)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
} 