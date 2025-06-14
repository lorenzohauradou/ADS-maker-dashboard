"use client"

import { useProgressStatusBar } from '@/hooks/use-progress-status-bar'
import { ProgressStatusBar } from './progress-status-bar'

export function ProgressStatusBarManager() {
    const {
        isVisible,
        progress,
        currentPhase,
        phases,
        projectName,
        status,
        hideProgress
    } = useProgressStatusBar()

    const handleViewProgress = () => {
        // Qui potresti aprire un modal dettagliato o navigare a una pagina di dettagli
        console.log('View progress details for:', projectName)
    }

    return (
        <ProgressStatusBar
            isVisible={isVisible}
            progress={progress}
            currentPhase={currentPhase}
            phases={phases}
            projectName={projectName}
            status={status}
            onDismiss={hideProgress}
            onViewProgress={handleViewProgress}
        />
    )
} 