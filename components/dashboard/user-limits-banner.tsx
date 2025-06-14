"use client"

import React, { useEffect } from 'react'
import { useUserLimits } from '@/hooks/use-user-limits'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Crown, Zap, AlertTriangle, Plus, Sparkles, TrendingUp, Video, CreditCard } from 'lucide-react'
import { trackLimitEvent, trackPlanSpecificEvent } from '@/lib/posthog-pricing-enforcement'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export function UserLimitsBanner() {
    const { data: session } = useSession()
    const {
        plan,
        videos_per_month,
        videos_used,
        videos_remaining,
        can_create_video,
        extra_video_price,
        loading,
        error,
        buyExtraVideo
    } = useUserLimits()

    useEffect(() => {
        if (!loading && session?.user?.id) {
            trackLimitEvent({
                eventType: 'limit_check',
                userId: session.user.id,
                plan: plan as any,
                videosUsed: videos_used,
                videosLimit: videos_per_month,
                action: 'check_limits',
                metadata: {
                    component: 'user_limits_banner',
                    banner_displayed: true,
                    can_create_video,
                    videos_remaining,
                    usage_percentage: videos_per_month > 0 ? Math.round((videos_used / videos_per_month) * 100) : 0
                }
            })
        }
    }, [loading, session?.user?.id, plan, videos_used, videos_per_month, can_create_video, videos_remaining])

    const handleUpgradeClick = async () => {
        if (!session?.user?.id) {
            window.location.href = '/#pricing'
            return
        }

        // 🚀 TRACCIA TENTATIVO DI UPGRADE INTELLIGENTE
        trackLimitEvent({
            eventType: 'upgrade_shown',
            userId: session.user.id,
            plan: plan as any,
            videosUsed: videos_used,
            videosLimit: videos_per_month,
            action: 'upgrade_attempt',
            metadata: {
                source: 'user_limits_banner',
                button_clicked: 'smart_upgrade_plan',
                upgrade_type: 'smart_automatic',
                current_usage_percentage: videos_per_month > 0 ? Math.round((videos_used / videos_per_month) * 100) : 0
            }
        })

        try {
            // 🎯 CHIAMA L'ENDPOINT SMART UPGRADE
            const response = await fetch(`/api/subscriptions/smart-upgrade/${session.user.id}`)
            const data = await response.json()

            if (data.success && data.stripe_plan_type) {
                // 🚀 CREA CHECKOUT SESSION STRIPE REALE
                toast.success(`Upgrading to ${data.upgrade_to.name}!`, {
                    description: `Creating checkout session for ${data.upgrade_to.price}...`,
                    duration: 3000
                })

                try {
                    // Chiama l'endpoint Stripe esistente per creare la checkout session
                    const stripeResponse = await fetch('/api/stripe/create-checkout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            planType: data.stripe_plan_type  // Es: "STARTER", "PRO", "BUSINESS"
                        })
                    })

                    if (stripeResponse.ok) {
                        const stripeData = await stripeResponse.json()

                        // Traccia upgrade automatico riuscito
                        trackLimitEvent({
                            eventType: 'upgrade_shown',
                            userId: session.user.id,
                            plan: plan as any,
                            videosUsed: videos_used,
                            videosLimit: videos_per_month,
                            action: 'upgrade_attempt',
                            metadata: {
                                source: 'user_limits_banner',
                                upgrade_type: 'smart_redirect_success',
                                current_plan: data.current_plan,
                                upgrade_to: data.upgrade_to.next_plan,
                                stripe_plan_type: data.stripe_plan_type,
                                checkout_url: stripeData.url,
                                price: data.upgrade_to.price
                            }
                        })

                        // Reindirizza al checkout Stripe reale
                        window.location.href = stripeData.url
                    } else {
                        throw new Error('Failed to create Stripe checkout session')
                    }
                } catch (stripeError) {
                    console.error('Stripe checkout error:', stripeError)
                    toast.error('Checkout Error', {
                        description: 'Redirecting to pricing page...',
                        duration: 3000
                    })
                    window.location.href = '/#pricing'
                }
            } else if (data.redirect_url) {
                // 🔄 FALLBACK ALLA PAGINA PRICING
                console.log('Smart upgrade fallback:', data.message)
                window.location.href = data.redirect_url
            } else {
                // ❌ ERRORE - FALLBACK
                console.error('Smart upgrade failed:', data.message)
                toast.error('Upgrade Error', {
                    description: 'Redirecting to pricing page...',
                    duration: 3000
                })
                window.location.href = '/#pricing'
            }
        } catch (error) {
            // ❌ ERRORE DI RETE - FALLBACK
            console.error('Smart upgrade error:', error)
            toast.error('Connection Error', {
                description: 'Redirecting to pricing page...',
                duration: 3000
            })
            window.location.href = '/#pricing'
        }
    }

    const handleBuyExtraVideo = async () => {
        if (session?.user?.id) {
            trackLimitEvent({
                eventType: 'extra_video_purchase',
                userId: session.user.id,
                plan: plan as any,
                videosUsed: videos_used,
                videosLimit: videos_per_month,
                action: 'buy_extra',
                metadata: {
                    source: 'user_limits_banner',
                    button_clicked: 'buy_extra_video',
                    extra_video_price,
                    current_usage_percentage: videos_per_month > 0 ? Math.round((videos_used / videos_per_month) * 100) : 0
                }
            })
        }

        const success = await buyExtraVideo()
        if (success) {
            toast.success('Redirecting to Stripe for payment...', {
                description: 'You will be redirected to complete your extra video purchase.',
            })
        } else {
            toast.error('Failed to start purchase process', {
                description: 'Please try again later or contact support.',
            })
        }
    }

    useEffect(() => {
        if (!can_create_video && !loading && session?.user?.id) {
            trackLimitEvent({
                eventType: 'limit_exceeded',
                userId: session.user.id,
                plan: plan as any,
                videosUsed: videos_used,
                videosLimit: videos_per_month,
                action: 'create_video',
                metadata: {
                    banner_shows_limit_reached: true,
                    component: 'user_limits_banner',
                    limit_reached_display: true
                }
            })
        }
    }, [can_create_video, loading, session?.user?.id, plan, videos_used, videos_per_month])

    if (loading) {
        return (
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 mb-8 border-slate-200/60 dark:border-slate-700/60">
                <div className="p-6 sm:p-8">
                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-3">
                            <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-6 w-6 rounded-xl"></div>
                            <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-6 w-24 rounded-full"></div>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-4 w-48 rounded"></div>
                        <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-3 w-full rounded-full"></div>
                    </div>
                </div>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="p-6 mb-8 border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/20 dark:border-red-800/50">
                <div className="flex items-center space-x-3 text-red-700 dark:text-red-300">
                    <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-medium">Unable to load subscription status</p>
                        <p className="text-sm text-red-600 dark:text-red-400">Please refresh the page or contact support</p>
                    </div>
                </div>
            </Card>
        )
    }

    const usagePercentage = videos_per_month > 0 ? (videos_used / videos_per_month) * 100 : 0
    const planIcon = plan === 'free' ? Zap : Crown

    // 🎯 DETERMINE BANNER STYLE BASED ON LIMIT STATUS
    const isLimitReached = !can_create_video
    const isLowOnVideos = videos_remaining <= 2 && videos_remaining > 0

    const bannerColorClasses = isLimitReached
        ? "bg-gradient-to-br from-amber-50 via-orange-50 to-red-50/50 dark:from-amber-900/10 dark:via-orange-900/10 dark:to-red-900/10 border border-amber-300/60 dark:border-amber-700/60 shadow-md shadow-amber-200/30 dark:shadow-amber-900/20"
        : isLowOnVideos
            ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 shadow-lg shadow-amber-200/20 dark:shadow-amber-900/20"
            : "bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-blue-900/10 border border-slate-200/60 dark:border-slate-700/60 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20"

    return (
        <Card className={`relative overflow-hidden mb-6 backdrop-blur-sm ${bannerColorClasses}`}>
            {/* Background Pattern - More Subtle */}
            <div className={`absolute inset-0 ${isLimitReached
                ? "bg-gradient-to-r from-amber-500/[0.01] via-orange-500/[0.01] to-red-500/[0.01]"
                : "bg-gradient-to-r from-transparent via-blue-500/[0.02] to-purple-500/[0.02]"
                }`}></div>
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl ${isLimitReached
                ? "bg-gradient-conic from-amber-500/5 via-orange-500/5 to-red-500/5"
                : "bg-gradient-conic from-blue-500/5 via-purple-500/5 to-pink-500/5"
                }`}></div>

            <div className="relative p-4 sm:p-6">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0 xl:space-x-6">

                    {/* Plan Info & Usage */}
                    <div className="flex-1 space-y-4">
                        {/* Header - More Compact */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg transition-all duration-300 ${isLimitReached
                                    ? 'bg-amber-100 dark:bg-amber-900/20'
                                    : plan === 'free'
                                        ? 'bg-slate-100 dark:bg-slate-800'
                                        : 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 shadow-lg shadow-yellow-500/10'
                                    }`}>
                                    {React.createElement(planIcon, {
                                        className: `w-5 h-5 transition-all duration-300 ${isLimitReached
                                            ? 'text-amber-600 dark:text-amber-400'
                                            : plan === 'free'
                                                ? 'text-slate-600 dark:text-slate-400'
                                                : 'text-yellow-600 dark:text-yellow-400'
                                            }`
                                    })}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge
                                        variant={plan === 'free' ? 'secondary' : 'default'}
                                        className={`text-xs font-medium px-2.5 py-1 transition-all duration-300 ${isLimitReached
                                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'
                                            : plan === 'free'
                                                ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                                            }`}
                                    >
                                        {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
                                    </Badge>

                                    {isLimitReached && (
                                        <Badge variant="secondary" className="text-xs bg-amber-200 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 animate-pulse">
                                            <AlertTriangle className="w-3 h-3 mr-1" />
                                            Limit Reached
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Usage Section - More Compact */}
                        <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                    Video usage this month
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <span className={`text-xl font-bold bg-gradient-to-r ${isLimitReached
                                        ? 'from-amber-600 to-orange-600'
                                        : 'from-blue-600 to-purple-600'
                                        } bg-clip-text text-transparent`}>
                                        {videos_used}
                                    </span>
                                    <span className="text-base text-slate-500 dark:text-slate-400">
                                        / {videos_per_month}
                                    </span>
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        videos
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar - Slightly Smaller */}
                            <div className="space-y-2">
                                <div className="relative">
                                    <Progress
                                        value={usagePercentage}
                                        className={`h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full shadow-inner ${usagePercentage >= 100 ? '[&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600' :
                                            usagePercentage >= 80 ? '[&>div]:bg-gradient-to-r [&>div]:from-yellow-500 [&>div]:to-orange-500' :
                                                '[&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-emerald-500'
                                            } [&>div]:shadow-lg [&>div]:transition-all [&>div]:duration-700 [&>div]:ease-out`}
                                    />
                                    {usagePercentage > 15 && (
                                        <div className="absolute inset-y-0 left-2 flex items-center">
                                            <span className="text-xs font-bold text-white drop-shadow-sm">
                                                {Math.round(usagePercentage)}%
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                                    <span className={`text-sm font-medium transition-colors duration-300 ${isLimitReached
                                        ? 'text-amber-700 dark:text-amber-300'
                                        : videos_remaining > 0
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-orange-600 dark:text-orange-400'
                                        }`}>
                                        {isLimitReached ? (
                                            <>
                                                <span className="hidden sm:inline">You've used all {videos_per_month} video{videos_per_month > 1 ? 's' : ''} • Extra videos at ${extra_video_price} each</span>
                                                <span className="sm:hidden">All {videos_per_month} video{videos_per_month > 1 ? 's' : ''} used • ${extra_video_price} each</span>
                                            </>
                                        ) : videos_remaining > 0 ? (
                                            <>✨ {videos_remaining} videos remaining</>
                                        ) : (
                                            <>🎯 Extra videos at ${extra_video_price} each</>
                                        )}
                                    </span>

                                    {isLowOnVideos && !isLimitReached && (
                                        <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full animate-pulse font-medium">
                                            Running low!
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons - More Compact */}
                    <div className="flex flex-col sm:flex-row xl:flex-col space-y-2 sm:space-y-0 sm:space-x-3 xl:space-x-0 xl:space-y-2 xl:min-w-[200px]">

                        {/* 🎯 LIMIT REACHED - SHOW BOTH OPTIONS */}
                        {isLimitReached && (
                            <>
                                {/* Buy Extra Video - Primary Action */}
                                <Button
                                    onClick={handleBuyExtraVideo}
                                    size="default"
                                    className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 border-0 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Buy Extra Video
                                    <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-xs font-bold">
                                        ${extra_video_price}
                                    </span>
                                </Button>

                                {/* Upgrade Plan - Secondary Action */}
                                <Button
                                    onClick={handleUpgradeClick}
                                    size="default"
                                    variant="outline"
                                    className="group border border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/10 text-amber-700 dark:text-amber-300 relative overflow-hidden"
                                >
                                    <Crown className="w-4 h-4 mr-2" />
                                    Upgrade Plan
                                    <Sparkles className="w-3 h-3 ml-2" />
                                </Button>
                            </>
                        )}

                        {/* 🟡 LOW ON VIDEOS - SHOW WARNING */}
                        {isLowOnVideos && !isLimitReached && (
                            <Button
                                onClick={handleUpgradeClick}
                                size="default"
                                className="group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 border-0 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                <Crown className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12 duration-300" />
                                Upgrade Plan
                                <Sparkles className="w-3 h-3 ml-2 transition-transform group-hover:scale-110 duration-300" />
                            </Button>
                        )}

                        {/* 🟢 FREE PLAN - STANDARD UPGRADE */}
                        {plan === 'free' && can_create_video && !isLowOnVideos && (
                            <Button
                                asChild
                                size="default"
                                className="group bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 border-0 relative overflow-hidden"
                            >
                                <a href="/#pricing">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <Crown className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12 duration-300" />
                                    Upgrade Plan
                                    <Sparkles className="w-3 h-3 ml-2 transition-transform group-hover:scale-110 duration-300" />
                                </a>
                            </Button>
                        )}

                        {/* 🚀 PAID PLAN - ALL GOOD */}
                        {plan !== 'free' && can_create_video && !isLowOnVideos && (
                            <div className="text-center md:hidden bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-200/50 dark:border-green-800/50">
                                <div className="flex items-center justify-center xl:justify-start space-x-2 mb-1">
                                    <span className="text-base">🚀</span>
                                    <p className="font-medium text-green-700 dark:text-green-300 text-sm">
                                        You're all set!
                                    </p>
                                </div>
                                <p className="text-xs text-green-600 dark:text-green-400 opacity-80">
                                    Enjoying your {plan} plan
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 💡 LIMIT REACHED - BOTTOM INFO (Versione Compatta) */}
                {isLimitReached && (
                    <div className="mt-4 pt-4 border-t border-amber-200/60 dark:border-amber-800/60">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-amber-600 dark:text-amber-400 space-y-1 sm:space-y-0">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1.5">
                                    <CreditCard className="w-3.5 h-3.5" />
                                    <span>Secure payment with Stripe</span>
                                </div>
                                <div className="flex items-center space-x-1.5">
                                    <Zap className="w-3.5 h-3.5" />
                                    <span>Video available immediately</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1.5">
                                <Video className="w-3.5 h-3.5" />
                                <span className="font-medium">
                                    {plan === 'free' ? 'Starter' :
                                        plan === 'starter' ? 'Pro' :
                                            plan === 'pro' ? 'Business' : 'Enterprise'} plan
                                    from ${plan === 'free' ? '39' :
                                        plan === 'starter' ? '79' :
                                            plan === 'pro' ? '149' : '299'}/month
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
} 