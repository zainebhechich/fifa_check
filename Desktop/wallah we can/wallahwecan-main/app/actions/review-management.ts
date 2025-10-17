"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  is_approved: boolean
  profiles?: {
    nom: string | null
    prenom: string | null
  }
}

export async function getReviews(): Promise<Review[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching reviews:", error.message)
    return []
  }
  return data as Review[]
}

export async function createReview(formData: FormData) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { error: "Vous devez être connecté pour laisser un avis" }
    }

    // Get user profile to get the profile ID
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (profileError || !profile) {
      return { error: "Profil utilisateur introuvable" }
    }

    const productId = formData.get("product_id") as string
    const rating = parseInt(formData.get("rating") as string)
    const comment = formData.get("comment") as string

    if (!productId || !rating || rating < 1 || rating > 5) {
      return { error: "Données d'avis invalides" }
    }

    // Check if user already reviewed this product
    const { data: existingReview } = await supabase
      .from("reviews")
      .select("id")
      .eq("product_id", productId)
      .eq("user_id", profile.id)
      .single()

    if (existingReview) {
      return { error: "Vous avez déjà laissé un avis pour ce produit" }
    }

    // Create review using profile.id as user_id
    const { data, error } = await supabase
      .from("reviews")
      .insert([{
        product_id: productId,
        user_id: profile.id, // Use profile.id instead of auth user.id
        rating,
        comment: comment || null,
        is_approved: false, // Reviews need admin approval
        created_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) {
      console.error("Error creating review:", error)
      return { error: "Erreur lors de la création de l'avis" }
    }

    revalidatePath("/")
    return { success: true, data }
  } catch (error) {
    console.error("Create review error:", error)
    return { error: "Une erreur inattendue s'est produite" }
  }
}

export async function updateReviewStatus(id: string, isApproved: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from("reviews").update({ is_approved: isApproved }).eq("id", id)

  if (error) {
    console.error("Error updating review status:", error.message)
    return { success: false, message: "Échec de la mise à jour du statut de l'avis: " + error.message }
  }

  revalidatePath("/admin")
  return { success: true, message: "Statut de l'avis mis à jour avec succès!" }
}
