"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Zap, Palette, Settings, CheckCircle, Sparkles } from "lucide-react"
import { VideoConfiguration } from "../types/video-configuration"
import { SCRIPT_STYLES, VISUAL_STYLES } from "../constants/video-styles"

interface StyleConfigTabProps {
    config: VideoConfiguration
    updateConfig: (key: keyof VideoConfiguration, value: any) => void
}

export function StyleConfigTab({ config, updateConfig }: StyleConfigTabProps) {
    return (
        <div className="space-y-8 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Script Style */}
                <div className="space-y-4">
                    <Label className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-green-600" />
                        Script Style
                    </Label>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {SCRIPT_STYLES.map((style) => (
                            <Card
                                key={style.value}
                                className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] ${config.script_style === style.value
                                    ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 shadow-lg"
                                    : "border-slate-200 dark:border-zinc-700 hover:border-green-300 dark:hover:border-green-600 bg-white dark:bg-zinc-800"
                                    }`}
                                onClick={() => updateConfig("script_style", style.value)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-lg text-slate-900 dark:text-white">{style.label}</div>
                                        <div className="text-sm text-slate-600 dark:text-zinc-400 mt-1">{style.description}</div>
                                    </div>
                                    {config.script_style === style.value && (
                                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Visual Style */}
                <div className="space-y-4">
                    <Label className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                        <Palette className="w-5 h-5 mr-2 text-blue-600" />
                        Visual Style
                    </Label>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {VISUAL_STYLES.map((style) => (
                            <Card
                                key={style.value}
                                className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] ${config.visual_style === style.value
                                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30 shadow-lg"
                                    : "border-slate-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-zinc-800"
                                    }`}
                                onClick={() => updateConfig("visual_style", style.value)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-lg text-slate-900 dark:text-white">{style.label}</div>
                                        <div className="text-sm text-slate-600 dark:text-zinc-400 mt-1">{style.description}</div>
                                    </div>
                                    {config.visual_style === style.value && (
                                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom Script Override */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
                <Label className="text-xl font-bold text-slate-900 dark:text-white flex items-center mb-4">
                    <Settings className="w-5 h-5 mr-2 text-amber-600" />
                    Custom Script Override (Optional)
                </Label>
                <Textarea
                    placeholder="Write your custom script here to override AI generation... This will replace the AI-generated script entirely."
                    value={config.override_script}
                    onChange={(e) => updateConfig("override_script", e.target.value)}
                    className="min-h-[120px] bg-white dark:bg-zinc-800 border-2 border-amber-200 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-400 rounded-xl resize-none"
                />
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Pro tip: Leave empty to let AI create the perfect script for your audience
                </p>
            </Card>
        </div>
    )
} 