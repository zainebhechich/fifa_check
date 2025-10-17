"use client"

import { ActivityCard } from "@/components/activity-card"
import { useTranslations } from "next-intl" // PHASE 1 i18n fix

// PHASE 1 i18n fix: activities are now sourced from translations (TeamBuilding.Activities)
const buildActivities = (t: ReturnType<typeof useTranslations>) => [
  {
    id: 1,
    title: t("items.formula1.title"),
    description: t("items.formula1.description"),
  image: "/placeholder.svg",
    category: t("categoryTeamBuilding"),
    duration: t("items.formula1.duration"),
    participants: t("items.formula1.participants"),
    price: t("priceOnQuote"),
  },
  {
    id: 2,
    title: t("items.formula2.title"),
    description: t("items.formula2.description"),
  image: "/placeholder.svg",
    category: t("categoryTeamBuilding"),
    duration: t("items.formula2.duration"),
    participants: t("items.formula2.participants"),
    price: t("priceOnQuote"),
  },
  {
    id: 3,
    title: t("items.formula3.title"),
    description: t("items.formula3.description"),
  image: "/placeholder.svg",
    category: t("categoryTeamBuilding"),
    duration: t("items.formula3.duration"),
    participants: t("items.formula3.participants"),
    price: t("priceOnQuote"),
  },
  {
    id: 4,
    title: t("items.formula4.title"),
    description: t("items.formula4.description"),
  image: "/placeholder.svg",
    category: t("categoryTeamBuilding"),
    duration: t("items.formula4.duration"),
    participants: t("items.formula4.participants"),
    price: t("priceOnQuote"),
  },
  {
    id: 5,
    title: t("items.formula5.title"),
    description: t("items.formula5.description"),
  image: "/placeholder.svg",
    category: t("categoryTeamBuilding"),
    duration: t("items.formula5.duration"),
    participants: t("items.formula5.participants"),
    price: t("priceOnQuote"),
  },
]

export function ActivitiesSection() {
  const t = useTranslations("TeamBuilding.Activities") // PHASE 1 i18n fix
  const activities = buildActivities(t) // PHASE 1 i18n fix
  return (
    <section className="py-16 bg-gray-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
          {t("title")} {/* PHASE 1 i18n fix */}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  )
}
