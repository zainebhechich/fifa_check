import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const konnectApiKey = Deno.env.get('KONNECT_API_KEY')!

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    })

    // Get payment_ref from URL parameters (Konnect sends GET request)
    const url = new URL(req.url)
    const paymentRef = url.searchParams.get('payment_ref')

    if (!paymentRef) {
      console.error('Missing payment_ref parameter')
      return new Response(
        JSON.stringify({ error: 'Missing payment_ref parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Processing webhook for payment_ref:', paymentRef)

    // Get payment details from Konnect using the correct endpoint
    const konnectResponse = await fetch(`https://api.konnect.network/api/v2/payments/${paymentRef}`, {
      method: 'GET',
      headers: {
        'x-api-key': konnectApiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!konnectResponse.ok) {
      const errorText = await konnectResponse.text()
      console.error('Konnect API error:', errorText)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch payment details', details: errorText }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const konnectData = await konnectResponse.json()
    const konnectPayment = konnectData.payment

    if (!konnectPayment) {
      console.error('No payment data in Konnect response:', konnectData)
      return new Response(
        JSON.stringify({ error: 'Invalid payment data from Konnect' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Find the payment record in our database
    const { data: paymentRecord, error: paymentFindError } = await supabase
      .from('payments')
      .select('*, orders(*)')
      .eq('provider_payment_id', paymentRef)
      .single()

    if (paymentFindError || !paymentRecord) {
      console.error('Payment not found:', paymentFindError)
      return new Response(
        JSON.stringify({ error: 'Payment record not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Determine payment status based on Konnect response
    // According to docs: "completed" means successful, "pending" means failed or not attempted
    const isCompleted = konnectPayment.status === 'completed'
    const newPaymentStatus = isCompleted ? 'completed' : 'failed'
    const newOrderStatus = isCompleted ? 'confirmed' : 'cancelled'

    console.log('Payment status from Konnect:', konnectPayment.status)
    console.log('Updating to:', { newPaymentStatus, newOrderStatus })

    // Update payment record
    const { error: paymentUpdateError } = await supabase
      .from('payments')
      .update({
        status: newPaymentStatus,
        metadata: konnectData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', paymentRecord.id)

    if (paymentUpdateError) {
      console.error('Payment update error:', paymentUpdateError)
    }

    // Update order status
    const { error: orderUpdateError } = await supabase
      .from('orders')
      .update({
        status: newOrderStatus,
        payment_status: newPaymentStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', paymentRecord.order_id)

    if (orderUpdateError) {
      console.error('Order update error:', orderUpdateError)
    }

    // Log successful processing
    console.log('Webhook processed successfully:', {
      paymentRef,
      orderId: paymentRecord.order_id,
      status: newPaymentStatus
    })

    return new Response(
      JSON.stringify({
        success: true,
        payment_status: newPaymentStatus,
        order_status: newOrderStatus,
        order_id: paymentRecord.order_id,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
