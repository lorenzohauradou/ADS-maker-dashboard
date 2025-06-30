import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BlogHeader } from '@/components/layout/blog-header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Complete TikTok Ads Strategy Guide: From Setup to Scale',
    description: 'Step-by-step guide to creating successful TikTok advertising campaigns, with optimization strategies and best practices for maximum ROI.',
    keywords: ['TikTok ads guide', 'TikTok advertising strategy', 'TikTok campaign optimization', 'social media advertising', 'video marketing'],
    openGraph: {
        title: 'Complete TikTok Ads Strategy Guide: From Setup to Scale',
        description: 'Master TikTok advertising with this comprehensive guide covering setup, optimization, and scaling strategies.',
        type: 'article',
    },
};

export default function TikTokAdsGuide() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <BlogHeader />

            <main className="pt-16">
                {/* Header del post */}
                <div className="border-b border-gray-200 dark:border-zinc-800">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 text-sm font-medium transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            All posts
                        </Link>

                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Badge variant="secondary" className="text-xs">
                                    Strategy Guide
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Published June 20, 2025
                                </span>
                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <Clock className="h-3 w-3" />
                                    16 min read
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                                Complete TikTok Ads Strategy Guide: From Setup to Scale
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                                Step-by-step guide to creating successful TikTok advertising campaigns, from initial setup
                                to scaling strategies, with optimization best practices for maximum ROI.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contenuto dell'articolo */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">

                        {/* Introduction */}
                        <section className="mb-16">
                            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                                Getting Started with TikTok Ads
                            </h2>

                            <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-lg mb-12">
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-0">
                                    TikTok advertising offers unprecedented reach and engagement opportunities, with
                                    <strong> 1.7 billion monthly active users</strong> and <strong>89 minutes average daily usage</strong>.
                                    This comprehensive guide covers everything from account setup to advanced scaling strategies.
                                </p>
                            </div>

                            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Why TikTok Advertising Works</h3>
                            <ul className="space-y-4 text-gray-700 dark:text-gray-300 mb-12">
                                <li>High engagement rates: 67% higher than other social platforms</li>
                                <li>Advanced targeting capabilities with precise audience selection</li>
                                <li>Creative-first platform that rewards authentic, engaging content</li>
                                <li>Lower competition compared to Facebook and Google Ads</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Key Success Metrics</h3>
                            <div className="space-y-6 mb-12">
                                <div className="border-l-4 border-green-500 pl-6">
                                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Engagement Rate</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Target: 6-9% for optimal performance</p>
                                </div>
                                <div className="border-l-4 border-blue-500 pl-6">
                                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Video View Rate</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Target: 25-30% completion rate</p>
                                </div>
                                <div className="border-l-4 border-purple-500 pl-6">
                                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Cost Per Click</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Average: $0.50-$2.00 depending on niche</p>
                                </div>
                            </div>
                        </section>

                        {/* Campaign Setup */}
                        <section className="mb-16">
                            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                                Campaign Setup & Structure
                            </h2>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-6 text-green-700 dark:text-green-400">Step 1: Account Setup</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                                        Proper account configuration is crucial for campaign success and compliance with TikTok's policies.
                                    </p>
                                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Setup Checklist:</h4>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                                        <li>Create TikTok Business Account with complete business information</li>
                                        <li>Verify domain ownership and implement TikTok Pixel</li>
                                        <li>Set up conversion tracking for all key actions</li>
                                        <li>Configure payment methods and billing information</li>
                                    </ul>
                                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Pro Tip:</h5>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            Complete all account verification steps before creating campaigns to avoid delays and restrictions.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold mb-6 text-blue-700 dark:text-blue-400">Step 2: Campaign Structure</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                                        Organize your campaigns for optimal performance and easy management.
                                    </p>
                                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Recommended Structure:</h4>
                                    <div className="space-y-4 mb-6">
                                        <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg">
                                            <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Campaign Level</h5>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm">Set objectives: Traffic, Conversions, App Installs, etc.</p>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg">
                                            <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Ad Group Level</h5>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm">Define targeting, budget, and bidding strategy</p>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg">
                                            <h5 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Ad Level</h5>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm">Upload creative assets and write compelling copy</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold mb-6 text-purple-700 dark:text-purple-400">Step 3: Targeting Strategy</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                                        TikTok offers sophisticated targeting options to reach your ideal audience.
                                    </p>
                                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Targeting Options:</h4>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                                        <li>Demographics: Age, gender, location, language</li>
                                        <li>Interests: Based on content interaction and engagement</li>
                                        <li>Behavior: Device usage, spending patterns, app activity</li>
                                        <li>Custom Audiences: Website visitors, app users, lookalikes</li>
                                    </ul>
                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                                        <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Best Practice:</h5>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            Start with broader targeting and narrow down based on performance data. TikTok's algorithm works best with larger audience sizes initially.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Creative Strategy */}
                        <section className="mb-16">
                            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                                Creative Strategy & Best Practices
                            </h2>

                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                                Creative is the most important factor in TikTok advertising success.
                                Platform-native content consistently outperforms traditional advertising formats.
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Video Content Guidelines</h3>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                                        <li>Vertical format (9:16 aspect ratio) for optimal mobile viewing</li>
                                        <li>15-60 seconds duration, with 15-30 seconds being optimal</li>
                                        <li>Hook viewers within the first 3 seconds</li>
                                        <li>Include captions for accessibility and sound-off viewing</li>
                                        <li>Use trending audio and participate in popular challenges</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Content Formats That Work</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">Educational Content</h4>
                                            <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                                                <li>How-to tutorials and demonstrations</li>
                                                <li>Tips and tricks related to your product</li>
                                                <li>Problem-solution scenarios</li>
                                                <li>Before/after transformations</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400">Entertainment Content</h4>
                                            <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                                                <li>Behind-the-scenes content</li>
                                                <li>User-generated content features</li>
                                                <li>Trending challenges adaptations</li>
                                                <li>Storytelling and testimonials</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Call-to-Action Strategy</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Effective CTAs drive action without disrupting the TikTok experience.
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                                        <li>Integrate CTAs naturally into the content narrative</li>
                                        <li>Use action words: "Try now", "Learn more", "Get yours"</li>
                                        <li>Create urgency with limited-time offers</li>
                                        <li>Test different CTA placements and formats</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Optimization & Scaling */}
                        <section className="mb-16">
                            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                                Optimization & Scaling Strategies
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Performance Monitoring</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Regular monitoring and optimization are essential for campaign success.
                                    </p>
                                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Key Metrics to Track:</h4>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                                        <li>Click-through rate (CTR): Target 1.5-3%</li>
                                        <li>Cost per click (CPC): Monitor for efficiency</li>
                                        <li>Conversion rate: Track and optimize funnel performance</li>
                                        <li>Return on ad spend (ROAS): Aim for 3:1 minimum</li>
                                        <li>Video view rate: Target 25-30% completion</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Optimization Timeline</h3>
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                                            <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Days 1-3: Launch & Monitor</h4>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                Let campaigns run without major changes. Monitor for obvious issues only.
                                            </p>
                                        </div>
                                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                                            <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Days 4-7: Initial Optimization</h4>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                Pause underperforming ad groups, increase budget on winners, test new creatives.
                                            </p>
                                        </div>
                                        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                                            <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Week 2+: Scale & Expand</h4>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                Scale successful campaigns, duplicate winning ad groups, expand targeting.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Scaling Strategies</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Scale successful campaigns systematically to maintain performance.
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                                        <li>Increase budget by 20-50% every 3-5 days for stable performers</li>
                                        <li>Duplicate successful ad groups with slight variations</li>
                                        <li>Expand targeting to similar audiences and interests</li>
                                        <li>Test new creative formats while maintaining winning elements</li>
                                        <li>Launch campaigns in new geographic markets</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section className="mb-16">
                            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                                Key Takeaways
                            </h2>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
                                <p className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed mb-0">
                                    Success with TikTok advertising requires understanding the platform's unique culture
                                    and user behavior. Focus on creating authentic, engaging content that provides value
                                    while seamlessly integrating your marketing message. Start with proper setup,
                                    monitor performance closely, and scale systematically based on data.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
} 