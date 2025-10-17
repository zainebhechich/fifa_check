"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import Image from "next/image"
import { ShoppingCart, Eye } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "../lib/utils"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  category: string
  stock: number
  is_active: boolean
  created_at: string
  sku?: string
  slug?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('Shop.ProductCard') // PHASE 1 i18n fix
  const tBrand = useTranslations('Common.Brand') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === "ar"
  const [isLoading, setIsLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)

    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || "/placeholder.svg",
        quantity: quantity,
      })
      toast.success(t('addedToCart', { name: product.name }))
    } catch {
      toast.error(t('addError'))
    } finally {
      setIsLoading(false)
    }
  }

  const productSlug =
    product.slug ||
    (product.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || product.id)

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 h-full flex flex-col">
      {/* Image Section - Fixed height */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg flex-shrink-0">
        <Image
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
        />

        {product.category && (
          <Badge className="absolute top-2 left-2 bg-[#ca6700] hover:bg-[#ca6700]/90 text-white text-xs">
            {product.category}
          </Badge>
        )}

        {/* Le Label Logo */}
        <div className="absolute top-2 right-2">
          <Image
            src="https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_le-label.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfbGUtbGFiZWwud2VicCIsImlhdCI6MTc1ODgwMDE2NiwiZXhwIjoxOTE2NDgwMTY2fQ.bQM07lpq6eL6bl5-tOTy1bAmAVlKrE5dYfR9bIOWCmw"
            alt={tBrand('leLabelAlt')}
            width={20}
            height={20}
            className="w-5 h-5 rounded-full bg-white p-0.5 shadow-sm"
          />
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Link href={`/${locale}/shop/${productSlug}`}>
              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                <Eye className={cn("h-4 w-4", isRtl ? "ml-1" : "mr-1") } />
                {t('view')}
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading || product.stock <= 0}
              className="bg-[#ca6700] hover:bg-[#ca6700]/90 text-white"
            >
              <ShoppingCart className={cn("h-4 w-4", isRtl ? "ml-1" : "mr-1") } />
              {isLoading ? t('adding') : t('cart')}
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section - Flexible but consistent */}
      <CardContent className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-sm mb-2 line-clamp-1 text-gray-900 dark:text-white">{product.name}</h3>
        <div className="flex-1 flex flex-col justify-between">
          {product.description ? (
            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{product.description}</p>
          ) : (
            <div className="mb-2"></div>
          )}
          <div className="text-xs text-gray-500 flex items-center gap-2">
            {product.category && <span className="px-2 py-0.5 rounded bg-[#ca6700]/20 text-[#ca6700]">{product.category}</span>}
          </div>
        </div>
      </CardContent>

      {/* Footer Section - Fixed height */}
      <CardFooter className="p-3 pt-0 flex items-center justify-between flex-shrink-0">
        <div className="flex flex-col">
          <span className="text-base font-bold text-[#ca6700]">
            {product.price.toFixed(2)} DT (HT) {/* TODO: move currency/suffix to Common.Currency if needed */}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="h-6 w-6 rounded border text-gray-700 text-sm"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)) }}
            disabled={quantity <= 1}
          >-
          </button>
          <span className="min-w-[1.5rem] text-center font-medium text-sm">{quantity}</span>
          <button
            className="h-6 w-6 rounded border text-gray-700 text-sm"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuantity(Math.min(50, quantity + 1)) }}
            disabled={quantity >= 50}
          >+
          </button>
          {product.stock <= 0 && (
            <Badge variant="secondary" className="text-xs">
              {t('outOfStock')}
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
