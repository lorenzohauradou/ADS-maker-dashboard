"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp, HelpCircle, Zap } from "lucide-react"

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            question: "How long does it really take to create a video?",
            answer: "The complete process takes 3-5 minutes: 30 seconds to upload images, 1-2 minutes for AI analysis, 1-2 minutes for video generation, and 30 seconds for download. It's literally faster than making coffee!"
        },
        {
            question: "Which types of businesses work best?",
            answer: "ADS MAKER AI is optimized for e-commerce, SaaS, professional services, mobile apps, restaurants, and retail. The AI automatically recognizes your product type and adapts voice, script, and style accordingly. If you sell physical products or digital services, it will work perfectly."
        },
        {
            question: "Does the voice really sound human?",
            answer: "Yes! We use the most advanced TTS technology available. The voice is indistinguishable from a professional actor, with natural intonation, correct pauses, and emphasis on key points. Many clients ask us if we use real voice actors!"
        },
        {
            question: "Can I remove the watermark from the free plan?",
            answer: "The free plan includes the 'ADS MAKER AI' watermark to let you test the quality. To remove it and have completely branded videos, you need the Starter plan ($39/month) or higher."
        },
        {
            question: "Which social platforms can I publish videos to?",
            answer: "Videos are automatically optimized for Instagram (Feed, Stories, Reels), TikTok, YouTube (Shorts and standard videos), Facebook, LinkedIn, and Pinterest. Each format has perfect dimensions and duration to maximize engagement."
        },
        {
            question: "What happens if I'm not satisfied?",
            answer: "We offer a 30-day ROI guarantee. If your videos don't generate measurable results within 30 days, we'll give you a full refund. Plus, you can cancel anytime without penalties."
        },
        {
            question: "Do you have English-speaking support team?",
            answer: "Absolutely! Our support team speaks English - French - Italian and understands the global market perfectly. We're available via email, chat, and phone during business hours."
        },
        {
            question: "Can I integrate ADS MAKER AI with my tools?",
            answer: "Yes! From the Pro plan up, you get access to complete APIs to integrate ADS MAKER AI into your workflow. It works with Zapier, webhooks, and most CRM and e-commerce platforms."
        }
    ]

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-20 px-4 relative overflow-hidden bg-muted/20">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-muted/30 to-background"></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <Badge
                        variant="secondary"
                        className="mb-4 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 backdrop-blur-sm"
                    >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Frequently Asked Questions
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Everything You Need to{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Know
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Answers to the most common questions about our AI video ads. Can't find what you're looking for? Contact us!
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <Card
                            key={index}
                            className="bg-card/80 border-border backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full p-6 text-left focus:outline-none focus:ring-2rounded-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-foreground pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        {openIndex === index ? (
                                            <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-6">
                                    <div className="border-l-2 border-blue-500 pl-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-card/80 to-muted/50 rounded-2xl p-8 border border-border backdrop-blur-sm">
                        <div className="flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-yellow-500 mr-3" />
                            <span className="text-lg font-semibold text-foreground">
                                Have more questions?
                            </span>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            Our team is here to help you. We respond within 2 hours during business hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:support@adsmaker.ai"
                                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
                            >
                                📧 support@adsmaker.ai
                            </a>
                            <a
                                href="https://wa.me/3394464650"
                                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors duration-200"
                            >
                                💬 WhatsApp Business
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 