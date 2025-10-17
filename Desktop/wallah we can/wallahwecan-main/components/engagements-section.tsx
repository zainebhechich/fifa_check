"use client"

import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { HeartPulse, BookOpen, ShieldCheck, Sparkles, Users } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"

export function EngagementsSection() {
  const t = useTranslations("Engagements");
  const locale = useLocale()
  const isRtl = typeof locale === 'string' && locale.startsWith('ar')

  const items = [
    {
      title: t("health.title"),
      description: t("health.description"),
  header: <Skeleton src="/sante.png" alt={t("health.title")} />, // PHASE 1 i18n fix
      className: "md:col-span-2",
      icon: <HeartPulse className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t("education.title"),
      description: t("education.description"),
  header: <Skeleton src="/educ.png" alt={t("education.title")} />, // PHASE 1 i18n fix
      className: "md:col-span-1",
      icon: <BookOpen className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t("protection.title"),
      description: t("protection.description"),
  header: <Skeleton src="/prot.png" alt={t("protection.title")} />, // PHASE 1 i18n fix
      className: "md:col-span-1",
      icon: <ShieldCheck className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t("development.title"),
      description: t("development.description"),
  header: <Skeleton src="/epan.png" alt={t("development.title")} />, // PHASE 1 i18n fix
      className: "md:col-span-2",
      icon: <Sparkles className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: t("equity.title"),
      description: t("equity.description"),
  header: <Skeleton src="/equi.png" alt={t("equity.title")} />, // PHASE 1 i18n fix
      className: "md:col-span-3",
      icon: <Users className="h-4 w-4 text-neutral-500" />,
    },
  ];

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow mb-4">
            {t("title")}
          </h2>
          <div className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500 mb-6" />
          <p className="text-base md:text-lg text-white leading-relaxed tracking-[0.005em] max-w-3xl mx-auto">
            {isRtl ? `${t("description")}\u200F` : t("description")}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }}>
          {/* Framed content wrapper */}
          <div className="relative max-w-6xl mx-auto">
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-black/10 backdrop-blur-[2px]" />
            <div className="relative p-3 md:p-4">
              <BentoGrid className="mx-auto max-w-5xl md:auto-rows-[20rem]">
                {items.map((item, i) => (
                  <BentoGridItem
                    key={i}
                    title={isRtl ? `${item.title}\u200F` : item.title}
                    description={isRtl ? `${item.description}\u200F` : item.description}
                    header={item.header}
                    className={cn("[&>p:text-lg] bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none rounded-lg", item.className, isRtl ? 'text-right' : '')}
                    icon={item.icon}
                  />
                ))}
              </BentoGrid>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" }} className="mt-10">
          <div className="relative max-w-4xl mx-auto">
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-black/10 backdrop-blur-[2px]" />
            <div className="relative p-3 md:p-4">
              <div className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none p-6 md:p-8 text-center">
                <p className="text-base md:text-lg text-white leading-relaxed tracking-[0.005em] mb-4">
                  {isRtl ? `${t("conclusion1")}\u200F` : t("conclusion1")}
                </p>
                <p className="text-base md:text-lg text-white leading-relaxed tracking-[0.005em]">
                  <strong className="text-white">
                    {isRtl ? `${t("conclusion2")}\u200F` : t("conclusion2")}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Skeleton = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={400}
      height={400}
      className="h-full w-full object-cover transition-transform duration-200 group-hover/bento:scale-105"
    />
  </div>
)

