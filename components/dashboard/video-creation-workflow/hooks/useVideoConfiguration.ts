import { useState } from "react"
import { VideoConfiguration } from "../types/video-configuration"
import { PLATFORMS } from "../constants/video-platforms"

const DEFAULT_CONFIG: VideoConfiguration = {
    target_platform: "instagram",
    target_audience: "giovani adulti",
    language: "en",
    video_length: 15,
    aspect_ratio: "9x16",
    script_style: "BenefitsV2",
    visual_style: "AvatarBubbleTemplate",
    buy_custom_domain: false,
    custom_domain_name: "",
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
    caption_font_family: "Montserrat",
    caption_font_size: 24,
    caption_font_style: "font-bold",
    caption_background_color: null,
    caption_text_color: null,
    caption_highlight_text_color: null,
    caption_text_shadow: null,
    caption_max_width: 300,
    caption_line_height: 1.2,
    caption_offset_x: 0.0,
    caption_offset_y: 0.4,
    override_script: "",
    avatar_id: null,
    voice_id: null
}

export function useVideoConfiguration() {
    const [config, setConfig] = useState<VideoConfiguration>(DEFAULT_CONFIG)
    const [currentTab, setCurrentTab] = useState("basic")

    const updateConfig = (key: keyof VideoConfiguration, value: any) => {
        setConfig(prev => ({ ...prev, [key]: value }))
    }

    const handlePlatformChange = (platform: string) => {
        const platformInfo = PLATFORMS.find(p => p.value === platform)
        updateConfig("target_platform", platform)
        updateConfig("aspect_ratio", platformInfo?.aspect || "9x16")
    }

    const resetConfig = () => {
        setConfig(DEFAULT_CONFIG)
        setCurrentTab("basic")
    }

    return {
        config,
        currentTab,
        setCurrentTab,
        updateConfig,
        handlePlatformChange,
        resetConfig
    }
} 