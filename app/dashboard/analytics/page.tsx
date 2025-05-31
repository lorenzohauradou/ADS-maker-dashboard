import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AnalyticsContent } from "@/components/dashboard/analytics-content"

export default function AnalyticsPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <AnalyticsContent />
      </main>
    </div>
  )
}
