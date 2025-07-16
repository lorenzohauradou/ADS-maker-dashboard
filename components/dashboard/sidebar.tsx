"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { useUserLimits } from "@/hooks/use-user-limits"
import { useSubscriptionLimits } from "@/hooks/use-subscription-limits"
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
  Settings,
  Crown,
  Plus,
  LogOut,
  Sparkles,
  // Layout,
  User,
  Image as ImageIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { UnifiedVideoWizard } from "@/components/dashboard/unified-video-wizard"
import { trackBypassAttempt } from '@/lib/posthog-pricing-enforcement'

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
    title: "AI Image Studio",
    url: "/dashboard/ai-image-studio",
    icon: ImageIcon,
  },
  {
    title: "Custom Avatars",
    url: "/dashboard/custom-avatars",
    icon: User,
  },
  // {
  //   title: "Analytics",
  //   url: "/dashboard/analytics",
  //   icon: BarChart3,
  // },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { state, setOpen } = useSidebar()
  const { data: session } = useSession()
  const { plan, loading: limitsLoading, can_create_video } = useUserLimits()
  const { checkCanCreateVideo, showLimitExceededToast } = useSubscriptionLimits()

  // State for unified wizard
  const [isUnifiedWizardOpen, setIsUnifiedWizardOpen] = useState(false)

  const handleCreateNewVideo = async () => {
    // Check limits with automatic tracking
    const { canCreate, message } = await checkCanCreateVideo()

    if (!canCreate) {
      if (session?.user?.id) {
        trackBypassAttempt({
          plan: (plan || 'free') as any,
          videos_per_month: 1,
          videos_used: 1,
          videos_remaining: 0,
          can_create_video: false,
          extra_video_price: 9.0,
          userId: session.user.id
        }, 'sidebar_create_button_click')
      }
      showLimitExceededToast()
      return
    }

    // Open unified wizard
    setIsUnifiedWizardOpen(true)
  }

  const handleSmartUpgrade = async () => {
    if (!session?.user?.id) {
      router.push('/#pricing')
      return
    }

    try {
      const response = await fetch(`/api/subscriptions/smart-upgrade/${session.user.id}`)
      const data = await response.json()

      if (data.success && data.stripe_plan_type) {
        const stripeResponse = await fetch('/api/stripe/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            planType: data.stripe_plan_type,
            userId: session.user.id
          })
        })

        const stripeData = await stripeResponse.json()
        if (stripeData.url) {
          window.location.href = stripeData.url
        } else {
          router.push('/#pricing')
        }
      } else {
        router.push('/#pricing')
      }
    } catch (error) {
      console.error('Smart upgrade error:', error)
      router.push('/#pricing')
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const handleCloseUnifiedWizard = () => {
    setIsUnifiedWizardOpen(false)
  }

  const handleCompleteUnifiedWizard = async (wizardData: any) => {
    setIsUnifiedWizardOpen(false)
    // The wizard handles the video creation internally
    // User will be notified via email when the video is ready
  }

  return (
    <>
      <SidebarPrimitive className="border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 backdrop-blur-xl shadow-xl">
        <SidebarHeader className="p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 mb-6 hover:opacity-80 transition-opacity">
            <Image src="/fastadslogo.png" alt="FAST ADS AI Logo" width={40} height={40} />
            {state === "expanded" && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  FAST ADS AI
                </h1>
                {!limitsLoading && (
                  <Badge
                    variant="secondary"
                    className={`text-xs border ${plan === 'free'
                      ? 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      : plan === 'starter'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : plan === 'pro'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      }`}
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    {plan === 'free' ? 'Free Plan' :
                      plan === 'starter' ? 'Starter Plan' :
                        plan === 'pro' ? 'Pro Plan' :
                          plan === 'business' ? 'Business Plan' : 'Enterprise Plan'}
                  </Badge>
                )}
              </div>
            )}
          </Link>

          {/* Create New Video Button - opens modal OR upgrade */}
          {!limitsLoading && can_create_video ? (
            <Button
              onClick={handleCreateNewVideo}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-white border-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              {state === "expanded" ? "Create New Video" : ""}
            </Button>
          ) : !limitsLoading ? (
            <Button
              onClick={handleSmartUpgrade}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-white border-0"
            >
              <Crown className="w-5 h-5 mr-2" />
              {state === "expanded" ? "Upgrade Plan" : ""}
            </Button>
          ) : (
            <Button
              disabled
              className="w-full bg-slate-300 dark:bg-zinc-700 rounded-xl text-slate-500 dark:text-zinc-400 border-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              {state === "expanded" ? "Loading..." : ""}
            </Button>
          )}
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

          {/* User Info (quando expanded) */}
          {state === "expanded" && session && (
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {session.user?.name || "User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 truncate">
                {session.user?.email}
              </p>
            </div>
          )}

          {/* Upgrade Plan */}
          <Button
            variant="ghost"
            className="w-full justify-start rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border-0"
          >
            <Sparkles className="w-5 h-5 mr-3" />
            {state === "expanded" && "Upgrade Plan"}
          </Button>


          {/* Logout */}
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="w-full justify-start rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 border-0 cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {state === "expanded" && "Logout"}
          </Button>
        </SidebarFooter>
      </SidebarPrimitive>

      {/* Unified Video Wizard */}
      {isUnifiedWizardOpen && (
        <UnifiedVideoWizard
          isOpen={isUnifiedWizardOpen}
          onClose={handleCloseUnifiedWizard}
          onComplete={handleCompleteUnifiedWizard}
        />
      )}
    </>
  )
}
