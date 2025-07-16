"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, User, LogOut, ChevronDown } from "lucide-react"
import { useState } from "react"
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
    <header className="fixed bg-transparent backdrop-blur-sm top-0 w-full z-50 bg-black border-b border-gray-800/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - OpusClip style */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/fastadslogo.png"
              alt="FAST ADS AI Logo"
              width={32}
              height={32}
              className="object-contain w-full h-full"
            />
          </div>
          <span className="text-xl font-bold text-white">
            FAST ADS AI
          </span>
        </Link>

        {/* Navigation - OpusClip style */}
        <nav className="hidden lg:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Features
              <ChevronDown className="w-4 h-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-700">
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Link href="#features">All Features</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Solutions
              <ChevronDown className="w-4 h-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-700">
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Link href="#showcase">Showcase</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Resources
              <ChevronDown className="w-4 h-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-700">
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Link href="/blog">Blog</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Link href="#workflow">How it Works</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="#pricing"
            className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
          >
            Pricing
          </Link>

          {/* FastAdsSearch with New badge - OpusClip style */}
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/ai-image-studio"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              FastAdsSearch
            </Link>
            <Badge className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
              New
            </Badge>
          </div>
        </nav>

        {/* Auth Section - OpusClip style */}
        <div className="flex items-center space-x-4">
          {status === "loading" ? (
            <div className="w-6 h-6 animate-spin rounded-full border-2 border-gray-600 border-t-white"></div>
          ) : session ? (
            // User is authenticated
            <>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white text-sm font-medium hidden sm:block"
                asChild
              >
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback className="bg-gray-700 text-white text-xs">
                        {getUserInitials(session.user?.name, session.user?.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-gray-400">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-gray-800">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // User is not authenticated - OpusClip style
            <>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white text-sm font-medium hidden sm:block"
                asChild
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                className="bg-white text-black hover:bg-gray-100 text-sm font-medium px-4 py-2 rounded-full transition-all"
                asChild
              >
                <Link href="/login">
                  Sign up free
                </Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="lg:hidden text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu - OpusClip style */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black border-b border-gray-800">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-white transition-colors text-sm">
              Features
            </a>
            <a href="#showcase" className="block text-gray-300 hover:text-white transition-colors text-sm">
              Solutions
            </a>
            <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors text-sm">
              Resources
            </Link>
            <a href="#pricing" className="block text-gray-300 hover:text-white transition-colors text-sm">
              Pricing
            </a>
            <Link href="/dashboard/ai-image-studio" className="block text-gray-300 hover:text-white transition-colors text-sm">
              FastAdsSearch
            </Link>

            {session ? (
              <>
                <Link href="/dashboard" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block text-red-400 hover:text-red-300 transition-colors text-sm w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Sign in
                </Link>
                <Link href="/login" className="block text-white bg-gray-800 hover:bg-gray-700 transition-colors text-sm py-2 px-4 rounded">
                  Sign up - <span className="hidden md:block">It's</span> FREE
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
