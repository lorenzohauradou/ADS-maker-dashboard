'use client'

import { useState } from 'react'
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Video, Upload, Info } from 'lucide-react'
import { ActiveTab } from './types'
import { FeatureOverviewCards } from './components/feature-overview-cards'
import { AvatarCreatorTab } from './components/avatar-creator-tab'
import { MultiSceneTab } from './components/multi-scene-tab'
import { UploadAvatarTab } from './components/upload-avatar-tab'

export default function CustomAvatarsPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('avatar-creator')

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
            <DashboardHeader />

            <main className="flex-1 p-6">
                {/* Hero Section */}
                <div className="space-y-6 mb-8">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                            Custom Avatars
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            Create custom avatars and advanced videos with cutting-edge AI technology
                        </p>
                    </div>

                    {/* Features Overview */}
                    <FeatureOverviewCards
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ActiveTab)} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                            <TabsTrigger value="avatar-creator" className="text-slate-600 dark:text-zinc-400 data-[state=active]:text-blue-600">
                                <User className="w-4 h-4 mr-2" />
                                Avatar
                            </TabsTrigger>
                            <TabsTrigger value="multi-scene" className="text-slate-600 dark:text-zinc-400 data-[state=active]:text-purple-600">
                                <Video className="w-4 h-4 mr-2" />
                                Multi-Scene
                            </TabsTrigger>
                            <TabsTrigger value="upload-avatar" className="text-slate-600 dark:text-zinc-400 data-[state=active]:text-green-600">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload
                            </TabsTrigger>
                        </TabsList>

                        {/* 🎭 AVATAR CREATOR TAB */}
                        <TabsContent value="avatar-creator" className="space-y-6">
                            <AvatarCreatorTab />
                        </TabsContent>

                        {/* 🤖 MULTI-SCENE TAB */}
                        <TabsContent value="multi-scene" className="space-y-6">
                            <MultiSceneTab />
                        </TabsContent>

                        {/* 🎬 UPLOAD AVATAR TAB */}
                        <TabsContent value="upload-avatar" className="space-y-6">
                            <UploadAvatarTab />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Tips Section */}
                <Card className="max-w-4xl mx-auto mt-8 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-800">
                                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                                    Pro Tips for Better Results
                                </h3>
                                <ul className="text-sm text-slate-600 dark:text-zinc-400 space-y-1">
                                    <li>• Be specific and detailed in your avatar descriptions</li>
                                    <li>• Use professional language for business avatars</li>
                                    <li>• Consider your target audience when choosing age and style</li>
                                    <li>• Multi-scene videos work best with 3-5 scenes maximum</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
} 