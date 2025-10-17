"use client"

import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"

const FeaturesSection = () => {
  const t = useTranslations("Features");

  const locale = useLocale()
  const isRtl = typeof locale === 'string' && locale.startsWith('ar')

  const features = [
    {
      title: (
        <>
          {t("empowerment.title")}{" "}
          <span className="text-blue-500">{t("empowerment.titleHighlight")}</span>.
        </>
      ),
      description: t("empowerment.description"),
      imageUrl: "/fourni.png",
      gradient: "from-blue-100 to-sky-100",
    },
    {
      title: (
        <>
          {t("health.title")}{" "}
          <span className="text-green-500">{t("health.titleHighlight")}</span>.
        </>
      ),
      description: t("health.description"),
      imageUrl: "/san.png",
      gradient: "from-green-100 to-teal-100",
    },
    {
      title: (
        <>
          {t("community.title")}{" "}
          <span className="text-orange-500 leading-7 tracking-normal mx-0 border-0">{t("community.titleHighlight")}</span>
          {"."}
        </>
      ),
      description: t("community.description"),
      imageUrl: "/batir.png",
      gradient: "from-orange-100 to-amber-100",
    },
  ]

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
          {t("title")}
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-xl border border-white/20 p-6 bg-white/95 backdrop-blur-sm shadow-sm transition-shadow duration-300 hover:shadow-lg ${isRtl ? 'text-right' : ''}`}
            >
              <div className={`mb-6 h-40 w-full overflow-hidden rounded-lg bg-gradient-to-r ${feature.gradient}`}>
                <Image
                  src={feature.imageUrl || "/placeholder.svg"}
                  alt={feature.description}
                  width={400}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold leading-relaxed tracking-tight text-slate-900 dark:text-white">
                {isRtl ? (
                  <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{feature.title}{'\u200F'}</span>
                ) : (
                  feature.title
                )}
              </h3>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                {isRtl ? (
                  <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${feature.description}\u200F`}</span>
                ) : (
                  feature.description
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FeaturesSection }
