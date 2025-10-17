"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { gsap } from "gsap"

interface KidChenStatItemProps {
  icon: React.ReactNode
  value?: number // Optional for numerical stats
  mainText: string // For descriptive stats like "SMSA Kid'chen" or the unit for numerical stats
  subText: string
}

export function KidChenStatItem({ icon, value, mainText, subText }: KidChenStatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  const [displayValue, setDisplayValue] = useState<string>(() => {
    // Initialize with 0 or the mainText if no value
    if (value !== undefined) {
      return Intl.NumberFormat("fr-FR").format(0)
    }
    return mainText
  })

  useEffect(() => {
    let cleanup: (() => void) | undefined
    if (inView && value !== undefined) {
      const counter = { n: 0 }
      const tween = gsap.to(counter, {
        n: value,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => setDisplayValue(Intl.NumberFormat("fr-FR").format(Math.round(counter.n))),
      })
      cleanup = () => tween.kill()
    } else if (value === undefined) {
      setDisplayValue(mainText)
    }
    return cleanup
  }, [inView, value, mainText])

  return (
    <div ref={ref} className="bg-white/80 backdrop-blur-md rounded-xl p-4 ring-1 ring-white/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
      {icon && (
        <span
          className="inline-flex items-center justify-center mb-3 [&>*]:!h-8 [&>*]:!w-8 text-[#142346]"
          style={{ filter: "drop-shadow(0 0 6px rgba(20,35,70,0.35)) drop-shadow(0 0 10px rgba(252,132,19,0.45))" }}
        >
          {/* PHASE 1 i18n fix: decorative icon */}
          <span aria-hidden="true">{icon}</span>
        </span>
      )}
      <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">
        {value !== undefined ? displayValue : mainText}
      </span>
      {value !== undefined && (
        <span className="mt-0.5 text-base md:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">
          {mainText}
        </span>
      )}
      <p className="text-sm text-slate-800 leading-tight mt-2">{subText}</p>
    </div>
  )
}
