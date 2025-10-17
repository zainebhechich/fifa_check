import { NextRequest, NextResponse } from "next/server"
import { getKonnectEnv } from "@/lib/supabase/env"

export const runtime = "nodejs"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const p = await params
  const { KONNECT_API_KEY } = getKonnectEnv()
  if (!KONNECT_API_KEY) {
    return NextResponse.json({ error: "Missing KONNECT_API_KEY" }, { status: 500 })
  }

  try {
    const res = await fetch(`https://api.konnect.network/api/v2/payments/${p.id}` , {
      method: "GET",
      headers: { "x-api-key": KONNECT_API_KEY },
      // Avoid Next from caching
      cache: "no-store",
    })

    const text = await res.text()
    let json: any
    try { json = JSON.parse(text) } catch { json = { raw: text } }

    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error", status: res.status, body: json }, { status: res.status })
    }

    return NextResponse.json(json)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 })
  }
}
