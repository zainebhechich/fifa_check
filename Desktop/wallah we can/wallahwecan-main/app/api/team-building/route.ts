import { NextResponse } from 'next/server'
import { createClient as createSupabaseServerClient } from '@/lib/supabase/server'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'
import { getServerSupabaseEnv } from '@/lib/supabase/env'

export const runtime = 'nodejs'

// Accept inquiries from the Team Building form and store them in Supabase
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      companyName,
      contactPerson,
      email,
      phone,
      teamSize,
      preferredDates,
      serviceInterests,
      budget,
      message,
      newsletter,
      terms,
    } = body || {}

    if (!companyName || !contactPerson || !email || !phone || !teamSize || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Prefer using service role to bypass RLS if needed
  const { SUPABASE_URL: url, SUPABASE_SERVICE_ROLE_KEY: serviceKey } = getServerSupabaseEnv()

    if (!url || !serviceKey) {
      // Fallback to server client (subject to RLS)
      const supabase = await createSupabaseServerClient()
      const { error } = await supabase
        .from('team_building_inquiries')
        .insert([
          {
            company_name: companyName,
            contact_person: contactPerson,
            email,
            phone,
            team_size: Number(teamSize),
            preferred_dates: preferredDates || null,
            service_interests: Array.isArray(serviceInterests) ? serviceInterests : [],
            budget: budget || null,
            message,
            newsletter: !!newsletter,
            terms_accepted: !!terms,
            created_at: new Date().toISOString(),
          },
        ])

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const admin = createSupabaseAdmin(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })
    const { error } = await admin
      .from('team_building_inquiries')
      .insert([
        {
          company_name: companyName,
          contact_person: contactPerson,
          email,
          phone,
          team_size: Number(teamSize),
          preferred_dates: preferredDates || null,
          service_interests: Array.isArray(serviceInterests) ? serviceInterests : [],
          budget: budget || null,
          message,
          newsletter: !!newsletter,
          terms_accepted: !!terms,
          created_at: new Date().toISOString(),
        },
      ])

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
