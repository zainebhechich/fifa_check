"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface Order {
  id: string
  user_id: string | null
  status: string
  customer_email: string
  customer_name: string
  total_amount: number
  shipping_notes: string | null
  created_at: string
  updated_at: string
}

export async function getOrders(): Promise<Order[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching orders:", error.message)
    return []
  }
  return data as Order[]
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", orderId)

  if (error) {
    console.error("Error updating order status:", error.message)
    return { success: false, message: "Échec de la mise à jour du statut de la commande: " + error.message }
  }

  revalidatePath("/admin")
  return { success: true, message: "Statut de la commande mis à jour avec succès!" }
}
