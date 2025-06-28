import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"

export function LanguageBadge() {
    return (
        <div className="flex justify-center mt-8">
            <Badge
                variant="outline"
                className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 px-3 py-2 sm:px-6 sm:py-3 rounded-full backdrop-blur-sm"
            >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold mr-2 sm:mr-3 text-sm sm:text-base">Available in 50+ Languages</span>
                <div className="flex items-center space-x-1 sm:space-x-2 ml-1 sm:ml-2 border-l border-emerald-300 dark:border-emerald-600 pl-2 sm:pl-3">
                    <span className="text-sm sm:text-lg font-bold">🇮🇹</span>
                    <span className="text-sm sm:text-lg font-bold">🇬🇧</span>
                    <span className="text-sm sm:text-lg font-bold">🇪🇸</span>
                    <span className="hidden sm:inline text-lg font-bold">🇫🇷</span>
                    <span className="hidden sm:inline text-lg font-bold">🇩🇪</span>
                    <span className="hidden md:inline text-lg font-bold">🇺🇸</span>
                    <span className="hidden md:inline text-lg font-bold">🇵🇹</span>
                    <span className="hidden lg:inline text-lg font-bold">🇯🇵</span>
                    <span className="hidden lg:inline text-lg font-bold">🇰🇷</span>
                    <span className="text-xs sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium">+41 more</span>
                </div>
            </Badge>
        </div>
    )
} 