import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectsContent } from "@/components/dashboard/projects-content"

export default function ProjectsPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
      <DashboardHeader />
      <main className="flex-1 p-6">
        <ProjectsContent />
      </main>
    </div>
  )
}
