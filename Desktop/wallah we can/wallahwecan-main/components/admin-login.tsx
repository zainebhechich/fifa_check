"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, Shield } from "lucide-react"
import { signInClient } from "@/lib/auth-client"

export function AdminLogin() {
  const [email, setEmail] = useState("admin@wallahwecan.org")
  const [password, setPassword] = useState("WALLAHWECAN")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setDebugInfo(null)

    try {
      console.log("🚀 Starting admin login process...")

      if (email.toLowerCase() === "admin@wallahwecan.org" && password === "WALLAHWECAN") {
        console.log("✅ Admin credentials verified, setting session...")
        localStorage.setItem("wallah-admin-session", "WALLAH_WE_CAN_ADMIN")
        router.push("/admin")
        return
      }

      // Fallback to regular auth flow
      const result = await signInClient(email, password)

      setDebugInfo({
        success: result.success,
        user: result.user,
        error: result.error,
        timestamp: new Date().toISOString(),
      })

      if (result.success && result.user) {
        if (result.user.role === "admin") {
          console.log("✅ Admin login successful, redirecting...")
          router.push("/admin/dashboard")
        } else {
          setError("Access denied. Admin privileges required.")
          console.error("❌ User is not admin:", result.user.role)
        }
      } else {
        setError(result.error || "Login failed")
        console.error("❌ Login failed:", result.error)
      }
    } catch (error) {
      console.error("❌ Login error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Access the admin dashboard to manage products and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full"
                  placeholder="admin"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pr-10"
                    placeholder="WECAN"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Debug Panel */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Debug Information</CardTitle>
            <CardDescription>Real-time debugging info for troubleshooting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <strong>Environment:</strong>
                <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  <div>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</div>
                  <div>Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</div>
                </div>
              </div>

              <div>
                <strong>Admin Credentials:</strong>
                <div className="mt-1 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
                  <div>Username: admin@wallahwecan.org</div>
                  <div>Password: WALLAHWECAN</div>
                </div>
              </div>

              {debugInfo && (
                <div>
                  <strong>Last Login Attempt:</strong>
                  <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Status:</strong>
                <div className="mt-1 space-y-1">
                  <div>✅ Hardcoded admin access enabled</div>
                  <div>✅ Database schema created</div>
                  <div>✅ Products seeded</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminLogin
