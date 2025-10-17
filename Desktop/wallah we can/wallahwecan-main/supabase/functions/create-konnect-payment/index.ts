import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const konnectApiKey = Deno.env.get('KONNECT_API_KEY')! // Format: walletId:apiKey
const konnectWalletId = Deno.env.get('KONNECT_WALLET_ID')! // 67e68b7c90a055ddd8c2d20a

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    })

    const { items, customer, success_url, cancel_url, user_id } = await req.json()

    if (!items || !Array.isArray(items) || !customer) {
      return new Response(
        JSON.stringify({ error: 'Invalid payload. Required: items, customer' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Calculate total in EUR
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)

    // Create order (allow guest orders with null user_id)
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: null, // Always null for guest checkout
        total_amount: total,
        status: 'pending',
        payment_status: 'pending',
        customer_email: customer.email,
        customer_name: customer.name,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return new Response(
        JSON.stringify({ error: 'Failed to create order', details: orderError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const orderId = orderData.id

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items error:', itemsError)
      return new Response(
        JSON.stringify({ error: 'Failed to create order items', details: itemsError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prepare webhook URL
    const webhookUrl = `${req.headers.get('origin')}/api/konnect/webhook`

    // Calculate amount in centimes for EUR (multiply by 100)
    const amountInCentimes = Math.round(total * 100) // Convert to centimes for EUR

    // Call Konnect API with correct format
    const konnectPayload = {
      receiverWalletId: konnectWalletId,
      token: "EUR",
      amount: amountInCentimes,
      type: "immediate",
      description: `Commande WALLAH WE CAN #${orderId}`,
      acceptedPaymentMethods: ["wallet", "bank_card"],
      lifespan: 60, // 1 hour
      checkoutForm: true,
      addPaymentFeesToAmount: false,
      firstName: customer.firstName || customer.name?.split(' ')[0] || '',
      lastName: customer.lastName || customer.name?.split(' ').slice(1).join(' ') || '',
      phoneNumber: customer.phoneNumber || '',
      email: customer.email,
      orderId: orderId,
      webhook: webhookUrl,
      theme: "light"
    }

    const konnectResponse = await fetch('https://api.konnect.network/api/v2/payments/init-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': konnectApiKey,
      },
      body: JSON.stringify(konnectPayload),
    })

    if (!konnectResponse.ok) {
      const errorText = await konnectResponse.text()
      console.error('Konnect API error:', errorText)
      
      // Update order status to failed
      await supabase
        .from('orders')
        .update({ status: 'failed', payment_status: 'failed' })
        .eq('id', orderId)

      return new Response(
        JSON.stringify({ error: 'Payment provider error', details: errorText }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const konnectData = await konnectResponse.json()

    // Store payment record with Konnect payment reference
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert({
        order_id: orderId,
        amount: total,
        provider: 'konnect',
        provider_payment_id: konnectData.paymentRef,
        status: 'pending',
        metadata: konnectData,
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Payment record error:', paymentError)
      return new Response(
        JSON.stringify({ error: 'Failed to store payment record', details: paymentError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderId,
        payment_url: konnectData.payUrl,
        payment_ref: konnectData.paymentRef,
        payment: paymentData,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
