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
    Camera,
    Eye,
    Heart,
    Zap,
    CheckCircle,
    Star,
    Instagram
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Instagram Video Ads Creator - Stories, Reels & Feed Ads | Fast Ads AI',
    description: 'Create stunning Instagram video ads for Stories, Reels, and Feed. Transform product images into engaging Instagram ads in 3 minutes. Perfect for visual brands.',
    keywords: [
        'instagram video ads',
        'instagram ads creator',
        'instagram reels ads',
        'instagram stories ads',
        'instagram feed ads',
        'instagram marketing tool',
        'instagram ad generator',
        'ai instagram ads',
        'instagram content creator'
    ],
    openGraph: {
        title: 'Instagram Video Ads Creator - Stories, Reels & Feed Ads',
        description: 'AI-powered Instagram video ads creator. Create stunning ads for Stories, Reels, and Feed in minutes.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://fastadsai.com/instagram-video-ads',
    },
}

export default function InstagramVideoAdsPage() {
    const instagramFormats = [
        { name: "Instagram Reels", specs: "9:16 vertical, 15-90s", icon: "🎬" },
        { name: "Instagram Stories", specs: "9:16 vertical, 15s", icon: "📲" },
        { name: "Instagram Feed", specs: "1:1 square or 4:5", icon: "📸" },
        { name: "IGTV", specs: "9:16 vertical, 60s+", icon: "📺" }
    ]

    const instagramFeatures = [
        "Multiple format optimization",
        "Visual-first content design",
        "Hashtag suggestions included",
        "Story-specific templates",
        "Professional aesthetics",
        "Brand-consistent styling"
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 pt-4">
                    <BreadcrumbsSEO
                        items={[
                            { label: 'Instagram Video Ads', href: '/instagram-video-ads', current: true }
                        ]}
                    />
                </div>

                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <Badge variant="secondary" className="mb-6">
                            <Instagram className="w-4 h-4 mr-2" />
                            #1 Instagram Ads Creator
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Create Stunning{" "}
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Instagram Video Ads
                            </span>
                            <br />for Every Format
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                            Transform your product images into visually stunning Instagram ads.
                            Perfect for Stories, Reels, and Feed - optimized for maximum engagement and conversions.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-xl px-12 py-6" asChild>
                                <Link href="/login">
                                    <Play className="w-6 h-6 mr-3" />
                                    Create Instagram Ads Free
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-xl px-12 py-6" asChild>
                                <Link href="/#showcase">
                                    <Camera className="w-6 h-6 mr-3" />
                                    View Examples
                                </Link>
                            </Button>
                        </div>

                        {/* Instagram stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            <div className="text-center p-4 bg-muted/50 rounded-xl">
                                <div className="text-2xl mb-2">👥</div>
                                <div className="text-2xl font-bold text-purple-600">2B+</div>
                                <div className="text-sm text-muted-foreground">Monthly Users</div>
                            </div>
                            <div className="text-center p-4 bg-muted/50 rounded-xl">
                                <div className="text-2xl mb-2">📈</div>
                                <div className="text-2xl font-bold text-purple-600">58%</div>
                                <div className="text-sm text-muted-foreground">Higher Engagement</div>
                            </div>
                            <div className="text-center p-4 bg-muted/50 rounded-xl">
                                <div className="text-2xl mb-2">💰</div>
                                <div className="text-2xl font-bold text-purple-600">$25B</div>
                                <div className="text-sm text-muted-foreground">Ad Revenue</div>
                            </div>
                            <div className="text-center p-4 bg-muted/50 rounded-xl">
                                <div className="text-2xl mb-2">🎯</div>
                                <div className="text-2xl font-bold text-purple-600">90%</div>
                                <div className="text-sm text-muted-foreground">Follow Brands</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Instagram Formats */}
                <section className="py-16 px-4 bg-muted/50">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Optimized for Every Instagram Format
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {instagramFormats.map((format, index) => (
                                <Card key={index} className="p-6 text-center">
                                    <div className="text-4xl mb-4">{format.icon}</div>
                                    <h3 className="font-bold text-lg mb-2">{format.name}</h3>
                                    <p className="text-sm text-muted-foreground">{format.specs}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-8">
                                    Built for Instagram's Visual Culture
                                </h2>
                                <div className="space-y-4">
                                    {instagramFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                                            <span className="text-lg">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                                        <Link href="/login">
                                            <Zap className="w-5 h-5 mr-2" />
                                            Start Creating Instagram Ads
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="aspect-[9/16] bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                            <div className="text-white text-center">
                                                <Camera className="w-8 h-8 mx-auto mb-2" />
                                                <p className="text-sm font-bold">Stories</p>
                                            </div>
                                        </div>
                                        <div className="aspect-square bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                            <div className="text-white text-center">
                                                <Eye className="w-8 h-8 mx-auto mb-2" />
                                                <p className="text-sm font-bold">Feed</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="aspect-[9/16] bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto max-w-32">
                                            <div className="text-white text-center">
                                                <Heart className="w-8 h-8 mx-auto mb-2" />
                                                <p className="text-sm font-bold">Reels</p>
                                            </div>
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
                            Instagram Success Stories
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="p-6">
                                <div className="text-4xl mb-4">💄</div>
                                <h3 className="font-bold text-lg mb-2">Beauty Brand</h3>
                                <p className="text-muted-foreground mb-4">
                                    "Our Instagram Reels ads achieved 5M views and 300% ROI increase"
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
                                <div className="text-4xl mb-4">👗</div>
                                <h3 className="font-bold text-lg mb-2">Fashion Store</h3>
                                <p className="text-muted-foreground mb-4">
                                    "Instagram Stories ads drove 50,000 website visits in one week"
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
                                <div className="text-4xl mb-4">🏋️</div>
                                <h3 className="font-bold text-lg mb-2">Fitness Brand</h3>
                                <p className="text-muted-foreground mb-4">
                                    "From 1K to 100K followers using our Instagram ad strategy"
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
                            Ready to Dominate Instagram?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of brands creating stunning Instagram ads with Fast Ads AI.
                            Start your free trial and get your first ad in 3 minutes.
                        </p>
                        <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-xl px-12 py-6" asChild>
                            <Link href="/login">
                                <Instagram className="w-6 h-6 mr-3" />
                                Create Your First Instagram Ad
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