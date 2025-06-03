'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, MailCheck, Sparkles, Play, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { signIn } from "next-auth/react"

const Logo = () => (
    <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
            <Image
                src="/adsmakerlogo.png"
                alt="FAST ADS AI Logo"
                width={48}
                height={48}
                className="object-contain"
            />
        </div>
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            FAST ADS AI
        </span>
    </Link>
)

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [messageSent, setMessageSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessageSent(false)

        try {
            const result = await signIn('resend', {
                email,
                redirect: false,
                callbackUrl: '/dashboard',
            })

            if (result?.error) {
                setError('Errore nell\'invio dell\'email. Riprova.')
            } else {
                setMessageSent(true)
                setEmail('')
            }
        } catch (err) {
            setError('Si è verificato un errore inaspettato.')
            console.error("Unexpected sign in error:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setLoading(true)
        try {
            await signIn("google", { callbackUrl: "/dashboard" })
        } catch (err) {
            console.error("Google sign in error:", err)
            setError('Errore nell\'accesso con Google.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-500"></div>
            <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-1000"></div>

            <div className="relative z-10 flex flex-col items-center w-full">
                {/* Back Button */}
                <div className="w-full max-w-md mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Torna alla homepage
                    </Link>
                </div>

                <Logo />

                <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-xl">
                    <CardHeader className="text-center space-y-3 pb-6">
                        <Badge
                            variant="secondary"
                            className="mx-auto bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Accesso alla piattaforma
                        </Badge>
                        <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Inizia Ora
                        </CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">
                            Crea il tuo primo video ads professionale in 1 minuto
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {messageSent ? (
                            <div className="text-center p-6 border border-green-300/50 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-xl shadow-sm">
                                <MailCheck className="mx-auto h-16 w-16 text-green-500 mb-4" />
                                <h3 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">
                                    Controlla la tua email!
                                </h3>
                                <p className="text-green-700 dark:text-green-300 mb-3">
                                    Ti abbiamo inviato un link magico per accedere alla dashboard.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    (Potrebbe richiedere qualche minuto)
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-base font-medium">
                                        Indirizzo Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="iltuonome@azienda.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                        className={`h-12 text-lg border-2 rounded-xl ${error
                                            ? 'border-red-500 focus-visible:ring-red-500'
                                            : 'border-border focus-visible:ring-blue-500'
                                            }`}
                                    />
                                    {error && (
                                        <p className="text-sm text-red-600 flex items-center mt-2">
                                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                            {error}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                            Creazione account...
                                        </>
                                    ) : (
                                        <>
                                            <Play className="mr-3 h-5 w-5" />
                                            Inizia Gratis
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}

                        {!messageSent && (
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border/50" />
                                </div>
                                <div className="relative flex justify-center text-sm uppercase">
                                    <span className="bg-card px-4 text-muted-foreground font-medium">
                                        Oppure continua con
                                    </span>
                                </div>
                            </div>
                        )}

                        {!messageSent && (
                            <Button
                                variant="outline"
                                className="w-full h-12 flex items-center justify-center gap-3 text-lg border-2 border-border hover:bg-accent/50 rounded-xl transition-all duration-300"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                            >
                                <Image src="/search.png" alt="Google" width={20} height={20} />
                                Accedi con Google
                            </Button>
                        )}
                    </CardContent>

                    {!messageSent && (
                        <CardFooter className="flex flex-col space-y-4 pt-2 pb-8">
                            <div className="text-center text-sm text-muted-foreground">
                                <p>Non hai un account? <span className="font-semibold text-foreground">Verrà creato automaticamente</span></p>
                            </div>

                            {/* Features Preview */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 rounded-xl p-4 border border-blue-200/50 dark:border-blue-500/20">
                                <div className="text-center">
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Cosa otterrai:
                                    </h4>
                                    <div className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                                        <p>✨ 1 video ads gratuito di prova</p>
                                        <p>🚀 Sito web generato automaticamente</p>
                                        <p>⚡ Setup completo in 2 minuti</p>
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
                    )}
                </Card>

                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Nessuna carta richiesta
                    </span>
                    <span className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        Cancellazione immediata
                    </span>
                    <span className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                        GDPR compliant
                    </span>
                </div>
            </div>
        </div>
    )
}