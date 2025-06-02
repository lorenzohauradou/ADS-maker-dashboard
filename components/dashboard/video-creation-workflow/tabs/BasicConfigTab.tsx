"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Play, Zap } from "lucide-react"
import { VideoConfiguration } from "../types/video-configuration"
import { PLATFORMS } from "../constants/video-platforms"
import { LANGUAGES } from "../constants/video-languages"

interface BasicConfigTabProps {
    config: VideoConfiguration
    updateConfig: (key: keyof VideoConfiguration, value: any) => void
    handlePlatformChange: (platform: string) => void
}

export function BasicConfigTab({ config, updateConfig, handlePlatformChange }: BasicConfigTabProps) {
    return (
        <div className="space-y-3 sm:space-y-6 mt-2 sm:mt-4">
            {/* Mobile: Stack vertically, Desktop: Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
                {/* Platform Selection */}
                <div className="space-y-2 sm:space-y-4">
                    <Label className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center">
                        <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-600" />
                        Target Platform
                    </Label>
                    {/* Mobile: 2x2 Grid, Desktop: 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
                        {PLATFORMS.map((platform) => (
                            <Card
                                key={platform.value}
                                className={`p-2 sm:p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg touch-manipulation active:scale-95 ${config.target_platform === platform.value
                                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 shadow-lg"
                                    : "border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800"
                                    }`}
                                onClick={() => handlePlatformChange(platform.value)}
                            >
                                <div className="text-center">
                                    <div className="text-lg sm:text-2xl mb-1 sm:mb-2">{platform.icon}</div>
                                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{platform.label}</div>
                                    <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 sm:mt-1">{platform.aspect}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Language Selection */}
                <div className="space-y-2 sm:space-y-4">
                    <Label className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center">
                        <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-purple-600" />
                        Language
                    </Label>
                    <Select value={config.language} onValueChange={(value) => updateConfig("language", value)}>
                        <SelectTrigger className="text-xs sm:text-base p-2 sm:p-4 rounded-lg border-2 border-slate-200 dark:border-zinc-700 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-zinc-800 h-10 sm:h-14">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg">
                            {LANGUAGES.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value} className="text-xs sm:text-sm p-2 sm:p-3">
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <span className="text-sm sm:text-lg">{lang.flag}</span>
                                        <span className="font-medium">{lang.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
                {/* Video Length */}
                <div className="space-y-2 sm:space-y-4">
                    <Label className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center">
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-600" />
                        Video Length
                    </Label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                        {[15, 30, 60].map((length) => (
                            <Card
                                key={length}
                                className={`p-2 sm:p-4 cursor-pointer text-center transition-all duration-300 border-2 rounded-lg hover:shadow-lg touch-manipulation active:scale-95 ${config.video_length === length
                                    ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 shadow-lg"
                                    : "border-slate-200 dark:border-zinc-700 hover:border-slate-300 bg-white dark:bg-zinc-800"
                                    }`}
                                onClick={() => updateConfig("video_length", length)}
                            >
                                <div className="font-bold text-base sm:text-xl text-slate-900 dark:text-white">{length}s</div>
                                <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 sm:mt-1">
                                    {length === 15 ? "Quick" : length === 30 ? "Balanced" : "Detailed"}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Target Audience */}
                <div className="space-y-2 sm:space-y-4">
                    <Label className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-orange-600" />
                        Target Audience
                    </Label>
                    <Select value={config.target_audience} onValueChange={(value) => updateConfig("target_audience", value)}>
                        <SelectTrigger className="text-xs sm:text-base p-2 sm:p-4 rounded-lg border-2 border-slate-200 dark:border-zinc-700 focus:border-orange-500 dark:focus:border-orange-400 bg-white dark:bg-zinc-800 h-10 sm:h-14">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg">
                            <SelectItem value="giovani adulti" className="text-xs sm:text-sm p-2 sm:p-3">🎯 Young Adults (18-35)</SelectItem>
                            <SelectItem value="famiglie" className="text-xs sm:text-sm p-2 sm:p-3">👨‍👩‍👧‍👦 Families</SelectItem>
                            <SelectItem value="professionisti" className="text-xs sm:text-sm p-2 sm:p-3">💼 Professionals</SelectItem>
                            <SelectItem value="anziani" className="text-xs sm:text-sm p-2 sm:p-3">👵 Seniors (55+)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
} 