"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

export const BackgroundBeams = ({ className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const beamsRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!beamsRef.current) return
      const rect = beamsRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={beamsRef}
      className={cn(
        "h-full w-full absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className,
      )}
    >
      <div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15), transparent 40%)`,
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(219, 39, 119, 0.1), transparent 40%)`,
        }}
      />
    </div>
  )
}
