import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Target, Zap, BarChart3, DollarSign, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogHeader } from '@/components/layout/blog-header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'TikTok Advertising Strategy: Complete Guide to High-Converting Campaigns',
    description: 'Comprehensive TikTok advertising guide with proven conversion strategies, creative frameworks, and performance optimization techniques for 2025.',
    keywords: ['TikTok advertising strategy', 'TikTok campaign optimization', 'social media advertising ROI', 'TikTok conversion tactics', 'video marketing strategy'],
    openGraph: {
        title: 'TikTok Advertising Strategy: Complete Guide to High-Converting Campaigns',
        description: 'Master TikTok advertising with data-driven strategies that deliver measurable business results.',
        type: 'article',
    },
};

export default function TikTokAdvertisingStrategy() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <BlogHeader />

            <main className="pt-16">
                {/* Header del post */}
                <div className="border-b border-gray-200 dark:border-zinc-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 text-sm font-medium"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            All posts
                        </Link>

                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white border-0">
                                    Campaign Strategy
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Updated January 15, 2025
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">18 min read</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                                TikTok Advertising Strategy: Complete Guide to High-Converting Campaigns
                            </h1>

                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                                Comprehensive guide to TikTok advertising success, featuring proven conversion frameworks,
                                creative strategies, and optimization techniques that drive measurable business results.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contenuto dell'articolo */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Key Performance Indicators */}
                    <section className="mb-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
                                <Play className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-red-700 dark:text-red-300">1.7B+</div>
                                <div className="text-sm text-red-600 dark:text-red-400">Monthly Active Users</div>
                            </Card>
                            <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-green-700 dark:text-green-300">73%</div>
                                <div className="text-sm text-green-600 dark:text-green-400">Better Native Performance</div>
                            </Card>
                            <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                                <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">52min</div>
                                <div className="text-sm text-blue-600 dark:text-blue-400">Avg. Session Duration</div>
                            </Card>
                            <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                                <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">37.8M</div>
                                <div className="text-sm text-purple-600 dark:text-purple-400">US Social Commerce Sales</div>
                            </Card>
                        </div>
                    </section>

                    <div className="prose prose-lg max-w-none dark:prose-invert">
                        {/* Strategic Framework */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                                High-Converting Campaign Framework
                            </h2>

                            <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 mb-8">
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    TikTok advertising success requires understanding the platform's unique ecosystem.
                                    Our framework combines <strong>native content strategies</strong> with <strong>performance marketing principles</strong>
                                    to achieve campaigns that feel authentic while driving <strong>measurable business results</strong>.
                                </p>
                            </Card>

                            <Card className="p-8 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400">
                                <h3 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-400">The HPSC Formula</h3>
                                <p className="mb-6 text-gray-700 dark:text-gray-300">
                                    Our proven framework for TikTok campaigns that consistently outperform industry benchmarks:
                                </p>
                                <div className="grid md:grid-cols-4 gap-6">
                                    <div className="text-center">
                                        <div className="bg-red-100 dark:bg-red-800/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                            <span className="font-bold text-red-600 dark:text-red-400 text-lg">H</span>
                                        </div>
                                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Hook</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Attention capture in first 1-3 seconds</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-orange-100 dark:bg-orange-800/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                            <span className="font-bold text-orange-600 dark:text-orange-400 text-lg">P</span>
                                        </div>
                                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Problem</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Pain point identification</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-green-100 dark:bg-green-800/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                            <span className="font-bold text-green-600 dark:text-green-400 text-lg">S</span>
                                        </div>
                                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Solution</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Product demonstration</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-blue-100 dark:bg-blue-800/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                            <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">C</span>
                                        </div>
                                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Call-to-Action</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Clear conversion driver</p>
                                    </div>
                                </div>
                            </Card>
                        </section>

                        {/* Hook Strategies */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                                <Zap className="h-6 w-6 text-yellow-500 mr-3" />
                                Advanced Hook Strategies
                            </h2>

                            <div className="space-y-8">
                                <Card className="p-8 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-400">
                                    <h3 className="text-xl font-semibold mb-4 text-yellow-700 dark:text-yellow-400">Hook Performance Analysis</h3>
                                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                                        <div>
                                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">85%</div>
                                            <div className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Hook Retention Rate</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Optimal first 3 seconds</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">42%</div>
                                            <div className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Conversion Increase</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Question-based hooks</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">67%</div>
                                            <div className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Engagement Boost</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Transformation hooks</div>
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card className="p-6 bg-white dark:bg-zinc-900">
                                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">1. Pattern Interrupt Hook</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">Break expected patterns to capture attention immediately.</p>
                                        <div className="bg-gray-50 dark:bg-zinc-800 p-3 rounded border-l-4 border-blue-400">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">"This $12 tool does what a $300 machine can't..."</p>
                                        </div>
                                    </Card>

                                    <Card className="p-6 bg-white dark:bg-zinc-900">
                                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">2. Social Proof Hook</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">Leverage user testimonials for instant credibility.</p>
                                        <div className="bg-gray-50 dark:bg-zinc-800 p-3 rounded border-l-4 border-green-400">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">"12,000 customers can't be wrong about this..."</p>
                                        </div>
                                    </Card>

                                    <Card className="p-6 bg-white dark:bg-zinc-900">
                                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">3. Curiosity Gap Hook</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">Create knowledge gaps that demand resolution.</p>
                                        <div className="bg-gray-50 dark:bg-zinc-800 p-3 rounded border-l-4 border-purple-400">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">"The skincare secret dermatologists won't tell you"</p>
                                        </div>
                                    </Card>

                                    <Card className="p-6 bg-white dark:bg-zinc-900">
                                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">4. Contradiction Hook</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">Challenge common beliefs or assumptions.</p>
                                        <div className="bg-gray-50 dark:bg-zinc-800 p-3 rounded border-l-4 border-red-400">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">"Everything you know about weight loss is wrong"</p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </section>

                        {/* Implementation Guide */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                                <Target className="h-6 w-6 text-purple-500 mr-3" />
                                Campaign Implementation Guide
                            </h2>

                            <div className="space-y-6">
                                <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Phase 1: Creative Development</h4>
                                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>• Research trending content and sounds in your niche</li>
                                        <li>• Develop hook variations using HPSC framework</li>
                                        <li>• Create user-generated content style videos</li>
                                        <li>• Implement pattern interrupt techniques</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Phase 2: Campaign Launch</h4>
                                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>• Start with small budget for creative testing</li>
                                        <li>• Target broad, interest-based audiences</li>
                                        <li>• Monitor engagement velocity in first 2 hours</li>
                                        <li>• Scale successful creatives rapidly</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Phase 3: Optimization & Scale</h4>
                                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>• Implement automated rules for budget allocation</li>
                                        <li>• Create lookalike audiences from converters</li>
                                        <li>• Develop creative refresh workflows</li>
                                        <li>• Expand to new product lines and markets</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Conclusion</h2>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    TikTok advertising success hinges on understanding platform-native content creation while maintaining
                                    clear performance marketing principles. By implementing the HPSC framework and focusing on authentic,
                                    engaging content that drives conversions, businesses can achieve significant ROI improvements on TikTok.
                                </p>
                            </div>
                        </section>

                        {/* CTA */}
                        <section className="text-center py-8">
                            <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Create High-Converting TikTok Ads?</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Transform your TikTok advertising with AI-powered video creation that implements proven frameworks.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                                        <Link href="/dashboard">
                                            Start Creating Videos
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/#demo">
                                            Watch Demo
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
} 