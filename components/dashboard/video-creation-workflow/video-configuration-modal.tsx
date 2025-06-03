"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    Settings,
    Palette,
    Smartphone,
    Crown,
    ArrowRight,
    ArrowLeft,
    Sparkles,
} from "lucide-react"
import Image from "next/image"

import { VideoConfigurationModalProps } from "./types/video-configuration"
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
            <DialogContent className="max-w-3xl w-[92vw] max-h-[95vh] overflow-y-auto bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 pt-8 pb-3 px-3 sm:p-6">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-lg sm:text-2xl font-bold flex items-center text-slate-900 dark:text-white">
                        <Image src="/adsmakerlogo.png" alt="ADS MAKER AI Logo" width={24} height={24} className="mr-2 sm:mr-4" />
                        <span className="truncate">Configure Your Video Ad</span>
                    </DialogTitle>
                    <p className="text-xs sm:text-base text-slate-600 dark:text-zinc-400">
                        Customize every aspect of your professional video advertisement
                    </p>
                </DialogHeader>

                <div className="space-y-4 sm:space-y-8">
                    {/* Project Info */}
                    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-3 sm:p-6 border-2 border-purple-200 dark:border-purple-800 rounded-lg sm:rounded-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white truncate">{projectName}</h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1">
                                    {imageCount} high-quality images • Ready for AI processing
                                </p>
                            </div>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full flex-shrink-0 self-start sm:self-center text-xs sm:text-sm">
                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                Ready to Create
                            </Badge>
                        </div>
                    </Card>

                    {/* Configuration Tabs */}
                    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                        {/* Mobile: Scrollable tabs, Desktop: Grid */}
                        <TabsList className="w-full bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg sm:rounded-xl h-auto sm:h-14 overflow-x-auto sm:overflow-x-visible">
                            <div className="flex sm:grid sm:grid-cols-4 gap-1 min-w-max sm:min-w-0 w-full">
                                <TabsTrigger
                                    value="basic"
                                    className="flex items-center gap-1 rounded-md sm:rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-md transition-all duration-200 px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap"
                                >
                                    <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="font-semibold text-xs sm:text-sm">Basic</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="style"
                                    className="flex items-center gap-1 rounded-md sm:rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-md transition-all duration-200 px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap"
                                >
                                    <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="font-semibold text-xs sm:text-sm">Style</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="advanced"
                                    className="flex items-center gap-1 rounded-md sm:rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-md transition-all duration-200 px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap"
                                >
                                    <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="font-semibold text-xs sm:text-sm">Advanced</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="premium"
                                    className="flex items-center gap-1 rounded-md sm:rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-md transition-all duration-200 px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap"
                                >
                                    <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="font-semibold text-xs sm:text-sm">Premium</span>
                                </TabsTrigger>
                            </div>
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
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-4 sm:pt-8 border-t-2 border-slate-200 dark:border-zinc-700">
                        <Button
                            onClick={handleStartCreation}
                            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-6 sm:px-10 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 order-1 sm:order-3"
                        >
                            <span className="sm:hidden">Create Magic</span>
                            <span className="hidden sm:inline">Start Creating Magic</span>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </Button>

                        <div className="text-center order-2 sm:order-2">
                            <p className="text-xs text-slate-500 dark:text-zinc-500">
                                🚀 Estimated: 3-5 minutes
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="w-full sm:w-auto px-4 sm:px-8 py-2.5 sm:py-3 border-2 border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg sm:rounded-xl font-semibold order-3 sm:order-1 text-sm sm:text-base"
                        >
                            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Back to Upload
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 