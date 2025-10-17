'use client';
"use client"; // PHASE 1 i18n fix
import Link from "next/link"
import { Facebook, Linkedin, Youtube, Instagram } from "lucide-react" // Import social media icons
import { useTranslations, useLocale } from "next-intl"

export function Footer() {
  const t = useTranslations('Footer') // PHASE 1 i18n fix
  // PHASE 1 i18n fix: locale-prefixed link using next-intl hook
  const locale = useLocale()
  const withLocale = (path: string) => `/${locale}${path.startsWith('/') ? '' : '/'}${path.replace(/^\/+/, '')}`
  const copyright = t('copyright') // PHASE 1 i18n fix
  const conditionsLabel = t('conditions') // PHASE 1 i18n fix
  return (
    <footer className="bg-slate-800 dark:bg-black text-white py-8">
      <div className="container mx-auto px-4 text-center text-sm">
        <p className="mb-2">© {new Date().getFullYear()} WALLAHWECAN - {copyright}</p>
        <Link href={withLocale('/general-conditions')} className="text-orange-400 hover:underline">
          {conditionsLabel}
        </Link>
        <div className="flex justify-center space-x-4 mt-4">
          <Link
            href="https://www.facebook.com/wallahwecan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('aria.facebook', { fallback: 'Facebook' })}
          >
            <Facebook className="h-6 w-6 text-white hover:text-orange-400 transition-colors" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/wallah-we-can-worldwide"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('aria.linkedin', { fallback: 'LinkedIn' })}
          >
            <Linkedin className="h-6 w-6 text-white hover:text-orange-400 transition-colors" />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCqpmRl29WlQ-lS72GyzjUXw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('aria.youtube', { fallback: 'YouTube' })}
          >
            <Youtube className="h-6 w-6 text-white hover:text-orange-400 transition-colors" />
          </Link>
          <Link
            href="https://www.instagram.com/wallah_we_can/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('aria.instagram', { fallback: 'Instagram' })}
          >
            <Instagram className="h-6 w-6 text-white hover:text-orange-400 transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
