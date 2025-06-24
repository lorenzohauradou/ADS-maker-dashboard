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
    Smartphone,
    Clock,
    TrendingUp,
    Zap,
    CheckCircle,
    Star,
    Music,
    Hash
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'TikTok Video Ads Creator - Make Viral TikTok Ads in Minutes | Fast Ads AI',
    description: 'Create viral TikTok video ads that convert. AI-powered tool transforms product images into engaging TikTok ads in 3 minutes. Perfect for e-commerce and dropshippers.',
    keywords: [
        'tiktok video ads',
        'tiktok ads creator',
        'viral tiktok ads',
        'tiktok advertising tool',
        'tiktok video maker',
        'tiktok marketing tool',
        'tiktok ad generator',
        'ai tiktok ads',
        'tiktok content creator',
        'tiktok business ads'
    ],
    openGraph: {
        title: 'TikTok Video Ads Creator - Make Viral Ads That Convert',
        description: 'AI-powered TikTok video ads creator. Transform product images into viral TikTok ads in minutes. No video editing skills needed!',
        type: 'website',
    },
    alternates: {
        canonical: 'https://fastadsai.com/tiktok-video-ads',
    },
}

export default function TikTokVideoAdsPage() {
    const tiktokFeatures = [
        "Perfect 9:16 vertical format",
        "15-60 second optimized duration",
        "Trending music integration",
        "Gen Z-focused copywriting",
        "Hook-heavy opening sequences",
        "Mobile-first design"
    ]

    const tiktokStats = [
        { number: "1B+", label: "Monthly Active Users", icon: "👥" },
        { number: "52%", label: "Higher Engagement vs Facebook", icon: "📈" },
        { number: "3.5x", label: "More Likely to Share", icon: "🔄" },
        { number: "38%", label: "Gen Z's Favorite Platform", icon: "🎯" }
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 pt-4">
                    <BreadcrumbsSEO
                        items={[
                            { label: 'TikTok Video Ads', href: '/tiktok-video-ads', current: true }
                        ]}
                    />
                </div>

                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <Badge variant="secondary" className="mb-6">
                            <Music className="w-4 h-4 mr-2" />
                            #1 TikTok Ads Creator
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Create{" "}
                            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                Viral TikTok Ads
                            </span>
                            <br />That Actually Convert
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                            Transform your product images into scroll-stopping TikTok ads.
                            Our AI understands TikTok's unique culture, trends, and formats to create videos that go viral and drive sales.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-xl px-12 py-6" asChild>
                                <Link href="/login">
                                    <Play className="w-6 h-6 mr-3" />
                                    Create TikTok Ads Free
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-xl px-12 py-6" asChild>
                                <Link href="/#showcase">
                                    <Hash className="w-6 h-6 mr-3" />
                                    See Viral Examples
                                </Link>
                            </Button>
                        </div>

                        {/* TikTok-specific stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {tiktokStats.map((stat, index) => (
                                <div key={index} className="text-center p-4 bg-muted/50 rounded-xl">
                                    <div className="text-2xl mb-2">{stat.icon}</div>
                                    <div className="text-2xl font-bold text-pink-600">{stat.number}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why TikTok is Different */}
                <section className="py-16 px-4 bg-muted/50">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Why TikTok Ads Require a Different Approach
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="p-8 text-center">
                                <Smartphone className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4">Mobile-First Culture</h3>
                                <p className="text-muted-foreground">
                                    TikTok users consume content differently. Our AI creates vertical,
                                    mobile-optimized videos that feel native to the platform.
                                </p>
                            </Card>
                            <Card className="p-8 text-center">
                                <Music className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4">Sound & Rhythm</h3>
                                <p className="text-muted-foreground">
                                    Music and timing are everything on TikTok. We sync your content
                                    with trending beats and optimal pacing for maximum engagement.
                                </p>
                            </Card>
                            <Card className="p-8 text-center">
                                <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4">Trend-Aware Content</h3>
                                <p className="text-muted-foreground">
                                    Our AI stays updated with TikTok trends, hashtags, and formats
                                    to ensure your ads feel current and authentic.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* TikTok-Specific Features */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-8">
                                    Built for TikTok's Unique Format
                                </h2>
                                <div className="space-y-4">
                                    {tiktokFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="w-6 h-6 text-pink-600 flex-shrink-0" />
                                            <span className="text-lg">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button size="lg" className="bg-pink-600 hover:bg-pink-700" asChild>
                                        <Link href="/login">
                                            <Zap className="w-5 h-5 mr-2" />
                                            Start Creating TikTok Ads
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-3xl p-8 border-4 border-black dark:border-white">
                                    <div className="aspect-[9/16] bg-black rounded-2xl flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <Smartphone className="w-16 h-16 mx-auto mb-4" />
                                            <p className="text-lg font-bold">Your Product Ad</p>
                                            <p className="text-sm opacity-75">Optimized for TikTok</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                                            <Music className="w-4 h-4" />
                                            <span>Trending Audio</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Success Stories */}
                <section className="py-16 px-4 bg-muted/50">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-12">
                            TikTok Success Stories
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="p-6">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="font-bold text-lg mb-2">Phone Accessories Store</h3>
                                <p className="text-muted-foreground mb-4">
                                    "Our TikTok ads went viral and brought 10,000 new customers in a week"
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                </div>
                            </Card>
                            <Card className="p-6">
                                <div className="text-4xl mb-4">👕</div>
                                <h3 className="font-bold text-lg mb-2">Fashion Brand</h3>
                                <p className="text-muted-foreground mb-4">
                                    "We doubled our sales in the first month using Fast Ads AI for TikTok"
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                </div>
                            </Card>
                            <Card className="p-6">
                                <div className="text-4xl mb-4">🏠</div>
                                <h3 className="font-bold text-lg mb-2">Home Decor Shop</h3>
                                <p className="text-muted-foreground mb-4">
                                    "From 0 to 50K TikTok followers thanks to our viral product ads"
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Star className="w-4 h-4 text-yellow-500" />
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">
                            Ready to Go Viral on TikTok?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of brands creating viral TikTok ads with Fast Ads AI.
                            Start your free trial and get your first viral ad in 3 minutes.
                        </p>
                        <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-xl px-12 py-6" asChild>
                            <Link href="/login">
                                <Music className="w-6 h-6 mr-3" />
                                Create Your First TikTok Ad
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