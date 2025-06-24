import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Video, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'How to Create Viral TikTok Ads That Actually Convert',
    description: 'Learn the secrets of viral TikTok advertising. From hook techniques to trending audio, discover what makes TikTok ads go viral and drive sales.',
    keywords: ['viral TikTok ads', 'TikTok advertising', 'TikTok marketing', 'social media advertising', 'video ads'],
    openGraph: {
        title: 'How to Create Viral TikTok Ads That Actually Convert',
        description: 'Master TikTok advertising with proven viral strategies and trending formats.',
        type: 'article',
    },
};

export default function ViralTikTokAdsGuide() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Blog
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        How to Create Viral TikTok Ads That Actually Convert
                    </h1>
                    <div className="flex items-center text-gray-600 text-sm">
                        <span>January 15, 2024</span>
                        <span className="mx-2">•</span>
                        <span>5 min read</span>
                        <span className="mx-2">•</span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                            TikTok Marketing
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    {/* Introduction */}
                    <div className="mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            TikTok has revolutionized the advertising landscape, offering unprecedented opportunities for brands
                            to connect with younger audiences. With over <strong>1.7 billion users worldwide</strong> and an
                            average session duration of <strong>52 minutes</strong>, TikTok presents a goldmine for marketers
                            who understand how to create content that resonates.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                            <p className="text-blue-800">
                                <strong>Key Insight:</strong> TikTok ads that feel native to the platform perform 73% better
                                than traditional advertising formats.
                            </p>
                        </div>
                    </div>

                    {/* The Viral Formula */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <TrendingUp className="h-8 w-8 text-red-500 mr-3" />
                            The Viral TikTok Ad Formula
                        </h2>

                        <div className="space-y-8">
                            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hook + Problem + Solution + CTA</h3>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                                            <span className="font-bold text-red-600">1</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Hook</h4>
                                        <p className="text-sm text-gray-600">First 3 seconds grab attention</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                                            <span className="font-bold text-orange-600">2</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Problem</h4>
                                        <p className="text-sm text-gray-600">Identify pain points</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                                            <span className="font-bold text-green-600">3</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                                        <p className="text-sm text-gray-600">Present your product</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                                            <span className="font-bold text-blue-600">4</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">CTA</h4>
                                        <p className="text-sm text-gray-600">Clear call-to-action</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Hook Techniques */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <Zap className="h-8 w-8 text-yellow-500 mr-3" />
                            7 Proven Hook Techniques
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. The Question Hook</h3>
                                <p className="text-gray-700 mb-3">Start with an intriguing question that your audience can't ignore.</p>
                                <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                                    <p className="text-sm font-medium">"What if I told you this $5 gadget could save you 2 hours a day?"</p>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. The Shock Statement</h3>
                                <p className="text-gray-700 mb-3">Make a bold claim that challenges conventional thinking.</p>
                                <div className="bg-gray-50 p-3 rounded border-l-4 border-red-400">
                                    <p className="text-sm font-medium">"I've been doing laundry wrong my entire life..."</p>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. The Transformation</h3>
                                <p className="text-gray-700 mb-3">Show dramatic before/after results immediately.</p>
                                <div className="bg-gray-50 p-3 rounded border-l-4 border-green-400">
                                    <p className="text-sm font-medium">"POV: You find the perfect skincare routine"</p>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">4. The Secret Reveal</h3>
                                <p className="text-gray-700 mb-3">Promise insider knowledge or hidden information.</p>
                                <div className="bg-gray-50 p-3 rounded border-l-4 border-purple-400">
                                    <p className="text-sm font-medium">"The cleaning hack hotels don't want you to know"</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Content Types That Work */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <Video className="h-8 w-8 text-green-500 mr-3" />
                            Content Types That Convert
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Product Demonstrations</h3>
                                <p className="text-gray-700 mb-3">Show your product in action solving real problems.</p>
                                <ul className="text-gray-600 space-y-1 text-sm">
                                    <li>• Keep it under 30 seconds</li>
                                    <li>• Focus on the transformation</li>
                                    <li>• Use trending audio</li>
                                    <li>• Include before/after shots</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. User-Generated Content</h3>
                                <p className="text-gray-700 mb-3">Leverage authentic customer experiences and testimonials.</p>
                                <ul className="text-gray-600 space-y-1 text-sm">
                                    <li>• Encourage customers to create content</li>
                                    <li>• Offer incentives for quality UGC</li>
                                    <li>• Feature real customer stories</li>
                                    <li>• Use customer videos as social proof</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Trend Hijacking</h3>
                                <p className="text-gray-700 mb-3">Adapt popular TikTok trends to showcase your products.</p>
                                <ul className="text-gray-600 space-y-1 text-sm">
                                    <li>• Monitor trending hashtags daily</li>
                                    <li>• Adapt trends to fit your brand</li>
                                    <li>• Act quickly while trends are hot</li>
                                    <li>• Add your unique twist</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Technical Tips */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <Users className="h-8 w-8 text-indigo-500 mr-3" />
                            Technical Optimization Tips
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Specifications</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span><strong>Aspect Ratio:</strong> 9:16 (vertical)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span><strong>Resolution:</strong> 1080x1920 minimum</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span><strong>Length:</strong> 15-60 seconds optimal</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span><strong>File Size:</strong> Under 500MB</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Practices</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">•</span>
                                        <span>Add captions for accessibility</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">•</span>
                                        <span>Use trending sounds and music</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">•</span>
                                        <span>Include clear call-to-actions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">•</span>
                                        <span>Test different posting times</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Common Mistakes */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid</h2>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-red-800 mb-3">❌ What NOT to Do</h3>
                            <ul className="space-y-2 text-red-700">
                                <li>• Making ads that look too polished or corporate</li>
                                <li>• Ignoring TikTok's native features and effects</li>
                                <li>• Using copyrighted music without permission</li>
                                <li>• Focusing on product features instead of benefits</li>
                                <li>• Having weak or unclear call-to-actions</li>
                                <li>• Posting inconsistently or only when convenient</li>
                            </ul>
                        </div>
                    </section>

                    {/* Conclusion */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Creating Viral TikTok Ads Today</h2>
                        <p className="text-gray-700 mb-6">
                            Creating viral TikTok ads isn't about luck—it's about understanding your audience, following proven
                            formulas, and staying authentic to the platform's culture. The key is to start creating, testing,
                            and iterating based on what resonates with your specific audience.
                        </p>
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Ready to Go Viral?</h3>
                            <p className="mb-4">
                                Transform your product images into engaging TikTok video ads with our AI-powered platform.
                            </p>
                            <Link
                                href="/dashboard"
                                className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Create Your TikTok Ad Now →
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
} 