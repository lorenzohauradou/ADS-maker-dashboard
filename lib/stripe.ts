import Stripe from 'stripe'

// Lazy-loaded Stripe instance - viene creata solo quando necessaria
let stripeInstance: Stripe | null = null

export const getStripe = (): Stripe => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil',
      typescript: true,
    })
  }
  
  return stripeInstance
}

// Backward compatibility - deprecata ma mantenuta per eventuali import esistenti
export const stripe = {
  get instance() {
    return getStripe()
  }
}

// Piani di abbonamento che corrispondono a quelli in pricing-section.tsx
export const STRIPE_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    priceId: null, // Nessun price ID per il piano gratuito
    videosPerMonth: 1,
    extraVideoPrice: 9,
    features: [
      '1 free video',
      'Free Generated website',
      'Extra videos at $9 each'
    ]
  },
  STARTER: {
    name: 'Starter', 
    price: 39,
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    videosPerMonth: 10,
    extraVideoPrice: 7,
    features: [
      '10 advertising videos per month',
      'Auto-generated website', 
      'HD + 4K downloads',
      'Extra videos at $7 each',
      'Email support'
    ]
  },
  PRO: {
    name: 'Pro',
    price: 79,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    videosPerMonth: 25,
    extraVideoPrice: 5,
    features: [
      '25 advertising videos per month',
      'Unlimited generated websites',
      'Extra videos at $5 each', 
      'Priority support'
    ]
  },
  BUSINESS: {
    name: 'Business',
    price: 149,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID!,
    videosPerMonth: 55,
    extraVideoPrice: 3,
    features: [
      '55 advertising videos per month',
      'Unlimited websites',
      'Complete white-label',
      'Full API access',
      'Extra videos at $3 each',
      '24/7 priority support'
    ]
  }
} as const

export type PlanType = keyof typeof STRIPE_PLANS 