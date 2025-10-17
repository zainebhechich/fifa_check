"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, GraduationCap } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

export function KidChenBeneficiaries() {
  const t = useTranslations("KidChen.Beneficiaries")
  const locale = useLocale()
  const isRtl = locale === 'ar'
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-lg">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-white/90 rounded-full p-3 w-fit mx-auto mb-4 shadow-sm ring-1 ring-white/40">
                {/* PHASE 1 i18n fix: decorative icon */}
                <Users aria-hidden="true" className="h-8 w-8 text-[#142346]" />
              </div>
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 mb-3">{t("parents.title")}</h3>
              <p className="text-slate-800 leading-relaxed">
                <span dir={isRtl ? 'rtl' : undefined} style={isRtl ? { unicodeBidi: 'isolate-override' as const } : undefined}>
                  {t("parents.description")}{isRtl ? '\u200F' : ''}
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-white/90 rounded-full p-3 w-fit mx-auto mb-4 shadow-sm ring-1 ring-white/40">
                {/* PHASE 1 i18n fix: decorative icon */}
                <GraduationCap aria-hidden="true" className="h-8 w-8 text-[#142346]" />
              </div>
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 mb-3">{t("students.title")}</h3>
              <p className="text-slate-800 leading-relaxed">
                <span dir={isRtl ? 'rtl' : undefined} style={isRtl ? { unicodeBidi: 'isolate-override' as const } : undefined}>
                  {t("students.description")}{isRtl ? '\u200F' : ''}
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
