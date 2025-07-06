"use client"

import { Button } from "@/components/ui/button"
import { Loader2, Play } from "lucide-react"

interface CreateVideoButtonProps {
    onClick: () => void
    isLoading: boolean
    disabled: boolean
    text?: string
    loadingText?: string
}

export function CreateVideoButton({
    onClick,
    isLoading,
    disabled,
    text = "Create Video",
    loadingText = "Creating Video..."
}: CreateVideoButtonProps) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled || isLoading}
            size="lg"
            className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl min-w-[250px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    {loadingText}
                </>
            ) : (
                <>
                    <Play className="w-6 h-6 mr-3" />
                    {text}
                </>
            )}
        </Button>
    )
} 