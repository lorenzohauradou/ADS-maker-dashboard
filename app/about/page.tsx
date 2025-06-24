import type { Metadata } from 'next'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbsSEO } from "@/components/ui/breadcrumbs-seo"
import { Sparkles, Users, Target, Zap } from "lucide-react"

export const metadata: Metadata = {
    title: 'About Fast Ads AI - AI-Powered Video Ad Creation Platform',
    description: 'Learn about Fast Ads AI, the revolutionary AI platform that transforms product images into viral video ads in minutes. Perfect for dropshippers and e-commerce businesses.',
    keywords: [
        'about fast ads ai',
        'ai video creation company',
        'dropshipping tools company',
        'video ad automation platform',
        'ai marketing solutions'
    ],
    openGraph: {
        title: 'About Fast Ads AI - Revolutionary AI Video Ad Platform',
        description: 'Discover how Fast Ads AI is transforming e-commerce marketing with AI-powered video ad creation.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://fastadsai.com/about',
    },
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 pt-4">
                    <BreadcrumbsSEO
                        items={[
                            { label: 'About', href: '/about', current: true }
                        ]}
                    />
                </div>

                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <Badge variant="secondary" className="mb-6">
                            <Sparkles className="w-4 h-4 mr-2" />
                            About Fast Ads AI
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Revolutionizing Video Ad Creation
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {" "}with AI
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Fast Ads AI transforms the way businesses create video advertisements.
                            Our AI-powered platform converts product images into high-converting video ads in minutes,
                            helping dropshippers and e-commerce brands scale their marketing efforts.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16 px-4 bg-muted/50">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                                <p className="text-lg text-muted-foreground mb-6">
                                    We believe that creating high-quality video ads shouldn't require expensive agencies,
                                    complex software, or hours of manual work. Our mission is to democratize video marketing
                                    by making professional ad creation accessible to everyone.
                                </p>
                                <p className="text-lg text-muted-foreground">
                                    With Fast Ads AI, any business can transform simple product images into compelling
                                    video advertisements that drive conversions across all major social platforms.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-6 text-center">
                                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                    <h3 className="font-bold text-2xl mb-2">10K+</h3>
                                    <p className="text-sm text-muted-foreground">Active Users</p>
                                </Card>
                                <Card className="p-6 text-center">
                                    <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                    <h3 className="font-bold text-2xl mb-2">500K+</h3>
                                    <p className="text-sm text-muted-foreground">Ads Created</p>
                                </Card>
                                <Card className="p-6 text-center">
                                    <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                    <h3 className="font-bold text-2xl mb-2">3 Min</h3>
                                    <p className="text-sm text-muted-foreground">Average Creation Time</p>
                                </Card>
                                <Card className="p-6 text-center">
                                    <Sparkles className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                                    <h3 className="font-bold text-2xl mb-2">4.9★</h3>
                                    <p className="text-sm text-muted-foreground">User Rating</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technology Section */}
                <section className="py-16 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-12">Powered by Advanced AI Technology</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="p-8">
                                <h3 className="text-xl font-bold mb-4">Computer Vision</h3>
                                <p className="text-muted-foreground">
                                    Our AI analyzes product images to understand features, benefits, and optimal presentation angles.
                                </p>
                            </Card>
                            <Card className="p-8">
                                <h3 className="text-xl font-bold mb-4">Natural Language Processing</h3>
                                <p className="text-muted-foreground">
                                    Generates compelling scripts and copy that resonate with your target audience.
                                </p>
                            </Card>
                            <Card className="p-8">
                                <h3 className="text-xl font-bold mb-4">Video Synthesis</h3>
                                <p className="text-muted-foreground">
                                    Creates professional video ads with realistic voices and engaging visuals.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 px-4 bg-muted/50">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center">
                                <h3 className="font-bold text-lg mb-2">Innovation</h3>
                                <p className="text-sm text-muted-foreground">
                                    Constantly pushing the boundaries of what's possible with AI.
                                </p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg mb-2">Accessibility</h3>
                                <p className="text-sm text-muted-foreground">
                                    Making professional tools available to businesses of all sizes.
                                </p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg mb-2">Quality</h3>
                                <p className="text-sm text-muted-foreground">
                                    Delivering high-quality results that drive real business growth.
                                </p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg mb-2">Speed</h3>
                                <p className="text-sm text-muted-foreground">
                                    Enabling rapid creation and iteration of marketing content.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
} 