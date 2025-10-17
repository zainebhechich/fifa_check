"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Sparkles, Heart, Download } from "lucide-react"
import { Button } from "./ui/button"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "../lib/utils"

export function ShopHero() {
  const t = useTranslations('Shop.Hero') // PHASE 1 i18n fix
  const tBrand = useTranslations('Common.Brand') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = typeof locale === 'string' && locale.startsWith('ar')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const backgroundImages = ["/shop1.png", "/shop2.png", "/shop3.png"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  return (
  <section className="relative h-[100svh] overflow-hidden" dir={isRtl ? "rtl" : "ltr"}> {/* remove top padding so hero sits directly under navbar */}
      {/* Background Images with Slideshow - Full Viewport */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt="" // decorative background image, no translation needed // PHASE 1 i18n fix
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-orange-600/30" />
      </div>

      {/* Content */}
  <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center pt-6 md:pt-4 lg:pt-2"> {/* subtle inner padding for content breathing room */}
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl">
          {/* Left Content */}
          <div className={cn("space-y-6", isRtl ? "text-right" : "text-left") }>
            <div className="space-y-4">
              <div className={cn("inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4", isRtl && "flex-row-reverse") }>
                <Sparkles className="h-5 w-5 text-orange-300" />
                <span className="text-white font-medium">{t('solidarityShop')}</span> {/* PHASE 1 i18n fix */}
                <Heart className="h-5 w-5 text-orange-300" />
              </div>

              {/* Le Label Logo */}
              <div className="mb-4">
                <Image
                  src="https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_le-label.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfbGUtbGFiZWwud2VicCIsImlhdCI6MTc1ODgwMDE2NiwiZXhwIjoxOTE2NDgwMTY2fQ.bQM07lpq6eL6bl5-tOTy1bAmAVlKrE5dYfR9bIOWCmw"
                  alt={tBrand('leLabelAlt')}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full bg-white/20 p-2 backdrop-blur-sm"
                  sizes="48px"
                />
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {t('titleLine1')}
                <span className="block text-orange-200">{t('titleLine2')}</span>
              </h1>
              
              <div className="space-y-3">
                <p className="text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
                  {isRtl ? (
                    <span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('subtitle1')}{'\u200F'}</span>
                  ) : (
                    t('subtitle1')
                  )}
                </p>
                <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                  {isRtl ? (
                    <span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('subtitle2')}{'\u200F'}</span>
                  ) : (
                    t('subtitle2')
                  )}
                </p>
              </div>
            </div>

            <div className={cn("flex flex-col sm:flex-row gap-4", isRtl && "sm:flex-row-reverse") }>
              <Button
                variant="outline"
                className="bg-white/20 border-white/40 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                asChild
              >
                <a
                  href="https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/Catalogue-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL0NhdGFsb2d1ZS1jb21wcmVzc2VkLnBkZiIsImlhdCI6MTc1ODIwNDMxMiwiZXhwIjoxOTE1ODg0MzEyfQ.L_owfDTVtsh5_vFWh7xWf1wZ0eEFUWzwGL4POH1Hoc0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("flex items-center gap-2", isRtl && "flex-row-reverse") }
                >
                  <Download className="h-4 w-4" />
                  {t('downloadCatalog')}
                </a>
              </Button>
              
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="#products-section">{t('discoverProducts')}</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 justify-items-center">
              <div className={cn("text-center lg:text-left", isRtl && "lg:text-right") }>
                <div className="text-2xl font-bold text-orange-200">{t('stat1.value')}</div>
                <div className="text-sm text-white/70">{t('stat1.label')}</div>
              </div>
              <div className={cn("text-center lg:text-left", isRtl && "lg:text-right") }>
                <div className="text-2xl font-bold text-orange-200">{t('stat2.value')}</div>
                <div className="text-sm text-white/70">{t('stat2.label')}</div>
              </div>
              <div className={cn("text-center lg:text-left", isRtl && "lg:text-right") }>
                <div className="text-2xl font-bold text-orange-200">{t('stat3.value')}</div>
                <div className="text-sm text-white/70">{t('stat3.label')}</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="hidden lg:flex flex-col space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">{t('feature1.title')}</h3>
              <p className="text-white/80 text-sm">{isRtl ? (<span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('feature1.description')}{'\u200F'}</span>) : t('feature1.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">{t('feature2.title')}</h3>
              <p className="text-white/80 text-sm">{isRtl ? (<span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('feature2.description')}{'\u200F'}</span>) : t('feature2.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">{t('feature3.title')}</h3>
              <p className="text-white/80 text-sm">{isRtl ? (<span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('feature3.description')}{'\u200F'}</span>) : t('feature3.description')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {backgroundImages.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentImageIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </section>
  )
}
