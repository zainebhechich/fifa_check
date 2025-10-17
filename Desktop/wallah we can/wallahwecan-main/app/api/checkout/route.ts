import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSupabaseEnv, getKonnectEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // Read and validate environment variables at request time to avoid breaking builds without secrets
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = getServerSupabaseEnv();
    const { KONNECT_API_KEY, KONNECT_WALLET_ID } = getKonnectEnv();

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Server misconfiguration: missing Supabase env vars" }, { status: 500 });
    }
    if (!KONNECT_API_KEY || !KONNECT_WALLET_ID) {
      return NextResponse.json({ error: "Server misconfiguration: missing Konnect credentials" }, { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

  const { items, customer, billing: _billing, shipping: _shipping } = await req.json();
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }

    if (!customer || !customer.email) {
      return NextResponse.json({ error: "Customer information required" }, { status: 400 });
    }

    // Calculate total amount (in TND dinars)
    const totalAmount = items.reduce((sum: number, item: any) => sum + (Number(item.price) * Number(item.quantity)), 0);
    // Konnect expects TND amounts in millimes
    const amountInMillimes = Math.round(totalAmount * 1000);

    // Guest checkout - no authentication required
    const userId = null;

    // Save customer email to newsletter (non-blocking)
    try {
      await supabase
        .from('newsletter_subscriptions')
        .upsert({ 
          email: customer.email, 
          subscribed_at: new Date().toISOString() 
        }, { onConflict: 'email' });
    } catch (newsletterError) {
      console.warn('Newsletter subscription failed:', newsletterError);
    }

    // Create order in database with comprehensive billing/shipping data
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount, // TND
        status: 'pending',
        customer_email: customer.email,
        customer_name: customer.name || customer.email,
        shipping_notes: customer.address || null,
        payment_status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ 
        error: "Failed to create order", 
        details: orderError.message 
      }, { status: 500 })
    }

    // Create order items (matching existing schema)
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id || item.id,
      quantity: item.quantity,
      price: item.price, // TND
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Order items creation error:', itemsError)
      return NextResponse.json({ 
        error: "Failed to create order items", 
        details: itemsError.message 
      }, { status: 500 })
    }

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        order_id: order.id,
        amount: totalAmount,
        provider: 'konnect',
        status: 'pending',
        metadata: {
          customer_email: customer.email,
          customer_name: customer.name || customer.email,
          items_count: items.length
        }
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Payment creation error:', paymentError)
      return NextResponse.json({ 
        error: "Failed to create payment record", 
        details: paymentError.message 
      }, { status: 500 })
    }

    // Create Konnect payment
    const paymentReference = `order_${order.id}_${Date.now()}`;
    
    const konnectPayload = {
      receiverWalletId: KONNECT_WALLET_ID,
      token: "TND",
      amount: amountInMillimes,
      type: "immediate",
      description: `Order #${order.id} - WALLAH WE CAN`,
      acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR"],
      lifespan: 10,
      checkoutForm: true,
      addPaymentFeesToAmount: true,
      firstName: customer.name?.split(' ')[0] || customer.email,
      lastName: customer.name?.split(' ').slice(1).join(' ') || '',
      phoneNumber: customer.phone || '',
      email: customer.email,
      orderId: paymentReference,
      webhook: `${req.nextUrl.origin}/api/konnect/webhook`,
      theme: "light"
    };

    const konnectResponse = await fetch('https://api.konnect.network/api/v2/payments/init-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': KONNECT_API_KEY,
      },
      body: JSON.stringify(konnectPayload),
    });

    if (!konnectResponse.ok) {
      const errorData = await konnectResponse.text();
      console.error("Konnect API error:", errorData);
      return NextResponse.json({ 
        error: "Payment initialization failed", 
        details: errorData 
      }, { status: konnectResponse.status });
    }

    const konnectData = await konnectResponse.json();

    // Update order and payment with Konnect payment reference
    await supabase
      .from('orders')
      .update({ 
        payment_reference: paymentReference,
        payment_id: konnectData.paymentRef || konnectData.payment_ref,
      })
      .eq('id', order.id);

    // Update payment record with Konnect payment ID
    await supabase
      .from('payments')
      .update({
        provider_payment_id: konnectData.paymentRef || konnectData.payment_ref,
        metadata: {
          ...payment.metadata,
          konnect_payment_ref: konnectData.paymentRef || konnectData.payment_ref,
          payment_url: konnectData.payUrl
        }
      })
      .eq('id', payment.id);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      payment_url: konnectData.payUrl,
      payment_reference: paymentReference,
    });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
