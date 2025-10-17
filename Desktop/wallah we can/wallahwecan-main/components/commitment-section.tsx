"use client"

import { useTranslations, useLocale } from 'next-intl'
import { cn } from "../lib/utils"

export function CommitmentSection() {
  const t = useTranslations('CommitmentSection') // PHASE 1 i18n fix
  const locale = useLocale() // PHASE 1 i18n fix
  const isRtl = typeof locale === 'string' && locale.startsWith('ar') // PHASE 1 i18n fix
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-5 text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
          {t('title')}
        </h2>
        {/* Center the paragraphs visually for all locales, but ensure Arabic runs have the RTL mark so punctuation appears on the visual right */}
        <p className="mb-3 text-lg text-white/80 text-center">
          {isRtl ? (
            <span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('p1')}{'\u200F'}</span>
          ) : (
            t('p1')
          )}
        </p>
        <p className="mb-3 text-lg text-white/80 text-center">
          {isRtl ? (
            <span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('p2')}{'\u200F'}</span>
          ) : (
            t('p2')
          )}
        </p>
      </div>
    </section>
  )
}
