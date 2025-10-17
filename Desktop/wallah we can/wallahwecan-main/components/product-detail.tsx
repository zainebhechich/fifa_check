"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { useCart } from "../hooks/use-cart"
import { toast } from "sonner"
import { ProductReviews } from "./product-reviews"
import { useLocale, useTranslations } from "next-intl"
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

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations('Shop.ProductDetail') // PHASE 1 i18n fix
  const tBrand = useTranslations('Common.Brand') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === "ar"
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    setIsLoading(true)

    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || "/placeholder.svg",
        quantity: quantity,
      })

      toast.success(t('addedToCart', { quantity, name: product.name }))
    } catch {
      toast.error(t('addError'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-start">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#fbf0d9]/10 backdrop-blur-sm border border-[#fbf0d9]/20">
            {(() => {
              const src = product.image_url || "/placeholder.svg";
              const isPlaceholder = src.includes("/placeholder.svg");
              if (isPlaceholder) {
                return (
                  <img
                    src={src}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                );
              }
              return (
                <Image
                  src={src}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              );
            })()}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            {product.category && (
              <Badge className="mb-3 bg-[#ca6700]/20 text-[#ca6700] border border-[#ca6700]/30">{product.category}</Badge>
            )}
            <div className={cn("flex items-center gap-3 mb-3", isRtl && "flex-row-reverse text-right") }>
              <h1 className="text-2xl md:text-3xl font-bold text-black">{product.name}</h1>
              <Image
                src="https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_le-label.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfbGUtbGFiZWwud2VicCIsImlhdCI6MTc1ODgwMDE2NiwiZXhwIjoxOTE2NDgwMTY2fQ.bQM07lpq6eL6bl5-tOTy1bAmAVlKrE5dYfR9bIOWCmw"
                alt={tBrand('leLabelAlt')} // PHASE 1 i18n fix
                width={32}
                height={32}
                className="w-8 h-8 rounded-full bg-white p-1 shadow-sm"
              />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-[#ca6700] mb-4">
              {product.price.toFixed(2)} DT (HT)
            </div>
          </div>

          {product.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#0c445c]">{t('description')}</h3>
              <p className={cn("text-[#3d3d3d] leading-relaxed whitespace-pre-line text-sm md:text-base", isRtl && "text-right") }>
                {product.description}
              </p>
            </div>
          )}

          <div className={cn("space-y-1 text-sm text-[#3d3d3d]", isRtl && "text-right") }>
            <div>
              <span className="text-[#0c445c] font-medium">{t('category')}:</span> <span className="text-[#3d3d3d]">{product.category}</span>
            </div>
            <div>
              <span className="text-[#0c445c] font-medium">{t('stock')}:</span> <span className="text-[#3c4c34]">{t('inStock', { count: product.stock })}</span>
            </div>
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <Card className="bg-[#fbf0d9]/10 backdrop-blur-md border border-[#fbf0d9]/20">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-[#0c445c] mb-2 block">
                    {t('quantity')}
                  </label>
                  <div className={cn("flex items-center gap-2", isRtl && "flex-row-reverse") }>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="border-[#0c445c] text-[#0c445c] hover:bg-[#0c445c]/20"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold min-w-[2rem] text-center text-[#0c445c]">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="border-[#0c445c] text-[#0c445c] hover:bg-[#0c445c]/20"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || product.stock <= 0}
                  className="w-full bg-[#ca6700] hover:bg-[#ca6700]/90 text-white py-2"
                  size="sm"
                >
                  <ShoppingCart className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2") } />
                  {isLoading ? t('adding') : t('addToCart')}
                </Button>

                {product.stock <= 0 && (
                  <p className="text-[#ca6700] text-center text-sm">{t('notInStock')}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-[#0c445c]">{t('reviewsTitle')}</h2>
        </div>

        <ProductReviews productId={product.id} />
      </div>
    </div>
  )
}
