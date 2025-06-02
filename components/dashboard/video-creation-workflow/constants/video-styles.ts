import { ScriptStyle, VisualStyle } from "../types/video-configuration"

export const SCRIPT_STYLES: ScriptStyle[] = [
    { value: "BenefitsV2", label: "Benefits Focus", description: "Focus on the benefits of the product" },
    { value: "BrandStoryV2", label: "Brand Story", description: "Tell the story of the brand" },
    { value: "CallToActionV2", label: "Strong CTA", description: "Strong call-to-action" },
    { value: "EmotionalWriter", label: "Emotional", description: "Touch the emotions" },
    { value: "GenzWriter", label: "Gen Z Style", description: "Young and trendy language" },
    { value: "ProblemSolutionV2", label: "Problem-Solution", description: "Problem + Solution" },
    { value: "ProductHighlightsV2", label: "Product Features", description: "Highlight the features" },
    { value: "SpecialOffersV2", label: "Special Offers", description: "Special offers" }
]

export const VISUAL_STYLES: VisualStyle[] = [
    { value: "AvatarBubbleTemplate", label: "Avatar Bubble", description: "Presenter with bubble" },
    { value: "DynamicProductTemplate", label: "Product Focus", description: "Focus on the product" },
    { value: "FullScreenTemplate", label: "Full Screen", description: "Full screen" },
    { value: "VlogTemplate", label: "Vlog Style", description: "Vlog style" },
    { value: "DramaticTemplate", label: "Dramatic", description: "Dramatic" },
    { value: "MotionCardsTemplate", label: "Motion Cards", description: "Card animate" }
] 