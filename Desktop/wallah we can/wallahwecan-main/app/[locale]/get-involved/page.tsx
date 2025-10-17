"use client";

import React from "react";
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer"; // PHASE 1 i18n fix: normalize import
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"; // PHASE 1 i18n fix: normalize import
import { Button } from "../../../components/ui/button"; // PHASE 1 i18n fix: normalize import
import Link from "next/link";
import { useLocale } from "next-intl";
import { Users, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl"; // PHASE 1 i18n fix

export default function GetInvolvedPage() {
  const t = useTranslations("GetInvolved.Page"); // PHASE 1 i18n fix
  const locale = useLocale();
  return (
    <div className="min-h-screen relative">
      {/* Site background with radial + grain */}
      <div
        className="fixed inset-0 w-full h-full z-0"
        style={{
          background:
            "radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          filter: "contrast(100%) brightness(100%)",
        }}
      />
      <div className="sticky top-0 z-50 w-full bg-white">
        <WallahWeCanNavbar />
      </div>
      <main className="pt-24 pb-12 container mx-auto px-4 z-10 relative">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            filter: "contrast(100%) brightness(100%)",
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
              {t("title")}{/* PHASE 1 i18n fix */}
            </h1>
            <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
            <p className="text-center mt-2 text-base md:text-lg text-white/90">
              {t("subtitle")}{/* PHASE 1 i18n fix */}
            </p>

            {/* Framed content wrapper for parity with Contact/À propos */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-black/10 backdrop-blur-[2px]"
              />
              <div className="relative p-3 md:p-4">
                <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-stretch">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <Card className="h-full flex flex-col bg-white/80 backdrop-blur-md border-none ring-1 ring-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5 hover:shadow-xl">
                      <CardHeader className="text-center pb-1">
                        <CardTitle className="text-lg md:text-xl font-semibold text-[#142346] flex items-center justify-center gap-2">
                          <Users className="h-6 w-6 text-orange-500" />
                          {t("memberCard.title")}{/* PHASE 1 i18n fix */}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 flex-1 text-slate-800">
                        <p className="text-sm leading-relaxed">
                          {t("memberCard.description")}{/* PHASE 1 i18n fix */}
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>{t("memberCard.bullets.volunteerCommitment")}</li>
                          <li>{t("memberCard.bullets.trainingSupport")}</li>
                          <li>{t("memberCard.bullets.directImpact")}</li>
                          <li>{t("memberCard.bullets.engagedCommunity")}</li>
                        </ul>
                      </CardContent>
                      <CardFooter className="pt-2 justify-center">
                        <Link href={`/${locale}/adherer`} className="inline-flex" prefetch>
                          <Button className="px-6 py-2 bg-[#142346] hover:bg-[#142346]/90 text-sm font-medium">
                            {t("memberCard.cta")}{/* PHASE 1 i18n fix */}
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
                  >
                    <Card className="h-full flex flex-col bg-white/80 backdrop-blur-md border-none ring-1 ring-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5 hover:shadow-xl">
                      <CardHeader className="text-center pb-1">
                        <CardTitle className="text-lg md:text-xl font-semibold text-[#142346] flex items-center justify-center gap-2">
                          <GraduationCap className="h-6 w-6 text-orange-500" />
                          {t("internshipCard.title")}{/* PHASE 1 i18n fix */}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 flex-1 text-slate-800">
                        <p className="text-sm leading-relaxed">
                          {t("internshipCard.description")}{/* PHASE 1 i18n fix */}
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>{t("internshipCard.bullets.professionalExperience")}</li>
                          <li>{t("internshipCard.bullets.concreteProjects")}</li>
                          <li>{t("internshipCard.bullets.personalizedMentoring")}</li>
                          <li>{t("internshipCard.bullets.socialImpactMission")}</li>
                        </ul>
                      </CardContent>
                      <CardFooter className="pt-2 justify-center">
                        <Link href={`/${locale}/stage`} className="inline-flex" prefetch>
                          <Button className="px-6 py-2 bg-[#142346] hover:bg-[#142346]/90 text-sm font-medium">
                            {t("internshipCard.cta")}{/* PHASE 1 i18n fix */}
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="mt-10 md:mt-12 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
                {t("why.title")}{/* PHASE 1 i18n fix */}
              </h2>
              <div className="mx-auto mt-2 h-0.5 w-14 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
              <p className="text-lg text-white/90 max-w-3xl mx-auto mt-2">
                {t("why.description")}{/* PHASE 1 i18n fix */}
              </p>
            </div>
          </div>
        </div>
      </main>
      <div className="relative z-50">
        <Footer />
      </div>
    </div>
  );
}
