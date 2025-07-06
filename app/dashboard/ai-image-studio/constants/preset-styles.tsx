import { Camera, Lightbulb, Leaf, Zap } from "lucide-react"
import { PresetStyle } from "../types"

export const PRESET_STYLES: PresetStyle[] = [
    {
        id: 'clean-studio',
        name: 'Clean Studio',
        description: 'Perfect for e-commerce: white background, studio lighting, catalog-ready',
        icon: <Camera className="w-6 h-6" />,
        gradient: 'from-slate-600 to-slate-700',
        example: 'Amazon, Shopify, product catalogs'
    },
    {
        id: 'dramatic-lighting',
        name: 'Dramatic Lighting',
        description: 'Premium marketing: cinematic lighting, luxury product photography',
        icon: <Lightbulb className="w-6 h-6" />,
        gradient: 'from-amber-500 to-orange-600',
        example: 'Instagram ads, premium campaigns'
    },
    {
        id: 'lifestyle-context',
        name: 'Lifestyle Context',
        description: 'Social media ready: product in realistic usage scenarios',
        icon: <Leaf className="w-6 h-6" />,
        gradient: 'from-emerald-500 to-teal-600',
        example: 'Facebook ads, lifestyle content'
    },
    {
        id: 'transparent-bg',
        name: 'Transparent Background',
        description: 'Maximum versatility: clean cutout, perfect for overlays and designs',
        icon: <Zap className="w-6 h-6" />,
        gradient: 'from-violet-500 to-purple-600',
        example: 'Website headers, promotional graphics'
    }
] 