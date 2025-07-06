import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { X, Brain, Wand2, Camera, Lightbulb, Leaf, Palette, Scissors, ShoppingBag, Crown } from "lucide-react"

interface DynamicPrompt {
    id: string
    name: string
    prompt: string
    description: string
}

interface DynamicPromptSelectorProps {
    dynamicPrompts: DynamicPrompt[]
    selectedPrompt: DynamicPrompt | null
    onPromptSelect: (prompt: DynamicPrompt | null) => void
    isAnalyzing: boolean
    analysisComplete: boolean
    aiAnalysis: string
    isGenerating?: boolean
}

const getPromptIcon = (promptId: string, index: number) => {
    // Icone diverse basate su contenuto e posizione per varietà
    if (promptId.includes('clean') || promptId.includes('professional') || promptId.includes('studio'))
        return <Camera className="w-5 h-5" />
    if (promptId.includes('lighting') || promptId.includes('dramatic'))
        return <Lightbulb className="w-5 h-5" />
    if (promptId.includes('lifestyle') || promptId.includes('context'))
        return <Leaf className="w-5 h-5" />
    if (promptId.includes('transparent') || promptId.includes('background'))
        return <Scissors className="w-5 h-5" />
    if (promptId.includes('luxury') || promptId.includes('premium'))
        return <Crown className="w-5 h-5" />
    if (promptId.includes('vintage') || promptId.includes('retro'))
        return <Palette className="w-5 h-5" />
    if (promptId.includes('ecommerce') || promptId.includes('commerce'))
        return <ShoppingBag className="w-5 h-5" />

    // Fallback basato su indice per varietà
    const icons = [<Camera className="w-5 h-5" />, <Lightbulb className="w-5 h-5" />, <Leaf className="w-5 h-5" />, <Crown className="w-5 h-5" />, <Palette className="w-5 h-5" />]
    return icons[index % icons.length] || <Wand2 className="w-5 h-5" />
}

const getPromptGradient = (promptId: string, index: number) => {
    // Gradienti colorati diversi
    if (promptId.includes('clean') || promptId.includes('professional') || promptId.includes('studio'))
        return 'from-slate-600 to-slate-700'
    if (promptId.includes('lighting') || promptId.includes('dramatic'))
        return 'from-amber-500 to-orange-600'
    if (promptId.includes('lifestyle') || promptId.includes('context'))
        return 'from-emerald-500 to-teal-600'
    if (promptId.includes('transparent') || promptId.includes('background'))
        return 'from-violet-500 to-purple-600'
    if (promptId.includes('luxury') || promptId.includes('premium'))
        return 'from-yellow-500 to-amber-600'
    if (promptId.includes('vintage') || promptId.includes('retro'))
        return 'from-rose-500 to-pink-600'
    if (promptId.includes('ecommerce') || promptId.includes('commerce'))
        return 'from-blue-500 to-indigo-600'

    // Gradienti diversi basati su indice
    const gradients = [
        'from-blue-500 to-purple-600',
        'from-green-500 to-emerald-600',
        'from-red-500 to-rose-600',
        'from-orange-500 to-yellow-600',
        'from-pink-500 to-purple-600'
    ]
    return gradients[index % gradients.length] || 'from-blue-500 to-purple-600'
}

export const DynamicPromptSelector = ({
    dynamicPrompts,
    selectedPrompt,
    onPromptSelect,
    isAnalyzing,
    analysisComplete,
    aiAnalysis,
    isGenerating = false
}: DynamicPromptSelectorProps) => {
    const [hoveredPrompt, setHoveredPrompt] = useState<string | null>(null)
    const [hoveredBadge, setHoveredBadge] = useState(false)

    if (isAnalyzing) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-400 animate-pulse" />
                    <Label className="text-slate-700 dark:text-zinc-300 font-medium">
                        AI Analyzing Your Product...
                    </Label>
                </div>
                <div className="space-y-2.5">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-16 w-full bg-slate-800/50" />
                    ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-500">
                    🧠 Generating custom prompts based on your specific product image...
                </p>
            </div>
        )
    }

    if (!analysisComplete) {
        return null
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <Brain className="w-5 h-5 text-blue-400" />
                            <Label className="text-slate-700 dark:text-zinc-300 font-medium">
                                AI-Generated Prompts
                            </Label>
                        </div>
                        <div
                            className="relative"
                            onMouseEnter={() => setHoveredBadge(true)}
                            onMouseLeave={() => setHoveredBadge(false)}
                        >
                            <Badge variant="secondary" className="flex items-center gap-2 text-xs bg-blue-950/50 text-blue-300 border-blue-400/20 cursor-help">
                                AI Analysis
                            </Badge>

                            {/* AI Analysis Tooltip */}
                            {hoveredBadge && aiAnalysis && (
                                <div className="absolute bottom-full right-0 mb-2 w-80 bg-slate-900/95 border border-blue-400/30 backdrop-blur-sm rounded-lg p-4 shadow-2xl z-[10000] animate-in fade-in duration-200">
                                    <div className="flex items-start gap-2">
                                        <Brain className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs font-medium text-blue-300 mb-1">AI Analysis:</p>
                                            <p className="text-xs text-slate-300 leading-relaxed">{aiAnalysis}</p>
                                        </div>
                                    </div>
                                    {/* Arrow pointing down to the badge */}
                                    <div className="absolute top-full right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-400/30"></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-500">
                        Prompts generated specifically for your product image
                    </p>
                </div>
                {selectedPrompt && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPromptSelect(null)}
                        className="text-slate-500 hover:text-slate-700 p-2 h-8"
                        title="Clear selection"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* Dynamic Prompts */}
            {dynamicPrompts.length > 0 ? (
                <div className="space-y-2.5 relative">
                    {dynamicPrompts.map((prompt, index) => (
                        <div key={prompt.id} className="relative">
                            <Button
                                onClick={() => onPromptSelect(prompt)}
                                disabled={isGenerating}
                                variant="outline"
                                onMouseEnter={() => setHoveredPrompt(prompt.id)}
                                onMouseLeave={() => setHoveredPrompt(null)}
                                className={`group relative flex flex-row items-center w-full py-3 px-4 h-auto text-left transition-all duration-300 ease-out
                                    ${selectedPrompt?.id === prompt.id
                                        ? 'border-2 border-blue-400 bg-blue-950/50 shadow-lg shadow-blue-400/20'
                                        : 'border border-slate-600 bg-slate-800/50 hover:bg-blue-950/30 hover:border-blue-400/50'
                                    }
                                    ${isGenerating ? 'opacity-50' : ''}
                                `}
                            >
                                <div className={`shrink-0 w-10 h-10 mr-4 rounded-lg bg-gradient-to-r ${getPromptGradient(prompt.id, index)} text-white flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110`}>
                                    {getPromptIcon(prompt.id, index)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium text-white text-sm truncate">
                                            {prompt.name}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-slate-300 line-clamp-2">
                                        {prompt.description}
                                    </p>
                                </div>
                                {/* Selection indicator */}
                                {selectedPrompt?.id === prompt.id && (
                                    <div className="shrink-0 w-6 h-6 ml-3 rounded-full bg-blue-400 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                )}
                            </Button>

                            {/* Hover Tooltip - Shows actual prompt */}
                            {hoveredPrompt === prompt.id && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-slate-900/95 border border-blue-400/30 backdrop-blur-sm rounded-lg p-4 shadow-2xl z-[10000] animate-in fade-in duration-200">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Brain className="w-4 h-4 text-blue-400" />
                                            <p className="font-medium text-white text-sm">
                                                {prompt.name}
                                            </p>
                                        </div>
                                        <p className="text-xs text-slate-300 mb-2">
                                            {prompt.description}
                                        </p>
                                        <div className="bg-slate-800/50 rounded p-2 border border-slate-600/50">
                                            <p className="text-xs text-blue-300 font-mono leading-relaxed">
                                                "{prompt.prompt}"
                                            </p>
                                        </div>
                                    </div>
                                    {/* Arrow pointing down to the button */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-400/30"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-6 bg-slate-800/30 rounded-lg border border-slate-600/50">
                    <Brain className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm text-slate-400 mb-1">No AI prompts generated</p>
                    <p className="text-xs text-slate-500">Try uploading a different product image</p>
                </div>
            )}
        </div>
    )
} 