'use client';
"use client" // PHASE 1 i18n fix

import { useTranslations, useLocale } from "next-intl"

export function EcolibreeYoutubeVideos() {
  const t = useTranslations('Ecolibree.Videos.YouTube') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const items = t.raw('items') as Array<{ title: string; description?: string }>
  const videos = [
    {
      title: items?.[0]?.title || "Ecolibree - Justice menstruelle en Tunisie",
      description: items?.[0]?.description || "",
      embedUrl: "https://www.youtube.com/embed/s2IGv52xdeE?rel=0&modestbranding=1",
    },
    {
      title: items?.[1]?.title || "TEDx | Lotfi Hamadi",
      description: items?.[1]?.description || "",
      embedUrl: "https://www.youtube.com/embed/7RkcSz7P9Ew?rel=0&modestbranding=1",
    },
  ]

  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-lg">
          {t('title')}
        </h2>
        <div className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden ring-1 ring-white/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full aspect-video">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-t-xl"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-4 md:p-6">
                <h3 className={`text-base md:text-lg font-semibold text-slate-800 mb-1 md:mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>{isRtl ? (<span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${video.title}\u200F`}</span>) : video.title}</h3>
                {video.description && <p className={`text-blue-900 text-xs md:text-sm leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>{isRtl ? (<span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${video.description}\u200F`}</span>) : video.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
