"use client"

import { NavbarButton } from "@/components/ui/resizable-navbar"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl" // PHASE 1 i18n fix

export function CallToActionSection() {
  const t = useTranslations('Home.CallToAction') // PHASE 1 i18n fix
  const tCommon = useTranslations('Common.CTAs') // PHASE 1 i18n fix
  const locale = useLocale() // PHASE 1 i18n fix
  const _isRtl = locale === 'ar'
  return (
    <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-center text-white">
      <div className="container mx-auto px-4">
        <h2 className={"mb-5 text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow"}>
          {t('title')}
        </h2>
        <p className={"mb-7 text-lg"}>{t('subtitle')}</p>
        <div className={"flex justify-center gap-4"}>
          <Link href={`/${locale}/faire-un-don`} prefetch>
            <NavbarButton as="button" variant="dark" className="bg-white text-orange-600 hover:bg-gray-100">
              {tCommon('donate')}
            </NavbarButton>
          </Link>
          <Link href={`/${locale}/get-involved`} prefetch>
            <NavbarButton as="button" variant="dark" className="bg-white text-orange-600 hover:bg-gray-100">
              {tCommon('volunteer')}
            </NavbarButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
