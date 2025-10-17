"use client"


import { useState, useEffect, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2,
  Plus,
  Package,
  ShoppingCart,
  BarChart3,
  Loader2,
  Upload,
} from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination"
import dynamic from "next/dynamic"
import { signOutClient } from "@/lib/auth-client"
// import { supabase as createSupabaseClient } from "@/lib/supabase/client" // unused currently
import Image from "next/image"

interface AdminDashboardProps {
  user: any
  userData: any
  onLogout?: () => void
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

interface User {
  id: string
  email: string
  full_name: string | null
  role: "user" | "admin"
  is_active: boolean
  created_at: string
  updated_at: string
}

export function AdminDashboard({ user: _user, userData: _userData, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Overview summary
  const [summary, setSummary] = useState<{ totalOrders: number; totalRevenue: number; paidOrders: number; pendingOrders: number; revenueTrend: { date: string; value: number }[] } | null>(null)
  const [rangeDays, setRangeDays] = useState<number>(30)

  // Products search & pagination
  const [productSearch, setProductSearch] = useState("")
  const [productPage, setProductPage] = useState(1)
  const [productPageSize, _setProductPageSize] = useState(10)
  const [productTotal, setProductTotal] = useState(0)

  // Orders filters & pagination
  const [orderStatus, setOrderStatus] = useState<string | null>(null)
  const [orderSearch, setOrderSearch] = useState("")
  const [orderPage, setOrderPage] = useState(1)
  const [orderPageSize, _setOrderPageSize] = useState(10)
  const [orderTotal, setOrderTotal] = useState(0)

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Coffrets",
    stock: "",
    image_url: "",
  })
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productDialogOpen, setProductDialogOpen] = useState(false)

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [uploadingImage, setUploadingImage] = useState(false)

  const FALLBACK_IMAGE = "/placeholder.svg"

  // const supabase = createSupabaseClient // not used in this component currently

  useEffect(() => {
    // Sync activeTab with URL hash
    const hash = window.location.hash.replace('#', '') || 'overview'
    if (hash !== activeTab) {
      setActiveTab(hash)
    }
  }, [])

  useEffect(() => {
    // Update URL hash when activeTab changes
    if (typeof window !== 'undefined') {
      if (window.location.hash.replace('#','') !== activeTab) {
        window.location.hash = activeTab
      }
    }
  }, [activeTab])

  useEffect(() => {
    // React to external hash changes (e.g., clicking left sidebar)
    const onHash = () => {
      const hash = window.location.hash.replace('#', '') || 'overview'
      setActiveTab(hash)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts()
    } else if (activeTab === "users") {
      fetchUsers()
    } else if (activeTab === "reviews") {
      fetchReviews()
    } else if (activeTab === "orders" || activeTab === "overview") {
      fetchOrders()
      fetchSummary()
      fetchReviews()
    }
  }, [activeTab, rangeDays])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const qs = new URLSearchParams({ admin: "1", page: String(productPage), pageSize: String(productPageSize) })
      if (productSearch) qs.set("search", productSearch)
      const response = await fetch(`/api/products?${qs.toString()}`)
      const result = await response.json()

      if (!response.ok) {
        setError("Failed to fetch products: " + result.error)
      } else {
        setProducts(result.data || [])
        setProductTotal(result.count || 0)
      }
    } catch (e) {
      console.error('Excel export error', e)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const resp = await fetch("/api/admin/users")
      const json = await resp.json()
      if (!resp.ok) {
        setError("Failed to fetch users: " + json.error)
      } else {
        const data = json.data || []
        const mapped = (data as any[]).map((p: any) => ({
          id: p.id,
          email: p.email || "",
          full_name: `${p.prenom || ''} ${p.nom || ''}`.trim() || "Utilisateur",
          role: p.role || "user",
          is_active: true,
          created_at: p.created_at,
          updated_at: p.updated_at || p.created_at,
        }))
        setUsers(mapped)
      }
    } catch {
      setError("An unexpected error occurred while fetching users")
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/reviews")
      const result = await response.json()

      if (!response.ok) {
        setError("Failed to fetch reviews: " + result.error)
      } else {
        setReviews(result.data || [])
      }
    } catch {
      setError("An unexpected error occurred while fetching reviews")
    } finally {
      setLoading(false)
    }
  }

  const _handleLogout = async () => {
    try {
  await signOutClient()
  onLogout?.()
    } catch (e) {
      console.error("Logout error:", e)
    }
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      setUploadingImage(true)

      // Create a unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const _filePath = `products/${fileName}`

      // Upload to Supabase Storage (if available) or use placeholder
      // For now, we'll use a placeholder approach since Supabase Storage setup varies
  const imageUrl = FALLBACK_IMAGE

      return imageUrl
    } catch (error) {
      console.error("Image upload error:", error)
      throw new Error("Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      category: "Coffrets",
      stock: "",
      image_url: "",
    })
    setEditingProduct(null)
    setImageFile(null)
    setImagePreview("")
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      let imageUrl = productForm.image_url

      if (imageFile) {
        try {
          imageUrl = await handleImageUpload(imageFile)
        } catch {
          setError("Failed to upload image. Using default placeholder.")
          imageUrl = FALLBACK_IMAGE
        }
      }

      const priceInTND = Number.parseFloat(productForm.price)
      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: priceInTND,
        category: productForm.category,
        stock: Number.parseInt(productForm.stock),
  image_url: imageUrl || FALLBACK_IMAGE,
        is_active: Number.parseInt(productForm.stock) > 0,
      }

      if (editingProduct) {
        const response = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...productData,
            updated_at: new Date().toISOString(),
          })
        })
        const result = await response.json()

        if (!response.ok) {
          setError("Failed to update product: " + result.error)
        } else {
          setSuccess("Product updated successfully!")
          setProductDialogOpen(false)
          resetProductForm()
          fetchProducts()
        }
      } else {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData)
        })
        const result = await response.json()

        if (!response.ok) {
          setError("Failed to create product: " + result.error)
        } else {
          setSuccess("Product created successfully!")
          setProductDialogOpen(false)
          resetProductForm()
          fetchProducts()
        }
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description,
      price: (product.price).toString(),
      category: product.category,
      stock: product.stock.toString(),
      image_url: product.image_url || "",
    })
    setImagePreview(product.image_url || "")
    setProductDialogOpen(true)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      setLoading(true)
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE"
      })
      const result = await response.json()

      if (!response.ok) {
        setError("Failed to delete product: " + result.error)
      } else {
        setSuccess("Product deleted successfully!")
        fetchProducts()
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const _handleToggleUserStatus = async (_userId: string, _currentStatus: boolean) => {
    // Optional: implement if your profiles table has an is_active column
    setSuccess("")
    setError("User activation toggling is not supported in this setup")
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const qs = new URLSearchParams({ page: String(orderPage), pageSize: String(orderPageSize) })
      if (orderStatus) qs.set("status", orderStatus)
      if (orderSearch) qs.set("search", orderSearch)
      if (rangeDays) qs.set("days", String(rangeDays))
      const resp = await fetch(`/api/admin/orders?${qs.toString()}`)
      const json = await resp.json()
      if (!resp.ok) {
        setError("Failed to fetch orders: " + json.error)
      } else {
        setOrders(json.data || [])
        setOrderTotal(json.count || 0)
      }
    } catch {
      setError("An unexpected error occurred while fetching orders")
    } finally {
      setLoading(false)
    }
  }

  const fetchSummary = async () => {
    try {
      const resp = await fetch(`/api/admin/orders?summary=1&page=1&pageSize=1&days=${rangeDays}`)
      const json = await resp.json()
      if (resp.ok) setSummary(json.summary)
    } catch {
      // ignore
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const resp = await fetch("/api/admin/orders", {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, status })
      })
      const json = await resp.json()
      if (!resp.ok) {
        setError("Failed to update order: " + json.error)
      } else {
        setSuccess("Order updated successfully!")
        fetchOrders()
      }
    } catch {
      setError("An unexpected error occurred")
    }
  }

  const handleToggleReviewStatus = async (reviewId: string, currentStatus: boolean) => {
    try {
      setLoading(true)
      const response = await fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review_id: reviewId,
          approve: !currentStatus
        })
      })
      const result = await response.json()

      if (!response.ok) {
        setError("Failed to update review status: " + result.error)
      } else {
        setSuccess("Review status updated successfully!")
        fetchReviews()
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUserRole = async (userId: string, newRole: "user" | "admin") => {
    try {
      setLoading(true)
      const resp = await fetch("/api/admin/users", {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, role: newRole }),
      })
      const json = await resp.json()
      if (!resp.ok) {
        setError("Failed to update user role: " + json.error)
      } else {
        setSuccess("User role updated successfully!")
        fetchUsers()
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const RevenueTrendChart = dynamic(() => import("@/components/charts/revenue-trend"), {
    ssr: false,
    loading: () => <div className="h-48 w-full animate-pulse rounded-md bg-muted" />,
  })

  // Export an Excel workbook with multiple sheets (Summary, Orders, Reviews, Users)
  const handleExportExcel = async () => {
    try {
      const ensureXLSX = async (): Promise<any> => {
        if (typeof window === 'undefined') return null
        const w = window as any
        if (w.XLSX) return w.XLSX
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script')
          s.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
          s.onload = () => resolve()
          s.onerror = () => reject(new Error('Failed to load XLSX'))
          document.body.appendChild(s)
        })
        return (window as any).XLSX
      }

      const XLSX = await ensureXLSX()
      if (!XLSX) throw new Error('XLSX not available')

      const loopOrders = async () => {
        const all: any[] = []
        let page = 1
        const pageSize = 1000
        const base = new URLSearchParams()
        if (orderStatus) base.set('status', orderStatus)
        if (orderSearch) base.set('search', orderSearch)
        if (rangeDays) base.set('days', String(rangeDays))
         
        while (true) {
          const q = new URLSearchParams(base)
          q.set('page', String(page))
          q.set('pageSize', String(pageSize))
          const resp = await fetch(`/api/admin/orders?${q.toString()}`)
          if (!resp.ok) break
          const json = await resp.json()
          const batch = json?.data || []
          all.push(...batch)
          if (!batch.length || batch.length < pageSize) break
          page += 1
        }
        return all
      }

      const [ordersAll, reviewsAll, usersAll] = await Promise.all([
        loopOrders(),
        (async () => { const r = await fetch('/api/reviews'); const j = await r.json(); return j?.data || [] })(),
        (async () => { const r = await fetch('/api/admin/users'); const j = await r.json(); return j?.data || [] })(),
      ])

      // Build workbook
      const wb = XLSX.utils.book_new()

      // Summary sheet
      const totalOrders = ordersAll.length
      const paid = ordersAll.filter((o:any)=>o.status==='paid' || o.status==='completed').length
      const pending = ordersAll.filter((o:any)=>o.status==='pending').length
      const revenue = ordersAll.reduce((s:number,o:any)=> s + Number(o.total_amount||0), 0)
      const summaryAoA = [
        ['Metric','Value'],
        ['Total Orders', totalOrders],
        ['Paid + Completed', paid],
        ['Pending', pending],
        ['Revenue (sum)', revenue],
        ['Range (days)', rangeDays],
      ]
      const wsSummary = XLSX.utils.aoa_to_sheet(summaryAoA)
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary')

      // Orders sheet
      const ordersHeaders = ['id','customer_email','total_amount','status','created_at']
      const ordersAoA = [ordersHeaders].concat(
        ordersAll.map((r:any)=>[
          r.id, r.customer_email||'', r.total_amount||0, r.status||'', r.created_at||''
        ])
      )
      const wsOrders = XLSX.utils.aoa_to_sheet(ordersAoA)
      XLSX.utils.book_append_sheet(wb, wsOrders, 'Orders')

      // Reviews sheet
      const revHeaders = ['id','product_id','author','rating','comment','created_at']
      const reviewsAoA = [revHeaders].concat(
        (reviewsAll||[]).map((r:any)=>[
          r.id, r.product_id,
          r.profiles ? `${r.profiles.prenom||''} ${r.profiles.nom||''}`.trim() : '',
          r.rating||0, r.comment||'', r.created_at||''
        ])
      )
      const wsReviews = XLSX.utils.aoa_to_sheet(reviewsAoA)
      XLSX.utils.book_append_sheet(wb, wsReviews, 'Reviews')

      // Users sheet
      const userHeaders = ['id','email','prenom','nom','role','created_at']
      const usersAoA = [userHeaders].concat(
        (usersAll||[]).map((u:any)=>[
          u.id, u.email||'', u.prenom||'', u.nom||'', u.role||'', u.created_at||''
        ])
      )
      const wsUsers = XLSX.utils.aoa_to_sheet(usersAoA)
      XLSX.utils.book_append_sheet(wb, wsUsers, 'Users')

      XLSX.writeFile(wb, `dashboard-export-${rangeDays}d.xlsx`)
    } catch (e) {
      console.error('Excel export error', e)
    }
  }

  const statusClass = (s: string) => {
    switch (s) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/30';
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-200 ring-1 ring-blue-400/30';
      case 'paid':
        return 'bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/30';
      case 'completed':
        return 'bg-teal-500/20 text-teal-200 ring-1 ring-teal-400/30';
      case 'cancelled':
        return 'bg-rose-500/20 text-rose-200 ring-1 ring-rose-400/30';
      default:
        return 'bg-white/10 text-white/80 ring-1 ring-white/20';
    }
  }

  return (
    <div className="text-white">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

          <TabsContent value="overview" className="space-y-6" id="overview">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-poppins font-semibold">Overview</h2>
              <div className="inline-flex rounded-full ring-1 ring-white/20 bg-white/10 overflow-hidden">
                <button onClick={() => setRangeDays(7)} className={`px-3 py-1.5 text-xs ${rangeDays===7 ? 'bg-white/20' : 'hover:bg-white/10'}`}>7d</button>
                <button onClick={() => setRangeDays(30)} className={`px-3 py-1.5 text-xs ${rangeDays===30 ? 'bg-white/20' : 'hover:bg-white/10'}`}>30d</button>
                <button onClick={() => setRangeDays(90)} className={`px-3 py-1.5 text-xs ${rangeDays===90 ? 'bg-white/20' : 'hover:bg-white/10'}`}>90d</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl ring-1 ring-white/20 hover:shadow-lg transition-transform hover:-translate-y-0.5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<CardTitle className="text-sm font-medium font-poppins">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-orange-200" />
                </CardHeader>
                <CardContent>
<div className="text-2xl md:text-3xl font-semibold tabular-nums">{summary?.totalOrders ?? 0}</div>
                  <p className="text-xs text-white/80">Overall orders</p>
                </CardContent>
              </Card>
  <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl ring-1 ring-white/20 hover:shadow-lg transition-transform hover:-translate-y-0.5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<CardTitle className="text-sm font-medium font-poppins">Revenue (30d)</CardTitle>
                  <BarChart3 className="h-4 w-4 text-orange-200" />
                </CardHeader>
                <CardContent>
<div className="text-2xl md:text-3xl font-semibold tabular-nums">{(summary?.totalRevenue ?? 0).toFixed(2)} DT</div>
                  <p className="text-xs text-white/80">Paid orders only</p>
                </CardContent>
              </Card>
  <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl ring-1 ring-white/20 hover:shadow-lg transition-transform hover:-translate-y-0.5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<CardTitle className="text-sm font-medium font-poppins">Pending</CardTitle>
                </CardHeader>
                <CardContent>
<div className="text-2xl md:text-3xl font-semibold tabular-nums">{summary?.pendingOrders ?? 0}</div>
                  <p className="text-xs text-white/80">Awaiting confirmation</p>
                </CardContent>
              </Card>
  <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl ring-1 ring-white/20 hover:shadow-lg transition-transform hover:-translate-y-0.5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<CardTitle className="text-sm font-medium font-poppins">Products</CardTitle>
                  <Package className="h-4 w-4 text-orange-200" />
                </CardHeader>
                <CardContent>
<div className="text-2xl md:text-3xl font-semibold tabular-nums">{products.length}</div>
                  <p className="text-xs text-white/80">Catalog size</p>
                </CardContent>
              </Card>
            </div>

  <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl ring-1 ring-white/20 hover:shadow-lg transition-transform hover:-translate-y-0.5">
              <CardHeader>
<CardTitle className="font-poppins">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueTrendChart data={summary?.revenueTrend || []} />
              </CardContent>
            </Card>

            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => { try { window.location.hash = 'products'; window.dispatchEvent(new HashChangeEvent('hashchange')) } catch {} }}
                className="flex items-center gap-3 bg-white/10 ring-1 ring-white/20 rounded-xl px-4 py-3 hover:bg-white/15 transition">
                <Plus className="w-4 h-4 text-orange-200" />
                <span className="text-sm">Add product</span>
              </button>
              <button onClick={() => { try { window.location.hash = 'orders'; window.dispatchEvent(new HashChangeEvent('hashchange')) } catch {} }}
                className="flex items-center gap-3 bg-white/10 ring-1 ring-white/20 rounded-xl px-4 py-3 hover:bg-white/15 transition">
                <ShoppingCart className="w-4 h-4 text-orange-200" />
                <span className="text-sm">Manage orders</span>
              </button>
              <button onClick={handleExportExcel} className="flex items-center gap-3 bg-white/10 ring-1 ring-white/20 rounded-xl px-4 py-3 hover:bg-white/15 transition">
                <Upload className="w-4 h-4 text-orange-200" />
                <span className="text-sm">Export Excel</span>
              </button>
            </div>

            {/* Latest activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 ring-1 ring-white/20">
                <CardHeader>
                  <CardTitle className="font-poppins">Latest Orders</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table className="min-w-[520px]">
                      <TableHeader>
                        <TableRow className="text-white/70">
                          <TableHead className="text-white/70">ID</TableHead>
                          <TableHead className="text-white/70">Email</TableHead>
                          <TableHead className="text-white/70">Total</TableHead>
                          <TableHead className="text-white/70">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(orders || []).slice(0,5).map((o:any) => (
                          <TableRow key={`latest-o-${o.id}`} className="hover:bg-white/5">
                            <TableCell className="font-medium whitespace-nowrap">{o.id}</TableCell>
                            <TableCell className="whitespace-nowrap text-sm sm:text-base">{o.customer_email || '—'}</TableCell>
                            <TableCell className="whitespace-nowrap">{Number(o.total_amount || 0).toFixed(2)} DT</TableCell>
                            <TableCell>
                              <Badge className={statusClass(o.status)}>{o.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 ring-1 ring-white/20">
                <CardHeader>
                  <CardTitle className="font-poppins">Latest Reviews</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="text-white/70">
                          <TableHead className="text-white/70">Product</TableHead>
                          <TableHead className="text-white/70">Author</TableHead>
                          <TableHead className="text-white/70">Rating</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(reviews || []).slice(0,5).map((r:any) => (
                          <TableRow key={`latest-r-${r.id}`} className="hover:bg-white/5">
                            <TableCell>{r.product_id}</TableCell>
                            <TableCell>{r.profiles ? `${r.profiles.prenom || ''} ${r.profiles.nom || ''}`.trim() : '—'}</TableCell>
                            <TableCell>{r.rating} / 5</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6" id="products">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <h2 className="text-xl font-semibold">Product Management</h2>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search products..."
                  value={productSearch}
                  onChange={(e) => { setProductSearch(e.target.value); setProductPage(1); }}
                  className="w-56 glass-light-input"
                />
                <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetProductForm} className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                      <DialogDescription>
                        {editingProduct ? "Update the product details below." : "Fill in the product details below."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          required
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price (TND)</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stock">Stock Quantity</Label>
                          <Input
                            id="stock"
                            type="number"
                            value={productForm.stock}
                            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={productForm.category}
                          onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Coffrets">Coffrets</SelectItem>
                            <SelectItem value="Team Building">Team Building</SelectItem>
                            <SelectItem value="Ateliers">Ateliers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Product Image</Label>
                        <div className="space-y-3">
                          {(imagePreview || productForm.image_url) && (
                            <div className="relative w-full h-32 border rounded-lg overflow-hidden bg-gray-50">
                              <Image
                                src={imagePreview || productForm.image_url}
                                alt="Product preview" // TODO: admin backend; leave as is to avoid mixing admin translations
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileChange}
                              className="hidden"
                              id="image-upload"
                            />
                            <Label
                              htmlFor="image-upload"
                              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                            >
                              <Upload className="w-4 h-4" />
                              {uploadingImage ? "Uploading..." : "Upload Image"}
                            </Label>
                            {imageFile && <span className="text-sm text-gray-600">{imageFile.name}</span>}
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="image_url" className="text-sm text-gray-600">
                              Or enter image URL
                            </Label>
                            <Input
                              id="image_url"
                              type="url"
                              value={productForm.image_url}
                              onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={loading || uploadingImage}>
                          {loading || uploadingImage ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {uploadingImage ? "Uploading..." : editingProduct ? "Updating..." : "Creating..."}
                            </>
                          ) : editingProduct ? (
                            "Update Product"
                          ) : (
                            "Create Product"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

<Card className="bg-white/10 backdrop-blur-md border border-white/15">
<CardContent className="p-0">
                <div className="overflow-x-auto">
                <Table>
<TableHeader>
                    <TableRow className="text-white/70">
                      <TableHead className="text-white/70">Image</TableHead>
                      <TableHead className="text-white/70">Name</TableHead>
                      <TableHead className="text-white/70">Category</TableHead>
                      <TableHead className="text-white/70">Price</TableHead>
                      <TableHead className="text-white/70">Stock</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                      <TableHead className="text-white/70">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="hover:bg-white/5">
                        <TableCell>
                          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                            <Image
                              src={product.image_url || FALLBACK_IMAGE}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price.toFixed(2)} DT (HT)</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
<Badge className={product.is_active ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/30" : "bg-rose-500/20 text-rose-200 ring-1 ring-rose-400/30"}>
                            {product.is_active ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>

            <Pagination className="pt-2">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => { if (productPage > 1) { setProductPage(productPage - 1); fetchProducts() } }} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>{productPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => { if (productPage * productPageSize < productTotal) { setProductPage(productPage + 1); fetchProducts() } }} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>

          <TabsContent value="users" className="space-y-6" id="users">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Users</h2>
              <p className="text-sm text-muted-foreground">Manage user roles</p>
            </div>

<Card className="bg-white/10 backdrop-blur-md border border-white/15">
<CardContent className="p-0">
                <div className="overflow-x-auto">
                <Table>
<TableHeader>
                    <TableRow className="text-white/70">
                      <TableHead className="text-white/70">Full Name</TableHead>
                      <TableHead className="text-white/70">Email</TableHead>
                      <TableHead className="text-white/70">Role</TableHead>
                      <TableHead className="text-white/70">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id} className="hover:bg-white/5">
                        <TableCell className="font-medium">{u.full_name || u.email}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>
                          <Select
                            value={u.role}
                            onValueChange={(val) => handleUpdateUserRole(u.id, val as any)}
                          >
                            <SelectTrigger className="w-36">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">user</SelectItem>
                              <SelectItem value="admin">admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" disabled>
                            Toggle Active (N/A)
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6" id="reviews">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <p className="text-sm text-muted-foreground">Approve or hide reviews</p>
            </div>

<Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl ring-1 ring-white/20">
<CardContent className="p-0">
                <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="text-white/70">
                      <TableHead className="text-white/70">Product</TableHead>
                      <TableHead className="text-white/70">Author</TableHead>
                      <TableHead className="text-white/70">Rating</TableHead>
                      <TableHead className="text-white/70">Comment</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                      <TableHead className="text-white/70">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((r: any) => (
                      <TableRow key={r.id} className="hover:bg-white/5">
                        <TableCell>{r.product_id}</TableCell>
                        <TableCell>{r.profiles ? `${r.profiles.prenom || ''} ${r.profiles.nom || ''}`.trim() : '—'}</TableCell>
                        <TableCell>{r.rating} / 5</TableCell>
                        <TableCell className="max-w-[320px] truncate">{r.comment || '—'}</TableCell>
                        <TableCell>
<Badge className={r.is_approved ? 'bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/30' : 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/30'}>
                            {r.is_approved ? 'Approved' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleToggleReviewStatus(r.id, !!r.is_approved)}>
                            {r.is_approved ? 'Unapprove' : 'Approve'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6" id="orders">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <h2 className="text-xl font-semibold">Orders</h2>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search by email..."
                  value={orderSearch}
                  onChange={(e) => { setOrderSearch(e.target.value); setOrderPage(1); }}
                  className="w-56 glass-light-input"
                />
                <Select value={orderStatus ?? 'all'} onValueChange={(v) => { setOrderStatus(v === 'all' ? null : v); setOrderPage(1); }}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">pending</SelectItem>
                    <SelectItem value="confirmed">confirmed</SelectItem>
                    <SelectItem value="paid">paid</SelectItem>
                    <SelectItem value="completed">completed</SelectItem>
                    <SelectItem value="cancelled">cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => { setOrderPage(1); fetchOrders() }}>Filter</Button>
              </div>
            </div>

<Card className="bg-white/10 backdrop-blur-md border border-white/15">
<CardContent className="p-0">
                <div className="overflow-x-auto">
                <Table>
<TableHeader>
                    <TableRow className="text-white/70">
                      <TableHead className="text-white/70">ID</TableHead>
                      <TableHead className="text-white/70">Email</TableHead>
                      <TableHead className="text-white/70">Total</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                      <TableHead className="text-white/70">Created</TableHead>
                      <TableHead className="text-white/70">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((o: any) => (
                      <TableRow key={o.id} className="hover:bg-white/5">
                        <TableCell className="font-medium">{o.id}</TableCell>
                        <TableCell>{o.customer_email || '—'}</TableCell>
                        <TableCell>{Number(o.total_amount || 0).toFixed(2)} DT</TableCell>
                        <TableCell>
<Badge className={statusClass(o.status)}>{o.status}</Badge>
                        </TableCell>
                        <TableCell>{o.created_at ? new Date(o.created_at).toLocaleString() : '—'}</TableCell>
                        <TableCell>
                          <Select value={o.status} onValueChange={(v) => updateOrderStatus(o.id, v)}>
                            <SelectTrigger className="w-36">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">pending</SelectItem>
                              <SelectItem value="confirmed">confirmed</SelectItem>
                              <SelectItem value="paid">paid</SelectItem>
                              <SelectItem value="completed">completed</SelectItem>
                              <SelectItem value="cancelled">cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>

            <Pagination className="pt-2">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => { if (orderPage > 1) { setOrderPage(orderPage - 1); fetchOrders() } }} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>{orderPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => { if (orderPage * orderPageSize < orderTotal) { setOrderPage(orderPage + 1); fetchOrders() } }} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>
        </Tabs>
    </div>
  )
}
