"use client"

import { AchievementCard } from "@/components/ui/achievement-card" // Import the new AchievementCard
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  Tree as Farm,
  Flask as Bee,
  Sparkle,
  GraduationCap,
  Shower as ShowerHead,
  AppleLogo as Apple,
  ForkKnife as Utensils,
  Briefcase,
  GameController as Gamepad,
  Drop as Droplet,
  Handshake as HeartHandshake,
  UsersThree as Users,
  Lightning as Zap,
} from "phosphor-react"
import { cn } from "@/lib/utils"

export function AnimatedAchievementsSection() {
  const t = useTranslations("Achievements");

  const achievementsData = [
    { prefix: "", value: 2, suffix: "", label: t("farms"), icon: <Farm className="h-10 w-10" weight="duotone" /> },
    { prefix: "", value: 1, suffix: "", label: t("beekeepingLab"), icon: <Bee className="h-10 w-10" weight="duotone" /> },
    { prefix: "", value: 1, suffix: "", label: t("cosmeticsLab"), icon: <Sparkle className="h-10 w-10" weight="duotone" /> },
    {
      prefix: "+",
      value: 2000,
      suffix: "",
      label: t("studentsImproved"),
      icon: <GraduationCap className="h-10 w-10" weight="duotone" />,
    },
    {
      prefix: "+",
      value: 1000,
      suffix: "",
      label: t("dailyShowers"),
      icon: <ShowerHead className="h-10 w-10" weight="duotone" />,
    },
    {
      prefix: "≈",
      value: 500,
      suffix: " t",
      label: t("produce"),
      icon: <Apple className="h-10 w-10" weight="duotone" />,
    },
    {
      prefix: "+",
      value: 1000,
      suffix: "",
      label: t("balancedMeals"),
      icon: <Utensils className="h-10 w-10" weight="duotone" />,
    },
    {
      prefix: "+",
      value: 15,
      suffix: "",
      label: t("trainedUnemployed"),
      icon: <Briefcase className="h-10 w-10" weight="duotone" />,
    },
    {
      prefix: "+",
      value: 2000,
      suffix: "",
      label: t("afterSchoolClubs"),
      icon: <Gamepad className="h-10 w-10" weight="duotone" />,
    },
    {
      prefix: "+",
      value: 5000,
      suffix: "",
      label: t("menstrualHygiene"),
      icon: <Droplet className="h-10 w-10" weight="duotone" />,
    },
    {
      prefix: "≈",
      value: 2000,
      suffix: "",
      label: t("washablePads"),
      icon: <HeartHandshake className="h-10 w-10" weight="duotone" />,
    },
    {
      prefix: "+",
      value: 65,
      suffix: "",
      label: t("farmerParents"),
      icon: <Users className="h-10 w-10" weight="duotone" />,
    },
    {
      prefix: "",
      value: 360000,
      suffix: " Kw/h",
      label: t("energyProduction"),
      icon: <Zap className="h-10 w-10" weight="duotone" />,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for each item
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-center">
          <div className="rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/20 backdrop-blur-md shadow-[0_10px_30px_rgba(28,52,94,0.18)]">
            <h2 className="text-3xl font-extrabold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[rgb(28,52,94)] to-orange-500 dark:from-white dark:via-[rgb(28,52,94)] dark:to-orange-400">
              {t("title")}
            </h2>
          </div>
        </div>
        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "flex justify-center",
                index === achievementsData.length - 1 && "col-span-full", // Apply col-span-full to the last item
              )}
            >
              <AchievementCard
                value={achievement.value}
                label={achievement.label}
                prefix={achievement.prefix}
                suffix={achievement.suffix}
                icon={achievement.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
