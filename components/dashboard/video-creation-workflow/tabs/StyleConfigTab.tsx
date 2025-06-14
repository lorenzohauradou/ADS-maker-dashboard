"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Zap, Palette, Settings, CheckCircle, Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { VideoConfiguration } from "../types/video-configuration"
import { SCRIPT_STYLES, VISUAL_STYLES } from "../constants/video-styles"

interface StyleConfigTabProps {
    config: VideoConfiguration
    updateConfig: (key: keyof VideoConfiguration, value: any) => void
}

export function StyleConfigTab({ config, updateConfig }: StyleConfigTabProps) {
    const [isScriptStyleExpanded, setIsScriptStyleExpanded] = useState(false)
    const [isVisualStyleExpanded, setIsVisualStyleExpanded] = useState(false)

    const selectedScriptStyle = SCRIPT_STYLES.find(style => style.value === config.script_style)
    const selectedVisualStyle = VISUAL_STYLES.find(style => style.value === config.visual_style)

    return (
        <div className="space-y-8 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Script Style Dropdown */}
                <div className="space-y-4">
                    <Label className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-green-600" />
                        Script Style
                    </Label>

                    {/* Selected Option Display */}
                    <Card
                        className="p-4 cursor-pointer transition-all duration-300 border-2 border-slate-300 dark:border-zinc-600 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-800 dark:to-zinc-900 shadow-md rounded-xl hover:shadow-lg hover:border-slate-400 dark:hover:border-zinc-500 group"
                        onClick={() => setIsScriptStyleExpanded(!isScriptStyleExpanded)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1 flex items-center space-x-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg text-slate-900 dark:text-white">
                                        {selectedScriptStyle?.label || "Seleziona uno stile"}
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-zinc-400 mt-1">
                                        {selectedScriptStyle?.description || "Scegli lo stile per il tuo script"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {isScriptStyleExpanded ? (
                                    <ChevronUp className="w-5 h-5 text-slate-500 dark:text-zinc-400 group-hover:text-green-600 transition-colors" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-500 dark:text-zinc-400 group-hover:text-green-600 transition-colors" />
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Expandable Options */}
                    <div className={`transition-all duration-300 overflow-hidden ${isScriptStyleExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 pt-2">
                            {SCRIPT_STYLES.map((style) => (
                                <Card
                                    key={style.value}
                                    className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] ${config.script_style === style.value
                                        ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 shadow-lg"
                                        : "border-slate-200 dark:border-zinc-700 hover:border-green-300 dark:hover:border-green-600 bg-white dark:bg-zinc-800"
                                        }`}
                                    onClick={() => {
                                        updateConfig("script_style", style.value)
                                        setIsScriptStyleExpanded(false)
                                    }}
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
                </div>

                {/* Visual Style Dropdown */}
                <div className="space-y-4">
                    <Label className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                        <Palette className="w-5 h-5 mr-2 text-blue-600" />
                        Visual Style
                    </Label>

                    {/* Selected Option Display */}
                    <Card
                        className="p-4 cursor-pointer transition-all duration-300 border-2 border-slate-300 dark:border-zinc-600 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-800 dark:to-zinc-900 shadow-md rounded-xl hover:shadow-lg hover:border-slate-400 dark:hover:border-zinc-500 group"
                        onClick={() => setIsVisualStyleExpanded(!isVisualStyleExpanded)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1 flex items-center space-x-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                                    <Palette className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg text-slate-900 dark:text-white">
                                        {selectedVisualStyle?.label || "Seleziona uno stile"}
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-zinc-400 mt-1">
                                        {selectedVisualStyle?.description || "Scegli lo stile visivo per il tuo video"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {isVisualStyleExpanded ? (
                                    <ChevronUp className="w-5 h-5 text-slate-500 dark:text-zinc-400 group-hover:text-blue-600 transition-colors" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-500 dark:text-zinc-400 group-hover:text-blue-600 transition-colors" />
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Expandable Options */}
                    <div className={`transition-all duration-300 overflow-hidden ${isVisualStyleExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 pt-2">
                            {VISUAL_STYLES.map((style) => (
                                <Card
                                    key={style.value}
                                    className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] ${config.visual_style === style.value
                                        ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30 shadow-lg"
                                        : "border-slate-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-zinc-800"
                                        }`}
                                    onClick={() => {
                                        updateConfig("visual_style", style.value)
                                        setIsVisualStyleExpanded(false)
                                    }}
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
            </div>

            {/* Custom Script Override */}
            <Card className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-zinc-900/50 dark:to-slate-900/50 p-6 border-2 border-slate-200 dark:border-zinc-700 rounded-xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900"></div>
                </div>

                <div className="relative z-10">
                    <Label className="text-xl font-bold text-slate-900 dark:text-white flex items-center mb-4">
                        <Settings className="w-5 h-5 mr-2 text-slate-600 dark:text-zinc-400" />
                        Custom Script Override
                        <span className="ml-2 px-2 py-1 text-xs font-normal bg-slate-200 dark:bg-zinc-700 text-slate-600 dark:text-zinc-400 rounded-full">
                            Optional
                        </span>
                    </Label>

                    {/* Recommendation Banner */}
                    <div className="hidden md:block mb-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-1">
                                    💡 Pro Tip: Leave empty to let AI create the perfect script for your audience
                                </h4>
                                <p className="text-sm text-emerald-700 dark:text-emerald-300 hidden md:block">
                                    Our AI is optimized to create perfect scripts based on your images and configurations.
                                </p>
                                <p className="hidden md:block text-sm text-emerald-700 dark:text-emerald-300">
                                    Filling this field will completely override the AI-generated script.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Textarea
                        placeholder="🤖 Write your custom script or leave empty to let AI magic happen..."
                        value={config.override_script}
                        onChange={(e) => updateConfig("override_script", e.target.value)}
                        className="min-h-[120px] bg-white dark:bg-zinc-800 border-2 border-slate-300 dark:border-zinc-600 focus:border-emerald-400 dark:focus:border-emerald-500 rounded-xl resize-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-zinc-500"
                    />

                    {/* Status Indicator */}
                    {config.override_script ? (
                        <div className="mt-3 flex items-center text-amber-600 dark:text-amber-400">
                            <Settings className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Custom Script Mode Active</span>
                        </div>
                    ) : (
                        <div className="mt-3 flex items-center text-emerald-600 dark:text-emerald-400">
                            <Sparkles className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Automatic AI Mode Active (Recommended)</span>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
} 