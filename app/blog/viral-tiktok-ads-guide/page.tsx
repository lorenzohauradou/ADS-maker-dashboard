import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, TrendingUp, Video, Users, Zap, Target, CheckCircle, BarChart3, DollarSign, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
        <div className="min-h-screen bg-background">
            {/* Professional Header */}
            <div className="bg-muted/30 border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-primary hover:text-primary/80 mb-6 font-medium"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Marketing Hub
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-primary/10 text-primary">Campaign Strategy</Badge>
                        <Badge variant="outline">Expert Level</Badge>
                        <Badge variant="outline">Implementation Guide</Badge>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        TikTok Advertising Strategy: Complete Guide to High-Converting Campaigns
                    </h1>

                    <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
                        Comprehensive guide to TikTok advertising success, featuring proven conversion frameworks,
                        creative strategies, and optimization techniques that drive measurable business results.
                    </p>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>Updated January 15, 2025</span>
                        <span>•</span>
                        <span>18 min read</span>
                        <span>•</span>
                        <span>Strategy guide</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Key Performance Indicators */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                            <Play className="w-8 h-8 text-red-600 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-red-700">1.7B+</div>
                            <div className="text-sm text-red-600">Monthly Active Users</div>
                        </Card>
                        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-green-700">73%</div>
                            <div className="text-sm text-green-600">Better Native Performance</div>
                        </Card>
                        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                            <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-blue-700">52min</div>
                            <div className="text-sm text-blue-600">Avg. Session Duration</div>
                        </Card>
                        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                            <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-purple-700">37.8M</div>
                            <div className="text-sm text-purple-600">US Social Commerce Sales</div>
                        </Card>
                    </div>
                </section>

                <div className="prose prose-lg max-w-none">
                    {/* Strategic Framework */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 flex items-center">
                            <Target className="h-8 w-8 text-primary mr-3" />
                            High-Converting Campaign Framework
                        </h2>

                        <Card className="p-8 bg-gradient-to-r from-primary/5 to-purple-600/5 border-primary/20 mb-8">
                            <p className="text-lg leading-relaxed">
                                TikTok advertising success requires understanding the platform's unique ecosystem.
                                Our framework combines <strong>native content strategies</strong> with <strong>performance marketing principles</strong>
                                to achieve campaigns that feel authentic while driving <strong>measurable business results</strong>.
                            </p>
                        </Card>

                        <Card className="p-8 border-l-4 border-red-500">
                            <h3 className="text-xl font-semibold mb-4">The HPSC Formula</h3>
                            <p className="mb-6 text-muted-foreground">
                                Our proven framework for TikTok campaigns that consistently outperform industry benchmarks:
                            </p>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                        <span className="font-bold text-red-600 text-lg">H</span>
                                    </div>
                                    <h4 className="font-semibold mb-2">Hook</h4>
                                    <p className="text-sm text-muted-foreground">Attention capture in first 1-3 seconds</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                        <span className="font-bold text-orange-600 text-lg">P</span>
                                    </div>
                                    <h4 className="font-semibold mb-2">Problem</h4>
                                    <p className="text-sm text-muted-foreground">Pain point identification</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                        <span className="font-bold text-green-600 text-lg">S</span>
                                    </div>
                                    <h4 className="font-semibold mb-2">Solution</h4>
                                    <p className="text-sm text-muted-foreground">Product demonstration</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                        <span className="font-bold text-blue-600 text-lg">C</span>
                                    </div>
                                    <h4 className="font-semibold mb-2">Call-to-Action</h4>
                                    <p className="text-sm text-muted-foreground">Clear conversion driver</p>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Hook Strategies */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 flex items-center">
                            <Zap className="h-8 w-8 text-yellow-500 mr-3" />
                            Advanced Hook Strategies
                        </h2>

                        <div className="space-y-8">
                            <Card className="p-8 border-l-4 border-yellow-500">
                                <h3 className="text-xl font-semibold mb-4">Hook Performance Analysis</h3>
                                <div className="grid md:grid-cols-3 gap-6 mb-6">
                                    <div>
                                        <div className="text-2xl font-bold text-yellow-600 mb-2">85%</div>
                                        <div className="text-sm font-medium mb-1">Hook Retention Rate</div>
                                        <div className="text-xs text-muted-foreground">Optimal first 3 seconds</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600 mb-2">42%</div>
                                        <div className="text-sm font-medium mb-1">Conversion Increase</div>
                                        <div className="text-xs text-muted-foreground">Question-based hooks</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600 mb-2">67%</div>
                                        <div className="text-sm font-medium mb-1">Engagement Boost</div>
                                        <div className="text-xs text-muted-foreground">Transformation hooks</div>
                                    </div>
                                </div>
                            </Card>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold mb-3">1. Pattern Interrupt Hook</h3>
                                    <p className="text-muted-foreground mb-3">Break expected patterns to capture attention immediately.</p>
                                    <div className="bg-muted p-3 rounded border-l-4 border-blue-400">
                                        <p className="text-sm font-medium">"This $12 tool does what a $300 machine can't..."</p>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold mb-3">2. Social Proof Hook</h3>
                                    <p className="text-muted-foreground mb-3">Leverage user testimonials for instant credibility.</p>
                                    <div className="bg-muted p-3 rounded border-l-4 border-green-400">
                                        <p className="text-sm font-medium">"12,000 customers can't be wrong about this..."</p>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold mb-3">3. Curiosity Gap Hook</h3>
                                    <p className="text-muted-foreground mb-3">Create knowledge gaps that demand resolution.</p>
                                    <div className="bg-muted p-3 rounded border-l-4 border-purple-400">
                                        <p className="text-sm font-medium">"The skincare secret dermatologists won't tell you"</p>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold mb-3">4. Contradiction Hook</h3>
                                    <p className="text-muted-foreground mb-3">Challenge common beliefs or assumptions.</p>
                                    <div className="bg-muted p-3 rounded border-l-4 border-red-400">
                                        <p className="text-sm font-medium">"Everything you know about weight loss is wrong"</p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Content Strategy */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 flex items-center">
                            <Video className="h-8 w-8 text-green-500 mr-3" />
                            High-Performance Content Types
                        </h2>

                        <div className="space-y-8">
                            <Card className="p-8 border-l-4 border-green-500">
                                <h3 className="text-xl font-semibold mb-4">1. Product Demonstration Videos</h3>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-3 text-green-700">Optimization Framework</h4>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                        <div>
                                            <p className="font-medium mb-2">Structure Elements</p>
                                            <ul className="space-y-1">
                                                <li>• Problem setup (0-5 seconds)</li>
                                                <li>• Product introduction (5-10 seconds)</li>
                                                <li>• Transformation demo (10-20 seconds)</li>
                                                <li>• Results showcase (20-25 seconds)</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-medium mb-2">Performance Factors</p>
                                            <ul className="space-y-1">
                                                <li>• Before/after visual contrast</li>
                                                <li>• Real-time usage demonstration</li>
                                                <li>• Authentic user reactions</li>
                                                <li>• Clear value proposition</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-8 border-l-4 border-blue-500">
                                <h3 className="text-xl font-semibold mb-4">2. User-Generated Content Strategy</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-3 text-blue-700">Campaign Types</h4>
                                        <ul className="text-sm space-y-2 text-muted-foreground">
                                            <li>• Hashtag challenges with product integration</li>
                                            <li>• Customer transformation stories</li>
                                            <li>• Unboxing and first-impression videos</li>
                                            <li>• Creative product usage demonstrations</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-3 text-purple-700">Amplification Strategy</h4>
                                        <ul className="text-sm space-y-2 text-muted-foreground">
                                            <li>• Incentive structures for quality UGC</li>
                                            <li>• Creator partnership programs</li>
                                            <li>• Content licensing and repurposing</li>
                                            <li>• Cross-platform distribution</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-8 border-l-4 border-purple-500">
                                <h3 className="text-xl font-semibold mb-4">3. Trend Adaptation Framework</h3>
                                <p className="text-muted-foreground mb-6">
                                    Strategic approach to leveraging TikTok trends while maintaining brand consistency and conversion focus.
                                </p>
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="font-medium mb-2 text-purple-700">Trend Identification</p>
                                            <ul className="space-y-1 text-muted-foreground">
                                                <li>• Daily hashtag monitoring</li>
                                                <li>• Engagement velocity tracking</li>
                                                <li>• Competitor trend analysis</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-medium mb-2 text-blue-700">Adaptation Process</p>
                                            <ul className="space-y-1 text-muted-foreground">
                                                <li>• Brand alignment assessment</li>
                                                <li>• Product integration strategy</li>
                                                <li>• Creative execution planning</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-medium mb-2 text-green-700">Performance Optimization</p>
                                            <ul className="space-y-1 text-muted-foreground">
                                                <li>• A/B testing variations</li>
                                                <li>• Timing optimization</li>
                                                <li>• Cross-promotion strategies</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </section>

                    {/* Technical Optimization */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 flex items-center">
                            <Users className="h-8 w-8 text-indigo-500 mr-3" />
                            Campaign Optimization Strategies
                        </h2>

                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg border mb-8">
                            <h3 className="text-xl font-semibold mb-4">Performance Optimization Checklist</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3 text-indigo-700">Creative Optimization</h4>
                                    <ul className="text-sm space-y-2 text-muted-foreground">
                                        <li>• Vertical 9:16 format (mandatory)</li>
                                        <li>• 15-30 second optimal length</li>
                                        <li>• High-quality audio essential</li>
                                        <li>• Captions for accessibility</li>
                                        <li>• Brand integration within first 3 seconds</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3 text-purple-700">Campaign Structure</h4>
                                    <ul className="text-sm space-y-2 text-muted-foreground">
                                        <li>• Audience segmentation strategy</li>
                                        <li>• Budget allocation optimization</li>
                                        <li>• Bid strategy selection</li>
                                        <li>• Conversion tracking setup</li>
                                        <li>• Attribution modeling</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* CTA Section */}
                <section className="mt-16 p-12 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-xl border-2 border-primary/20">
                    <div className="text-center max-w-3xl mx-auto">
                        <Play className="w-16 h-16 text-primary mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-6">Ready to Launch High-Converting TikTok Campaigns?</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Create TikTok content that follows these proven frameworks and drives real business results.
                            Generate platform-optimized videos that convert viewers into customers.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">TikTok-native content creation</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">HPSC framework implementation</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">Advanced hook strategies</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">Performance tracking and optimization</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                                <Link href="/dashboard">
                                    Start Creating TikTok Campaigns
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/#demo">
                                    View TikTok Strategy Demo
                                </Link>
                            </Button>
                        </div>

                        <p className="text-xs text-muted-foreground mt-4">
                            Used by 4,200+ brands to optimize their TikTok advertising performance
                        </p>
                    </div>
                </section>

                {/* Related Content */}
                <section className="mt-16 pt-12 border-t">
                    <h3 className="text-2xl font-bold mb-8">Related TikTok Strategy Content</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <h4 className="font-semibold mb-2">
                                <Link href="/blog/viral-tiktok-ads-2025" className="hover:text-primary">
                                    TikTok Advertising ROI: Performance Analysis →
                                </Link>
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Data-driven analysis of TikTok campaigns with 340% ROAS improvement strategies
                            </p>
                        </Card>
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <h4 className="font-semibold mb-2">
                                <Link href="/blog/instagram-reels-algorithm-2025" className="hover:text-primary">
                                    Instagram Reels Algorithm: Technical Analysis →
                                </Link>
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Technical breakdown of Instagram's algorithm with optimization strategies
                            </p>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    );
} 