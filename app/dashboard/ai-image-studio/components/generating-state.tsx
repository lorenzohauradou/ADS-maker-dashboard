import { Wand2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { GeneratingStateProps } from "../types"

export const GeneratingState = ({ progress, style }: GeneratingStateProps) => (
    <div className="text-center py-12 animate-in fade-in duration-500">
        <div className={`mx-auto w-20 h-20 bg-gradient-to-r ${style?.gradient || 'from-blue-500 to-purple-600'} rounded-full flex items-center justify-center mb-6 animate-rotate-glow`}>
            <Wand2 className="h-10 w-10 text-white" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {style?.id === 'transparent-bg' ? 'Removing background...' : 'Creating your marketing asset...'}
        </h3>
        <p className="text-slate-600 dark:text-zinc-400 mb-6">
            {style?.id === 'transparent-bg'
                ? 'Creating transparent PNG with professional cutout quality'
                : style
                    ? `Applying ${style.name} style with professional AI enhancement`
                    : 'Creating professional marketing asset with your custom instructions'
            }
        </p>

        <div className="max-w-xs mx-auto">
            <div className="progress-glow">
                <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-500 mt-2">
                {progress}% complete
            </p>
        </div>
    </div>
) 