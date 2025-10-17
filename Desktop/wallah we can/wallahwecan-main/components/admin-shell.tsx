"use client"

import { ReactNode, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, BarChart3, Package, Users, Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface AdminShellProps {
  children: ReactNode
  user?: any
  userData?: any
  onLogout?: () => void
}

export function AdminShell({ children, user, userData, onLogout }: AdminShellProps) {
  const [activeHash, setActiveHash] = useState("overview")

  useEffect(() => {
    const updateHash = () => {
      const hash = window.location.hash.replace('#', '') || 'overview'
      setActiveHash(hash)
    }
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const navigation = [
    { name: "Overview", href: "/admin/dashboard#overview", icon: BarChart3, key: "overview" },
    { name: "Products", href: "/admin/dashboard#products", icon: Package, key: "products" },
    { name: "Orders", href: "/admin/dashboard#orders", icon: ShoppingCart, key: "orders" },
    { name: "Users", href: "/admin/dashboard#users", icon: Users, key: "users" },
    { name: "Reviews", href: "/admin/dashboard#reviews", icon: Star, key: "reviews" },
  ]

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          filter: "contrast(100%) brightness(100%)",
        }}
      />
      <div className="relative z-10 text-white">
        {/* Topbar */}
        <header className="sticky top-0 z-40 bg-white/10 border-b border-white/20 backdrop-blur-md supports-[backdrop-filter]:bg-white/10">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-3">
                <Link href="/fr" className="inline-flex items-center"> {/* PHASE 1 i18n fix: default to FR */}
                  <img src="/wallah-logo.png" alt="Wallah We Can" className="h-6 sm:h-8 w-auto" />
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-brand-gradient">Admin Dashboard</h1>
                  <p className="text-xs text-white/80">{userData?.full_name || userData?.email || user?.email || "Admin"}</p>
                </div>
              </div>
              {onLogout && (
                <Button onClick={onLogout} variant="outline" className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        </header>

      {/* Mobile quick nav (chips) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:hidden pt-4">
        <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Admin sections mobile">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeHash === item.key
            return (
              <Link
                key={`m-${item.key}`}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  try {
                    window.location.hash = item.key
                    try { window.dispatchEvent(new HashChangeEvent('hashchange')) } catch {}
                    setActiveHash(item.key)
                  } catch {}
                }}
                className={cn(
                  "relative shrink-0 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ring-1",
                  isActive
                    ? "text-white ring-white/30"
                    : "text-white/80 ring-white/20 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-pill-mobile"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 w-3.5 h-3.5" />
                <span className="relative z-10">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Body with left sidebar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block md:sticky md:top-[72px] h-max bg-white/10 border border-white/20 rounded-lg p-2 backdrop-blur-md">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible whitespace-nowrap" aria-label="Admin sections">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = activeHash === item.key
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    try {
                      window.location.hash = item.key
                      try { window.dispatchEvent(new HashChangeEvent('hashchange')) } catch {}
                      setActiveHash(item.key)
                    } catch {}
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill-nav"
                      className="absolute inset-0 rounded-md bg-white/10 ring-1 ring-white/20"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={cn("relative z-10 w-4 h-4 transition-colors", isActive ? "text-white" : "text-white/70 group-hover:text-white")}/>
                  <span className="relative z-10">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-w-0">
          {children}
        </main>
      </div>
      </div>
    </div>
  )
}
