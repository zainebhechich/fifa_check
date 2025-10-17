"use client"

import Image from "next/image"
import { Heart, Leaf, Palette, Users, Settings, Clock, Check } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl" // PHASE 1 i18n fix
import { cn } from "../lib/utils"

export function TeamBuildingServices() {
  const locale = useLocale()
  const t = useTranslations('TeamBuilding.Services') // PHASE 1 i18n fix
  const isRtl = locale === "ar"
  const services = [
    {
      id: 1,
      title: t('formulas.1.title'),
      description: t('formulas.1.description'),
      image: "/miel.webp",
      icon: Heart,
      duration: t('formulas.1.duration'),
      participants: t('formulas.1.participants'),
      category: t('category'),
      benefits: [t('benefits.0'), t('benefits.1'), t('benefits.2')],
      details: t('formulas.1.details')
    },
    {
      id: 2,
      title: t('formulas.2.title'),
      description: t('formulas.2.description'),
      image: "/Senteurs.webp",
      icon: Leaf,
      duration: t('formulas.2.duration'),
      participants: t('formulas.2.participants'),
      category: t('category'),
      benefits: [t('benefits.0'), t('benefits.1'), t('benefits.2')],
      details: t('formulas.2.details')
    },
    {
      id: 3,
      title: t('formulas.3.title'),
      description: t('formulas.3.description'),
      image: "/Les-mains.webp",
      icon: Palette,
      duration: t('formulas.3.duration'),
      participants: t('formulas.3.participants'),
      category: t('category'),
      benefits: [t('benefits.0'), t('benefits.1'), t('benefits.2')],
      details: t('formulas.3.details')
    },
    {
      id: 4,
      title: t('formulas.4.title'),
      description: t('formulas.4.description'),
      image: "/Harmonie.webp",
      icon: Users,
      duration: t('formulas.4.duration'),
      participants: t('formulas.4.participants'),
      category: t('category'),
      benefits: [t('benefits.0'), t('benefits.1'), t('benefits.2')],
      details: t('formulas.4.details')
    },
    {
      id: 5,
      title: t('formulas.5.title'),
      description: t('formulas.5.description'),
      image: "/Carte.webp",
      icon: Settings,
      duration: t('formulas.5.duration'),
      participants: t('formulas.5.participants'),
      category: t('category'),
      benefits: [t('benefits.0'), t('benefits.1'), t('benefits.2')],
      details: t('formulas.5.details')
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    },
  }

  return (
  <section className="py-16 lg:py-24" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-4">
              {t('title')} {/* PHASE 1 i18n fix */}
            </h2>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          </div>
          <p className={cn("text-lg text-white/90 max-w-3xl mx-auto", isRtl ? "text-right" : "text-center")}>{t('subtitle')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/${locale}/team-building/formule-${service.id}`}>
                  <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col group cursor-pointer" dir={isRtl ? "rtl" : "ltr"}>
                    {/* Image */}
                    <div className="relative overflow-hidden h-48">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className={cn("absolute top-4", isRtl ? "right-4" : "left-4") }>
                        <div className="w-10 h-10 bg-gradient-to-br from-[rgb(20,35,70)] to-[rgb(20,35,70)]/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent size={20} className="text-white" />
                        </div>
                      </div>
                      <div className={cn("absolute top-4", isRtl ? "left-4" : "right-4") }>
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium group-hover:bg-orange-400 transition-colors duration-300">{service.category}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={cn("p-6 flex-1 flex flex-col", isRtl ? "text-right" : "text-left") }>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[rgb(20,35,70)] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 mb-4 leading-relaxed flex-1">
                        {service.description}
                      </p>

                      {/* Details */}
                      <div className={cn("flex items-center justify-between text-sm text-gray-600 mb-4", isRtl && "flex-row-reverse") }>
                        <div className={cn("flex items-center gap-1", isRtl && "flex-row-reverse") }>
                          <Clock size={14} className="text-orange-500" />
                          <span>{service.duration}</span>
                        </div>
                        <div className={cn("flex items-center gap-1", isRtl && "flex-row-reverse") }>
                          <Users size={14} className="text-orange-500" />
                          <span>{service.participants}</span>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-2 mb-4">
                        <h4 className="text-sm font-medium text-gray-900">{t('benefitsTitle')}</h4>
                        <ul className="space-y-1">
                          {service.benefits.slice(0, 2).map((benefit, index) => (
                            <li
                              key={index}
                              className={cn("flex items-start gap-2 text-sm text-gray-700", isRtl && "flex-row-reverse") }
                            >
                              <Check size={14} className="text-orange-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Logistics Details */}
                      <div className="border-t border-gray-200 pt-4 mt-auto">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">{t('logisticsTitle')}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{service.details}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
