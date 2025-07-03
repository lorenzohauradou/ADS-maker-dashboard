import type { Metadata } from 'next'
import { BlogHeader } from "@/components/layout/blog-header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Users, Sparkles, BarChart3, Bot } from "lucide-react"
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
    // Categorie per la sidebar - più clean come Lovable
    const categories = [
        { name: 'Latest', slug: 'latest' },
        { name: 'Performance Marketing', slug: 'performance-marketing' },
        { name: 'AI Tools', slug: 'ai-tools' },
        { name: 'Case Studies', slug: 'case-studies' },
        { name: 'Platform Updates', slug: 'platform-updates' },
        { name: 'Industry Insights', slug: 'industry-insights' },
    ]

    // Articoli con focus più serio e business-oriented
    const blogPosts = [
        {
            id: 1,
            title: "The AI Dropshipping Revolution: Ultimate 2025 Guide to Building Million-Dollar Brands",
            excerpt: "Complete guide to AI-powered dropshipping: automated product research, AI content generation, brand building with artificial intelligence, and scaling strategies that generate $90K+ monthly revenue.",
            category: "AI Dropshipping",
            readTime: "4 min read",
            publishDate: "2025-06-15",
            slug: "ai-dropshipping-revolution-2025",
            featured: true,
            metrics: "90K+ monthly revenue",
            difficulty: "Advanced",
            thumbnail: "from-pink-500 to-orange-500",
            icon: TrendingUp
        },
        {
            id: 2,
            title: "Instagram Reels Algorithm: Technical Analysis and Optimization Framework",
            excerpt: "Data-driven breakdown of Instagram's 2025 algorithm changes, with actionable optimization strategies based on 50,000+ Reels performance analysis.",
            category: "Algorithm Optimization",
            readTime: "5 min read",
            publishDate: "2025-06-12",
            slug: "instagram-reels-algorithm-2025",
            featured: true,
            metrics: "50k+ Reels analyzed",
            difficulty: "Expert",
            thumbnail: "from-purple-500 to-blue-500",
            icon: BarChart3
        },
        {
            id: 3,
            title: "AI Video Creation: Complete ROI Analysis and Implementation Guide",
            excerpt: "Comprehensive evaluation of AI video tools for e-commerce, including cost-benefit analysis, performance benchmarks, and implementation roadmap.",
            category: "AI Tools",
            readTime: "5 min read",
            publishDate: "2025-06-10",
            slug: "ai-video-creation-2025",
            featured: true,
            metrics: "90% cost reduction",
            difficulty: "Intermediate",
            thumbnail: "from-blue-500 to-cyan-500",
            icon: Bot
        },
        {
            id: 4,
            title: "E-commerce Growth Strategies: Market Analysis and Forecasting for 2025",
            excerpt: "Strategic analysis of e-commerce trends, market opportunities, and growth frameworks based on industry research and performance data.",
            category: "Industry Insights",
            readTime: "5 min read",
            publishDate: "2025-06-08",
            slug: "dropshipping-trends-2025",
            featured: true,
            metrics: "Industry research",
            difficulty: "Strategic",
            thumbnail: "from-emerald-500 to-teal-500",
            icon: Target
        },
        {
            id: 5,
            title: "Instagram Video Formats: Performance Comparison and Best Practices",
            excerpt: "Complete analysis of different Instagram video formats with performance metrics and best practices for maximum engagement.",
            category: "Platform Updates",
            readTime: "5 min read",
            publishDate: "2025-06-05",
            slug: "instagram-formats-comparison",
            featured: false,
            metrics: "Format comparison",
            difficulty: "Beginner",
            thumbnail: "from-rose-500 to-pink-500",
            icon: Users
        },
        {
            id: 6,
            title: "Viral TikTok Ads: Complete Analysis and Optimization Guide",
            excerpt: "Step-by-step breakdown of viral TikTok advertisements with actionable insights for creating high-converting video content.",
            category: "Case Studies",
            readTime: "5 min read",
            publishDate: "2025-06-03",
            slug: "viral-tiktok-ads-guide",
            featured: false,
            metrics: "Viral analysis",
            difficulty: "Intermediate",
            thumbnail: "from-indigo-500 to-purple-500",
            icon: Sparkles
        }
    ]

    const featuredPosts = blogPosts.filter(post => post.featured)
    const recentPosts = blogPosts.slice(0, 6)

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <BlogHeader />

            <main className="pt-16">
                {/* Hero Section molto più clean come Lovable */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                                Blog
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Compiled notes from the Fast Ads AI team
                            </p>
                        </div>
                    </div>
                </section>

                {/* Layout principale con sidebar */}
                <section className="px-4 pb-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-16">
                            {/* Sidebar sinistra - molto più clean come Lovable */}
                            <aside className="lg:w-64 flex-shrink-0">
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.slug}
                                            href={`/blog?category=${category.slug}`}
                                            className="block py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </aside>

                            {/* Contenuto principale */}
                            <div className="flex-1">
                                {/* Featured Posts Grid - più grande come Lovable */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                                    {featuredPosts.map((post) => (
                                        <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                                            <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-zinc-800">
                                                {/* Thumbnail più grande e colorato */}
                                                <div className={`h-64 bg-gradient-to-br ${post.thumbnail} relative`}>
                                                    <div className="absolute inset-0 bg-black/10"></div>
                                                    <div className="absolute top-4 left-4">
                                                        <Badge className="bg-black/20 backdrop-blur-sm text-white border-0 text-xs">
                                                            {post.category}
                                                        </Badge>
                                                    </div>
                                                    <div className="absolute bottom-4 right-4">
                                                        <div className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                            <post.icon className="w-6 h-6 text-white" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-6">
                                                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 dark:text-gray-400">
                                                        <span>
                                                            {new Date(post.publishDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{post.readTime}</span>
                                                    </div>

                                                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {post.title}
                                                    </h3>

                                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                                        {post.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* All Posts - Layout più simile a Lovable */}
                                <div className="space-y-6">
                                    {recentPosts.map((post) => (
                                        <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                                            <div className="flex items-start gap-6 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 hover:shadow-md transition-all duration-300">
                                                {/* Mini thumbnail */}
                                                <div className={`w-20 h-20 bg-gradient-to-br ${post.thumbnail} rounded-lg flex-shrink-0 flex items-center justify-center`}>
                                                    <post.icon className="w-8 h-8 text-white" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <span className="text-gray-900 dark:text-gray-300 font-medium">{post.category}</span>
                                                        <span>•</span>
                                                        <span>
                                                            {new Date(post.publishDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{post.readTime}</span>
                                                    </div>

                                                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {post.title}
                                                    </h3>

                                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
} 