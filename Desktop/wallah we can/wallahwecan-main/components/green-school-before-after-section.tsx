'use client'

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Video, Camera, Eye } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "../lib/utils"

export function GreenSchoolBeforeAfterSection() {
  const t = useTranslations('GreenSchool.BeforeAfter')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  return (
    <div className="py-8 md:py-10">
      {/* Section Header */}
      <div className="mb-8">
        <h2
          dir={isRtl ? 'rtl' : undefined}
          className={cn("text-2xl md:text-3xl font-bold text-[#142346] mb-3 w-full", isRtl ? "text-right" : "text-center")}
          style={isRtl ? { textAlign: 'center' as const, unicodeBidi: 'plaintext' as const } : undefined}
        >
          {t('title')}{isRtl ? '\u200F' : ''}
        </h2>
        <div className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
        <p className={cn("mt-4 text-sm text-white/90 max-w-2xl mx-auto w-full", isRtl ? "text-right" : "text-center")}
          style={isRtl ? { textAlign: 'center' as const } : undefined}
        >
          {t('subtitle')}
        </p>
      </div>

      {/* Image Comparison Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none hover:shadow-lg transition-all duration-200">
          <CardHeader className={cn('pb-3', isRtl ? 'text-right' : '')}>
            <div dir={isRtl ? 'rtl' : undefined} className={cn('flex items-center gap-3 w-full', isRtl ? 'flex-row-reverse justify-end pr-12' : 'pl-6')}>
              {/* PHASE 1 i18n fix: decorative icon */}
              <ImageIcon aria-hidden="true" className="h-5 w-5 text-orange-600" />
              <div>
                <CardTitle className={cn("text-lg font-semibold text-[#142346]", isRtl ? 'text-right' : '')}>{t('before.title')}</CardTitle>
                <div className={cn("h-0.5 w-6 rounded-full mt-1 bg-orange-500", isRtl ? 'float-right' : '')} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 mb-3">
              <img
                src="/placeholder.svg"
                alt={t('before.title')} // PHASE 1 i18n fix
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* PHASE 2 i18n fix */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm font-bold">
                {t('before.placeholder')}
              </div>
            </div>
              <p className={cn("text-slate-800 leading-relaxed text-sm", isRtl ? "text-right" : "text-left")}
                style={isRtl ? { unicodeBidi: 'plaintext' as const } : undefined}
              >{t('before.description')}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none hover:shadow-lg transition-all duration-200">
          <CardHeader className={cn('pb-3', isRtl ? 'text-right' : '')}>
            <div dir={isRtl ? 'rtl' : undefined} className={cn('flex items-center gap-3 w-full', isRtl ? 'flex-row-reverse justify-end pr-12' : 'pl-6')}>
              {/* PHASE 1 i18n fix: decorative icon */}
              <Camera aria-hidden="true" className="h-5 w-5 text-green-600" />
              <div>
                <CardTitle className={cn("text-lg font-semibold text-[#142346]", isRtl ? 'text-right' : '')}>{t('after.title')}</CardTitle>
                <div className={cn("h-0.5 w-6 rounded-full mt-1 bg-green-500", isRtl ? 'float-right' : '')} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 mb-3">
              <img
                src="/placeholder.svg"
                alt={t('after.title')} // PHASE 1 i18n fix
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* PHASE 2 i18n fix */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm font-bold">
                {t('after.placeholder')}
              </div>
            </div>
              <p className={cn("text-slate-800 leading-relaxed text-sm", isRtl ? "text-right" : "text-left")}
                style={isRtl ? { unicodeBidi: 'plaintext' as const } : undefined}
              >{t('after.description')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Video Section */}
      <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
        <CardHeader className={cn('pb-3', isRtl ? 'text-right' : '')}>
          <div dir={isRtl ? 'rtl' : undefined} className={cn('flex items-center gap-3 w-full', isRtl ? 'flex-row-reverse justify-end pr-12' : 'pl-6')}>
              {/* PHASE 1 i18n fix: decorative icon */}
              <Video aria-hidden="true" className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle className={cn('text-lg font-semibold text-[#142346]', isRtl ? 'text-right' : '')}>{t('videos.title')}</CardTitle>
                <div className={cn('h-0.5 w-8 rounded-full bg-blue-500 mt-1', isRtl ? 'float-right' : '')} />
              </div>
            </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src="https://www.youtube.com/embed/oK8ecW_UuNI"
                title={t('videos.title')} // PHASE 1 i18n fix
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src="https://www.youtube.com/embed/DlmnMQpLv60"
                title={t('videos.title')} // PHASE 1 i18n fix
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-800">
            {/* PHASE 1 i18n fix: decorative icon */}
            <Eye aria-hidden="true" className="h-4 w-4" />
            <span dir={isRtl ? 'rtl' : undefined} style={isRtl ? { unicodeBidi: 'plaintext' as const } : undefined} className="text-sm">{t('videos.note')}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
