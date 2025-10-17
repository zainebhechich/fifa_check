"use client";

import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "../../../../components/footer";
import { NewsletterSection } from "../../../../components/newsletter-section";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Crown, Users, Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export default function DinerDesPrincesPage() {
  const t = useTranslations("Events.Diner");
  const locale = useLocale();
  const isRTL = locale === 'ar';
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <WallahWeCanNavbar />
      <main className="relative pt-24 pb-8 md:pb-10">
        <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: '#fffff2' as const }} />
        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-center mb-6 md:mb-8"
            >
              <Link
                href={`/${locale}/evenements`}
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("backToEvents")}
              </Link>
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
                {t("title")}
              </h1>
              <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
            </motion.div>

            {/* Framed content wrapper */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-black/10 backdrop-blur-[2px]"
              />
              <div className="relative p-3 md:p-4 space-y-8 md:space-y-10">
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 p-6 md:p-8"
                >
                  <div className="max-w-4xl mx-auto text-center">
                    <p className="text-base md:text-lg text-slate-800 leading-relaxed tracking-[0.005em]">
                      {isRTL ? `${t("hero.description")}\u200F` : t("hero.description")}
                    </p>
                  </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="max-w-4xl mx-auto">
                    {/* All Images Gallery at Top */}
                    <div className="mb-8">
                      {/* Main Hero Image */}
                      <div className="relative aspect-[16/9] mb-6 rounded-lg overflow-hidden">
                        <Image
                          src="/din.jpg"
                          alt={t("gallery.alts.main")}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>

                      {/* Gallery Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src="/din1.jpg"
                            alt={t("gallery.alts.dior1")}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src="/din2.jpg"
                            alt={t("gallery.alts.dior2")}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src="/wallah-we-can-internation.jpg"
                            alt={t("gallery.alts.internationalLaunch")}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src="/group-photo-wallah-we-can.webp"
                            alt={t("gallery.alts.groupPhoto")}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      </div>

                      {/* Additional Gallery Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src="/group-photo-wallah-we-can-1.webp"
                            alt={t("gallery.alts.groupPhoto2")}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src="/diner-1-1.webp"
                            alt={t("gallery.alts.concertPerformance")}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-3xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow">
                        {t("section1.title")}
                      </h2>
                      <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />

                      <p className="text-base md:text-lg text-slate-800 leading-relaxed tracking-[0.005em] mb-6">
                        {isRTL ? (
                          <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${t("section1.paragraph1")}\u200F`}</span>
                        ) : (
                          t("section1.paragraph1")
                        )}
                      </p>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#142346] to-[#142346]/80 text-white shadow-sm ring-1 ring-black/5 flex items-center justify-center">
                                <Crown className="h-6 w-6" />
                              </div>
                              <h3 className="text-xl font-semibold text-[#142346]">
                                {t("section1.cards.0.title")}
                              </h3>
                            </div>
                            <p className="text-slate-800 leading-relaxed">
                              {t("section1.cards.0.desc")}
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#142346] to-[#142346]/80 text-white shadow-sm ring-1 ring-black/5 flex items-center justify-center">
                                <Users className="h-6 w-6" />
                              </div>
                              <h3 className="text-xl font-semibold text-[#142346]">
                                {t("section1.cards.1.title")}
                              </h3>
                            </div>
                            <p className="text-slate-800 leading-relaxed">
                              {t("section1.cards.1.desc")}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <h2 className="text-3xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow">
                        {t("dior.title")}
                      </h2>
                      <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />

                      <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none mb-8">
                          <CardContent className="p-6">
                          <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#142346] to-[#142346]/80 text-white shadow-sm ring-1 ring-black/5 flex items-center justify-center">
                              <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className={`text-lg font-semibold text-[#142346] mb-2 ${isRTL ? 'text-right' : ''}`}>
                                {t("dior.date")}
                              </h4>
                              <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'justify-end' : ''}`}>
                                <MapPin className="h-4 w-4 text-[#142346]" />
                                <span className={`text-slate-800 ${isRTL ? 'text-right' : ''}`}>
                                  {isRTL ? `${t("dior.location")}\u200F` : t("dior.location")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <p className={`text-base md:text-lg text-slate-800 leading-relaxed tracking-[0.005em] mb-6 ${isRTL ? 'text-right' : ''}`}>
                        {isRTL ? `${t("dior.paragraph1")}\u200F` : t("dior.paragraph1")}
                      </p>

                      <p className={`text-base md:text-lg text-slate-800 leading-relaxed tracking-[0.005em] mb-6 ${isRTL ? 'text-right' : ''}`}>
                        {(() => {
                          const p = t("dior.paragraph2");
                          if (!isRTL) return p;
                          const parts = p.split('WWC');
                          if (parts.length === 1) return `${p}\u200F`;
                          return (
                            <>
                              {parts[0]}
                              <span dir="ltr" style={{ unicodeBidi: 'plaintext' as const }}>WWC</span>
                              {parts.slice(1).join('WWC')}
                              {'\u200F'}
                            </>
                          );
                        })()}
                      </p>

                      <h2 className="text-3xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow">
                        {t("wwcInternational.title")}
                      </h2>
                      <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />

                      <p className={`text-base md:text-lg text-slate-800 leading-relaxed tracking-[0.005em] mb-6 ${isRTL ? 'text-right' : ''}`}>
                        {isRTL ? `${t("wwcInternational.paragraph")}\u200F` : t("wwcInternational.paragraph")}
                      </p>

                      <h2 className="text-3xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow">
                        {t("slimane.title")}
                      </h2>
                      <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />

                      {/* Slimane Concert - Dedicated Section */}
                      <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none mb-8">
                        <CardContent className="p-6">
                          <div className="grid md:grid-cols-2 gap-6 items-center">
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                              <Image
                                src="/sliman.png"
                                alt={t("slimane.imageAlt")}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold text-[#142346] mb-3">
                                {t("slimane.subtitle")}
                              </h4>
                              <p className={`text-slate-800 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                                {isRTL ? `${t("slimane.paragraph")}\u200F` : t("slimane.paragraph")}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <h3 className="text-2xl font-semibold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow">
                        {t("mediaCoverage.title")}
                      </h3>
                      <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />

                      <div className={`flex flex-col md:flex-row gap-4 mb-8 ${isRTL ? 'md:justify-end' : ''}`}>
                        <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none md:w-1/2">
                          <CardContent className="p-4">
                            <h4 className={`font-semibold text-[#142346] ${isRTL ? 'text-right' : ''}`}>{t("mediaCoverage.items.0.title")}</h4>
                            <p className={`text-sm text-slate-800 ${isRTL ? 'text-right' : ''}`}>{isRTL ? `${t("mediaCoverage.items.0.desc")}\u200F` : t("mediaCoverage.items.0.desc")}</p>
                          </CardContent>
                        </Card>
                        <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none md:w-1/2">
                          <CardContent className="p-4">
                            <h4 className={`font-semibold text-[#142346] ${isRTL ? 'text-right' : ''}`}>{t("mediaCoverage.items.1.title")}</h4>
                            <p className={`text-sm text-slate-800 ${isRTL ? 'text-right' : ''}`}>{isRTL ? `${t("mediaCoverage.items.1.desc")}\u200F` : t("mediaCoverage.items.1.desc")}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <NewsletterSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
