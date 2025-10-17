"use client"
import { LayoutGrid } from "@/components/ui/layout-grid"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "@/lib/utils"

export function ProjectsLayoutGridSection() {
  const t = useTranslations("ProjectsSection");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const SkeletonGreenSchool = () => {
    return (
      <div>
        <p className={cn("text-xl font-bold text-white md:text-4xl", isRtl && "text-right")}>{t("greenSchool.title")}</p>
        <p className={cn("my-4 max-w-lg text-base font-normal text-neutral-200", isRtl && "text-right")}>
          {t("greenSchool.description")}
        </p>
      </div>
    )
  }

  const SkeletonKidChen = () => {
    return (
      <div>
        <p className={cn("text-xl font-bold text-white md:text-4xl", isRtl && "text-right")}>{t("kidChen.title")}</p>
        <p className={cn("my-4 max-w-lg text-base font-normal text-neutral-200", isRtl && "text-right")}>
          {t("kidChen.description")}
        </p>
      </div>
    )
  }

  const SkeletonEcolibree = () => {
    return (
      <div>
        <p className={cn("text-xl font-bold text-white md:text-4xl", isRtl && "text-right")}>{t("ecolibree.title")}</p>
        <p className={cn("my-4 max-w-lg text-base font-normal text-neutral-200", isRtl && "text-right")}>
          {t("ecolibree.description")}
        </p>
      </div>
    )
  }

  const SkeletonWorldWide = () => {
    return (
      <div>
        <p className={cn("text-xl font-bold text-white md:text-4xl", isRtl && "text-right")}>{t("worldWide.title")}</p>
        <p className={cn("my-4 max-w-lg text-base font-normal text-neutral-200", isRtl && "text-right")}>
          {t("worldWide.description")}
        </p>
      </div>
    )
  }

  const cards = [
    {
      id: 1,
      content: <SkeletonGreenSchool />,
      className: "md:col-span-2",
      thumbnail: "/scool.png",
    },
    {
      id: 2,
      content: <SkeletonKidChen />,
      className: "col-span-1",
      thumbnail: "/green.png",
    },
    {
      id: 3,
      content: <SkeletonEcolibree />,
      className: "col-span-1",
      thumbnail: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_ecoo.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfZWNvby53ZWJwIiwiaWF0IjoxNzU4ODU2MzQ3LCJleHAiOjE5MTY1MzYzNDd9.GO6yatS0diVXLwRZJm0_8f-ZxfHjTs8ASVQ1Zkm-Sm8",
    },
    {
      id: 4,
      content: <SkeletonWorldWide />,
      className: "md:col-span-2",
      thumbnail: "/world.png",
    },
  ]

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">{t("title")}</h2>
        <div className="h-[600px] w-full">
          {" "}
          {/* Adjusted height for better visibility */}
          <LayoutGrid cards={cards} />
        </div>
        {/* Removed the "Voir plus de projets" button */}
      </div>
    </section>
  )
}
