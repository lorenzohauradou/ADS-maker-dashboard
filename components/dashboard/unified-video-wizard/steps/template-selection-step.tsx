"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, PlayCircle, Sparkles, Target, ArrowRight, MessageSquare, X, ChevronLeft } from "lucide-react"
import { toast } from "sonner"

interface Template {
    id: string
    name: string
    description: string
    preview_url?: string
    thumbnail_url?: string
    category: string
    business_goals?: string[]
}

interface TemplateSelectionStepProps {
    selectedTemplate: string | null
    templateCategory: string | null
    useCustomTemplate: boolean
    onTemplateSelect: (template: string | null, category: string | null, useCustom: boolean) => void
}

const BUSINESS_GOALS = [
    {
        id: "sales",
        title: "Sell a Product",
        icon: "💰",
        description: "Increase sales of a specific product",
        color: "green",
        keywords: ["sales", "product", "ecommerce", "conversions", "showcase"]
    },
    {
        id: "awareness",
        title: "Brand Awareness",
        icon: "🌟",
        description: "Make my brand known and increase visibility",
        color: "purple",
        keywords: ["brand", "awareness", "visibility", "story"]
    },
    {
        id: "traffic",
        title: "Generate Traffic",
        icon: "🚀",
        description: "Drive more visitors to my website",
        color: "blue",
        keywords: ["traffic", "visits", "website", "click", "action"]
    },
    {
        id: "leads",
        title: "Collect Leads",
        icon: "📧",
        description: "Get emails and information from potential customers",
        color: "orange",
        keywords: ["lead", "contacts", "email", "information", "magnet"]
    },
    {
        id: "education",
        title: "Educate Audience",
        icon: "🎓",
        description: "Explain how my product/service works",
        color: "indigo",
        keywords: ["education", "explain", "tutorial", "information", "explainer"]
    },
    {
        id: "trust",
        title: "Build Trust",
        icon: "🤝",
        description: "Show testimonials and build credibility",
        color: "emerald",
        keywords: ["trust", "testimonial", "case", "credibility", "authentic"]
    }
]

export function TemplateSelectionStep({
    selectedTemplate,
    templateCategory,
    useCustomTemplate,
    onTemplateSelect
}: TemplateSelectionStepProps) {
    const [currentSubStep, setCurrentSubStep] = useState<'choice' | 'goal' | 'template'>('choice')
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
    const [templates, setTemplates] = useState<Template[]>([])
    const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
    const [loading, setLoading] = useState(false)

    // Load templates from Creatify API (when user chooses custom templates)
    useEffect(() => {
        if (currentSubStep === 'goal') {
            loadTemplates()
        }
    }, [currentSubStep])

    // Filter templates based on selected business goal
    useEffect(() => {
        if (selectedGoal && templates.length > 0) {
            const goal = BUSINESS_GOALS.find(g => g.id === selectedGoal)
            if (goal) {
                const filtered = templates.filter(template =>
                    goal.keywords.some(keyword =>
                        template.name.toLowerCase().includes(keyword) ||
                        template.description.toLowerCase().includes(keyword) ||
                        template.category.toLowerCase().includes(keyword)
                    )
                )

                // If no filtered templates, show all with priority 
                if (filtered.length === 0) {
                    setFilteredTemplates(templates.slice(0, 4)) // First 4 options
                } else {
                    setFilteredTemplates(filtered.slice(0, 6)) // First 6 filtered results
                }
            }
        }
    }, [selectedGoal, templates])

    async function loadTemplates() {
        setLoading(true)
        try {
            // 🚧 TEMPORARY: Comment Creatify API call until custom templates are available
            /*
            const response = await fetch('/api/creatify/templates')

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`)
            }

            const result = await response.json()

            if (result.success && result.templates) {
                const mappedTemplates = result.templates.map((template: any) => ({
                    id: template.id,
                    name: template.name || `Template ${template.id}`,
                    description: template.description || 'Custom template from Creatify',
                    category: template.category || 'custom',
                    thumbnail_url: template.thumbnail_url || template.preview_url,
                    variables: template.variables || []
                }))
                setTemplates(mappedTemplates)
            } else {
            */

            // 📌 FALLBACK TEMPLATES OPTIMIZED FOR BUSINESS GOALS
            console.log('🎯 Loading fallback templates optimized for business goals')

            // Simulate a small delay for realism
            await new Promise(resolve => setTimeout(resolve, 500))

            setTemplates([
                // Sales Templates
                {
                    id: "product_showcase_template",
                    name: "Product Showcase Pro",
                    description: "Complete focus on product with engaging animations to maximize sales",
                    category: "sales",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "sales_funnel_template",
                    name: "Sales Funnel Master",
                    description: "Guide users through an optimized sales journey",
                    category: "sales",
                    thumbnail_url: "/placeholder.jpg"
                },

                // Brand Awareness Templates  
                {
                    id: "brand_story_template",
                    name: "Elegant Brand Story",
                    description: "Tell your brand story in an engaging and memorable way",
                    category: "awareness",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "brand_values_template",
                    name: "Brand Values",
                    description: "Present your company's values and mission",
                    category: "awareness",
                    thumbnail_url: "/placeholder.jpg"
                },

                // Traffic Templates
                {
                    id: "call_to_action_template",
                    name: "Powerful Call to Action",
                    description: "Drive users to visit your website with effective messages",
                    category: "traffic",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "curiosity_driven_template",
                    name: "Curiosity Driver",
                    description: "Create irresistible curiosity that drives traffic",
                    category: "traffic",
                    thumbnail_url: "/placeholder.jpg"
                },

                // Lead Generation Templates
                {
                    id: "lead_magnet_template",
                    name: "Irresistible Lead Magnet",
                    description: "Collect contacts with offers customers can't refuse",
                    category: "leads",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "free_consultation_template",
                    name: "Free Consultation",
                    description: "Offer free consultations to collect qualified leads",
                    category: "leads",
                    thumbnail_url: "/placeholder.jpg"
                },

                // Education Templates
                {
                    id: "explainer_template",
                    name: "Explainer Video Pro",
                    description: "Explain complex products in simple and clear ways",
                    category: "education",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "tutorial_template",
                    name: "Interactive Tutorial",
                    description: "Show step-by-step how to use your product",
                    category: "education",
                    thumbnail_url: "/placeholder.jpg"
                },

                // Trust Building Templates
                {
                    id: "testimonial_template",
                    name: "Authentic Testimonial",
                    description: "Show real customer satisfaction",
                    category: "trust",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "case_study_template",
                    name: "Winning Case Study",
                    description: "Present concrete results achieved by customers",
                    category: "trust",
                    thumbnail_url: "/placeholder.jpg"
                }
            ])

            // }

        } catch (error) {
            console.error('Error loading templates:', error)
            toast.error('Error loading templates - using default templates')

            // Minimal emergency fallback
            setTemplates([
                {
                    id: "universal_template",
                    name: "Universal Template",
                    description: "Suitable for any business goal",
                    category: "universal",
                    thumbnail_url: "/placeholder.jpg"
                }
            ])
        } finally {
            setLoading(false)
        }
    }

    const handleChoiceSelect = (useCustom: boolean) => {
        if (useCustom) {
            setCurrentSubStep('goal')
        } else {
            // Skip custom template selection
            onTemplateSelect(null, null, false)
            toast.success('Using default template styles for optimal results!')
        }
    }

    const handleGoalSelect = (goalId: string) => {
        setSelectedGoal(goalId)
        setCurrentSubStep('template')
    }

    const handleTemplateSelect = (template: Template) => {
        onTemplateSelect(template.id, template.category, true)
        toast.success(`Template "${template.name}" selected for your goal!`)
    }

    const handleBackToGoals = () => {
        setCurrentSubStep('goal')
        setSelectedGoal(null)
    }

    const handleBackToChoice = () => {
        setCurrentSubStep('choice')
        setSelectedGoal(null)
    }

    const selectedGoalData = BUSINESS_GOALS.find(g => g.id === selectedGoal)

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <Sparkles className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
                    <p className="text-gray-600">Loading optimized templates...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* 🤔 STEP 1: Choice - Custom Template or Default */}
            {currentSubStep === 'choice' && (
                <>
                    {/* Conversational Header */}
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Want to use a custom template?
                        </h2>
                        <p className="text-gray-600 dark:text-zinc-400 max-w-lg mx-auto">
                            Choose whether to use a custom template tailored to your specific goal,
                            or stick with our proven default templates.
                        </p>
                    </div>

                    {/* Choice Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Default Templates Option */}
                        <Card
                            className="p-6 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] border-slate-200 dark:border-zinc-700 hover:border-green-300 bg-white dark:bg-zinc-800"
                            onClick={() => handleChoiceSelect(false)}
                        >
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                    <Check className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Use Default Templates
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                                    Quick and proven. Our AI will automatically select the best template style
                                    based on your content and platform.
                                </p>
                                <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                                    ⚡ Recommended for speed
                                </div>
                            </div>
                        </Card>

                        {/* Custom Templates Option */}
                        <Card
                            className="p-6 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] border-slate-200 dark:border-zinc-700 hover:border-purple-300 bg-white dark:bg-zinc-800"
                            onClick={() => handleChoiceSelect(true)}
                        >
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Choose Custom Template
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                                    More control. Select a template specifically designed for your business goal
                                    and customize the video style.
                                </p>
                                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                                    🎨 More customization options
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Info Card */}
                    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                            <Target className="w-6 h-6 text-blue-600 mt-1" />
                            <div>
                                <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                                    💡 Not sure which to choose?
                                </h4>
                                <p className="text-blue-800 dark:text-blue-200 text-sm">
                                    Default templates work great for most cases and are faster.
                                    Choose custom templates if you have specific branding or style requirements.
                                </p>
                            </div>
                        </div>
                    </Card>
                </>
            )}

            {/* 🎯 STEP 2: Business Goal Selection */}
            {currentSubStep === 'goal' && (
                <>
                    {/* Conversational Header */}
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            What's your main goal?
                        </h2>
                        <p className="text-gray-600 dark:text-zinc-400 max-w-lg mx-auto">
                            Choose what you want to achieve with this video.
                            I'll suggest the perfect template for your goal.
                        </p>

                        {/* Back Button */}
                        <Button
                            variant="outline"
                            onClick={handleBackToChoice}
                            className="mt-4"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Change template choice
                        </Button>
                    </div>

                    {/* Goal Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {BUSINESS_GOALS.map((goal) => (
                            <Card
                                key={goal.id}
                                className={`p-6 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] ${selectedGoal === goal.id
                                    ? `border-${goal.color}-500 bg-gradient-to-br from-${goal.color}-50 to-${goal.color}-100 dark:from-${goal.color}-900/30 dark:to-${goal.color}-800/30 shadow-lg`
                                    : 'border-slate-200 dark:border-zinc-700 hover:border-purple-300 bg-white dark:bg-zinc-800'
                                    }`}
                                onClick={() => handleGoalSelect(goal.id)}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="text-3xl">{goal.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                            {goal.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                                            {goal.description}
                                        </p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Help Text */}
                    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                            <Target className="w-6 h-6 text-amber-600 mt-1" />
                            <div>
                                <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">
                                    💡 Need help deciding?
                                </h4>
                                <p className="text-amber-800 dark:text-amber-200 text-sm">
                                    Choose the goal that best describes what you want to achieve with this video.
                                    We can always optimize it in the next steps!
                                </p>
                            </div>
                        </div>
                    </Card>
                </>
            )}

            {/* 🎨 STEP 3: Template Selection (Filtered) */}
            {currentSubStep === 'template' && selectedGoalData && (
                <>
                    {/* Conversational Header */}
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="text-2xl">{selectedGoalData.icon}</div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Templates for {selectedGoalData.title}
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-zinc-400 max-w-lg mx-auto">
                            I've selected the best templates for <strong>{selectedGoalData.title.toLowerCase()}</strong>.
                            Choose the one you like most!
                        </p>

                        {/* Back Button */}
                        <Button
                            variant="outline"
                            onClick={handleBackToGoals}
                            className="mt-4"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Change goal
                        </Button>
                    </div>

                    {/* Filtered Templates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTemplates.map((template) => (
                            <Card
                                key={template.id}
                                className={`cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg hover:scale-[1.02] ${selectedTemplate === template.id
                                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 shadow-lg'
                                    : 'border-slate-200 dark:border-zinc-700 hover:border-purple-300 bg-white dark:bg-zinc-800'
                                    }`}
                                onClick={() => handleTemplateSelect(template)}
                            >
                                <CardContent className="p-4">
                                    {/* Preview Image */}
                                    <div className="relative aspect-video mb-3 bg-gray-100 dark:bg-zinc-700 rounded-lg overflow-hidden">
                                        {template.thumbnail_url ? (
                                            <img
                                                src={template.thumbnail_url}
                                                alt={template.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50">
                                                <PlayCircle className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                                            </div>
                                        )}

                                        {selectedTemplate === template.id && (
                                            <div className="absolute inset-0 bg-purple-600 bg-opacity-20 flex items-center justify-center">
                                                <div className="bg-purple-600 rounded-full p-2">
                                                    <Check className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Template Info */}
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {template.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-zinc-400">
                                            {template.description}
                                        </p>
                                        <Badge
                                            className={`text-xs bg-${selectedGoalData.color}-100 text-${selectedGoalData.color}-700 dark:bg-${selectedGoalData.color}-900/50 dark:text-${selectedGoalData.color}-300`}
                                        >
                                            Great for {selectedGoalData.title}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Selected Template Summary */}
                    {selectedTemplate && (
                        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                    <Check className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Perfect! Template selected
                                    </h3>
                                    <p className="text-gray-600 dark:text-zinc-400">
                                        We have everything to create an effective video for <strong>{selectedGoalData.title.toLowerCase()}</strong>
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )}
                </>
            )}
        </div>
    )
} 