import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PresetSelectorProps } from "../types"
import { PRESET_STYLES } from "../constants/preset-styles"
import { useState } from "react"

export const PresetSelector = ({ onStyleSelect, selectedStyle, isGenerating }: PresetSelectorProps) => {
    const [hoveredPreset, setHoveredPreset] = useState<string | null>(null)

    return (
        <div className="space-y-4">
            <div>
                <Label className="text-slate-700 dark:text-zinc-300 font-medium">
                    Choose Marketing Style
                </Label>
            </div>

            <div className="space-y-2.5 relative">
                {PRESET_STYLES.map((preset) => (
                    <div key={preset.id} className="relative">
                        <Button
                            onClick={() => onStyleSelect(preset)}
                            disabled={isGenerating}
                            variant="outline"
                            onMouseEnter={() => setHoveredPreset(preset.id)}
                            onMouseLeave={() => setHoveredPreset(null)}
                            className={`group relative flex flex-row items-center w-full py-3 px-4 h-auto text-left transition-all duration-300 ease-out
                                ${selectedStyle?.id === preset.id
                                    ? 'border-2 border-blue-400 bg-[#0A1929] shadow-lg shadow-blue-400/20'
                                    : 'border border-slate-600 bg-slate-800/50 hover:bg-[#0A1929]/70 hover:border-blue-400/50'
                                }
                                ${isGenerating ? 'opacity-50' : ''}
                            `}
                        >
                            <div className={`shrink-0 w-10 h-10 mr-4 rounded-lg bg-gradient-to-r ${preset.gradient} text-white flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110`}>
                                {preset.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-white text-base truncate">
                                    {preset.name}
                                </h4>
                                <p className="text-sm text-slate-300 line-clamp-2 mt-0.5">
                                    {preset.description}
                                </p>
                            </div>
                            {/* Indicatore di selezione */}
                            {selectedStyle?.id === preset.id && (
                                <div className="shrink-0 w-6 h-6 ml-3 rounded-full bg-blue-400 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            )}
                        </Button>

                        {/* Custom Hover Tooltip - Verso l'alto */}
                        {hoveredPreset === preset.id && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-[#0A1929]/95 border border-blue-400/20 backdrop-blur-sm rounded-lg p-4 shadow-2xl z-[10000] animate-in fade-in duration-200">
                                <div className="space-y-1.5">
                                    <p className="font-medium text-white">
                                        {preset.name}
                                    </p>
                                    <p className="text-sm text-slate-300">
                                        {preset.description}
                                    </p>
                                    {preset.example && (
                                        <p className="text-xs text-blue-400/80 italic">
                                            Example: {preset.example}
                                        </p>
                                    )}
                                </div>
                                {/* Arrow pointing down to the button */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-400/20"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
} 