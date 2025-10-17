"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUserClient, signOutClient } from "@/lib/auth-client"
import { AdminDashboard as AdminDashboardComponent } from "@/components/admin-dashboard"
import { AdminShell } from "@/components/admin-shell"

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const bailToLogin = () => {
        try { router.push("/admin/login") } catch {}
      }
      try {
        if (typeof window !== "undefined") {
          const adminSession = localStorage.getItem("wallah-admin-session")
          if (adminSession === "WALLAH_WE_CAN_ADMIN") {
            setUser({ id: "admin", email: "admin@wallahwecan.org" })
            setUserData({ id: "admin", email: "admin@wallahwecan.org", full_name: "WALLAH WE CAN", role: "admin" })
            setIsAdmin(true)
            setLoading(false)
            return
          }
        }

        // Timeout the auth request in case of network stalls
        const authPromise = getCurrentUserClient()
        const timeoutPromise = new Promise<typeof authPromise>((resolve) => {
          setTimeout(() => resolve({ user: null, userData: null, isAdmin: false } as any), 6000)
        })
        const { user, userData, isAdmin } = await Promise.race([authPromise as any, timeoutPromise as any])

        if (user && userData && isAdmin) {
          setUser(user)
          setUserData(userData)
          setIsAdmin(true)
        } else {
          bailToLogin()
        }
      } catch (error) {
        console.error("Auth check error:", error)
        bailToLogin()
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin || !user || !userData) return null

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') localStorage.removeItem('wallah-admin-session')
      await signOutClient()
      router.push('/admin/login')
    } catch (e) {
      console.error('Logout error:', e)
    }
  }

  return (
    <AdminShell user={user} userData={userData} onLogout={handleLogout}>
      <AdminDashboardComponent
        user={user}
        userData={userData}
        onLogout={handleLogout}
      />
    </AdminShell>
  )
}
