"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function WebsiteShowcaseSection() {
    const websites = [
        {
            id: 1,
            title: "E-commerce Store",
            description: "Online store for dropshipping products",
            image: "/mask.png",
            conversionRate: "8.2%",
            category: "E-commerce"
        },
        {
            id: 2,
            title: "Fortnite Rifle",
            description: "Online store for kids games",
            image: "/rifle_web.png",
            conversionRate: "6.8%",
            category: "E-commerce"
        },
        {
            id: 3,
            title: "Micron Vent",
            description: "Product landing page for a dropshipping product",
            image: "/vent_web.png",
            conversionRate: "7.6%",
            category: "Dropshipping"
        }
    ]

    return (
        <section id="websites" className="py-20 px-4 bg-[#000000]">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white leading-tight">
                        Auto-Generated Websites
                    </h2>
                    <p className="text-lg text-[#9ca3af] max-w-3xl mx-auto">
                        Every video ad comes with a professionally designed website.
                        Optimized for conversions, generated in seconds.
                    </p>
                </div>

                {/* Website Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {websites.map((website) => (
                        <div
                            key={website.id}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-[#2a2a2a] border border-[#3a3a3a] transition-all duration-300 hover:scale-[1.02]">
                                {/* Website Preview */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={website.image}
                                        alt={website.title}
                                        fill
                                        className="w-full h-full object-cover object-top"
                                        priority
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="bg-white text-black hover:bg-gray-100"
                                        >
                                            <Globe className="w-4 h-4 mr-2" />
                                            View Website
                                        </Button>
                                    </div>

                                    {/* Conversion Rate Badge */}
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                        <span className="text-white text-sm font-medium">{website.conversionRate}</span>
                                    </div>
                                </div>

                                {/* Website Info */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-medium text-white">{website.title}</h3>
                                        <span className="text-xs text-[#6b7280] bg-[#3a3a3a] px-2 py-1 rounded">
                                            {website.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#9ca3af]">{website.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-white mb-2">7.2%</div>
                        <div className="text-sm text-[#9ca3af]">Average Conversion Rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-white mb-2">30s</div>
                        <div className="text-sm text-[#9ca3af]">Generation Time</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-white mb-2">100%</div>
                        <div className="text-sm text-[#9ca3af]">Mobile Optimized</div>
                    </div>
                </div>
            </div>
        </section>
    )
} 