"use client"

import { ProductCard } from "./product-card"
import { useTranslations } from "next-intl" // PHASE 1 i18n fix

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

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const t = useTranslations('Shop.Grid') // PHASE 1 i18n fix
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">{t('emptyTitle')}{/* PHASE 1 i18n fix */}</h3>
        <p className="text-gray-500 dark:text-gray-500">{t('emptySubtitle')}{/* PHASE 1 i18n fix */}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
