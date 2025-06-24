"use client"

import { Badge } from "@/components/ui/badge"
import { Crown, Sparkles } from "lucide-react"

export function TrustedCompaniesSection() {
    // Famous companies that could use video marketing
    const companies = [
        { name: "Shopify", logo: "SHOPIFY" },
        { name: "Nike", logo: "NIKE" },
        { name: "Samsung", logo: "SAMSUNG" },
        { name: "Coca Cola", logo: "COCA-COLA" },
        { name: "Spotify", logo: "SPOTIFY" },
        { name: "Airbnb", logo: "AIRBNB" },
        { name: "Tesla", logo: "TESLA" },
        { name: "Amazon", logo: "AMAZON" },
        { name: "Netflix", logo: "NETFLIX" },
        { name: "McDonald's", logo: "McDONALD'S" },
        { name: "Apple", logo: "APPLE" },
        { name: "Uber", logo: "UBER" }
    ]

    return (
        <section className="py-16 px-4 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-muted/10 to-background"></div>
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-yellow-600/5 dark:bg-yellow-600/3 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-green-600/5 dark:bg-green-600/3 rounded-full blur-3xl"></div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge
                        variant="secondary"
                        className="mb-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 backdrop-blur-sm"
                    >
                        <Crown className="w-4 h-4 mr-2" />
                        Enterprise Grade
                    </Badge>

                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Trusted by{" "}
                        <span className="bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                            Top-Tier Companies
                        </span>
                        <br />
                        <span className="text-2xl md:text-3xl text-muted-foreground font-normal">
                            of All Sizes 👏
                        </span>
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        From Fortune 500 enterprises to fast-growing startups, businesses worldwide trust our AI to create their video marketing campaigns
                    </p>
                </div>

                {/* Companies Banner */}
                <div className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 dark:from-slate-950/90 dark:via-slate-900/90 dark:to-slate-950/90 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-sm shadow-2xl overflow-hidden">

                    {/* Floating sparkles */}
                    <div className="absolute top-4 left-8">
                        <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                    </div>
                    <div className="absolute bottom-4 right-8">
                        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse delay-500" />
                    </div>
                    <div className="absolute top-6 right-20">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-ping delay-1000"></div>
                    </div>

                    {/* Companies Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
                        {companies.slice(0, 12).map((company, index) => (
                            <div
                                key={company.name}
                                className="group cursor-pointer transition-all duration-300 hover:scale-110"
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <div className="text-center">
                                    {/* Logo Placeholder - you can replace with actual logos */}
                                    <div className="w-20 h-12 md:w-24 md:h-14 bg-gradient-to-r from-slate-600 to-slate-500 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center mb-2 group-hover:from-slate-500 group-hover:to-slate-400 dark:group-hover:from-slate-600 dark:group-hover:to-slate-500 transition-all duration-300 shadow-lg">
                                        <span className="text-white font-bold text-xs md:text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                            {company.logo.length > 8 ? company.logo.substring(0, 8) + "..." : company.logo}
                                        </span>
                                    </div>

                                    {/* Company Name */}
                                    <span className="text-slate-300 dark:text-slate-400 text-xs md:text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                                        {company.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8 pt-6 border-t border-slate-600/30">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-1">500+</div>
                            <div className="text-slate-400 text-sm">Enterprise Clients</div>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-slate-600"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-1">10M+</div>
                            <div className="text-slate-400 text-sm">Videos Created</div>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-slate-600"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                            <div className="text-slate-400 text-sm">Uptime SLA</div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-muted-foreground text-lg mb-4">
                        Join thousands of successful businesses already using FAST ADS AI
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Enterprise Security
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                            24/7 Priority Support
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                            Custom Integrations
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                            Dedicated Account Manager
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
} 