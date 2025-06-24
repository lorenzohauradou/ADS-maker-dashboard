/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora errori ESLint durante il build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora errori TypeScript durante il build
    ignoreBuildErrors: true,
  },
  images: {
    // OTTIMIZZAZIONI PRODUZIONE SEO
    unoptimized: false, // Abilita ottimizzazione immagini
    formats: ['image/webp', 'image/avif'], // Formati moderni per performance
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      // Pattern per Supabase (se configurato)
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL ? [{
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '').split('/')[0],
        port: '',
        pathname: '/**',
      }] : []),
      // Pattern per Creatify CDN
      {
        protocol: 'https',
        hostname: '*.creatify.ai',
        port: '',
        pathname: '/**',
      },
      // Pattern per immagini generiche CDN
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
        port: '',
        pathname: '/**',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
  },
  
  // 🌐 CONFIGURAZIONE DEV ORIGINS per risolvere warning cross-origin
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: [
      // IP locale automatico
      '10.55.64.64:3000',
      // Altri IP comuni della rete locale
      '192.168.1.*:3000',
      '192.168.0.*:3000', 
      '10.0.0.*:3000',
      // Per testing mobile su rete locale
      'localhost:3000',
      '127.0.0.1:3000'
    ]
  }),
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
      }
    }
    return config
  },
}

export default nextConfig
