#!/usr/bin/env node
/**
 * Script completo per creare tutti i prodotti e price IDs di Stripe
 * Supporta sia piani di abbonamento che video extra
 * 
 * Esegui con: node setup-stripe-products.js
 */

const Stripe = require('stripe');
require('dotenv').config({ path: '.env' });

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY non trovato nel file .env.local');
  console.log('💡 Assicurati di avere STRIPE_SECRET_KEY nel tuo file .env.local');
  console.log('💡 Per l\'ambiente live, usa la chiave che inizia con sk_live_...');
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Verifica se siamo in modalità live o test
const isLiveMode = process.env.STRIPE_SECRET_KEY.startsWith('sk_live_');
console.log(`🔧 Modalità: ${isLiveMode ? 'LIVE 🚀' : 'TEST 🧪'}`);

async function createSubscriptionPlans() {
  console.log('\n📋 Creazione piani di abbonamento...\n');

  const plans = [
    {
      name: 'Starter',
      price: 39.00,
      interval: 'month',
      videos: 10,
      extraVideoPrice: 7.00,
      envVar: 'STRIPE_STARTER_PRICE_ID',
      features: [
        '10 advertising videos per month',
        'Auto-generated website',
        'HD + 4K downloads',
        'Extra videos at $7 each',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      price: 79.00,
      interval: 'month',
      videos: 25,
      extraVideoPrice: 5.00,
      envVar: 'STRIPE_PRO_PRICE_ID',
      features: [
        '25 advertising videos per month',
        'Unlimited generated websites',
        'Extra videos at $5 each',
        'Priority support'
      ]
    },
    {
      name: 'Business',
      price: 149.00,
      interval: 'month',
      videos: 55,
      extraVideoPrice: 3.00,
      envVar: 'STRIPE_BUSINESS_PRICE_ID',
      features: [
        '55 advertising videos per month',
        'Unlimited websites',
        'Complete white-label',
        'Full API access',
        'Extra videos at $3 each',
        '24/7 priority support'
      ]
    }
  ];

  const createdPlans = [];

  for (const plan of plans) {
    try {
      console.log(`📦 Creando piano ${plan.name}...`);
      
      // Crea il prodotto
      const product = await stripe.products.create({
        name: `${plan.name} Plan`,
        description: `${plan.name} subscription plan for video creation. Includes ${plan.videos} videos per month.`,
        type: 'service',
        metadata: {
          type: 'subscription',
          plan: plan.name.toLowerCase(),
          videos_per_month: plan.videos.toString(),
          extra_video_price: plan.extraVideoPrice.toString()
        }
      });

      // Crea il price per l'abbonamento
      const price = await stripe.prices.create({
        unit_amount: Math.round(plan.price * 100), // Converti in centesimi
        currency: 'usd',
        recurring: {
          interval: plan.interval,
        },
        product: product.id,
        metadata: {
          type: 'subscription',
          plan: plan.name.toLowerCase(),
          videos_per_month: plan.videos.toString()
        }
      });

      createdPlans.push({
        ...plan,
        productId: product.id,
        priceId: price.id
      });

      console.log(`✅ ${plan.name} Plan: ${price.id}`);
      
    } catch (error) {
      console.error(`❌ Errore creazione piano ${plan.name}:`, error.message);
    }
  }

  return createdPlans;
}

async function createExtraVideoPrices() {
  console.log('\n🎬 Creazione prezzi per video extra...\n');

  const extraVideoPrices = [
    {
      name: 'Extra Video - Free Plan',
      price: 9.00,
      plan: 'free',
      envVar: 'STRIPE_EXTRA_VIDEO_FREE_PRICE_ID'
    },
    {
      name: 'Extra Video - Starter Plan',
      price: 7.00,
      plan: 'starter',
      envVar: 'STRIPE_EXTRA_VIDEO_STARTER_PRICE_ID'
    },
    {
      name: 'Extra Video - Pro Plan',
      price: 5.00,
      plan: 'pro',
      envVar: 'STRIPE_EXTRA_VIDEO_PRO_PRICE_ID'
    },
    {
      name: 'Extra Video - Business Plan',
      price: 3.00,
      plan: 'business',
      envVar: 'STRIPE_EXTRA_VIDEO_BUSINESS_PRICE_ID'
    }
  ];

  const createdPrices = [];

  for (const extraVideo of extraVideoPrices) {
    try {
      console.log(`🎥 Creando price per ${extraVideo.name}...`);
      
      // Crea il prodotto
      const product = await stripe.products.create({
        name: extraVideo.name,
        description: `Purchase 1 additional video for your ${extraVideo.plan} plan. Available immediately after payment.`,
        type: 'service',
        metadata: {
          type: 'extra_video',
          plan: extraVideo.plan
        }
      });

      // Crea il price
      const price = await stripe.prices.create({
        unit_amount: Math.round(extraVideo.price * 100), // Converti in centesimi
        currency: 'usd',
        product: product.id,
        metadata: {
          type: 'extra_video',
          plan: extraVideo.plan
        }
      });

      createdPrices.push({
        ...extraVideo,
        productId: product.id,
        priceId: price.id
      });

      console.log(`✅ ${extraVideo.name}: ${price.id}`);
      
    } catch (error) {
      console.error(`❌ Errore creazione ${extraVideo.name}:`, error.message);
    }
  }

  return createdPrices;
}

async function setupStripeProducts() {
  try {
    console.log('🚀 Avvio setup prodotti Stripe...');
    console.log(`🔧 Ambiente: ${isLiveMode ? 'PRODUZIONE (Live)' : 'Sviluppo (Test)'}`);
    console.log('='.repeat(60));

    // Crea piani di abbonamento
    const subscriptionPlans = await createSubscriptionPlans();
    
    // Crea prezzi per video extra
    const extraVideoPrices = await createExtraVideoPrices();

    // Mostra riepilogo
    console.log('\n' + '='.repeat(60));
    console.log('🎉 SETUP COMPLETATO CON SUCCESSO!');
    console.log('='.repeat(60));
    
    console.log(`\n📋 Aggiungi queste variabili al tuo file .env${isLiveMode ? '' : '.local'}:\n`);
    
    // Variabili per i piani di abbonamento
    console.log('# 📦 PIANI DI ABBONAMENTO');
    subscriptionPlans.forEach(plan => {
      console.log(`${plan.envVar}=${plan.priceId}`);
    });

    console.log('\n# 🎬 VIDEO EXTRA');
    extraVideoPrices.forEach(price => {
      console.log(`${price.envVar}=${price.priceId}`);
    });

    console.log('\n' + '='.repeat(60));
    console.log('📝 PROSSIMI PASSI:');
    console.log('='.repeat(60));
    console.log('1. 📋 Copia le variabili sopra nel file .env.local');
    console.log('2. 🔄 Riavvia il server di sviluppo (npm run dev)');
    console.log('3. 🧪 Testa i pagamenti nell\'app');
    
    if (isLiveMode) {
      console.log('4. 🚀 Deploy su Vercel con le nuove variabili di ambiente');
      console.log('5. ⚡ Aggiorna le variabili su Vercel Dashboard');
    }
    
    console.log('\n🔗 Verifica nel Stripe Dashboard:');
    console.log(`   https://dashboard.stripe.com/${isLiveMode ? '' : 'test/'}products`);
    
    return {
      subscriptionPlans,
      extraVideoPrices
    };

  } catch (error) {
    console.error('\n❌ ERRORE DURANTE IL SETUP:', error);
    throw error;
  }
}

// Esegui lo script
if (require.main === module) {
  setupStripeProducts()
    .then(() => {
      console.log('\n✨ Setup completato! I tuoi prodotti Stripe sono pronti.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Setup fallito:', error.message);
      process.exit(1);
    });
}

module.exports = { setupStripeProducts, createSubscriptionPlans, createExtraVideoPrices }; 