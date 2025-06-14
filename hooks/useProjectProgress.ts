import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { trackLimitEvent } from '@/lib/posthog-pricing-enforcement'

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
  const { data: session } = useSession()
  const [progress, setProgress] = useState<ProjectProgress | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(true)

  const fetchProgress = useCallback(async () => {
    if (!projectId || !session?.user?.id) {
      console.log('⏭️ Skipping progress fetch: no projectId or session')
      return
    }

    try {
      console.log(`📊 Fetching progress for project ${projectId}`)
      
      const response = await fetch(`/api/projects/${projectId}/progress`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch progress`)
      }

      const data = await response.json()
      
      console.log('📊 Progress data received:', {
        status: data.status,
        percentage: data.percentage,
        current_step: data.current_step,
        projectId
      })

      // 🔥 TRACCIA AGGIORNAMENTI DELLO STATO DEL PROGETTO
             // Usa la funzione setProgress per accedere al valore precedente evitando loop
      setProgress((prevProgress) => {
        if (data.status !== prevProgress?.status && session?.user?.id) {
          trackLimitEvent({
            eventType: 'limit_check',
            userId: session.user.id,
            plan: 'free', // Sarà aggiornato dall'hook subscription
            videosUsed: 0, // Sarà aggiornato
            videosLimit: 1, // Sarà aggiornato
            action: 'create_video',
            metadata: {
              source: 'project_progress_hook',
              project_id: projectId,
              status_change: {
                from: prevProgress?.status,
                to: data.status
              },
              progress_percentage: data.percentage,
              current_step: data.current_step,
              progress_tracking_update: true
            }
          })
        }

        // 🔥 TRACCIA COMPLETAMENTO VIDEO (aggiorna limiti!)
        if (data.status === 'completed' && prevProgress?.status !== 'completed' && session?.user?.id) {
          trackLimitEvent({
            eventType: 'limit_check',
            userId: session.user.id,
            plan: 'free',
            videosUsed: 1, // Video completato = +1 utilizzo
            videosLimit: 1,
            action: 'create_video',
            metadata: {
              source: 'project_progress_hook',
              project_id: projectId,
              video_completed: true,
              usage_bar_should_update: true,
              new_video_count_expected: true
            }
          })
        }

        // 🔥 TRACCIA ERRORI DI CREAZIONE VIDEO
        if (data.status === 'failed' && prevProgress?.status !== 'failed' && session?.user?.id) {
          trackLimitEvent({
            eventType: 'limit_check',
            userId: session.user.id,
            plan: 'free',
            videosUsed: 0,
            videosLimit: 1,
            action: 'create_video',
            metadata: {
              source: 'project_progress_hook',
              project_id: projectId,
              video_creation_failed: true,
              error_occurred: true,
              usage_bar_unchanged: true
            }
          })
        }

        return data
      })

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

    } catch (error) {
      console.error('❌ Error fetching progress:', error)
      
      // 🔥 TRACCIA ERRORI DI POLLING
      if (session?.user?.id) {
        trackLimitEvent({
          eventType: 'limit_check',
          userId: session.user.id,
          plan: 'free',
          videosUsed: 0,
          videosLimit: 1,
          action: 'check_limits',
          metadata: {
            source: 'project_progress_hook',
            project_id: projectId,
            polling_error: true,
            error: error instanceof Error ? error.message : 'unknown',
            progress_tracking_failed: true
          }
        })
      }
      
      setError(error instanceof Error ? error.message : 'Failed to fetch progress')
      stopPolling()
    }
  }, [projectId, session?.user?.id, onComplete, onError])

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