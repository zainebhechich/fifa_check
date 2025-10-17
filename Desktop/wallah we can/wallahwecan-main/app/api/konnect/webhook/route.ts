import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getServerSupabaseEnv, getKonnectEnv } from '@/lib/supabase/env'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = getServerSupabaseEnv()
    const { KONNECT_API_KEY } = getKonnectEnv()

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Server misconfiguration: missing Supabase env vars' }, { status: 500 })
    }
    if (!KONNECT_API_KEY) {
      return NextResponse.json({ error: 'Server misconfiguration: missing Konnect credentials' }, { status: 500 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    const { searchParams } = new URL(request.url)
    const paymentRef = searchParams.get('payment_ref')

    if (!paymentRef) {
      console.error('Missing payment_ref parameter')
      return NextResponse.json(
        { error: 'Missing payment_ref parameter' },
        { status: 400 }
      )
    }

    console.log('Processing Konnect webhook for payment_ref:', paymentRef)

    // Get payment status from Konnect API
    const konnectResponse = await fetch(`https://api.konnect.network/api/v2/payments/${paymentRef}`, {
      method: 'GET',
      headers: {
        'x-api-key': KONNECT_API_KEY,
      },
    });

    if (!konnectResponse.ok) {
      console.error("Konnect API error:", await konnectResponse.text());
      return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
    }

    const paymentData = await konnectResponse.json();
    const paymentStatus = paymentData.payment?.status || 'failed';

    // Find order by payment reference
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('payment_id', paymentRef)
      .single()

    if (orderError || !order) {
      console.error('Order not found for payment_ref:', paymentRef)
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Update order status based on payment status
    let orderStatus = 'failed';
    if (paymentStatus === 'completed' || paymentStatus === 'success') {
      orderStatus = 'completed';
    } else if (paymentStatus === 'pending') {
      orderStatus = 'pending';
    } else if (paymentData.payment && paymentData.payment.status === 'failed') {
      orderStatus = 'cancelled'
    }

    const { error: updateError } = await supabase
      .from('orders')
      .update({ 
        status: orderStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id)

    if (updateError) {
      console.error('Failed to update order status:', updateError)
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      )
    }

    console.log(`Order ${order.id} updated to status: ${orderStatus}`)

    // Redirect user based on payment status
  const baseUrl = request.nextUrl.origin
    if (orderStatus === 'completed') {
      return NextResponse.redirect(`${baseUrl}/checkout/success?order_id=${order.id}`)
    } else {
      return NextResponse.redirect(`${baseUrl}/checkout/cancel?order_id=${order.id}`)
    }

  } catch (error: any) {
    console.error('Webhook route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
