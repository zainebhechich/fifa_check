"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

export const SparklesCore = ({
  id,
  className,
  background,
  minSize,
  maxSize,
  particleDensity,
  particleColor,
  particleSpeed,
}) => {
  const canvasRef = useRef(null)
  const [context, setContext] = useState(null)
  const [particles, setParticles] = useState([])
  const animationRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      setContext(ctx)

      const handleResize = () => {
        if (canvas) {
          canvas.width = canvas.clientWidth
          canvas.height = canvas.clientHeight
        }
      }

      handleResize()
      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  useEffect(() => {
    if (context && canvasRef.current) {
      const canvas = canvasRef.current
      const particleCount = Math.min(
        Math.max(Math.floor((canvas.width * canvas.height) / 10000) * particleDensity, 50),
        500,
      )

      const createParticles = () => {
        const newParticles = []
        for (let i = 0; i < particleCount; i++) {
          const particle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (maxSize - minSize) + minSize,
            speedX: (Math.random() - 0.5) * (particleSpeed || 0.3),
            speedY: (Math.random() - 0.5) * (particleSpeed || 0.3),
            opacity: Math.random() * 0.5 + 0.3,
          }
          newParticles.push(particle)
        }
        setParticles(newParticles)
      }

      createParticles()
    }
  }, [context, minSize, maxSize, particleDensity, particleSpeed])

  useEffect(() => {
    if (!context || !canvasRef.current || particles.length === 0) return

    const canvas = canvasRef.current

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        // Update
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Draw
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = particleColor || `rgba(255, 255, 255, ${particle.opacity})`
        context.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [context, particles, particleColor])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("h-full w-full", className)}
      style={{
        background: background || "transparent",
      }}
    />
  )
}
