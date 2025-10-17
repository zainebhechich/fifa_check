"use client"

import { motion } from "framer-motion"
import { useTranslations, useLocale } from 'next-intl' // PHASE 1 i18n fix

export function ModernHeroSection() {
  const t = useTranslations('Shop.ModernHero') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRTL = locale === 'ar'
  return (
  <section className="relative h-screen flex items-center justify-center overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/placeholder.mp4" type="video/mp4" />
          {/* Fallback gradient if video doesn't load */}
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${isRTL ? 'leading-[1.4]' : ''}`}>
            {t('titlePrefix')}{" "}
            <span className="relative">
              {t('brand')}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              {t('discover')}
            </button>
            <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
              {t('activities')}
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border-2 border-yellow-400 rounded-full opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 border-2 border-yellow-400 rounded-full opacity-30"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </section>
  )
}
