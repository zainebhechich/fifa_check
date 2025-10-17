'use client';
"use client"; // PHASE 1 i18n fix
// PHASE 1 i18n fix
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

const transparencyItems = (t: ReturnType<typeof useTranslations>) => [
  { title: t("items.childProtection"), link: "/transparency/child-protection-policy" },
  { title: t("items.codeOfConduct"), link: "/transparency/codeOfConduct" },
  { title: t("items.financialReports"), link: "/transparency/financial-reporting" },
  { title: t("items.ethicalCharter"), link: "/transparency/ethical-charter" },
  { title: t("items.organizationChart"), link: "/transparency/organization-chart" },
]

export function TransparencySection() {
  const t = useTranslations("TransparencySection")
  const locale = useLocale()
  return (
    <section className="py-16 bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-800 dark:text-white md:text-4xl">
          {t("title")}
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {transparencyItems(t).map((item, index) => (
            <Card
              key={index}
              className="border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-neutral-800 dark:bg-black"
            >
              <CardContent className="flex items-center justify-between p-6">
                <Link
                  href={`/${locale}${item.link}`}
                  className="text-lg font-semibold text-slate-700 transition-colors hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-500"
                >
                  {item.title}
                </Link>
                <ArrowRight className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
