"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react" // Import useState
import { useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value?: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  icon?: React.ReactNode
}

export function AnimatedCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
  icon,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const iconRef = useRef<HTMLSpanElement | null>(null)

  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    const formattedNumber = Intl.NumberFormat("fr-FR").format(Math.round(latest))
    return `${prefix}${formattedNumber}${suffix}`
  })

  // State to hold the rendered string value of the counter
  const [displayValue, setDisplayValue] = useState(() => {
    // Initialize with 0 or the mainText if no value
    return value !== undefined ? Intl.NumberFormat("fr-FR").format(0) : `${prefix}${label}`
  })

  useEffect(() => {
    // Subtle, continuous floating and glow for the icon
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: -3,
        scale: 1.02,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      })
      gsap.to(iconRef.current, {
        boxShadow: "0 0 18px rgba(28,52,94,0.28), 0 0 28px rgba(28,52,94,0.16)",
        filter: "drop-shadow(0 0 8px rgba(28,52,94,0.28))",
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
    }

    if (inView && value !== undefined) {
      // Animate the MotionValue
      animate(count, value, {
        duration: duration,
        ease: "easeOut",
      })

      // Subscribe to changes in the MotionValue and update local state (Framer v11)
      const unsubscribe = rounded.on("change", (latestValue) => {
        setDisplayValue(latestValue as string)
      })

      // Cleanup subscription
      return () => unsubscribe()
    } else if (value === undefined) {
      // For non-animated stats, just set the display value
      setDisplayValue(`${prefix}${label}`)
    }
  }, [inView, count, value, rounded, prefix, label, duration]) // Added dependencies

  return (
    <div ref={ref} className={cn("flex flex-col items-center text-center", className)}>
      <div className="flex items-center justify-center gap-2">
        {icon && (
          <span
            ref={iconRef}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 shadow-[0_6px_22px_rgba(28,52,94,0.2)]"
            aria-hidden="true"
          >
            <span className="text-[rgb(28,52,94)] [&>*]:!h-6 [&>*]:!w-6 md:[&>*]:!h-7 md:[&>*]:!w-7">{icon}</span>
          </span>
        )}
        <span className="text-xl md:text-2xl font-extrabold text-[rgb(28,52,94)] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
          {displayValue}
        </span>
      </div>
      {value !== undefined && (
        <div className="mt-1 rounded-xl bg-white/6 px-2 py-1.5 ring-1 ring-white/10 backdrop-blur-md shadow-[0_6px_22px_rgba(28,52,94,0.15)]">
          <p className="text-[13px] md:text-sm font-medium text-[rgb(28,52,94)]/95">{label}</p>
        </div>
      )}
    </div>
  )
}
