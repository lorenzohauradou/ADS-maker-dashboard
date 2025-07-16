"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link2 } from "lucide-react"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"

interface OpusClipDemoProps {
    className?: string
}

type Platform = "LinkedIn" | "Instagram" | "YouTube" | "TikTok" | "X"

interface Product {
    id: number
    name: string
    image: string
    videoSrc: Record<Platform, string>
}

interface GeneratedClip {
    platform: Platform
    score: number
    icon: {
        source: string
        width: number
        height: number
    }
    width: string
    height: string
}

export function OpusClipDemo({ className }: OpusClipDemoProps) {
    const [isAnimating, setIsAnimating] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(0)
    const [buttonExpanded, setButtonExpanded] = useState(false)
    const [clipsExiting, setClipsExiting] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const isMobile = useIsMobile()
    const products: Product[] = [
        {
            id: 1,
            name: "Red Bull",
            image: "/ai_redbull.png",
            videoSrc: {
                LinkedIn: "/redbull_op.mp4",
                Instagram: "/rb_op.mp4",
                YouTube: "/redbull_watermarked.mp4",
                TikTok: "/redbull_watermarked.mp4",
                X: "/redbull_watermarked.mp4"
            }
        },
        {
            id: 2,
            name: "Micro Vent",
            image: "/vent.jpg",
            videoSrc: {
                LinkedIn: "/ad_yt.mp4",
                Instagram: "/output_ventilatore_avatar.mp4",
                YouTube: "/output_aspirapolvere.mp4",
                TikTok: "/Veg-cutter.mp4",
                X: "/maschera.mp4"
            }
        },
    ]

    const generatedClips: GeneratedClip[] = [
        { platform: "LinkedIn", score: 95, icon: { source: "/inlogo.png", width: 32, height: 32 }, width: "w-64", height: "h-40" },
        { platform: "Instagram", score: 99, icon: { source: "/instalogo.png", width: 28, height: 28 }, width: "w-48", height: "h-48" },
        { platform: "YouTube", score: 97, icon: { source: "/ytlogo.png", width: 24, height: 24 }, width: "w-64", height: "h-40" },
        { platform: "TikTok", score: 98, icon: { source: "/tiktoklogo.png", width: 24, height: 24 }, width: "w-48", height: "h-48" },
        { platform: "X", score: 97, icon: { source: "/xlogo.png", width: 24, height: 24 }, width: "w-64", height: "h-40" },
    ]

    const handleGetClips = () => {
        if (isAnimating) return

        setIsAnimating(true)
        setButtonExpanded(true)

        // Reset button expansion
        setTimeout(() => {
            setButtonExpanded(false)
        }, 200)

        // Show results sliding from left
        setTimeout(() => {
            setShowResults(true)
            setIsAnimating(false)
        }, 400)

        // Start exit animation and prepare next product
        setTimeout(() => {
            setClipsExiting(true)

            // While clips exit to right, show new product
            setTimeout(() => {
                setShowResults(false)
                setClipsExiting(false)
                setCurrentProduct((prev) => (prev + 1) % products.length)
            }, 500)
        }, 4000)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeout(() => {
                setIsClicking(true)
                handleGetClips()
                setTimeout(() => {
                    setIsClicking(false)
                }, 200)
            }, 800)
        }, 1000)

        return () => clearTimeout(timer)
    }, [currentProduct])

    const currentProductData = products[currentProduct]

    return (
        <div className={`relative ${className}`}>
            {/* Main demo container - OpusClip style */}
            <div className="relative bg-gray-800/20 rounded-3xl p-12 border border-gray-700/30 backdrop-blur-md">

                {/* Main content area */}
                <div className="relative max-w-3xl mx-auto">

                    {/* Top area - product video with fixed space */}
                    <div className="flex justify-center mb-12 h-[280px]">
                        {!isAnimating && !showResults && (
                            <div className="relative group animate-in fade-in slide-in-from-top duration-500">
                                <div className="w-[250px] h-[250px] bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-600/40 shadow-2xl backdrop-blur-sm">
                                    <Image
                                        src={currentProductData.image}
                                        alt={currentProductData.name}
                                        fill
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />

                                    <div className="absolute bottom-4 right-4">
                                        <div className="bg-black/80 text-white text-sm font-medium px-3 py-1 rounded-lg backdrop-blur-sm">
                                            {currentProductData.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="flex justify-center mb-16 relative">
                        <div className="relative w-[510px] h-[90px] max-w-2xl">
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm"></div>

                            {/* Main input container */}
                            <div className="relative flex h-[70px] items-center bg-gray-700/80 rounded-full px-8 py-5 border border-gray-600/60 backdrop-blur-md shadow-2xl">
                                <Link2 className="w-5 h-5 text-gray-400 mr-4 flex-shrink-0" />
                                {isMobile ? (
                                    <span className="text-gray-200 text-lg flex-1 font-medium">Upload</span>
                                ) : (
                                    <span className="text-gray-200 text-lg flex-1 font-medium">Drop a product photo and ...</span>
                                )}

                                {/* Integrated button with better styling */}
                                <Button
                                    onClick={handleGetClips}
                                    disabled={isAnimating}
                                    className={`ml-6 bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-base transition-all shadow-xl disabled:opacity-50 flex-shrink-0 ${buttonExpanded ? 'scale-110' : 'scale-100'
                                        }`}
                                >
                                    {isAnimating ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-gray-400 border-t-black rounded-full animate-spin"></div>
                                            Get ads
                                        </div>
                                    ) : (
                                        "Get ads"
                                    )}
                                </Button>
                            </div>

                            {/* Navigation icon */}
                            <div className="absolute right-2 top-16 transform -translate-y-1/2 pointer-events-none z-10">
                                <div className={`transition-transform duration-200 ${isClicking ? 'scale-95' : 'scale-100'}`}>
                                    <Image
                                        src="/navigation.png"
                                        alt="Navigation"
                                        width={40}
                                        height={40}
                                        className="w-10 h-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results area - clips with improved layout */}
                    <div className="min-h-[16rem] mb-12 overflow-hidden">
                        {showResults && (
                            <div className={`transition-transform duration-500 ${clipsExiting
                                ? 'animate-out slide-out-to-right'
                                : 'animate-in slide-in-from-left'
                                }`}>
                                <div className="flex justify-center items-end gap-6 px-4">
                                    {generatedClips.map((clip, index) => (
                                        <div
                                            key={`${currentProductData.id}-${clip.platform}`}
                                            className="relative group cursor-pointer animate-in zoom-in duration-300"
                                            style={{
                                                animationDelay: clipsExiting ? '0ms' : `${index * 80}ms`
                                            }}
                                        >
                                            <div className={`${clip.width} ${clip.height} bg-gray-900/80 rounded-xl overflow-hidden border border-gray-600/40 hover:border-gray-500/60 transition-all hover:scale-105 shadow-xl backdrop-blur-sm`}>
                                                <video
                                                    className="w-full h-full object-cover"
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                >
                                                    <source src={currentProductData.videoSrc[clip.platform]} type="video/mp4" />
                                                </video>

                                                {/* Platform icon - better positioned */}
                                                <div className="absolute top-3 right-3">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border border-gray-600/30`}>
                                                        <Image src={clip.icon.source} alt={clip.platform} width={clip.icon.width} height={clip.icon.height} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 