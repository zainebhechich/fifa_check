import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

// GET all reviews or filter by product_id
export async function GET(req: NextRequest) {
  const supabase = getSupabaseAdmin()
  const { searchParams } = new URL(req.url);
  const product_id = searchParams.get("product_id");

  let query = supabase.from("reviews").select("*, profiles:profiles(id, nom, prenom)");

  if (product_id) query = query.eq("product_id", product_id);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// POST new review
export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    const { product_id, user_id, rating, comment } = await req.json();

    if (!product_id || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
    }

    // Allow reviews without user_id for guest reviews
    const reviewUserId = user_id || null;

    // Check if user already reviewed this product (only if user is logged in)
    if (reviewUserId) {
      const { data: existingReview } = await supabase
        .from("reviews")
        .select("id")
        .eq("product_id", product_id)
        .eq("user_id", reviewUserId)
        .single();

      if (existingReview) {
        return NextResponse.json({ error: "You have already reviewed this product" }, { status: 400 });
      }
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([{
        product_id,
        user_id: reviewUserId,
        rating,
        comment: comment || null,
        is_approved: false
      }])
      .select(`
        *,
        profiles:profiles(id, nom, prenom)
      `)
      .single();

    if (error) {
      console.error("Review creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const supabase = getSupabaseAdmin()
  const { review_id, approve } = await req.json();

  if (!review_id || typeof approve !== "boolean") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Optional: check if user is admin
  // const user = await requireAdmin(req);
  // if (user instanceof NextResponse) return user;

  const { data, error } = await supabase
    .from("reviews")
    .update({ is_approved: approve })
    .eq("id", review_id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ data });
}
