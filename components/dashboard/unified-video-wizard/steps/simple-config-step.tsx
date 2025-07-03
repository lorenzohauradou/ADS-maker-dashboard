"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Settings,
    User,
    Clock,
    Target,
    Volume2,
    CheckCircle,
    Smartphone,
} from "lucide-react"

interface SimpleConfigStepProps {
    avatar: string | null
    targetAudience: string
    videoLength: number
    platform: string
    hasUrl: boolean
    onConfigUpdate: (config: any) => void
}

const AVATARS = [
    { value: "sarah_pro", label: "Sarah Professional", icon: "👩‍💼", gender: "female" },
    { value: "marco_friendly", label: "Marco Amichevole", icon: "👨‍💼", gender: "male" },
    { value: "elena_energica", label: "Elena Energica", icon: "⚡", gender: "female" },
    { value: "alessandro_carismatico", label: "Alessandro Carismatico", icon: "🎭", gender: "male" }
]

const AUDIENCES = [
    { value: "giovani", label: "Giovani (18-35)", icon: "🎯" },
    { value: "famiglie", label: "Famiglie", icon: "👨‍👩‍👧‍👦" },
    { value: "professionisti", label: "Professionisti", icon: "💼" },
    { value: "anziani", label: "Anziani (55+)", icon: "👵" }
]

const PLATFORMS = [
    { value: "instagram", label: "Instagram", icon: "📱", aspect: "9:16", color: "pink" },
    { value: "tiktok", label: "TikTok", icon: "🎵", aspect: "9:16", color: "purple" },
    { value: "youtube", label: "YouTube", icon: "📺", aspect: "16:9", color: "red" },
    { value: "facebook", label: "Facebook", icon: "👥", aspect: "1:1", color: "blue" }
]

const VIDEO_LENGTHS = [
    { value: 15, label: "15 secondi", desc: "Rapido e diretto" },
    { value: 30, label: "30 secondi", desc: "Equilibrato" },
    { value: 60, label: "60 secondi", desc: "Dettagliato" }
]

export function SimpleConfigStep({
    avatar,
    targetAudience,
    videoLength,
    platform,
    hasUrl,
    onConfigUpdate
}: SimpleConfigStepProps) {

    const selectedAvatar = AVATARS.find(a => a.value === avatar)
    const selectedAudience = AUDIENCES.find(a => a.value === targetAudience)
    const selectedPlatform = PLATFORMS.find(p => p.value === platform)
    const selectedLength = VIDEO_LENGTHS.find(l => l.value === videoLength)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Settings className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Video Configuration
                </h2>
                <p className="text-gray-600 dark:text-zinc-400 max-w-lg mx-auto">
                    Customize your video with a few simple choices
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Avatar Selection */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                        <User className="w-6 h-6 mr-3 text-blue-600" />
                        Presentatore
                    </h3>

                    <div className="space-y-3">
                        <Label className="font-semibold text-slate-900 dark:text-white">Scegli Avatar</Label>
                        <Select value={avatar || ""} onValueChange={(value) => onConfigUpdate({ avatar: value })}>
                            <SelectTrigger className="bg-white dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700">
                                <SelectValue placeholder="Seleziona presentatore" />
                            </SelectTrigger>
                            <SelectContent>
                                {AVATARS.map((av) => (
                                    <SelectItem key={av.value} value={av.value}>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-lg">{av.icon}</span>
                                            <span>{av.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {selectedAvatar && (
                            <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{selectedAvatar.icon}</span>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">
                                            {selectedAvatar.label}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-zinc-400">
                                            Professional {selectedAvatar.gender === 'female' ? 'female' : 'male'} voice
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Target Audience */}
                <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                        <Target className="w-6 h-6 mr-3 text-orange-600" />
                        Target Audience
                    </h3>

                    <div className="space-y-3">
                        <Label className="font-semibold text-slate-900 dark:text-white">Who do you want to reach?</Label>
                        <Select value={targetAudience} onValueChange={(value) => onConfigUpdate({ targetAudience: value })}>
                            <SelectTrigger className="bg-white dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {AUDIENCES.map((aud) => (
                                    <SelectItem key={aud.value} value={aud.value}>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-lg">{aud.icon}</span>
                                            <span>{aud.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {selectedAudience && (
                            <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg border border-orange-200 dark:border-orange-700">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{selectedAudience.icon}</span>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">
                                            {selectedAudience.label}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-zinc-400">
                                            Content optimized for this target
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Platform Selection */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                        <Smartphone className="w-6 h-6 mr-3 text-purple-600" />
                        Platform
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        {PLATFORMS.map((plat) => (
                            <Card
                                key={plat.value}
                                className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${platform === plat.value
                                    ? `border-${plat.color}-500 bg-gradient-to-br from-${plat.color}-50 to-${plat.color}-100 dark:from-${plat.color}-900/30 dark:to-${plat.color}-800/30 shadow-lg`
                                    : "border-slate-200 dark:border-zinc-700 hover:border-purple-300 bg-white dark:bg-zinc-800"
                                    }`}
                                onClick={() => onConfigUpdate({ platform: plat.value })}
                            >
                                <div className="text-center space-y-2">
                                    <div className="text-2xl">{plat.icon}</div>
                                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                                        {plat.label}
                                    </div>
                                    <div className="text-xs text-slate-600 dark:text-zinc-400">
                                        {plat.aspect}
                                    </div>
                                    {platform === plat.value && (
                                        <CheckCircle className={`w-4 h-4 text-${plat.color}-600 mx-auto`} />
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card>

                {/* Video Length */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                        <Clock className="w-6 h-6 mr-3 text-green-600" />
                        Video Duration
                    </h3>

                    <div className="space-y-3">
                        {VIDEO_LENGTHS.map((length) => (
                            <Card
                                key={length.value}
                                className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${videoLength === length.value
                                    ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 shadow-lg"
                                    : "border-slate-200 dark:border-zinc-700 hover:border-green-300 bg-white dark:bg-zinc-800"
                                    }`}
                                onClick={() => onConfigUpdate({ videoLength: length.value })}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">
                                            {length.label}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-zinc-400">
                                            {length.desc}
                                        </div>
                                    </div>
                                    {videoLength === length.value && (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Source Info */}
            <Card className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-zinc-900/50 dark:to-slate-900/50 border-2 border-slate-200 dark:border-zinc-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                    <Volume2 className="w-6 h-6 mr-3 text-slate-600" />
                    Content Type
                </h3>

                <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            {hasUrl ? "🌐" : "📸"}
                        </div>
                        <div>
                            <div className="font-semibold text-slate-900 dark:text-white">
                                {hasUrl ? "Product URL Video" : "Image-based Video"}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-zinc-400">
                                {hasUrl
                                    ? "We will create the video by analyzing the product page"
                                    : "We will create the video using the uploaded images"
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Configuration Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                <h4 className="font-bold text-green-900 dark:text-green-100 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Video Configuration
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <span className="font-medium text-green-800 dark:text-green-200">Presenter:</span>
                        <p className="text-green-700 dark:text-green-300">
                            {selectedAvatar?.label || "Non selezionato"}
                        </p>
                    </div>
                    <div>
                        <span className="font-medium text-green-800 dark:text-green-200">Target Audience:</span>
                        <p className="text-green-700 dark:text-green-300">{selectedAudience?.label}</p>
                    </div>
                    <div>
                        <span className="font-medium text-green-800 dark:text-green-200">Platform:</span>
                        <p className="text-green-700 dark:text-green-300">{selectedPlatform?.label}</p>
                    </div>
                    <div>
                        <span className="font-medium text-green-800 dark:text-green-200">Duration:</span>
                        <p className="text-green-700 dark:text-green-300">{selectedLength?.label}</p>
                    </div>
                </div>
            </Card>
        </div>
    )
} 