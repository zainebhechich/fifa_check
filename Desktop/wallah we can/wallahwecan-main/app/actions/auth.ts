"use server"

import { createClient } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function signIn(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const redirect = (formData.get("redirect") as string) || null

    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Supabase auth error:", error)
      return { error: error.message }
    }

    if (data.user) {
      // Get user data from profiles table
      const admin = getSupabaseAdmin()
      const { data: userData, error: userError } = await admin
        .from("profiles")
        .select("id, user_id, role, nom, prenom")
        .eq("user_id", data.user.id)
        .single()

      if (userError || !userData) {
        // Auto-create minimal profile if missing
        const { error: upsertError } = await admin
          .from("profiles")
          .upsert({ id: data.user.id, user_id: data.user.id, role: "user" }, { onConflict: "id" })

        if (upsertError) {
          console.error("Error creating missing profile:", upsertError)
          return { error: "User profile not found" }
        }

        // Re-fetch
        const refetch = await admin
          .from("profiles")
          .select("id, user_id, role, nom, prenom")
          .eq("user_id", data.user.id)
          .single()
        const newUserData = refetch.data
        
        return {
          success: true,
          user: data.user,
          userData: newUserData,
          isAdmin: newUserData?.role === "admin",
          redirectTo: redirect,
        }
      }

      return {
        success: true,
        user: data.user,
        userData: userData,
        isAdmin: userData?.role === "admin",
        redirectTo: redirect,
      }
    }

    return { error: "Authentication failed" }
  } catch (error) {
    console.error("Sign in error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function signOut() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Sign out error:", error)
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Sign out error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function getCurrentUser() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return { user: null, userData: null, isAdmin: false }
    }

    // Get user data from profiles table
    const admin = getSupabaseAdmin()
    const { data: userData, error: userError } = await admin
      .from("profiles")
      .select("id, user_id, role, nom, prenom")
      .eq("user_id", user.id)
      .single()

    if (userError) {
      console.error("Error fetching user data:", userError)
      return { user: null, userData: null, isAdmin: false }
    }

    return {
      user,
      userData: userData,
      isAdmin: userData?.role === "admin",
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return { user: null, userData: null, isAdmin: false }
  }
}

export async function signUp(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string

    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    // Create user immediately via Admin and confirm email
    const admin = getSupabaseAdmin()
    const { data: adminCreate, error: adminCreateError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName || null },
    })

    if (adminCreateError) {
      console.error("Admin createUser error:", adminCreateError)
      if (adminCreateError.message.includes('email_exists') || adminCreateError.message.includes('already been registered')) {
        return { error: "Un compte avec cette adresse email existe déjà. Veuillez vous connecter." }
      }
      return { error: adminCreateError.message }
    }

    const createdUser = adminCreate?.user
    if (!createdUser) {
      return { error: "User creation failed" }
    }

    // Upsert profile row (bypass RLS with service role)
    const [prenom, ...rest] = (fullName || "").trim().split(" ")
    const nom = rest.join(" ") || null
    const { error: profileError } = await admin
      .from("profiles")
      .upsert(
        {
          id: createdUser.id,
          user_id: createdUser.id,
          prenom: prenom || null,
          nom,
          role: "user",
        },
        { onConflict: "id" }
      )

    if (profileError) {
      console.error("Create profile error:", profileError)
      return { error: profileError.message || "Failed to create user profile" }
    }

    return { success: true, message: "Account created successfully. You can now log in." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred" }
  }
}
