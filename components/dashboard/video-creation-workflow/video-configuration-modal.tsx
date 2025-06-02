"use client"

import { useState } from "react"
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
    Zap
} from "lucide-react"
import Image from "next/image"

interface VideoConfigurationModalProps {
    isOpen: boolean
    onClose: () => void
    onStartCreation: (config: VideoConfiguration) => void
    projectName: string
    imageCount: number
}

interface VideoConfiguration {
    // Basic settings
    target_platform: string
    target_audience: string
    language: string
    video_length: number
    aspect_ratio: string

    // Style settings
    script_style: string
    visual_style: string

    // Advanced settings
    buy_custom_domain: boolean
    custom_domain_name: string
    publish_to_socials: boolean
    landing_style: string
    color_scheme: string
    cta_text: string

    // Audio settings
    background_music_volume: number
    voiceover_volume: number
    no_background_music: boolean

    // Creative controls
    no_caption: boolean
    no_emotion: boolean
    no_cta: boolean
    caption_style: string

    // Override settings
    override_script: string
}

const SCRIPT_STYLES = [
    { value: "BenefitsV2", label: "Benefits Focus", description: "Evidenzia i benefici del prodotto" },
    { value: "BrandStoryV2", label: "Brand Story", description: "Racconta la storia del brand" },
    { value: "CallToActionV2", label: "Strong CTA", description: "Call-to-action potente" },
    { value: "EmotionalWriter", label: "Emotional", description: "Tocca le emozioni" },
    { value: "GenzWriter", label: "Gen Z Style", description: "Linguaggio giovane e trendy" },
    { value: "ProblemSolutionV2", label: "Problem-Solution", description: "Problema + Soluzione" },
    { value: "ProductHighlightsV2", label: "Product Features", description: "Evidenzia caratteristiche" },
    { value: "SpecialOffersV2", label: "Special Offers", description: "Offerte speciali" }
]

const VISUAL_STYLES = [
    { value: "AvatarBubbleTemplate", label: "Avatar Bubble", description: "Presentatore con bolla" },
    { value: "DynamicProductTemplate", label: "Product Focus", description: "Focus sul prodotto" },
    { value: "FullScreenTemplate", label: "Full Screen", description: "Schermo intero" },
    { value: "VlogTemplate", label: "Vlog Style", description: "Stile vlog personale" },
    { value: "DramaticTemplate", label: "Dramatic", description: "Cinematico drammatico" },
    { value: "MotionCardsTemplate", label: "Motion Cards", description: "Card animate" }
]

const PLATFORMS = [
    { value: "instagram", label: "Instagram", aspect: "9x16", icon: "📱" },
    { value: "tiktok", label: "TikTok", aspect: "9x16", icon: "🎵" },
    { value: "facebook", label: "Facebook", aspect: "1x1", icon: "👥" },
    { value: "youtube", label: "YouTube", aspect: "16x9", icon: "📺" }
]

const LANGUAGES = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "it", label: "Italiano", flag: "🇮🇹" },
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "de", label: "Deutsch", flag: "🇩🇪" },
    { value: "pt", label: "Português", flag: "🇵🇹" },
    { value: "ja", label: "日本語", flag: "🇯🇵" },
    { value: "ko", label: "한국어", flag: "🇰🇷" }
]

export function VideoConfigurationModal({ isOpen, onClose, onStartCreation, projectName, imageCount }: VideoConfigurationModalProps) {
    const [config, setConfig] = useState<VideoConfiguration>({
        target_platform: "instagram",
        target_audience: "giovani adulti",
        language: "en",
        video_length: 30,
        aspect_ratio: "9x16",
        script_style: "BenefitsV2",
        visual_style: "AvatarBubbleTemplate",
        buy_custom_domain: false,
        custom_domain_name: "",
        publish_to_socials: false,
        landing_style: "modern",
        color_scheme: "auto",
        cta_text: "",
        background_music_volume: 50,
        voiceover_volume: 80,
        no_background_music: false,
        no_caption: false,
        no_emotion: false,
        no_cta: false,
        caption_style: "normal-black",
        override_script: ""
    })

    const [currentTab, setCurrentTab] = useState("basic")

    const updateConfig = (key: keyof VideoConfiguration, value: any) => {
        setConfig(prev => ({ ...prev, [key]: value }))
    }

    const handlePlatformChange = (platform: string) => {
        const platformInfo = PLATFORMS.find(p => p.value === platform)
        updateConfig("target_platform", platform)
        updateConfig("aspect_ratio", platformInfo?.aspect || "9x16")
    }

    const handleStartCreation = () => {
        onStartCreation(config)
    }

    const handleClose = () => {
        setConfig({
            target_platform: "instagram",
            target_audience: "giovani adulti",
            language: "en",
            video_length: 30,
            aspect_ratio: "9x16",
            script_style: "BenefitsV2",
            visual_style: "AvatarBubbleTemplate",
            buy_custom_domain: false,
            custom_domain_name: "",
            publish_to_socials: false,
            landing_style: "modern",
            color_scheme: "auto",
            cta_text: "",
            background_music_volume: 50,
            voiceover_volume: 80,
            no_background_music: false,
            no_caption: false,
            no_emotion: false,
            no_cta: false,
            caption_style: "normal-black",
            override_script: ""
        })
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
                </DialogHeader>

                <div className="space-y-6">
                    {/* Project Info */}
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">{projectName}</h3>
                                <p className="text-sm text-slate-600 dark:text-zinc-400">{imageCount} images ready for processing</p>
                            </div>
                            <Badge className="bg-green-500 text-white">
                                <Sparkles className="w-4 h-4 mr-1" />
                                Ready to Create
                            </Badge>
                        </div>
                    </Card>

                    {/* Configuration Tabs */}
                    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="basic" className="flex items-center gap-2">
                                <Smartphone className="w-4 h-4" />
                                Basic
                            </TabsTrigger>
                            <TabsTrigger value="style" className="flex items-center gap-2">
                                <Palette className="w-4 h-4" />
                                Style
                            </TabsTrigger>
                            <TabsTrigger value="advanced" className="flex items-center gap-2">
                                <Settings className="w-4 h-4" />
                                Advanced
                            </TabsTrigger>
                            <TabsTrigger value="premium" className="flex items-center gap-2">
                                <Crown className="w-4 h-4" />
                                Premium
                            </TabsTrigger>
                        </TabsList>

                        {/* Basic Settings */}
                        <TabsContent value="basic" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Platform Selection */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold text-slate-900 dark:text-white">Target Platform</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {PLATFORMS.map((platform) => (
                                            <Card
                                                key={platform.value}
                                                className={`p-4 cursor-pointer transition-all border-2 ${config.target_platform === platform.value
                                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                                    : "border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600"
                                                    }`}
                                                onClick={() => handlePlatformChange(platform.value)}
                                            >
                                                <div className="text-center">
                                                    <div className="text-2xl mb-2">{platform.icon}</div>
                                                    <div className="font-medium">{platform.label}</div>
                                                    <div className="text-xs text-slate-500">{platform.aspect}</div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                {/* Language Selection */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold text-slate-900 dark:text-white">Language</Label>
                                    <Select value={config.language} onValueChange={(value) => updateConfig("language", value)}>
                                        <SelectTrigger className="text-lg p-3">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {LANGUAGES.map((lang) => (
                                                <SelectItem key={lang.value} value={lang.value}>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg">{lang.flag}</span>
                                                        {lang.label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Video Length */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold text-slate-900 dark:text-white">Video Length</Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[15, 30, 60].map((length) => (
                                            <Card
                                                key={length}
                                                className={`p-3 cursor-pointer text-center transition-all border-2 ${config.video_length === length
                                                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                                    : "border-slate-200 dark:border-zinc-700 hover:border-slate-300"
                                                    }`}
                                                onClick={() => updateConfig("video_length", length)}
                                            >
                                                <div className="font-bold text-lg">{length}s</div>
                                                <div className="text-xs text-slate-500">
                                                    {length === 15 ? "Quick" : length === 30 ? "Standard" : "Detailed"}
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                {/* Target Audience */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold text-slate-900 dark:text-white">Target Audience</Label>
                                    <Select value={config.target_audience} onValueChange={(value) => updateConfig("target_audience", value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="giovani adulti">Young Adults (18-35)</SelectItem>
                                            <SelectItem value="famiglie">Families</SelectItem>
                                            <SelectItem value="professionisti">Professionals</SelectItem>
                                            <SelectItem value="anziani">Seniors (55+)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Style Settings */}
                        <TabsContent value="style" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Script Style */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold text-slate-900 dark:text-white">Script Style</Label>
                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {SCRIPT_STYLES.map((style) => (
                                            <Card
                                                key={style.value}
                                                className={`p-3 cursor-pointer transition-all border-2 ${config.script_style === style.value
                                                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                                    : "border-slate-200 dark:border-zinc-700 hover:border-slate-300"
                                                    }`}
                                                onClick={() => updateConfig("script_style", style.value)}
                                            >
                                                <div className="font-medium">{style.label}</div>
                                                <div className="text-sm text-slate-500">{style.description}</div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                {/* Visual Style */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold text-slate-900 dark:text-white">Visual Style</Label>
                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {VISUAL_STYLES.map((style) => (
                                            <Card
                                                key={style.value}
                                                className={`p-3 cursor-pointer transition-all border-2 ${config.visual_style === style.value
                                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                                    : "border-slate-200 dark:border-zinc-700 hover:border-slate-300"
                                                    }`}
                                                onClick={() => updateConfig("visual_style", style.value)}
                                            >
                                                <div className="font-medium">{style.label}</div>
                                                <div className="text-sm text-slate-500">{style.description}</div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Custom Script Override */}
                            <div className="space-y-3">
                                <Label className="text-lg font-semibold text-slate-900 dark:text-white">Custom Script (Optional)</Label>
                                <Textarea
                                    placeholder="Write your custom script here to override AI generation..."
                                    value={config.override_script}
                                    onChange={(e) => updateConfig("override_script", e.target.value)}
                                    className="min-h-[100px]"
                                />
                            </div>
                        </TabsContent>

                        {/* Advanced Settings */}
                        <TabsContent value="advanced" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Audio Controls */}
                                <Card className="p-4">
                                    <h3 className="font-semibold mb-4 flex items-center text-slate-900 dark:text-white">
                                        <Volume2 className="w-5 h-5 mr-2" />
                                        Audio Settings
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Background Music Volume: {config.background_music_volume}%</Label>
                                            <Slider
                                                value={[config.background_music_volume]}
                                                onValueChange={(value) => updateConfig("background_music_volume", value[0])}
                                                max={100}
                                                step={5}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Voiceover Volume: {config.voiceover_volume}%</Label>
                                            <Slider
                                                value={[config.voiceover_volume]}
                                                onValueChange={(value) => updateConfig("voiceover_volume", value[0])}
                                                max={100}
                                                step={5}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="no-music"
                                                checked={config.no_background_music}
                                                onCheckedChange={(checked) => updateConfig("no_background_music", checked)}
                                            />
                                            <Label htmlFor="no-music">No background music</Label>
                                        </div>
                                    </div>
                                </Card>

                                {/* Creative Controls */}
                                <Card className="p-4">
                                    <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Creative Controls</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="no-caption"
                                                checked={config.no_caption}
                                                onCheckedChange={(checked) => updateConfig("no_caption", checked)}
                                            />
                                            <Label htmlFor="no-caption">No captions/subtitles</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="no-emotion"
                                                checked={config.no_emotion}
                                                onCheckedChange={(checked) => updateConfig("no_emotion", checked)}
                                            />
                                            <Label htmlFor="no-emotion">No avatar emotions</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="no-cta"
                                                checked={config.no_cta}
                                                onCheckedChange={(checked) => updateConfig("no_cta", checked)}
                                            />
                                            <Label htmlFor="no-cta">No call-to-action</Label>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Caption Style</Label>
                                            <Select value={config.caption_style} onValueChange={(value) => updateConfig("caption_style", value)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="normal-black">Normal Black</SelectItem>
                                                    <SelectItem value="normal-white">Normal White</SelectItem>
                                                    <SelectItem value="glow">Glow Effect</SelectItem>
                                                    <SelectItem value="neo">Futuristic</SelectItem>
                                                    <SelectItem value="brick">Bold Brick</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Landing Page Settings */}
                            <Card className="p-4">
                                <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Landing Page Customization</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Landing Style</Label>
                                        <Select value={config.landing_style} onValueChange={(value) => updateConfig("landing_style", value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="modern">Modern</SelectItem>
                                                <SelectItem value="minimal">Minimal</SelectItem>
                                                <SelectItem value="bold">Bold</SelectItem>
                                                <SelectItem value="elegant">Elegant</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Color Scheme</Label>
                                        <Select value={config.color_scheme} onValueChange={(value) => updateConfig("color_scheme", value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="auto">Auto (AI Choice)</SelectItem>
                                                <SelectItem value="blue">Blue</SelectItem>
                                                <SelectItem value="green">Green</SelectItem>
                                                <SelectItem value="red">Red</SelectItem>
                                                <SelectItem value="purple">Purple</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Custom CTA Text</Label>
                                        <Input
                                            placeholder="e.g. Buy Now, Learn More"
                                            value={config.cta_text}
                                            onChange={(e) => updateConfig("cta_text", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Premium Settings */}
                        <TabsContent value="premium" className="space-y-6">
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

                                {/* Social Publishing */}
                                <Card className="p-4 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                                    <h3 className="font-semibold mb-4 flex items-center text-slate-900 dark:text-white">
                                        <Globe className="w-5 h-5 mr-2 text-blue-600" />
                                        Auto-Publish to Socials
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="auto-publish"
                                                checked={config.publish_to_socials}
                                                onCheckedChange={(checked) => updateConfig("publish_to_socials", checked)}
                                            />
                                            <Label htmlFor="auto-publish">Auto-publish when ready</Label>
                                        </div>
                                        {config.publish_to_socials && (
                                            <p className="text-sm text-slate-600 dark:text-zinc-400">
                                                You'll need to connect your social accounts after creation
                                            </p>
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
                        </TabsContent>
                    </Tabs>

                    {/* Navigation */}
                    <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-zinc-700">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="px-6 border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Upload
                        </Button>

                        <Button
                            onClick={handleStartCreation}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                        >
                            Start Creating Video
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 