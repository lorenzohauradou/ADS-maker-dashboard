import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CustomPromptInputProps } from "../types"

export const CustomPromptInput = ({ value, onChange, disabled }: CustomPromptInputProps) => (
    <div className="space-y-2">
        <Label className="text-slate-700 dark:text-zinc-300 font-medium">
            Custom Instructions
        </Label>
        <Textarea
            placeholder="Describe how you want to transform your Product"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="min-h-[80px] bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:border-slate-400 focus:ring-slate-400/20 resize-none"
        />
        <p className="text-xs text-slate-500 dark:text-zinc-500">
            💡 <strong>Tip:</strong> You can use custom instructions to have full control
        </p>
    </div>
) 