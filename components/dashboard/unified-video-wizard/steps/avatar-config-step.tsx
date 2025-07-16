"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, User, Crown, MessageSquare, Plus, Upload, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useSession } from 'next-auth/react'
import { cn } from "@/lib/utils"

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
    selectedAvatar: Avatar | CustomAvatar | null
    onAvatarSelect: (avatar: Avatar | CustomAvatar, type: 'stock' | 'custom') => void
    onContinue?: () => void
}

export function AvatarConfigStep({ avatarType, selectedAvatar, onAvatarSelect, onContinue }: AvatarConfigStepProps) {
    const [customAvatars, setCustomAvatars] = useState<CustomAvatar[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({})
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
    const [currentChoice, setCurrentChoice] = useState<'stock' | 'custom' | null>(
        avatarType === 'stock' ? 'stock' :
            (avatarType === 'dyoa' || avatarType === 'byoa') ? 'custom' : null
    )

    // 🎭 Stato per limiti avatar
    const [avatarLimits, setAvatarLimits] = useState<any>(null)
    const { data: session } = useSession()

    // 🔄 Lazy loading state
    const [allAvatars, setAllAvatars] = useState<Avatar[]>([]) // Tutti gli avatar dall'API
    const [displayedAvatars, setDisplayedAvatars] = useState<Avatar[]>([]) // Avatar attualmente visualizzati
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)
    const AVATARS_PER_PAGE = 12 // Numero di avatar da caricare per batch

    useEffect(() => {
        initializeAvatars()
    }, [])

    async function initializeAvatars() {
        try {
            setLoading(true)
            // 🔄 Prima carica i limiti, poi gli avatar
            await loadAvatarLimits()
            await loadAvatars()
        } catch (error) {
            console.error('❌ Error initializing avatars:', error)
            toast.error('Errore inizializzazione avatar')
        } finally {
            setLoading(false)
        }
    }

    async function loadAvatarLimits() {
        if (!session?.user?.id) return

        try {
            const response = await fetch(`/api/subscriptions/check-avatar-limits/${session.user.id}`)
            if (response.ok) {
                const limits = await response.json()
                setAvatarLimits(limits)
                console.log('✅ Avatar limits loaded:', limits)
            }
        } catch (error) {
            console.error('Error loading avatar limits:', error)
        }
    }

    async function loadAvatars() {
        try {
            console.log('🎭 Loading stock avatars from Creatify API...')

            // 🌟 Carica avatar stock dall'API di Creatify
            let mappedAvatars: Avatar[] = []

            // 🎯 Strategia di caricamento: Presenter prima, poi tutti se non sufficienti
            try {
                console.log('🎭 Trying to load presenter avatars first...')
                const presenterResponse = await fetch('/api/creatify/avatars?style=presenter')

                if (presenterResponse.ok) {
                    const presenterResult = await presenterResponse.json()
                    if (presenterResult.success && presenterResult.avatars) {
                        mappedAvatars = mapAvatarsFromAPI(presenterResult.avatars)
                        console.log(`🎭 Presenter avatars loaded: ${mappedAvatars.length}`)
                    }
                }

                // 🔄 Se presenter non sufficienti (< 6), carica tutti gli avatar 
                const minAvatarsNeeded = 6
                if (mappedAvatars.length < minAvatarsNeeded) {
                    console.log('🔄 Not enough presenter avatars, loading all avatars...')
                    const allResponse = await fetch('/api/creatify/avatars')

                    if (allResponse.ok) {
                        const allResult = await allResponse.json()
                        if (allResult.success && allResult.avatars) {
                            const allMapped = mapAvatarsFromAPI(allResult.avatars)

                            // 🎯 Combina presenter + altri, rimuovi duplicati
                            const presenterIds = new Set(mappedAvatars.map((a: Avatar) => a.id))
                            const additionalAvatars = allMapped.filter((a: Avatar) => !presenterIds.has(a.id))

                            mappedAvatars = [...mappedAvatars, ...additionalAvatars]
                            console.log(`🔄 Combined avatars: ${mappedAvatars.length} total`)
                        }
                    }
                }

                if (mappedAvatars.length > 0) {
                    // 🎭 Applica limite in base al piano
                    const avatarLimit = avatarLimits?.avatars_available === 'basic' ? 12 : mappedAvatars.length
                    const limitedAvatars = mappedAvatars.slice(0, avatarLimit)

                    console.log(`✅ Final avatars: ${limitedAvatars.length}/${mappedAvatars.length} (limit applied)`)

                    // 🔄 NEW: Salva tutti gli avatar e mostra solo i primi
                    setAllAvatars(limitedAvatars)
                    setDisplayedAvatars(limitedAvatars.slice(0, AVATARS_PER_PAGE))
                    setHasMore(limitedAvatars.length > AVATARS_PER_PAGE)
                    setCurrentPage(0)
                } else {
                    throw new Error('No avatars received from API')
                }

            } catch (apiError) {
                console.error('❌ Error with Creatify API:', apiError)
                toast.error('Errore caricamento avatar da API, using mock data')
                const mockAvatars = getMockAvatars()
                setAllAvatars(mockAvatars)
                setDisplayedAvatars(mockAvatars.slice(0, AVATARS_PER_PAGE))
                setHasMore(mockAvatars.length > AVATARS_PER_PAGE)
                setCurrentPage(0)
            }

            // Carica avatars personalizzati dell'utente SOLO se piano lo consente
            if (avatarLimits?.can_create_custom_avatars) {
                const customResponse = await fetch('/api/users/me/custom-avatars')
                if (customResponse.ok) {
                    const customResult = await customResponse.json()
                    if (customResult.success) {
                        setCustomAvatars(customResult.custom_avatars || [])
                    }
                }
            }

        } catch (error) {
            console.error('❌ Error loading avatars:', error)
            toast.error('Errore caricamento avatar, using mock data')
            // Fallback a dati mock in caso di errore
            const mockAvatars = getMockAvatars()
            setAllAvatars(mockAvatars)
            setDisplayedAvatars(mockAvatars.slice(0, AVATARS_PER_PAGE))
            setHasMore(mockAvatars.length > AVATARS_PER_PAGE)
            setCurrentPage(0)
        }
    }

    // 🎭 Funzione helper per mappare dati da API a formato locale
    function mapAvatarsFromAPI(apiAvatars: any[]): Avatar[] {
        return apiAvatars
            .filter((apiAvatar: any) => apiAvatar.is_active && apiAvatar.creator_name) // Solo avatar attivi con nome
            .map((apiAvatar: any) => ({
                id: apiAvatar.id,
                name: apiAvatar.creator_name || `Avatar ${apiAvatar.id.slice(0, 8)}`,
                gender: mapGender(apiAvatar.gender),
                age_range: mapAgeRange(apiAvatar.age_range),
                style: mapStyle(apiAvatar.style, apiAvatar.video_scene),
                thumbnail_url: apiAvatar.preview_image_1_1 || apiAvatar.preview_image_16_9 || "/placeholder-user.jpg",
                preview_url: apiAvatar.preview_video_1_1 || apiAvatar.preview_video_16_9
            }))
    }

    // 🎭 Funzioni di mappatura dati API Creatify -> formato locale
    function mapGender(apiGender: string): "male" | "female" | "neutral" {
        switch (apiGender) {
            case 'm': return 'male'
            case 'f': return 'female'
            case 'nb': return 'neutral'
            default: return 'neutral'
        }
    }

    function mapAgeRange(apiAge: string): string {
        switch (apiAge) {
            case 'child': return '8-15'
            case 'teen': return '16-25'
            case 'adult': return '26-50'
            case 'senior': return '50+'
            default: return '25-40'
        }
    }

    function mapStyle(apiStyle: string, scene?: string): string {
        const baseStyle = apiStyle === 'presenter' ? 'Professional Presenter' :
            apiStyle === 'selfie' ? 'Casual Speaker' : 'Versatile Host'

        // Aggiungi info dal scene se disponibile
        if (scene) {
            return `${baseStyle} - ${scene.charAt(0).toUpperCase() + scene.slice(1)}`
        }
        return baseStyle
    }

    // 🎭 Dati mock come fallback
    function getMockAvatars(): Avatar[] {
        const avatarLimit = avatarLimits?.avatars_available === 'basic' ? 12 : 100

        const allAvatars: Avatar[] = [
            {
                id: "mock_avatar_1",
                name: "Sarah Professional",
                gender: "female" as const,
                age_range: "25-35",
                style: "Business Executive",
                thumbnail_url: "/avatar1.png"
            },
            {
                id: "mock_avatar_2",
                name: "Marco Casual",
                gender: "male" as const,
                age_range: "30-40",
                style: "Friendly Presenter",
                thumbnail_url: "/avatar2.png"
            },
            {
                id: "mock_avatar_3",
                name: "Elena Tech",
                gender: "female" as const,
                age_range: "20-30",
                style: "Modern & Dynamic",
                thumbnail_url: "/avatar5.png"
            },
            {
                id: "mock_avatar_4",
                name: "David Executive",
                gender: "male" as const,
                age_range: "35-45",
                style: "Corporate Leader",
                thumbnail_url: "/avatar6.png"
            }
        ]

        return allAvatars.slice(0, avatarLimit)
    }

    // Funzione per caricare più avatar
    const loadMoreAvatars = () => {
        if (loadingMore || !hasMore) return

        setLoadingMore(true)

        // Simula un piccolo delay per UX migliore
        setTimeout(() => {
            const nextPage = currentPage + 1
            const startIndex = nextPage * AVATARS_PER_PAGE
            const endIndex = startIndex + AVATARS_PER_PAGE

            const nextBatch = allAvatars.slice(startIndex, endIndex)

            if (nextBatch.length > 0) {
                setDisplayedAvatars(prev => [...prev, ...nextBatch])
                setCurrentPage(nextPage)
                setHasMore(endIndex < allAvatars.length)
                console.log(`🔄 Loaded ${nextBatch.length} more avatars. Total displayed: ${displayedAvatars.length + nextBatch.length}`)
            } else {
                setHasMore(false)
            }

            setLoadingMore(false)
        }, 300)
    }

    // 🔄 NEW: Intersection Observer per infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loadingMore) {
                    loadMoreAvatars()
                }
            },
            { threshold: 0.1 }
        )

        const sentinel = document.getElementById('avatar-load-more-sentinel')
        if (sentinel) {
            observer.observe(sentinel)
        }

        return () => {
            if (sentinel) {
                observer.unobserve(sentinel)
            }
        }
    }, [hasMore, loadingMore, currentPage, allAvatars.length])

    function selectStockAvatar(avatar: Avatar) {
        setCurrentChoice('stock')
        onAvatarSelect(avatar, 'stock')
        toast.success(`Avatar "${avatar.name}" selected`)
    }

    function selectCustomAvatar(avatar: CustomAvatar) {
        setCurrentChoice('custom')
        onAvatarSelect(avatar, 'custom')
        toast.success(`Custom avatar "${avatar.name}" selected`)
    }

    const handleChoiceSelect = (choice: 'stock' | 'custom') => {
        // 🎭 Controlla limiti prima di permettere la selezione
        if (choice === 'custom' && !avatarLimits?.can_create_custom_avatars) {
            toast.error('Custom avatars non disponibili nel tuo piano', {
                description: 'Aggiorna al piano Pro per creare avatar personalizzati',
                action: {
                    label: 'Aggiorna Piano',
                    onClick: () => window.location.href = '/#pricing'
                }
            })
            return
        }

        setCurrentChoice(choice)
        if (choice === 'stock' && displayedAvatars.length > 0) {
            selectStockAvatar(displayedAvatars[0])
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

    const selectedStockAvatar = displayedAvatars.find(a => a.id === selectedAvatar?.id)
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
            {/* Header con informazioni piano */}
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
                {avatarLimits && (
                    <div className="flex justify-center gap-2 flex-wrap">
                        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                            Plan {avatarLimits.plan.charAt(0).toUpperCase() + avatarLimits.plan.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                            {avatarLimits.avatar_library_size} Avatars
                        </Badge>
                        {avatarLimits.can_create_custom_avatars && (
                            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                ✨ Custom Avatars
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            {/* Scelta Tipo Avatar con controlli piano */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Card
                    className={`p-6 cursor-pointer border-2 transition-all duration-200 ${currentChoice === 'stock'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    onClick={() => handleChoiceSelect('stock')}
                >
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto bg-blue-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Professional Avatars
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {avatarLimits?.avatar_library_size || '100+'} professional avatars ready to use
                        </p>
                        {currentChoice === 'stock' && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                ✓ Selected
                            </Badge>
                        )}
                    </div>
                </Card>

                <Card
                    className={`p-6 cursor-pointer border-2 transition-all duration-200 ${currentChoice === 'custom'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : avatarLimits?.can_create_custom_avatars
                            ? 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                        }`}
                    onClick={() => handleChoiceSelect('custom')}
                >
                    <div className="text-center space-y-3">
                        <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${avatarLimits?.can_create_custom_avatars
                            ? 'bg-purple-500'
                            : 'bg-gray-400'
                            }`}>
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Custom Avatars
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {avatarLimits?.can_create_custom_avatars
                                ? 'Crea avatar personalizzati da texto o video'
                                : 'Disponibile dal piano Pro'
                            }
                        </p>
                        {currentChoice === 'custom' && (
                            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                ✓ Selected
                            </Badge>
                        )}
                        {!avatarLimits?.can_create_custom_avatars && (
                            <Badge variant="outline" className="border-orange-300 text-orange-700 dark:text-orange-300">
                                🔒 Pro Required
                            </Badge>
                        )}
                    </div>
                </Card>
            </div>

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
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    Showing {displayedAvatars.length} of {allAvatars.length} avatars
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Button variant="outline" onClick={() => setCurrentChoice(null)} className="w-fit">
                                ← Change type
                            </Button>
                            {onContinue && (
                                <Button
                                    onClick={onContinue}
                                    disabled={!selectedAvatar}
                                    className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-white text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
                                >
                                    Continue
                                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Grid Avatar Stock - Responsive Grid Layout */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {displayedAvatars.map((avatar) => (
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

                    {/* Sentinel per infinite scroll */}
                    {hasMore && (
                        <div id="avatar-load-more-sentinel" className="w-full h-10 flex items-center justify-center">
                            {loadingMore && (
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-sm">Loading more avatars...</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Indicatore di selezione */}
                    {selectedAvatar && displayedAvatars.find(a => a.id === selectedAvatar.id) && (
                        <div className="text-center py-4">
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 px-4 py-2 text-sm">
                                ✓ {displayedAvatars.find(a => a.id === selectedAvatar.id)?.name} selected
                            </Badge>
                        </div>
                    )}

                    {/* Pulsante caricamento manuale */}
                    {hasMore && !loadingMore && (
                        <div className="text-center py-4">
                            <Button
                                variant="outline"
                                onClick={loadMoreAvatars}
                                className="px-6 py-2"
                            >
                                Load More Avatars ({displayedAvatars.length}/{allAvatars.length})
                            </Button>
                        </div>
                    )}

                    {/* Informazioni di caricamento */}
                    {!hasMore && allAvatars.length > 0 && (
                        <div className="text-center py-4">
                            <Badge variant="outline" className="px-4 py-2 text-sm">
                                All {allAvatars.length} avatars loaded
                            </Badge>
                        </div>
                    )}
                </div>
            )}

            {/* Custom Avatars Section */}
            {currentChoice === 'custom' && (
                <div className="space-y-6">
                    <div className="grid gap-6">
                        {customAvatars.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {customAvatars.map((avatar) => (
                                    <div
                                        key={avatar.id}
                                        className={cn(
                                            "relative group cursor-pointer rounded-lg border-2 transition-all",
                                            selectedAvatar?.id === avatar.id
                                                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                                : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                                        )}
                                        onClick={() => onAvatarSelect(avatar, 'custom')}
                                    >
                                        <div className="aspect-square relative overflow-hidden rounded-lg">
                                            <img
                                                src={avatar.thumbnail_url || "/placeholder-user.jpg"}
                                                alt={avatar.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const img = e.target as HTMLImageElement;
                                                    img.src = "/placeholder-user.jpg";
                                                }}
                                            />
                                            {selectedAvatar?.id === avatar.id && (
                                                <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                                                    <Check className="w-8 h-8 text-purple-600" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                                                {avatar.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                                {avatar.status}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                        <Crown className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            No Custom Avatars Yet
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                                            Create personalized avatars from text descriptions or upload your own video to generate a digital twin.
                                            <span className="font-semibold text-purple-600 dark:text-purple-400">
                                                {avatarLimits?.byoa_enabled || avatarLimits?.dyoa_enabled
                                                    ? " Available in your plan!"
                                                    : " Upgrade to Pro to unlock custom avatars."
                                                }
                                            </span>
                                        </p>

                                        {(avatarLimits?.byoa_enabled || avatarLimits?.dyoa_enabled) && (
                                            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                                <div className="space-y-3">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available Options:</span>
                                                    </div>
                                                    {avatarLimits?.dyoa_enabled && (
                                                        <div className="flex items-start space-x-3">
                                                            <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">DYOA - Design Your Own Avatar</p>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">Create from text descriptions ({avatarLimits?.dyoa_limit_per_month}/month)</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {avatarLimits?.byoa_enabled && (
                                                        <div className="flex items-start space-x-3">
                                                            <Upload className="w-4 h-4 text-purple-600 mt-0.5" />
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">BYOA - Bring Your Own Avatar</p>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">Upload your video for digital twin ({avatarLimits?.byoa_limit_per_month}/month)</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        {(avatarLimits?.byoa_enabled || avatarLimits?.dyoa_enabled) ? (
                                            <Button
                                                onClick={() => window.location.href = '/dashboard/custom-avatars'}
                                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Go to Custom Avatars Section
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => window.open('/pricing', '_blank')}
                                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                                            >
                                                <Crown className="w-4 h-4 mr-2" />
                                                Upgrade to Pro Plan
                                            </Button>
                                        )}
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Avatars created in the dedicated section will appear here automatically
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
} 