import type { Metadata } from 'next'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbsSEO } from "@/components/ui/breadcrumbs-seo"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Video Marketing Blog - Tips, Guides & Strategies | Fast Ads AI',
    description: 'Learn video marketing strategies, AI advertising tips, and growth hacks. Expert guides on TikTok ads, Instagram marketing, and dropshipping success.',
    keywords: [
        'video marketing blog',
        'ai advertising tips',
        'tiktok marketing guide',
        'instagram ads strategy',
        'dropshipping blog',
        'video ads tutorial',
        'social media marketing',
        'ai marketing tools'
    ],
    openGraph: {
        title: 'Video Marketing Blog - Expert Tips & Strategies',
        description: 'Learn from video marketing experts. Get tips on AI advertising, social media growth, and business scaling.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://fastadsai.com/blog',
    },
}

export default function BlogPage() {
    // Articoli aggiornati con trend 2025
    const blogPosts = [
        {
            id: 1,
            title: "Viral TikTok Ads 2025: Trends & Strategies That Actually Work",
            excerpt: "Discover the latest TikTok advertising trends for 2025. Learn proven strategies for creating viral ads that convert, with real examples and actionable tips.",
            category: "TikTok Marketing",
            readTime: "8 min read",
            publishDate: "2025-06-15",
            slug: "viral-tiktok-ads-2025",
            featured: true
        },
        {
            id: 2,
            title: "Instagram Reels Algorithm 2025: How It Really Works & How to Beat It",
            excerpt: "Master the Instagram Reels algorithm in 2025. Learn the latest ranking factors, optimization strategies, and proven tactics to boost your reach.",
            category: "Instagram Marketing",
            readTime: "10 min read",
            publishDate: "2025-06-12",
            slug: "instagram-reels-algorithm-2025",
            featured: true
        },
        {
            id: 3,
            title: "AI Video Creation Tools 2025: The Complete Guide for E-commerce",
            excerpt: "Discover the best AI video creation tools for 2025. Learn how artificial intelligence is revolutionizing video marketing for dropshipping businesses.",
            category: "AI Technology",
            readTime: "12 min read",
            publishDate: "2025-06-10",
            slug: "ai-video-creation-2025",
            featured: true
        },
        {
            id: 4,
            title: "Dropshipping Trends 2025: What Every E-commerce Entrepreneur Must Know",
            excerpt: "Discover the top dropshipping trends for 2025. Learn about market growth, profitable niches, and strategies that will dominate e-commerce this year.",
            category: "Dropshipping",
            readTime: "15 min read",
            publishDate: "2025-06-08",
            slug: "dropshipping-trends-2025",
            featured: true
        },
        {
            id: 5,
            title: "How to Create Viral TikTok Ads That Actually Convert",
            excerpt: "Learn the secrets of viral TikTok advertising. From hook techniques to trending audio, discover what makes TikTok ads go viral and drive sales.",
            category: "TikTok Marketing",
            readTime: "5 min read",
            publishDate: "2024-01-15",
            slug: "viral-tiktok-ads-guide",
            featured: false
        },
        {
            id: 6,
            title: "Instagram Reels vs Stories vs Feed: Which Format Converts Best?",
            excerpt: "Complete analysis of Instagram ad formats. Data-driven insights on which format works best for different business types and campaigns.",
            category: "Instagram Marketing",
            readTime: "7 min read",
            publishDate: "2024-01-12",
            slug: "instagram-formats-comparison",
            featured: false
        }
    ]

    const categories = [
        "All",
        "TikTok Marketing",
        "Instagram Marketing",
        "Dropshipping",
        "AI Technology",
        "Video Marketing",
        "Advertising Strategy"
    ]

    const featuredPosts = blogPosts.filter(post => post.featured)
    const regularPosts = blogPosts.filter(post => !post.featured)

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

                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <Badge variant="secondary" className="mb-6">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Video Marketing Blog
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Learn{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Video Marketing
                            </span>
                            <br />That Actually Works
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Expert tips, proven strategies, and actionable guides to help you master
                            video advertising, grow your business, and stay ahead of the competition.
                        </p>
                    </div>
                </section>

                {/* Featured Posts */}
                <section className="py-16 px-4 bg-muted/50">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">Featured Articles</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {featuredPosts.map((post) => (
                                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="p-8">
                                        <Badge className="mb-4 bg-blue-500 text-white">
                                            {post.category}
                                        </Badge>
                                        <h3 className="text-2xl font-bold mb-4 leading-tight">
                                            <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {post.excerpt}
                                        </p>
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
                                                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                            >
                                                Read More
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Regular Posts */}
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>

                        {/* Categories Filter - Placeholder per futuro */}
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            {categories.map((category) => (
                                <Badge
                                    key={category}
                                    variant={category === "All" ? "default" : "outline"}
                                    className="cursor-pointer hover:bg-accent transition-colors"
                                >
                                    {category}
                                </Badge>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {regularPosts.map((post) => (
                                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="p-6">
                                        <Badge variant="outline" className="mb-3">
                                            {post.category}
                                        </Badge>
                                        <h3 className="text-xl font-bold mb-3 leading-tight">
                                            <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.publishDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter Signup */}
                <section className="py-20 px-4 bg-muted/50">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">
                            Stay Updated with Video Marketing Trends
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Get weekly insights, case studies, and actionable tips delivered to your inbox.
                            Join 10,000+ marketers who read our newsletter.
                        </p>
                        <div className="max-w-md mx-auto flex gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
} 