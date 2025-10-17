"use client"

import { motion } from "framer-motion"
import { LandPlot, BriefcaseBusiness, UtensilsCrossed, LeafyGreen, Award } from "lucide-react"
import { useTranslations } from "next-intl"

type FigureBase = { value: number | string; icon: JSX.Element; gradient: string }
type FigureItem = FigureBase & { mainText: string; subText: string }

const keyFiguresBase: FigureBase[] = [
  { value: 8, icon: <LandPlot className="h-4 w-4" />, gradient: "from-emerald-500 to-green-600" },
  { value: 9, icon: <BriefcaseBusiness className="h-4 w-4" />, gradient: "from-blue-500 to-cyan-600" },
  { value: 104000, icon: <UtensilsCrossed className="h-4 w-4" />, gradient: "from-orange-500 to-red-500" },
  { value: 150, icon: <LeafyGreen className="h-4 w-4" />, gradient: "from-green-600 to-emerald-700" },
  { value: "SMSA", icon: <Award className="h-4 w-4" />, gradient: "from-purple-500 to-pink-600" },
] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    } as const,
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
}

export function KidChenKeyFigures() {
  const t = useTranslations("KidChen.KeyFigures")
  const keyFiguresData: FigureItem[] = keyFiguresBase.map((item, idx) => ({
    ...item,
    mainText: t(`items.${idx}.main`),
    subText: t(`items.${idx}.sub`),
  }))
  return (
    <section className="py-8 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <div className="relative inline-block">
            <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 mb-1">
              {t("title")}
            </h2>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          </div>
          <p className="text-xs md:text-sm font-medium text-white/80">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {keyFiguresData.map((figure, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="bg-white/70 backdrop-blur-sm rounded-md p-2.5 ring-1 ring-white/30 border-none shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 h-full flex flex-col">
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div className="mb-1.5 flex justify-center">
                    <div className="p-1 rounded-full bg-gradient-to-br from-[#142346]/8 to-orange-500/8">
                      {/* PHASE 1 i18n fix: decorative icon */}
                      <span className="text-[#142346]" style={{ filter: "drop-shadow(0 0 2px rgba(20,35,70,0.2))" }}>
                        <span aria-hidden="true">{figure.icon}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mb-1 flex-1 flex flex-col justify-center">
                    <span className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 block leading-tight">
                      {figure.value !== undefined ? (
                        <span className="tabular-nums">
                          {typeof figure.value === 'number' && figure.value >= 1000
                            ? `${(figure.value / 1000).toFixed(0)}k`
                            : figure.value === 104000
                              ? '104k'
                              : figure.value
                          }
                        </span>
                      ) : (
                        <span className="text-sm md:text-base">{figure.mainText}</span>
                      )}
                    </span>
                    {figure.value !== undefined && (
                      <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">
                        {figure.mainText}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-tight mt-auto">
                    {figure.subText}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
