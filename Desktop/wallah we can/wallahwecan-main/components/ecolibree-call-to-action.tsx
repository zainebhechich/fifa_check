"use client"

import Link from "next/link"
import { Heart, Users, HandHeart, ArrowRight, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useLocale, useTranslations } from "next-intl" // PHASE 1 i18n fix

export function EcolibreeCallToAction() {
  const t = useTranslations('Ecolibree.CTA') // PHASE 1 i18n fix
  const tCTAs = useTranslations('Common.CTAs') // PHASE 1 i18n fix
  const locale = useLocale() // PHASE 1 i18n fix
  return (
    <div className="py-6 md:py-10">
      {/* Section Header */}
      <div className="text-center mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block"
        >
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 mb-2 md:mb-3 drop-shadow-sm">
              {t('title')}
            </h2>
            <div className="mx-auto h-0.5 w-14 md:w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
          </div>
          <p className="mt-3 md:mt-4 text-sm text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Impact Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="mb-6 md:mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl hover:shadow-lg transition-all duration-200 group">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <Heart className="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <span className="text-slate-800 text-sm font-semibold block">{t('cards.0.title')}</span>
                  <p className="text-xs text-slate-600 mt-1">{t('cards.0.subtitle')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl hover:shadow-lg transition-all duration-200 group">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <Users className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <span className="text-slate-800 text-sm font-semibold block">{t('cards.1.title')}</span>
                  <p className="text-xs text-slate-600 mt-1">{t('cards.1.subtitle')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl hover:shadow-lg transition-all duration-200 group">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <HandHeart className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <span className="text-slate-800 text-sm font-semibold block">{t('cards.2.title')}</span>
                  <p className="text-xs text-slate-600 mt-1">{t('cards.2.subtitle')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-lg mx-auto"
      >
  <Link href={`/${locale}/get-involved`} className="w-full sm:w-auto">
          <button className="w-full bg-[#142346] hover:bg-[#142346]/90 text-white shadow-lg transition-all duration-200 hover:shadow-xl group relative overflow-hidden rounded-lg px-6 py-3 font-medium">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2">
              <HandHeart className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>{tCTAs('volunteer')}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </Link>
  <Link href={`/${locale}/faire-un-don`} className="w-full sm:w-auto">
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl group relative overflow-hidden rounded-lg px-6 py-3 font-medium">
            <div className="absolute inset-0 bg-gradient-to-r from-[#142346]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2">
              <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>{tCTAs('donate')}</span>
              <Zap className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            </div>
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
