import { useState, useCallback, useRef } from 'react'

interface StreamingEvent {
  type: 'progress' | 'complete' | 'error'
  progress: number
  message: string
  stage: string
  result?: any
  error?: string
}

export const useAIImageStreaming = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [stage, setStage] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  const eventSourceRef = useRef<EventSource | null>(null)

  const startStreaming = useCallback(async (payload: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      // Reset stati
      setIsStreaming(true)
      setProgress(0)
      setMessage('')
      setStage('')
      setResult(null)
      setError(null)

      // Crea EventSource con fetch API (POST data)
      const startEventSource = async () => {
        try {
          // Prima facciamo una POST per iniziare lo streaming
          const response = await fetch('/api/ai-images/generate-stream', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          // Leggi lo stream
          const reader = response.body?.getReader()
          if (!reader) {
            throw new Error('No response stream available')
          }

          const decoder = new TextDecoder()
          let buffer = ''

          const processStream = async () => {
            try {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break

                buffer += decoder.decode(value, { stream: true })
                
                // Processa messaggi SSE completi
                const lines = buffer.split('\n')
                buffer = lines.pop() || '' // Mantieni l'ultima linea parziale

                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    try {
                      const data: StreamingEvent = JSON.parse(line.slice(6))
                      
                      console.log('🎨 Streaming event:', data)
                      
                      setProgress(data.progress)
                      setMessage(data.message)
                      setStage(data.stage)

                      if (data.type === 'complete') {
                        setResult(data.result)
                        setIsStreaming(false)
                        resolve(data.result)
                        return
                      } else if (data.type === 'error') {
                        setError(data.error || 'Unknown error')
                        setIsStreaming(false)
                        reject(new Error(data.error || 'Streaming failed'))
                        return
                      }
                    } catch (parseError) {
                      console.warn('Failed to parse SSE data:', line)
                    }
                  }
                }
              }
            } catch (streamError) {
              console.error('Stream processing error:', streamError)
              setError('Stream processing failed')
              setIsStreaming(false)
              reject(streamError)
            }
          }

          await processStream()
          
        } catch (fetchError) {
          console.error('Fetch error:', fetchError)
          setError(fetchError instanceof Error ? fetchError.message : 'Fetch failed')
          setIsStreaming(false)
          reject(fetchError)
        }
      }

      startEventSource()
    })
  }, [])

  const stopStreaming = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    setIsStreaming(false)
  }, [])

  return {
    // State
    isStreaming,
    progress,
    message,
    stage,
    result,
    error,
    
    // Actions
    startStreaming,
    stopStreaming
  }
} 