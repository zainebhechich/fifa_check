"use client"

import { motion } from "framer-motion"
import { Factory, Camera, GraduationCap, Users, BookOpen, Handshake } from "lucide-react"
import { useTranslations, useLocale } from "next-intl" // PHASE 1 i18n fix

const actionsIcons = (index: number) => {
  switch (index) {
    case 0:
      return <Factory key={index} className="h-8 w-8 text-purple-600" />
    case 1:
      return <Camera key={index} className="h-8 w-8 text-pink-600" />
    case 2:
      return <GraduationCap key={index} className="h-8 w-8 text-indigo-600" />
    case 3:
      return <Users key={index} className="h-8 w-8 text-green-600" />
    case 4:
      return <BookOpen key={index} className="h-8 w-8 text-orange-600" />
    default:
      return <Handshake key={index} className="h-8 w-8 text-teal-600" />
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function EcolibreeActions() {
  const t = useTranslations('Ecolibree.Actions') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === 'ar'
  return (
    <section className="py-8 md:py-12 bg-transparent">
      <div className="container mx-auto px-3 sm:px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-lg">{t('title')}</h2>
        <div className="mx-auto h-0.5 w-14 md:w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500 mb-6 md:mb-8" />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {Array.from({ length: 6 }).map((_, i) => {
            const index = isRtl ? 5 - i : i
            return (
              <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-md rounded-lg md:rounded-xl p-4 md:p-6 ring-1 ring-white/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 md:mb-3">
                <div className="mr-0 sm:mr-4 mb-2 sm:mb-0">{actionsIcons(index)}</div>
                <h3 className="text-base md:text-lg font-semibold text-slate-800 text-center sm:text-left">{t(`items.${index}.title`)}</h3>
              </div>
              <p className="text-blue-900 text-sm mb-2 md:mb-3 text-center sm:text-left">{t(`items.${index}.description`)}</p>
              <div className="bg-white/90 rounded-md md:rounded-lg p-2 md:p-3 mb-2 md:mb-3 ring-1 ring-white/40">
                <p className="text-xs text-slate-500 font-medium text-center">{t(`items.${index}.stats`)}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-md md:rounded-lg p-2">
                <p className="text-xs font-semibold text-purple-700 text-center">{t(`items.${index}.highlight`)}</p>
              </div>
            </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
