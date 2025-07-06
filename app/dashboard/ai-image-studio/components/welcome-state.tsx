import { Palette, Zap, Scissors } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface WelcomeStateProps {
    onImageUpload?: (file: File) => void
}

export const WelcomeState = ({ onImageUpload }: WelcomeStateProps) => {
    const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
    const [showAfter, setShowAfter] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Preview images for each feature
    const featureExamples = {
        "professional-studio": {
            before: "/olio_latta.jpg", // Immagine prodotto originale
            after: "/olio_gpt.png", // Versione studio professionale 
            title: "Professional Studio"
        },
        "cinematic-lighting": {
            before: "/aspiratore.jpg", // Stessa immagine originale
            after: "/vent.jpg", // Versione con lighting drammatico
            title: "Cinematic Lighting"
        },
        "transparent-background": {
            before: "/aspiratore.jpg", // Stessa immagine originale  
            after: "/mask.jpg", // Versione con sfondo pulito
            title: "Remove Background"
        }
    }

    // Gestione file upload
    const handleFileSelect = (files: FileList) => {
        const file = files[0]
        if (file && file.type.startsWith('image/') && onImageUpload) {
            onImageUpload(file)
        }
    }

    // Gestione drag and drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleFileSelect(files)
        }
    }

    // Gestione click per aprire file dialog
    const handleClick = () => {
        if (onImageUpload) {
            fileInputRef.current?.click()
        }
    }

    // Animazione automatica before → after quando si fa hover
    useEffect(() => {
        if (hoveredFeature) {
            setShowAfter(false) // Inizia sempre con "before"
            const timer = setTimeout(() => {
                setShowAfter(true) // Poi mostra "after" dopo 1.5 secondi
            }, 1500)

            return () => clearTimeout(timer)
        } else {
            setShowAfter(false) // Reset quando si esce dall'hover
        }
    }, [hoveredFeature])

    return (
        <div
            className={`text-center py-20 px-8 relative transition-all duration-300 ${isDragging
                ? 'bg-blue-50/30 dark:bg-blue-900/10'
                : ''
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            style={{ cursor: onImageUpload ? 'pointer' : 'default' }}
        >
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    if (e.target.files) {
                        handleFileSelect(e.target.files)
                    }
                }}
            />

            {/* Drag overlay */}
            {isDragging && (
                <div className="absolute inset-0 bg-blue-500/5 border-2 border-dashed border-blue-400 rounded-2xl flex items-center justify-center z-20 backdrop-blur-sm">
                    <div className="text-center">
                        <div className="text-4xl mb-2">📸</div>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">Drop your image here</p>
                        <p className="text-sm text-blue-500 dark:text-blue-400">JPEG, PNG, WebP supported</p>
                    </div>
                </div>
            )}

            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-gentle-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-xl animate-gentle-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-2xl animate-float" />
            </div>

            {/* Welcome Content */}
            <div className="space-y-6 max-w-2xl mx-auto relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent">
                        Welcome to
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        AI Image Studio
                    </span>
                </h2>

                <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-light">
                    Transform any product photo into
                    <span className="font-semibold text-blue-600 dark:text-blue-400"> professional assets</span> for
                    e-commerce and marketing, ready for
                    <span className="font-semibold text-purple-600 dark:text-purple-400"> Amazon, Shopify</span> and
                    social media.
                </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mt-12 relative z-10 stagger-fade-in">
                {[
                    { icon: <Palette className="w-4 h-4" />, text: "Professional Studio", color: "blue", id: "professional-studio" },
                    { icon: <Zap className="w-4 h-4" />, text: "Cinematic Lighting", color: "amber", id: "cinematic-lighting" },
                    { icon: <Scissors className="w-4 h-4" />, text: "Transparent Background", color: "purple", id: "transparent-background" }
                ].map((feature, index) => (
                    <div key={index} className="relative">
                        <div
                            className={`
                            group flex items-center gap-3 px-6 py-3 
                            bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm 
                            rounded-full shadow-lg border border-slate-200/50 dark:border-zinc-700/50
                            hover-lift hover:shadow-xl transition-all duration-300
                            ${feature.color === 'blue' ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20' : ''}
                            ${feature.color === 'amber' ? 'hover:bg-amber-50 dark:hover:bg-amber-900/20' : ''}
                            ${feature.color === 'purple' ? 'hover:bg-purple-50 dark:hover:bg-purple-900/20' : ''}
                        `}
                            onMouseEnter={() => setHoveredFeature(feature.id)}
                            onMouseLeave={() => setHoveredFeature(null)}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`
                            p-2 rounded-lg text-white transition-all duration-300
                            ${feature.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700' : ''}
                            ${feature.color === 'amber' ? 'bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-700' : ''}
                            ${feature.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-700' : ''}
                        `}>
                                {feature.icon}
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                {feature.text}
                            </span>
                        </div>

                        {/* Tooltip TikTok Vertical Preview */}
                        {hoveredFeature === feature.id && (
                            <div className="absolute -top-[32rem] left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                                <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-slate-200/50 dark:border-zinc-700/50">
                                    {/* TikTok Phone Frame - Formato 9:16 */}
                                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-zinc-800 dark:to-zinc-900 rounded-[2rem] p-2 shadow-xl">
                                        <div className="bg-black rounded-[1.5rem] overflow-hidden w-48 h-80">
                                            {/* Top Bar con Notch */}
                                            <div className="bg-black h-8 flex items-center justify-center relative">
                                                <div className="bg-zinc-800 w-20 h-1.5 rounded-full"></div>
                                                <div className="absolute top-2 right-4 flex gap-1">
                                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                                </div>
                                            </div>

                                            {/* Screen Content - Formato Verticale */}
                                            <div className="bg-gradient-to-br from-slate-100/50 to-slate-200/30 dark:from-zinc-800/50 dark:to-zinc-700/30 h-full flex flex-col">
                                                {/* Header */}
                                                <div className="text-center py-2 px-4">
                                                    <h3 className="text-sm font-bold text-white">
                                                        {featureExamples[feature.id as keyof typeof featureExamples].title}
                                                    </h3>
                                                </div>

                                                {/* Main Image - Formato Verticale */}
                                                <div className="flex-1 px-2 pb-2">
                                                    <div className="relative h-full">
                                                        <img
                                                            src={showAfter
                                                                ? featureExamples[feature.id as keyof typeof featureExamples].after
                                                                : featureExamples[feature.id as keyof typeof featureExamples].before
                                                            }
                                                            alt={showAfter ? "After" : "Before"}
                                                            className="w-full h-full object-cover rounded-2xl border-1 border-slate-200 transition-all duration-700 ease-in-out"
                                                        />

                                                        {/* Badge quasi impercettibile in sovraimpressione */}
                                                        <div className="absolute top-2 right-2">
                                                            <div className={`
                                                                px-1.5 py-0.5 rounded-md text-[10px] font-medium
                                                                backdrop-blur-sm transition-all duration-700 ease-in-out
                                                                ${showAfter
                                                                    ? 'bg-black/10 text-white/70'
                                                                    : 'bg-white/20 text-slate-600/60'
                                                                }
                                                            `}>
                                                                {showAfter ? 'After' : 'Before'}
                                                            </div>
                                                        </div>

                                                        {/* Transform Progress Bar */}
                                                        <div className="absolute bottom-3 left-3 right-3">
                                                            <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                                                                <div className="bg-white/20 h-1 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-gradient-to-r from-slate-400 to-slate-600 transition-all duration-1500 ease-out"
                                                                        style={{ width: showAfter ? '100%' : '0%' }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Magic Sparkles Effect */}
                                                        {showAfter && (
                                                            <div className="absolute inset-0 pointer-events-none">
                                                                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-slate-400 rounded-full animate-ping"></div>
                                                                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-slate-500 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                                                                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-slate-600 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tooltip Arrow */}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                        <div className="w-4 h-4 bg-white dark:bg-zinc-900 rotate-45 border-r border-b border-slate-200/50 dark:border-zinc-700/50"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Subtle Call to Action */}
            <div className="mt-16 text-slate-500 dark:text-zinc-500 text-lg font-light">
                {onImageUpload ? (
                    <>
                        <div className="mb-2">Upload your first image to get started ✨</div>
                        <div className="text-sm text-slate-400 dark:text-zinc-600">
                            Click anywhere or drag & drop an image file
                        </div>
                    </>
                ) : (
                    'Upload your first image to get started ✨'
                )}
            </div>
        </div>
    )
} 