"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
// PHASE 1 i18n fix: normalize alias imports to relative paths
import { Button } from "./ui/button"
import { CheckCircle, Package, Mail } from "lucide-react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"

import { formatPrice } from "../lib/cart"
import { cn } from "../lib/utils"

interface OrderSuccessProps {
  order: any // Type this properly based on your needs
}

export function OrderSuccess({ order }: OrderSuccessProps) {
  const t = useTranslations('Checkout.OrderSuccess') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale?.startsWith("ar")
  const withLocale = (path: string) => `/${locale}/${path.replace(/^\/+/g, "")}`
  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "container mx-auto px-4",
        isRtl && "text-right"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "max-w-2xl mx-auto text-center",
          isRtl && "text-right"
        )}
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">{t('thanksForOrder', { id: order.id?.slice(0, 8) })}</p>

          <p className="text-gray-600 dark:text-gray-400">{t.rich('confirmationEmail', { email: () => <strong>{order.email}</strong> })}</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle
              className={cn(
                "flex items-center gap-2",
                isRtl && "flex-row-reverse text-right"
              )}
            >
              <Package className="h-5 w-5" />
              {t('orderDetails')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.order_items?.map((item: any) => (
              <div
                key={item.id}
                className={cn(
                  "flex justify-between items-center gap-4",
                  isRtl && "flex-row-reverse"
                )}
              >
                <div className={cn("text-left", isRtl && "text-right")}
                >
                  <p className="font-medium">{item.products?.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('quantity', { qty: item.qty })}</p>
                </div>
                <p className="font-semibold">{formatPrice(item.price_cents * item.qty)}</p>
              </div>
            ))}

            <div className="border-t pt-4">
              <div
                className={cn(
                  "flex justify-between items-center text-lg font-bold",
                  isRtl && "flex-row-reverse"
                )}
              >
                <span>{t('total')}</span>
                <span className="text-orange-600 dark:text-orange-400">{formatPrice(order.total_cents)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div
            className={cn(
              "flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400",
              isRtl && "flex-row-reverse"
            )}
          >
            <Mail className="h-5 w-5" />
            <span>{t('trackingEmail')}</span>
          </div>

          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center",
              isRtl && "sm:flex-row-reverse"
            )}
          >
            <Link href={withLocale('/shop')}>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                {t('continueShopping')}
              </Button>
            </Link>
            <Link href={`/${locale}`}>
              <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700">{t('backHome')}</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
