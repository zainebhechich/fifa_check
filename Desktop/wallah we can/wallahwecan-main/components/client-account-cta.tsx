"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { UserPlus, Star, Gift, Bell, ShoppingBag, Heart } from "lucide-react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"

export function ClientAccountCTA() {
  const t = useTranslations("ClientAccountCTA")
  const locale = useLocale()
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-800 dark:text-orange-200 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-orange-600 dark:text-orange-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Benefits */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                  {t("benefits.reviews.title")}
                </h3>
                <p className="text-orange-600 dark:text-orange-400">
                  {t("benefits.reviews.desc")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <Gift className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">{t("benefits.offers.title")}</h3>
                <p className="text-orange-600 dark:text-orange-400">
                  {t("benefits.offers.desc")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">{t("benefits.newsletter.title")}</h3>
                <p className="text-orange-600 dark:text-orange-400">
                  {t("benefits.newsletter.desc")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">{t("benefits.orders.title")}</h3>
                <p className="text-orange-600 dark:text-orange-400">
                  {t("benefits.orders.desc")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">{t("benefits.wishlist.title")}</h3>
                <p className="text-orange-600 dark:text-orange-400">
                  {t("benefits.wishlist.desc")}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <Card className="border-orange-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <CardHeader className="text-center">
              <div className="mx-auto bg-orange-100 dark:bg-orange-900/20 p-4 rounded-full w-fit mb-4">
                <UserPlus className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-orange-800 dark:text-orange-200">{t("card.title")}</CardTitle>
              <CardDescription className="text-orange-600 dark:text-orange-400">
                {t("card.subtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-orange-800 dark:text-orange-200">{t("card.welcomeOffer.title")}</span>
                  <Badge className="bg-orange-600 text-white">{t("card.welcomeOffer.badge")}</Badge>
                </div>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {t("card.welcomeOffer.desc")}
                </p>
              </div>

              <div className="space-y-3">
                <Link href={`/${locale}/auth/register`}>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t("card.actions.create")}
                  </Button>
                </Link>

                <Link href={`/${locale}/auth/login`}>
                  <Button
                    variant="outline"
                    className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                  >
                    {t("card.actions.haveAccount")}
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <p className="text-xs text-orange-500 dark:text-orange-400">
                  {t("card.disclaimer.prefix")} {" "}
                  <Link href={`/${locale}/terms`} className="underline hover:text-orange-700">
                    {t("card.disclaimer.terms")}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
