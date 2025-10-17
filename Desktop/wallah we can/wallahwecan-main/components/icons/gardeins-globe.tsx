"use client"

import type React from "react"

// GardeinsGlobeIcon: multi-tone globe (blue/orange/white) with no background box
// Colors: Blue #0072CE, Orange #FF7300, White #FFFFFF
// Props: mono (boolean) to render single-color using `color` or currentColor
export function GardeinsGlobeIcon(
  {
    className,
    mono,
    color,
    ...props
  }: React.SVGProps<SVGSVGElement> & { mono?: boolean; color?: string }
) {
  const strokeColor = mono ? (color || "currentColor") : undefined
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      {/* Outer circle */}
      <circle cx="12" cy="12" r="9" stroke={strokeColor || "#0072CE"} />
      {/* Primary meridian */}
      <path d="M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9" stroke={strokeColor || "#FF7300"} />
      {/* Secondary meridian */}
      <path d="M12 3c-2.5 2.5-4 6-4 9s1.5 6.5 4 9" stroke={strokeColor || "#FFFFFF"} />
      {/* Equator */}
      <path d="M3 12h18" stroke={strokeColor || "#FFFFFF"} />
      {/* Parallels (subtle) */}
      <path d="M4.5 8.5c2.2-.8 4.9-1.2 7.5-1.2s5.3.4 7.5 1.2" stroke={strokeColor || "#FFFFFF"} opacity={mono ? 1 : 0.9} />
      <path d="M4.5 15.5c2.2.8 4.9 1.2 7.5 1.2s5.3-.4 7.5-1.2" stroke={strokeColor || "#FFFFFF"} opacity={mono ? 1 : 0.9} />
    </svg>
  )
}
