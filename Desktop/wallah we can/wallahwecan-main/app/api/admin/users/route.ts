import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

// List users (profiles) for admin with email join
export async function GET(_req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, user_id, role, nom, prenom, created_at")
      .order("created_at", { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    // Fetch auth users to join emails
    const { data: usersList, error: listErr } = await supabase.auth.admin.listUsers()
    if (listErr) {
      // If listing users fails, still return profiles without email
      return NextResponse.json({ data: (profiles || []).map(p => ({ ...p, email: null })) })
    }
    const emailById = new Map<string, string | null>()
    for (const u of usersList?.users || []) {
      emailById.set(u.id, u.email ?? null)
    }

    const data = (profiles || []).map(p => ({
      ...p,
      email: emailById.get(p.user_id) ?? null,
    }))

    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Internal server error" }, { status: 500 })
  }
}

// Update role for a profile id
export async function PATCH(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    const { user_id, role } = await req.json()

    if (!user_id || !role) {
      return NextResponse.json({ error: "Missing user_id or role" }, { status: 400 })
    }

    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", user_id)

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Internal server error" }, { status: 500 })
  }
}
