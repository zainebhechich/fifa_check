"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export const TextGenerateEffect = ({ words, className }) => {
  const [renderedText, setRenderedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setRenderedText((prev) => prev + words[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 40) // Adjust speed as needed

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, words])

  return (
    <span className={className}>
      {renderedText}
      {!isComplete && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, repeatType: "reverse" }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  )
}
