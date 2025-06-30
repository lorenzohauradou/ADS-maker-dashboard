"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Tablet, Globe, Eye, TrendingUp, ArrowRight } from "lucide-react"

export function WebsiteShowcaseSection() {
    const [isDesktop, setIsDesktop] = useState(false)

    // Detect screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 1024)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const websites = [
        {
            id: 1,
            name: "Enchanting Moon Lamp",
            category: "E-commerce",
            device: "desktop",
            image: "/pc_website1.png",
            conversionRate: "4.2%",
            visits: "12K",
            deviceIcon: Monitor,
        },
        {
            id: 2,
            name: "Micro-Vent",
            category: "Health & Wellness",
            device: "mobile",
            image: "/vent_mobile.png",
            conversionRate: "5.8%",
            visits: "8.5K",
            deviceIcon: Smartphone,
        },
        {
            id: 3,
            name: "Smart Coffee Maker",
            category: "Home & Kitchen",
            device: "tablet",
            image: "/placeholder.jpg",
            conversionRate: "3.9%",
            visits: "15K",
            deviceIcon: Tablet,
        },
        {
            id: 4,
            name: "Gaming Headset Elite",
            category: "Gaming",
            device: "desktop",
            image: "/placeholder.jpg",
            conversionRate: "6.1%",
            visits: "22K",
            deviceIcon: Monitor,
        },
        {
            id: 5,
            name: "Yoga Mat Premium",
            category: "Sports",
            device: "mobile",
            image: "/placeholder.jpg",
            conversionRate: "4.7%",
            visits: "9.8K",
            deviceIcon: Smartphone,
        },
    ]

    const getDeviceGradient = (device: string) => {
        switch (device) {
            case "desktop": return "from-blue-500 to-cyan-500"
            case "mobile": return "from-purple-500 to-pink-500"
            case "tablet": return "from-green-500 to-emerald-500"
            default: return "from-gray-500 to-slate-500"
        }
    }

    const getDeviceFrame = (device: string, children: React.ReactNode) => {
        switch (device) {
            case "desktop":
                return (
                    <div className="relative">
                        {/* Monitor frame */}
                        <div className="bg-slate-800 rounded-t-lg p-1">
                            <div className="bg-black rounded-t-md h-32 sm:h-40 lg:h-48 overflow-hidden">
                                {children}
                            </div>
                        </div>
                        {/* Monitor stand */}
                        <div className="bg-slate-700 h-3 w-16 mx-auto rounded-b-sm"></div>
                        <div className="bg-slate-600 h-2 w-24 mx-auto rounded-b-lg"></div>
                    </div>
                )
            case "mobile":
                return (
                    <div className="relative">
                        {/* Phone frame */}
                        <div className="bg-slate-800 rounded-2xl p-1">
                            <div className="bg-black rounded-xl h-40 sm:h-48 lg:h-56 w-24 sm:w-28 lg:w-32 overflow-hidden relative">
                                {/* Notch */}
                                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-slate-700 rounded-full w-8 h-1"></div>
                                <div className="pt-3">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "tablet":
                return (
                    <div className="relative">
                        {/* Tablet frame */}
                        <div className="bg-slate-800 rounded-lg p-1">
                            <div className="bg-black rounded-md h-36 sm:h-44 lg:h-52 w-28 sm:w-36 lg:w-40 overflow-hidden">
                                {children}
                            </div>
                        </div>
                    </div>
                )
            default:
                return <div>{children}</div>
        }
    }

    return (
        <section id="websites" className="py-16 md:py-24 px-4 relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background"></div>
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-600/10 dark:bg-green-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-12 md:mb-20">
                    <Badge
                        variant="secondary"
                        className="mb-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                    >
                        <Globe className="w-4 h-4 mr-2" />
                        Auto-Generated Landing Pages
                    </Badge>

                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
                        Beautiful{" "}
                        <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient">
                            Websites
                        </span>
                        <br />
                        <span className="text-lg md:text-3xl lg:text-4xl text-muted-foreground font-normal">Created automatically</span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Every video ad comes with a professionally designed landing page, optimized for conversions across all devices.
                    </p>
                </div>

                {/* Website Showcase - Scattered Layout */}
                <div className="relative">
                    {/* Desktop: Scattered layout */}
                    <div className="hidden lg:block">
                        <div className="relative h-[800px] w-full overflow-visible">
                            {websites.map((website, index) => {
                                // Define specific positions for each website
                                const positions = [
                                    { x: '10%', y: '20%', rotate: -8, scale: 1.1 }, // PC - top left, larger
                                    { x: '65%', y: '10%', rotate: 12, scale: 0.7 }, // Mobile - top right
                                    { x: '75%', y: '65%', rotate: -6, scale: 0.8 }, // Tablet - bottom right
                                    { x: '15%', y: '70%', rotate: 8, scale: 0.9 }, // Desktop - bottom left
                                    { x: '45%', y: '45%', rotate: -12, scale: 0.6 }, // Mobile - center
                                ]

                                const position = positions[index] || { x: '50%', y: '50%', rotate: 0, scale: 1 }

                                return (
                                    <div
                                        key={website.id}
                                        className="absolute transition-all duration-700 hover:scale-110 hover:rotate-0 hover:z-50 group cursor-pointer"
                                        style={{
                                            left: position.x,
                                            top: position.y,
                                            transform: `translate(-50%, -50%) rotate(${position.rotate}deg) scale(${position.scale})`,
                                            zIndex: website.device === 'desktop' ? 20 : 10,
                                        }}
                                    >
                                        <div className="relative">
                                            {/* Direct image without card wrapper */}
                                            <div className="relative shadow-2xl group-hover:shadow-4xl transition-all duration-500">
                                                <img
                                                    src={website.image}
                                                    alt={website.name}
                                                    className="rounded-lg object-contain max-w-none"
                                                    style={{
                                                        width: website.device === 'desktop' ? '400px' :
                                                            website.device === 'tablet' ? '280px' : '160px',
                                                        height: 'auto'
                                                    }}
                                                />

                                                {/* Floating info badge */}
                                                <div className="absolute -bottom-4 -right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-border p-3 min-w-[200px]">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <Badge variant="secondary" className="text-xs">
                                                                {website.category}
                                                            </Badge>
                                                            <website.deviceIcon className="w-4 h-4 text-muted-foreground" />
                                                        </div>
                                                        <h3 className="font-semibold text-sm text-foreground mb-2">{website.name}</h3>
                                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                            <span className="flex items-center">
                                                                <Eye className="w-3 h-3 mr-1" />
                                                                {website.visits}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                                {website.conversionRate}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Subtle glow effect */}
                                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Mobile & Tablet: Horizontal scroll */}
                    <div className="lg:hidden">
                        <div className="relative">
                            {/* Scroll container */}
                            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4">
                                {websites.slice(0, 3).map((website, index) => (
                                    <div
                                        key={website.id}
                                        className="flex-shrink-0 w-72 group cursor-pointer"
                                    >
                                        <div className="relative">
                                            <img
                                                src={website.image}
                                                alt={website.name}
                                                className="w-full h-auto rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl"
                                            />

                                            {/* Mobile info card */}
                                            <div className="mt-3 bg-card border border-border rounded-lg p-3 shadow-sm">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Badge variant="secondary" className="text-xs">
                                                        {website.category}
                                                    </Badge>
                                                    <website.deviceIcon className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                                <h3 className="font-semibold text-sm text-foreground mb-2">{website.name}</h3>
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span className="flex items-center">
                                                        <Eye className="w-3 h-3 mr-1" />
                                                        {website.visits}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <TrendingUp className="w-3 h-3 mr-1" />
                                                        {website.conversionRate}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Gradient fade on edges */}
                            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
                        </div>

                        {/* Scroll indicator */}
                        <div className="flex justify-center mt-4 gap-2">
                            {websites.slice(0, 3).map((_, index) => (
                                <div
                                    key={index}
                                    className="w-2 h-2 rounded-full bg-muted-foreground/30"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12 md:mt-20">
                    <p className="text-sm md:text-base text-muted-foreground mb-6">
                        Our AI-generated landing pages achieve an average{" "}
                        <span className="text-green-600 dark:text-green-400 font-semibold">4.8% conversion rate</span>
                    </p>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 text-white"
                    >
                        <Globe className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                        Create Your Landing Page
                        <ArrowRight className="w-4 md:w-5 h-4 md:h-5 ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    )
} 