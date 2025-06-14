'use client'

import { useEffect, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

// 🚀 Inizializzazione PostHog spostata in un componente per evitare hydration mismatch
function PostHogInit() {
    useEffect(() => {
        // ✅ INIZIALIZZAZIONE SOLO SUL CLIENT per evitare hydration mismatch
        if (typeof window !== 'undefined' && !posthog.__loaded) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
                person_profiles: 'identified_only',

                // 🔥 CONFIGURAZIONI SPECIFICHE PER PRICING ENFORCEMENT
                capture_pageview: true,
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

                // 🚀 FEATURE FLAGS PER A/B TEST SUI PRICING
                bootstrap: {
                    featureFlags: {
                        'limit-enforcement-v2': true,
                        'usage-bar-realtime': true,
                        'pricing-analytics': true
                    }
                },

                // 🔄 CONFIGURAZIONI AVANZATE
                loaded: (posthog) => {
                    console.log('🚀 PostHog initialized for pricing enforcement')

                    // 🎯 CONFIGURA GRUPPI PER PIANI
                    posthog.group('plan', 'free')
                }
            })
        }
    }, [])

    return null
}

export function PostHogProviderWrapper({ children }: { children: React.ReactNode }) {
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
        if (status === 'loading') return

        // 🔥 IDENTIFICA UTENTE CON DATI PIANO
        if (session?.user) {
            posthog.identify(session.user.id, {
                email: session.user.email,
                name: session.user.name,
                // 📊 AGGIUNGI METADATI SPECIFICI PRICING
                $set: {
                    pricing_plan: 'free', // Default, sarà aggiornato
                    subscription_status: 'active',
                    videos_limit: 1,
                    videos_used: 0,
                    can_create_video: true,
                    signup_date: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                },
                // 🎯 GROUPING PER ANALYTICS
                $groups: {
                    plan: 'free', // Sarà aggiornato dinamicamente
                    subscription_tier: 'free'
                }
            })

            console.log('👤 PostHog user identified:', session.user.id)
        } else {
            posthog.reset()
        }
    }, [session, status])

    useEffect(() => {
        if (pathname) {
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
        }
    }, [pathname, searchParams, session])

    return null
} 