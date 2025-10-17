"use client"

// PHASE 1 i18n fix
import type React from "react"
import { useState, useMemo } from "react"
import { useTranslations, useLocale } from "next-intl"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"

export function NewsletterSection() {
  const t = useTranslations("Newsletter")
  const locale = useLocale() ?? "en"
  const isRTL = locale === "ar"
  const [email, setEmail] = useState("")
  const [_isSubmitting, setIsSubmitting] = useState(false)

  const placeholders = useMemo(() => t.raw("placeholders") as string[], [t])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      alert(t("alerts.invalidEmail"))
      return
    }
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'newsletter' })
      })
      const data = await response.json()
      if (data.success) {
        alert(data.message || t("alerts.subscribeSuccess"))
        setEmail("")
      } else {
        alert(data.error || t("alerts.subscribeError"))
      }
    } catch {
      alert(t("alerts.unknownError"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#27457a] to-orange-600 md:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-7 text-lg text-white/80">
          {isRTL ? (
            <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
              {`${t("subtitle")}\u200F`}
            </span>
          ) : (
            t("subtitle")
          )}
        </p>
        <div className="flex flex-col items-center">
          <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  )
}
