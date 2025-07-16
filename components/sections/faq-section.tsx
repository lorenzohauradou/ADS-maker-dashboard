"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: "How does FastAdsAI work?",
            answer: "Simply upload your product images, and our AI analyzes them to create professional video ads in minutes. The AI generates scripts, voiceovers, and optimizes everything for maximum engagement on social platforms."
        },
        {
            question: "What types of products can I create ads for?",
            answer: "FastAdsAI works with any physical or digital product: e-commerce items, SaaS tools, mobile apps, services, and more. Our AI automatically adapts the style and messaging to your specific product category."
        },
        {
            question: "Which platforms are the videos optimized for?",
            answer: "Videos are automatically optimized for TikTok, Instagram (Reels, Stories, Feed), YouTube Shorts, Facebook, LinkedIn, and other social platforms with perfect dimensions and engagement-focused content."
        },
        {
            question: "Can I customize the voiceover and text?",
            answer: "Yes! You can edit scripts, choose from multiple AI voices, adjust tone and style, and customize all text elements. Our AI provides intelligent suggestions while giving you full creative control."
        },
        {
            question: "Is FastAdsAI free to use?",
            answer: "We offer a free plan to test the quality with no watermarks. Paid plans include unlimited video generation, premium voices, advanced customization, and priority processing for faster results."
        },
        {
            question: "I have more questions!",
            answer: "Our support team is here to help! Contact us via email at support@fastadsai.com or through our live chat. We typically respond within 2 hours during business hours."
        },
    ]

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-20 px-4 bg-black">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Got questions?
                    </h2>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-700 rounded-2xl bg-[#1A1A1A] overflow-hidden transition-all duration-300 hover:border-gray-600"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full p-6 text-left focus:outline-none"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-white pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </div>
                                </div>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-6 border-t border-gray-700">
                                    <div className="pt-4">
                                        <p className="text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 