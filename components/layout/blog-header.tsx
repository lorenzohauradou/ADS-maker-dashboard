"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon, User, LogOut } from "lucide-react"
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

export function BlogHeader() {
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
        <header className="fixed top-0 w-full z-50 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                        <Image
                            src="/fastadslogo.png"
                            alt="FAST ADS AI Logo"
                            width={32}
                            height={32}
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                        Fast Ads AI
                    </span>
                </Link>

                {/* Navigazione centrale */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link
                        href="/"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                        Community
                    </Link>
                    <Link
                        href="/#pricing"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                        Enterprise
                    </Link>
                    <Link
                        href="/blog"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                        Learn
                    </Link>
                    <Link
                        href="/#demo"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                        Shipped
                    </Link>
                </nav>

                {/* Azioni destra */}
                <div className="flex items-center space-x-3">
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                        {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </Button>

                    {/* Auth Section */}
                    {status === "loading" ? (
                        <div className="w-6 h-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-zinc-600 dark:border-t-white"></div>
                    ) : session ? (
                        // User is authenticated
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 hidden sm:flex"
                                asChild
                            >
                                <Link href="/dashboard">
                                    Dashboard
                                </Link>
                            </Button>

                            {/* User Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                                            <AvatarFallback className="bg-gray-600 dark:bg-zinc-600 text-white text-xs">
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
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 hidden sm:flex"
                                asChild
                            >
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button
                                size="sm"
                                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-4 py-2 text-sm font-medium"
                                asChild
                            >
                                <Link href="/login">
                                    Get started
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
} 