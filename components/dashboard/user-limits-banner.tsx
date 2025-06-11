"use client"

import React from 'react'
import { useUserLimits } from '@/hooks/use-user-limits'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Crown, Zap, AlertTriangle, Plus, Sparkles } from 'lucide-react'

export function UserLimitsBanner() {
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

    return (
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-blue-900/10 border border-slate-200/60 dark:border-slate-700/60 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 mb-8 backdrop-blur-sm">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/[0.02] to-purple-500/[0.02]"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-conic from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-2xl"></div>

            <div className="relative p-6 sm:p-8">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-8">

                    {/* Plan Info & Usage */}
                    <div className="flex-1 space-y-6">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className={`p-2.5 rounded-xl transition-all duration-300 ${plan === 'free'
                                    ? 'bg-slate-100 dark:bg-slate-800'
                                    : 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 shadow-lg shadow-yellow-500/10'
                                    }`}>
                                    {React.createElement(planIcon, {
                                        className: `w-6 h-6 transition-all duration-300 ${plan === 'free' ? 'text-slate-600 dark:text-slate-400' : 'text-yellow-600 dark:text-yellow-400'
                                            }`
                                    })}
                                </div>
                                <div>
                                    <Badge
                                        variant={plan === 'free' ? 'secondary' : 'default'}
                                        className={`text-sm font-semibold px-3 py-1.5 transition-all duration-300 ${plan === 'free'
                                            ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105'
                                            }`}
                                    >
                                        {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
                                    </Badge>
                                </div>
                            </div>

                            {!can_create_video && (
                                <Badge variant="destructive" className="animate-pulse self-start sm:self-center bg-red-500/90 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300">
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    Limit Reached
                                </Badge>
                            )}
                        </div>

                        {/* Usage Section */}
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Video usage this month
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {videos_used}
                                    </span>
                                    <span className="text-lg text-slate-500 dark:text-slate-400">
                                        / {videos_per_month}
                                    </span>
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        videos
                                    </span>
                                </div>
                            </div>

                            {/* Enhanced Progress Bar */}
                            <div className="space-y-3">
                                <div className="relative">
                                    <Progress
                                        value={usagePercentage}
                                        className={`h-3 bg-slate-200 dark:bg-slate-700 rounded-full shadow-inner ${usagePercentage >= 100 ? '[&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600' :
                                            usagePercentage >= 80 ? '[&>div]:bg-gradient-to-r [&>div]:from-yellow-500 [&>div]:to-orange-500' :
                                                '[&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-emerald-500'
                                            } [&>div]:shadow-lg [&>div]:transition-all [&>div]:duration-700 [&>div]:ease-out`}
                                    />
                                    {usagePercentage > 10 && (
                                        <div className="absolute inset-y-0 left-2 flex items-center">
                                            <span className="text-xs font-bold text-white drop-shadow-sm">
                                                {Math.round(usagePercentage)}%
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className={`text-sm font-medium transition-colors duration-300 ${videos_remaining > 0
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-orange-600 dark:text-orange-400'
                                        }`}>
                                        {videos_remaining > 0 ? (
                                            <>✨ {videos_remaining} videos remaining</>
                                        ) : (
                                            <>🎯 Extra videos at ${extra_video_price} each</>
                                        )}
                                    </span>

                                    {videos_remaining <= 2 && videos_remaining > 0 && (
                                        <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full animate-pulse font-medium">
                                            Running low!
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-col sm:flex-row xl:flex-col space-y-3 sm:space-y-0 sm:space-x-3 xl:space-x-0 xl:space-y-3 xl:min-w-[200px]">
                        {!can_create_video && (
                            <Button
                                onClick={buyExtraVideo}
                                size="lg"
                                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 border-0 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                <Plus className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90 duration-300" />
                                Buy Extra Video
                                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs font-bold group-hover:bg-white/30 transition-colors duration-300">
                                    ${extra_video_price}
                                </span>
                            </Button>
                        )}

                        {plan === 'free' && (
                            <Button
                                asChild
                                size="lg"
                                className="group bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 border-0 relative overflow-hidden"
                            >
                                <a href="/#pricing">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <Crown className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12 duration-300" />
                                    Upgrade Plan
                                    <Sparkles className="w-4 h-4 ml-2 transition-transform group-hover:scale-110 duration-300" />
                                </a>
                            </Button>
                        )}

                        {plan !== 'free' && can_create_video && (
                            <div className="text-center xl:text-left bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200/50 dark:border-green-800/50">
                                <div className="flex items-center justify-center xl:justify-start space-x-2 mb-1">
                                    <span className="text-lg">🚀</span>
                                    <p className="font-semibold text-green-700 dark:text-green-300">
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
            </div>
        </Card>
    )
} 