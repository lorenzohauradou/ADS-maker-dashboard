"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Crown, Zap, Globe, Sparkles } from "lucide-react"
import { VideoConfiguration } from "../types/video-configuration"

interface PremiumConfigTabProps {
    config: VideoConfiguration
    updateConfig: (key: keyof VideoConfiguration, value: any) => void
}

export function PremiumConfigTab({ config, updateConfig }: PremiumConfigTabProps) {
    return (
        <div className="space-y-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Custom Domain */}
                <Card className="p-4 border-2 border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                    <h3 className="font-semibold mb-4 flex items-center text-slate-900 dark:text-white">
                        <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                        Custom Domain
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="custom-domain"
                                checked={config.buy_custom_domain}
                                onCheckedChange={(checked) => updateConfig("buy_custom_domain", checked)}
                            />
                            <Label htmlFor="custom-domain">Purchase custom domain (+$12/year)</Label>
                        </div>
                        {config.buy_custom_domain && (
                            <Input
                                placeholder="yourbrand.com"
                                value={config.custom_domain_name}
                                onChange={(e) => updateConfig("custom_domain_name", e.target.value)}
                            />
                        )}
                    </div>
                </Card>
            </div>

            {/* Premium Features Info */}
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                <div className="text-center">
                    <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Premium Features</h3>
                    <p className="text-slate-600 dark:text-zinc-400 mb-4">
                        Unlock professional features for your video ads
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center justify-center">
                            <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                            Priority Processing
                        </div>
                        <div className="flex items-center justify-center">
                            <Globe className="w-4 h-4 mr-2 text-blue-500" />
                            Custom Domains
                        </div>
                        <div className="flex items-center justify-center">
                            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                            Advanced AI Models
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
} 