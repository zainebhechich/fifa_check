"use client"

import { MessageCircle, PenTool, Settings, Play, BarChart3, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "../lib/utils"

export function TeamBuildingProcess() {
  const t = useTranslations("TeamBuilding.Process")
  const locale = useLocale()
  const isRtl = typeof locale === 'string' && locale.startsWith('ar')

  const processSteps = [1, 2, 3, 4, 5].map((i) => ({
    id: i,
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
    duration: t(`steps.${i}.duration`),
    icon: [MessageCircle, PenTool, Settings, Play, BarChart3][i - 1],
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    },
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn("mb-16", isRtl ? "text-right" : "text-center")}
        >
          <div className="relative inline-block">
            <h2 className={cn("text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-4", isRtl && "bg-gradient-to-l") }>
              {t("title")}
            </h2>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          </div>
          <p className={cn("text-lg text-[rgb(20,35,70)] max-w-3xl mx-auto mt-6", isRtl ? "text-right" : "text-center") }>
            {isRtl ? (
              <span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t("subtitle")}{'\u200F'}</span>
            ) : (
              t("subtitle")
            )}
          </p>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-white/40 via-white/20 to-white/40"></div>

          <div className="space-y-16 lg:space-y-20">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className="flex-1 lg:max-w-lg">
                    <div className={cn(
                      "text-center lg:text-left",
                      index % 2 === 0 ? "lg:text-right" : "lg:text-left",
                      isRtl && "text-right"
                    )}>
                      <div className={cn("inline-flex items-center font-medium text-sm mb-3", isRtl ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2", "text-[rgb(20,35,70)]") }>
                        {isRtl ? (
                          <span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{`${t("stepLabel")} ${step.id} • ${step.duration}`}{'\u200F'}</span>
                        ) : (
                          <>
                            <span>{t("stepLabel")} {step.id}</span>
                            <span>•</span>
                            <span>{step.duration}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-[rgb(20,35,70)] mb-4">
                        {isRtl ? (
                          <span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{step.title}{'\u200F'}</span>
                        ) : (
                          step.title
                        )}
                      </h3>
                      <p className="text-[rgb(20,35,70)]/85 leading-relaxed text-base">
                        {isRtl ? (
                          <span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{step.description}{'\u200F'}</span>
                        ) : (
                          step.description
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                      <IconComponent size={28} className="text-[rgb(20,35,70)] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Timeline dot for mobile */}
                    <div className="lg:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white/60 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 lg:max-w-lg hidden lg:block"></div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-20"
        >
          <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="text-center">
              <h3 className={cn("text-2xl lg:text-3xl font-bold text-[rgb(20,35,70)] mb-4", isRtl ? "text-right" : "text-center") }>
                {t("cta.title")}
              </h3>
              <p className={cn("text-lg text-gray-700 mb-8 max-w-2xl mx-auto", isRtl ? "text-right" : "text-center") }>
                {t("cta.subtitle")}
              </p>
              <div className={cn("flex flex-col sm:flex-row gap-6 justify-center items-center", isRtl && "sm:flex-row-reverse") }>
                <div className={cn("flex items-center gap-3 text-[rgb(20,35,70)] font-medium", isRtl && "flex-row-reverse") }>
                  <Phone size={20} className={cn(isRtl && "order-2")} />
                  <span>+216 27 068 084</span>
                </div>
                <div className={cn("flex items-center gap-3 text-[rgb(20,35,70)] font-medium", isRtl && "flex-row-reverse") }>
                  <Mail size={20} className={cn(isRtl && "order-2")} />
                  <span>contact@wallahwecan.org</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
