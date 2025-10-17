'use client';
import { ExternalLink } from "lucide-react"
import { useTranslations } from 'next-intl'

export function EcolibreeMediaPartners() {
  const t = useTranslations('Ecolibree.MediaPartners') // PHASE 1 i18n fix
  const mediaPartners = [
    {
      name: t('items.0.name'),
      url: "https://observers.france24.com/en/20150414-taboos-tunisia-washable-sanitary-napkins",
  logo: "/placeholder.svg",
    },
    {
      name: t('items.1.name'),
      url: "https://www.jeuneafrique.com/1284077/politique/tunisie-quand-les-femmes-portent-la-culotte/",
  logo: "/placeholder.svg",
    },
    {
      name: t('items.2.name'),
      url: "https://www.businessnews.com.tn/cest-moi-qui-porte-la-culotte-,524,115820,3",
  logo: "/placeholder.svg",
    },
  ]

  return (
    <section className="py-8 md:py-12 bg-transparent">
      <div className="container mx-auto px-3 sm:px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-lg">
          {t('title')}
        </h2>
        <div className="mx-auto h-0.5 w-14 md:w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500 mb-6 md:mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
          {mediaPartners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/80 backdrop-blur-md rounded-lg md:rounded-xl p-3 md:p-5 text-center ring-1 ring-white/40 border-none shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-center h-16 mb-3">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-slate-800 font-medium group-hover:text-purple-600 transition-colors duration-300 text-sm">
                {partner.name}
              </p>
              {/* PHASE 1 i18n fix: decorative icon */}
              <ExternalLink aria-hidden="true" className="h-3 w-3 text-slate-400 mx-auto mt-2 group-hover:text-purple-600 transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
