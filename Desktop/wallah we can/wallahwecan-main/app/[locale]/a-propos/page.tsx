"use client";
import React, { type CSSProperties } from "react";
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import { Card, CardContent } from "../../../components/ui/card";
import { motion } from "framer-motion";
import { HeartPulse, GraduationCap, Sun, Sprout, CheckCircle2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function AProposPage() {
  const t = useTranslations("About"); // PHASE 1 i18n fix
  const locale = useLocale();
  const isRtl = locale === "ar";

  const aboutTitle = t("title"); // PHASE 1 i18n fix
  const organizationTitle = t("organization.title"); // PHASE 1 i18n fix
  const organizationDescription1 = t("organization.description1"); // PHASE 1 i18n fix
  const organizationDescription2 = t("organization.description2"); // PHASE 1 i18n fix
  const organizationQuote = t("organization.quote"); // PHASE 1 i18n fix
  const projectsTitle = t("projects.title"); // PHASE 1 i18n fix
  const achievementsTitle = t("achievements.title"); // PHASE 1 i18n fix
  const callToActionTitle = t("callToAction.title"); // PHASE 1 i18n fix
  const callToActionDescription = t("callToAction.description"); // PHASE 1 i18n fix

  const projects = t.raw("projects.items") as Array<{ name: string; description: string }>; // PHASE 1 i18n fix
  const achievementCards = t.raw("achievements.cards") as Array<{ key: AchievementKey; label: string; items: string[] }>; // PHASE 1 i18n fix

  const getCategoryStyle = (key: AchievementKey) => {
    switch (key) {
      case "health":
        return {
          from: "#34d399",
          to: "#059669",
          accent: "#10b981",
          gradient: "linear-gradient(135deg, #34d399, #059669)",
        };
      case "education":
        return {
          from: "#6366f1",
          to: "#0ea5e9",
          accent: "#4f46e5",
          gradient: "linear-gradient(135deg, #6366f1, #0ea5e9)",
        };
      case "energy":
        return {
          from: "#f59e0b",
          to: "#f97316",
          accent: "#f59e0b",
          gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
        };
      case "agriculture":
        return {
          from: "#22c55e",
          to: "#16a34a",
          accent: "#22c55e",
          gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
        };
      default:
        return {
          from: "#fb923c",
          to: "#f97316",
          accent: "#fb923c",
          gradient: "linear-gradient(135deg, #fb923c, #f97316)",
        };
    }
  };

  return (
  <div className="min-h-screen" style={{ backgroundColor: "#fffff2" }} dir={isRtl ? "rtl" : "ltr"}>
      <WallahWeCanNavbar />
      <main className="relative pt-24 pb-8 md:pb-10">
        {/* Page background is set on the top-level container to #fffff2 */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-center mb-6 md:mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
                {aboutTitle}
              </h1>
              <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
            </motion.div>

            {/* Framed content wrapper for improved readability and consistency */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-black/10 backdrop-blur-[2px]"
              />
              <div className="relative p-3 md:p-4 space-y-8 md:space-y-10">
                {/* Organization Description */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 p-6 md:p-8 transition-shadow"
                >
                  <h2 className="text-3xl font-bold tracking-tight text-center mb-2 text-[#142346]">
                    {organizationTitle}
                  </h2>
                  <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                  <p className="text-base md:text-lg text-slate-800 leading-relaxed tracking-[0.005em] mb-6">
                    {organizationDescription1}
                  </p>
                  <p className="text-base md:text-lg text-slate-800 leading-relaxed tracking-[0.005em] mb-6">
                    {organizationDescription2}
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-orange-500 to-amber-400">
                    {organizationQuote}
                  </p>
                </motion.div>

                {/* Projects */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className=""
                >
                  <h2 className="text-3xl font-bold text-center mb-3 text-[#142346]">
                    {projectsTitle}
                  </h2>
                  <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                  <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                      <Card
                        key={index}
                        className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:ring-black/20"
                      >
                        <CardContent className="p-6">
                          <h3 className="text-xl md:text-2xl font-bold text-center text-[#142346] mb-3">
                            {project.name}
                          </h3>
                          <p className="text-slate-800 leading-relaxed tracking-[0.005em]">
                            {project.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h2 className={`text-3xl md:text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow ${isRtl ? "text-center" : "text-center"}`}>
                    {achievementsTitle}
                  </h2>
                  <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                  <div className={`${isRtl ? "flex justify-end" : ""}`}>
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
                      {achievementCards.map((achievement, index) => {
                      const cs = getCategoryStyle(achievement.key);
                      const Icon = getCategoryIcon(achievement.key);
                      const iconProps = { strokeWidth: 2, size: 18 };
                      return (
                        <Card
                          key={index}
                          className="rounded-lg bg-white/10 backdrop-blur-xl ring-1 ring-white/20 border-none transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden"
                        >
                          <div
                            aria-hidden
                            className="absolute inset-x-0 top-0 h-1"
                            style={{ background: cs.gradient, opacity: 0.85 }}
                          />
                          <CardContent className="p-5 md:p-6">
                            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
                              <span
                                className="inline-flex items-center justify-center"
                                style={{ color: cs.accent }}
                              >
                                {Icon && <Icon {...iconProps} />}
                              </span>
                              <span
                                className="px-3 py-1 rounded-full text-[11px] font-semibold ring-1"
                                style={{
                                  background: "rgba(255,255,255,0.92)",
                                  color: "#142346",
                                  borderColor: cs.accent + "44",
                                }}
                              >
                                {achievement.label}
                              </span>
                            </div>
                            <div className={`relative ${isRtl ? "pr-5 sm:pr-6" : "pl-5 sm:pl-6"}`}>
                              <span
                                aria-hidden
                                className={`${isRtl ? "absolute right-2 sm:right-2 top-2 bottom-2 w-[2px] rounded-full" : "absolute left-2 sm:left-2 top-2 bottom-2 w-[2px] rounded-full"}`}
                                style={{ background: cs.accent + "3d" }}
                              />
                              <ul className="space-y-2 md:space-y-2.5">
                                {achievement.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className={`relative ${isRtl ? "pr-4 sm:pr-5" : "pl-4 sm:pl-5"} text-slate-800 leading-relaxed`}
                                  >
                                    <span
                                      aria-hidden
                                      className={`${isRtl ? "absolute right-0 top-2.5 inline-block w-1.5 h-1.5 rounded-full ring-2 ring-white/70" : "absolute left-0 top-2.5 inline-block w-1.5 h-1.5 rounded-full ring-2 ring-white/70"}`}
                                      style={{ background: cs.accent }}
                                    />
                                    <span
                                      className="inline-flex items-start gap-2 sm:gap-2.5"
                                      style={{ color: "inherit" }}
                                    >
                                      <CheckCircle2
                                        className="mt-0.5 shrink-0"
                                        size={16}
                                        strokeWidth={2}
                                        style={{ color: cs.accent }}
                                      />
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-2 text-[#142346]">
                {callToActionTitle}
              </h2>
              <div className="mx-auto mb-4 h-0.5 w-14 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
              <p className="text-white/90">
                {callToActionDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

type AchievementKey = "health" | "education" | "energy" | "agriculture";

const getCategoryIcon = (key: AchievementKey) => {
  switch (key) {
    case "health":
      return HeartPulse;
    case "education":
      return GraduationCap;
    case "energy":
      return Sun;
    case "agriculture":
      return Sprout;
    default:
      return CheckCircle2;
  }
};
