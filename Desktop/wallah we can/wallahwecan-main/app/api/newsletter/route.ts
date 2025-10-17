import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Try find existing first to avoid needing a unique index for upsert
    const { data: existing, error: findErr } = await supabase
      .from('newsletter_subscriptions')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (findErr && findErr.code !== 'PGRST116') {
      console.error('Newsletter find error:', findErr)
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter', details: findErr.message },
        { status: 500 }
      )
    }

    if (!existing) {
      const { error: insertErr } = await supabase
        .from('newsletter_subscriptions')
        .insert({ email, subscribed_at: new Date().toISOString() })

      if (insertErr) {
        console.error('Newsletter insert error:', insertErr)
        return NextResponse.json(
          { error: 'Failed to subscribe to newsletter', details: insertErr.message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
