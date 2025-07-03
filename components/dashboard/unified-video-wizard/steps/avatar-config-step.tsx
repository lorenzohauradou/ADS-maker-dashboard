"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, User, Crown, ExternalLink, MessageSquare, ArrowRight, Plus } from "lucide-react"
import { toast } from "sonner"

interface Avatar {
    id: string
    name: string
    gender: "male" | "female" | "neutral"
    age_range: string
    style: string
    thumbnail_url: string
    preview_url?: string
}

interface CustomAvatar {
    id: string
    name: string
    status: "active" | "pending" | "rejected"
    thumbnail_url: string
    created_at: string
}

interface AvatarConfigStepProps {
    avatarType: 'stock' | 'dyoa' | 'byoa' | null
    selectedAvatar: any | null
    onAvatarSelect: (type: 'stock' | 'dyoa' | 'byoa', avatar: any, config?: any) => void
}

export function AvatarConfigStep({ avatarType, selectedAvatar, onAvatarSelect }: AvatarConfigStepProps) {
    const [stockAvatars, setStockAvatars] = useState<Avatar[]>([])
    const [customAvatars, setCustomAvatars] = useState<CustomAvatar[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({})
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
    const [currentChoice, setCurrentChoice] = useState<'stock' | 'custom' | null>(
        avatarType === 'stock' ? 'stock' :
            (avatarType === 'dyoa' || avatarType === 'byoa') ? 'custom' : null
    )

    useEffect(() => {
        loadAvatars()
    }, [])

    async function loadAvatars() {
        try {
            setLoading(true)

            // Forziamo l'uso dei mock data per ora (API Creatify ha problemi con thumbnail_url)
            console.log('Loading stock avatars from mock data...')

            // Mock avatars stock eleganti - più opzioni disponibili
            setStockAvatars([
                {
                    id: "stock_avatar_1",
                    name: "Sarah Professional",
                    gender: "female",
                    age_range: "25-35",
                    style: "Business Executive",
                    thumbnail_url: "/avatar1.png"
                },
                {
                    id: "stock_avatar_2",
                    name: "Marco Casual",
                    gender: "male",
                    age_range: "30-40",
                    style: "Friendly Presenter",
                    thumbnail_url: "/avatar2.png"
                },
                {
                    id: "stock_avatar_3",
                    name: "Elena Tech",
                    gender: "female",
                    age_range: "20-30",
                    style: "Modern & Dynamic",
                    thumbnail_url: "/avatar5.png"
                },
                {
                    id: "stock_avatar_4",
                    name: "David Executive",
                    gender: "male",
                    age_range: "35-45",
                    style: "Corporate Leader",
                    thumbnail_url: "/avatar6.png"
                },
                {
                    id: "stock_avatar_5",
                    name: "Anna Creative",
                    gender: "female",
                    age_range: "22-32",
                    style: "Creative Director",
                    thumbnail_url: "/avatar1.png"
                },
                {
                    id: "stock_avatar_6",
                    name: "Luca Friendly",
                    gender: "male",
                    age_range: "28-38",
                    style: "Approachable Host",
                    thumbnail_url: "/avatar2.png"
                },
                {
                    id: "stock_avatar_7",
                    name: "Sofia Elegant",
                    gender: "female",
                    age_range: "30-40",
                    style: "Sophisticated Speaker",
                    thumbnail_url: "/avatar5.png"
                },
                {
                    id: "stock_avatar_8",
                    name: "Roberto Dynamic",
                    gender: "male",
                    age_range: "25-35",
                    style: "Energetic Presenter",
                    thumbnail_url: "/avatar6.png"
                },
                {
                    id: "stock_avatar_9",
                    name: "Giulia Expert",
                    gender: "female",
                    age_range: "32-42",
                    style: "Industry Expert",
                    thumbnail_url: "/avatar1.png"
                },
                {
                    id: "stock_avatar_10",
                    name: "Francesco Warm",
                    gender: "male",
                    age_range: "35-45",
                    style: "Warm Communicator",
                    thumbnail_url: "/avatar2.png"
                },
                {
                    id: "stock_avatar_11",
                    name: "Valentina Bold",
                    gender: "female",
                    age_range: "26-36",
                    style: "Bold & Confident",
                    thumbnail_url: "/avatar5.png"
                },
                {
                    id: "stock_avatar_12",
                    name: "Alessandro Trustworthy",
                    gender: "male",
                    age_range: "40-50",
                    style: "Trustworthy Authority",
                    thumbnail_url: "/avatar6.png"
                }
            ])

            // Carica avatars personalizzati dell'utente
            const customResponse = await fetch('/api/users/me/custom-avatars')
            if (customResponse.ok) {
                const customResult = await customResponse.json()
                if (customResult.success) {
                    setCustomAvatars(customResult.custom_avatars || [])
                }
            }

        } catch (error) {
            console.error('Error loading avatars:', error)
            toast.error('Error loading avatars')
        } finally {
            setLoading(false)
        }
    }

    function selectStockAvatar(avatar: Avatar) {
        setCurrentChoice('stock')
        onAvatarSelect("stock", avatar)
        toast.success(`Avatar "${avatar.name}" selected`)
    }

    function selectCustomAvatar(avatar: CustomAvatar) {
        setCurrentChoice('custom')
        onAvatarSelect("dyoa", avatar) // Custom avatars vengono trattati come dyoa
        toast.success(`Custom avatar "${avatar.name}" selected`)
    }

    const handleChoiceSelect = (choice: 'stock' | 'custom') => {
        setCurrentChoice(choice)
        if (choice === 'stock' && stockAvatars.length > 0) {
            // Auto-seleziona il primo avatar stock come default
            selectStockAvatar(stockAvatars[0])
        }
    }

    const handleImageLoadStart = (avatarId: string) => {
        setLoadingImages(prev => ({ ...prev, [avatarId]: true }))
    }

    const handleImageLoadEnd = (avatarId: string) => {
        setLoadingImages(prev => ({ ...prev, [avatarId]: false }))
    }

    const handleImageError = (avatarId: string) => {
        setImageErrors(prev => ({ ...prev, [avatarId]: true }))
        setLoadingImages(prev => ({ ...prev, [avatarId]: false }))
    }

    const selectedStockAvatar = stockAvatars.find(a => a.id === selectedAvatar?.id)
    const selectedCustomAvatar = customAvatars.find(a => a.id === selectedAvatar?.id)

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <User className="w-8 h-8 animate-pulse mx-auto mb-4 text-purple-600" />
                    <p className="text-gray-600">Loading avatars...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header Conversazionale */}
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Who will be the presenter of your video?
                </h2>
                <p className="text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                    Choose from our professional presenters or use an avatar you created personally.
                </p>
            </div>

            {/* Scelta Tipo Avatar */}
            {!currentChoice && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Avatar Stock */}
                    <Card
                        className="p-8 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-xl hover:scale-[1.02] border-slate-200 dark:border-zinc-700 hover:border-purple-300 bg-white dark:bg-zinc-800"
                        onClick={() => handleChoiceSelect('stock')}
                    >
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    Professional Presenters
                                </h3>
                                <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-base">
                                    High-quality avatars ready to use, perfect for any type of business
                                </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-4 py-2 text-sm">
                                Available immediately
                            </Badge>
                            <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                        </div>
                    </Card>

                    {/* Avatar Custom */}
                    <Card
                        className="p-8 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-xl hover:scale-[1.02] border-slate-200 dark:border-zinc-700 hover:border-purple-300 bg-white dark:bg-zinc-800"
                        onClick={() => handleChoiceSelect('custom')}
                    >
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                <Crown className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    Your Custom Avatars
                                </h3>
                                <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-base">
                                    Personalized avatars you created in the dashboard or uploaded personally
                                </p>
                            </div>
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm">
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                            </Badge>
                            <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                        </div>
                    </Card>
                </div>
            )}

            {/* Avatar Stock Selection */}
            {currentChoice === 'stock' && (
                <div className="space-y-8">
                    {/* Header con Back Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Professional Presenters
                                </h3>
                                <p className="text-gray-600 dark:text-zinc-400">
                                    Choose the presenter that best represents your brand
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" onClick={() => setCurrentChoice(null)} className="w-fit">
                            ← Change type
                        </Button>
                    </div>

                    {/* Grid Avatar Stock - Responsive Grid Layout */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {stockAvatars.map((avatar) => (
                            <Card
                                key={avatar.id}
                                className={`cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.05] ${selectedAvatar?.id === avatar.id
                                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-lg ring-2 ring-blue-200 dark:ring-blue-800'
                                    : 'border-slate-200 dark:border-zinc-700 hover:border-blue-300 bg-white dark:bg-zinc-800'
                                    }`}
                                onClick={() => selectStockAvatar(avatar)}
                            >
                                <CardContent className="p-3">
                                    <div className="relative aspect-square mb-3 bg-gray-100 dark:bg-zinc-700 rounded-lg overflow-hidden">
                                        {loadingImages[avatar.id] && (
                                            <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-600 flex items-center justify-center z-10">
                                                <User className="w-8 h-8 animate-pulse text-gray-400" />
                                            </div>
                                        )}
                                        {imageErrors[avatar.id] ? (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex flex-col items-center justify-center">
                                                <User className="w-8 sm:w-12 h-8 sm:h-12 text-blue-500 mb-2" />
                                                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium text-center px-2 leading-tight">
                                                    {avatar.name}
                                                </span>
                                            </div>
                                        ) : (
                                            <Image
                                                src={avatar.thumbnail_url}
                                                alt={avatar.name}
                                                width={200}
                                                height={200}
                                                className="w-full h-full object-cover"
                                                onLoadStart={() => handleImageLoadStart(avatar.id)}
                                                onLoad={() => {
                                                    handleImageLoadEnd(avatar.id)
                                                    console.log(`Successfully loaded avatar: ${avatar.name} - ${avatar.thumbnail_url}`)
                                                }}
                                                onError={() => {
                                                    console.error(`Failed to load avatar image: ${avatar.thumbnail_url}`)
                                                    handleImageError(avatar.id)
                                                }}
                                                unoptimized={true}
                                            />
                                        )}
                                        {selectedAvatar?.id === avatar.id && (
                                            <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
                                                <div className="bg-blue-600 rounded-full p-2">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        )}
                                        {selectedAvatar?.id === avatar.id && (
                                            <div className="absolute top-2 left-2">
                                                <Badge className="bg-blue-600 text-white text-xs">
                                                    ✓ Selected
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                                            {avatar.name}
                                        </h4>
                                        <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2 leading-tight">
                                            {avatar.style}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            <Badge variant="outline" className="text-xs border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                                                {avatar.gender === 'female' ? 'Female' : 'Male'}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
                                                {avatar.age_range}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Indicatore di selezione */}
                    {selectedAvatar && stockAvatars.find(a => a.id === selectedAvatar.id) && (
                        <div className="text-center py-4">
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 px-4 py-2 text-sm">
                                ✓ {stockAvatars.find(a => a.id === selectedAvatar.id)?.name} selected
                            </Badge>
                        </div>
                    )}
                </div>
            )}

            {/* Avatar Custom Selection */}
            {currentChoice === 'custom' && (
                <div className="space-y-8">
                    {/* Header con Back Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                <Crown className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Your Custom Avatars
                                </h3>
                                <p className="text-gray-600 dark:text-zinc-400">
                                    Avatars you created in the dashboard
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" onClick={() => setCurrentChoice(null)} className="w-fit">
                            ← Change type
                        </Button>
                    </div>

                    {customAvatars.length > 0 ? (
                        <div className="space-y-6">
                            {/* Grid Custom Avatars - Responsive Layout */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {customAvatars.filter(avatar => avatar.status === 'active').map((avatar) => (
                                    <Card
                                        key={avatar.id}
                                        className={`cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.05] ${selectedAvatar?.id === avatar.id
                                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 shadow-lg ring-2 ring-purple-200 dark:ring-purple-800'
                                            : 'border-slate-200 dark:border-zinc-700 hover:border-purple-300 bg-white dark:bg-zinc-800'
                                            }`}
                                        onClick={() => selectCustomAvatar(avatar)}
                                    >
                                        <CardContent className="p-3">
                                            <div className="relative aspect-square mb-3 bg-gray-100 dark:bg-zinc-700 rounded-lg overflow-hidden">
                                                {loadingImages[avatar.id] && (
                                                    <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-600 flex items-center justify-center z-10">
                                                        <User className="w-8 h-8 animate-pulse text-gray-400" />
                                                    </div>
                                                )}
                                                {imageErrors[avatar.id] ? (
                                                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex flex-col items-center justify-center">
                                                        <Crown className="w-8 sm:w-12 h-8 sm:h-12 text-purple-500 mb-2" />
                                                        <span className="text-xs text-purple-600 dark:text-purple-400 font-medium text-center px-2 leading-tight">
                                                            {avatar.name}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={avatar.thumbnail_url}
                                                        alt={avatar.name}
                                                        width={200}
                                                        height={200}
                                                        className="w-full h-full object-cover"
                                                        onLoadStart={() => handleImageLoadStart(avatar.id)}
                                                        onLoad={() => {
                                                            handleImageLoadEnd(avatar.id)
                                                            console.log(`Successfully loaded custom avatar: ${avatar.name} - ${avatar.thumbnail_url}`)
                                                        }}
                                                        onError={() => {
                                                            console.error(`Failed to load custom avatar image: ${avatar.thumbnail_url}`)
                                                            handleImageError(avatar.id)
                                                        }}
                                                        unoptimized={true}
                                                    />
                                                )}
                                                {selectedAvatar?.id === avatar.id && (
                                                    <div className="absolute inset-0 bg-purple-600 bg-opacity-20 flex items-center justify-center">
                                                        <div className="bg-purple-600 rounded-full p-2">
                                                            <Check className="w-4 h-4 text-white" />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="absolute top-2 right-2">
                                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                                                        <Crown className="w-3 h-3 mr-1" />
                                                        Custom
                                                    </Badge>
                                                </div>
                                                {selectedAvatar?.id === avatar.id && (
                                                    <div className="absolute top-2 left-2">
                                                        <Badge className="bg-purple-600 text-white text-xs">
                                                            ✓ Selected
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                                                    {avatar.name}
                                                </h4>
                                                <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2 leading-tight">
                                                    Created on {new Date(avatar.created_at).toLocaleDateString('en-US')}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Indicatore di selezione custom */}
                            {selectedAvatar && customAvatars.find(a => a.id === selectedAvatar.id) && (
                                <div className="text-center py-4">
                                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 px-4 py-2 text-sm">
                                        <Crown className="w-3 h-3 mr-1" />
                                        ✓ {customAvatars.find(a => a.id === selectedAvatar.id)?.name} selected
                                    </Badge>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-8">
                            <div className="text-center space-y-6">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                                    <Plus className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    No Custom Avatars
                                </h3>
                                <p className="text-gray-600 dark:text-zinc-400 max-w-md mx-auto text-base">
                                    You haven't created any custom avatars yet. Go to the Custom Avatars section to create one.
                                </p>
                                <Button
                                    onClick={() => window.open('/dashboard/custom-avatars', '_blank')}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-xl text-base"
                                >
                                    <ExternalLink className="w-5 h-5 mr-2" />
                                    Create Custom Avatar
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            )}
        </div>
    )
} 