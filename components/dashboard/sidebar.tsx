"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/components/ui/sidebar"
import {
  Sidebar as SidebarPrimitive,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Home,
  FolderOpen,
  BarChart3,
  Settings,
  HelpCircle,
  Crown,
  Plus,
  ArrowUp,
  LogOut,
  Zap,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FolderOpen,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <SidebarPrimitive className="border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 backdrop-blur-xl shadow-xl">
      <SidebarHeader className="p-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 mb-6 hover:opacity-80 transition-opacity">
          <Image src="/adsmakerlogo.png" alt="ADS MAKER AI Logo" width={40} height={40} />
          {state === "expanded" && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ADS MAKER AI
              </h1>
              <Badge variant="secondary" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
                <Crown className="w-3 h-3 mr-1" />
                Pro Plan
              </Badge>
            </div>
          )}
        </Link>

        {/* Create New Video Button - Now redirects to dashboard */}
        <Button
          asChild
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-white border-0"
        >
          <Link href="/dashboard">
            <Plus className="w-5 h-5 mr-2" />
            {state === "expanded" ? "Create New Video" : ""}
          </Link>
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="w-full justify-start rounded-xl mb-1 hover:bg-slate-50 dark:hover:bg-zinc-800/50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-600/20 data-[active=true]:to-purple-600/20 data-[active=true]:border data-[active=true]:border-blue-500/30 border-0"
                  >
                    <Link href={item.url} className="flex items-center space-x-3 p-3">
                      <item.icon className="w-5 h-5" />
                      {state === "expanded" && <span className="font-medium">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        <SidebarSeparator className="bg-slate-200 dark:bg-zinc-800" />

        {/* Upgrade Plan */}
        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border-0"
        >
          <Sparkles className="w-5 h-5 mr-3" />
          {state === "expanded" && "Upgrade Plan"}
        </Button>

        {/* Help & Support */}
        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border-0"
        >
          <HelpCircle className="w-5 h-5 mr-3" />
          {state === "expanded" && "Help & Support"}
        </Button>

        {/* Logout */}
        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-red-400 border-0"
        >
          <LogOut className="w-5 h-5 mr-3" />
          {state === "expanded" && "Logout"}
        </Button>
      </SidebarFooter>
    </SidebarPrimitive>
  )
}
