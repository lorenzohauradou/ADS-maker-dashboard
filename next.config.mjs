/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // errori ESLint in produzione
    ignoreDuringBuilds: process.env.NODE_ENV === "development",
  },
  typescript: {
    // errori TypeScript in produzione  
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },
  images: {
    // OTTIMIZZAZIONI PRODUZIONE
    unoptimized: false, // Abilita ottimizzazione immagini
    domains: [
      'localhost',
      'via.placeholder.com',
      // Aggiungi i domini Supabase se configurati
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').replace('.supabase.co', '.supabase.co'),
    ].filter(Boolean),
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // CONFIGURAZIONI PRODUZIONE
  experimental: {
    optimizeCss: true,
  },
  // HEADERS SICUREZZA
  async headers() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin'
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block'
            }
          ]
        }
      ]
    }
    return []
  },
  // OTTIMIZZAZIONI BUNDLE
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      // Minimizza bundle per produzione
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname),
      }
    }
    return config
  },
}

export default nextConfig
