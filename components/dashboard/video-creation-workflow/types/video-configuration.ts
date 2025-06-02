export interface VideoConfiguration {
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
    caption_font_family: string
    caption_font_size: number
    caption_font_style: string
    caption_background_color: string | null
    caption_text_color: string | null
    caption_highlight_text_color: string | null
    caption_text_shadow: string | null
    caption_max_width: number
    caption_line_height: number
    caption_offset_x: number
    caption_offset_y: number

    // Override settings
    override_script: string

    // Premium Avatar & Voice Selection
    avatar_id: string | null
    voice_id: string | null
}

export interface VideoConfigurationModalProps {
    isOpen: boolean
    onClose: () => void
    onStartCreation: (config: VideoConfiguration) => void
    projectName: string
    imageCount: number
}

export interface Platform {
    value: string
    label: string
    aspect: string
    icon: string
}

export interface Language {
    value: string
    label: string
    flag: string
}

export interface ScriptStyle {
    value: string
    label: string
    description: string
}

export interface VisualStyle {
    value: string
    label: string
    description: string
} 