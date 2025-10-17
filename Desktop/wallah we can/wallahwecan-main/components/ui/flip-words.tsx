"use client"

import { useCallback, useEffect, useState } from "react"

import { AnimatePresence, motion } from "framer-motion" // Changed from "motion/react"

import { cn } from "@/lib/utils"
import { useLocale } from "next-intl" // PHASE 1 i18n fix

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[]
  duration?: number
  className?: string
}) => {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const locale = useLocale() // PHASE 1 i18n fix: detect active locale for RTL handling
  const isRTL = locale === "ar" // PHASE 1 i18n fix: Arabic requires mirrored animation and layout

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0]
    setCurrentWord(word)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation()
      }, duration)
  }, [isAnimating, duration, startAnimation])

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false)
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: isRTL ? -20 : -40, // PHASE 1 i18n fix: soften exit motion for RTL words
          x: isRTL ? -40 : 40, // PHASE 1 i18n fix: invert horizontal exit direction in RTL
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        dir={isRTL ? "rtl" : "ltr"} // PHASE 1 i18n fix: ensure correct bidi context
        className={cn(
          "z-10 inline-block relative text-neutral-900 dark:text-neutral-100 px-2",
          isRTL ? "text-right" : "text-left",
          className,
        )} // PHASE 1 i18n fix: mirror text alignment in RTL
        key={currentWord}
      >
        {/* PHASE 1 i18n fix: render words without breaking glyph joins for RTL locales */}
        {isRTL ? (
          <motion.span
            key={currentWord}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.35 }}
            className="inline-block whitespace-nowrap"
            style={{ unicodeBidi: "plaintext" }}
          >
            {currentWord}
          </motion.span>
        ) : (
          // edit suggested by Sajal: https://x.com/DewanganSajal
          currentWord.split(" ").map((word, wordIndex) => (
            <motion.span
              key={word + wordIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: wordIndex * 0.3,
                duration: 0.3,
              }}
              className="inline-block whitespace-nowrap"
            >
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={word + letterIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: wordIndex * 0.3 + letterIndex * 0.05,
                    duration: 0.2,
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          ))
        )}
      </motion.div>
    </AnimatePresence>
  )
}
