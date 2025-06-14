'use client'

import { useEffect } from 'react'

export function GoogleAnalytics() {
    useEffect(() => {
        // ✅ CARICA GOOGLE ANALYTICS SOLO SUL CLIENT
        const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

        if (GA_TRACKING_ID && typeof window !== 'undefined') {
            // Carica lo script gtag
            const script = document.createElement('script')
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
            script.async = true
            document.head.appendChild(script)

            // Inizializza gtag quando lo script è caricato
            script.onload = () => {
                ; (window as any).dataLayer = (window as any).dataLayer || []
                function gtag(...args: any[]) {
                    ; (window as any).dataLayer.push(args)
                }
                ; (window as any).gtag = gtag

                gtag('js', new Date())
                gtag('config', GA_TRACKING_ID)

                console.log('🚀 Google Analytics initialized')
            }
        }
    }, [])

    return null
} 