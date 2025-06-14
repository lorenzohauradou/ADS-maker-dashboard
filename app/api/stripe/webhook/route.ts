import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription)
        break
        
      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object as Stripe.Subscription)
        break
        
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break
        
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      case 'payment_intent.succeeded':
        await handleExtraVideoPayment(event.data.object as Stripe.PaymentIntent)
        break
        
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

// Funzioni di gestione eventi (da implementare con chiamate al backend Python)
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  const nextauthUserId = subscription.metadata.nextauth_user_id
  const planType = subscription.metadata.plan_type

  if (!nextauthUserId) {
    console.error('Missing nextauth_user_id in subscription metadata')
    return
  }

  // Qui dovrai fare una chiamata HTTP al tuo backend Python
  // per aggiornare la tabella subscriptions
  console.log('Subscription updated:', {
    customerId,
    nextauthUserId,
    planType,
    status: subscription.status,
    subscriptionId: subscription.id
  })

  // Chiama il backend Python per sincronizzare i dati
  try {
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:8000'}/api/subscriptions/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nextauth_user_id: nextauthUserId,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        stripe_price_id: subscription.items.data[0].price.id,
        status: subscription.status,
        plan_name: planType,
        current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
        current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
        trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null
      })
    })

    if (!response.ok) {
      console.error('Failed to sync subscription to backend:', await response.text())
    } else {
      console.log('Subscription synced successfully to backend')
    }
  } catch (error) {
    console.error('Error calling backend API:', error)
  }
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  console.log('Subscription canceled:', subscription.id)
  // TODO: Aggiornare status a "canceled" nel backend
}

async function handleExtraVideoPayment(paymentIntent: Stripe.PaymentIntent) {
  // Gestisce i pagamenti per video extra
  console.log('Extra video payment succeeded:', paymentIntent.id)
  
  const metadata = paymentIntent.metadata
  
  if (metadata.payment_type === 'extra_video' && metadata.nextauth_user_id) {
    try {
      // Chiama il backend per aggiungere il video extra
      const response = await fetch(`${process.env.BACKEND_URL || 'https://api.fastadsai.com'}/api/subscriptions/add-extra-video/${metadata.nextauth_user_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_amount: paymentIntent.amount / 100, // Stripe amount è in centesimi
          stripe_payment_id: paymentIntent.id
        })
      })
      
      if (response.ok) {
        console.log('Extra video added successfully for user:', metadata.nextauth_user_id)
      } else {
        console.error('Failed to add extra video:', await response.text())
      }
    } catch (error) {
      console.error('Error processing extra video payment:', error)
    }
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded:', invoice.id)
  // TODO: Registrare il pagamento nella tabella payments
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed:', invoice.id)
  // TODO: Gestire pagamento fallito
} 