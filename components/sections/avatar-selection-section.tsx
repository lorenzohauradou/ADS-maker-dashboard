"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, User, Sparkles, Crown, CheckCircle, ArrowRight } from "lucide-react"

export function AvatarSelectionSection() {
    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(1)

    const avatars = [
        {
            id: 1,
            name: "Anna",
            category: "Professional",
            description: "Warm professional voice, perfect for B2B and services",
            image: "/avatar1.png",
            accent: "American",
            specialties: ["B2B", "Professional Services", "Tech"],
            styles: 5,
            isNew: false,
            popular: true,
        },
        {
            id: 2,
            name: "Marcus",
            category: "Friendly",
            description: "Friendly and engaging tone, ideal for e-commerce",
            image: "/placeholder-user.jpg",
            accent: "American",
            specialties: ["E-commerce", "Retail", "Lifestyle"],
            styles: 4,
            isNew: false,
            popular: false,
        },
        {
            id: 3,
            name: "Breanna",
            category: "Energetic",
            description: "Energy and dynamism for young and innovative products",
            image: "/avatar2.png",
            accent: "American",
            specialties: ["Fitness", "Beauty", "Social Media"],
            styles: 6,
            isNew: false,
            popular: false,
        },
        {
            id: 4,
            name: "Maxen",
            category: "Authoritative",
            description: "Authoritative and convincing voice for premium sectors",
            image: "/placeholder-user.jpg",
            accent: "British",
            specialties: ["Luxury", "Finance", "Automotive"],
            styles: 7,
            isNew: true,
            popular: false,
        },
        {
            id: 5,
            name: "Leo",
            category: "Modern",
            description: "Modern and direct style for startups and innovation",
            image: "/avatar5.png",
            accent: "American",
            specialties: ["Startup", "Apps", "Innovation"],
            styles: 5,
            isNew: false,
            popular: false,
        },
        {
            id: 6,
            name: "Aria",
            category: "Warm",
            description: "Warm and reassuring tone, perfect for healthcare",
            image: "/placeholder-user.jpg",
            accent: "American",
            specialties: ["Healthcare", "Wellness", "Family"],
            styles: 4,
            isNew: false,
            popular: false,
        },
        {
            id: 7,
            name: "Thomas",
            category: "Distinguished",
            description: "Distinguished and trustworthy voice for financial services",
            image: "/placeholder-user.jpg",
            accent: "British",
            specialties: ["Finance", "Insurance", "Legal"],
            styles: 3,
            isNew: false,
            popular: false,
        },
        {
            id: 8,
            name: "Rio",
            category: "Dynamic",
            description: "Dynamic and energetic for sports and active lifestyle",
            image: "/placeholder-user.jpg",
            accent: "American",
            specialties: ["Sports", "Fitness", "Outdoor"],
            styles: 4,
            isNew: true,
            popular: false,
        },
        {
            id: 9,
            name: "Faye",
            category: "Elegant",
            description: "Elegant and sophisticated for luxury brands",
            image: "/placeholder-user.jpg",
            accent: "British",
            specialties: ["Luxury", "Fashion", "Beauty"],
            styles: 8,
            isNew: true,
            popular: false,
        },
    ]

    const handleAvatarSelect = (avatarId: number) => {
        setSelectedAvatar(avatarId)
    }

    return (
        <section id="avatars" className="py-16 md:py-24 px-4 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <Badge
                        variant="secondary"
                        className="mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                    >
                        <User className="w-4 h-4 mr-2" />
                        Professional AI Avatars
                    </Badge>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Choose Your{" "}
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
                            AI Avatar
                        </span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                        Over <strong>100+ ultra-realistic AI avatars</strong>, each specialized for your industry.
                        Human-like voice, natural gestures, and unique personalities for every type of business.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Badge variant="outline" className="bg-white/50 dark:bg-zinc-800/50">
                            🎭 Natural gestures
                        </Badge>
                        <Badge variant="outline" className="bg-white/50 dark:bg-zinc-800/50">
                            🎙️ Human voice
                        </Badge>
                        <Badge variant="outline" className="bg-white/50 dark:bg-zinc-800/50">
                            🌍 Multilingual
                        </Badge>
                        <Badge variant="outline" className="bg-white/50 dark:bg-zinc-800/50">
                            ⚡ Instant generation
                        </Badge>
                    </div>
                </div>

                {/* Avatar Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {avatars.map((avatar) => (
                        <Card
                            key={avatar.id}
                            className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${selectedAvatar === avatar.id
                                ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                                : 'border-border hover:border-purple-300 dark:hover:border-purple-700'
                                }`}
                            onClick={() => handleAvatarSelect(avatar.id)}
                        >
                            <div className="relative overflow-hidden">
                                {/* Avatar Image/Video - Takes most of the card */}
                                <div className="relative w-full h-80 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                                    <img
                                        src={avatar.image}
                                        alt={avatar.name}
                                        className="w-full h-full object-cover object-center"
                                    />

                                    {/* Top badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        {avatar.popular && (
                                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1">
                                                <Crown className="w-3 h-3 mr-1" />
                                                Popular
                                            </Badge>
                                        )}
                                        {avatar.isNew && (
                                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1">
                                                New
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Bottom left - Styles count */}
                                    <div className="absolute bottom-3 left-3">
                                        <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                                            {avatar.styles} styles
                                        </Badge>
                                    </div>

                                    {/* Top right - Selection indicator */}
                                    {selectedAvatar === avatar.id && (
                                        <div className="absolute top-3 right-3">
                                            <CheckCircle className="w-6 h-6 text-purple-600 bg-white dark:bg-zinc-900 rounded-full" />
                                        </div>
                                    )}

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="bg-white/90 hover:bg-white text-black"
                                        >
                                            <Play className="w-4 h-4 mr-2" />
                                            Preview
                                        </Button>
                                    </div>
                                </div>

                                {/* Bottom info - Minimal */}
                                <div className="p-4 bg-white dark:bg-zinc-900">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg text-foreground">{avatar.name}</h3>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <span>{avatar.accent === 'British' ? '🇬🇧' : '🇺🇸'}</span>
                                                {avatar.accent}
                                            </p>
                                        </div>
                                        {selectedAvatar === avatar.id && (
                                            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                                                Selected
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-card/80 to-muted/50 rounded-2xl p-8 border border-border backdrop-blur-sm relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-center mb-4">
                                <Sparkles className="w-6 h-6 text-purple-500 mr-3" />
                                <span className="text-lg font-semibold text-foreground">
                                    Ready to Create Professional Videos?
                                </span>
                            </div>
                            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Choose your favorite AI avatar and start creating video ads that convert.
                                Every avatar is optimized for your specific industry with personalized scripts.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4"
                                >
                                    <Play className="w-5 h-5 mr-2" />
                                    Start Free Now
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-border text-foreground hover:bg-accent px-8 py-4"
                                >
                                    View All Avatars
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                            <div className="text-center mt-4">
                                <Badge
                                    variant="secondary"
                                    className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                                >
                                    🚀 No credit card required
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 