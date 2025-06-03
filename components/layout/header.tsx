"use client"

import { Button } from "@/components/ui/button"
import { Play, Zap, Menu, Sun, Moon } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
            <Image
              src="/adsmakerlogo.png"
              alt="ADS MAKER AI Logo"
              width={40}
              height={40}
              className="object-contain w-full h-full"
            />
          </div>
          <span className="hidden sm:block text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            FAST ADS AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-10">
          <a
            href="#showcase"
            className="text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200 text-lg font-medium"
          >
            Showcase
          </a>
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200 text-lg font-medium"
          >
            Features
          </a>
          <a
            href="#workflow"
            className="text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200 text-lg font-medium"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200 text-lg font-medium"
          >
            Pricing
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl hover:bg-accent">
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-lg hidden sm:block" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 text-white" asChild>
            <Link href="/login">
              <Play className="w-5 h-5 mr-2" />
              Try Free
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="#showcase" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-lg">
              Showcase
            </a>
            <a href="#features" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-lg">
              Features
            </a>
            <a href="#workflow" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-lg">
              How it Works
            </a>
            <a href="#pricing" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-lg">
              Pricing
            </a>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground text-lg w-full justify-start"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
