import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/providers/session-provider'

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
        url: 'https://fastadsai.com/og-square.png', // manca
        width: 1200,
        height: 1200,
        alt: 'Fast Ads AI Logo',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FastAdsAI',
    creator: '@FastAdsAI',
    title: 'Fast Ads AI - Create Viral Video Ads in Minutes',
    description: 'Turn product images into viral TikTok & Instagram ads with AI. Perfect for dropshippers. Create professional video ads in 3 minutes! 🚀',
    images: ['https://fastadsai.com/twitter-image.png'],
  },
  verification: {
    google: 'your-google-site-verification-code',
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
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>

        {/* Google Analytics 4 - Replace with your GA4 tracking ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_TRACKING_ID');
            `,
          }}
        />
      </body>
    </html>
  )
}
