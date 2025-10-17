"use client"

import Link from "next/link"
import Image from "next/image"
// PHASE 1 i18n fix: normalize alias imports to relative paths
import { Button } from "./ui/button"
import { Users, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "../lib/utils"

export function TeamBuildingHero() {
  // PHASE 1 i18n fix: add translations and RTL handling
  const t = useTranslations("TeamBuilding.Hero")
  const locale = useLocale()
  const isRtl = locale === "ar"

  const scrollToContact = () => {
    document.getElementById('team-building-contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="relative inline-block">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 leading-tight drop-shadow">
                  {t("title")}
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              </div>
              <p className={cn("text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl", isRtl ? "text-right" : "text-left") }>
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-[rgb(20,35,70)] hover:bg-[rgb(20,35,70)]/90 text-white shadow-lg w-full sm:w-auto transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Users className={cn("w-5 h-5", isRtl ? "ml-2" : "mr-2")} />
                {t("ctas.requestQuote")}
              </Button>
              <Link href={`/${locale}/contact`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-white shadow-lg w-full sm:w-auto transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <Phone className={cn("w-5 h-5", isRtl ? "ml-2" : "mr-2")} />
                  {t("ctas.contact")}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/miel.webp"
                alt={t("imageAlt")}
                width={800}
                height={500}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[rgb(20,35,70)] to-[rgb(20,35,70)]/80 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">WWC</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t("badge.label")}</div>
                  <div className="text-sm text-gray-600">{t("badge.since")}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
