/**
 * 🚀 UTILITY per chiamate al backend con timeout e gestione errori
 */

interface BackendFetchOptions extends RequestInit {
    timeout?: number
  }
  
  export async function fetchBackend(
    endpoint: string, 
    options: BackendFetchOptions = {}
  ): Promise<Response> {
  const { timeout = 15000, ...fetchOptions } = options
    
  // 🌐 URL del backend
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'http://localhost:8000'
    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`
    
    // ⏱️ Setup timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      console.warn(`🚨 Backend timeout dopo ${timeout}ms per ${endpoint}`)
      controller.abort()
    }, timeout)
    
    try {
      console.log(`📡 Backend call: ${endpoint}`)
      
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        console.error(`❌ Backend error ${response.status}: ${endpoint}`)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      console.log(`✅ Backend success: ${endpoint}`)
      return response
      
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error && error.name === 'AbortError') {
        console.error(`⏱️ Backend timeout: ${endpoint}`)
        throw new Error(`Timeout dopo ${timeout}ms per ${endpoint}`)
      }
      
      console.error(`💥 Backend error: ${endpoint}`, error)
      throw error
    }
  }
  
  /**
   * 🔧 Helper per chiamate JSON al backend
   */
  export async function fetchBackendJson<T = any>(
    endpoint: string, 
    options: BackendFetchOptions = {}
  ): Promise<T> {
    const response = await fetchBackend(endpoint, options)
    return response.json()
  }
  
  /**
 * 🚨 Timeout per diversi tipi di operazioni
   */
  export const TIMEOUTS = {
  QUICK: 15000,     // 15s per check-limits, projects
  NORMAL: 20000,    // 20s per operazioni DB
  UPLOAD: 30000,    // 30s per upload immagini
  PROCESSING: 60000, // 60s per avvio workflow
  } as const 