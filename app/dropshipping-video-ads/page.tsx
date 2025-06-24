import type { Metadata } from 'next'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BreadcrumbsSEO } from "@/components/ui/breadcrumbs-seo"
import {
    Play,
    ArrowRight,
    Target,
    Clock,
    DollarSign,
    Zap,
    CheckCircle,
    Star,
    TrendingUp
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Dropshipping Video Ads Creator - AI-Powered TikTok & Instagram Ads | Fast Ads AI',
    description: 'Create high-converting dropshipping video ads in 3 minutes. Transform product images into viral TikTok, Instagram & Facebook ads. Perfect for dropshippers. Try free!',
    keywords: [
        'dropshipping video ads',
        'dropshipping ad creator',
        'tiktok ads for dropshipping',
        'instagram video ads dropshipping',
        'facebook ads dropshipping',
        'product video ads creator',
        'dropshipping marketing tools',
        'viral dropshipping ads',
        'ai dropshipping ads',
        'dropshipping video maker'
    ],
    openGraph: {
        title: 'Dropshipping Video Ads Creator - Turn Products Into Viral Ads',
        description: 'AI-powered tool for dropshippers. Create high-converting video ads for TikTok, Instagram & Facebook in 3 minutes. No video editing skills needed!',
        type: 'website',
    },
    alternates: {
        canonical: 'https://fastadsai.com/dropshipping-video-ads',
    },
}

export default function DropshippingVideoAdsPage() {
    const benefits = [
        "No video editing experience required",
        "3-minute creation process",
        "Optimized for all social platforms",
        "High-converting ad scripts",
        "Ultra-realistic AI voices",
        "Professional animations"
    ]

    const platforms = [
        { name: "TikTok", icon: "🎵", specs: "9:16 ratio, 15-60s" },
        { name: "Instagram Reels", icon: "📸", specs: "9:16 ratio, perfect sizing" },
        { name: "Facebook Ads", icon: "📘", specs: "Multiple formats supported" },
        { name: "YouTube Shorts", icon: "📺", specs: "Optimized for mobile" }
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 pt-4">
                    <BreadcrumbsSEO
                        items={[
                            { label: 'Dropshipping Video Ads', href: '/dropshipping-video-ads', current: true }
                        ]}
                    />
                </div>

                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <Badge variant="secondary" className="mb-6">
                            <Target className="w-4 h-4 mr-2" />
                            #1 Tool for Dropshippers
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Create Viral{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Dropshipping Video Ads
                            </span>
                            <br />in 3 Minutes
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                            Transform your product images into high-converting video ads for TikTok, Instagram, and Facebook.
                            No video editing skills needed. Perfect for dropshippers who want to scale fast.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-xl px-12 py-6" asChild>
                                <Link href="/login">
                                    <Play className="w-6 h-6 mr-3" />
                                    Start Creating Ads Free
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-xl px-12 py-6" asChild>
                                <Link href="/#showcase">
                                    Watch Examples
                                    <ArrowRight className="w-6 h-6 ml-3" />
                                </Link>
                            </Button>
                        </div>

                        {/* Social proof */}
                        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="font-medium">4.9/5 Rating</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="font-medium">500K+ Ads Created</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">3 Min Average</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Dropshippers Choose Us */}
                <section className="py-16 px-4 bg-muted/50">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Why 10,000+ Dropshippers Choose Fast Ads AI
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="p-8 text-center">
                                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4">Lightning Fast</h3>
                                <p className="text-muted-foreground">
                                    Upload product images and get professional video ads in 3 minutes.
                                    No more waiting days for video editors.
                                </p>
                            </Card>
                            <Card className="p-8 text-center">
                                <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4">High-Converting</h3>
                                <p className="text-muted-foreground">
                                    Our AI analyzes winning ad patterns to create scripts and visuals
                                    that drive sales for dropshipping products.
                                </p>
                            </Card>
                            <Card className="p-8 text-center">
                                <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4">Cost Effective</h3>
                                <p className="text-muted-foreground">
                                    Replace expensive video agencies. Create unlimited ads
                                    for a fraction of the cost of hiring freelancers.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Platform Support */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Optimized for All Major Platforms
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {platforms.map((platform, index) => (
                                <Card key={index} className="p-6 text-center">
                                    <div className="text-4xl mb-4">{platform.icon}</div>
                                    <h3 className="font-bold text-lg mb-2">{platform.name}</h3>
                                    <p className="text-sm text-muted-foreground">{platform.specs}</p>
                                </Card>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <p className="text-muted-foreground">
                                Videos automatically sized and optimized for maximum engagement on each platform
                            </p>
                        </div>
                    </div>
                </section>

                {/* Benefits List */}
                <section className="py-16 px-4 bg-muted/50">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-8">
                                    Everything You Need for Dropshipping Success
                                </h2>
                                <div className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                                            <span className="text-lg">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                                        <Link href="/login">
                                            <Zap className="w-5 h-5 mr-2" />
                                            Start Free Trial
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
                                <h3 className="text-xl font-bold mb-4">Perfect for:</h3>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li>• Print on Demand stores</li>
                                    <li>• Electronics dropshipping</li>
                                    <li>• Fashion & accessories</li>
                                    <li>• Home & garden products</li>
                                    <li>• Beauty & cosmetics</li>
                                    <li>• Gadgets & tools</li>
                                    <li>• Pet products</li>
                                    <li>• Any physical product!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">
                            Ready to Scale Your Dropshipping Business?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of successful dropshippers who use Fast Ads AI to create viral video ads.
                            Start your free trial today - no credit card required.
                        </p>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-xl px-12 py-6" asChild>
                            <Link href="/login">
                                Create Your First Ad Free
                                <ArrowRight className="w-6 h-6 ml-3" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
} 