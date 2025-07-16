"use client"

import { Button } from "@/components/ui/button"
import { Smartphone, Link2 } from "lucide-react"
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
        }
    ]

    return (
        <section className="py-20 px-4 bg-[#000000]">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white leading-tight">
                        Video Ads that Perform
                        <br />
                        <span className="text-lg md:text-3xl text-[#9ca3af] font-normal">For Every Business</span>
                    </h2>
                    <p className="text-lg text-[#9ca3af] max-w-3xl mx-auto">
                        Deliver best performance on E-commerce, SaaS, and social media. Your audience will see you everywhere.
                    </p>
                </div>

                {/* Device Showcase */}
                <div className="relative h-[500px] md:h-[700px] w-full mb-16">
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
                                <div className={`${deviceWidth} ${deviceHeight} bg-[#2a2a2a] border border-[#3a3a3a] rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105`}>
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
                                                <div className="mb-2 text-xs bg-white/20 backdrop-blur-sm border border-white/30 text-white px-2 py-1 rounded inline-block">
                                                    {device.type === "shopify" ? "E-commerce" : "SaaS"}
                                                </div>
                                                <h3 className="text-white font-medium text-sm mb-1">{device.content.title}</h3>
                                                <p className="text-white/80 text-xs">{device.content.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce">
                                    <span className="text-xs">✨</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom Stats */}
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-white mb-2">98%</div>
                        <div className="text-[#9ca3af]">Mobile Compatibility</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-white mb-2">4K</div>
                        <div className="text-[#9ca3af]">Ultra HD Quality</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-white mb-2">Auto</div>
                        <div className="text-[#9ca3af]">Format Optimization</div>
                    </div>
                </div>
            </div>
        </section>
    )
} 