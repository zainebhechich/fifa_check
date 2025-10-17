"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, Variants } from "framer-motion" // Import motion
import { useTranslations } from "next-intl" // PHASE 1 i18n fix

// PHASE 1 i18n fix: labels localized via messages.Achievements
const buildAchievements = (t: ReturnType<typeof useTranslations>) => [
  { value: "2", label: t("farms") },
  { value: "1", label: t("beekeepingLab") },
  { value: "1", label: t("cosmeticsLab") },
  { value: "+2,000", label: t("studentsImproved") },
  { value: "+1,000", label: t("dailyShowers") },
  { value: "≈500 t", label: t("produce") },
  { value: "+1,000", label: t("balancedMeals") },
  { value: "+15", label: t("trainedUnemployed") },
  { value: "+2,000", label: t("afterSchoolClubs") },
  { value: "+5,000", label: t("menstrualHygiene") },
  { value: "≈2,000", label: t("washablePads") },
  { value: "+65", label: t("farmerParents") },
  { value: "360 000 kWh", label: t("energyProduction") },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child animation
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
}

export function AchievementsSection() {
  const t = useTranslations('Achievements') // PHASE 1 i18n fix
  return (
    <section className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[rgb(28,52,94)] to-orange-500 dark:from-white dark:via-[rgb(28,52,94)] dark:to-orange-400">
          {t('title')} {/* PHASE 1 i18n fix */}
        </h2>
        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Animate only once when 30% of the component is in view
        >
          {buildAchievements(t).map((achievement, index) => (
            <motion.div
              key={index}
              whileInView="visible"
              initial="hidden"
              variants={itemVariants}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="border-slate-200 bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-4xl font-bold text-orange-600 dark:text-orange-500">
                    {achievement.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{achievement.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
