"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, Sparkles, Crown, Globe, CheckCircle, ChevronDown, ChevronRight } from "lucide-react"
import { VideoConfiguration } from "../types/video-configuration"

interface AdvancedConfigTabProps {
    config: VideoConfiguration
    updateConfig: (key: keyof VideoConfiguration, value: any) => void
}

export function AdvancedConfigTab({ config, updateConfig }: AdvancedConfigTabProps) {
    // Stati per gestire l'apertura/chiusura delle sezioni
    // Audio e Creative sono sincronizzati (stessa riga)
    const [isTopSectionsOpen, setIsTopSectionsOpen] = useState(false)
    const [isSubtitlesOpen, setIsSubtitlesOpen] = useState(false)
    const [isLandingOpen, setIsLandingOpen] = useState(false)

    return (
        <div className="space-y-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Audio Controls */}
                <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-2 border-violet-200 dark:border-violet-800 rounded-xl overflow-hidden">
                    {/* Header cliccabile */}
                    <div
                        className={`p-6 cursor-pointer transition-colors ${!isTopSectionsOpen ? 'hover:bg-violet-100 dark:hover:bg-violet-900/30' : ''}`}
                        onClick={() => setIsTopSectionsOpen(!isTopSectionsOpen)}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center text-slate-900 dark:text-white">
                                <Volume2 className="w-6 h-6 mr-3 text-violet-600" />
                                Audio Settings
                            </h3>
                            {isTopSectionsOpen ? (
                                <ChevronDown className="w-5 h-5 text-violet-600 transition-transform duration-200" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-violet-600 transition-transform duration-200" />
                            )}
                        </div>
                    </div>

                    {/* Contenuto collassabile */}
                    <div className={`transition-all duration-300 ease-in-out ${isTopSectionsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                        <div className="px-6 pb-6 space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label className="font-semibold text-slate-900 dark:text-white">Background Music Volume</Label>
                                    <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 px-3 py-1 rounded-full">
                                        {config.background_music_volume}%
                                    </Badge>
                                </div>
                                <Slider
                                    value={[config.background_music_volume]}
                                    onValueChange={(value) => updateConfig("background_music_volume", value[0])}
                                    max={100}
                                    step={5}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label className="font-semibold text-slate-900 dark:text-white">Voiceover Volume</Label>
                                    <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 px-3 py-1 rounded-full">
                                        {config.voiceover_volume}%
                                    </Badge>
                                </div>
                                <Slider
                                    value={[config.voiceover_volume]}
                                    onValueChange={(value) => updateConfig("voiceover_volume", value[0])}
                                    max={100}
                                    step={5}
                                    className="w-full"
                                />
                            </div>
                            <div className="pt-2">
                                <div className="flex items-center space-x-3 p-3 bg-white dark:bg-zinc-800 rounded-lg border border-violet-200 dark:border-violet-700">
                                    <Checkbox
                                        id="no-music"
                                        checked={config.no_background_music}
                                        onCheckedChange={(checked) => updateConfig("no_background_music", checked)}
                                        className="border-violet-300 data-[state=checked]:bg-violet-600"
                                    />
                                    <Label htmlFor="no-music" className="font-medium text-slate-900 dark:text-white cursor-pointer">
                                        No background music
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Creative Controls */}
                <Card className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl overflow-hidden">
                    {/* Header cliccabile */}
                    <div
                        className={`p-6 cursor-pointer transition-colors ${!isTopSectionsOpen ? 'hover:bg-emerald-100 dark:hover:bg-emerald-900/30' : ''}`}
                        onClick={() => setIsTopSectionsOpen(!isTopSectionsOpen)}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                                <Sparkles className="w-6 h-6 mr-3 text-emerald-600" />
                                Creative Controls
                            </h3>
                            {isTopSectionsOpen ? (
                                <ChevronDown className="w-5 h-5 text-emerald-600 transition-transform duration-200" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-emerald-600 transition-transform duration-200" />
                            )}
                        </div>
                    </div>

                    {/* Contenuto collassabile */}
                    <div className={`transition-all duration-300 ease-in-out ${isTopSectionsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                        <div className="px-6 pb-6 space-y-4">
                            {[
                                { id: "no-caption", key: "no_caption", label: "No captions/subtitles", icon: "🎭" },
                                { id: "no-emotion", key: "no_emotion", label: "No avatar emotions", icon: "😐" },
                                { id: "no-cta", key: "no_cta", label: "No call-to-action", icon: "🚫" }
                            ].map((control) => (
                                <div key={control.id} className="flex items-center space-x-3 p-4 bg-white dark:bg-zinc-800 rounded-xl border-2 border-emerald-200 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors">
                                    <span className="text-xl">{control.icon}</span>
                                    <Checkbox
                                        id={control.id}
                                        checked={config[control.key as keyof VideoConfiguration] as boolean}
                                        onCheckedChange={(checked) => updateConfig(control.key as keyof VideoConfiguration, checked)}
                                        className="border-emerald-300 data-[state=checked]:bg-emerald-600"
                                    />
                                    <Label htmlFor={control.id} className="font-medium text-slate-900 dark:text-white cursor-pointer flex-1">
                                        {control.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Premium Subtitles Section */}
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl overflow-hidden">
                {/* Header cliccabile */}
                <div
                    className={`p-6 cursor-pointer transition-colors ${!isSubtitlesOpen ? 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30' : ''}`}
                    onClick={() => setIsSubtitlesOpen(!isSubtitlesOpen)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Crown className="w-6 h-6 mr-3 text-yellow-600" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Premium Subtitle Controls</h3>
                            <Badge className="ml-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                PRO
                            </Badge>
                        </div>
                        {isSubtitlesOpen ? (
                            <ChevronDown className="w-5 h-5 text-yellow-600 transition-transform duration-200" />
                        ) : (
                            <ChevronRight className="w-5 h-5 text-yellow-600 transition-transform duration-200" />
                        )}
                    </div>
                </div>

                {/* Contenuto collassabile */}
                <div className={`transition-all duration-300 ease-in-out ${isSubtitlesOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Preset Styles */}
                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-slate-900 dark:text-white">Quick Presets</Label>
                                <div className="space-y-3">
                                    {[
                                        { id: "tiktok-viral", style: "glow", label: "🎵 TikTok Viral", desc: "Glowing white text, perfect for TikTok" },
                                        { id: "instagram-clean", style: "normal-white", label: "📱 Instagram Clean", desc: "Clean white text, professional look" },
                                        { id: "youtube-bold", style: "brick", label: "📺 YouTube Bold", desc: "Bold brick style, high impact" }
                                    ].map((preset) => (
                                        <Card
                                            key={preset.id}
                                            className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg ${config.caption_style === preset.style
                                                ? "border-yellow-500 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-800/30 shadow-lg"
                                                : "border-slate-200 dark:border-zinc-700 hover:border-yellow-300 bg-white dark:bg-zinc-800"
                                                }`}
                                            onClick={() => updateConfig("caption_style", preset.style)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-white">{preset.label}</div>
                                                    <div className="text-sm text-slate-600 dark:text-zinc-400">{preset.desc}</div>
                                                </div>
                                                {config.caption_style === preset.style && (
                                                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                                                )}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Advanced Controls */}
                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-slate-900 dark:text-white">Advanced Controls</Label>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Font Family</Label>
                                            <Select value={config.caption_font_family} onValueChange={(value) => updateConfig("caption_font_family", value)}>
                                                <SelectTrigger className="bg-white dark:bg-zinc-800">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                                                    <SelectItem value="Roboto">Roboto</SelectItem>
                                                    <SelectItem value="Arial">Arial</SelectItem>
                                                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                                                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Font Size: {config.caption_font_size}px</Label>
                                            <Slider
                                                value={[config.caption_font_size]}
                                                onValueChange={(value) => updateConfig("caption_font_size", value[0])}
                                                min={16}
                                                max={48}
                                                step={2}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Caption Style</Label>
                                        <Select value={config.caption_style} onValueChange={(value) => updateConfig("caption_style", value)}>
                                            <SelectTrigger className="bg-white dark:bg-zinc-800">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="normal-black">Normal Black</SelectItem>
                                                <SelectItem value="normal-white">Normal White</SelectItem>
                                                <SelectItem value="glow">Glow Effect</SelectItem>
                                                <SelectItem value="neo">Neo Futuristic</SelectItem>
                                                <SelectItem value="brick">Bold Brick</SelectItem>
                                                <SelectItem value="mystique">Mystique</SelectItem>
                                                <SelectItem value="retro">Retro Style</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Live Preview */}
                                <div className="mt-6 p-4 bg-black rounded-xl relative overflow-hidden">
                                    <div className="text-center">
                                        <div
                                            className={`inline-block px-4 py-2 rounded font-bold transition-all ${config.caption_style === "normal-white" ? "text-white" :
                                                config.caption_style === "normal-black" ? "text-black bg-white" :
                                                    config.caption_style === "glow" ? "text-white text-shadow-lg shadow-white" :
                                                        config.caption_style === "neo" ? "text-cyan-400 border border-cyan-400 glow" :
                                                            config.caption_style === "brick" ? "text-white bg-red-600 border-2 border-white" :
                                                                "text-white"
                                                }`}
                                            style={{
                                                fontFamily: config.caption_font_family,
                                                fontSize: `${Math.min(config.caption_font_size, 24)}px`
                                            }}
                                        >
                                            Your Product is Amazing! 🚀
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 text-xs text-white/60">Live Preview</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Landing Page Settings */}
            <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl overflow-hidden">
                {/* Header cliccabile */}
                <div
                    className={`p-6 cursor-pointer transition-colors ${!isLandingOpen ? 'hover:bg-indigo-100 dark:hover:bg-indigo-900/30' : ''}`}
                    onClick={() => setIsLandingOpen(!isLandingOpen)}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                            <Globe className="w-6 h-6 mr-3 text-indigo-600" />
                            Landing Page Customization
                        </h3>
                        {isLandingOpen ? (
                            <ChevronDown className="w-5 h-5 text-indigo-600 transition-transform duration-200" />
                        ) : (
                            <ChevronRight className="w-5 h-5 text-indigo-600 transition-transform duration-200" />
                        )}
                    </div>
                </div>

                {/* Contenuto collassabile */}
                <div className={`transition-all duration-300 ease-in-out ${isLandingOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <Label className="font-semibold text-slate-900 dark:text-white">Landing Style</Label>
                                <Select value={config.landing_style} onValueChange={(value) => updateConfig("landing_style", value)}>
                                    <SelectTrigger className="bg-white dark:bg-zinc-800 border-2 border-indigo-200 dark:border-indigo-700 focus:border-indigo-500">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="modern">🎨 Modern</SelectItem>
                                        <SelectItem value="minimal">✨ Minimal</SelectItem>
                                        <SelectItem value="bold">🔥 Bold</SelectItem>
                                        <SelectItem value="elegant">💎 Elegant</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label className="font-semibold text-slate-900 dark:text-white">Color Scheme</Label>
                                <Select value={config.color_scheme} onValueChange={(value) => updateConfig("color_scheme", value)}>
                                    <SelectTrigger className="bg-white dark:bg-zinc-800 border-2 border-indigo-200 dark:border-indigo-700 focus:border-indigo-500">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="auto">🤖 Auto (AI Choice)</SelectItem>
                                        <SelectItem value="blue">🔵 Blue</SelectItem>
                                        <SelectItem value="green">🟢 Green</SelectItem>
                                        <SelectItem value="red">🔴 Red</SelectItem>
                                        <SelectItem value="purple">🟣 Purple</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label className="font-semibold text-slate-900 dark:text-white">Custom CTA Text</Label>
                                <Input
                                    placeholder="e.g. Buy Now, Learn More"
                                    value={config.cta_text}
                                    onChange={(e) => updateConfig("cta_text", e.target.value)}
                                    className="bg-white dark:bg-zinc-800 border-2 border-indigo-200 dark:border-indigo-700 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
} 