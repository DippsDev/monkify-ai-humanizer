const PLACEHOLDER_URL = 'your_supabase_project_url'
const PLACEHOLDER_KEY = 'your_supabase_anon_key'

export function getSupabaseEnv() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    return { supabaseUrl, supabaseAnonKey }
}

export function isSupabaseConfigured() {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv()

    return Boolean(
        supabaseUrl &&
        supabaseAnonKey &&
        supabaseUrl !== PLACEHOLDER_URL &&
        supabaseAnonKey !== PLACEHOLDER_KEY
    )
}
