"use client"
// PHASE 1 i18n fix
import { WobbleCard } from "@/components/ui/wobble-card"
import Image from "next/image"
import { NavbarButton } from "@/components/ui/resizable-navbar"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"

export function ProjectsSection() {
  const t = useTranslations("ProjectsSection")
  const locale = useLocale()
  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800 dark:text-white">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-orange-700 min-h-[300px]" className="">
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                {t("greenSchool.title")}
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                {t("greenSchool.description")}
              </p>
            </div>
            <Image
              src="/project-green-school.png"
              width={500}
              height={500}
              alt={t("greenSchool.imageAlt")}
              className="absolute -right-4 lg:-right-[20%] grayscale filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-red-700">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              {t("kidChen.title")}
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              {t("kidChen.description")}
            </p>
            <Image
              src="/project-kid-chen.png"
              width={500}
              height={500}
              alt={t("kidChen.imageAlt")}
              className="absolute -right-4 lg:-right-[20%] grayscale filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-amber-700 min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                {t("ecolibree.title")}
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                {t("ecolibree.description")}
              </p>
            </div>
            <Image
              src="/project-ecolibree.png"
              width={500}
              height={500}
              alt={t("ecolibree.imageAlt")}
              className="absolute -right-10 md:-right-[20%] lg:-right-[10%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-orange-900 min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                {t("worldWide.title")}
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                {t("worldWide.description")}
              </p>
            </div>
            <Image
              src="/project-world-wide.png"
              width={500}
              height={500}
              alt={t("worldWide.imageAlt")}
              className="absolute -right-10 md:-right-[20%] lg:-right-[10%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>
        <div className="text-center mt-12">
          <Link href={`/${locale}/projects`}>
            <NavbarButton as="button" variant="primary">
              {t("seeMore")}
            </NavbarButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
