"use server"

import { createClient } from "@/lib/supabase/server"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  category: string
  stock: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export async function getAllProducts() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      return { error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Get all products error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function getActiveProducts() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      return { error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Get active products error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function getProductById(id: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) {
      return { error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Get product by ID error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function createProduct(productData: {
  name: string
  description: string
  price: number
  category: string
  stock: number
  image_url?: string | null
}) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          ...productData,
          is_active: true,
        },
      ])
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Create product error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function updateProduct(
  id: string,
  updates: Partial<{
    name: string
    description: string
    price: number
    category: string
    stock: number
    image_url: string | null
    is_active: boolean
  }>,
) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Update product error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function deleteProduct(id: string) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Delete product error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function toggleProductStatus(id: string) {
  try {
    const supabase = await createClient()

    // First get current status
    const { data: currentProduct, error: fetchError } = await supabase
      .from("products")
      .select("is_active")
      .eq("id", id)
      .single()

    if (fetchError) {
      return { error: fetchError.message }
    }

    // Toggle the status
    const { data, error } = await supabase
      .from("products")
      .update({
        is_active: !currentProduct.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Toggle product status error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function searchProducts(query: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      return { error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Search products error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      return { error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Get products by category error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function updateProductStock(id: string, newStock: number) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .update({
        stock: newStock,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Update product stock error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export const getProducts = getAllProducts
