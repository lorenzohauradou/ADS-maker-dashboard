import { Progress } from "@/components/ui/progress"
import { Wand2, Eye, Zap, Sparkles, CheckCircle, AlertCircle } from "lucide-react"

interface StreamingPreviewProps {
    originalImage: string
    isStreaming: boolean
    progress: number
    message: string
    stage: string
    error?: string | null
}

export const StreamingPreview = ({
    originalImage,
    isStreaming,
    progress,
    message,
    stage,
    error
}: StreamingPreviewProps) => {

    // Icone per ogni stage
    const getStageIcon = () => {
        switch (stage) {
            case 'initializing': return <Wand2 className="w-6 h-6" />
            case 'analyzing': return <Eye className="w-6 h-6" />
            case 'preparing': return <Sparkles className="w-6 h-6" />
            case 'generating': return <Zap className="w-6 h-6" />
            case 'processing': return <Wand2 className="w-6 h-6" />
            case 'styling': return <Sparkles className="w-6 h-6" />
            case 'optimizing': return <Zap className="w-6 h-6" />
            case 'finalizing': return <CheckCircle className="w-6 h-6" />
            case 'complete': return <CheckCircle className="w-6 h-6" />
            case 'error': return <AlertCircle className="w-6 h-6" />
            default: return <Wand2 className="w-6 h-6" />
        }
    }

    // Colori per ogni stage
    const getStageColor = () => {
        switch (stage) {
            case 'initializing': return 'from-blue-500 to-cyan-500'
            case 'analyzing': return 'from-purple-500 to-indigo-500'
            case 'preparing': return 'from-amber-500 to-orange-500'
            case 'generating': return 'from-green-500 to-emerald-500'
            case 'processing': return 'from-pink-500 to-rose-500'
            case 'styling': return 'from-violet-500 to-purple-500'
            case 'optimizing': return 'from-cyan-500 to-blue-500'
            case 'finalizing': return 'from-emerald-500 to-green-500'
            case 'complete': return 'from-green-600 to-emerald-600'
            case 'error': return 'from-red-500 to-red-600'
            default: return 'from-blue-500 to-purple-600'
        }
    }

    if (!isStreaming && !error) {
        return (
            <div className="relative w-full aspect-square bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-full object-cover"
                />
            </div>
        )
    }

    return (
        <div className="relative w-full aspect-square bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
            {/* Immagine originale come base */}
            <img
                src={originalImage}
                alt="Original"
                className="w-full h-full object-cover"
            />

            {/* Overlay con effetti di streaming */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">

                {/* Effetto di scansione animato */}
                {isStreaming && (
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: `linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) ${progress / 2}%, rgba(147, 51, 234, 0.5) ${progress}%, transparent ${progress + 10}%)`,
                            animation: 'scan 2s ease-in-out infinite'
                        }}
                    />
                )}

                {/* Particelle animate */}
                {isStreaming && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-float"
                                style={{
                                    left: `${20 + (i * 10)}%`,
                                    top: `${30 + (i * 5)}%`,
                                    animationDelay: `${i * 0.3}s`,
                                    animationDuration: '3s'
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Contenuto principale */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">

                    {/* Indicatore stage in alto */}
                    <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${getStageColor()} text-white animate-pulse`}>
                            {getStageIcon()}
                        </div>
                        <div className="flex-1">
                            <div className="text-white text-sm font-medium uppercase tracking-wider">
                                {stage.replace('_', ' ')}
                            </div>
                        </div>
                    </div>

                    {/* Progress e messaggio in basso */}
                    <div className="space-y-4">
                        {/* Barra di progresso con glow */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm"></div>
                            <Progress
                                value={progress}
                                className="relative h-3 bg-black/40 border border-white/20"
                            />
                        </div>

                        {/* Messaggio con animazione typing */}
                        <div className="text-center">
                            <p className="text-white text-lg font-medium mb-1 animate-pulse">
                                {message}
                            </p>
                            <p className="text-white/80 text-sm">
                                {progress}% completato
                            </p>
                        </div>

                        {/* Indicatori di stato avanzato */}
                        <div className="flex justify-center space-x-2">
                            {['initializing', 'analyzing', 'preparing', 'generating', 'processing', 'styling', 'optimizing', 'finalizing'].map((stageStep, index) => (
                                <div
                                    key={stageStep}
                                    className={`w-2 h-2 rounded-full transition-all duration-500 ${progress > (index * 12.5)
                                            ? 'bg-white shadow-lg shadow-white/50 scale-125'
                                            : 'bg-white/30'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Overlay di errore */}
                {error && (
                    <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center">
                        <div className="text-center text-white p-6">
                            <AlertCircle className="w-12 h-12 mx-auto mb-3" />
                            <p className="text-lg font-semibold mb-2">Errore durante la generazione</p>
                            <p className="text-sm opacity-90">{error}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS per animazioni personalizzate */}
            <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
      `}</style>
        </div>
    )
} 