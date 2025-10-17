'use client';
"use client" // PHASE 1 i18n fix

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Shield, Leaf, Sun, Heart, BookOpen, Utensils, Zap } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "../lib/utils"

// Removed rawPillars (hard-coded French) in favor of translated keys

export function GreenSchoolPillars() {
  const t = useTranslations('GreenSchool.Pillars')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const pillars = [
    {
      title: t('items.health.title'),
      description: t('items.health.description'),
      icon: <Heart className="h-5 w-5 text-green-600" />,
  image: "/placeholder.svg",
      imageAlt: t('items.health.imageAlt'),
      accentColor: "green",
    },
    {
      title: t('items.education.title'),
      description: t('items.education.description'),
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
  image: "/placeholder.svg",
      imageAlt: t('items.education.imageAlt'),
      accentColor: "blue",
    },
    {
      title: t('items.food.title'),
      description: t('items.food.description'),
      icon: <Utensils className="h-5 w-5 text-orange-600" />,
  image: "/placeholder.svg",
      imageAlt: t('items.food.imageAlt'),
      accentColor: "orange",
    },
    {
      title: t('items.energy.title'),
      description: t('items.energy.description'),
      icon: <Zap className="h-5 w-5 text-yellow-600" />,
  image: "/placeholder.svg",
      imageAlt: t('items.energy.imageAlt'),
      accentColor: "yellow",
    },
  ]
  return (
    <div className="py-8 md:py-10" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className={cn("text-2xl md:text-3xl font-bold text-[#142346] mb-3", "text-center")}>
          {t('title')}
        </h2>
        <div className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
        <p className={cn("mt-4 text-sm text-white/90 max-w-2xl mx-auto", isRtl ? "text-right" : "text-center")}>
          {t('subtitle')}
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {pillars.map((pillar, index) => (
          <Card key={index} className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none hover:shadow-lg transition-all duration-200 overflow-hidden">
            <div className="relative h-32 overflow-hidden">
              <img
                src={pillar.image}
                alt={pillar.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-2 text-white">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <span aria-hidden="true">{pillar.icon}</span>
                  <span className="text-sm font-semibold">{pillar.title}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-slate-800 leading-relaxed text-sm">{pillar.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ODD Section */}
      <div className="mt-8">
        <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <Target aria-hidden="true" className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-slate-800">{t('odd.education')}</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <Shield aria-hidden="true" className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-800">{t('odd.health')}</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <Leaf aria-hidden="true" className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-slate-800">{t('odd.hunger')}</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <Sun aria-hidden="true" className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-slate-800">{t('odd.energy')}</span>
                </div>
              </div>
              <p className="text-slate-800 leading-relaxed text-sm">{t('conclusion')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
