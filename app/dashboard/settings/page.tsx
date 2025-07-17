'use client';

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SettingsContent } from "@/components/dashboard/settings-content"

export default function SettingsPage() {
    const handleFixStuckProjects = async () => {
        try {
            const response = await fetch('/api/creatify/fix-stuck-projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result.success) {
                alert(`✅ Riparati ${result.fixed_projects} progetti bloccati!`);
            } else {
                alert(`❌ Errore: ${result.message}`);
            }
        } catch (error) {
            alert(`❌ Errore di rete: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`);
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950">
            <DashboardHeader />
            <main className="flex-1 p-6">
                <SettingsContent />
                <div className="mt-6 p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <h3 className="font-semibold text-orange-800 mb-2">🔧 Debug Tools</h3>
                    <button
                        onClick={handleFixStuckProjects}
                        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                    >
                        Ripara Progetti Bloccati
                    </button>
                    <p className="text-sm text-orange-600 mt-1">
                        Risolve progetti con video completati ma status "processing"
                    </p>
                </div>
            </main>
        </div>
    )
}