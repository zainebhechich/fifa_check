'use client';
// Removed unused Card imports per lint
import { CheckCircle } from "lucide-react"
import { useTranslations, useLocale } from 'next-intl'

export function EcolibreePartnership() {
  const t = useTranslations('Ecolibree.Partnership') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = typeof locale === 'string' && locale.startsWith('ar')
  const iconMargin = isRtl ? 'ml-2 md:ml-3' : 'mr-2 md:mr-3'
  const features = (t.raw('features') as string[]) || []

  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-lg">
          {t('title')}
        </h2>
        <div className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500 mb-8" />
        <div className="bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md rounded-xl p-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-lg">
            {t('heading')}
          </h2>
          <p className={`text-center text-lg text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed ${isRtl ? 'text-right' : ''}`}>
            {isRtl ? `${t('collab')}\u200F` : t('collab')}
          </p>

          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full inline-block font-semibold text-lg mb-4 shadow-lg">
              {isRtl ? (
                <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${t('banner')}\u200F`}</span>
              ) : (
                t('banner')
              )}
            </div>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 ${isRtl ? 'justify-items-end lg:justify-items-end' : ''}`}>
            <div className="bg-white/90 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md rounded-xl p-4 md:p-6">
              <h4 className={`text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 mb-3 md:mb-4 ${isRtl ? 'text-right' : ''}`}>
                {isRtl ? (
                  <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${t('highlights')}\u200F`}</span>
                ) : (
                  t('highlights')
                )}
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    {/* PHASE 1 i18n fix: decorative icon */}
                    <CheckCircle aria-hidden="true" className={`h-4 w-4 md:h-5 md:w-5 text-purple-600 ${iconMargin} mt-0.5 flex-shrink-0`} />
                    <span className={`text-blue-900 text-xs md:text-sm leading-relaxed ${isRtl ? 'text-right' : ''}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`bg-white/80 backdrop-blur-md rounded-xl p-4 md:p-6 ring-1 ring-white/40 border-none shadow-md ${isRtl ? 'text-right' : ''}`}>
              <h4 className={`text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 mb-3 md:mb-4 ${isRtl ? 'text-right' : ''}`}>
                {isRtl ? (
                  <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${t('impactTitle')}\u200F`}</span>
                ) : (
                  t('impactTitle')
                )}
              </h4>
              <p className={`text-blue-900 text-xs md:text-sm leading-relaxed mb-3 ${isRtl ? 'text-right' : ''}`}>
                {isRtl ? (
                  <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${t('impact')}\u200F`}</span>
                ) : (
                  t('impact')
                )}
              </p>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3">
                <p className="text-xs font-semibold text-purple-700 text-center">
                  {t('impactNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
