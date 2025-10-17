'use client';

import { FlipWords } from "@/components/ui/flip-words"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Target, Users, Sparkles } from "lucide-react" // PHASE 1 i18n fix: trim unused icons for cleaner bundle
import { useLocale, useTranslations } from "next-intl" // PHASE 1 i18n fix

export function GreenSchoolHero() {
  const t = useTranslations('GreenSchool.Hero') // PHASE 1 i18n fix // PHASE 2 i18n fix
  const words = t.raw('words') as string[] // PHASE 1 i18n fix
  const locale = useLocale() // PHASE 1 i18n fix: detect current locale for RTL tweaks
  const isRTL = locale === 'ar' // PHASE 1 i18n fix: Arabic layout adjustments

  return (
    <div className="py-8 md:py-10" dir={isRTL ? 'rtl' : 'ltr'}>
  {/* Header Section */}
  <div className="mb-8 md:mb-10 w-full flex flex-col items-center justify-center"> {/* robustly center headline for all locales and directions */}
        <h1 className={`text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow text-center ${isRTL ? 'leading-[1.6]' : ''}`}> {/* PHASE 1 i18n fix: relaxed line-height for Arabic */}
          {t('title')}
        </h1>
        <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
        <div className="mt-2 flex items-center justify-center gap-2 text-xs md:text-sm text-white/90">
          {/* PHASE 1 i18n fix: decorative icon */}
          <Clock aria-hidden="true" className="h-4 w-4" />
          <span>{t('since')}</span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-5xl mx-auto mb-8">
        <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
          <CardContent className="p-6 md:p-8">
            <div className={isRTL ? 'text-right' : 'text-center'}> {/* PHASE 1 i18n fix: align content for RTL */}
              <h2 className={`text-2xl md:text-3xl font-bold text-[#142346] mb-4 ${isRTL ? 'leading-relaxed' : ''}`}>
                {t('headline')} {isRTL ? <span className="inline-block align-middle" style={{ unicodeBidi: 'plaintext' }}><FlipWords words={words} className="text-orange-500" /></span> : <FlipWords words={words} className="text-orange-500" />} {/* PHASE 1 i18n fix: preserve RTL glyph order */}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/80 ring-1 ring-black/10">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <Target aria-hidden="true" className="h-5 w-5 text-green-600" />
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 text-sm">{t('impacts.educational.title')}</div>
                    <p className="text-xs text-gray-700/90">{t('impacts.educational.desc')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/80 ring-1 ring-black/10">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <Users aria-hidden="true" className="h-5 w-5 text-blue-600" />
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 text-sm">{t('impacts.social.title')}</div>
                    <p className="text-xs text-gray-700/90">{t('impacts.social.desc')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/80 ring-1 ring-black/10">
                  {/* PHASE 1 i18n fix: decorative icon */}
                  <Sparkles aria-hidden="true" className="h-5 w-5 text-orange-600" />
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 text-sm">{t('impacts.sustainable.title')}</div>
                    <p className="text-xs text-gray-700/90">{t('impacts.sustainable.desc')}</p>
                  </div>
                </div>
              </div>

              <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-center'}`}> {/* PHASE 1 i18n fix: paragraph alignment */}
                <p className="text-slate-800 leading-relaxed" style={isRTL ? { unicodeBidi: 'plaintext' } : undefined}>{t('p1')}</p>
                <p className="text-slate-800 leading-relaxed" style={isRTL ? { unicodeBidi: 'plaintext' } : undefined}>
                  {t('p2')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
