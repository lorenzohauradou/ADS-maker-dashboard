import { useState, useEffect, useRef } from 'react'

interface ProjectPhase {
  name: string
  description: string
  progress_range: [number, number]
  completed: boolean
  current: boolean
}

interface ProjectProgress {
  project_id: number
  project_name: string
  status: string
  progress: number
  progress_message: string
  current_phase: string
  phases: ProjectPhase[]
  estimated_time_remaining?: string
  results?: {
    landing_url?: string
    github_repo_url?: string
  }
}

interface UseProjectProgressOptions {
  projectId: number | string
  onComplete?: (results: any) => void
  onError?: (error: string) => void
  pollingInterval?: number
  enabled?: boolean
}

export const useProjectProgress = ({
  projectId,
  onComplete,
  onError,
  pollingInterval = 3000, // 🚀 Ridotto a 3 secondi 
  enabled = true
}: UseProjectProgressOptions) => {
  const [progress, setProgress] = useState<ProjectProgress | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(true)

  const fetchProgress = async () => {
    if (!enabled || !mountedRef.current) return

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/projects/${projectId}/progress`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      
      if (!mountedRef.current) return

      setProgress(data)

      // ✅ Completato con successo
      if (data.status === 'completed') {
        onComplete?.(data.results)
        stopPolling()
      }
      
      // ❌ Fallito
      else if (data.status === 'failed') {
        const errorMsg = data.progress_message || 'Elaborazione fallita'
        setError(errorMsg)
        onError?.(errorMsg)
        stopPolling()
      }

    } catch (err) {
      if (!mountedRef.current) return
      
      const errorMsg = err instanceof Error ? err.message : 'Errore di rete'
      setError(errorMsg)
      onError?.(errorMsg)
    } finally {
      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }

  const startPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    // Fetch immediatamente
    fetchProgress()
    
    // Poi ogni pollingInterval
    intervalRef.current = setInterval(fetchProgress, pollingInterval)
  }

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Start/stop polling basato su enabled
  useEffect(() => {
    if (enabled && projectId) {
      startPolling()
    } else {
      stopPolling()
    }

    return () => {
      stopPolling()
    }
  }, [enabled, projectId, pollingInterval])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false
      stopPolling()
    }
  }, [])

  return {
    progress,
    isLoading,
    error,
    refetch: fetchProgress,
    startPolling,
    stopPolling
  }
}

export default useProjectProgress 