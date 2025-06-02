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
        <div className="space-y-8 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Platform Selection */}
                <div className="space-y-4">
                    <Label className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-blue-600" />
                        Target Platform
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                        {PLATFORMS.map((platform) => (
                            <Card
                                key={platform.value}
                                className={`p-6 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg ${config.target_platform === platform.value
                                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 shadow-lg"
                                    : "border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800"
                                    }`}
                                onClick={() => handlePlatformChange(platform.value)}
                            >
                                <div className="text-center">
                                    <div className="text-3xl mb-3">{platform.icon}</div>
                                    <div className="font-bold text-lg text-slate-900 dark:text-white">{platform.label}</div>
                                    <div className="text-sm text-slate-500 dark:text-zinc-400 mt-1">{platform.aspect}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Language Selection */}
                <div className="space-y-4">
                    <Label className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-purple-600" />
                        Language
                    </Label>
                    <Select value={config.language} onValueChange={(value) => updateConfig("language", value)}>
                        <SelectTrigger className="text-lg p-6 rounded-xl border-2 border-slate-200 dark:border-zinc-700 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-zinc-800">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            {LANGUAGES.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value} className="text-base p-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{lang.flag}</span>
                                        <span className="font-medium">{lang.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Video Length */}
                <div className="space-y-4">
                    <Label className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                        <Play className="w-5 h-5 mr-2 text-green-600" />
                        Video Length
                    </Label>
                    <div className="grid grid-cols-3 gap-4">
                        {[15, 30, 60].map((length) => (
                            <Card
                                key={length}
                                className={`p-6 cursor-pointer text-center transition-all duration-300 border-2 rounded-xl hover:shadow-lg ${config.video_length === length
                                    ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 shadow-lg"
                                    : "border-slate-200 dark:border-zinc-700 hover:border-slate-300 bg-white dark:bg-zinc-800"
                                    }`}
                                onClick={() => updateConfig("video_length", length)}
                            >
                                <div className="font-bold text-2xl text-slate-900 dark:text-white">{length}s</div>
                                <div className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
                                    {length === 15 ? "Quick Impact" : length === 30 ? "Balanced" : "Detailed Story"}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Target Audience */}
                <div className="space-y-4">
                    <Label className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-orange-600" />
                        Target Audience
                    </Label>
                    <Select value={config.target_audience} onValueChange={(value) => updateConfig("target_audience", value)}>
                        <SelectTrigger className="text-lg p-6 rounded-xl border-2 border-slate-200 dark:border-zinc-700 focus:border-orange-500 dark:focus:border-orange-400 bg-white dark:bg-zinc-800">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="giovani adulti" className="text-base p-3">🎯 Young Adults (18-35)</SelectItem>
                            <SelectItem value="famiglie" className="text-base p-3">👨‍👩‍👧‍👦 Families</SelectItem>
                            <SelectItem value="professionisti" className="text-base p-3">💼 Professionals</SelectItem>
                            <SelectItem value="anziani" className="text-base p-3">👵 Seniors (55+)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
} 