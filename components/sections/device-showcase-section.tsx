"use client"

import { Badge } from "@/components/ui/badge"
import { Smartphone } from "lucide-react"
import Image from "next/image"

export function DeviceShowcaseSection() {
    const devices = [
        {
            id: 1,
            type: "shopify",
            position: { top: "20%", left: "15%" },
            rotation: -8,
            content: {
                src: "/shopify1.webp",
                title: "E-commerce Platform",
                description: "Online Store"
            },
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            type: "saas",
            position: { top: "15%", left: "60%", transform: "translateX(-50%)" },
            rotation: 0,
            content: {
                src: "/stripe-dash.png",
                title: "Analytics Dashboard",
                description: "SaaS Dashboard Pro"
            },
            gradient: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            type: "saas",
            position: { bottom: "25%", left: "25%" },
            rotation: 5,
            content: {
                src: "/stripe2.webp",
                title: "Social Media Feed",
                description: "Content Creator App"
            },
            gradient: "from-green-500 to-emerald-500"
        }
    ]

    return (
        <section className="py-32 px-4 relative overflow-hidden bg-background min-h-screen">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background"></div>
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/3 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/3 rounded-full blur-3xl"></div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <Badge
                        variant="secondary"
                        className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                    >
                        <Smartphone className="w-4 h-4 mr-2" />
                        Multi-Device Experience
                    </Badge>

                    <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                        Video Ads that{" "}
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                            Perform
                        </span>
                        <br />
                        <span className="text-3xl md:text-4xl text-muted-foreground font-normal">For Every Business</span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Deliver its best performance on E-commerce, SaaS, and social media. Your audience will see you everywhere.
                    </p>
                </div>

                {/* Device Showcase */}
                <div className="relative h-[500px] md:h-[700px] w-full">
                    {devices.map((device, index) => {
                        const isPhone = device.type === "phone"
                        const deviceWidth = isPhone ? "w-40 md:w-56" : "w-56 md:w-72"
                        const deviceHeight = isPhone ? "h-[320px] md:h-[450px]" : "h-[380px] md:h-[520px]"

                        // Mobile positioning and rotation classes
                        let positionClasses = ""
                        let rotationClass = ""

                        if (index === 0) {
                            // First phone - centered on mobile
                            positionClasses = "top-[25%] left-1/2 -translate-x-1/2 md:top-[20%] md:left-[15%] md:translate-x-0 z-20"
                            rotationClass = "-rotate-[5deg] md:rotate-[-8deg]"
                        } else if (index === 1) {
                            // Tablet - hidden on mobile, visible on desktop
                            positionClasses = "hidden md:block md:top-[15%] md:left-[70%] md:-translate-x-1/2"
                            rotationClass = "md:rotate-0"
                        } else if (index === 2) {
                            // Second phone - partially hidden behind on mobile  
                            positionClasses = "top-0 left-[65%] -translate-x-1/2 md:bottom-[25%] md:left-[25%] md:translate-x-0 z-10"
                            rotationClass = "rotate-[8deg] md:rotate-[5deg]"
                        }

                        return (
                            <div
                                key={device.id}
                                className={`absolute group cursor-pointer transition-all duration-500 ${positionClasses} ${rotationClass}`}
                            >
                                {/* Device Frame */}
                                <div
                                    className={`${deviceWidth} ${deviceHeight} bg-gradient-to-br ${device.gradient} p-1 rounded-3xl shadow-2xl group-hover:shadow-4xl transition-all duration-500 group-hover:scale-105`}
                                >
                                    <div className="w-full h-full bg-black rounded-3xl overflow-hidden relative">
                                        {/* Device Notch/Camera (for phone) */}
                                        {isPhone && (
                                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10 border-2 border-gray-800"></div>
                                        )}

                                        {/* Content */}
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={device.content.src || "/placeholder.svg"}
                                                alt={device.content.title}
                                                width={400}
                                                height={600}
                                                className="w-full h-full object-cover"
                                                priority
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                            {/* Content Info */}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <Badge
                                                    variant="secondary"
                                                    className="mb-2 text-xs bg-white/20 backdrop-blur-sm border-white/30 text-white"
                                                >
                                                    {device.type === "shopify" ? "📱 Shopify" : "📱 SaaS"}
                                                </Badge>
                                                <h3 className="text-white font-semibold text-sm mb-1">{device.content.title}</h3>
                                                <p className="text-white/80 text-xs">{device.content.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce">
                                    <span className="text-xs">✨</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom Stats */}
                <div className="text-center mt-20">
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">98%</div>
                            <div className="text-muted-foreground">Mobile Compatibility</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">4K</div>
                            <div className="text-muted-foreground">Ultra HD Quality</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Auto</div>
                            <div className="text-muted-foreground">Format Optimization</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 