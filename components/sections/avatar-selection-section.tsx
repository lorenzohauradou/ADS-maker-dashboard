"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export function AvatarSelectionSection() {
    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(1)

    const avatars = [
        {
            id: 1,
            name: "Donald",
            category: "Professional",
            description: "Warm professional voice, perfect for B2B and services",
            image: "/avatar0.png",
            accent: "American",
            specialties: ["B2B", "Professional", "Tech"],
            popular: true,
        },
        {
            id: 2,
            name: "Palmira",
            category: "Friendly",
            description: "Friendly and engaging tone, ideal for e-commerce",
            image: "/avatar1.png",
            accent: "Spanish",
            specialties: ["E-commerce", "Retail", "Lifestyle"],
            popular: false,
        },
        {
            id: 3,
            name: "Breanna",
            category: "Energetic",
            description: "Energy and dynamism for young and innovative products",
            image: "/avatar2.png",
            accent: "American",
            specialties: ["Fitness", "Beauty", "Social"],
            popular: false,
        },
        {
            id: 4,
            name: "Diego",
            category: "Authoritative",
            description: "Authoritative and convincing voice for premium sectors",
            image: "/avatar3.png",
            accent: "Italian",
            specialties: ["Luxury", "Finance", "Automotive"],
            isNew: true,
        },
        {
            id: 5,
            name: "Lucia",
            category: "Modern",
            description: "Modern and direct style for startups and innovation",
            image: "/avatar4.png",
            accent: "American",
            specialties: ["Startup", "Apps", "Innovation"],
            popular: false,
        },
        {
            id: 6,
            name: "Leo",
            category: "Warm",
            description: "Warm and reassuring tone, perfect for healthcare",
            image: "/avatar5.png",
            accent: "American",
            specialties: ["Healthcare", "Wellness", "Family"],
            popular: false,
        },
        {
            id: 7,
            name: "Thomas",
            category: "Distinguished",
            description: "Distinguished and trustworthy voice for financial services",
            image: "/avatar6.png",
            accent: "British",
            specialties: ["Finance", "Insurance", "Legal"],
            popular: false,
        },
        {
            id: 8,
            name: "Sarah",
            category: "Dynamic",
            description: "Dynamic and energetic for sports and active lifestyle",
            image: "/avatar7.png",
            accent: "American",
            specialties: ["Sports", "Fitness", "Outdoor"],
            isNew: true,
        },
        {
            id: 9,
            name: "Faye",
            category: "Elegant",
            description: "Elegant and sophisticated for luxury brands",
            image: "/avatar8.png",
            accent: "British",
            specialties: ["Luxury", "Fashion", "Beauty"],
            isNew: true,
        },
    ]

    const handleAvatarSelect = (avatarId: number) => {
        setSelectedAvatar(avatarId)
    }

    return (
        <section id="avatars" className="py-24 px-4 bg-black">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-medium mb-6 text-white leading-tight">
                        Choose Your
                        <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            AI Avatar
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Professional AI avatars with human-like voices and natural expressions.
                        Select the perfect spokesperson for your brand.
                    </p>
                </div>

                {/* Avatar Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {avatars.map((avatar) => (
                        <Card
                            key={avatar.id}
                            className={`group cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-[#111]/80 hover:bg-[#151515] p-8 rounded-2xl ${selectedAvatar === avatar.id
                                ? 'ring-2 ring-blue-400 bg-[#151515] shadow-lg'
                                : ''
                                }`}
                            onClick={() => handleAvatarSelect(avatar.id)}
                        >
                            {/* Avatar Image */}
                            <div className="relative mb-6 flex justify-center">
                                <div className="relative w-24 h-24">
                                    <Image
                                        src={avatar.image}
                                        alt={avatar.name}
                                        fill
                                        className="rounded-full object-cover border-4 border-[#151515] shadow-lg"
                                        priority
                                    />

                                    {/* Selection indicator */}
                                    {selectedAvatar === avatar.id && (
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Badges */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 flex gap-2">
                                    {avatar.popular && (
                                        <Badge className="bg-gradient-to-r from-orange-400/20 to-pink-400/20 text-orange-300 border border-orange-500/20 text-xs px-3 py-1 rounded-full">
                                            Popular
                                        </Badge>
                                    )}
                                    {avatar.isNew && (
                                        <Badge className="bg-gradient-to-r from-green-400/20 to-blue-400/20 text-blue-300 border border-blue-500/20 text-xs px-3 py-1 rounded-full">
                                            New
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Avatar Info */}
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white mb-2">{avatar.name}</h3>
                                <p className="text-sm text-blue-400 font-medium mb-3">{avatar.category} • {avatar.accent}</p>
                                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                                    {avatar.description}
                                </p>

                                {/* Specialties */}
                                <div className="flex flex-wrap justify-center gap-1 mb-6">
                                    {avatar.specialties.map((specialty, index) => (
                                        <span
                                            key={index}
                                            className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded-full border border-white/10"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>

                                {/* Preview Button */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-white/10 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors bg-transparent"
                                >
                                    <Play className="w-4 h-4 mr-2" />
                                    Preview Voice
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <div className="rounded-3xl relative overflow-hidden max-w-7xl mx-auto">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                            src="/gradient_bg.mp4"
                        />
                        <div className="relative z-10 p-16 text-center backdrop-blur-sm bg-black/30 flex flex-col items-center justify-center">
                            <h3 className="text-3xl font-semibold mb-6 text-white">
                                Ready to create your first video?
                            </h3>
                            <p className="text-[#d1d5db] mb-8 max-w-2xl mx-auto">
                                While your competitors wait weeks for their videos, you can have yours ready in 1 minute.
                                <span className="hidden md:block">
                                    Start now and get an immediate competitive advantage.
                                </span>
                            </p>
                            <Button className="bg-white text-black hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium">
                                <Play className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                                Create Your <span className="hidden md:inline">Viral</span> Video
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 