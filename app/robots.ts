import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://fastadsai.com' 
    : 'http://localhost:3000'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/api/',
        '/login/',
        '/auth/',
        '/admin/',
        '/private/',
        '/_next/',
        '/temp_sites/',
        '*.json$',
        '/*?*',  // Parametri URL dinamici
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
} 