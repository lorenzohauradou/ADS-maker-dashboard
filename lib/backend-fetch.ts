/**
 * 🚀 UTILITY per chiamate al backend con timeout e gestione errori
 * Risolve i problemi di timeout su Vercel
 */

interface BackendFetchOptions extends RequestInit {
    timeout?: number
  }
  
  export async function fetchBackend(
    endpoint: string, 
    options: BackendFetchOptions = {}
  ): Promise<Response> {
    const { timeout = 8000, ...fetchOptions } = options
    
    // 🌐 URL del backend - Usa NEXT_PUBLIC_API_URL per frontend
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
   * 🚨 Costanti timeout per diversi tipi di operazioni - AUMENTATI per stabilità
   */
  export const TIMEOUTS = {
    QUICK: 2000,      // 2s per check-limits, session (era 6s)
    NORMAL: 3000,     // 3s per increment-usage, projects (era 8s)  
    UPLOAD: 5000,     // 5s per upload immagini (era 15s)
    PROCESSING: 7000, // 7s per avvio workflow (era 20s)
  } as const 