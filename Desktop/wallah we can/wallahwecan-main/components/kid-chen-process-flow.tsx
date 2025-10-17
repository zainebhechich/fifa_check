'use client';
"use client" // PHASE 1 i18n fix

import { Factory, Wheat, School, Salad, Recycle, Truck, ShoppingCart, Handshake, Sprout } from "lucide-react"
import { useTranslations } from 'next-intl' // PHASE 1 i18n fix

// PHASE 1 i18n fix: icon map and step order for translated labels
const flowIcons = {
  exploitation: <Factory className="h-8 w-8 text-orange-600 dark:text-orange-500" />,
  recoltes: <Wheat className="h-8 w-8 text-orange-600 dark:text-orange-500" />,
  cantine: <School className="h-8 w-8 text-orange-600 dark:text-orange-500" />,
  repas: <Salad className="h-8 w-8 text-orange-600 dark:text-orange-500" />,
  compostage: <Recycle className="h-8 w-8 text-orange-600 dark:text-orange-500" />,
  excedent: <Truck className="h-8 w-8 text-orange-600 dark:text-orange-500" />,
  vente: <ShoppingCart className="h-8 w-8 text-orange-600 dark:text-orange-500" />,
  emplois: <Handshake className="h-8 w-8 text-orange-600 dark:text-orange-500" />,
  terres: <Sprout className="h-8 w-8 text-orange-600 dark:text-orange-500" />,
} as const

type StepKey = keyof typeof flowIcons

const stepOrder: StepKey[] = [
  'exploitation',
  'recoltes',
  'cantine',
  'repas',
  'compostage',
  'excedent',
  'vente',
  'emplois',
  'terres',
]

export function KidChenProcessFlow() {
  const t = useTranslations('KidChen.Process') // PHASE 1 i18n fix
  const flowItems = stepOrder.map((key) => ({
    icon: flowIcons[key],
    label: t(`steps.${key}`),
  }))
  return (
    <section className="py-16 bg-gray-100 dark:bg-neutral-950">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-800 dark:text-white md:text-4xl">
          {t('title')}
        </h2>
        <div className="relative mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 items-start justify-center">
            {flowItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center p-2">
                <div className="bg-white dark:bg-neutral-800 rounded-full p-4 shadow-md mb-3 border border-slate-200 dark:border-neutral-700">
                  {item.icon}
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
          {/* Simple visual arrows for flow indication (can be enhanced with SVG for complex paths) */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
            <div className="absolute top-[15%] left-[15%] w-[20%] h-px bg-orange-400 rotate-12" />
            <div className="absolute top-[15%] right-[15%] w-[20%] h-px bg-orange-400 -rotate-12" />
            <div className="absolute top-[50%] left-[10%] w-[10%] h-px bg-orange-400" />
            <div className="absolute top-[50%] right-[10%] w-[10%] h-px bg-orange-400" />
            <div className="absolute bottom-[15%] left-[15%] w-[20%] h-px bg-orange-400 -rotate-12" />
            <div className="absolute bottom-[15%] right-[15%] w-[20%] h-px bg-orange-400 rotate-12" />
          </div>
        </div>
      </div>
    </section>
  )
}
