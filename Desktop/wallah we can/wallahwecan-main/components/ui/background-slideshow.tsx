"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BackgroundSlideshowProps {
  images: string[]
  children: React.ReactNode
  className?: string
}

export function BackgroundSlideshow({ images, children, className }: BackgroundSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image || "/placeholder.svg"}
          alt={`Background image ${index + 1}`}
          fill
          className={cn(
            "object-cover transition-opacity duration-1000 ease-in-out",
            index === currentIndex ? "opacity-50" : "opacity-0",
          )}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
