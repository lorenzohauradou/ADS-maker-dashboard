import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/providers/session-provider'
import { PostHogProviderWrapper } from '@/components/providers/posthog-provider'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'

export const metadata: Metadata = {
  title: {
    default: 'Fast Ads AI - Create Viral Video Ads in Minutes | AI-Powered Ad Maker for Dropshippers',
    template: '%s | Fast Ads AI'
  },
  description: 'Create professional video ads in minutes with AI. Perfect for dropshippers, ecommerce & social media marketing. Turn product images into viral TikTok, Instagram & Facebook ads instantly.',
  keywords: [
    'AI video ads maker',
    'dropshipping video ads',
    'TikTok ads creator',
    'Instagram video ads',
    'Facebook ads maker',
    'AI ad generator',
    'product video maker',
    'ecommerce video ads',
    'social media ads',
    'fast video ads',
    'viral ad creator',
    'automated ad maker',
    'AI marketing tools',
    'dropshipper tools',
    'video ad automation'
  ],
  authors: [{ name: 'Fast Ads AI Team' }],
  creator: 'Fast Ads AI',
  publisher: 'Fast Ads AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fastadsai.com',
    siteName: 'Fast Ads AI',
    title: 'Fast Ads AI - Create Viral Video Ads in Minutes',
    description: 'Turn your product images into viral video ads instantly. Perfect for dropshippers & ecommerce. AI-powered TikTok, Instagram & Facebook ads in 3 minutes.',
    images: [
      {
        url: 'https://fastadsai.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fast Ads AI - AI Video Ad Creator for Dropshippers',
        type: 'image/png',
      },
      {
        url: 'https://fastadsai.com/logo.png', // Usando logo esistente
        width: 1200,
        height: 1200,
        alt: 'Fast Ads AI - Square Logo for Social Media',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FastAdsAI',
    creator: '@FastAdsAI',
    title: 'Fast Ads AI - Create Viral Video Ads in Minutes',
    description: 'Turn product images into viral TikTok & Instagram ads with AI. Perfect for dropshippers. Create professional video ads in minutes! 🚀',
    images: ['https://fastadsai.com/twitter-image.png'],
  },
  verification: {
    // Google Search Console verificato tramite DNS
    // Non serve meta tag per questo metodo
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://fastadsai.com',
  },
  category: 'Technology',
  classification: 'AI Marketing Tools',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Fast Ads AI',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#6366f1',
    'theme-color': '#6366f1',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon and manifest */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/fastadslogo.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Additional meta tags for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Fast Ads AI",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "description": "AI-powered video ad creation tool for dropshippers and ecommerce businesses. Create viral TikTok, Instagram, and Facebook ads in minutes.",
              "url": "https://fastadsai.com",
              "author": {
                "@type": "Organization",
                "name": "Fast Ads AI"
              },
              "offers": {
                "@type": "Offer",
                "category": "SaaS",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              },
              "features": [
                "AI-powered video ad creation",
                "Multi-platform support (TikTok, Instagram, Facebook)",
                "Automated script generation",
                "Product image analysis",
                "Professional landing pages",
                "3-minute ad creation"
              ]
            })
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Fast Ads AI",
              "url": "https://fastadsai.com",
              "logo": "https://fastadsai.com/logo.png",
              "description": "AI-powered video ad creation platform for dropshippers and ecommerce businesses",
              "sameAs": [
                "https://x.com/FastAdsAI",
                "https://linkedin.com/company/fastadsai",
                "https://youtube.com/@FastAdsAI"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English", "Italian", "French"],
                "url": "https://fastadsai.com/contact"
              }
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long does it really take to create a video?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The complete process takes 3-5 minutes: 30 seconds to upload images, 1-2 minutes for AI analysis, 1-2 minutes for video generation, and 30 seconds for download. It's literally faster than making coffee!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which types of businesses work best?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "FAST ADS AI is optimized for e-commerce, SaaS, professional services, mobile apps, restaurants, and retail. The AI automatically recognizes your product type and adapts voice, script, and style accordingly."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does the voice really sound human?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We use the most advanced TTS technology available. The voice is indistinguishable from a professional actor, with natural intonation, correct pauses, and emphasis on key points."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there a watermark in the free plan?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The free plan does NOT include any watermark. This plan is designed to let you test the quality."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which social platforms can I publish videos to?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Videos are automatically optimized for Instagram (Feed, Stories, Reels), TikTok, YouTube (Shorts and standard videos), Facebook, LinkedIn, and Pinterest. Each format has perfect dimensions and duration to maximize engagement."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          <PostHogProviderWrapper>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </PostHogProviderWrapper>
        </AuthProvider>

        {/* Google Analytics 4 - Replace with your GA4 tracking ID */}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
