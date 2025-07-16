"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Globe,
    Edit3,
    Sparkles,
    CheckCircle,
    Users,
    Languages,
    Loader2,
    AlertCircle,
    Type,
    ScanEye
} from "lucide-react"

interface ContentScriptStepProps {
    contentType: 'url' | 'manual' | 'ai' | null
    websiteUrl: string
    customScript: string
    targetAudience: string
    contentLanguage: string
    onContentUpdate: (contentData: any) => void
}

const AUDIENCES = [
    { value: "young_adults", label: "Young Adults (18-35)", icon: "🎯", desc: "Millennials and Gen Z" },
    { value: "families", label: "Families", icon: "👨‍👩‍👧‍👦", desc: "Parents with children" },
    { value: "professionals", label: "Professionals", icon: "💼", desc: "Business and career" },
    { value: "seniors", label: "Seniors (55+)", icon: "👵", desc: "Mature age" }
]

const LANGUAGES = [
    { value: "it", label: "Italiano", flag: "🇮🇹" },
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "de", label: "Deutsch", flag: "🇩🇪" }
]

export function ContentScriptStep({
    contentType,
    websiteUrl,
    customScript,
    targetAudience,
    contentLanguage,
    onContentUpdate
}: ContentScriptStepProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [urlError, setUrlError] = useState("")

    const handleContentTypeSelect = (type: 'url' | 'manual' | 'ai') => {
        onContentUpdate({
            contentType: type,
            websiteUrl: type === 'url' ? websiteUrl : "",
            customScript: type === 'manual' ? customScript : ""
        })
    }

    const handleUrlAnalysis = async () => {
        if (!websiteUrl.trim()) {
            setUrlError("Enter a valid URL")
            return
        }

        setIsAnalyzing(true)
        setUrlError("")

        try {
            // Simula analisi URL
            await new Promise(resolve => setTimeout(resolve, 2000))

            if (websiteUrl.includes('invalid')) {
                throw new Error("Unable to analyze this website")
            }

            onContentUpdate({ websiteUrl: websiteUrl.trim() })
        } catch (error) {
            setUrlError(error instanceof Error ? error.message : "Error analyzing website")
        } finally {
            setIsAnalyzing(false)
        }
    }

    const selectedAudience = AUDIENCES.find(aud => aud.value === targetAudience)
    const selectedLanguage = LANGUAGES.find(lang => lang.value === contentLanguage)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Content and Script
                </h2>
                <p className="text-slate-600 dark:text-zinc-400">
                    Choose how you want to create the content of your video
                </p>
            </div>

            {/* Content Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* URL Analysis */}
                <Card
                    className={`p-6 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg ${contentType === 'url'
                        ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-lg"
                        : "border-slate-200 dark:border-zinc-700 hover:border-blue-300 bg-white dark:bg-zinc-800"
                        }`}
                    onClick={() => handleContentTypeSelect('url')}
                >
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <Globe className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                Website Analysis
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-zinc-400">
                                Enter the URL of your product and the AI will automatically create the content
                            </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                            Fast and Automatic
                        </Badge>
                        {contentType === 'url' && (
                            <CheckCircle className="w-6 h-6 text-blue-600 mx-auto" />
                        )}
                    </div>
                </Card>

                {/* AI Generated */}
                <Card
                    className={`p-6 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg ${contentType === 'ai'
                        ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 shadow-lg"
                        : "border-slate-200 dark:border-zinc-700 hover:border-purple-300 bg-white dark:bg-zinc-800"
                        }`}
                    onClick={() => handleContentTypeSelect('ai')}
                >
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                Generazione AI
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-zinc-400">
                                The AI will automatically generate an optimized script based on the selected target audience and language
                            </p>
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            Suggested
                        </Badge>
                        {contentType === 'ai' && (
                            <CheckCircle className="w-6 h-6 text-purple-600 mx-auto" />
                        )}
                    </div>
                </Card>

                {/* Manual Script */}
                <Card
                    className={`p-6 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg ${contentType === 'manual'
                        ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 shadow-lg"
                        : "border-slate-200 dark:border-zinc-700 hover:border-green-300 bg-white dark:bg-zinc-800"
                        }`}
                    onClick={() => handleContentTypeSelect('manual')}
                >
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                            <Edit3 className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                Custom Script
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-zinc-400">
                                Write your custom script for full control
                            </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                            Full Control
                        </Badge>
                        {contentType === 'manual' && (
                            <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                        )}
                    </div>
                </Card>
            </div>

            {/* Content Configuration */}
            {contentType && (
                <Card className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-zinc-900/50 dark:to-slate-900/50 border-2 border-slate-200 dark:border-zinc-700 rounded-xl p-6">
                    <div className="space-y-6">
                        {/* URL Input */}
                        {contentType === 'url' && (
                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                                    <Globe className="w-5 h-5 mr-2 text-blue-600" />
                                    Product URL
                                </Label>
                                <div className="flex gap-3">
                                    <Input
                                        placeholder="https://your-website.com/product"
                                        value={websiteUrl}
                                        onChange={(e) => {
                                            onContentUpdate({ websiteUrl: e.target.value })
                                            setUrlError("")
                                        }}
                                        className="flex-1 bg-white dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 focus:border-blue-500"
                                        disabled={isAnalyzing}
                                    />
                                    <Button
                                        onClick={handleUrlAnalysis}
                                        disabled={!websiteUrl.trim() || isAnalyzing}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <ScanEye className="w-4 h-4 mr-2" />
                                                Analyze
                                            </>
                                        )}
                                    </Button>
                                </div>
                                {urlError && (
                                    <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        <span className="text-red-700 dark:text-red-300 font-medium">{urlError}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Manual Script */}
                        {contentType === 'manual' && (
                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                                    <Type className="w-5 h-5 mr-2 text-green-600" />
                                    Your Script
                                </Label>
                                <Textarea
                                    placeholder="Write your custom script for the video..."
                                    value={customScript}
                                    onChange={(e) => onContentUpdate({ customScript: e.target.value })}
                                    className="min-h-[120px] bg-white dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 focus:border-green-500 rounded-xl resize-none"
                                />
                                <p className="text-sm text-slate-500 dark:text-zinc-500">
                                    Tip: Keep the script between 30-50 words for a 15-second video
                                </p>
                            </div>
                        )}

                        {/* AI Generation Notice */}
                        {contentType === 'ai' && (
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                                            AI Generated Script
                                        </h4>
                                        <p className="text-purple-800 dark:text-purple-200 mb-3">
                                            The AI will automatically generate an optimized script based on the selected target audience and language.
                                        </p>
                                        <div className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                                            <p>• Custom script for your audience</p>
                                            <p>• Optimized for conversion</p>
                                            <p>• Perfect length for video format</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Audience & Language Selection */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Target Audience */}
                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-orange-600" />
                                    Target Audience
                                </Label>
                                <div className="space-y-3">
                                    {AUDIENCES.map((audience) => (
                                        <Card
                                            key={audience.value}
                                            className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${targetAudience === audience.value
                                                ? "border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 shadow-lg"
                                                : "border-slate-200 dark:border-zinc-700 hover:border-orange-300 bg-white dark:bg-zinc-800"
                                                }`}
                                            onClick={() => onContentUpdate({ targetAudience: audience.value })}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xl">{audience.icon}</span>
                                                    <div>
                                                        <div className="font-semibold text-slate-900 dark:text-white">{audience.label}</div>
                                                        <div className="text-sm text-slate-600 dark:text-zinc-400">{audience.desc}</div>
                                                    </div>
                                                </div>
                                                {targetAudience === audience.value && (
                                                    <CheckCircle className="w-5 h-5 text-orange-600" />
                                                )}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Language Selection */}
                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                                    <Languages className="w-5 h-5 mr-2 text-indigo-600" />
                                    Content Language
                                </Label>
                                <div className="space-y-3">
                                    {LANGUAGES.map((language) => (
                                        <Card
                                            key={language.value}
                                            className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${contentLanguage === language.value
                                                ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 shadow-lg"
                                                : "border-slate-200 dark:border-zinc-700 hover:border-indigo-300 bg-white dark:bg-zinc-800"
                                                }`}
                                            onClick={() => onContentUpdate({ contentLanguage: language.value })}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xl">{language.flag}</span>
                                                    <span className="font-semibold text-slate-900 dark:text-white">{language.label}</span>
                                                </div>
                                                {contentLanguage === language.value && (
                                                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                                                )}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Selected Configuration Summary */}
            {contentType && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                    <h4 className="font-bold text-green-900 dark:text-green-100 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Selected Configuration
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-green-800 dark:text-green-200">Content Type:</span>
                            <p className="text-green-700 dark:text-green-300 capitalize">
                                {contentType === 'url' ? 'Analisi Sito Web' :
                                    contentType === 'ai' ? 'Generazione AI' : 'Script Manuale'}
                            </p>
                        </div>
                        <div>
                            <span className="font-medium text-green-800 dark:text-green-200">Target Audience:</span>
                            <p className="text-green-700 dark:text-green-300">{selectedAudience?.label}</p>
                        </div>
                        <div>
                            <span className="font-medium text-green-800 dark:text-green-200">Language:</span>
                            <p className="text-green-700 dark:text-green-300">{selectedLanguage?.label}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
} 