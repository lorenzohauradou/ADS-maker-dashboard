#!/usr/bin/env node
/**
 * Script per creare i price IDs di Stripe per i video extra
 * 
 * Esegui con: node setup-stripe-prices.js
 */

const Stripe = require('stripe');
require('dotenv').config({ path: '.env' });

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY non trovato nel file .env.local');
  console.log('💡 Assicurati di avere STRIPE_SECRET_KEY nel tuo file .env.local');
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createExtraVideoPrices() {
  console.log('🚀 Creazione Price IDs per video extra...\n');

  const extraVideoPrices = [
    {
      name: 'Extra Video - Free Plan',
      price: 9.00,
      envVar: 'STRIPE_EXTRA_VIDEO_FREE_PRICE_ID'
    },
    {
      name: 'Extra Video - Starter Plan',
      price: 7.00,
      envVar: 'STRIPE_EXTRA_VIDEO_STARTER_PRICE_ID'
    },
    {
      name: 'Extra Video - Pro Plan',
      price: 5.00,
      envVar: 'STRIPE_EXTRA_VIDEO_PRO_PRICE_ID'
    },
    {
      name: 'Extra Video - Business Plan',
      price: 3.00,
      envVar: 'STRIPE_EXTRA_VIDEO_BUSINESS_PRICE_ID'
    }
  ];

  const createdPrices = [];

  for (const extraVideo of extraVideoPrices) {
    try {
      console.log(`📝 Creando price per ${extraVideo.name}...`);
      
      // Crea il prodotto prima
      const product = await stripe.products.create({
        name: extraVideo.name,
        description: `Acquista 1 video extra per il tuo piano. Disponibile immediatamente dopo il pagamento.`,
        type: 'service',
        metadata: {
          type: 'extra_video',
          plan: extraVideo.name.toLowerCase().includes('free') ? 'free' :
                extraVideo.name.toLowerCase().includes('starter') ? 'starter' :
                extraVideo.name.toLowerCase().includes('pro') ? 'pro' : 'business'
        }
      });

      // Crea il price
      const price = await stripe.prices.create({
        unit_amount: Math.round(extraVideo.price * 100), // Converti in centesimi
        currency: 'usd',
        product: product.id,
        metadata: {
          type: 'extra_video',
          plan: product.metadata.plan
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

  // Mostra riepilogo e variabili d'ambiente
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Price IDs creati con successo!');
  console.log('='.repeat(60));
  
  console.log('\n📋 Aggiungi queste variabili al tuo file .env.local:\n');
  
  createdPrices.forEach(price => {
    console.log(`${price.envVar}=${price.priceId}`);
  });

  console.log('\n💡 Copia e incolla queste variabili nel tuo file .env.local per sviluppo.');
  console.log('🚀 Per produzione, aggiungi le stesse variabili su Vercel o nel tuo deployment.');
  console.log('🔗 Puoi verificare i prezzi nel dashboard di Stripe: https://dashboard.stripe.com/prices');
  
  return createdPrices;
}

// Esegui lo script
if (require.main === module) {
  createExtraVideoPrices()
    .then(() => {
      console.log('\n✨ Setup completato! Ora puoi testare l\'acquisto di video extra.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Errore durante il setup:', error);
      process.exit(1);
    });
}

module.exports = { createExtraVideoPrices }; 