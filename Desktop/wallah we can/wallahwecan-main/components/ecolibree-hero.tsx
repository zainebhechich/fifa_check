"use client"

import { FlipWords } from "@/components/ui/flip-words"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl" // PHASE 1 i18n fix

export function EcolibreeHero() {
  const t = useTranslations('Ecolibree.Hero') // PHASE 1 i18n fix
  const words = t.raw('words') as string[] // PHASE 1 i18n fix
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
  <section className="py-12 md:py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block"
          >
            <div className="relative">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-sm mb-3 md:mb-4 ${isRTL ? 'leading-[1.5] absolute left-1/2 transform -translate-x-1/2 w-max text-center' : ''}`}> {/* RTL line-height tweak */}
                {t('titlePrefix')}{" "}
                <span className="inline-block mx-auto w-max text-center">
                  <FlipWords
                    words={words}
                    className="text-pink-600"
                  />
                </span>
              </h1>
              <div className="mx-auto h-0.5 w-14 md:w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500 mb-4 md:mb-6" />
            </div>
            <p className="text-white/90 leading-relaxed text-base md:text-lg max-w-4xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <Card className="bg-white/90 backdrop-blur-md ring-1 ring-white/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-5 md:p-8">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 mb-3">
                  {t('originTitle')}
                </h2>
                <div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-[#142346] to-orange-500 mb-4" />
                <p className="text-slate-800 leading-relaxed text-sm md:text-lg">
                  {t('originParagraph')}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
