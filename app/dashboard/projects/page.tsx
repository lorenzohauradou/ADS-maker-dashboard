import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectsContent } from "@/components/dashboard/projects-content"

export default function ProjectsPage() {
    return (
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-zinc-950">
            <DashboardHeader />
            <main className="flex-1 p-6 overflow-auto">
                <ProjectsContent />
            </main>
        </div>
    )
}