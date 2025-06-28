"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Play, ArrowLeft, Sparkles, Maximize2, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DemoPage() {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <main className="min-h-screen bg-background">
            <Header />
            {/* Hero Section with Video */}
            <section className="pt-24 pb-8 px-4 relative overflow-hidden">
                {/* Enhanced Background Effects - same as hero */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-500"></div>
                <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-1000"></div>

                <div className="container mx-auto text-center relative z-10">
                    {/* Back Button */}
                    <div className="flex justify-start mb-6">
                        <Button
                            variant="ghost"
                            className="text-muted-foreground hover:text-foreground transition-colors group"
                            asChild
                        >
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    {/* Title Section */}
                    <Badge
                        variant="secondary"
                        className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-semibold">
                            Tutorial Demo
                        </span>
                    </Badge>

                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Learn how to{" "}
                        <span className="relative">
                            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-600 bg-clip-text text-transparent">
                                transform
                            </span>
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50"></div>
                        </span>
                        <br />
                        your images into{" "}
                        <span className="relative">
                            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 dark:from-purple-400 dark:via-pink-400 dark:to-purple-600 bg-clip-text text-transparent">
                                professional video ads
                            </span>
                        </span>
                    </h1>

                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        A complete tutorial that guides you step-by-step through creating your video advertisements with artificial intelligence.
                    </p>

                    {/* Video Container */}
                    <div className="max-w-5xl mx-auto">
                        <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 rounded-3xl p-8 border border-slate-700/40 shadow-xl backdrop-blur-md">
                            {/* Elegant overlay with subtle gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-3xl pointer-events-none"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl pointer-events-none"></div>

                            {/* Expandable Video Player */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="relative bg-black rounded-2xl overflow-hidden aspect-video cursor-pointer group transition-all duration-300 hover:scale-[1.02]">
                                        {/* Expand Button Overlay */}
                                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Button size="sm" variant="secondary" className="bg-black/60 hover:bg-black/80 text-white border-none">
                                                <Maximize2 className="w-4 h-4 mr-1" />
                                                Expand
                                            </Button>
                                        </div>

                                        {/* Enhanced Placeholder */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                                            {/* Animated background elements */}
                                            <div className="absolute top-4 left-4 w-3 h-3 bg-blue-500/30 rounded-full animate-pulse"></div>
                                            <div className="absolute top-8 right-8 w-2 h-2 bg-purple-500/40 rounded-full animate-pulse delay-300"></div>
                                            <div className="absolute bottom-6 left-8 w-2.5 h-2.5 bg-cyan-500/30 rounded-full animate-pulse delay-700"></div>
                                            <div className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-pink-500/40 rounded-full animate-pulse delay-1000"></div>

                                            <div className="text-center relative z-10">
                                                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse group-hover:scale-110 transition-transform duration-300">
                                                    <Play className="w-16 h-16 text-white ml-2" />
                                                </div>
                                                <h3 className="text-3xl font-bold text-white mb-4">Demo Tutorial Video</h3>
                                                <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
                                                    Watch how to create professional video ads from product images in just minutes
                                                </p>
                                                <div className="flex justify-center space-x-2">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
                                                </div>
                                                <p className="text-blue-400 text-sm mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                                    Click to expand fullscreen
                                                </p>
                                            </div>
                                        </div>

                                        {/* When you have the actual video, replace the above div with: */}
                                        {/*
                                        <video
                                          className="w-full h-full object-contain"
                                          controls
                                          poster="/path-to-your-thumbnail.jpg"
                                        >
                                          <source src="/path-to-your-video.mp4" type="video/mp4" />
                                          Your browser does not support the video tag.
                                        </video>
                                        */}
                                    </div>
                                </DialogTrigger>

                                <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 bg-black border-none sm:max-w-[95vw] sm:max-h-[95vh] sm:rounded-lg">
                                    <DialogTitle className="sr-only">Demo Tutorial Video - Expanded View</DialogTitle>
                                    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">

                                        {/* Expanded Video Content */}
                                        <div className="w-full h-full max-w-7xl bg-gradient-to-br from-gray-900 via-slate-900 to-black rounded-lg flex items-center justify-center sm:max-h-[80vh] sm:aspect-video">
                                            {/* Same placeholder as above but responsive */}
                                            <div className="text-center px-4 sm:px-8">
                                                <div className="w-24 h-24 sm:w-32 md:w-40 sm:h-32 md:h-40 mx-auto mb-6 sm:mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                                                    <Play className="w-12 h-12 sm:w-16 md:w-20 sm:h-16 md:h-20 text-white ml-1 sm:ml-2" />
                                                </div>
                                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Demo Tutorial Video</h3>
                                                <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed">
                                                    Watch how to create professional video ads from product images in just minutes
                                                </p>
                                                <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30 text-sm sm:text-base md:text-lg px-3 sm:px-4 py-1.5 sm:py-2">
                                                    ✨ Complete Tutorial • About 10 minutes
                                                </Badge>
                                            </div>

                                            {/* When you have the actual video, replace with: */}
                                            {/*
                                            <video
                                              className="w-full h-full object-contain rounded-lg"
                                              controls
                                              autoPlay
                                              poster="/path-to-your-thumbnail.jpg"
                                            >
                                              <source src="/path-to-your-video.mp4" type="video/mp4" />
                                              Your browser does not support the video tag.
                                            </video>
                                            */}
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* Video Info */}
                            <div className="mt-6 text-center">
                                <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border-green-500/30">
                                    ✨ Complete Tutorial • About 10 minutes
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-12 max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            Ready to get started?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            After watching the tutorial, start creating your video advertisements right away.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-purple-600 hover:to-purple-700 text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group text-white"
                                asChild
                            >
                                <Link href="/login">
                                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    Start Free
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-border text-foreground hover:bg-accent text-lg px-8 py-4 rounded-xl backdrop-blur-sm hover:border-border/80 transition-all duration-300"
                                asChild
                            >
                                <Link href="/">
                                    Learn More
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
} 