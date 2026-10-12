import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null | undefined

export function getSupabaseClient() {
  if (supabase !== undefined) return supabase

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  supabase = url && key ? createClient(url, key) : null
  return supabase
}
