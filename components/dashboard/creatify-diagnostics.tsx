"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    RefreshCw,
    Eye,
    EyeOff,
    Settings,
    Crown,
    Loader2
} from "lucide-react"

interface CreatifyConfigStatus {
    api_id_present: boolean
    api_id_preview: string
    api_key_present: boolean
    api_key_preview: string
    connection_status: string
    account_type?: string
    credits_remaining?: string | number
}

interface ConfigResponse {
    success: boolean
    config: CreatifyConfigStatus
    recommendations: string[]
    error?: string
}

export function CreatifyDiagnostics() {
    const [config, setConfig] = useState<ConfigResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const fetchConfig = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/creatify/config-status')
            const data = await response.json()
            setConfig(data)
        } catch (error) {
            setConfig({
                success: false,
                config: {
                    api_id_present: false,
                    api_id_preview: "❌ Errore",
                    api_key_present: false,
                    api_key_preview: "❌ Errore",
                    connection_status: "❌ Impossibile verificare"
                },
                recommendations: ["Controlla la connessione di rete"],
                error: error instanceof Error ? error.message : "Errore sconosciuto"
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchConfig()
    }, [])

    const getStatusIcon = (status: string) => {
        if (status.includes("✅")) return <CheckCircle className="w-5 h-5 text-green-600" />
        if (status.includes("⚠️")) return <AlertTriangle className="w-5 h-5 text-yellow-600" />
        return <XCircle className="w-5 h-5 text-red-600" />
    }

    const getStatusColor = (status: string) => {
        if (status.includes("✅")) return "bg-green-100 text-green-800 border-green-300"
        if (status.includes("⚠️")) return "bg-yellow-100 text-yellow-800 border-yellow-300"
        return "bg-red-100 text-red-800 border-red-300"
    }

    return (
        <Card className="p-6 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Settings className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Creatify Configuration
                    </h3>
                    <Crown className="w-5 h-5 text-yellow-600" />
                </div>
                <Button
                    onClick={fetchConfig}
                    disabled={loading}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    Refresh
                </Button>
            </div>

            {config && (
                <div className="space-y-4">
                    {/* Connection Status */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                        <div className="flex items-center gap-3">
                            {getStatusIcon(config.config.connection_status)}
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">Connection Status</h4>
                                <p className="text-sm text-slate-600 dark:text-zinc-400">
                                    {config.config.connection_status}
                                </p>
                            </div>
                        </div>
                        <Badge className={getStatusColor(config.config.connection_status)}>
                            {config.config.connection_status.includes("✅") ? "Connected" :
                                config.config.connection_status.includes("⚠️") ? "Warning" : "Error"}
                        </Badge>
                    </div>

                    {/* Account Info */}
                    {config.config.account_type && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">Account Type</h4>
                                <p className="text-purple-700 dark:text-purple-200">{config.config.account_type}</p>
                            </div>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Credits Remaining</h4>
                                <p className="text-blue-700 dark:text-blue-200">{config.config.credits_remaining}</p>
                            </div>
                        </div>
                    )}

                    {/* Credentials Details */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-slate-900 dark:text-white">API Credentials</h4>
                            <Button
                                onClick={() => setShowDetails(!showDetails)}
                                variant="ghost"
                                size="sm"
                                className="gap-2"
                            >
                                {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                {showDetails ? "Hide" : "Show"} Details
                            </Button>
                        </div>

                        {showDetails && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        {config.config.api_id_present ?
                                            <CheckCircle className="w-4 h-4 text-green-600" /> :
                                            <XCircle className="w-4 h-4 text-red-600" />
                                        }
                                        <span className="font-medium text-sm">API ID</span>
                                    </div>
                                    <p className="text-xs font-mono text-slate-600 dark:text-zinc-400">
                                        {config.config.api_id_preview}
                                    </p>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        {config.config.api_key_present ?
                                            <CheckCircle className="w-4 h-4 text-green-600" /> :
                                            <XCircle className="w-4 h-4 text-red-600" />
                                        }
                                        <span className="font-medium text-sm">API Key</span>
                                    </div>
                                    <p className="text-xs font-mono text-slate-600 dark:text-zinc-400">
                                        {config.config.api_key_preview}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Recommendations */}
                    {config.recommendations && config.recommendations.length > 0 && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Recommendations</h4>
                            <ul className="space-y-2">
                                {config.recommendations.map((rec, index) => (
                                    <li key={index} className="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        {rec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Error */}
                    {config.error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Error</h4>
                            <p className="text-sm text-red-800 dark:text-red-200">{config.error}</p>
                        </div>
                    )}
                </div>
            )}
        </Card>
    )
} 