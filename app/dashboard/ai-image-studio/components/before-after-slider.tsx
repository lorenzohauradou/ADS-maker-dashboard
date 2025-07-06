import { useState, useRef, useCallback } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BeforeAfterSliderProps } from "../types"

export const BeforeAfterSlider = ({ originalImage, enhancedImage }: BeforeAfterSliderProps) => {
    const [sliderPosition, setSliderPosition] = useState(50)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = (x / rect.width) * 100
        setSliderPosition(Math.max(0, Math.min(100, percentage)))
    }, [])

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const percentage = (x / rect.width) * 100
        setSliderPosition(Math.max(0, Math.min(100, percentage)))
    }, [])

    return (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-600">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Your Marketing Asset
                </h3>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                        {enhancedImage.size}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {enhancedImage.format}
                    </Badge>
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative aspect-square bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden cursor-ew-resize touch-pan-x"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
            >
                {/* Enhanced Image */}
                <img
                    src={enhancedImage.url}
                    alt="Enhanced"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Original Image Overlay */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                >
                    <img
                        src={originalImage}
                        alt="Original"
                        className="w-full h-full object-cover"
                        style={{ width: `${100 * (100 / sliderPosition)}%` }}
                    />
                </div>

                {/* Slider Line */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <div className="flex gap-1">
                            <ArrowLeft className="w-3 h-3 text-slate-600" />
                            <ArrowRight className="w-3 h-3 text-slate-600" />
                        </div>
                    </div>
                </div>

                {/* Labels */}
                <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Original
                </div>
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Enhanced
                </div>
            </div>

            <p className="text-sm text-slate-500 dark:text-zinc-500 text-center">
                <span className="hidden sm:inline">Drag the slider to compare </span>
                <span className="sm:hidden">Swipe to compare </span>
                original vs enhanced image
            </p>
        </div>
    )
} 