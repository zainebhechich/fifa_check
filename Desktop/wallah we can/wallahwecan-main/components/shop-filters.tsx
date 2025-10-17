"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Search, Filter } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "../lib/utils"

interface ShopFiltersProps {
  categories: string[]
  currentCategory?: string
  currentSearch?: string
  currentSort?: string
}

export function ShopFilters({ categories, currentCategory, currentSearch, currentSort }: ShopFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(currentSearch || "")
  const t = useTranslations('Shop.Filters') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === "ar"

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/${locale}/shop?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters("search", searchValue || null)
  }

  return (
    <div className="mb-8 space-y-4" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className={cn("absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4", isRtl ? "right-3" : "left-3") } />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={cn(isRtl ? "pr-10" : "pl-10") }
            />
          </div>
        </form>

        {/* Category Filter */}
        <Select
          value={currentCategory || "all"}
          onValueChange={(value) => updateFilters("category", value === "all" ? null : value)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <Filter className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2") } />
            <SelectValue placeholder={t('categoryPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allCategories')}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={currentSort || "newest"}
          onValueChange={(value) => updateFilters("sort", value === "newest" ? null : value)}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t('sortPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t('sort.newest')}</SelectItem>
            <SelectItem value="name">{t('sort.name')}</SelectItem>
            <SelectItem value="price_asc">{t('sort.priceAsc')}</SelectItem>
            <SelectItem value="price_desc">{t('sort.priceDesc')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {(currentCategory || currentSearch) && (
        <div className="flex flex-wrap gap-2">
          {currentCategory && (
            <Button variant="secondary" size="sm" onClick={() => updateFilters("category", null)} className="h-8">
              {isRtl ? `× ${currentCategory}` : `${currentCategory} ×`}
            </Button>
          )}
          {currentSearch && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchValue("")
                updateFilters("search", null)
              }}
              className="h-8"
            >
              {isRtl ? `× "${currentSearch}"` : `"${currentSearch}" ×`}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
