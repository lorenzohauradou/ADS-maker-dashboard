"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
    Play,
    X,
    Loader2,
    Lightbulb,
    Download,
    Image as ImageIcon
} from "lucide-react"
import {
    PhoneOne,
    Computer,
    Square,
    Mouth,
    Camera,
    Avatar,
    Magic,
} from '@icon-park/react'
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { useUserLimits } from "@/hooks/use-user-limits"
import { useSubscriptionLimits } from "@/hooks/use-subscription-limits"
import { AIImageGalleryModal } from "@/components/dashboard/ai-image-gallery-modal"
import { AvatarSelectionModal } from "@/components/dashboard/avatar-selection-modal"

interface ProductToVideoState {
    // Step management
    currentStep: 1 | 2 | 3

    // Product image
    productImage: File | null
    productImagePreview: string | null
    productImageUrl: string | null

    // Configuration
    videoType: 'product_avatar' | 'product_anyshot' | 'product_shot' | 'avatar_showcase'
    aspectRatio: '16x9' | '9x16' | '1x1'
    sceneInstructions: string
    videoScript: string
    selectedAvatar: string | null
    selectedAvatarName: string | null
    motionStyle: 'talking' | 'display'

    // Dropdown states
    showVideoTypeDropdown: boolean
    showFormatDropdown: boolean
    hoverPreview: string | null

    // Generation
    taskId: string | null
    projectId: number | null
    generatedPhotoUrl: string | null
    generatedVideoUrl: string | null

    // Loading states
    isGeneratingPreview: boolean
    isGeneratingVideo: boolean
    isSavingVideo: boolean
    isVideoSaved: boolean
    error: string | null

    // Modals
    showAIImageGalleryModal: boolean
    showAvatarSelectionModal: boolean
}



export default function ProductToVideoPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const { can_create_video } = useUserLimits()
    const { checkCanCreateVideo, showLimitExceededToast } = useSubscriptionLimits()

    const dropdownRef = useRef<HTMLDivElement>(null)

    const [state, setState] = useState<ProductToVideoState>({
        currentStep: 1,
        productImage: null,
        productImagePreview: null,
        productImageUrl: null,
        videoType: 'product_avatar',
        aspectRatio: '9x16',
        sceneInstructions: '',
        videoScript: '',
        selectedAvatar: null,
        selectedAvatarName: null,
        motionStyle: 'talking',
        showVideoTypeDropdown: false,
        showFormatDropdown: false,
        hoverPreview: null,
        taskId: null,
        projectId: null,
        generatedPhotoUrl: null,
        generatedVideoUrl: null,
        isGeneratingPreview: false,
        isGeneratingVideo: false,
        isSavingVideo: false,
        isVideoSaved: false,
        error: null,
        showAIImageGalleryModal: false,
        showAvatarSelectionModal: false
    })

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setState(prev => ({
                    ...prev,
                    showVideoTypeDropdown: false,
                    showFormatDropdown: false,
                    hoverPreview: null
                }))
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Auto-check for existing video when taskId is available
    useEffect(() => {
        const checkExistingVideo = async () => {
            if (state.taskId && !state.generatedVideoUrl && !state.isGeneratingVideo && !state.isGeneratingPreview) {
                try {
                    console.log('🔍 Checking for existing video for task:', state.taskId)
                    const response = await fetch(`/api/product_to_videos/${state.taskId}`)
                    if (response.ok) {
                        const result = await response.json()
                        if (result.generated_video_url) {
                            console.log('✅ Found existing video:', result.generated_video_url)
                            setState(prev => ({
                                ...prev,
                                generatedVideoUrl: result.generated_video_url
                            }))
                        } else if (result.generated_photo_url && !state.generatedPhotoUrl) {
                            console.log('✅ Found existing photo:', result.generated_photo_url)
                            setState(prev => ({
                                ...prev,
                                generatedPhotoUrl: result.generated_photo_url
                            }))
                        }
                    }
                } catch (error) {
                    console.error('Error checking existing video:', error)
                }
            }
        }

        checkExistingVideo()
    }, [state.taskId, state.generatedVideoUrl, state.isGeneratingVideo, state.isGeneratingPreview, state.generatedPhotoUrl])

    const saveVideoToProject = async () => {
        if (!state.projectId || !state.generatedVideoUrl) {
            toast.error('Cannot save video', {
                description: 'Project or video not available'
            })
            return
        }

        setState(prev => ({ ...prev, isSavingVideo: true, error: null }))

        try {
            const response = await fetch(`/api/projects/${state.projectId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    output_video_url: state.generatedVideoUrl,
                    output_thumbnail_url: state.generatedPhotoUrl,
                    status: 'completed',
                    progress: 100
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to save video to project')
            }

            setState(prev => ({
                ...prev,
                isSavingVideo: false,
                isVideoSaved: true
            }))

            toast.success('🎉 Video saved to project!', {
                description: 'You can now find it in your Projects section'
            })

        } catch (error) {
            console.error('Error saving video to project:', error)
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Unknown error',
                isSavingVideo: false
            }))
            toast.error('Failed to save video', {
                description: error instanceof Error ? error.message : 'Unknown error'
            })
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setState(prev => ({
                ...prev,
                productImage: file,
                productImagePreview: URL.createObjectURL(file),
                currentStep: 2,
                error: null
            }))
        }
    }

    const removeImage = () => {
        setState(prev => ({
            ...prev,
            productImage: null,
            productImagePreview: null,
            currentStep: 1,
            generatedPhotoUrl: null,
            generatedVideoUrl: null,
            taskId: null
        }))
    }

    const uploadImageToStorage = async (): Promise<string> => {
        if (!state.productImage) throw new Error('No image selected')

        const formData = new FormData()
        formData.append('images', state.productImage)
        formData.append('project_name', 'Product to Video')

        const response = await fetch('/api/upload-product-images', {
            method: 'POST',
            body: formData
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to upload image')
        }

        const result = await response.json()
        return result.image_urls[0]
    }

    const pollForGeneratedImage = async (taskId: string) => {
        const maxAttempts = 30 // Max 5 minutes (30 attempts * 10 seconds)
        let attempts = 0

        const checkStatus = async (): Promise<void> => {
            try {
                attempts++
                console.log(`🔄 Polling attempt ${attempts}/${maxAttempts} for task ${taskId}`)

                const response = await fetch(`/api/product_to_videos/${taskId}`)

                if (!response.ok) {
                    throw new Error(`Failed to check status: ${response.status}`)
                }

                const result = await response.json()
                console.log('📊 Task status:', result)

                if (result.generated_photo_url) {
                    // Immagine pronta!
                    setState(prev => ({
                        ...prev,
                        generatedPhotoUrl: result.generated_photo_url,
                        isGeneratingPreview: false
                    }))

                    toast.success('🎬 Preview generated successfully!', {
                        description: 'Your scene preview is ready. You can now generate the video.'
                    })
                    return
                }

                if (result.status === 'failed' || result.failed_reason) {
                    throw new Error(result.failed_reason || 'Image generation failed')
                }

                // Se non è pronta e non ha fallito, continua polling
                if (attempts < maxAttempts) {
                    setTimeout(checkStatus, 10000) // Check again in 10 seconds
                } else {
                    throw new Error('Timeout: Image generation took too long')
                }

            } catch (error) {
                console.error('❌ Polling error:', error)
                setState(prev => ({
                    ...prev,
                    error: error instanceof Error ? error.message : 'Unknown error',
                    isGeneratingPreview: false
                }))
                toast.error('Failed to generate preview', {
                    description: error instanceof Error ? error.message : 'Unknown error'
                })
            }
        }

        // Start polling
        setTimeout(checkStatus, 5000) // First check after 5 seconds
    }

    const generatePreviewImage = async () => {
        if (!can_create_video) {
            showLimitExceededToast()
            return
        }

        const { canCreate } = await checkCanCreateVideo()
        if (!canCreate) {
            showLimitExceededToast()
            return
        }

        setState(prev => ({ ...prev, isGeneratingPreview: true, error: null }))

        try {
            // 1. Upload image to storage
            const imageUrl = await uploadImageToStorage()

            // 2. Create project first
            const projectFormData = new FormData()
            projectFormData.append('name', `Product Video - ${new Date().toISOString().split('T')[0]}`)
            projectFormData.append('product_type', 'digital')
            projectFormData.append('files', state.productImage!)

            const projectResponse = await fetch('/api/projects/', {
                method: 'POST',
                body: projectFormData
            })

            if (!projectResponse.ok) {
                const errorData = await projectResponse.json()
                throw new Error(errorData.error || 'Failed to create project')
            }

            const projectResult = await projectResponse.json()
            const projectId = projectResult.id

            console.log('🎯 Project created:', projectId)

            // 3. Generate scene preview with project integration
            const response = await fetch('/api/product_to_videos/gen_image/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_url: imageUrl,
                    type: state.videoType,
                    image_prompt: state.sceneInstructions,
                    aspect_ratio: state.aspectRatio,
                    override_avatar: state.selectedAvatar,
                    project_id: projectId,
                    user_id: session?.user?.id,
                    user_email: session?.user?.email,
                    webhook_url: null
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to generate scene preview')
            }

            const result = await response.json()

            setState(prev => ({
                ...prev,
                taskId: result.id,
                projectId: projectId,
                productImageUrl: imageUrl,
                generatedPhotoUrl: result.generated_photo_url || null,
                currentStep: 3
            }))

            // Se l'immagine non è immediatamente disponibile, fai polling
            if (!result.generated_photo_url) {
                console.log('🔄 Image not ready yet, starting polling for task:', result.id)
                await pollForGeneratedImage(result.id)
            } else {
                setState(prev => ({ ...prev, isGeneratingPreview: false }))
                toast.success('🎬 Preview generated successfully!', {
                    description: 'Your scene preview is ready. You can now generate the video.'
                })
            }

        } catch (error) {
            console.error('Error generating preview:', error)
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Unknown error',
                isGeneratingPreview: false
            }))
            toast.error('Failed to generate preview', {
                description: error instanceof Error ? error.message : 'Unknown error'
            })
        }
    }

    const pollForGeneratedVideo = async (taskId: string) => {
        const maxAttempts = 40 // Max 6-7 minutes (40 attempts * 10 seconds)
        let attempts = 0

        const checkVideoStatus = async (): Promise<void> => {
            try {
                attempts++
                console.log(`🎬 Video polling attempt ${attempts}/${maxAttempts} for task ${taskId}`)

                const response = await fetch(`/api/product_to_videos/${taskId}`)

                if (!response.ok) {
                    throw new Error(`Failed to check video status: ${response.status}`)
                }

                const result = await response.json()
                console.log('🎬 Video task status:', result)

                if (result.generated_video_url) {
                    // Video pronto!
                    setState(prev => ({
                        ...prev,
                        generatedVideoUrl: result.generated_video_url,
                        isGeneratingVideo: false
                    }))

                    toast.success('🎉 Video generated successfully!', {
                        description: 'Your product video is ready!'
                    })
                    return
                }

                if (result.status === 'failed' || result.failed_reason) {
                    throw new Error(result.failed_reason || 'Video generation failed')
                }

                // Se non è pronto e non ha fallito, continua polling
                if (attempts < maxAttempts) {
                    setTimeout(checkVideoStatus, 10000) // Check again in 10 seconds
                } else {
                    throw new Error('Timeout: Video generation took too long')
                }

            } catch (error) {
                console.error('❌ Video polling error:', error)
                setState(prev => ({
                    ...prev,
                    error: error instanceof Error ? error.message : 'Unknown error',
                    isGeneratingVideo: false
                }))
                toast.error('Failed to generate video', {
                    description: error instanceof Error ? error.message : 'Unknown error'
                })
            }
        }

        // Start video polling
        setTimeout(checkVideoStatus, 5000) // First check after 5 seconds
    }

    const generateVideo = async () => {
        if (!state.taskId) return

        setState(prev => ({ ...prev, isGeneratingVideo: true, error: null }))

        try {
            const response = await fetch(`/api/product_to_videos/${state.taskId}/gen_video/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    motion_style: state.motionStyle,
                    video_prompt: state.videoScript || 'Create an engaging product presentation video with natural avatar movements',
                    user_id: session?.user?.id,
                    user_email: session?.user?.email,
                    webhook_url: null
                })
            })

            if (!response.ok) {
                const errorData = await response.json()

                // Se il video è già stato generato, recupera lo stato attuale
                if (errorData.details && errorData.details.includes('Video already generated')) {
                    console.log('🎬 Video already generated, checking current status...')

                    // Controlla immediatamente lo stato del task per recuperare il video
                    const statusResponse = await fetch(`/api/product_to_videos/${state.taskId}`)
                    if (statusResponse.ok) {
                        const statusResult = await statusResponse.json()
                        if (statusResult.generated_video_url) {
                            setState(prev => ({
                                ...prev,
                                generatedVideoUrl: statusResult.generated_video_url,
                                isGeneratingVideo: false
                            }))
                            toast.success('🎉 Video is ready!', {
                                description: 'Your product video was already generated!'
                            })
                            return
                        }
                    }
                }

                throw new Error(errorData.error || errorData.details || 'Failed to generate video')
            }

            const result = await response.json()

            // Se il video non è immediatamente disponibile, avvia polling
            if (!result.generated_video_url) {
                console.log('🎬 Video not ready yet, starting polling for task:', state.taskId)
                await pollForGeneratedVideo(state.taskId)
            } else {
                setState(prev => ({
                    ...prev,
                    generatedVideoUrl: result.generated_video_url,
                    isGeneratingVideo: false
                }))
                toast.success('🎉 Video generated successfully!', {
                    description: 'Your product video is ready!'
                })
            }

        } catch (error) {
            console.error('Error generating video:', error)
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Unknown error',
                isGeneratingVideo: false
            }))
            toast.error('Failed to generate video', {
                description: error instanceof Error ? error.message : 'Unknown error'
            })
        }
    }

    const generateAIInstructions = async () => {
        setState(prev => ({ ...prev, isGeneratingPreview: true }))

        try {
            // Simulate AI-generated scene instructions
            const aiSuggestions = [
                "Transform the product into a luxurious setting with soft lighting and premium background textures",
                "Create a modern minimalist scene with clean lines and professional studio lighting",
                "Place the product in a cozy lifestyle environment that shows its everyday use",
                "Design a tech-forward scene with futuristic elements and dynamic lighting",
                "Build a natural organic scene with earth tones and sustainable aesthetics"
            ]

            const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]

            setState(prev => ({
                ...prev,
                sceneInstructions: randomSuggestion,
                isGeneratingPreview: false
            }))

            toast.success('✨ AI instructions generated!', {
                description: 'Scene instructions have been created based on your product'
            })

        } catch (error) {
            setState(prev => ({ ...prev, isGeneratingPreview: false }))
            toast.error('Failed to generate AI instructions')
        }
    }

    const generateAIScript = async () => {
        setState(prev => ({ ...prev, isGeneratingVideo: true }))

        try {
            // Simulate AI-generated script
            const scriptTemplates = [
                "Meet your new favorite product! This amazing innovation will transform how you [USE CASE]. With its incredible [KEY FEATURE], you'll wonder how you ever lived without it. Get yours today!",
                "Looking for the perfect solution? Look no further! This game-changing product delivers [BENEFIT] like never before. Join thousands of satisfied customers who've already made the switch!",
                "Introducing the future of [CATEGORY]! Our revolutionary design combines [FEATURE 1] with [FEATURE 2] to give you unmatched performance. Don't miss out - order now!"
            ]

            const randomScript = scriptTemplates[Math.floor(Math.random() * scriptTemplates.length)]

            setState(prev => ({
                ...prev,
                videoScript: randomScript,
                isGeneratingVideo: false
            }))

            toast.success('🤖 AI script generated!', {
                description: 'Your video script is ready for customization'
            })

        } catch (error) {
            setState(prev => ({ ...prev, isGeneratingVideo: false }))
            toast.error('Failed to generate AI script')
        }
    }

    // AI Image Gallery Modal handlers
    const handleOpenAIImageGallery = () => {
        setState(prev => ({ ...prev, showAIImageGalleryModal: true }))
    }

    const handleCloseAIImageGallery = () => {
        setState(prev => ({ ...prev, showAIImageGalleryModal: false }))
    }

    const handleSelectAIImage = (imageUrl: string, filename: string) => {
        // Crea un oggetto File mock per compatibilità con il resto del workflow
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], filename, { type: blob.type })
                setState(prev => ({
                    ...prev,
                    productImage: file,
                    productImagePreview: imageUrl,
                    productImageUrl: imageUrl,
                    currentStep: 2,
                    error: null,
                    showAIImageGalleryModal: false
                }))
            })
            .catch(error => {
                console.error('Error loading AI image:', error)
                setState(prev => ({
                    ...prev,
                    error: 'Error loading image from AI Image Studio',
                    showAIImageGalleryModal: false
                }))
            })
    }

    // Avatar Selection Modal handlers
    const handleOpenAvatarSelection = () => {
        setState(prev => ({ ...prev, showAvatarSelectionModal: true }))
    }

    const handleCloseAvatarSelection = () => {
        setState(prev => ({ ...prev, showAvatarSelectionModal: false }))
    }

    const handleSelectAvatar = (avatarId: string, avatarName: string) => {
        setState(prev => ({
            ...prev,
            selectedAvatar: avatarId,
            selectedAvatarName: avatarName,
            showAvatarSelectionModal: false
        }))
    }

    return (
        <div className="flex flex-col h-screen bg-zinc-900 text-white overflow-hidden">
            <DashboardHeader />

            <main className="flex-1 flex overflow-hidden">
                {/* Mobile Layout (flex-col) - Desktop Layout (flex-row) */}
                <div className="flex-1 flex flex-col lg:flex-row">
                    {/* Left Column - Controls */}
                    <div className="w-full lg:w-[600px] p-4 md:p-6 lg:p-8 flex flex-col max-h-screen overflow-y-auto lg:overflow-y-visible">

                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6 lg:mb-10">
                            <h1 className="text-xl md:text-2xl font-bold text-white">Product to Video</h1>
                        </div>

                        {/* Step 1: Upload Product Image */}
                        <div className="mb-6 lg:mb-8">
                            <div className="flex items-center gap-3 mb-4 lg:mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-sm">1</span>
                                </div>
                                <h2 className="text-base lg:text-lg font-semibold text-white">Upload a product image</h2>
                                <div className="ml-auto">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 flex items-center gap-2 px-3 md:px-4 py-2 h-8 md:h-9 rounded-full transition-all duration-200"
                                    >
                                        <Lightbulb className="w-3 md:w-4 h-3 md:h-4" fill="yellow" />
                                        <span className="hidden sm:inline">Tips</span>
                                    </Button>
                                </div>
                            </div>

                            {!state.productImagePreview ? (
                                <div className="space-y-2">
                                    {/* Traditional Upload Section */}
                                    <div className="border-2 border-dashed border-zinc-600/50 rounded-2xl p-4 text-center bg-zinc-800/20 hover:border-purple-500/50 transition-all duration-300 group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="product-upload"
                                        />
                                        <label htmlFor="product-upload" className="cursor-pointer block">
                                            <div className="flex items-center justify-center gap-3">
                                                <ImageIcon size="32" fill="#71717a" className="group-hover:fill-purple-400 transition-colors duration-300" />
                                                <div>
                                                    <p className="text-white text-sm font-medium group-hover:text-purple-200 transition-colors duration-300">
                                                        Click or drag an image to upload
                                                    </p>
                                                    <p className="text-zinc-400 text-xs">
                                                        Upload image up to 50 MB
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Separator */}
                                    <div className="flex items-center justify-center py-1">
                                        <div className="flex-1 h-px bg-zinc-600/30"></div>
                                        <span className="px-4 text-zinc-400 text-xs font-medium">or</span>
                                        <div className="flex-1 h-px bg-zinc-600/30"></div>
                                    </div>

                                    {/* AI Image Gallery Section */}
                                    <div
                                        className="border-2 border-dashed border-zinc-600/50 rounded-2xl p-4 text-center bg-zinc-800/20 hover:border-yellow-500 transition-all duration-300 group cursor-pointer"
                                        onClick={handleOpenAIImageGallery}
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <Magic theme="outline" size="32" fill="yellow" />
                                            <div>
                                                <p className="text-white text-sm font-medium group-hover:text-yellow-200 transition-colors duration-300">
                                                    Choose from AI Image Studio
                                                </p>
                                                <p className="text-zinc-400 text-xs">
                                                    Select from your AI generated images
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={state.productImagePreview}
                                        alt="Product"
                                        className="w-full h-36 md:h-48 object-cover rounded-2xl shadow-lg"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={removeImage}
                                        className="absolute top-2 md:top-3 right-2 md:right-3 w-7 md:w-8 h-7 md:h-8 p-0 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all duration-200"
                                    >
                                        <X className="w-3 md:w-4 h-3 md:h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Step 2: Select Video Type */}
                        <div className="mb-6 lg:mb-8">
                            <div className="flex items-center gap-3 mb-4 lg:mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-sm">2</span>
                                </div>
                                <h2 className="text-base lg:text-lg font-semibold text-white">Select a video type</h2>
                            </div>

                            {/* Scene Instructions */}
                            <div className="mb-4 lg:mb-6">
                                <Textarea
                                    placeholder="Select an avatar and tell AI if you need any changes. e.g., 'change the background into a cozy living room.'"
                                    value={state.sceneInstructions}
                                    onChange={(e) => setState(prev => ({ ...prev, sceneInstructions: e.target.value }))}
                                    rows={3}
                                    className="resize-none bg-zinc-800/30 border-zinc-600/50 text-white placeholder-zinc-400 focus:border-purple-500/50 rounded-2xl transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 text-sm md:text-base"
                                />
                            </div>

                            {/* Video Type Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 relative" ref={dropdownRef}>
                                {/* Talking Video Dropdown */}
                                <div className="flex-1 relative">
                                    <Button
                                        variant="outline"
                                        onClick={() => setState(prev => ({
                                            ...prev,
                                            showVideoTypeDropdown: !prev.showVideoTypeDropdown,
                                            showFormatDropdown: false
                                        }))}
                                        className="w-full bg-zinc-800/50 hover:bg-zinc-700/50 border-zinc-600/50 text-white flex items-center justify-between px-4 md:px-6 py-3 md:py-4 h-12 md:h-14 rounded-2xl transition-all duration-200 hover:border-purple-500/50 shadow-sm hover:shadow-lg text-sm md:text-base"
                                    >
                                        <span className="flex items-center gap-2 md:gap-3">
                                            {state.videoType === 'product_shot' && <><Camera theme="outline" size="16" fill="#ffffff" className="md:w-[18px] md:h-[18px]" /> Product shot</>}
                                            {state.videoType === 'avatar_showcase' && <><Avatar theme="outline" size="16" fill="#ffffff" className="md:w-[18px] md:h-[18px]" /> Avatar showcase</>}
                                            {state.videoType === 'product_avatar' && <><Mouth theme="outline" size="16" fill="#ffffff" className="md:w-[18px] md:h-[18px]" /> Talking</>}
                                        </span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Button>

                                    {/* Video Type Dropdown */}
                                    {state.showVideoTypeDropdown && (
                                        <div className="absolute top-full left-0 mt-2 w-full bg-zinc-800/95 backdrop-blur-sm border border-zinc-600/50 rounded-2xl shadow-2xl z-10 overflow-hidden">
                                            <div
                                                className={`px-4 md:px-5 py-3 md:py-4 hover:bg-zinc-700/50 cursor-pointer border-b border-zinc-600/30 flex items-center gap-2 md:gap-3 transition-all duration-200 ${state.videoType === 'product_shot' ? 'bg-zinc-700/50' : ''}`}
                                                onClick={() => {
                                                    setState(prev => ({
                                                        ...prev,
                                                        videoType: 'product_shot' as any,
                                                        motionStyle: 'display', // ✅ Set motion style (not used for product_anyshot but good fallback)
                                                        showVideoTypeDropdown: false,
                                                        hoverPreview: null
                                                    }))
                                                }}
                                                onMouseEnter={() => setState(prev => ({ ...prev, hoverPreview: 'product_shot' }))}
                                                onMouseLeave={() => setState(prev => ({ ...prev, hoverPreview: null }))}
                                            >
                                                <div className="w-7 md:w-8 h-7 md:h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                                                    <Camera theme="outline" size="14" fill="#ffffff" className="md:w-4 md:h-4" />
                                                </div>
                                                <div className="text-white font-medium text-sm md:text-base">Product shot</div>
                                            </div>
                                            <div
                                                className={`px-4 md:px-5 py-3 md:py-4 hover:bg-zinc-700/50 cursor-pointer border-b border-zinc-600/30 flex items-center gap-2 md:gap-3 transition-all duration-200 ${state.videoType === 'avatar_showcase' ? 'bg-zinc-700/50' : ''}`}
                                                onClick={() => {
                                                    setState(prev => ({
                                                        ...prev,
                                                        videoType: 'avatar_showcase' as any,
                                                        motionStyle: 'display', // Set correct motion style for avatar showcase
                                                        showVideoTypeDropdown: false,
                                                        hoverPreview: null
                                                    }))
                                                }}
                                                onMouseEnter={() => setState(prev => ({ ...prev, hoverPreview: 'avatar_showcase' }))}
                                                onMouseLeave={() => setState(prev => ({ ...prev, hoverPreview: null }))}
                                            >
                                                <div className="w-7 md:w-8 h-7 md:h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                                                    <Avatar theme="outline" size="14" fill="#ffffff" className="md:w-4 md:h-4" />
                                                </div>
                                                <div className="text-white font-medium text-sm md:text-base">Avatar showcase</div>
                                            </div>
                                            <div
                                                className={`px-4 md:px-5 py-3 md:py-4 hover:bg-zinc-700/50 cursor-pointer flex items-center gap-2 md:gap-3 transition-all duration-200 ${state.videoType === 'product_avatar' ? 'bg-zinc-700/50' : ''}`}
                                                onClick={() => {
                                                    setState(prev => ({
                                                        ...prev,
                                                        videoType: 'product_avatar',
                                                        motionStyle: 'talking',
                                                        showVideoTypeDropdown: false,
                                                        hoverPreview: null
                                                    }))
                                                }}
                                                onMouseEnter={() => setState(prev => ({ ...prev, hoverPreview: 'product_avatar' }))}
                                                onMouseLeave={() => setState(prev => ({ ...prev, hoverPreview: null }))}
                                            >
                                                <div className="w-7 md:w-8 h-7 md:h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                                                    <Mouth theme="outline" size="14" fill="#ffffff" className="md:w-4 md:h-4" />
                                                </div>
                                                <div className="text-white font-medium text-sm md:text-base">Talking video</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Preview Panel positioned next to dropdown - Hidden on mobile */}
                                    {state.hoverPreview && (state.hoverPreview === 'product_shot' || state.hoverPreview === 'avatar_showcase' || state.hoverPreview === 'product_avatar') && (
                                        <div className="hidden lg:block absolute top-0 left-full ml-3 bg-zinc-800/95 backdrop-blur-sm border border-zinc-600/50 rounded-2xl shadow-2xl z-30 p-5 w-80">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                                    {state.hoverPreview === 'product_shot' && <Camera theme="outline" size="18" fill="#ffffff" />}
                                                    {state.hoverPreview === 'avatar_showcase' && <Avatar theme="outline" size="18" fill="#ffffff" />}
                                                    {state.hoverPreview === 'product_avatar' && <Mouth theme="outline" size="18" fill="#ffffff" />}
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-semibold text-base">
                                                        {state.hoverPreview === 'product_shot' && 'Product Shot'}
                                                        {state.hoverPreview === 'avatar_showcase' && 'Avatar Showcase'}
                                                        {state.hoverPreview === 'product_avatar' && 'Talking Video'}
                                                    </h3>
                                                    <p className="text-zinc-400 text-sm">
                                                        {state.hoverPreview === 'product_shot' && 'Clean product showcase'}
                                                        {state.hoverPreview === 'avatar_showcase' && 'Let your product shine through a person'}
                                                        {state.hoverPreview === 'product_avatar' && 'Showcase your product through a person holding it'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Preview Image */}
                                            <div className="w-full h-28 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <div className="text-white text-center">
                                                    <div className="w-8 h-8 mx-auto mb-2">
                                                        {state.hoverPreview === 'product_shot' && <Camera theme="outline" size="28" fill="#ffffff" />}
                                                        {state.hoverPreview === 'avatar_showcase' && <Avatar theme="outline" size="28" fill="#ffffff" />}
                                                        {state.hoverPreview === 'product_avatar' && <Mouth theme="outline" size="28" fill="#ffffff" />}
                                                    </div>
                                                    <p className="text-sm font-medium opacity-90">Preview</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Format Dropdown */}
                                <div className="flex-1 relative">
                                    <Button
                                        variant="outline"
                                        onClick={() => setState(prev => ({
                                            ...prev,
                                            showFormatDropdown: !prev.showFormatDropdown,
                                            showVideoTypeDropdown: false
                                        }))}
                                        className="w-full bg-zinc-800/50 hover:bg-zinc-700/50 border-zinc-600/50 text-white flex items-center justify-between px-4 md:px-6 py-3 md:py-4 h-12 md:h-14 rounded-2xl transition-all duration-200 hover:border-purple-500/50 shadow-sm hover:shadow-lg text-sm md:text-base"
                                    >
                                        <span className="flex items-center gap-2 md:gap-3">
                                            {state.aspectRatio === '9x16' && <><PhoneOne theme="outline" size="16" fill="#ffffff" className="md:w-[18px] md:h-[18px]" /> Portrait</>}
                                            {state.aspectRatio === '16x9' && <><Computer theme="outline" size="16" fill="#ffffff" className="md:w-[18px] md:h-[18px]" /> Landscape</>}
                                            {state.aspectRatio === '1x1' && <><Square theme="outline" size="16" fill="#ffffff" className="md:w-[18px] md:h-[18px]" /> Square</>}
                                        </span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Button>

                                    {/* Format Dropdown */}
                                    {state.showFormatDropdown && (
                                        <div className="absolute top-full left-0 mt-2 w-full bg-zinc-800/95 backdrop-blur-sm border border-zinc-600/50 rounded-2xl shadow-2xl z-10 overflow-hidden">
                                            <div
                                                className={`px-4 md:px-5 py-3 md:py-4 hover:bg-zinc-700/50 cursor-pointer border-b border-zinc-600/30 flex items-center gap-2 md:gap-3 transition-all duration-200 ${state.aspectRatio === '9x16' ? 'bg-zinc-700/50' : ''}`}
                                                onClick={() => {
                                                    setState(prev => ({
                                                        ...prev,
                                                        aspectRatio: '9x16' as any,
                                                        showFormatDropdown: false
                                                    }))
                                                }}
                                            >
                                                <div className="w-7 md:w-8 h-7 md:h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                                                    <PhoneOne theme="outline" size="14" fill="#ffffff" className="md:w-4 md:h-4" />
                                                </div>
                                                <div className="text-white font-medium text-sm md:text-base">Portrait</div>
                                            </div>
                                            <div
                                                className={`px-4 md:px-5 py-3 md:py-4 hover:bg-zinc-700/50 cursor-pointer border-b border-zinc-600/30 flex items-center gap-2 md:gap-3 transition-all duration-200 ${state.aspectRatio === '16x9' ? 'bg-zinc-700/50' : ''}`}
                                                onClick={() => {
                                                    setState(prev => ({
                                                        ...prev,
                                                        aspectRatio: '16x9' as any,
                                                        showFormatDropdown: false
                                                    }))
                                                }}
                                            >
                                                <div className="w-7 md:w-8 h-7 md:h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                                                    <Computer theme="outline" size="14" fill="#ffffff" className="md:w-4 md:h-4" />
                                                </div>
                                                <div className="text-white font-medium text-sm md:text-base">Landscape</div>
                                            </div>
                                            <div
                                                className={`px-4 md:px-5 py-3 md:py-4 hover:bg-zinc-700/50 cursor-pointer flex items-center gap-2 md:gap-3 transition-all duration-200 ${state.aspectRatio === '1x1' ? 'bg-zinc-700/50' : ''}`}
                                                onClick={() => {
                                                    setState(prev => ({
                                                        ...prev,
                                                        aspectRatio: '1x1' as any,
                                                        showFormatDropdown: false
                                                    }))
                                                }}
                                            >
                                                <div className="w-7 md:w-8 h-7 md:h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                                                    <Square theme="outline" size="14" fill="#ffffff" className="md:w-4 md:h-4" />
                                                </div>
                                                <div className="text-white font-medium text-sm md:text-base">Square</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Avatar Button - Only show for product_avatar (talking video) and avatar_showcase */}
                                {(state.videoType === 'product_avatar' || state.videoType === 'avatar_showcase') && (
                                    <div className="sm:flex-none">
                                        <Button
                                            variant="outline"
                                            onClick={handleOpenAvatarSelection}
                                            className="w-full sm:w-auto bg-zinc-800/50 hover:bg-zinc-700/50 border-zinc-600/50 text-white px-4 md:px-6 py-3 md:py-4 h-12 md:h-14 flex items-center gap-2 md:gap-3 rounded-2xl transition-all duration-200 hover:border-purple-500/50 shadow-sm hover:shadow-lg text-sm md:text-base"
                                        >
                                            <div className="w-7 md:w-8 h-7 md:h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                                                <Avatar theme="outline" size="14" fill="#ffffff" className="md:w-4 md:h-4" />
                                            </div>
                                            <span className="font-medium">{state.selectedAvatarName || 'Avatar'}</span>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Spacer to push button to bottom - Hidden on mobile */}
                        <div className="hidden lg:block flex-1"></div>

                        {/* Generate Preview Image Button */}
                        <Button
                            onClick={generatePreviewImage}
                            disabled={state.isGeneratingPreview || !state.productImage}
                            className={`w-full text-white py-4 md:py-5 text-sm md:text-base font-semibold rounded-2xl h-14 md:h-16 shadow-lg transition-all duration-300 mt-6 lg:mt-0 ${state.isGeneratingPreview
                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed'
                                }`}
                        >
                            {state.isGeneratingPreview ? (
                                <div className="flex items-center justify-center space-x-3">
                                    <div className="relative">
                                        <div className="w-5 h-5 border-2 border-white/30 rounded-full animate-spin border-t-white"></div>
                                    </div>
                                    <span className="animate-pulse">Creating AI preview...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <Magic theme="outline" size="18" fill="#ffffff" />
                                    <span>Generate preview image</span>
                                </div>
                            )}
                        </Button>
                    </div>

                    {/* Right Column - Hero Section with Video */}
                    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-[60vh] lg:min-h-0">
                        <div className="text-center mb-6 md:mb-8">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                                Turn Any Product Image into a Stunning Video
                            </h1>
                            <p className="hidden md:block text-zinc-300 text-sm md:text-base lg:text-lg max-w-2xl px-4">
                                Instantly transform product images into cinematic product shots or avatar videos — all with a single click.
                            </p>
                        </div>

                        {/* Video Preview - 9:16 Aspect Ratio */}
                        <div className="bg-white rounded-2xl p-3 md:p-4 shadow-2xl">
                            <div className="w-[200px] h-[356px] sm:w-[220px] sm:h-[391px] md:w-[240px] md:h-[427px] lg:w-[260px] lg:h-[462px] bg-gray-100 rounded-lg overflow-hidden">
                                {state.generatedVideoUrl ? (
                                    <video
                                        src={state.generatedVideoUrl}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                ) : state.isGeneratingVideo ? (
                                    <div className="w-full h-full relative overflow-hidden">
                                        {/* Background sfocato con immagine generata */}
                                        {state.generatedPhotoUrl && (
                                            <img
                                                src={state.generatedPhotoUrl}
                                                alt="Background"
                                                className="w-full h-full object-cover filter blur-md scale-110"
                                            />
                                        )}

                                        {/* Overlay scuro */}
                                        <div className="absolute inset-0 bg-black/60"></div>

                                        {/* Loading content per video */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                                            {/* Spinning Icon */}
                                            <div className="relative">
                                                <div className="w-16 h-16 border-4 border-white/30 rounded-full animate-spin border-t-orange-500"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Play className="w-6 h-6 text-orange-400" />
                                                </div>
                                            </div>

                                            {/* Loading Text */}
                                            <div className="text-center">
                                                <h3 className="text-white font-semibold text-lg">Creating Video</h3>
                                                <p className="text-white/80 text-sm mt-1">Generating your AI avatar video...</p>
                                            </div>

                                            {/* Progress Dots */}
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : state.generatedPhotoUrl ? (
                                    <div className="w-full h-full relative">
                                        <img
                                            src={state.generatedPhotoUrl}
                                            alt="Generated Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Generate Video Button Overlay */}
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                            <button
                                                onClick={generateVideo}
                                                disabled={state.isGeneratingVideo}
                                                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Play className="w-4 h-4 mr-2 inline" />
                                                Generate Video
                                            </button>
                                        </div>
                                    </div>
                                ) : state.isGeneratingPreview ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 relative overflow-hidden">
                                        {/* Animated Background */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-purple-900/30 animate-pulse"></div>

                                        {/* Loading Content */}
                                        <div className="relative z-10 flex flex-col items-center space-y-4">
                                            {/* Spinning Icon */}
                                            <div className="relative">
                                                <div className="w-16 h-16 border-4 border-zinc-700 rounded-full animate-spin border-t-purple-500"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <ImageIcon className="w-6 h-6 text-purple-400" />
                                                </div>
                                            </div>

                                            {/* Loading Text */}
                                            <div className="text-center">
                                                <h3 className="text-white font-semibold text-lg">Creating AI Preview</h3>
                                                <p className="text-zinc-300 text-sm mt-1">
                                                    {state.taskId ? 'Generating image with AI...' : 'Processing your product image...'}
                                                </p>
                                            </div>

                                            {/* Progress Dots */}
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>

                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <video src="/ptv_preview.mp4" className="w-full h-full object-cover" autoPlay muted loop />
                                    </div>
                                )}
                            </div>
                        </div>



                        {/* Video Action Buttons */}
                        {state.generatedVideoUrl && (
                            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3">
                                {/* Save to Project Button */}
                                <Button
                                    onClick={saveVideoToProject}
                                    disabled={state.isSavingVideo || state.isVideoSaved}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base transition-all duration-200"
                                >
                                    {state.isSavingVideo ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : state.isVideoSaved ? (
                                        <>
                                            <Lightbulb className="w-4 h-4 mr-2" />
                                            Saved to Projects
                                        </>
                                    ) : (
                                        <>
                                            <Lightbulb className="w-4 h-4 mr-2" />
                                            Save Video
                                        </>
                                    )}
                                </Button>

                                {/* Download Button */}
                                <Button
                                    onClick={() => window.open(state.generatedVideoUrl!, '_blank')}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg font-medium text-sm md:text-base"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Video
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Error Display */}
            {state.error && (
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-red-900/20 border border-red-800 rounded-lg">
                    <p className="text-red-200">{state.error}</p>
                </div>
            )}

            {/* AI Image Gallery Modal */}
            <AIImageGalleryModal
                isOpen={state.showAIImageGalleryModal}
                onClose={handleCloseAIImageGallery}
                onSelectImage={handleSelectAIImage}
            />

            {/* Avatar Selection Modal */}
            <AvatarSelectionModal
                isOpen={state.showAvatarSelectionModal}
                onClose={handleCloseAvatarSelection}
                onSelectAvatar={handleSelectAvatar}
                selectedAvatarId={state.selectedAvatar || undefined}
            />
        </div>
    )
} 