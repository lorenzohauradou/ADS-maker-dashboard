"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Bell, User, Settings, LogOut, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function DashboardHeader() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-16 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-6 shadow-sm flex-shrink-0">
      {/* Left Side - Sidebar Trigger + Search */}
      <div className="flex items-center space-x-4 flex-1">
        <SidebarTrigger className="hover:bg-slate-100 dark:hover:bg-zinc-800/50 rounded-lg text-slate-600 dark:text-zinc-400" />

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-400" />
            <Input
              placeholder="Search projects, templates..."
              className="pl-10 bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800/50 text-slate-600 dark:text-zinc-400">
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800/50 text-slate-600 dark:text-zinc-400">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-blue-600 text-xs flex items-center justify-center text-white">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-xl">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-700 shadow-xl" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-slate-900 dark:text-white">John Doe</p>
                <p className="text-xs leading-none text-slate-500 dark:text-zinc-400">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200 dark:bg-zinc-700" />
            <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-200 dark:bg-zinc-700" />
            <DropdownMenuItem className="hover:bg-red-50 dark:hover:bg-zinc-800 text-red-600 dark:text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
