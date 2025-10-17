import { createClient } from "@supabase/supabase-js"
import { getServerSupabaseEnv } from "./env"

// Server-only Supabase client using the Service Role key (bypasses RLS).
// Never import this file from the client. It must remain server-only.
export function getSupabaseAdmin() {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = getServerSupabaseEnv()
  const url = SUPABASE_URL
  const serviceRoleKey = SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  }

  return createClient(url, serviceRoleKey)
}


