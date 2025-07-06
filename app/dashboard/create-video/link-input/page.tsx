"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useUserLimits } from "@/hooks/use-user-limits"
import { useSubscriptionLimits } from "@/hooks/use-subscription-limits"
import {
    PageHeader,
    LinkInputArea,
    CreateVideoButton
} from "../components"

export default function LinkToVideoPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const { can_create_video } = useUserLimits()
    const { checkCanCreateVideo, showLimitExceededToast } = useSubscriptionLimits()

    const [productUrl, setProductUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleUrlChange = (url: string) => {
        setProductUrl(url)
    }

    const handleCreateVideo = async () => {
        if (!productUrl.trim()) {
            toast.error("Please enter a product URL")
            return
        }

        // Basic URL validation
        const urlPattern = /^https?:\/\/.+/
        if (!urlPattern.test(productUrl)) {
            toast.error("Please enter a valid URL starting with http:// or https://")
            return
        }

        // Check limits
        const { canCreate } = await checkCanCreateVideo()
        if (!canCreate) {
            showLimitExceededToast()
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch('/api/link_to_videos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_url: productUrl,
                    type: 'product_avatar',
                    aspect_ratio: '9x16',
                    override_avatar: null,
                    webhook_url: null
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create video')
            }

            const result = await response.json()

            toast.success('🎬 Video creation started!', {
                description: `Your video will be ready in 2-3 minutes. We'll send you an email when it's done.`,
                duration: 5000
            })

            // Redirect to dashboard
            router.push('/dashboard')

        } catch (error) {
            console.error('Error creating video:', error)
            toast.error('Failed to create video', {
                description: error instanceof Error ? error.message : 'Unknown error'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <PageHeader
                title="AI Video Ads"
                subtitle="Generate videos from your product links"
            />

            <main className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto space-y-20">
                    {/* Link Input Area */}
                    <LinkInputArea
                        productUrl={productUrl}
                        onUrlChange={handleUrlChange}
                        placeholder="e.g. amazon product link, shopify product link, app store link, etc."
                    />

                    {/* Create Video Button */}
                    {productUrl.trim() && (
                        <div className="text-center">
                            <CreateVideoButton
                                onClick={handleCreateVideo}
                                isLoading={isLoading}
                                disabled={!can_create_video}
                                text="Analyze URL"
                                loadingText="Analyzing URL..."
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
} 