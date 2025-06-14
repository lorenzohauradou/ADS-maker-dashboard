"use client"

import { useState, useCallback } from 'react'

export interface ProjectPhase {
  name: string
  description: string
  progress_range: [number, number]
  completed: boolean
  current: boolean
}

interface ProgressStatusState {
  isVisible: boolean
  progress: number
  currentPhase: string
  phases: ProjectPhase[]
  projectName: string
  projectId?: number | string
  status: 'processing' | 'completed' | 'failed'
}

// Global state for progress status bar
let globalProgressState: ProgressStatusState = {
  isVisible: false,
  progress: 0,
  currentPhase: 'Initializing',
  phases: [],
  projectName: '',
  projectId: undefined,
  status: 'processing'
}

const listeners: Array<(state: ProgressStatusState) => void> = []

const updateGlobalState = (newState: Partial<ProgressStatusState>) => {
  globalProgressState = { ...globalProgressState, ...newState }
  listeners.forEach(listener => listener(globalProgressState))
}

export function useProgressStatusBar() {
  const [state, setState] = useState<ProgressStatusState>(globalProgressState)

  // Subscribe to global state changes
  useState(() => {
    const listener = (newState: ProgressStatusState) => {
      setState(newState)
    }
    listeners.push(listener)
    
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  })

  const showProgress = useCallback((projectName: string, projectId?: number | string) => {
    updateGlobalState({
      isVisible: true,
      progress: 0,
      currentPhase: 'Initializing',
      phases: [],
      projectName,
      projectId,
      status: 'processing'
    })
  }, [])

  const updateProgress = useCallback((progress: number, currentPhase?: string, phases?: ProjectPhase[]) => {
    updateGlobalState({
      progress: Math.min(Math.max(progress, 0), 100), // Clamp between 0-100
      currentPhase: currentPhase || globalProgressState.currentPhase,
      phases: phases || globalProgressState.phases,
      status: 'processing'
    })
  }, [])

  const completeProgress = useCallback(() => {
    updateGlobalState({
      progress: 100,
      status: 'completed',
      currentPhase: 'Completed'
    })
  }, [])

  const failProgress = useCallback((error?: string) => {
    updateGlobalState({
      status: 'failed',
      currentPhase: error || 'Failed'
    })
  }, [])

  const hideProgress = useCallback(() => {
    updateGlobalState({
      isVisible: false
    })
  }, [])

  const resetProgress = useCallback(() => {
    updateGlobalState({
      isVisible: false,
      progress: 0,
      currentPhase: 'Initializing',
      phases: [],
      projectName: '',
      projectId: undefined,
      status: 'processing'
    })
  }, [])

  return {
    ...state,
    showProgress,
    updateProgress,
    completeProgress,
    failProgress,
    hideProgress,
    resetProgress
  }
}

// Hook personalizzato per semplificare l'utilizzo
export function useVideoCreationProgress() {
  const {
    isVisible,
    progress,
    currentPhase,
    phases,
    projectName,
    projectId,
    status,
    showProgress,
    updateProgress,
    completeProgress,
    failProgress,
    hideProgress,
    resetProgress
  } = useProgressStatusBar()

  // Funzione per avviare un nuovo processo di creazione video
  const startVideoCreation = (projectName: string, projectId?: number | string) => {
    showProgress(projectName, projectId)
  }

  // Funzione per aggiornare il progresso basato sui dati del backend
  const updateFromBackend = (backendProgress: any) => {
    if (!backendProgress) return

    const progress = backendProgress.progress || 0
    const currentPhase = backendProgress.current_phase || backendProgress.progress_message
    const phases = backendProgress.phases || []

    updateProgress(progress, currentPhase, phases)

    // Gestisci completamento automatico
    if (backendProgress.status === 'completed' || progress >= 100) {
      setTimeout(() => {
        completeProgress()
      }, 500)
    } else if (backendProgress.status === 'failed') {
      failProgress(backendProgress.progress_message || 'Creation failed')
    }
  }

  // Funzione per gestire la chiusura manuale
  const handleDismiss = () => {
    hideProgress()
  }

  return {
    // State
    isVisible,
    progress,
    currentPhase,
    phases,
    projectName,
    projectId,
    status,
    
    // Actions
    startVideoCreation,
    updateProgress,
    updateFromBackend,
    completeProgress,
    failProgress,
    handleDismiss,
    resetProgress,
    
    // Computed
    isProcessing: status === 'processing',
    isCompleted: status === 'completed',
    isFailed: status === 'failed'
  }
} 