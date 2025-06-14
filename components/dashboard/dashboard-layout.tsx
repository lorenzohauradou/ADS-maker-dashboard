"use client"

import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 dark:text-white flex w-full">
        <Sidebar />
        <SidebarInset className="flex-1 flex flex-col min-w-0">{children}</SidebarInset>
      </div>
    </SidebarProvider>
  )
}
