'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Video, Upload } from 'lucide-react'
import { ActiveTab } from '../types'

interface FeatureOverviewCardsProps {
    activeTab: ActiveTab
    onTabChange: (tab: ActiveTab) => void
}

export function FeatureOverviewCards({ activeTab, onTabChange }: FeatureOverviewCardsProps) {
    const features = [
        {
            id: 'avatar-creator' as ActiveTab,
            icon: User,
            title: 'Custom Avatar',
            description: 'Create unique avatars from text descriptions',
            color: 'blue',
            bgColor: 'bg-blue-100 dark:bg-blue-900/20',
            iconColor: 'text-blue-600 dark:text-blue-400'
        },
        {
            id: 'multi-scene' as ActiveTab,
            icon: Video,
            title: 'Multi-Scene Videos',
            description: 'Complex videos with multiple scenes',
            color: 'purple',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20',
            iconColor: 'text-purple-600 dark:text-purple-400'
        },
        {
            id: 'upload-avatar' as ActiveTab,
            icon: Upload,
            title: 'Upload Avatar',
            description: 'Use your own video as avatar',
            color: 'green',
            bgColor: 'bg-green-100 dark:bg-green-900/20',
            iconColor: 'text-green-600 dark:text-green-400',
            badge: 'Ready to Use'
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => {
                const IconComponent = feature.icon
                const isActive = activeTab === feature.id

                return (
                    <Card
                        key={feature.id}
                        className={`border-slate-200 dark:border-zinc-700 hover:shadow-lg transition-all cursor-pointer group ${isActive ? 'ring-2 ring-blue-500/20 border-blue-300 dark:border-blue-600' : ''
                            }`}
                        onClick={() => onTabChange(feature.id)}
                    >
                        <CardContent className="p-6 text-center">
                            <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                            </div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-zinc-400 mb-3">
                                {feature.description}
                            </p>
                            {feature.badge && (
                                <Badge
                                    variant="secondary"
                                    className="bg-green-100 text-green-700 text-xs"
                                >
                                    {feature.badge}
                                </Badge>
                            )}
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
} 