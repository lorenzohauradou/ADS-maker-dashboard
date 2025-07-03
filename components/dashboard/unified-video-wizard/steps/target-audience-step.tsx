"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Target, Users, Briefcase, Heart, Zap, Baby } from "lucide-react"
import { toast } from "sonner"

interface TargetAudienceStepProps {
    selectedAudience: string
    onAudienceSelect: (audience: string) => void
}

const AUDIENCES = [
    {
        id: "young-adults",
        name: "Young Adults",
        ageRange: "18-35",
        icon: Zap,
        emoji: "⚡",
        description: "Tech-savvy, trend-conscious, active on social media",
        color: "from-blue-500 to-cyan-600",
        bgColor: "from-blue-50 to-cyan-50",
        darkBgColor: "from-blue-900/20 to-cyan-900/20",
        characteristics: ["Social media active", "Early adopters", "Mobile-first"],
        tone: "Energetic and trendy"
    },
    {
        id: "families",
        name: "Families",
        ageRange: "25-45",
        icon: Heart,
        emoji: "👨‍👩‍👧‍👦",
        description: "Parents looking for practical solutions and family-friendly products",
        color: "from-green-500 to-emerald-600",
        bgColor: "from-green-50 to-emerald-50",
        darkBgColor: "from-green-900/20 to-emerald-900/20",
        characteristics: ["Value-focused", "Safety-conscious", "Time-saving"],
        tone: "Warm and trustworthy"
    },
    {
        id: "professionals",
        name: "Professionals",
        ageRange: "28-50",
        icon: Briefcase,
        emoji: "💼",
        description: "Business-minded individuals seeking efficiency and quality",
        color: "from-purple-500 to-indigo-600",
        bgColor: "from-purple-50 to-indigo-50",
        darkBgColor: "from-purple-900/20 to-indigo-900/20",
        characteristics: ["Results-driven", "Quality-focused", "Time-conscious"],
        tone: "Professional and authoritative"
    },
    {
        id: "seniors",
        name: "Seniors",
        ageRange: "55+",
        icon: Users,
        emoji: "👵",
        description: "Mature audience valuing reliability, simplicity, and tradition",
        color: "from-orange-500 to-amber-600",
        bgColor: "from-orange-50 to-amber-50",
        darkBgColor: "from-orange-900/20 to-amber-900/20",
        characteristics: ["Trust-focused", "Value tradition", "Clear communication"],
        tone: "Respectful and clear"
    },
    {
        id: "teens",
        name: "Teenagers",
        ageRange: "13-19",
        icon: Baby,
        emoji: "🎮",
        description: "Gen Z audience, highly visual, values authenticity and creativity",
        color: "from-pink-500 to-rose-600",
        bgColor: "from-pink-50 to-rose-50",
        darkBgColor: "from-pink-900/20 to-rose-900/20",
        characteristics: ["Visual-first", "Authenticity", "Creative content"],
        tone: "Fun and authentic"
    },
    {
        id: "general",
        name: "General Audience",
        ageRange: "All ages",
        icon: Target,
        emoji: "🌍",
        description: "Broad appeal content suitable for diverse demographics",
        color: "from-slate-500 to-gray-600",
        bgColor: "from-slate-50 to-gray-50",
        darkBgColor: "from-slate-900/20 to-gray-900/20",
        characteristics: ["Universal appeal", "Clear messaging", "Inclusive"],
        tone: "Balanced and inclusive"
    }
]

export function TargetAudienceStep({ selectedAudience, onAudienceSelect }: TargetAudienceStepProps) {
    const handleAudienceSelect = (audienceId: string) => {
        const audience = AUDIENCES.find(a => a.id === audienceId)
        onAudienceSelect(audienceId)

        if (audience) {
            toast.success(`${audience.name} selected!`, {
                description: `Content will be ${audience.tone.toLowerCase()}`,
                icon: audience.emoji,
                duration: 1500
            })
        }
    }

    const selectedAudienceData = AUDIENCES.find(a => a.id === selectedAudience)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Who are you trying to reach?
                </h2>
                <p className="text-gray-600 dark:text-slate-400 max-w-lg mx-auto">
                    Understanding your audience helps us create content that resonates.
                    We'll adjust the tone, style, and messaging accordingly.
                </p>
            </div>

            {/* Audience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AUDIENCES.map((audience) => {
                    const Icon = audience.icon
                    const isSelected = selectedAudience === audience.id

                    return (
                        <Card
                            key={audience.id}
                            className={`cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] ${isSelected
                                ? `border-orange-500 bg-gradient-to-br ${audience.bgColor} dark:${audience.darkBgColor} shadow-lg`
                                : 'border-slate-200 dark:border-slate-700 hover:border-orange-300 bg-white dark:bg-slate-800'
                                }`}
                            onClick={() => handleAudienceSelect(audience.id)}
                        >
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {/* Audience Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${audience.color} rounded-full flex items-center justify-center`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {audience.name}
                                                </h3>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${isSelected
                                                        ? 'border-orange-300 text-orange-700 dark:text-orange-300'
                                                        : 'border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-400'
                                                        }`}
                                                >
                                                    {audience.ageRange}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center space-y-2">
                                            <span className="text-2xl">{audience.emoji}</span>
                                            {isSelected && (
                                                <div className="bg-orange-600 rounded-full p-1">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                                        {audience.description}
                                    </p>

                                    {/* Characteristics */}
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-gray-700 dark:text-slate-300 uppercase tracking-wide">
                                            Key Traits
                                        </p>
                                        <div className="flex gap-1 flex-wrap">
                                            {audience.characteristics.map((trait) => (
                                                <Badge
                                                    key={trait}
                                                    variant="secondary"
                                                    className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                                >
                                                    {trait}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tone */}
                                    <div className="pt-2">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${audience.color} text-white`}>
                                            {audience.tone}
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

export default TargetAudienceStep 