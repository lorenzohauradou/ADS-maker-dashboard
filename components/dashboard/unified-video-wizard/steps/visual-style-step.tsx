"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, PlayCircle, Sparkles, Target, ArrowRight, MessageSquare } from "lucide-react"
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

interface VisualStyleStepProps {
    selectedTemplate: string | null
    templateCategory: string | null
    onTemplateSelect: (template: string, category: string) => void
}

const BUSINESS_GOALS = [
    {
        id: "sales",
        title: "Vendere un Prodotto",
        icon: "💰",
        description: "Aumentare le vendite di un prodotto specifico",
        color: "green",
        keywords: ["vendite", "prodotto", "ecommerce", "conversioni"]
    },
    {
        id: "awareness",
        title: "Brand Awareness",
        icon: "🌟",
        description: "Far conoscere il mio brand e aumentare la visibilità",
        color: "purple",
        keywords: ["brand", "awareness", "conoscenza", "visibilità"]
    },
    {
        id: "traffic",
        title: "Generare Traffico",
        icon: "🚀",
        description: "Portare più visitatori al mio sito web",
        color: "blue",
        keywords: ["traffico", "visite", "website", "click"]
    },
    {
        id: "leads",
        title: "Raccogliere Contatti",
        icon: "📧",
        description: "Ottenere email e informazioni di potenziali clienti",
        color: "orange",
        keywords: ["lead", "contatti", "email", "informazioni"]
    },
    {
        id: "education",
        title: "Educare l'Audience",
        icon: "🎓",
        description: "Spiegare come funziona il mio prodotto/servizio",
        color: "indigo",
        keywords: ["educazione", "spiegare", "tutorial", "informazione"]
    }
]

export function VisualStyleStep({ selectedTemplate, templateCategory, onTemplateSelect }: VisualStyleStepProps) {
    const [currentSubStep, setCurrentSubStep] = useState<'goal' | 'template'>('goal')
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
    const [templates, setTemplates] = useState<Template[]>([])
    const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
    const [loading, setLoading] = useState(false)

    // Carica templates da Creatify
    useEffect(() => {
        loadTemplates()
    }, [])

    // Filtra template in base all'obiettivo selezionato
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

                // Se non ci sono template filtrati, mostra tutti con priorità 
                if (filtered.length === 0) {
                    setFilteredTemplates(templates.slice(0, 4)) // Prime 4 opzioni
                } else {
                    setFilteredTemplates(filtered.slice(0, 6)) // Prime 6 risultati filtrati
                }
            }
        }
    }, [selectedGoal, templates])

    async function loadTemplates() {
        setLoading(true)
        try {
            // 🚧 TEMPORANEO: Commentiamo la chiamata API Creatify finché non ci sono template custom
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
                    description: template.description || 'Template personalizzato da Creatify',
                    category: template.category || 'personalizzato',
                    thumbnail_url: template.thumbnail_url || template.preview_url,
                    variables: template.variables || []
                }))
                setTemplates(mappedTemplates)
            } else {
            */

            // 📌 TEMPLATE FALLBACK OTTIMIZZATI PER OBIETTIVI
            console.log('🎯 Caricamento template fallback ottimizzati per obiettivi di business')

            // Simula un piccolo delay per realismo
            await new Promise(resolve => setTimeout(resolve, 500))

            setTemplates([
                // Sales Templates
                {
                    id: "product_showcase_template",
                    name: "Product Showcase Pro",
                    description: "Focus completo sul prodotto con animazioni accattivanti per massimizzare le vendite",
                    category: "vendite",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "sales_funnel_template",
                    name: "Sales Funnel Master",
                    description: "Guida l'utente attraverso un percorso di vendita ottimizzato",
                    category: "vendite",
                    thumbnail_url: "/placeholder.jpg"
                },

                // Brand Awareness Templates  
                {
                    id: "brand_story_template",
                    name: "Brand Story Elegante",
                    description: "Racconta la storia del tuo brand in modo coinvolgente e memorabile",
                    category: "awareness",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "brand_values_template",
                    name: "Brand Values",
                    description: "Presenta i valori e la missione della tua azienda",
                    category: "awareness",
                    thumbnail_url: "/placeholder.jpg"
                },

                // Traffic Templates
                {
                    id: "call_to_action_template",
                    name: "Call to Action Potente",
                    description: "Spinge gli utenti a visitare il tuo sito web con messaggi efficaci",
                    category: "traffico",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "curiosity_driven_template",
                    name: "Curiosity Driver",
                    description: "Crea curiosità irresistibile che porta traffico",
                    category: "traffico",
                    thumbnail_url: "/placeholder.jpg"
                },

                // Lead Generation Templates
                {
                    id: "lead_magnet_template",
                    name: "Lead Magnet Irresistibile",
                    description: "Raccogli contatti con offerte che i clienti non possono rifiutare",
                    category: "leads",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "free_consultation_template",
                    name: "Free Consultation",
                    description: "Offri consultazioni gratuite per raccogliere lead qualificati",
                    category: "leads",
                    thumbnail_url: "/placeholder.jpg"
                },

                // Education Templates
                {
                    id: "explainer_template",
                    name: "Explainer Video Pro",
                    description: "Spiega prodotti complessi in modo semplice e chiaro",
                    category: "education",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "tutorial_template",
                    name: "Tutorial Interattivo",
                    description: "Mostra step-by-step come usare il tuo prodotto",
                    category: "education",
                    thumbnail_url: "/placeholder.jpg"
                },

                // Trust Building Templates
                {
                    id: "testimonial_template",
                    name: "Testimonial Autentico",
                    description: "Mostra la soddisfazione reale dei tuoi clienti",
                    category: "trust",
                    thumbnail_url: "/placeholder.jpg"
                },
                {
                    id: "case_study_template",
                    name: "Case Study Vincente",
                    description: "Presenta risultati concreti ottenuti dai clienti",
                    category: "trust",
                    thumbnail_url: "/placeholder.jpg"
                }
            ])

            // }

        } catch (error) {
            console.error('Error loading templates:', error)
            toast.error('Errore caricamento template - uso template predefiniti')

            // Fallback minimo di emergenza
            setTemplates([
                {
                    id: "universal_template",
                    name: "Template Universale",
                    description: "Adatto a qualsiasi obiettivo di business",
                    category: "universale",
                    thumbnail_url: "/placeholder.jpg"
                }
            ])
        } finally {
            setLoading(false)
        }
    }

    const handleGoalSelect = (goalId: string) => {
        setSelectedGoal(goalId)
        setCurrentSubStep('template')
    }

    const handleTemplateSelect = (template: Template) => {
        onTemplateSelect(template.id, template.category)
        toast.success(`Template "${template.name}" selezionato per il tuo obiettivo!`)
    }

    const handleBackToGoals = () => {
        setCurrentSubStep('goal')
        setSelectedGoal(null)
    }

    const selectedGoalData = BUSINESS_GOALS.find(g => g.id === selectedGoal)

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <Sparkles className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
                    <p className="text-gray-600">Caricamento template ottimizzati...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* 🎯 STEP 1: Business Goal Selection */}
            {currentSubStep === 'goal' && (
                <>
                    {/* Conversational Header */}
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Qual è il tuo obiettivo principale?
                        </h2>
                        <p className="text-gray-600 dark:text-zinc-400 max-w-lg mx-auto">
                            Scegli cosa vuoi ottenere con questo video.
                            Ti suggerirò il template perfetto per il tuo obiettivo.
                        </p>
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
                    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                            <Target className="w-6 h-6 text-blue-600 mt-1" />
                            <div>
                                <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                                    💡 Non sei sicuro?
                                </h4>
                                <p className="text-blue-800 dark:text-blue-200 text-sm">
                                    Scegli l'obiettivo che meglio descrive cosa vuoi ottenere con questo video.
                                    Potremo sempre ottimizzarlo nei passaggi successivi!
                                </p>
                            </div>
                        </div>
                    </Card>
                </>
            )}

            {/* 🎨 STEP 2: Template Selection (Filtered) */}
            {currentSubStep === 'template' && selectedGoalData && (
                <>
                    {/* Conversational Header */}
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="text-2xl">{selectedGoalData.icon}</div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Template per {selectedGoalData.title}
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-zinc-400 max-w-lg mx-auto">
                            Ho selezionato i migliori template per <strong>{selectedGoalData.title.toLowerCase()}</strong>.
                            Scegli quello che più ti piace!
                        </p>

                        {/* Back Button */}
                        <Button
                            variant="outline"
                            onClick={handleBackToGoals}
                            className="mt-4"
                        >
                            ← Cambia obiettivo
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
                                            Ottimo per {selectedGoalData.title}
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
                                        Perfetto! Template selezionato
                                    </h3>
                                    <p className="text-gray-600 dark:text-zinc-400">
                                        Abbiamo tutto per creare un video efficace per <strong>{selectedGoalData.title.toLowerCase()}</strong>
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