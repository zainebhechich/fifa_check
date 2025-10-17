// Centralized environment access helpers for Supabase and related services.
// - Server code should prefer SUPABASE_URL / SUPABASE_ANON_KEY (non-public)
// - Client code must use NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
// These functions do not throw at import time to avoid breaking builds when
// envs are missing in CI; call them inside handlers and handle missing vars.

export function getServerSupabaseEnv() {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } as const;
}

export function getClientSupabaseEnv() {
  const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } as const;
}

export function getKonnectEnv() {
  const KONNECT_API_KEY = process.env.KONNECT_API_KEY;
  const KONNECT_WALLET_ID = process.env.KONNECT_WALLET_ID;
  return { KONNECT_API_KEY, KONNECT_WALLET_ID } as const;
}
