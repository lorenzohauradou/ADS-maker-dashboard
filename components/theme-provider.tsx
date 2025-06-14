"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeProviderContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  // Only run on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme') as Theme
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    const initialTheme = savedTheme || systemTheme
    setTheme(initialTheme)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)

    // Save theme preference
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  // Prevent hydration mismatch by showing children only after mount
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  // During SSR/SSG, provide safe defaults instead of throwing an error
  if (context === undefined) {
    if (typeof window === "undefined") {
      // Server-side: return safe defaults
      return {
        theme: "dark" as Theme,
        setTheme: () => { },
        toggleTheme: () => { }
      }
    }
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
