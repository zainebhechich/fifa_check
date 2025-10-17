"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { createClient as createBrowserSupabaseClient } from '@/lib/supabase/client'

interface Profile {
  id: string
  user_id: string
  full_name: string | null
  role: string
  avatar_url: string | null
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  isAdmin: boolean
  signOut: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      // Use regular client - RLS policies should handle access
      const supabase = createBrowserSupabaseClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('id, user_id, nom, prenom, role')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        
        // Try to auto-create profile if it doesn't exist
        if (error.code === 'PGRST116') {
          try {
            // Get user email for defaults
            const { data: { user } } = await supabase.auth.getUser()
            const email = user?.email || ''
            
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert({
                user_id: userId,
                nom: email.split('@')[0] || 'Utilisateur',
                prenom: '',
                role: 'user'
              })
              .select('id, user_id, nom, prenom, role')
              .single()

            if (!createError && newProfile) {
              return {
                ...newProfile,
                full_name: `${newProfile.prenom || ''} ${newProfile.nom || ''}`.trim() || 'Utilisateur',
                avatar_url: null
              }
            }
          } catch (createErr) {
            console.error('Failed to auto-create profile:', createErr)
          }
        }
        
        // Return default profile to prevent infinite loading
        return {
          id: userId, // Use userId as string for UUID
          user_id: userId,
          full_name: 'User',
          role: 'user',
          avatar_url: null
        }
      }
      
      // Transform to match expected format
      if (data) {
        return {
          ...data,
          full_name: `${data.prenom || ''} ${data.nom || ''}`.trim() || 'User',
          avatar_url: null
        }
      }
      return null
    } catch (error) {
      console.error('Profile fetch error:', error)
      // Return default profile on any error
      return {
        id: userId, // Use userId as string for UUID
        user_id: userId,
        full_name: 'User',
        role: 'user',
        avatar_url: null
      }
    }
  }

  const refreshUser = async () => {
    try {
      const supabase = createBrowserSupabaseClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        setUser(null)
        setProfile(null)
        setLoading(false)
        return
      }

      setUser(user)
      const profileData = await fetchProfile(user.id)
      setProfile(profileData)
      setLoading(false)
    } catch (error) {
      console.error('Refresh user error:', error)
      setUser(null)
      setProfile(null)
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = createBrowserSupabaseClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        return { error }
      }

      if (data.user) {
        setUser(data.user)
        const profileData = await fetchProfile(data.user.id)
        setProfile(profileData)
      }

      return { error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      const supabase = createBrowserSupabaseClient()
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const supabase = createBrowserSupabaseClient()
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          setLoading(false)
          return
        }

        if (session?.user) {
          setUser(session.user)
          const profileData = await fetchProfile(session.user.id)
          setProfile(profileData)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      } catch (error) {
        console.error('Auth initialization error:', error)
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const supabase = createBrowserSupabaseClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth state change:', event, session?.user?.email)
        
        if (session?.user) {
          setUser(session.user)
          const profileData = await fetchProfile(session.user.id)
          setProfile(profileData)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
    signIn,
    signOut,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
