"use client"

import { createClient as createBrowserSupabaseClient } from "@/lib/supabase/client"

export async function signInClient(email: string, password: string) {
  try {
    const supabase = createBrowserSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { success: false, error: error.message }
    }

    let role: string | null = null
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, nom, prenom, id")
        .eq("user_id", data.user?.id || "")
        .single()
      role = profile?.role || null
  } catch {}

    return { success: true, user: { id: data.user?.id, email, role } }
  } catch (e: any) {
    return { success: false, error: e?.message || "Unknown error" }
  }
}

export async function getCurrentUserClient() {
  const supabase = createBrowserSupabaseClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    return { user: null, userData: null, isAdmin: false }
  }

  let userData: any = null
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, user_id, role, nom, prenom")
      .eq("user_id", user.id)
      .single()

    userData = profile ? {
      id: profile.id,
      email: user.email,
      full_name: `${profile.prenom || ''} ${profile.nom || ''}`.trim() || user.email,
      role: profile.role || 'user'
    } : null
  } catch {}

  // Fallback to localStorage admin session if present
  let isAdmin = false
  try {
    if (typeof window !== 'undefined') {
      const adminSession = localStorage.getItem("wallah-admin-session")
      if (adminSession === "WALLAH_WE_CAN_ADMIN") isAdmin = true
    }
  } catch {}

  if (!isAdmin) {
    isAdmin = (userData?.role === 'admin')
  }

  return { user, userData, isAdmin }
}

export async function signOutClient() {
  const supabase = createBrowserSupabaseClient()
  await supabase.auth.signOut()
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("wallah-admin-session")
    }
  } catch {}
  return { success: true }
}