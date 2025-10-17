"use client";

// PHASE 1 i18n fix
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { Leaf, Utensils, BookOpen, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");
  const tProjects = useTranslations("ProjectsSection");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const basePath = `/${locale}/projects`;
  const projects = [
    {
      name: tProjects("greenSchool.title"),
      description: tProjects("greenSchool.description"),
      icon: <Leaf className="h-8 w-8" />,
      link: `${basePath}/green-school`,
      color: "text-green-600",
    },
    {
      name: tProjects("kidChen.title"),
      description: tProjects("kidChen.description"),
      icon: <Utensils className="h-8 w-8" />,
      link: `${basePath}/kid-chen`,
      color: "text-orange-600",
    },
    {
      name: tProjects("ecolibree.title"),
      description: tProjects("ecolibree.description"),
      icon: <BookOpen className="h-8 w-8" />,
      link: `${basePath}/ecolibree`,
      color: "text-purple-600",
    },
    {
      name: tProjects("worldWide.title"),
      description: tProjects("worldWide.description"),
      icon: <Globe className="h-8 w-8" />,
      link: `${basePath}/world-wide-project`,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black" dir={isRTL ? "rtl" : "ltr"}>
      <WallahWeCanNavbar />
      <main className="relative pt-24 pb-12">
        {/* Background gradient + subtle noise to match other pages */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
            `,
            filter: "contrast(100%) brightness(100%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
              {t("title")}
            </h1>

            <div className="rounded-2xl p-6 md:p-8 mb-10 bg-white/70 backdrop-blur-md ring-1 ring-white/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#E04403] mb-4">{t("missionTitle")}</h2>
              <p className={`text-lg text-slate-800 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                {t("missionText")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <Link key={index} href={project.link} className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-2xl">
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white/70 backdrop-blur-md ring-1 ring-white/40 hover:-translate-y-0.5">
                    <CardHeader>
                      <CardTitle className={`text-2xl flex items-center gap-3 ${project.color}`}>
                        <span className={`shrink-0 ${project.color}`}>{project.icon}</span>
                        <span className="text-[rgb(28,52,94)]">{project.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className={`text-slate-800 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>{project.description}</p>
                      <div className="w-full">
                        <Button className="w-full bg-[#E04403] hover:bg-[#E04403]/90">
                          {t("discoverProject")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-[rgb(28,52,94)] mb-4">{t("impactTitle")}</h2>
              <p className="text-lg text-slate-800 max-w-4xl mx-auto">{t("impactText")}</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
