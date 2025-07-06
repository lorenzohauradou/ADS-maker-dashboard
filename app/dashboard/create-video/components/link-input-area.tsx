"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, ExternalLink } from "lucide-react"

interface LinkInputAreaProps {
    onUrlChange: (url: string) => void
    productUrl: string
    placeholder?: string
}

export function LinkInputArea({ onUrlChange, productUrl, placeholder = "e.g. amazon product link, shopify product link, app store link, etc." }: LinkInputAreaProps) {
    const [isValidUrl, setIsValidUrl] = useState(false)

    const handleUrlChange = (url: string) => {
        onUrlChange(url)
        // Simple URL validation
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        setIsValidUrl(urlPattern.test(url))
    }

    const supportedPlatforms = [
        { name: "Amazon", color: "bg-orange-500" },
        { name: "Shopify", color: "bg-green-500" },
        { name: "Etsy", color: "bg-orange-400" },
        { name: "eBay", color: "bg-blue-500" },
        { name: "AliExpress", color: "bg-red-500" },
        { name: "App Store", color: "bg-blue-400" },
        { name: "WooCommerce", color: "bg-purple-500" },
        { name: "Magento", color: "bg-orange-600" },
    ]

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12">
            {/* Main Title */}
            <div className="text-center space-y-6">
                <h1 className="text-5xl font-bold text-white leading-tight">
                    Share your <span className="text-blue-400">product link</span> to generate a video
                </h1>

                {/* Supported Platforms */}
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-gray-400 text-lg">Creatify supports:</p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        {supportedPlatforms.map((platform, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center shadow-lg`}>
                                    <span className="text-white text-sm font-bold">
                                        {platform.name.charAt(0)}
                                    </span>
                                </div>
                                {index < supportedPlatforms.length - 1 && (
                                    <span className="text-gray-500 mx-2">•</span>
                                )}
                            </div>
                        ))}
                        <span className="text-gray-400 text-xl ml-2">...</span>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
                <div className="flex-1">
                    <Input
                        type="url"
                        placeholder={placeholder}
                        value={productUrl}
                        onChange={(e) => handleUrlChange(e.target.value)}
                        className="h-16 text-lg bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 rounded-lg px-6"
                    />
                </div>
                <Button
                    size="lg"
                    className="h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg"
                    disabled={!isValidUrl || !productUrl.trim()}
                >
                    Analyze URL
                </Button>
            </div>

            {/* Try Some Links */}
            <div className="text-center">
                <Button
                    variant="ghost"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 text-lg px-6 py-3"
                >
                    Try some links?
                </Button>
            </div>

            {/* Upload Manually Option */}
            <div className="text-center">
                <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg"
                >
                    Upload manually
                </Button>
            </div>
        </div>
    )
} 