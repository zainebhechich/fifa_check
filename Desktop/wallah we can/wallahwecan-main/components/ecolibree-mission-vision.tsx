'use client';
"use client" // PHASE 1 i18n fix
import { Target, Eye, Zap } from "lucide-react"
import { useTranslations, useLocale } from "next-intl" // PHASE 1 i18n fix

export function EcolibreeMissionVision() {
  const t = useTranslations('Ecolibree.MissionVision') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === 'ar'
  return (
    <section className="py-8 md:py-12 bg-transparent">
      <div className="container mx-auto px-3 sm:px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-lg">
          {t('title')}
        </h2>
        <div className="mx-auto h-0.5 w-14 md:w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500 mb-6 md:mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-lg md:rounded-xl p-4 md:p-6 text-center ring-1 ring-white/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-3 md:mb-4">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-purple-600 mx-auto" aria-hidden="true" /> {/* PHASE 1 i18n fix */}
            </div>
            <h3 className="text-base md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 mb-2 md:mb-3">{t('mission.title')}</h3>
            <p
              className="text-blue-900 text-sm md:text-base leading-relaxed"
              {...(isRtl ? { dir: 'rtl', style: { unicodeBidi: 'plaintext' as const } } : {})}
            >
              {isRtl ? `${t('mission.text')}\u200F` : t('mission.text')}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-lg md:rounded-xl p-4 md:p-6 text-center ring-1 ring-white/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-3 md:mb-4">
              <Eye className="h-6 w-6 md:h-8 md:w-8 text-pink-600 mx-auto" aria-hidden="true" /> {/* PHASE 1 i18n fix */}
            </div>
            <h3 className="text-base md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 mb-2 md:mb-3">{t('vision.title')}</h3>
            <p
              className="text-blue-900 text-sm md:text-base leading-relaxed"
              {...(isRtl ? { dir: 'rtl', style: { unicodeBidi: 'plaintext' as const } } : {})}
            >
              {isRtl ? `${t('vision.text')}\u200F` : t('vision.text')}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-lg md:rounded-xl p-4 md:p-6 text-center ring-1 ring-white/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-3 md:mb-4">
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-indigo-600 mx-auto" aria-hidden="true" /> {/* PHASE 1 i18n fix */}
            </div>
            <h3 className="text-base md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 mb-2 md:mb-3">{t('goals.title')}</h3>
            <ul className="text-blue-900 text-xs md:text-sm space-y-1.5 md:space-y-2" {...(isRtl ? { dir: 'rtl' } : {})}>
              <li>{isRtl ? `${t('goals.0')}\u200F` : t('goals.0')}</li>
              <li>{isRtl ? `${t('goals.1')}\u200F` : t('goals.1')}</li>
              <li>{isRtl ? `${t('goals.2')}\u200F` : t('goals.2')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
