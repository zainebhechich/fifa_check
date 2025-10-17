"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Heart, Leaf, ChefHat, Activity, Award, Trophy } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "../lib/utils"

// Team members now referencing translation keys for role & description
const teamMembers: Array<any> = []

export function GreenSchoolTeamSection() {
  const t = useTranslations('GreenSchool.Team')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  // Defensive translator to avoid runtime errors if a key is temporarily missing
  const safeT = (key: string, params?: Record<string, any>) => {
    try {
      return t(key as any, params)
    } catch {
      // TODO: human review – missing translation key
      return ''
    }
  }
  return (
    <div className="py-8 md:py-10" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Section Header - absolutely center the heading and underline */}
      <div className="mb-8 relative">
        <div className="w-full">
          <div className="relative">
            <h2 className={cn("absolute left-1/2 transform -translate-x-1/2 top-0 text-2xl md:text-3xl font-bold text-[#142346] mb-3 w-max text-center z-20 px-4 leading-tight")}> 
              <span className="inline-block text-center" dir={isRtl ? 'rtl' : undefined} style={isRtl ? { unicodeBidi: 'isolate-override' as const } : undefined}>
                {safeT('title')}{isRtl ? '\u200F' : ''}
              </span>
            </h2>

            {/* centered underline using absolute positioning */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[3.25rem]">
              <div className={cn('h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500')} />
            </div>
          </div>

          <p className={cn("mt-6 text-sm text-white/90 max-w-2xl mx-auto w-full text-center")}>
            <span dir={isRtl ? 'rtl' : undefined} style={isRtl ? { unicodeBidi: 'isolate-override' as const } : undefined}>
              {safeT('subtitle')}{isRtl ? '\u200F' : ''}
            </span>
          </p>
        </div>
      </div>

      {/* Team Overview Card */}
      <div className="mb-8">
        <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
          <CardContent className="p-6">
              <div className="text-center">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-slate-800">{safeT('stats.coordinators')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-slate-800">{safeT('stats.agronomists')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-slate-800">{safeT('stats.nutritionists')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-slate-800">{safeT('stats.team')}</span>
                </div>
              </div>
              <p className="text-slate-800 leading-relaxed text-sm text-center">{safeT('description')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Carousel */}
      <Carousel className="w-full max-w-6xl mx-auto relative px-2 sm:px-0">
        <CarouselContent className="-ml-2 sm:-ml-3">
          {teamMembers.map((member, index) => (
            <CarouselItem key={index} className="pl-2 sm:pl-3 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none overflow-hidden h-full hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    {member.icon}
                      <div>
                      <CardTitle className="text-lg font-semibold text-[#142346]">{member.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="w-full h-28 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">{safeT('photoAlt', { name: member.name })}</span>
                  </div>
                  <p className="text-sm font-medium text-[#142346] mb-2">{safeT(`members.${member.key}.role`)}</p>
                  <p className="text-sm text-slate-800 leading-relaxed">"{safeT(`members.${member.key}.description`)}"</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
      </Carousel>
    </div>
  )
}
