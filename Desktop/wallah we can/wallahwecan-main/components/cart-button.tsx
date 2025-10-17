"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useCart } from "../hooks/use-cart"
import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import { cn } from "../lib/utils"

export function CartButton() {
  const { toggleCart, getTotalItems } = useCart()
  const [mounted, setMounted] = useState(false)
  const locale = useLocale()
  const isRtl = locale === "ar"

  useEffect(() => {
    setMounted(true)
  }, [])

  // Always render the same structure on server and client
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleCart}
      className="relative hover:bg-orange-100 bg-white/90 backdrop-blur-sm shadow-lg border border-orange-200"
    >
      <ShoppingCart className="h-5 w-5 text-orange-600" />
      {mounted && getTotalItems() > 0 && (
        <Badge
          variant="destructive"
          className={cn(
            "absolute -top-2 h-5 w-5 flex items-center justify-center p-0 text-xs text-white bg-orange-600",
            isRtl ? "-left-2" : "-right-2"
          )}
        >
          {getTotalItems()}
        </Badge>
      )}
    </Button>
  )
}
