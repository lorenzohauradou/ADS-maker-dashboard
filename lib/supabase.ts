import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is missing in environment variables.')
}

// 🔧 SERVER CLIENT - Solo per lato server
function createServerClient() {
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseServiceRoleKey || !supabaseUrl) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL are required for server client.')
    }

    return createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}

// Server client - solo per lato server
export function getSupabaseServerClient() {
    return createServerClient()
}

// Legacy export per compatibilità - sarà undefined se chiamato lato client
export const supabaseServerClient = typeof window === 'undefined' ? getSupabaseServerClient() : null

// 🔧 CLIENT - Per lato client (storage upload, etc.)
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseAnonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in environment variables.')
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey) 