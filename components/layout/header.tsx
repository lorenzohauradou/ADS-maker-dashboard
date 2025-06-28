"use client"

import { Button } from "@/components/ui/button"
import { Play, Zap, Menu, Sun, Moon, User, LogOut } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { data: session, status } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const getUserInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    if (email) {
      return email.slice(0, 2).toUpperCase()
    }
    return "U"
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
            <Image
              src="/fastadslogo.png"
              alt="FAST ADS AI Logo"
              width={40}
              height={40}
              className="object-contain w-full h-full"
            />
          </div>
          <span className="text-base sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
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
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200 text-lg font-medium"
          >
            Blog
          </Link>
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

          {/* Auth Section */}
          {status === "loading" ? (
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-muted border-t-foreground"></div>
          ) : session ? (
            // User is authenticated
            <>
              <Button
                variant="outline"
                className="text-foreground hover:bg-accent rounded-xl px-4 py-2 hidden sm:flex items-center gap-2"
                asChild
              >
                <Link href="/dashboard">
                  <Play className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {getUserInitials(session.user?.name, session.user?.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // User is not authenticated
            <>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-lg hidden sm:block" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-3 py-2 sm:px-6 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 text-white text-sm sm:text-base" asChild>
                <Link href="/login">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  Try Free
                </Link>
              </Button>
            </>
          )}

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
            <Link href="/blog" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-lg">
              Blog
            </Link>
            <a href="#pricing" className="block text-muted-foreground hover:text-foreground transition-colors duration-200 text-lg">
              Pricing
            </a>

            {session ? (
              <>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-foreground text-lg w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 text-lg w-full justify-start"
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground text-lg w-full justify-start"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
