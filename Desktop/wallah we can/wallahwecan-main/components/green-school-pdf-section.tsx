"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText, BookOpen, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "../lib/utils"

export function GreenSchoolPdfSection() {
  const t = useTranslations('GreenSchool.Pdf') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === 'ar'
  return (
    <div className="py-8 md:py-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className={cn("text-2xl md:text-3xl font-bold text-[#142346] mb-3", "text-center") }>
            {t('title')}
          </h2>
          <div className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
          <p className={cn("mt-4 text-sm text-white/90 max-w-2xl mx-auto", isRtl ? "text-right" : "text-center") }>
            {t('subtitle')}
          </p>
        </motion.div>
      </div>

      {/* PDF Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-6xl", isRtl ? "ml-auto" : "mx-auto")}
      >
        <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none hover:shadow-lg transition-all duration-200 overflow-hidden group">
          <div className="relative h-32 overflow-hidden">
            {/* PHASE 2: replace Next/Image placeholder with img to avoid query/ratio warnings */}
            <img
              src="/placeholder.svg"
              width={300}
              height={200}
              alt={t('techSheet.title')}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className={cn("absolute top-3", isRtl ? "right-3" : "left-3")}>
              <div className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5 text-green-400" />
                <span className="text-sm font-semibold">{t('techSheet.badge')}</span>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className={cn("text-lg font-semibold text-[#142346] mb-2", isRtl ? "text-right" : "text-left")}>{t('techSheet.title')}</h3>
            <p
              className={cn("text-slate-800 leading-relaxed text-sm mb-4", isRtl ? "text-right" : "text-left")}
              style={isRtl ? { unicodeBidi: 'plaintext' } : undefined}
            >
              {t('techSheet.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/Factsheet-GreenSchool-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL0ZhY3RzaGVldC1HcmVlblNjaG9vbC1jb21wcmVzc2VkLnBkZiIsImlhdCI6MTc1ODIwNDQxMCwiZXhwIjoxOTE1ODg0NDEwfQ.hg_gcS2qKZ_5dQHa_j61Ev5pNfXwIYqWuHhILoyQyhk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#142346] text-white rounded-lg hover:bg-[#142346]/90 transition-colors font-medium text-sm"
              >
                {isRtl ? (
                  <>
                    {t('preview')}
                    <Eye className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    {t('preview')}
                  </>
                )}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none hover:shadow-lg transition-all duration-200 overflow-hidden group">
          <div className="relative h-32 overflow-hidden">
            {/* PHASE 2: replace Next/Image placeholder with img to avoid query/ratio warnings */}
            <img
              src="/placeholder.svg"
              width={300}
              height={200}
              alt={t('presentation.title')}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className={cn("absolute top-3", isRtl ? "right-3" : "left-3")}>
              <div className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold">{t('presentation.badge')}</span>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className={cn("text-lg font-semibold text-[#142346] mb-2", isRtl ? "text-right" : "text-left")}>{t('presentation.title')}</h3>
            <p
              className={cn("text-slate-800 leading-relaxed text-sm mb-4", isRtl ? "text-right" : "text-left")}
              style={isRtl ? { unicodeBidi: 'plaintext' } : undefined}
            >
              {t('presentation.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/GreenSchool-by-Wallah-We-Can-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL0dyZWVuU2Nob29sLWJ5LVdhbGxhaC1XZS1DYW4tY29tcHJlc3NlZC5wZGYiLCJpYXQiOjE3NTgyMDQ0MzUsImV4cCI6MTkxNTg4NDQzNX0.5aib3csWOfV17gZ4YV_ZRhj2WBp57v7DuJGmj_eeDHo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm"
              >
                {isRtl ? (
                  <>
                    {t('preview')}
                    <Eye className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    {t('preview')}
                  </>
                )}
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
