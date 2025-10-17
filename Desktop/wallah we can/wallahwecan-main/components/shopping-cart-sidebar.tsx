"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, Plus, Minus, ShoppingBag, CreditCard, User } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useCart } from "../hooks/use-cart"
import { cn } from "../lib/utils" // PHASE 1 i18n fix: normalize import path
import { useLocale, useTranslations } from "next-intl" // PHASE 1 i18n fix

export function ShoppingCartSidebar() {
  const { items, isOpen, toggleCart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart()
  const t = useTranslations('Shop.Cart') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === "ar"
  const [showCheckout, setShowCheckout] = useState(false)
  const [checkoutType, setCheckoutType] = useState<"guest" | "account" | null>(null)
  const [mounted, setMounted] = useState(false)
  const [checkoutForm, setCheckoutForm] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    address: ""
  })
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCheckout = (type: "guest" | "account") => {
    setCheckoutType(type)
    setShowCheckout(true)
  }

  const handleBackToCart = () => {
    setShowCheckout(false)
    setCheckoutType(null)
  }

  const handleFinalizePurchase = async () => {
    if (!checkoutForm.email || !checkoutForm.fullName || !checkoutForm.phoneNumber || !checkoutForm.address) {
  alert(t('errors.fillRequired')) // PHASE 1 i18n fix
      return
    }

    setIsProcessingPayment(true)
    
    try {
  const _orderId = `WWC-${Date.now()}`
  const _total = getTotalPrice() + 5 // Add shipping
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price, // TND (dinars)
          })),
          customer: {
            email: checkoutForm.email,
            name: checkoutForm.fullName,
            firstName: checkoutForm.fullName.split(" ")[0],
            lastName: checkoutForm.fullName.split(" ").slice(1).join(" "),
            phoneNumber: checkoutForm.phoneNumber,
            address: checkoutForm.address
          }
        })
      })

      const text = await response.text()
      let data: any
      try { data = JSON.parse(text) } catch { data = { raw: text } }
      
      if (!response.ok) {
        const msg = data?.error || data?.details || data?.message || `HTTP ${response.status}`
        alert(`${t('errors.paymentFailed')}: ${msg}`)
        return
      }
      
      if (data.success && data.payment_url) {
        window.open(data.payment_url, "_blank")
      } else {
        const msg = data?.error || data?.details || t('errors.initPayment')
        alert(msg)
      }
    } catch {
      alert(t('errors.processingOrder'))
    } finally {
      setIsProcessingPayment(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={toggleCart} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50",
          isRtl ? "left-0" : "right-0",
          isOpen ? "translate-x-0" : isRtl ? "-translate-x-full" : "translate-x-full"
        )}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: "rgb(28, 52, 94)" }}>
            <div className={cn("flex items-center gap-2", isRtl && "flex-row-reverse") }>
              <ShoppingBag className="h-5 w-5 text-white" />
              <h2 className="text-lg font-semibold text-white">{showCheckout ? t('finalizeOrder') : t('myCart')}</h2>
              {mounted && !showCheckout && getTotalItems() > 0 && (
                <Badge variant="secondary" className="text-white" style={{ backgroundColor: "#E04403" }}>
                  {getTotalItems()}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={showCheckout ? handleBackToCart : toggleCart} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="relative flex-1 overflow-y-auto">
            {!showCheckout ? (
              // Cart Items
              <div className="p-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">{t('emptyCart')}</p>
                    <p className="text-sm text-gray-400">{t('addProductsHint')}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id || `${item.name}-${item.image}`} className={cn("flex gap-3 p-3 bg-gray-50 rounded-lg", isRtl && "flex-row-reverse text-right") }>
                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm line-clamp-2">{t('box')} {item.name}</h3>
                          <p className="font-semibold" style={{ color: "#E04403" }}>
                            DT {item.price.toFixed(2)}
                          </p>
                          <div className={cn("flex items-center gap-2 mt-2", isRtl && "flex-row-reverse") }>
                            <Button variant="outline" size="icon" className="h-6 w-6 bg-transparent" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-6 w-6 bg-transparent" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className={cn("text-red-500 hover:text-red-700", isRtl ? "mr-auto" : "ml-auto") } onClick={() => removeFromCart(item.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Checkout Form
              <div className="p-4">
                {checkoutType === "guest" ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border" style={{ backgroundColor: "rgba(28, 52, 94, 0.1)", borderColor: "rgb(28, 52, 94)" }}>
                      <h3 className="font-semibold mb-2" style={{ color: "rgb(28, 52, 94)" }}>
                        {t('guestOrderTitle')}
                      </h3>
                      <p className="text-sm" style={{ color: "rgb(28, 52, 94)" }}>{t('guestOrderSubtitle')}</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')} *</label>
                        <input 
                          type="email" 
                          value={checkoutForm.email}
                          onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" 
                          style={{ "--tw-ring-color": "rgb(28, 52, 94)" } as React.CSSProperties} 
                          placeholder={t('placeholders.email')} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')} *</label>
                        <input 
                          type="text" 
                          value={checkoutForm.fullName}
                          onChange={(e) => setCheckoutForm({...checkoutForm, fullName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" 
                          style={{ "--tw-ring-color": "rgb(28, 52, 94)" } as React.CSSProperties} 
                          placeholder={t('placeholders.fullName')} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')} *</label>
                        <input 
                          type="tel" 
                          value={checkoutForm.phoneNumber}
                          onChange={(e) => setCheckoutForm({...checkoutForm, phoneNumber: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" 
                          style={{ "--tw-ring-color": "rgb(28, 52, 94)" } as React.CSSProperties} 
                          placeholder={t('placeholders.phone')} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('shippingAddress')} *</label>
                        <textarea 
                          value={checkoutForm.address}
                          onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" 
                          style={{ "--tw-ring-color": "rgb(28, 52, 94)" } as React.CSSProperties} 
                          rows={3} 
                          placeholder={t('placeholders.address')} 
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border" style={{ backgroundColor: "rgba(224, 68, 3, 0.1)", borderColor: "#E04403" }}>
                      <h3 className="font-semibold mb-2" style={{ color: "#E04403" }}>{t('createAccountTitle')}</h3>
                      <p className="text-sm" style={{ color: "#E04403" }}>{t('createAccountSubtitle')}</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')} *</label>
                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" style={{ "--tw-ring-color": "#E04403" } as React.CSSProperties} placeholder={t('placeholders.email')} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')} *</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" style={{ "--tw-ring-color": "#E04403" } as React.CSSProperties} placeholder={t('placeholders.password')} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')} *</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" style={{ "--tw-ring-color": "#E04403" } as React.CSSProperties} placeholder={t('placeholders.fullName')} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')} *</label>
                        <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" style={{ "--tw-ring-color": "#E04403" } as React.CSSProperties} placeholder={t('placeholders.phone')} />
                      </div>
                      <div>
                        <label className="block text.sm font-medium text-gray-700 mb-1">{t('shippingAddress')} *</label>
                        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" style={{ "--tw-ring-color": "#E04403" } as React.CSSProperties} rows={3} placeholder={t('placeholders.address')} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              {!showCheckout ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">{t('total')}:</span>
                    <span className="text-xl font-bold" style={{ color: "#E04403" }}>
                      {getTotalPrice().toFixed(2)} DT
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Button onClick={() => handleCheckout("guest")} className="w-full text-white" style={{ backgroundColor: "rgb(28, 52, 94)" }}>
                      <CreditCard className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2") } />
                      {t('payAsGuest')}
                    </Button>
                    <Button onClick={() => handleCheckout("account")} variant="outline" className="w-full hover:bg-orange-50" style={{ borderColor: "#E04403", color: "#E04403" }}>
                      <User className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2") } />
                      {t('createAccountAndPay')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>{t('subtotal')}:</span>
                    <span>{getTotalPrice().toFixed(2)} DT</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>{t('shipping')}:</span>
                    <span>5.00 DT</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
                    <span>{t('total')}:</span>
                    <span style={{ color: "#E04403" }}>{(getTotalPrice() + 5).toFixed(2)} DT</span>
                  </div>

                  <Button 
                    onClick={handleFinalizePurchase}
                    disabled={isProcessingPayment}
                    className="w-full text-white" 
                    style={{ backgroundColor: checkoutType === "guest" ? "rgb(28, 52, 94)" : "#E04403" }}
                  >
                    <CreditCard className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2") } />
                    {isProcessingPayment ? t('processing') : t('finalizeOrder')}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
