import type { Metadata } from 'next'
import { BlogHeader } from "@/components/layout/blog-header"
import { Footer } from "@/components/layout/footer"
import { BreadcrumbsSEO } from "@/components/ui/breadcrumbs-seo"

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
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <BlogHeader />

            <main className="pt-16">
                {/* Breadcrumbs */}
                <div className="max-w-7xl mx-auto px-4 pt-4">
                    <BreadcrumbsSEO
                        items={[
                            { label: 'About', href: '/about', current: true }
                        ]}
                    />
                </div>

                {/* Hero Section - stile molto più clean come il blog */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                                About Fast Ads AI
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                Fast Ads AI transforms the way businesses create video advertisements.
                                Our AI-powered platform converts product images into high-converting video ads in minutes,
                                helping dropshippers and e-commerce brands scale their marketing efforts.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Section - layout semplificato */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        We believe that creating high-quality video ads shouldn't require expensive agencies,
                                        complex software, or hours of manual work. Our mission is to democratize video marketing
                                        by making professional ad creation accessible to everyone.
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        With Fast Ads AI, any business can transform simple product images into compelling
                                        video advertisements that drive conversions across all major social platforms.
                                    </p>
                                </div>
                            </div>

                            {/* Statistiche semplificate */}
                            <div className="space-y-6">
                                <div className="border-l-2 border-gray-200 dark:border-zinc-800 pl-4">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">10K+</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                                </div>
                                <div className="border-l-2 border-gray-200 dark:border-zinc-800 pl-4">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">500K+</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Ads Created</p>
                                </div>
                                <div className="border-l-2 border-gray-200 dark:border-zinc-800 pl-4">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3 Min</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Creation Time</p>
                                </div>
                                <div className="border-l-2 border-gray-200 dark:border-zinc-800 pl-4">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">4.9★</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">User Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technology Section - semplificato */}
                <section className="py-16 px-4 border-t border-gray-200 dark:border-zinc-800">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-12 text-gray-900 dark:text-white">
                            Powered by Advanced AI Technology
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Computer Vision</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Our AI analyzes product images to understand features, benefits, and optimal presentation angles.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Natural Language Processing</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Generates compelling scripts and copy that resonate with your target audience.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Video Synthesis</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Creates professional video ads with realistic voices and engaging visuals.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section - molto più semplice */}
                <section className="py-16 px-4 border-t border-gray-200 dark:border-zinc-800">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-12 text-gray-900 dark:text-white">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div>
                                <h3 className="font-bold text-base mb-2 text-gray-900 dark:text-white">Innovation</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Constantly pushing the boundaries of what's possible with AI.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-gray-900 dark:text-white">Accessibility</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Making professional tools available to businesses of all sizes.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-gray-900 dark:text-white">Quality</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Delivering high-quality results that drive real business growth.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-gray-900 dark:text-white">Speed</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
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