import { CheckCircle2, Circle, Clock, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Phase {
    name: string
    description: string
    completed: boolean
    current: boolean
    progress_range?: [number, number]
}

interface ProgressPhasesProps {
    phases: Phase[]
    currentProgress: number
    currentMessage?: string
    estimatedTime?: string
    className?: string
}

export function ProgressPhases({
    phases,
    currentProgress,
    currentMessage,
    estimatedTime,
    className
}: ProgressPhasesProps) {
    return (
        <div className={cn("space-y-6", className)}>

            {/* 📊 Progress Bar Principale */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-700">
                        Progresso Generale
                    </div>
                    <div className="text-sm text-gray-500">
                        {Math.round(currentProgress)}%
                    </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${Math.min(currentProgress, 100)}%` }}
                    />
                </div>

                {/* Status Message */}
                {currentMessage && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {currentMessage}
                    </div>
                )}

                {/* Tempo Stimato */}
                {estimatedTime && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        Tempo rimanente stimato: {estimatedTime}
                    </div>
                )}
            </div>

            {/* 🔄 Timeline delle Fasi */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Fasi del Processo</h3>

                <div className="space-y-3">
                    {phases.map((phase, index) => (
                        <div key={index} className="relative">

                            {/* Linea di Connessione */}
                            {index < phases.length - 1 && (
                                <div className={cn(
                                    "absolute left-5 top-8 w-0.5 h-8 -ml-px",
                                    phase.completed ? "bg-green-400" : "bg-gray-200"
                                )} />
                            )}

                            {/* Fase */}
                            <div className={cn(
                                "flex items-start gap-4 p-4 rounded-lg border transition-colors",
                                phase.completed && "bg-green-50 border-green-200",
                                phase.current && "bg-blue-50 border-blue-200 shadow-sm",
                                !phase.completed && !phase.current && "bg-gray-50 border-gray-200"
                            )}>

                                {/* Icona Status */}
                                <div className="flex-shrink-0 mt-0.5">
                                    {phase.completed ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    ) : phase.current ? (
                                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>

                                {/* Contenuto Fase */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className={cn(
                                            "font-medium",
                                            phase.completed && "text-green-700",
                                            phase.current && "text-blue-700",
                                            !phase.completed && !phase.current && "text-gray-600"
                                        )}>
                                            {phase.name}
                                        </h4>

                                        {phase.current && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                                                In corso
                                            </span>
                                        )}

                                        {phase.completed && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                                Completato
                                            </span>
                                        )}
                                    </div>

                                    <p className={cn(
                                        "text-sm mt-1",
                                        phase.completed && "text-green-600",
                                        phase.current && "text-blue-600",
                                        !phase.completed && !phase.current && "text-gray-500"
                                    )}>
                                        {phase.description}
                                    </p>

                                    {/* Mini Progress per Fase Corrente */}
                                    {phase.current && phase.progress_range && (
                                        <div className="mt-2">
                                            <div className="w-full bg-blue-100 rounded-full h-1.5">
                                                <div
                                                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${Math.min(
                                                            Math.max(
                                                                ((currentProgress - phase.progress_range[0]) /
                                                                    (phase.progress_range[1] - phase.progress_range[0])) * 100,
                                                                0
                                                            ),
                                                            100
                                                        )}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProgressPhases 