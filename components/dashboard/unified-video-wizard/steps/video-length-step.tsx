"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, Zap, BarChart, Film } from "lucide-react"
import { toast } from "sonner"

interface VideoLengthStepProps {
    selectedLength: number
    platform: string
    onLengthSelect: (length: number) => void
}

const VIDEO_LENGTHS = [
    {
        duration: 15,
        name: "Quick & Punchy",
        icon: Zap,
        emoji: "⚡",
        description: "Perfect for grabbing attention fast",
        color: "from-yellow-500 to-orange-600",
        bgColor: "from-yellow-50 to-orange-50",
        darkBgColor: "from-yellow-900/20 to-orange-900/20",
        benefits: ["High engagement", "Mobile-friendly", "Quick loading"],
        bestFor: ["TikTok", "Instagram Stories", "Ads"],
        engagement: "Very High"
    },
    {
        duration: 30,
        name: "Balanced & Effective",
        icon: BarChart,
        emoji: "📊",
        description: "The sweet spot for most content",
        color: "from-green-500 to-emerald-600",
        bgColor: "from-green-50 to-emerald-50",
        darkBgColor: "from-green-900/20 to-emerald-900/20",
        benefits: ["Perfect balance", "Platform versatile", "Proven results"],
        bestFor: ["Instagram Reels", "Facebook", "General use"],
        engagement: "High"
    },
    {
        duration: 60,
        name: "Detailed & Informative",
        icon: Film,
        emoji: "🎬",
        description: "More time for storytelling and details",
        color: "from-blue-500 to-indigo-600",
        bgColor: "from-blue-50 to-indigo-50",
        darkBgColor: "from-blue-900/20 to-indigo-900/20",
        benefits: ["Detailed explanation", "Better storytelling", "Educational"],
        bestFor: ["YouTube", "Product demos", "Tutorials"],
        engagement: "Medium-High"
    },
    {
        duration: 90,
        name: "In-Depth & Comprehensive",
        icon: Clock,
        emoji: "📚",
        description: "Maximum detail and comprehensive coverage",
        color: "from-purple-500 to-violet-600",
        bgColor: "from-purple-50 to-violet-50",
        darkBgColor: "from-purple-900/20 to-violet-900/20",
        benefits: ["Comprehensive", "Professional", "Complete story"],
        bestFor: ["YouTube long-form", "Webinars", "Case studies"],
        engagement: "Medium"
    }
]

// Platform-specific recommendations
const PLATFORM_RECOMMENDATIONS = {
    instagram: [15, 30],
    tiktok: [15, 30],
    youtube: [30, 60, 90],
    facebook: [30, 60]
}

export function VideoLengthStep({ selectedLength, platform, onLengthSelect }: VideoLengthStepProps) {
    const handleLengthSelect = (duration: number) => {
        const lengthData = VIDEO_LENGTHS.find(l => l.duration === duration)
        onLengthSelect(duration)

        if (lengthData) {
            toast.success(`${duration} seconds selected!`, {
                description: `${lengthData.name} - ${lengthData.engagement} engagement`,
                icon: lengthData.emoji,
                duration: 1500
            })
        }
    }

    const selectedLengthData = VIDEO_LENGTHS.find(l => l.duration === selectedLength)
    const platformRecommendations = PLATFORM_RECOMMENDATIONS[platform as keyof typeof PLATFORM_RECOMMENDATIONS] || [30, 60]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    How long should your video be?
                </h2>
                <p className="text-gray-600 dark:text-slate-400 max-w-lg mx-auto">
                    Video length affects engagement and message delivery.
                    Choose based on your content complexity and platform.
                </p>

                {/* Platform Context */}
                <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Optimizing for:
                    </span>
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Badge>
                </div>
            </div>

            {/* Video Length Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {VIDEO_LENGTHS.map((length) => {
                    const Icon = length.icon
                    const isSelected = selectedLength === length.duration
                    const isRecommended = platformRecommendations.includes(length.duration)

                    return (
                        <Card
                            key={length.duration}
                            className={`cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] relative ${isSelected
                                ? `border-cyan-500 bg-gradient-to-br ${length.bgColor} dark:${length.darkBgColor} shadow-lg`
                                : 'border-slate-200 dark:border-slate-700 hover:border-cyan-300 bg-white dark:bg-slate-800'
                                }`}
                            onClick={() => handleLengthSelect(length.duration)}
                        >
                            {/* Recommended Badge */}
                            {isRecommended && (
                                <div className="absolute -top-2 -right-2 z-10">
                                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs">
                                        Recommended
                                    </Badge>
                                </div>
                            )}

                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {/* Duration Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${length.color} rounded-full flex items-center justify-center`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                        {length.duration}s
                                                    </h3>
                                                    <span className="text-2xl">{length.emoji}</span>
                                                </div>
                                                <h4 className="text-lg font-semibold text-gray-800 dark:text-slate-200">
                                                    {length.name}
                                                </h4>
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <div className="bg-cyan-600 rounded-full p-2">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                                        {length.description}
                                    </p>

                                    {/* Engagement Level */}
                                    <div className="flex items-center justify-between">
                                        <Badge
                                            variant="outline"
                                            className={`text-sm font-medium ${isSelected
                                                ? 'border-cyan-300 text-cyan-700 dark:text-cyan-300'
                                                : 'border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300'
                                                }`}
                                        >
                                            📈 {length.engagement}
                                        </Badge>
                                        <div className={`w-16 h-2 bg-gradient-to-r ${length.color} rounded-full opacity-60`}></div>
                                    </div>

                                    {/* Benefits */}
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-gray-700 dark:text-slate-300 uppercase tracking-wide">
                                            Benefits
                                        </p>
                                        <div className="flex gap-1 flex-wrap">
                                            {length.benefits.map((benefit) => (
                                                <Badge
                                                    key={benefit}
                                                    variant="secondary"
                                                    className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                                >
                                                    {benefit}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Best For */}
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-gray-700 dark:text-slate-300 uppercase tracking-wide">
                                            Best For
                                        </p>
                                        <div className="text-sm text-gray-600 dark:text-slate-400">
                                            {length.bestFor.join(" • ")}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Platform-Specific Note */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {platform.charAt(0).toUpperCase() + platform.slice(1)} Optimization
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                            For {platform}, we recommend {platformRecommendations.join(" or ")} seconds
                            for optimal engagement and platform algorithm preferences.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoLengthStep 