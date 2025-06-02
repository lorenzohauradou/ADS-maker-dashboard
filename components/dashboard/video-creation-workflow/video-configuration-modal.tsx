"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
    Play,
    Settings,
    Globe,
    Palette,
    Volume2,
    Smartphone,
    Crown,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Zap,
    CheckCircle
} from "lucide-react"
import Image from "next/image"

// Import modular components
import { VideoConfiguration, VideoConfigurationModalProps } from "./types/video-configuration"
import { PLATFORMS } from "./constants/video-platforms"
import { LANGUAGES } from "./constants/video-languages"
import { SCRIPT_STYLES, VISUAL_STYLES } from "./constants/video-styles"
import { useVideoConfiguration } from "./hooks/useVideoConfiguration"
import { BasicConfigTab } from "./tabs/BasicConfigTab"
import { StyleConfigTab } from "./tabs/StyleConfigTab"
import { AdvancedConfigTab } from "./tabs/AdvancedConfigTab"
import { PremiumConfigTab } from "./tabs/PremiumConfigTab"

export function VideoConfigurationModal({ isOpen, onClose, onStartCreation, projectName, imageCount }: VideoConfigurationModalProps) {
    const {
        config,
        currentTab,
        setCurrentTab,
        updateConfig,
        handlePlatformChange,
        resetConfig
    } = useVideoConfiguration()

    const handleStartCreation = () => {
        onStartCreation(config)
    }

    const handleClose = () => {
        resetConfig()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center text-slate-900 dark:text-white">
                        <Image src="/adsmakerlogo.png" alt="ADS MAKER AI Logo" width={34} height={34} className="mr-4" />
                        Configure Your Video Ad
                    </DialogTitle>
                    <p className="text-slate-600 dark:text-zinc-400 mt-2">
                        Customize every aspect of your professional video advertisement
                    </p>
                </DialogHeader>

                <div className="space-y-8">
                    {/* Project Info */}
                    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 border-2 border-purple-200 dark:border-purple-800 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{projectName}</h3>
                                <p className="text-slate-600 dark:text-zinc-400 mt-1">
                                    {imageCount} high-quality images • Ready for AI processing
                                </p>
                            </div>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Ready to Create
                            </Badge>
                        </div>
                    </Card>

                    {/* Configuration Tabs */}
                    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl h-14">
                            <TabsTrigger
                                value="basic"
                                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-md transition-all duration-200"
                            >
                                <Smartphone className="w-5 h-5" />
                                <span className="font-semibold">Basic</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="style"
                                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-md transition-all duration-200"
                            >
                                <Palette className="w-5 h-5" />
                                <span className="font-semibold">Style</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="advanced"
                                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-md transition-all duration-200"
                            >
                                <Settings className="w-5 h-5" />
                                <span className="font-semibold">Advanced</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="premium"
                                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-md transition-all duration-200"
                            >
                                <Crown className="w-5 h-5" />
                                <span className="font-semibold">Premium</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Basic Settings */}
                        <TabsContent value="basic">
                            <BasicConfigTab
                                config={config}
                                updateConfig={updateConfig}
                                handlePlatformChange={handlePlatformChange}
                            />
                        </TabsContent>

                        {/* Style Settings */}
                        <TabsContent value="style">
                            <StyleConfigTab
                                config={config}
                                updateConfig={updateConfig}
                            />
                        </TabsContent>

                        {/* Advanced Settings */}
                        <TabsContent value="advanced">
                            <AdvancedConfigTab
                                config={config}
                                updateConfig={updateConfig}
                            />
                        </TabsContent>

                        {/* Premium Settings */}
                        <TabsContent value="premium">
                            <PremiumConfigTab
                                config={config}
                                updateConfig={updateConfig}
                            />
                        </TabsContent>
                    </Tabs>

                    {/* Navigation */}
                    <div className="flex justify-between items-center pt-8 border-t-2 border-slate-200 dark:border-zinc-700">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="px-8 py-3 border-2 border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-xl font-semibold"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Upload
                        </Button>

                        <div className="text-center">
                            <p className="text-sm text-slate-500 dark:text-zinc-500 mb-2">
                                🚀 Estimated creation time: 3-5 minutes
                            </p>
                        </div>

                        <Button
                            onClick={handleStartCreation}
                            className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-10 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Start Creating Magic
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 