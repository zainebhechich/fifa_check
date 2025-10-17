import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    const { searchParams } = new URL(req.url)

    const status = searchParams.get("status") || undefined
    const search = searchParams.get("search") || undefined
    const page = Number(searchParams.get("page") || 1)
    const pageSize = Number(searchParams.get("pageSize") || 10)
    const summary = searchParams.get("summary") === "1"

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from("orders")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })

    if (status) query = query.eq("status", status)
    if (search) query = query.ilike("customer_email", `%${search}%`)

    const { data, error, count } = await query.range(from, to)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    if (summary) {
      // Build simple summary & daily revenue trend on the fly (last 30 days)
      const since = new Date()
      since.setDate(since.getDate() - 30)

      const { data: recent, error: recErr } = await supabase
        .from("orders")
        .select("total_amount, status, created_at")
        .gte("created_at", since.toISOString())
        .order("created_at", { ascending: true })

      if (recErr) return NextResponse.json({ error: recErr.message }, { status: 400 })

      let totalRevenue = 0
      let pending = 0
      let paid = 0
      const trendMap = new Map<string, number>()

      for (const o of recent || []) {
        if (o.status === "paid" || o.status === "completed" || o.status === "confirmed") {
          totalRevenue += Number(o.total_amount || 0)
          paid += 1
        }
        if (o.status === "pending") pending += 1

        const day = new Date(o.created_at).toISOString().slice(0, 10)
        trendMap.set(day, (trendMap.get(day) || 0) + Number(o.total_amount || 0))
      }

      const revenueTrend = Array.from(trendMap.entries()).map(([date, value]) => ({ date, value }))

      return NextResponse.json({ data, count, page, pageSize, summary: {
        totalOrders: count || 0,
        totalRevenue,
        paidOrders: paid,
        pendingOrders: pending,
        revenueTrend,
      } })
    }

    return NextResponse.json({ data, count, page, pageSize })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    const { order_id, status } = await req.json()

    if (!order_id || !status) {
      return NextResponse.json({ error: "Missing order_id or status" }, { status: 400 })
    }

    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", order_id)

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Internal server error" }, { status: 500 })
  }
}
