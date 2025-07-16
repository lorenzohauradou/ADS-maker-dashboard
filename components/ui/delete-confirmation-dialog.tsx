import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2, AlertTriangle } from "lucide-react"

interface DeleteConfirmationDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    description?: string
    itemName?: string
    itemType?: string
    isLoading?: boolean
}

export function DeleteConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    itemName,
    itemType = "item",
    isLoading = false
}: DeleteConfirmationDialogProps) {
    const displayTitle = title || `Delete ${itemType}`
    const displayDescription = description ||
        `Are you sure you want to delete ${itemName ? `"${itemName}"` : `this ${itemType}`}? This action cannot be undone.`

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-2xl">
                <AlertDialogHeader className="space-y-4">
                    {/* Icon */}
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>

                    {/* Title */}
                    <AlertDialogTitle className="text-center text-lg font-semibold text-slate-900 dark:text-white">
                        {displayTitle}
                    </AlertDialogTitle>

                    {/* Description */}
                    <AlertDialogDescription className="text-center text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                        {displayDescription}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                    {/* Cancel Button */}
                    <AlertDialogCancel
                        className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-900 dark:text-white border-slate-300 dark:border-zinc-600 rounded-xl py-2.5 font-medium transition-all duration-200"
                        disabled={isLoading}
                    >
                        Cancel
                    </AlertDialogCancel>

                    {/* Delete Button */}
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-2.5 font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
} 