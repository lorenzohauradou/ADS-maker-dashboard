"use client"

import React, { useState, useEffect } from "react"
import { CheckCircle2, Target, Mail } from "lucide-react"

interface SuccessStepProps {
    projectName: string
    estimatedTime?: string
    userEmail?: string
    onComplete?: () => void
}

export function SuccessStep({
    projectName,
    estimatedTime = "2-4 minutes",
    userEmail,
    onComplete
}: SuccessStepProps) {
    const [showCheck, setShowCheck] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Show the modal immediately
        setIsVisible(true)

        // Show checkmark after brief delay
        const timer = setTimeout(() => {
            setShowCheck(true)
        }, 300)

        // Auto close after 4 seconds
        const closeTimer = setTimeout(() => {
            onComplete?.()
        }, 4000)

        return () => {
            clearTimeout(timer)
            clearTimeout(closeTimer)
        }
    }, [onComplete])

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`text-center px-8 py-12 max-w-md transform transition-all duration-400 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-80 opacity-0'}`}>
                {/* Success Icon */}
                <div className="mx-auto w-20 h-20 mb-8">
                    <div className={`w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 ease-out ${showCheck ? 'scale-100 animate-pulse' : 'scale-0'}`}>
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                </div>

                {/* Success Message */}
                <div className={`space-y-6 transform transition-all duration-500 delay-600 ${showCheck ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Video Creation Started! 🎉
                    </h2>

                    <div className="space-y-3">
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Your project <span className="font-semibold">"{projectName}"</span> is now being processed.
                        </p>

                        <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400">
                            <Mail className="w-5 h-5 text-blue-500" />
                            <span>We'll email you when it's ready ({estimatedTime})</span>
                        </div>
                    </div>
                </div>

                {/* Subtle loading indicator */}
                <div className={`mt-8 flex justify-center transition-opacity duration-300 delay-1000 ${showCheck ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 