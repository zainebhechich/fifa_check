"use client"

export interface CartItem {
  productId: string
  name: string
  price_cents: number
  qty: number
  image?: string
}

export interface Cart {
  items: CartItem[]
  total_cents: number
}

const CART_STORAGE_KEY = "wallah-cart"

export function getCart(): Cart {
  if (typeof window === "undefined") {
    return { items: [], total_cents: 0 }
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const cart = JSON.parse(stored) as Cart
      return {
        items: cart.items || [],
        total_cents: calculateTotal(cart.items || []),
      }
    }
  } catch (error) {
    console.error("Error loading cart:", error)
  }

  return { items: [], total_cents: 0 }
}

export function saveCart(cart: Cart): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error("Error saving cart:", error)
  }
}

export function addToCart(item: Omit<CartItem, "qty"> & { qty?: number }): Cart {
  const cart = getCart()
  const existingIndex = cart.items.findIndex((i) => i.productId === item.productId)

  if (existingIndex >= 0) {
    cart.items[existingIndex].qty += item.qty || 1
  } else {
    cart.items.push({
      ...item,
      qty: item.qty || 1,
    })
  }

  cart.total_cents = calculateTotal(cart.items)
  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string): Cart {
  const cart = getCart()
  cart.items = cart.items.filter((item) => item.productId !== productId)
  cart.total_cents = calculateTotal(cart.items)
  saveCart(cart)
  return cart
}

export function updateQuantity(productId: string, qty: number): Cart {
  const cart = getCart()

  if (qty <= 0) {
    return removeFromCart(productId)
  }

  const itemIndex = cart.items.findIndex((item) => item.productId === productId)
  if (itemIndex >= 0) {
    cart.items[itemIndex].qty = qty
    cart.total_cents = calculateTotal(cart.items)
    saveCart(cart)
  }

  return cart
}

export function clearCart(): Cart {
  const cart = { items: [], total_cents: 0 }
  saveCart(cart)
  return cart
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price_cents * item.qty, 0)
}

export function formatPrice(cents: number, currency = "TND"): string {
  const amount = cents / 100

  if (currency === "TND") {
    return `DT ${amount.toFixed(2)}`
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(amount)
}
