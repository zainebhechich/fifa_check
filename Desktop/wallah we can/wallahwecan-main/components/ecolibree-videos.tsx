'use client';
"use client" // PHASE 1 i18n fix

import { useTranslations, useLocale } from 'next-intl'

export function EcolibreeVideos() {
  const t = useTranslations('Ecolibree.Videos.List') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const raw = t.raw('items')
  const items = Array.isArray(raw) ? raw as Array<{ title: string; url: string }> : [] // defensive
  const fallback = [
    { title: 'Ecolibree Presentation | YouTube', url: 'https://www.youtube.com/watch?v=s2IGv52xdeE' },
    { title: 'TEDx | Lotfi Hamadi', url: 'https://www.youtube.com/watch?v=7RkcSz7P9Ew' },
    { title: 'Facebook Interview #1', url: 'https://www.facebook.com/watch/?ref=embed_video&v=1622593341437331' },
    { title: 'Konbini Speech | Lotfi Hamadi', url: 'https://www.facebook.com/konbinifr/videos/367042280444616/?t=0' }
  ]
  const videos = (items?.length ? items : fallback).map(v => {
    // Derive embeddable iframe URL
    if (v.url.includes('youtube.com/watch')) {
      const idMatch = v.url.match(/[?&]v=([^&]+)/)
      const id = idMatch ? idMatch[1] : ''
      return { ...v, embedUrl: id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : v.url }
    } else if (v.url.includes('facebook.com')) {
      // Encode URL for facebook plugin if not already in plugin form
      if (v.url.includes('plugins/video.php')) return { ...v, embedUrl: v.url }
      const encoded = encodeURIComponent(v.url)
      return { ...v, embedUrl: `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=560` }
    }
    return { ...v, embedUrl: v.url }
  })

  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-lg">
        {t('title')}
      </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
              <div className="p-6">
                <h3 className={`text-lg font-semibold text-slate-800 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
