"use client"

import Link from "next/link"
import { Target, Users, Sparkles, Heart, ArrowRight, Zap, Handshake, Star, Award, TrendingUp, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from 'next-intl'
import { cn } from "../lib/utils"

export function GreenSchoolCallToAction() {
  const t = useTranslations('GreenSchool.CallToAction') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const withLocale = (path: string) => `/${locale}${path.startsWith('/') ? '' : '/'}${path.replace(/^\/+/, '')}`
  return (
    <div className="py-8 md:py-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block"
        >
          <div className="relative">
            <h2 className={cn("text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#142346] to-orange-600 bg-clip-text text-transparent mb-3 drop-shadow-sm", isRtl ? 'text-right' : 'text-left')}>
              {t('title')}
            </h2>
            <div className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
          </div>
          <p className={cn("mt-4 text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed", isRtl ? 'text-right' : 'text-left')}>
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
        className="mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl hover:shadow-lg transition-all duration-200 group">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center gap-3">
                {/* PHASE 1 i18n fix: decorative icon */}
                <Target aria-hidden="true" className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-200" />
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
                {/* PHASE 1 i18n fix: decorative icon */}
                <Users aria-hidden="true" className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
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
                {/* PHASE 1 i18n fix: decorative icon */}
                <Sparkles aria-hidden="true" className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <span className="text-slate-800 text-sm font-semibold block">{t('cards.2.title')}</span>
                  <p className="text-xs text-slate-600 mt-1">{t('cards.2.subtitle')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="mb-8"
      >
        <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl relative overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center group">
                <div className="flex items-center gap-2 mb-2">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <Star aria-hidden="true" className="h-5 w-5 text-yellow-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-2xl font-bold text-[#142346] group-hover:scale-105 transition-transform duration-200">12</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{t('stats.years')}</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="flex items-center gap-2 mb-2">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <Award aria-hidden="true" className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-2xl font-bold text-[#142346] group-hover:scale-105 transition-transform duration-200">150+</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{t('stats.children')}</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="flex items-center gap-2 mb-2">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <TrendingUp aria-hidden="true" className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-2xl font-bold text-[#142346] group-hover:scale-105 transition-transform duration-200">85%</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{t('stats.successRate')}</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="flex items-center gap-2 mb-2">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <Globe aria-hidden="true" className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-2xl font-bold text-[#142346] group-hover:scale-105 transition-transform duration-200">4</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{t('stats.pillars')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto"
      >
  <Link href={withLocale('/faire-un-don')} className="w-full sm:w-auto">
          {/* PHASE 1 i18n fix: accessible label */}
          <button aria-label={t('donate')} className="w-full bg-[#142346] hover:bg-[#142346]/90 text-white shadow-lg transition-all duration-200 hover:shadow-xl group relative overflow-hidden rounded-lg px-6 py-3 font-medium">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2">
              <Heart aria-hidden="true" className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>{t('donate')}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </Link>
  <Link href={withLocale('/get-involved')} className="w-full sm:w-auto">
          {/* PHASE 1 i18n fix: accessible label */}
          <button aria-label={t('getInvolved')} className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl group relative overflow-hidden rounded-lg px-6 py-3 font-medium">
            <div className="absolute inset-0 bg-gradient-to-r from-[#142346]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2">
              <Handshake aria-hidden="true" className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>{t('getInvolved')}</span>
              <Zap aria-hidden="true" className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            </div>
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
