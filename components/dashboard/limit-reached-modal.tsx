"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Crown, Plus, AlertTriangle, Sparkles, TrendingUp, Video, Check } from 'lucide-react'
import { useUserLimits } from '@/hooks/use-user-limits'

interface LimitReachedModalProps {
    isOpen: boolean
    onClose: () => void
    onBuyExtra?: () => void
    onUpgrade?: () => void
}

export function LimitReachedModal({
    isOpen,
    onClose,
    onBuyExtra,
    onUpgrade
}: LimitReachedModalProps) {
    const {
        plan,
        videos_per_month,
        videos_used,
        extra_video_price,
        buyExtraVideo
    } = useUserLimits()

    const handleBuyExtra = async () => {
        const success = await buyExtraVideo()
        if (success) {
            onBuyExtra?.()
        }
        onClose()
    }

    const handleUpgrade = () => {
        window.location.href = '/#pricing'
        onUpgrade?.()
        onClose()
    }

    const getUpgradeInfo = () => {
        switch (plan) {
            case 'free':
                return { plan: 'Starter', price: 39, videos: 10, savings: 'Save $51/month vs extra videos' }
            case 'starter':
                return { plan: 'Pro', price: 79, videos: 25, savings: 'Save $91/month vs extra videos' }
            case 'pro':
                return { plan: 'Business', price: 149, videos: 55, savings: 'Save $126/month vs extra videos' }
            default:
                return { plan: 'Enterprise', price: 299, videos: 100, savings: 'Custom plan' }
        }
    }

    const upgradeInfo = getUpgradeInfo()

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="max-w-2xl"
                aria-describedby="limit-dialog-description"
            >
                <DialogHeader>
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold">Limite Video Raggiunto</DialogTitle>
                            <DialogDescription
                                className="text-base mt-1"
                                id="limit-dialog-description"
                            >
                                Hai usato tutti i {videos_per_month} video del piano {plan.charAt(0).toUpperCase() + plan.slice(1)}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">

                    {/* Current Usage */}
                    <Card className="p-4 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-slate-100">
                                    Utilizzo Corrente
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Piano {plan.charAt(0).toUpperCase() + plan.slice(1)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                    {videos_used} / {videos_per_month}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    video utilizzati
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Options */}
                    <div className="grid md:grid-cols-2 gap-4">

                        {/* Buy Extra Video */}
                        <Card className="p-6 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer" onClick={handleBuyExtra}>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <Plus className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Buy 1 Extra Video</h3>
                                        <p className="text-2xl font-bold text-blue-600">${extra_video_price}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Check className="w-4 h-4 text-green-600" />
                                        <span>Disponibile immediatamente</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Check className="w-4 h-4 text-green-600" />
                                        <span>Pagamento una tantum</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Check className="w-4 h-4 text-green-600" />
                                        <span>Stesso piano attuale</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleBuyExtra}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Acquista Ora
                                </Button>
                            </div>
                        </Card>

                        {/* Upgrade Plan */}
                        <Card className="p-6 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 transition-colors cursor-pointer relative overflow-hidden" onClick={handleUpgrade}>

                            {/* Recommended Badge */}
                            <div className="absolute top-3 right-3">
                                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                    Consigliato
                                </Badge>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                        <Crown className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Piano {upgradeInfo.plan}</h3>
                                        <p className="text-2xl font-bold text-purple-600">${upgradeInfo.price}/mese</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Check className="w-4 h-4 text-green-600" />
                                        <span className="font-medium">{upgradeInfo.videos} video/mese</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Check className="w-4 h-4 text-green-600" />
                                        <span>Video extra più economici</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <TrendingUp className="w-4 h-4 text-purple-600" />
                                        <span className="font-medium text-purple-600">{upgradeInfo.savings}</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={handleUpgrade}>
                                    <Crown className="w-4 h-4 mr-2" />
                                    Aggiorna Piano
                                    <Sparkles className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <Video className="w-5 h-5 text-slate-600 mt-0.5" />
                            <div className="space-y-1">
                                <p className="font-medium text-slate-900 dark:text-slate-100">
                                    Perché hai bisogno di più video?
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    I video extra ti permettono di creare contenuti illimitati oltre il tuo piano mensile.
                                    I video acquistati sono disponibili immediatamente e non scadono.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end">
                        <Button variant="outline" onClick={onClose}>
                            Chiudi
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 