"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Instagram, PlayCircle, Users, Square } from "lucide-react"
import { toast } from "sonner"

interface PlatformSelectionStepProps {
    selectedPlatform: string
    onPlatformSelect: (platform: string) => void
}

const PLATFORMS = [
    {
        id: "instagram",
        name: "Instagram",
        icon: Instagram,
        emoji: "📸",
        aspectRatio: "9:16",
        description: "Stories, Reels, and Feed posts",
        color: "from-pink-500 to-rose-600",
        bgColor: "from-pink-50 to-rose-50",
        darkBgColor: "from-pink-900/20 to-rose-900/20",
        features: ["Stories", "Reels", "Feed posts"]
    },
    {
        id: "tiktok",
        name: "TikTok",
        icon: PlayCircle,
        emoji: "🎵",
        aspectRatio: "9:16",
        description: "Short-form vertical videos",
        color: "from-purple-500 to-violet-600",
        bgColor: "from-purple-50 to-violet-50",
        darkBgColor: "from-purple-900/20 to-violet-900/20",
        features: ["Vertical", "Short-form", "Music"]
    },
    {
        id: "youtube",
        name: "YouTube",
        icon: PlayCircle,
        emoji: "📺",
        aspectRatio: "16:9",
        description: "Horizontal videos and Shorts",
        color: "from-red-500 to-orange-600",
        bgColor: "from-red-50 to-orange-50",
        darkBgColor: "from-red-900/20 to-orange-900/20",
        features: ["Horizontal", "Shorts", "Long-form"]
    },
    {
        id: "facebook",
        name: "Facebook",
        icon: Users,
        emoji: "👥",
        aspectRatio: "1:1",
        description: "Square and horizontal videos",
        color: "from-blue-500 to-indigo-600",
        bgColor: "from-blue-50 to-indigo-50",
        darkBgColor: "from-blue-900/20 to-indigo-900/20",
        features: ["Square", "Feed", "Stories"]
    }
]

export function PlatformSelectionStep({ selectedPlatform, onPlatformSelect }: PlatformSelectionStepProps) {
    const handlePlatformSelect = (platformId: string) => {
        const platform = PLATFORMS.find(p => p.id === platformId)
        onPlatformSelect(platformId)

        if (platform) {
            toast.success(`${platform.name} selected!`, {
                description: `Video optimized for ${platform.aspectRatio} format`,
                icon: platform.emoji,
                duration: 1500
            })
        }
    }

    const selectedPlatformData = PLATFORMS.find(p => p.id === selectedPlatform)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Square className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Where will you share your video?
                </h2>
                <p className="text-gray-600 dark:text-slate-400 max-w-lg mx-auto">
                    Each platform has different video formats and audience behaviors.
                    We'll optimize your video accordingly.
                </p>
            </div>

            {/* Platform Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PLATFORMS.map((platform) => {
                    const Icon = platform.icon
                    const isSelected = selectedPlatform === platform.id

                    return (
                        <Card
                            key={platform.id}
                            className={`cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] ${isSelected
                                ? `border-emerald-500 bg-gradient-to-br ${platform.bgColor} dark:${platform.darkBgColor} shadow-lg`
                                : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 bg-white dark:bg-slate-800'
                                }`}
                            onClick={() => handlePlatformSelect(platform.id)}
                        >
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {/* Platform Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-full flex items-center justify-center`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {platform.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-slate-400">
                                                    {platform.description}
                                                </p>
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <div className="bg-emerald-600 rounded-full p-2">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Aspect Ratio Badge */}
                                    <div className="flex items-center justify-between">
                                        <Badge
                                            variant="outline"
                                            className={`text-sm font-medium ${isSelected
                                                ? 'border-emerald-300 text-emerald-700 dark:text-emerald-300'
                                                : 'border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300'
                                                }`}
                                        >
                                            📐 {platform.aspectRatio}
                                        </Badge>
                                        <span className="text-2xl">{platform.emoji}</span>
                                    </div>

                                    {/* Features */}
                                    <div className="flex gap-2 flex-wrap">
                                        {platform.features.map((feature) => (
                                            <Badge
                                                key={feature}
                                                variant="secondary"
                                                className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                            >
                                                {feature}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Visual Representation */}
                                    <div className="flex justify-center pt-2">
                                        <div className={`relative ${platform.aspectRatio === '9:16' ? 'w-8 h-12' :
                                            platform.aspectRatio === '16:9' ? 'w-12 h-7' :
                                                'w-10 h-10'
                                            } bg-gradient-to-br ${platform.color} rounded-lg opacity-60`}>
                                            <div className="absolute inset-1 bg-white dark:bg-slate-800 rounded opacity-80"></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default PlatformSelectionStep 