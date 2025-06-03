import type React from "react"
import type { Metadata } from "next"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export const metadata: Metadata = {
  title: {
    default: 'Dashboard | Fast Ads AI',
    template: '%s | Fast Ads AI Dashboard'
  },
  description: 'Fast Ads AI Dashboard - Create and manage your video ad campaigns',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
