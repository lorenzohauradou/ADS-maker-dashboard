import { ReactNode } from "react"

export interface GeneratedImage {
    url: string
    filename: string
    size: string
    quality: string
    format: string
    revised_prompt?: string
}

export interface ImageResult {
    success: boolean
    images: GeneratedImage[]
    total_generated: number
    original_prompt: string
    error?: string
}

export type WorkflowStep = 'initial' | 'controls' | 'generating' | 'result'

export interface PresetStyle {
    id: string
    name: string
    description: string
    icon: ReactNode
    gradient: string
    example?: string
}

export interface FileUploadProps {
    onImageUpload: (file: File) => void
    isUploading: boolean
}

export interface PresetSelectorProps {
    onStyleSelect: (style: PresetStyle) => void
    selectedStyle: PresetStyle | null
    isGenerating: boolean
}

export interface CustomPromptInputProps {
    value: string
    onChange: (value: string) => void
    disabled: boolean
}

export interface GeneratingStateProps {
    progress: number
    style: PresetStyle
}

export interface BeforeAfterSliderProps {
    originalImage: string
    enhancedImage: GeneratedImage
} 