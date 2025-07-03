"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
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

    useEffect(() => {
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center px-8 py-12 max-w-md"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: showCheck ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="mx-auto w-20 h-20 mb-8"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
                    >
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="space-y-6"
                >
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
                </motion.div>

                {/* Subtle loading indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 flex justify-center"
                >
                    <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                                className="w-2 h-2 bg-blue-500 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
} 