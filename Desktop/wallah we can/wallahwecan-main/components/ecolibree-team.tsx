'use client';
"use client" // PHASE 1 i18n fix
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Heart, Droplets, Shield, Award, Trophy, CheckCircle } from "lucide-react"
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '../lib/utils'

const teamMembers = [
  { key: 'imen', name: 'Imen Majed', accentColor: 'blue', icon: <Trophy className="h-5 w-5 text-blue-600" aria-hidden="true" /> },
  { key: 'nesrine', name: 'Nesrine Morjane', accentColor: 'pink', icon: <Heart className="h-5 w-5 text-pink-600" aria-hidden="true" /> },
  { key: 'saja', name: 'Saja Najar', accentColor: 'purple', icon: <Shield className="h-5 w-5 text-purple-600" aria-hidden="true" /> },
]

export function EcolibreeTeam() {
  const t = useTranslations('Ecolibree.Team') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === 'ar'
  // Helper to safely access member keys without throwing MISSING_MESSAGE
  const safeT = (path: string, fallback = '') => {
    try { return t(path as any) } catch { return fallback }
  }
  return (
    <div className="py-8 md:py-10" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className={cn("text-2xl md:text-3xl font-bold text-[#142346] mb-3", isRtl ? 'text-center' : 'text-center')}>
          {t('title')}
        </h2>
        <div className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
        <p className={cn("mt-4 text-sm text-white/90 max-w-2xl mx-auto", isRtl ? 'text-right' : 'text-center')}>
          {t('subtitle')}
        </p>
      </div>

      {/* Team Overview Card */}
      <div className="mb-8">
        <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
          <CardContent className="p-6">
            <div className={cn("text-center", isRtl && 'text-right')}>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-800">{t('stats.coordinator')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-600" />
                  <span className="text-sm font-medium text-slate-800">{t('stats.ambassadors')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-slate-800">{t('stats.creators')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-slate-800">{t('stats.partners')}</span>
                </div>
              </div>
              <p className={cn("text-slate-800 leading-relaxed text-sm", isRtl ? "mx-auto text-center max-w-3xl" : "")}>{t('description')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Carousel */}
      <Carousel className="w-full max-w-6xl mx-auto relative">
        <CarouselContent className="flex justify-center -ml-1 sm:-ml-2 md:-ml-3">
          {teamMembers.map((member, index) => (
            <CarouselItem key={index} className="pl-1 sm:pl-2 md:pl-3 basis-full sm:basis-4/5 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none overflow-hidden h-full hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    {member.icon}
                    <div>
                      <CardTitle className="text-lg font-semibold text-[#142346]">{member.name}</CardTitle>
                      <div className={`h-0.5 w-6 rounded-full mt-1 ${
                        member.accentColor === 'blue' ? 'bg-blue-500' :
                        member.accentColor === 'pink' ? 'bg-pink-500' :
                        'bg-purple-500'
                      }`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="w-full h-28 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">{t('photoAlt', { name: member.name })}</span>
                  </div>
                  <p className="text-sm font-medium text-[#142346] mb-2">{safeT(`members.${member.key}.role`, member.name)}</p>
                  <p className="text-sm text-slate-800 leading-relaxed">"{safeT(`members.${member.key}.description`) }"</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 sm:-ml-6 md:-ml-8 lg:-ml-10 hidden sm:flex" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 sm:-mr-6 md:-mr-8 lg:-mr-10 hidden sm:flex" />
      </Carousel>
    </div>
  )
}
