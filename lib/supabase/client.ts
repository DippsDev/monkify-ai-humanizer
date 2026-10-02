import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseEnv, isSupabaseConfigured } from './config'

export function createClient() {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv()

    if (!isSupabaseConfigured() || !supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase URL and Anon Key must be configured in .env.local')
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
