"use client"

import { Factory, Wheat, School, Salad, Recycle, Truck, ShoppingCart, Handshake, Sprout } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"
import { useTranslations } from "next-intl"

const NeonIcon = ({ children }: { children: React.ReactNode }) => (
  <span
    className="inline-flex items-center justify-center [&>*]:h-7 [&>*]:w-7 [&>*]:stroke-[2] [&>*]:text-[rgb(28,52,94)]"
    style={{
      filter:
        "drop-shadow(0 0 6px rgba(28,52,94,0.35)) drop-shadow(0 0 10px rgba(249,115,22,0.45))",
    }}
  >
    {children}
  </span>
)

const processStepsBase = [
  {
    id: "exploitation",
    icon: <Factory className="h-7 w-7" />,
    labelKey: "exploitation",
    position: { top: "5%", left: "10%" }, // Adjusted for responsiveness
    positionLg: { top: "5%", left: "10%" },
  },
  {
    id: "recoltes",
    icon: <Wheat className="h-7 w-7" />,
    labelKey: "recoltes",
    position: { top: "5%", left: "50%" },
    positionLg: { top: "5%", left: "30%" },
  },
  {
    id: "cantine",
    icon: <School className="h-7 w-7" />,
    labelKey: "cantine",
    position: { top: "5%", right: "10%" },
    positionLg: { top: "5%", left: "50%" },
  },
  {
    id: "repas",
    icon: <Salad className="h-7 w-7" />,
    labelKey: "repas",
    position: { top: "35%", right: "5%" },
    positionLg: { top: "5%", left: "70%" },
  },
  {
    id: "compostage",
    icon: <Recycle className="h-7 w-7" />,
    labelKey: "compostage",
    position: { top: "65%", right: "10%" },
    positionLg: { top: "5%", left: "90%" },
  },
  {
    id: "excedent",
    icon: <Truck className="h-7 w-7" />,
    labelKey: "excedent",
    position: { bottom: "5%", right: "10%" },
    positionLg: { bottom: "5%", left: "75%" },
  },
  {
    id: "vente",
    icon: <ShoppingCart className="h-7 w-7" />,
    labelKey: "vente",
    position: { bottom: "5%", left: "50%" },
    positionLg: { bottom: "5%", left: "55%" },
  },
  {
    id: "emplois",
    icon: <Handshake className="h-7 w-7" />,
    labelKey: "emplois",
    position: { bottom: "5%", left: "10%" },
    positionLg: { bottom: "5%", left: "35%" },
  },
  {
    id: "terres",
    icon: <Sprout className="h-7 w-7" />,
    labelKey: "terres",
    position: { top: "35%", left: "5%" },
    positionLg: { bottom: "5%", left: "15%" },
  },
]

export function KidChenProcessDiagram() {
  const t = useTranslations("KidChen.Process")
  const tPage = useTranslations("KidChen.Page") // PHASE 1 i18n fix
  const processSteps = processStepsBase.map((s) => ({
    ...s,
    label: t(`steps.${s.labelKey}`),
  }))
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-lg">
          {t("title")}
        </h2>
        <div className="relative mx-auto h-[520px] w-full max-w-6xl md:h-[520px] lg:h-[360px] hidden">
          {/* SVG for paths */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
            {/* Define arrows/paths */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" fill="#ea580c">
                <polygon points="0 0, 10 3.5, 0 7" />
              </marker>
            </defs>

            {/* Paths for larger screens (lg and up) */}
            <path d="M120 80 H880" fill="none" stroke="url(#grad)" strokeWidth="3" className="hidden lg:block" />
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1c345e" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#1c345e" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.9" />
            </linearGradient>
            <circle cx="120" cy="80" r="4" fill="#fb923c" className="hidden lg:block" />
            <circle cx="880" cy="80" r="4" fill="#fb923c" className="hidden lg:block" />

            {/* Paths for medium screens (md) - simplified for example */}
            <path
              d="M150 70 H450 L480 70 H750"
              fill="none"
              stroke="#fb923c"
              strokeWidth="2"
              className="hidden md:block lg:hidden"
            />
            <path
              d="M750 70 V200 H850 V330"
              fill="none"
              stroke="#fb923c"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className="hidden md:block lg:hidden"
            />
            <path
              d="M850 330 H550 L520 330 H250 L220 330 H150"
              fill="none"
              stroke="#fb923c"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className="hidden md:block lg:hidden"
            />
            <path
              d="M150 330 V70"
              fill="none"
              stroke="#fb923c"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className="hidden md:block lg:hidden"
            />

            {/* Paths for small screens (sm) - even more simplified */}
            <path
              d="M150 70 H450 V200 H150 V330 H450"
              fill="none"
              stroke="#fb923c"
              strokeWidth="2"
              className="hidden sm:block md:hidden"
            />
            <path
              d="M450 330 V70"
              fill="none"
              stroke="#fb923c"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className="hidden sm:block md:hidden"
            />

            {/* Paths for extra small screens (default) */}
            <path
              d="M500 50 V150 H100 V250 H500 V350 H100 V450 H500 V550 H100 V650"
              fill="none"
              stroke="#fb923c"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className="block sm:hidden"
            />
          </svg>

          {/* Positioned items */}
          {processSteps.map((step, idx) => (
            <div
              key={step.id}
              className={cn(
                "absolute flex w-28 flex-col items-center text-center text-xs md:w-36 md:text-sm lg:w-28",
                // Default positioning for small screens
                step.id === "exploitation" && "top-[5%] left-[5%]",
                step.id === "recoltes" && "top-[18%] left-[50%] -translate-x-1/2",
                step.id === "cantine" && "top-[31%] left-[5%]",
                step.id === "repas" && "top-[44%] left-[50%] -translate-x-1/2",
                step.id === "compostage" && "top-[57%] left-[5%]",
                step.id === "excedent" && "top-[70%] left-[50%] -translate-x-1/2",
                step.id === "vente" && "top-[83%] left-[5%]",
                step.id === "emplois" && "top-[96%] left-[50%] -translate-x-1/2",
                step.id === "terres" && "top-[70%] left-[5%]", // This one needs careful placement

                // Positioning for medium screens (md)
                "md:top-auto md:left-auto md:right-auto md:bottom-auto", // Reset for md
                step.id === "exploitation" && "md:top-[5%] md:left-[10%]",
                step.id === "recoltes" && "md:top-[5%] md:left-[30%]",
                step.id === "cantine" && "md:top-[5%] md:left-[50%]",
                step.id === "repas" && "md:top-[5%] md:left-[70%]",
                step.id === "compostage" && "md:top-[5%] md:right-[10%]",
                step.id === "excedent" && "md:bottom-[5%] md:right-[10%]",
                step.id === "vente" && "md:bottom-[5%] md:left-[70%]",
                step.id === "emplois" && "md:bottom-[5%] md:left-[30%]",
                step.id === "terres" && "md:bottom-[5%] md:left-[10%]",

                // Positioning for large screens (lg) - more compact horizontal layout
                "lg:top-auto lg:left-auto lg:right-auto lg:bottom-auto", // Reset for lg
                // evenly distribute along the horizontal rail
                `lg:top-[18%] lg:left-[${8 + idx * 10}%]`,
              )}
            >
              <div className="mb-2 rounded-2xl bg-white p-2 shadow-md dark:bg-neutral-800 ring-1 ring-orange-200/60">
                {/* PHASE 1 i18n fix: decorative icons */}
                <span aria-hidden="true">{step.icon}</span>
              </div>
              <p className="font-medium text-white/90 leading-snug">{step.label}</p>
            </div>
          ))}

          {/* Central "Kid'chen" label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            {/* PHASE 1 i18n fix: translate central label */}
            <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">
              {tPage("title")}
            </h3>
          </div>
        </div>

        {/* Desktop / Large screens: grid layout with rail */}
        <div className="hidden lg:block">
          <div className="relative mx-auto w-full max-w-6xl">
            <div className="pointer-events-none absolute left-0 right-0 top-6 h-[3px] bg-gradient-to-r from-[rgb(28,52,94)] via-[rgb(28,52,94)] to-orange-500/90 rounded-full" />
            <div className="grid grid-cols-9 gap-6 pt-10">
              {processSteps.map((step) => (
                <div key={step.id} className="flex flex-col items-center text-center">
                  <div className="mb-2">
                    {/* PHASE 1 i18n fix: decorative icons */}
                    <NeonIcon>
                      <span aria-hidden="true">{step.icon}</span>
                    </NeonIcon>
                  </div>
                  <p className="text-sm font-medium leading-snug max-w-[9rem] text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet simplified vertical timeline */}
        <div className="lg:hidden relative mx-auto">
          <div className="absolute left-6 top-6 bottom-6 w-[3px] bg-gradient-to-b from-[rgb(28,52,94)] to-orange-500 rounded-full" />
          <div className="flex flex-col gap-6 pl-12 pr-4">
            {processSteps.map((step) => (
              <div key={step.id} className="flex items-center gap-4">
                <NeonIcon>{step.icon}</NeonIcon>
                <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
