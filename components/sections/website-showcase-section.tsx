"use client"


import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, ArrowRight, TrendingUp } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function WebsiteShowcaseSection() {
    const isMobile = useIsMobile()

    return (
        <section id="websites" className="py-20 md:py-32 px-4 relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
            {/* Subtle Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/3 to-background"></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-500/3 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/2 rounded-full blur-3xl"></div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20 md:mb-28">
                    <Badge
                        variant="secondary"
                        className="mb-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                    >
                        <Globe className="w-4 h-4 mr-2" />
                        High-Converting Landing Pages
                    </Badge>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        Beautiful{" "}
                        <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Websites
                        </span>
                        <br />
                        <span className="text-xl md:text-3xl lg:text-4xl text-muted-foreground font-normal">
                            That Actually Convert
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                        Every video ad comes with a professionally designed landing page
                        <br className="hidden md:block" />
                        optimized for maximum conversions across all devices.
                    </p>
                </div>

                {/* Devices Showcase */}
                {isMobile ? (
                    // Mobile Layout
                    <div className="relative min-h-[700px] flex flex-col items-center justify-center px-6 space-y-12">
                        {/* Mobile Device - Center */}
                        <div className="relative group">
                            <div className="relative transform hover:scale-105 transition-all duration-500">
                                <Image
                                    src="/mobile1.png"
                                    alt="Mobile Landing Page"
                                    width={280}
                                    height={608}
                                    className="w-48 h-auto rounded-2xl shadow-xl drop-shadow-xl"
                                    priority
                                />
                                {/* Simplified Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-2xl blur-lg opacity-40 -z-10"></div>

                                {/* Floating Badge */}
                                <div className="absolute -top-3 -right-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg border border-border/30">
                                    <div className="flex items-center gap-1.5 text-sm font-medium">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-green-600 dark:text-green-400">8.2%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Devices Row */}
                        <div className="flex items-center justify-center gap-8 w-full px-2">
                            {/* Desktop 1 - Left */}
                            <div className="relative group flex-1 flex justify-end">
                                <div className="relative transform rotate-[-3deg] hover:rotate-[-1deg] transition-all duration-500 hover:scale-105">
                                    <Image
                                        src="/pc1.png"
                                        alt="Desktop Landing Page"
                                        width={500}
                                        height={500}
                                        className="w-40 h-auto rounded-lg shadow-lg drop-shadow-lg"
                                        priority
                                    />
                                    {/* Simplified Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/15 to-purple-500/15 rounded-lg blur-md opacity-40 -z-10"></div>

                                    {/* Floating Badge */}
                                    <div className="absolute -top-3 -left-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg border border-border/30">
                                        <div className="flex items-center gap-1.5 text-sm font-medium">
                                            <TrendingUp className="w-3 h-3 text-pink-500" />
                                            <span className="text-pink-600 dark:text-pink-400">7.6%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop 2 - Right */}
                            <div className="relative group flex-1 flex justify-start">
                                <div className="relative transform rotate-[3deg] hover:rotate-[1deg] transition-all duration-500 hover:scale-105">
                                    <Image
                                        src="/pc2.png"
                                        alt="Desktop Landing Page"
                                        width={240}
                                        height={180}
                                        className="w-40 h-auto rounded-lg shadow-lg drop-shadow-lg"
                                        priority
                                    />
                                    {/* Simplified Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-lg blur-md opacity-40 -z-10"></div>

                                    {/* Floating Badge */}
                                    <div className="absolute -top-3 -right-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg border border-border/30">
                                        <div className="flex items-center gap-1.5 text-sm font-medium">
                                            <TrendingUp className="w-3 h-3 text-blue-500" />
                                            <span className="text-blue-600 dark:text-blue-400">6.1%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Desktop Layout (unchanged)
                    <div className="relative min-h-[850px] md:min-h-[750px] flex items-center justify-center px-4 md:px-8 lg:px-16">

                        {/* Desktop 1 - Left */}
                        <div
                            className="absolute left-2 md:left-8 lg:left-20 xl:left-28 top-[50%] transform -translate-y-1/2 z-10"
                        >
                            <div className="relative group">
                                <div className="relative transform rotate-[-6deg] hover:rotate-[-3deg] transition-all duration-700 hover:scale-105">
                                    <Image
                                        src="/pc1.png"
                                        alt="Desktop Landing Page"
                                        width={480}
                                        height={360}
                                        className="w-80 md:w-88 lg:w-[480px] h-auto rounded-xl shadow-2xl drop-shadow-2xl"
                                        priority
                                    />
                                    {/* Enhanced Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-20"></div>

                                    {/* Floating Badge */}
                                    <div className="absolute -top-4 -left-12 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-border/30 opacity-75 group-hover:opacity-95 transition-all duration-300 group-hover:scale-102">
                                        <div className="flex items-center gap-1.5 text-xs font-medium">
                                            <TrendingUp className="w-3 h-3 text-pink-500" />
                                            <span className="text-pink-600 dark:text-pink-400">7.6% CVR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile - Center */}
                        <div
                            className="absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 z-30"
                        >
                            <div className="relative group">
                                <div className="relative transform hover:scale-110 transition-all duration-700">
                                    <Image
                                        src="/mobile1.png"
                                        alt="Mobile Landing Page"
                                        width={320}
                                        height={692}
                                        className="w-52 md:w-60 lg:w-80 h-auto rounded-2xl drop-shadow-2xl"
                                        priority
                                    />
                                    {/* Enhanced Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-20"></div>

                                    {/* Floating Badge */}
                                    <div className="absolute -top-4 -left-8 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-border/30 opacity-75 group-hover:opacity-95 transition-all duration-300 group-hover:scale-102">
                                        <div className="flex items-center gap-1.5 text-xs font-medium">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-green-600 dark:text-green-400">8.2% CVR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop 2 - Right */}
                        <div
                            className="absolute right-2 md:right-8 lg:right-20 xl:right-28 top-[55%] transform -translate-y-1/2 z-20"
                        >
                            <div className="relative group">
                                <div className="mb-24 transform rotate-[4deg] hover:rotate-[2deg] transition-all duration-700 hover:scale-105">
                                    <Image
                                        src="/pc2.png"
                                        alt="Desktop Landing Page"
                                        width={480}
                                        height={360}
                                        className="w-80 md:w-88 lg:w-[480px] h-auto rounded-xl shadow-2xl drop-shadow-2xl"
                                        priority
                                    />
                                    {/* Enhanced Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-lg blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-lg blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-20"></div>

                                    {/* Floating Badge */}
                                    <div className="absolute -top-4 -right-8 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-border/30 opacity-75 group-hover:opacity-95 transition-all duration-300 group-hover:scale-102">
                                        <div className="flex items-center gap-1.5 text-xs font-medium">
                                            <TrendingUp className="w-3 h-3 text-blue-500" />
                                            <span className="text-blue-600 dark:text-blue-400">6.1% CVR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Section */}
                <div className="text-center mt-12 md:mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto mb-16">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                                7.2%
                            </div>
                            <div className="text-sm md:text-base text-muted-foreground">
                                Average Conversion Rate
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                150K+
                            </div>
                            <div className="text-sm md:text-base text-muted-foreground">
                                Monthly Visitors
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                98%
                            </div>
                            <div className="text-sm md:text-base text-muted-foreground">
                                Customer Satisfaction
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">
                            Ready to Create Your High-Converting Landing Page?
                        </h3>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                            Join thousands of successful entrepreneurs who are already
                            <br className="hidden md:block" />
                            converting visitors into customers with our AI-powered landing pages.
                        </p>

                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8 py-4 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Globe className="w-5 h-5 mr-2" />
                            Start Creating Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
} 