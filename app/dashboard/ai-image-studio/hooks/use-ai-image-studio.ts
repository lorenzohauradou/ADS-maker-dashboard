import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { WorkflowStep, PresetStyle, GeneratedImage } from "../types"
import { supabaseClient } from "@/lib/supabase"

export const useAIImageStudio = () => {
    const { toast } = useToast()

    // Core state
    const [currentStep, setCurrentStep] = useState<WorkflowStep>('initial')
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('')
    const [supabaseImageUrl, setSupabaseImageUrl] = useState<string>('')
    const [selectedStyle, setSelectedStyle] = useState<PresetStyle | null>(null)
    const [customPrompt, setCustomPrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [progress, setProgress] = useState(0)
    const [result, setResult] = useState<GeneratedImage | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Upload immediato su Supabase Storage
    const uploadToSupabase = useCallback(async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop()
        const fileName = `ai-studio/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`

        const { data, error } = await supabaseClient.storage
            .from('uploads')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            throw new Error(`Upload failed: ${error.message}`)
        }

        // Ottieni URL pubblico
        const { data: urlData } = supabaseClient.storage
            .from('uploads')
            .getPublicUrl(fileName)

        return urlData.publicUrl
    }, [])

    // Handlers
    const handleImageUpload = useCallback(async (file: File) => {
        setUploadedImage(file)
        setError(null)

        // Crea preview URL locale (immediato)
        const previewUrl = URL.createObjectURL(file)
        setUploadedImageUrl(previewUrl)
        setCurrentStep('controls')

        toast({
            title: "Uploading to Cloud Storage...",
            description: "📤 Caricamento dell'immagine su cloud storage sicuro",
        })

        try {
            // Upload immediato su Supabase Storage
            const supabaseUrl = await uploadToSupabase(file)
            setSupabaseImageUrl(supabaseUrl)

            toast({
                title: "Image Ready! ✅",
                description: "📱 Immagine caricata e pronta per la trasformazione AI",
            })
        } catch (error) {
            console.error('❌ Upload error:', error)
            setError('Failed to upload image to cloud storage')
            toast({
                title: "Upload Failed",
                description: "❌ Errore caricamento. Riprova con un'altra immagine.",
                variant: "destructive"
            })
        }
    }, [toast, uploadToSupabase])

    const handleStyleSelect = useCallback((style: PresetStyle) => {
        setSelectedStyle(style)
        setError(null)
    }, [])

    const handleCustomPromptChange = useCallback((prompt: string) => {
        setCustomPrompt(prompt)
    }, [])

    const handleEnhanceImage = useCallback(async () => {
        if (!supabaseImageUrl || !selectedStyle) {
            setError('Image upload is still in progress. Please wait.')
            return
        }

        setIsGenerating(true)
        setCurrentStep('generating')
        setProgress(0)
        setError(null)

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval)
                        return 90
                    }
                    return prev + 10
                })
            }, 500)

            // INVIA SOLO L'URL (JSON) - molto più veloce!
            const payload = {
                image_url: supabaseImageUrl,
                style: selectedStyle.id,
                custom_prompt: customPrompt.trim() || undefined
            }

            const response = await fetch('/api/ai-images/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })

            clearInterval(progressInterval)
            setProgress(100)

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.details || errorData.error || `HTTP ${response.status}`)
            }

            const data = await response.json()

            if (data.success && data.data && data.data.images && data.data.images.length > 0) {
                setResult(data.data.images[0])
                setCurrentStep('result')

                toast({
                    title: "Marketing Asset Created! ✨",
                    description: "Your product image is now ready for e-commerce and ads",
                })
            } else {
                throw new Error(data.error || 'Enhancement failed')
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Enhancement failed'
            setError(errorMessage)
            setCurrentStep('controls')

            toast({
                title: "Enhancement Failed",
                description: errorMessage,
                variant: "destructive"
            })
        } finally {
            setIsGenerating(false)
            setProgress(0)
        }
    }, [supabaseImageUrl, selectedStyle, customPrompt, toast])

    const handleDownloadImage = useCallback(async () => {
        if (!result) return

        try {
            const response = await fetch(result.url)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = result.filename
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)

            toast({
                title: "Download Complete",
                description: `${result.filename} has been downloaded`,
            })
        } catch (err) {
            toast({
                title: "Download Failed",
                description: "Unable to download the image",
                variant: "destructive"
            })
        }
    }, [result, toast])

    const handleStartOver = useCallback(() => {
        setCurrentStep('initial')
        setUploadedImage(null)
        setUploadedImageUrl('')
        setSupabaseImageUrl('')
        setSelectedStyle(null)
        setCustomPrompt('')
        setResult(null)
        setError(null)

        // Cleanup preview URL
        if (uploadedImageUrl) {
            URL.revokeObjectURL(uploadedImageUrl)
        }
    }, [uploadedImageUrl])

    const handleUseImageAndContinue = useCallback(() => {
        // This would integrate with the main video creation workflow
        toast({
            title: "Marketing Asset Ready",
            description: "Your professional product image is ready for video creation",
        })
    }, [toast])

    const handleRemoveBackground = useCallback(async () => {
        if (!result || !result.url) return

        setIsGenerating(true)
        setProgress(0)
        setError(null)

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval)
                        return 90
                    }
                    return prev + 10
                })
            }, 500)

            // INVIA URL dell'immagine risultato (più efficiente di ri-scaricare)
            const payload = {
                image_url: result.url,
                style: 'transparent-bg'
            }

            const response = await fetch('/api/ai-images/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })

            clearInterval(progressInterval)
            setProgress(100)

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.details || errorData.error || `HTTP ${response.status}`)
            }

            const data = await response.json()

            if (data.success && data.data && data.data.images && data.data.images.length > 0) {
                setResult(data.data.images[0])

                toast({
                    title: "Background Removed! ✨",
                    description: "Your image now has a transparent background",
                })
            } else {
                throw new Error(data.error || 'Background removal failed')
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Background removal failed'
            setError(errorMessage)

            toast({
                title: "Background Removal Failed",
                description: errorMessage,
                variant: "destructive"
            })
        } finally {
            setIsGenerating(false)
            setProgress(0)
        }
    }, [result, toast])

    return {
        // State
        currentStep,
        uploadedImage,
        uploadedImageUrl,
        supabaseImageUrl,
        selectedStyle,
        customPrompt,
        isGenerating,
        progress,
        result,
        error,
        
        // Handlers
        handleImageUpload,
        handleStyleSelect,
        handleCustomPromptChange,
        handleEnhanceImage,
        handleDownloadImage,
        handleStartOver,
        handleUseImageAndContinue,
        handleRemoveBackground
    }
}