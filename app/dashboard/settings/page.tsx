import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SettingsContent } from "@/components/dashboard/settings-content"

export default function SettingsPage() {
    return (
        <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
            <DashboardHeader />
            <main className="flex-1 p-6">
                <SettingsContent />
            </main>
        </div>
    )
}