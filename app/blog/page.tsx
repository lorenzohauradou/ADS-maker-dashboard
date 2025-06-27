import type { Metadata } from 'next'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BreadcrumbsSEO } from "@/components/ui/breadcrumbs-seo"
import { Calendar, Clock, ArrowRight, BookOpen, Target, TrendingUp, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Video Marketing Blog - Expert Guides & Case Studies | Fast Ads AI',
    description: 'Advanced video marketing strategies and AI advertising insights. Learn from real case studies, expert analysis, and proven frameworks that drive results.',
    keywords: [
        'video marketing strategies',
        'ai advertising insights',
        'marketing case studies',
        'conversion optimization',
        'ecommerce growth',
        'performance marketing',
        'video ads ROI',
        'marketing automation'
    ],
    openGraph: {
        title: 'Video Marketing Blog - Expert Strategies & Case Studies',
        description: 'Advanced marketing insights and proven strategies from industry experts. Transform your business with data-driven video marketing.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://fastadsai.com/blog',
    },
}

export default function BlogPage() {
    // Articoli con focus più serio e business-oriented
    const blogPosts = [
        {
            id: 1,
            title: "TikTok Advertising ROI: Complete Performance Analysis for 2025",
            excerpt: "Comprehensive analysis of TikTok advertising performance metrics, with real campaign data and optimization strategies that generated 340% ROAS improvement.",
            category: "Performance Marketing",
            readTime: "12 min read",
            publishDate: "2025-06-15",
            slug: "viral-tiktok-ads-2025",
            featured: true,
            metrics: "340% ROAS",
            difficulty: "Advanced"
        },
        {
            id: 2,
            title: "Instagram Reels Algorithm: Technical Analysis and Optimization Framework",
            excerpt: "Data-driven breakdown of Instagram's 2025 algorithm changes, with actionable optimization strategies based on 50,000+ Reels performance analysis.",
            category: "Algorithm Optimization",
            readTime: "15 min read",
            publishDate: "2025-06-12",
            slug: "instagram-reels-algorithm-2025",
            featured: true,
            metrics: "50k+ Reels analyzed",
            difficulty: "Expert"
        },
        {
            id: 3,
            title: "AI Video Creation: Complete ROI Analysis and Implementation Guide",
            excerpt: "Comprehensive evaluation of AI video tools for e-commerce, including cost-benefit analysis, performance benchmarks, and implementation roadmap.",
            category: "Marketing Technology",
            readTime: "18 min read",
            publishDate: "2025-06-10",
            slug: "ai-video-creation-2025",
            featured: true,
            metrics: "90% cost reduction",
            difficulty: "Intermediate"
        },
        {
            id: 4,
            title: "E-commerce Growth Strategies: Market Analysis and Forecasting for 2025",
            excerpt: "Strategic analysis of e-commerce trends, market opportunities, and growth frameworks based on industry research and performance data.",
            category: "Business Strategy",
            readTime: "20 min read",
            publishDate: "2025-06-08",
            slug: "dropshipping-trends-2025",
            featured: true,
            metrics: "Industry research",
            difficulty: "Strategic"
        }
    ]

    const featuredPosts = blogPosts.filter(post => post.featured)

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 pt-4">
                    <BreadcrumbsSEO
                        items={[
                            { label: 'Blog', href: '/blog', current: true }
                        ]}
                    />
                </div>

                {/* Hero Section - More Professional */}
                <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
                    <div className="container mx-auto">
                        <div className="max-w-4xl mx-auto text-center">
                            <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Marketing Intelligence Hub
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Advanced{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Video Marketing
                                </span>
                                <br />Strategies & Insights
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                                Expert analysis, performance data, and proven frameworks from marketing professionals
                                who have generated millions in revenue through video advertising.
                            </p>

                            {/* Value Proposition Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
                                <div className="text-center p-4 bg-white/50 rounded-lg border">
                                    <div className="text-2xl font-bold text-primary mb-1">500M+</div>
                                    <div className="text-sm text-muted-foreground">Ad Spend Analyzed</div>
                                </div>
                                <div className="text-center p-4 bg-white/50 rounded-lg border">
                                    <div className="text-2xl font-bold text-primary mb-1">2,400+</div>
                                    <div className="text-sm text-muted-foreground">Campaigns Optimized</div>
                                </div>
                                <div className="text-center p-4 bg-white/50 rounded-lg border">
                                    <div className="text-2xl font-bold text-primary mb-1">340%</div>
                                    <div className="text-sm text-muted-foreground">Avg. ROAS Improvement</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Content */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Expert Analysis & Case Studies</h2>
                                <p className="text-muted-foreground">Data-driven insights from real campaigns and performance analysis</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {featuredPosts.map((post) => (
                                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                                    <div className="p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Badge variant="secondary" className="bg-primary/10 text-primary font-medium">
                                                {post.category}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                                {post.difficulty}
                                            </Badge>
                                        </div>

                                        <h3 className="text-xl font-bold mb-4 leading-tight line-height-tight">
                                            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                                {post.title}
                                            </Link>
                                        </h3>

                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        {/* Metrics highlight */}
                                        <div className="bg-muted/50 p-3 rounded-lg mb-6">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium">Key Metric: {post.metrics}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {post.readTime}
                                                </div>
                                            </div>
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
                                            >
                                                Read Analysis
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section for Funnel */}
                <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-purple-600/5">
                    <div className="container mx-auto">
                        <div className="max-w-4xl mx-auto text-center">
                            <Target className="w-12 h-12 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl font-bold mb-6">Ready to Implement These Strategies?</h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Transform your marketing with AI-powered video creation.
                                Start creating high-converting video ads in minutes, not hours.
                            </p>

                            {/* Benefits list */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto text-left">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-sm">Generate videos from single product images</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-sm">Platform-optimized for TikTok & Instagram</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-sm">AI-powered optimization for better ROAS</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-sm">Scale content creation without scaling costs</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                                    <Link href="/dashboard">
                                        Start Creating Videos
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/#demo">
                                        Watch Demo
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Signup */}
                <section className="py-16 px-4 border-t">
                    <div className="container mx-auto">
                        <div className="max-w-2xl mx-auto text-center">
                            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Join 12,000+ Marketing Professionals</h3>
                            <p className="text-muted-foreground mb-6">
                                Get weekly insights, case studies, and advanced strategies delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Your professional email"
                                    className="flex-1 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <Button className="bg-primary hover:bg-primary/90">
                                    Subscribe
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                                No spam. Unsubscribe anytime. Used by marketing teams at Fortune 500 companies.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
} 