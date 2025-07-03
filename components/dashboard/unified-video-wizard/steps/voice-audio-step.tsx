"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Volume2,
    VolumeX,
    Mic,
    Music,
    CheckCircle,
    Play,
    Pause,
    User,
    Crown,
    Sparkles,
    Heart,
    Zap
} from "lucide-react"

interface VoiceAudioStepProps {
    selectedVoice: string | null
    backgroundMusic: boolean
    musicVolume: number
    voiceVolume: number
    onAudioUpdate: (audioData: any) => void
}

const VOICE_OPTIONS = [
    {
        id: "sarah_it",
        name: "Sarah",
        gender: "female",
        language: "Italiano",
        accent: "Neutrale",
        style: "Professionale",
        icon: "👩‍💼",
        color: "blue",
        premium: false,
        description: "Voce femminile professionale e chiara"
    },
    {
        id: "marco_it",
        name: "Marco",
        gender: "male",
        language: "Italiano",
        accent: "Neutrale",
        style: "Friendly",
        icon: "👨‍💼",
        color: "green",
        premium: false,
        description: "Voce maschile amichevole e coinvolgente"
    },
    {
        id: "giulia_it",
        name: "Giulia",
        gender: "female",
        language: "Italiano",
        accent: "Milano",
        style: "Energico",
        icon: "⚡",
        color: "purple",
        premium: true,
        description: "Voce femminile energica e moderna"
    },
    {
        id: "alessandro_it",
        name: "Alessandro",
        gender: "male",
        language: "Italiano",
        accent: "Roma",
        style: "Carismatico",
        icon: "🎭",
        color: "orange",
        premium: true,
        description: "Voce maschile carismatica e persuasiva"
    },
    {
        id: "elena_it",
        name: "Elena",
        gender: "female",
        language: "Italiano",
        accent: "Toscana",
        style: "Elegante",
        icon: "👑",
        color: "pink",
        premium: true,
        description: "Voce femminile elegante e raffinata"
    }
]

const MUSIC_STYLES = [
    { value: "upbeat", label: "Upbeat", icon: "🎉", desc: "Energico e motivazionale" },
    { value: "corporate", label: "Corporate", icon: "💼", desc: "Professionale e moderno" },
    { value: "chill", label: "Chill", icon: "😌", desc: "Rilassante e minimalista" },
    { value: "electronic", label: "Electronic", icon: "🔊", desc: "Moderno e tecnologico" }
]

export function VoiceAudioStep({
    selectedVoice,
    backgroundMusic,
    musicVolume,
    voiceVolume,
    onAudioUpdate
}: VoiceAudioStepProps) {
    const [isPlaying, setIsPlaying] = useState<string | null>(null)
    const [selectedMusicStyle, setSelectedMusicStyle] = useState("upbeat")

    const handleVoiceSelect = (voiceId: string) => {
        onAudioUpdate({ selectedVoice: voiceId })
    }

    const handleVoicePreview = (voiceId: string) => {
        if (isPlaying === voiceId) {
            setIsPlaying(null)
        } else {
            setIsPlaying(voiceId)
            // Simula durata anteprima
            setTimeout(() => setIsPlaying(null), 3000)
        }
    }

    const selectedVoiceData = VOICE_OPTIONS.find(voice => voice.id === selectedVoice)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Voce e Audio
                </h2>
                <p className="text-slate-600 dark:text-zinc-400">
                    Scegli la voce del tuo avatar e configura l'audio
                </p>
            </div>

            {/* Voice Selection */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                    <Mic className="w-6 h-6 mr-3 text-blue-600" />
                    Selezione Voce
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {VOICE_OPTIONS.map((voice) => (
                        <Card
                            key={voice.id}
                            className={`p-4 cursor-pointer transition-all duration-300 border-2 rounded-xl hover:shadow-lg relative ${selectedVoice === voice.id
                                ? `border-${voice.color}-500 bg-gradient-to-br from-${voice.color}-50 to-${voice.color}-100 dark:from-${voice.color}-900/30 dark:to-${voice.color}-800/30 shadow-lg`
                                : "border-slate-200 dark:border-zinc-700 hover:border-slate-300 bg-white dark:bg-zinc-800"
                                }`}
                            onClick={() => handleVoiceSelect(voice.id)}
                        >
                            {voice.premium && (
                                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs">
                                    <Crown className="w-3 h-3 mr-1" />
                                    PRO
                                </Badge>
                            )}

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">{voice.icon}</div>
                                        <div>
                                            <div className="font-bold text-slate-900 dark:text-white">{voice.name}</div>
                                            <div className="text-sm text-slate-600 dark:text-zinc-400">{voice.style}</div>
                                        </div>
                                    </div>
                                    {selectedVoice === voice.id && (
                                        <CheckCircle className={`w-5 h-5 text-${voice.color}-600`} />
                                    )}
                                </div>

                                <p className="text-sm text-slate-600 dark:text-zinc-400">
                                    {voice.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="text-xs text-slate-500 dark:text-zinc-500">
                                        {voice.language} • {voice.accent}
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleVoicePreview(voice.id)
                                        }}
                                        className="h-8 px-3"
                                    >
                                        {isPlaying === voice.id ? (
                                            <>
                                                <Pause className="w-3 h-3 mr-1" />
                                                Stop
                                            </>
                                        ) : (
                                            <>
                                                <Play className="w-3 h-3 mr-1" />
                                                Anteprima
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {selectedVoiceData && (
                    <div className="mt-6 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700">
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl">{selectedVoiceData.icon}</div>
                            <div>
                                <div className="font-bold text-slate-900 dark:text-white">
                                    Voce selezionata: {selectedVoiceData.name}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-zinc-400">
                                    {selectedVoiceData.description}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Card>

            {/* Audio Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Background Music */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                        <Music className="w-6 h-6 mr-3 text-purple-600" />
                        Musica di Sottofondo
                    </h3>

                    <div className="space-y-6">
                        {/* Enable/Disable Music */}
                        <div className="flex items-center space-x-3 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-purple-200 dark:border-purple-700">
                            <Checkbox
                                id="background-music"
                                checked={backgroundMusic}
                                onCheckedChange={(checked) => onAudioUpdate({ backgroundMusic: checked })}
                                className="border-purple-300 data-[state=checked]:bg-purple-600"
                            />
                            <Label htmlFor="background-music" className="font-medium text-slate-900 dark:text-white cursor-pointer flex-1">
                                Abilita musica di sottofondo
                            </Label>
                            {backgroundMusic ? (
                                <Volume2 className="w-5 h-5 text-purple-600" />
                            ) : (
                                <VolumeX className="w-5 h-5 text-slate-400" />
                            )}
                        </div>

                        {/* Music Style */}
                        {backgroundMusic && (
                            <div className="space-y-3">
                                <Label className="font-semibold text-slate-900 dark:text-white">Stile Musicale</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {MUSIC_STYLES.map((style) => (
                                        <Card
                                            key={style.value}
                                            className={`p-3 cursor-pointer transition-all duration-300 border-2 rounded-lg hover:shadow-lg ${selectedMusicStyle === style.value
                                                ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30"
                                                : "border-slate-200 dark:border-zinc-700 hover:border-purple-300 bg-white dark:bg-zinc-800"
                                                }`}
                                            onClick={() => setSelectedMusicStyle(style.value)}
                                        >
                                            <div className="text-center">
                                                <div className="text-lg mb-1">{style.icon}</div>
                                                <div className="font-semibold text-xs text-slate-900 dark:text-white">{style.label}</div>
                                                <div className="text-xs text-slate-600 dark:text-zinc-400 mt-1">{style.desc}</div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Music Volume */}
                        {backgroundMusic && (
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label className="font-semibold text-slate-900 dark:text-white">Volume Musica</Label>
                                    <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-3 py-1 rounded-full">
                                        {musicVolume}%
                                    </Badge>
                                </div>
                                <Slider
                                    value={[musicVolume]}
                                    onValueChange={(value) => onAudioUpdate({ musicVolume: value[0] })}
                                    max={100}
                                    step={5}
                                    className="w-full"
                                />
                            </div>
                        )}
                    </div>
                </Card>

                {/* Voice Controls */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                        <Volume2 className="w-6 h-6 mr-3 text-green-600" />
                        Controlli Voce
                    </h3>

                    <div className="space-y-6">
                        {/* Voice Volume */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label className="font-semibold text-slate-900 dark:text-white">Volume Voce</Label>
                                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 px-3 py-1 rounded-full">
                                    {voiceVolume}%
                                </Badge>
                            </div>
                            <Slider
                                value={[voiceVolume]}
                                onValueChange={(value) => onAudioUpdate({ voiceVolume: value[0] })}
                                max={100}
                                step={5}
                                className="w-full"
                            />
                        </div>

                        {/* Voice Settings Info */}
                        <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-green-200 dark:border-green-700">
                            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Ottimizzazioni Audio
                            </h4>
                            <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                                <p>• Volume bilanciato automaticamente</p>
                                <p>• Riduzione rumore di fondo</p>
                                <p>• Normalizzazione del volume</p>
                                <p>• Ottimizzazione per piattaforma social</p>
                            </div>
                        </div>

                        {/* Audio Balance Suggestion */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <Heart className="w-5 h-5 text-amber-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                                        Bilanciamento Consigliato
                                    </h4>
                                    <p className="text-sm text-amber-800 dark:text-amber-200">
                                        Voce: 80% • Musica: 50% per una perfetta chiarezza del messaggio
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Audio Preview */}
            {selectedVoice && (
                <Card className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-zinc-900/50 dark:to-slate-900/50 border-2 border-slate-200 dark:border-zinc-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                        <Play className="w-6 h-6 mr-3 text-slate-600" />
                        Anteprima Audio Finale
                    </h3>

                    <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <Play className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900 dark:text-white">
                                    Anteprima con {selectedVoiceData?.name}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-zinc-400">
                                    Voce: {voiceVolume}% • Musica: {backgroundMusic ? `${musicVolume}%` : 'Disabilitata'}
                                </div>
                            </div>
                        </div>
                        <Button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
                            disabled={!selectedVoice}
                        >
                            <Play className="w-4 h-4 mr-2" />
                            Ascolta Anteprima
                        </Button>
                    </div>
                </Card>
            )}

            {/* Selection Summary */}
            {selectedVoice && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                    <h4 className="font-bold text-green-900 dark:text-green-100 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Configurazione Audio Selezionata
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-green-800 dark:text-green-200">Voce:</span>
                            <p className="text-green-700 dark:text-green-300">
                                {selectedVoiceData?.name} ({selectedVoiceData?.style})
                            </p>
                        </div>
                        <div>
                            <span className="font-medium text-green-800 dark:text-green-200">Volume Voce:</span>
                            <p className="text-green-700 dark:text-green-300">{voiceVolume}%</p>
                        </div>
                        <div>
                            <span className="font-medium text-green-800 dark:text-green-200">Musica:</span>
                            <p className="text-green-700 dark:text-green-300">
                                {backgroundMusic ? `${selectedMusicStyle} (${musicVolume}%)` : 'Disabilitata'}
                            </p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
} 