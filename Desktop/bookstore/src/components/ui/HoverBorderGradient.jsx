"use client"

import { useState, useRef } from "react"
import { cn } from "../../lib/utils"

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Component = "div",
  duration = 500,
  from = "rgb(79, 70, 229)",
  to = "rgb(219, 39, 119)",
  fromOpacity = 1,
  toOpacity = 1,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative", containerClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className={cn("absolute inset-0 opacity-0 transition-opacity rounded-[inherit]", isHovered && "opacity-100")}
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${from}${Math.round(
            fromOpacity * 255,
          ).toString(16)} 0%, ${to}${Math.round(toOpacity * 255).toString(16)} 50%, transparent 70%)`,
          transition: `opacity ${duration}ms`,
        }}
      />
      <Component className={cn("relative border border-transparent bg-clip-padding", className)} {...props}>
        {children}
      </Component>
    </div>
  )
}
