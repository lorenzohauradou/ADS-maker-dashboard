"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight, Sparkles, Zap, Star, Menu, Sun, Moon, Globe } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <section className="pt-32 pb-16 px-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-500"></div>
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-1000"></div>

      <div className="container mx-auto text-center relative z-10">
        <Badge
          variant="secondary"
          className="mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-semibold">
            Transform Your Video Marketing
          </span>
        </Badge>

        <h1 className="text-4xl md:text-8xl font-bold mb-8 leading-tight">
          From{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-600 bg-clip-text text-transparent">
              1-5 images
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50"></div>
          </span>
          <br />to professional video ads
          <br />
          <span className="relative">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 dark:from-purple-400 dark:via-pink-400 dark:to-purple-600 bg-clip-text text-transparent">
              in 5 minutes
            </span>
            <div className="absolute -top-4 -right-4">
              <Zap className="w-8 h-8 text-yellow-500 animate-bounce" />
            </div>
          </span>
        </h1>

        <p className="text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          The AI that transforms your product images into{" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium">high-converting video ads</span> & {" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium">websites</span>.
          <br />
          Optimized scripts, ultra-realistic voice, and perfect output for every social platform.
        </p>

        {/* Multilingual Support Badge */}
        <div className="flex justify-center mb-8">
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 px-3 py-2 sm:px-6 sm:py-3 rounded-full backdrop-blur-sm"
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold mr-2 sm:mr-3 text-sm sm:text-base">Available in 50+ Languages</span>
            <div className="flex items-center space-x-1 sm:space-x-2 ml-1 sm:ml-2 border-l border-emerald-300 dark:border-emerald-600 pl-2 sm:pl-3">
              <span className="text-sm sm:text-lg font-bold">🇮🇹</span>
              <span className="text-sm sm:text-lg font-bold">🇬🇧</span>
              <span className="text-sm sm:text-lg font-bold">🇪🇸</span>
              <span className="hidden sm:inline text-lg font-bold">🇫🇷</span>
              <span className="hidden sm:inline text-lg font-bold">🇩🇪</span>
              <span className="hidden md:inline text-lg font-bold">🇺🇸</span>
              <span className="hidden md:inline text-lg font-bold">🇵🇹</span>
              <span className="hidden lg:inline text-lg font-bold">🇯🇵</span>
              <span className="hidden lg:inline text-lg font-bold">🇰🇷</span>
              <span className="text-xs sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium">+41 more</span>
            </div>
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-purple-600 hover:to-purple-700 text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group text-white"
            asChild
          >
            <Link href="/login">
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Start Free Trial
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-border text-foreground hover:bg-accent text-xl px-12 py-6 rounded-2xl backdrop-blur-sm hover:border-border/80 transition-all duration-300 group"
            asChild
          >
            <Link href="#showcase" className="scroll-smooth">
              Watch Demo
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-lg">No credit card required</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse delay-300"></div>
            <span className="text-lg">1 free video</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse delay-700"></div>
            <span className="text-lg">AI generated landing page</span>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">4.9/5 from 2,847 users</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Used by <span className="font-semibold text-foreground">10,000+</span> businesses to create converting video ads
          </p>
        </div>
      </div>
    </section>
  )
}
