import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseEnv, isSupabaseConfigured } from './config'

export async function createClient() {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv()

    if (!isSupabaseConfigured() || !supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase URL and Anon Key must be configured in .env.local')
    }

    const cookieStore = await cookies()

    return createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
