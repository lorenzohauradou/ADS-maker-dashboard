"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Globe, Play, Zap, ChevronDown, ChevronUp } from "lucide-react"
import { VideoConfiguration } from "../types/video-configuration"
import { PLATFORMS } from "../constants/video-platforms"
import { LANGUAGES } from "../constants/video-languages"

interface BasicConfigTabProps {
    config: VideoConfiguration
    updateConfig: (key: keyof VideoConfiguration, value: any) => void
    handlePlatformChange: (platform: string) => void
}

export function BasicConfigTab({ config, updateConfig, handlePlatformChange }: BasicConfigTabProps) {
    const [isLanguageExpanded, setIsLanguageExpanded] = useState(false)
    const [isAudienceExpanded, setIsAudienceExpanded] = useState(false)

    const selectedLanguage = LANGUAGES.find(lang => lang.value === config.language)

    const audiences = [
        { value: "giovani adulti", label: "Young Adults (18-35)", icon: "🎯" },
        { value: "famiglie", label: "Families", icon: "👨‍👩‍👧‍👦" },
        { value: "professionisti", label: "Professionals", icon: "💼" },
        { value: "anziani", label: "Seniors (55+)", icon: "👵" }
    ]
    const selectedAudience = audiences.find(aud => aud.value === config.target_audience)

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

                    {/* Selected Option Display */}
                    <Card
                        className="p-2 sm:p-4 cursor-pointer transition-all duration-300 border-2 border-slate-300 dark:border-zinc-600 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-800 dark:to-zinc-900 shadow-md rounded-xl hover:shadow-lg hover:border-slate-400 dark:hover:border-zinc-500 group"
                        onClick={() => setIsLanguageExpanded(!isLanguageExpanded)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1 flex items-center space-x-2 sm:space-x-3">
                                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                                    <Globe className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <span className="text-sm sm:text-lg">{selectedLanguage?.flag || "🌍"}</span>
                                    <span className="font-bold text-sm sm:text-lg text-slate-900 dark:text-white">
                                        {selectedLanguage?.label || "Seleziona lingua"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {isLanguageExpanded ? (
                                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-zinc-400 group-hover:text-purple-600 transition-colors" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-zinc-400 group-hover:text-purple-600 transition-colors" />
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Expandable Options */}
                    <div className={`transition-all duration-300 overflow-hidden ${isLanguageExpanded ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2 pt-2">
                            {LANGUAGES.map((lang) => (
                                <Card
                                    key={lang.value}
                                    className={`p-2 sm:p-3 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg hover:scale-[1.02] ${config.language === lang.value
                                        ? "border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 shadow-lg"
                                        : "border-slate-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-zinc-800"
                                        }`}
                                    onClick={() => {
                                        updateConfig("language", lang.value)
                                        setIsLanguageExpanded(false)
                                    }}
                                >
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <span className="text-sm sm:text-lg">{lang.flag}</span>
                                        <span className="font-medium text-xs sm:text-sm text-slate-900 dark:text-white">{lang.label}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
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
                <div className="space-y-2 sm:space-y-4 lg:relative">
                    <Label className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-orange-600" />
                        Target Audience
                    </Label>

                    {/* Selected Option Display */}
                    <Card
                        className="p-2 sm:p-4 cursor-pointer transition-all duration-300 border-2 border-slate-300 dark:border-zinc-600 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-800 dark:to-zinc-900 shadow-md rounded-xl hover:shadow-lg hover:border-slate-400 dark:hover:border-zinc-500 group"
                        onClick={() => setIsAudienceExpanded(!isAudienceExpanded)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1 flex items-center space-x-2 sm:space-x-3">
                                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                                    <Zap className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <span className="text-sm sm:text-lg">{selectedAudience?.icon || "🎯"}</span>
                                    <span className="font-bold text-sm sm:text-lg text-slate-900 dark:text-white">
                                        {selectedAudience?.label || "Seleziona audience"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {isAudienceExpanded ? (
                                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-zinc-400 group-hover:text-orange-600 transition-colors" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-zinc-400 group-hover:text-orange-600 transition-colors" />
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Expandable Options */}
                    <div className={`transition-all duration-300 overflow-hidden ${isAudienceExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                        } lg:absolute lg:bottom-full lg:left-0 lg:right-0 lg:mb-2 relative lg:z-50`}>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 pt-2 lg:bg-white lg:dark:bg-zinc-900 lg:border-2 lg:border-slate-300 lg:dark:border-zinc-600 lg:rounded-xl lg:shadow-xl lg:p-3">
                            {audiences.map((audience) => (
                                <Card
                                    key={audience.value}
                                    className={`p-2 sm:p-3 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg hover:scale-[1.02] ${config.target_audience === audience.value
                                        ? "border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 shadow-lg"
                                        : "border-slate-200 dark:border-zinc-700 hover:border-orange-300 dark:hover:border-orange-600 bg-white dark:bg-zinc-800"
                                        }`}
                                    onClick={() => {
                                        updateConfig("target_audience", audience.value)
                                        setIsAudienceExpanded(false)
                                    }}
                                >
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <span className="text-sm sm:text-lg">{audience.icon}</span>
                                        <span className="font-medium text-xs sm:text-sm text-slate-900 dark:text-white">{audience.label}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 