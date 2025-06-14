'use client'

import { useEffect, Suspense, useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

// 🚀 Inizializzazione PostHog spostata in un componente per evitare hydration mismatch
function PostHogInit() {
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        // ✅ INIZIALIZZAZIONE SOLO SUL CLIENT per evitare hydration mismatch
        if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY && !isInitialized) {
            try {
                posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
                    person_profiles: 'identified_only',
                    capture_pageview: false, // Disabilitiamo per evitare duplicati
                    capture_pageleave: true,

                    // 📊 CONFIGURAZIONI PER TRACCIAMENTO SESSIONI
                    session_recording: {
                        recordCrossOriginIframes: true,
                        recordHeaders: true,
                        recordBody: false
                    },

                    // 🎯 AUTOCAPTURE SPECIFICO PER LIMITI
                    autocapture: {
                        css_selector_allowlist: [
                            '[data-ph-capture="true"]',
                            '.upgrade-button',
                            '.buy-extra-video',
                            '.usage-bar',
                            '.limit-exceeded',
                            '.create-video-button'
                        ],
                        element_allowlist: ['button', 'a'],
                        url_allowlist: ['/dashboard', '/pricing', '/checkout']
                    },

                    // 🔄 CONFIGURAZIONI AVANZATE
                    loaded: (posthog) => {
                        console.log('🚀 PostHog initialized successfully')
                        posthog.group('plan', 'free')
                        setIsInitialized(true)
                    }
                })
            } catch (error) {
                console.error('❌ PostHog initialization failed:', error)
            }
        }
    }, [isInitialized])

    return null
}

export function PostHogProviderWrapper({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <>{children}</>
    }

    return (
        <PostHogProvider client={posthog}>
            <PostHogInit />
            <Suspense fallback={null}>
                <PostHogPageView />
            </Suspense>
            {children}
        </PostHogProvider>
    )
}

function PostHogPageView(): null {
    const { data: session, status } = useSession()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (status === 'loading' || typeof window === 'undefined') return

        // 🔥 IDENTIFICA UTENTE CON DATI PIANO
        if (session?.user) {
            try {
                posthog.identify(session.user.id, {
                    email: session.user.email,
                    name: session.user.name,
                    // 📊 AGGIUNGI METADATI SPECIFICI PRICING
                    $set: {
                        pricing_plan: 'free',
                        subscription_status: 'active',
                        videos_limit: 1,
                        videos_used: 0,
                        can_create_video: true,
                        signup_date: new Date().toISOString(),
                        last_login: new Date().toISOString(),
                    },
                    // 🎯 GROUPING PER ANALYTICS
                    $groups: {
                        plan: 'free',
                        subscription_tier: 'free'
                    }
                })

                console.log('👤 PostHog user identified:', session.user.id)
            } catch (error) {
                console.error('❌ PostHog user identification failed:', error)
            }
        } else {
            try {
                posthog.reset()
            } catch (error) {
                console.error('❌ PostHog reset failed:', error)
            }
        }
    }, [session, status])

    useEffect(() => {
        if (pathname && typeof window !== 'undefined') {
            try {
                let url = window.origin + pathname
                if (searchParams && searchParams.toString()) {
                    url = url + '?' + searchParams.toString()
                }

                // 🔥 TRACCIA PAGEVIEW CON CONTESTO PRICING
                posthog.capture('$pageview', {
                    $current_url: url,
                    // 📊 METADATI SPECIFICI PER PRICING PAGES
                    page_type: pathname.includes('/dashboard') ? 'dashboard' :
                        pathname.includes('/pricing') ? 'pricing' :
                            pathname.includes('/checkout') ? 'checkout' : 'other',
                    user_authenticated: !!session?.user,
                    plan_context: session?.user ? 'authenticated' : 'anonymous'
                })
            } catch (error) {
                console.error('❌ PostHog pageview tracking failed:', error)
            }
        }
    }, [pathname, searchParams, session])

    return null
} 