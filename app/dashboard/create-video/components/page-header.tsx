"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"

interface PageHeaderProps {
    title: string
    subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    const router = useRouter()
    const { setOpen } = useSidebar()

    const handleBackToDashboard = () => {
        setOpen(true)
        router.push('/dashboard')
    }

    return (
        <header className="bg-black text-white border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBackToDashboard}
                            className="text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <h1 className="text-lg font-semibold">{title}</h1>
                            {subtitle && (
                                <p className="text-sm text-gray-400">{subtitle}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
} 