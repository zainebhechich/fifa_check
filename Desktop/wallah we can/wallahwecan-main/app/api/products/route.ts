import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const supabase = getSupabaseAdmin()
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const sort = searchParams.get("sort")
  const admin = searchParams.get("admin")
  const page = Number(searchParams.get("page") || 1)
  const pageSize = Number(searchParams.get("pageSize") || 12)

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })

  // Only filter active products for public catalog (admin=1 bypasses)
  if (!admin) query = query.eq("is_active", true)

  if (category) query = query.eq("category", category)
  if (search) query = query.ilike("name", `%${search}%`)

  switch (sort) {
    case "price_asc":
      query = query.order("price", { ascending: true })
      break
    case "price_desc":
      query = query.order("price", { ascending: false })
      break
    case "name":
      query = query.order("name", { ascending: true })
      break
    default:
      query = query.order("created_at", { ascending: false })
  }

  // Apply pagination when requested
  const { data, error, count } = await query.range(from, to)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data, count, page, pageSize });
}

export async function POST(req: NextRequest) {
  const { name, description, price, category, stock, image_url, slug } = await req.json();

  if (!name || typeof price !== 'number') {
    return NextResponse.json({ error: 'Missing required fields: name, price (number)' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  // Generate slug if not provided
  const productSlug = (slug || name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const stockValue = typeof stock === 'number' ? stock : (stock ? Number.parseInt(String(stock)) : 0)

  // Insert the new product with full fields
  const baseSku = (name || productSlug).toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const sku = `${baseSku}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

  const { data, error } = await supabase
    .from("products")
    .insert([{
      id: randomUUID(),
      sku,
      name,
      slug: productSlug,
      description: description || null,
      price,
      category: category || null,
      stock: stockValue,
      image_url: image_url || null,
      is_active: stockValue > 0,
    }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ data });
}
