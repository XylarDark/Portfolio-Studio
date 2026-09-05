import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : (null as unknown as SupabaseClient)

export function requireSupabase(): SupabaseClient {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    )
  }
  return supabase
}

export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
    return path
  }
  if (!isSupabaseConfigured) return null
  const { data } = supabase.storage.from('portfolio-media').getPublicUrl(path)
  return data.publicUrl
}
