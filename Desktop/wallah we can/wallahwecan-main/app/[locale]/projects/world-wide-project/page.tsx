"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "../../../../components/footer";
import { useTranslations, useLocale } from "next-intl";

export default function WorldWideProjectPage() {
  const t = useTranslations("WorldWideProject");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // IDs used for scrollspy + sections present in DOM
  const sectionIds = ["hero", "details", "france", "liban", "palestine", "gouvernance"] as const;
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.3, 0.6, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Safe extraction of structured translation data
  const detailsItems = (() => {
    try {
      const raw = t.raw("details.items");
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  })() as Array<{ title: string; text: string }>;

  const libanItems = (() => {
    try {
      const raw = t.raw("impact.liban.items");
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  })() as string[];

  const palestineAssociations = (() => {
    try {
      const raw = t.raw("impact.palestine.associations");
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  })() as Array<{ title: string; text: string }>;

  const bgStyle = {
    backgroundColor: '#fffff2',
  } as const;

  const navItems = [
    { id: "details", label: t("nav.details") },
    { id: "france", label: t("nav.france") },
    { id: "liban", label: t("nav.liban") },
    { id: "palestine", label: t("nav.palestine") },
    { id: "gouvernance", label: t("nav.governance") },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black" dir={isRTL ? "rtl" : "ltr"}>
      <WallahWeCanNavbar />
      <main className="relative pt-24 pb-6">
  <div className="absolute inset-0 w-full h-full" style={bgStyle} />
        <div className="relative z-10">
          {/* Scrollspy chips */}
          <div className="sticky top-[72px] z-30 bg-transparent/0 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <ul className={`flex flex-wrap gap-2 ${isRTL ? "justify-end" : ""}`}>
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`${active === item.id ? "bg-[#142346] text-white" : "bg-white/80 text-[#142346] ring-1 ring-white/40"} inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors backdrop-blur-md shadow-sm`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hero */}
          <section id="hero" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-10 sm:py-14">
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-md">
              <Image
                src="/world.png"
                alt={t("hero.badge")}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="max-w-4xl">
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium tracking-wide ring-1 ring-white/40 text-slate-800 backdrop-blur-md shadow-sm mb-4">
                    {t("hero.badge")}
                  </p>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-lg mb-4">
                    {t("hero.title")}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl leading-relaxed drop-shadow-md">
                    {t("hero.paragraph")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
            <section id="mission-vision" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[{
                  tTitle: t("missionVision.missionTitle"),
                  tText: t("missionVision.missionText"),
                }, {
                  tTitle: t("missionVision.visionTitle"),
                  tText: t("missionVision.visionText"),
                }].map((card, i) => (
                  <div key={card.tTitle + i} className="rounded-xl bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">{card.tTitle}</h2>
                      <div className="flex-1 h-0.5 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                    </div>
                    <p className="text-slate-700 leading-relaxed">{card.tText}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Project Details */}
          <section id="details" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">
                  {t("details.title")}
                </h2>
                <div className="flex-1 h-0.5 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailsItems.map((item) => (
                  <li key={item.title} className="rounded-xl bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md p-4">
                    <span className="font-semibold text-[#142346]">{item.title}:</span>
                    <span className={`${isRTL ? "mr-2" : "ml-2"} text-slate-700`}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Impact */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">{t("impact.title")}</h2>
                <div className="flex-1 h-0.5 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
              </div>

              {/* France */}
              <article id="france" className="mt-6 rounded-xl bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">{t("impact.france.title")}</h3>
                  <div className="flex-1 h-0.5 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                </div>
                <p className="text-slate-700 leading-relaxed">{t("impact.france.text")}</p>
              </article>

              {/* Liban */}
              <article id="liban" className="mt-6 rounded-xl bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">{t("impact.liban.title")}</h3>
                  <div className="flex-1 h-0.5 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                </div>
                <ul className="space-y-3 text-slate-700 leading-relaxed">
                  {libanItems.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              </article>

              {/* Palestine */}
              <article id="palestine" className="mt-6 rounded-xl bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md p-6 space-y-6">
                {palestineAssociations.map((assoc, i) => (
                  <div key={assoc.title + i}>
                    <div className="flex items-center gap-3 mb-4">
                      <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">{assoc.title}</h4>
                      <div className="flex-1 h-0.5 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                    </div>
                    <p className="text-slate-700 leading-relaxed">{assoc.text}</p>
                  </div>
                ))}
              </article>

              {/* Governance */}
              <article id="gouvernance" className="mt-6 rounded-xl bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600">{t("governance.title")}</h3>
                  <div className="flex-1 h-0.5 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                </div>
                <p className="text-slate-700 leading-relaxed">{t("governance.text")}</p>
              </article>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
