import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecentProjects } from "@/components/dashboard/recent-projects"
import { CreateVideoSection } from "@/components/dashboard/create-video-section"

export default function DashboardPage() {
    return (
        <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
            <DashboardHeader />
            <main className="flex-1 p-6 space-y-8">
                <CreateVideoSection />
                <RecentProjects />
            </main>
        </div>
    )
}