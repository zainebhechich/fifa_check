import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase/admin";

export async function GET(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");
  const status = searchParams.get("status");

  let query = supabase.from("orders").select(`
    *,
    order_items (
      *,
      products (
        id,
        name,
        image_url,
        sku
      )
    )
  `);

  if (userId) {
    query = query.eq("user_id", userId);
  }

  if (status) {
    query = query.eq("status", status);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  const { user_id, items } = await req.json();

  if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Calculate total
  const total_amount = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

  // Insert order
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert([{ user_id, total_amount }])
    .select()
    .single();

  if (orderError) return NextResponse.json({ error: orderError.message }, { status: 400 });

  // Insert order items
  const itemsToInsert = items.map((item: { product_id: string; quantity: number; price: number }) => ({
    order_id: orderData.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price
  }));

  const { data: itemsData, error: itemsError } = await supabase.from("order_items").insert(itemsToInsert);

  if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 400 });

  return NextResponse.json({ order: orderData, items: itemsData });
}
