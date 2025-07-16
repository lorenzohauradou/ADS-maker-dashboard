'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, MailCheck, Sparkles, Play, ArrowLeft, Brain } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { signIn } from "next-auth/react"

const Logo = () => (
    <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 transition-transform bg-white">
            <Image
                src="/fastadslogo.png"
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
                setError('Error sending email. Please try again.')
            } else {
                setMessageSent(true)
                setEmail('')
            }
        } catch (err) {
            setError('An unexpected error occurred.')
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
            setError('Error signing in with Google.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            {/* Background Effects - Matching hero section */}
            <div className="absolute inset-0 bg-black"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-blue-600/5 via-purple-600/5 to-pink-600/5 rounded-full blur-3xl"></div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-500"></div>
            <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-1000"></div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                {/* Back Button */}
                <div className="w-full max-w-md mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-[#9ca3af] hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to homepage
                    </Link>
                </div>

                <Logo />

                <Card className="w-full max-w-md shadow-2xl border-gray-700/50 bg-zinc-900/80 backdrop-blur-xl">
                    <CardHeader className="text-center space-y-3 pb-6">
                        <Badge
                            variant="secondary"
                            className="mx-auto bg-zinc-800/60 text-white border-gray-700/50 backdrop-blur-sm"
                        >
                            <Brain className="w-4 h-4 mr-2" />
                            #1 AI VIDEO AD GENERATOR
                        </Badge>
                        <CardTitle className="text-3xl font-bold tracking-tight text-white">
                            Start Creating Now
                        </CardTitle>
                        <CardDescription className="text-lg text-[#d1d5db]">
                            Create your first professional video ads in 1 minute
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {messageSent ? (
                            <div className="text-center p-6 border border-green-500/30 bg-green-500/10 rounded-xl shadow-sm">
                                <MailCheck className="mx-auto h-16 w-16 text-green-400 mb-4" />
                                <h3 className="text-xl font-semibold text-green-400 mb-2">
                                    Check your email!
                                </h3>
                                <p className="text-green-300 mb-3">
                                    We've sent you a magic link to access the dashboard.
                                </p>
                                <p className="text-sm text-[#9ca3af]">
                                    (It may take a few minutes)
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Google Sign In Button - Top */}
                                <Button
                                    variant="outline"
                                    className="w-full h-12 flex items-center justify-center gap-3 text-lg border-2 border-gray-700 hover:bg-zinc-800/50 rounded-xl transition-all duration-300 bg-zinc-800/30 text-white"
                                    onClick={handleGoogleSignIn}
                                    disabled={loading}
                                >
                                    <Image src="/search.png" alt="Google" width={20} height={20} />
                                    Sign in with Google
                                </Button>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-gray-700/50" />
                                    </div>
                                    <div className="relative flex justify-center text-sm uppercase">
                                        <span className="bg-zinc-900 px-4 text-[#9ca3af] font-medium">
                                            Or with email
                                        </span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-base font-medium text-white">
                                            Email Address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="yourname@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={loading}
                                            className={`h-12 text-lg border-2 rounded-xl bg-zinc-800/50 border-gray-700 text-white placeholder:text-[#9ca3af] focus-visible:ring-blue-500 ${error
                                                ? 'border-red-500 focus-visible:ring-red-500'
                                                : 'border-gray-700 focus-visible:ring-blue-500'
                                                }`}
                                        />
                                        {error && (
                                            <p className="text-sm text-red-400 flex items-center mt-2">
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
                                                Creating account...
                                            </>
                                        ) : (
                                            <>
                                                <Play className="mr-3 h-5 w-5" />
                                                Start for free
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </>
                        )}
                    </CardContent>

                    {!messageSent && (
                        <CardFooter className="flex flex-col space-y-4 pt-2 pb-8">
                            <div className="text-center text-sm text-[#9ca3af]">
                                <p>Don't have an account? <span className="font-semibold text-white">It will be created automatically</span></p>
                            </div>

                            {/* Features Preview */}
                            <div className="bg-zinc-800/50 rounded-xl p-4 border border-gray-700/50">
                                <div className="text-center">
                                    <h4 className="font-semibold text-white mb-2 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        You'll get:
                                    </h4>
                                    <div className="space-y-1 text-sm text-[#d1d5db]">
                                        <p>A free video</p>
                                        <p>AI generated website</p>
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
                    )}
                </Card>

                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#9ca3af]">
                    <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        No credit card required
                    </span>
                    <span className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        Instant cancellation
                    </span>
                    <span className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                        GDPR compliant (EU)
                    </span>
                </div>
            </div>
        </div>
    )
}