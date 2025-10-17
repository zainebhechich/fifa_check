"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { AnimatedCounter } from "./animated-counter"

interface AchievementCardProps {
  value?: number
  label: string
  prefix?: string
  suffix?: string
  icon?: React.ReactNode
  className?: string
}

export function AchievementCard({ value, label, prefix, suffix, icon, className }: AchievementCardProps) {
  return (
    <motion.div
      className={cn(
        "relative flex flex-col items-center justify-center p-2 transition-all duration-300", // Clean, no box background/border
        className,
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <AnimatedCounter value={value} label={label} prefix={prefix} suffix={suffix} icon={icon} className="w-full" />
      {value === undefined && <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{label}</p>}{" "}
      {/* Adjusted margin-top for consistency */}
    </motion.div>
  )
}
