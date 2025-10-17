"use client";

import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "../../../../components/footer";
import { NewsletterSection } from "../../../../components/newsletter-section";
import Link from "next/link";
import { ArrowLeft, Music, Users, Heart, Play, Eye, ExternalLink } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
// PHASE 1 i18n fix: client page uses next-intl hooks only

export default function CrescendoPage() {
  const t = useTranslations("Events.Crescendo");
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <WallahWeCanNavbar />
      <main className="relative pt-24 pb-8 md:pb-10">
        <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: '#fffff2' as const }} />
        <div className="relative z-10">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-center mb-6 md:mb-8"
            >
              <Link
                href={`/${locale}/evenements`}
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 transition-colors"
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
                  className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 p-6 md:p-8 text-center"
                >
                  <p className="text-base md:text-lg text-slate-800 leading-relaxed tracking-[0.005em]">
                    {isRTL ? (
                      <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                        {`${t("hero.description")}\u200F`}
                      </span>
                    ) : (
                      t("hero.description")
                    )}
                  </p>
                </motion.div>

                {/* Main Content */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="max-w-4xl mx-auto">
                    {/* Introduction */}
                      <div className="mb-16">
                      <h2 className="text-3xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow">
                        {t("intro.title")}
                      </h2>
                      <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />

                      <p className={`text-base md:text-lg text-slate-800 leading-relaxed tracking-[0.005em] mb-8 ${isRTL ? 'text-center' : ''}`}>
                        {isRTL ? (
                          <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                            {`${t("intro.paragraph")}\u200F`}
                          </span>
                        ) : (
                          t("intro.paragraph")
                        )}
                      </p>

                      <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
                        <CardContent className="p-6">
                          <h3 className={`text-xl font-semibold text-[#142346] mb-3 ${isRTL ? 'text-right' : ''}`}>
                            {t("intro.ambassadeTitle")}
                          </h3>
                          <p className={`text-slate-800 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                            {isRTL ? (
                              <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                                {`${t("intro.ambassadeParagraph")}\u200F`}
                              </span>
                            ) : (
                              t("intro.ambassadeParagraph")
                            )}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Concept */}
                    <div className="mb-16">
                      <p className={`text-base md:text-lg text-slate-800 leading-relaxed tracking-[0.005em] mb-12 ${isRTL ? 'text-right' : ''}`}>
                        {isRTL ? (
                          <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                            {`${t("concept.description")}\u200F`}
                          </span>
                        ) : (
                          t("concept.description")
                        )}
                      </p>

                      <div className="grid md:grid-cols-3 gap-8">
                        <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
                          <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-gradient-to-b from-[#142346] to-[#142346]/80 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm ring-1 ring-black/5">
                              <Music className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#142346] mb-3">
                              {t("concept.cards.0.title")}
                            </h3>
                            <p className="text-slate-800">
                              {isRTL ? (
                                <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                                  {`${t("concept.cards.0.desc")}\u200F`}
                                </span>
                              ) : (
                                t("concept.cards.0.desc")
                              )}
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
                          <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-gradient-to-b from-[#142346] to-[#142346]/80 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm ring-1 ring-black/5">
                              <Users className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#142346] mb-3">
                              {t("concept.cards.1.title")}
                            </h3>
                            <p className="text-slate-800">
                              {isRTL ? (
                                <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                                  {`${t("concept.cards.1.desc")}\u200F`}
                                </span>
                              ) : (
                                t("concept.cards.1.desc")
                              )}
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
                          <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-gradient-to-b from-[#142346] to-[#142346]/80 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm ring-1 ring-black/5">
                              <Heart className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#142346] mb-3">
                              {t("concept.cards.2.title")}
                            </h3>
                            <p className="text-slate-800">
                              {isRTL ? (
                                <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                                  {`${t("concept.cards.2.desc")}\u200F`}
                                </span>
                              ) : (
                                t("concept.cards.2.desc")
                              )}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Episode 1 */}
                    <div className="mb-20">
                      <h2 className="text-3xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow">
                        {t("episode1.title")}
                      </h2>
                      <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />

                          <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none mb-8">
                        <CardContent className={`p-6 ${isRTL ? 'text-right' : ''}`}>
                          <h3 className="text-xl font-semibold text-[#142346] mb-4">
                            {t("episode1.trackTitle")}
                          </h3>

                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className={`flex items-center gap-4 ${isRTL ? 'justify-end' : ''}`}>
                              <div className="w-12 h-12 bg-gradient-to-b from-[#142346] to-[#142346]/80 text-white rounded-full flex items-center justify-center shadow-sm ring-1 ring-black/5">
                                <Eye className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-[#142346]">1M+</p>
                                <p className="text-sm text-slate-800">{t("episode1.stats.views72h")}</p>
                              </div>
                            </div>

                            <div className={`flex items-center gap-4 ${isRTL ? 'justify-end' : ''}`}>
                              <div className="w-12 h-12 bg-gradient-to-b from-[#142346] to-[#142346]/80 text-white rounded-full flex items-center justify-center shadow-sm ring-1 ring-black/5">
                                <Play className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-[#142346]">6M+</p>
                                <p className="text-sm text-slate-800">{t("episode1.stats.totalViews")}</p>
                              </div>
                            </div>
                          </div>

                          <p className={`text-slate-800 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                            {isRTL ? (
                              <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                                {`${t("episode1.paragraph")}\u200F`}
                              </span>
                            ) : (
                              t("episode1.paragraph")
                            )}
                          </p>
                        </CardContent>
                      </Card>

                      {/* Episode 1 Videos */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                          <h4 className={`text-xl font-semibold text-[#142346] ${isRTL ? 'text-right' : ''}`}>
                              {t("episode1.mainPerformance")}
                            </h4>
                          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                            <iframe
                              src="https://www.youtube.com/embed/JVfukRb6SWU"
                              title={t("episode1.videoMainTitle")}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className={`text-xl font-semibold text-[#142346] ${isRTL ? 'text-right' : ''}`}>{t("episode1.makingOf")}</h4>
                          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                            <iframe
                              src="https://www.youtube.com/embed/bJANPMLNRa4"
                              title={t("episode1.videoMakingTitle")}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Episode 2 */}
                    <div className="mb-20">
                      <h2 className={`text-3xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow ${isRTL ? 'text-right' : ''}`}>
                        {t("episode2.title")}
                      </h2>
                      <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />

                      <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none mb-8">
                        <CardContent className="p-6">
                          <h3 className={`text-xl font-semibold text-[#142346] mb-4 ${isRTL ? 'text-right' : ''}`}>
                            {t("episode2.trackTitle")}
                          </h3>

                          <p className={`text-slate-800 leading-relaxed mb-6 ${isRTL ? 'text-right' : ''}`}>
                            {isRTL ? (
                              <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                                {`${t("episode2.paragraph")}\u200F`}
                              </span>
                            ) : (
                              t("episode2.paragraph")
                            )}
                          </p>

                          <div className={`flex items-center gap-4 ${isRTL ? 'justify-end' : ''}`}>
                            <div className="w-12 h-12 bg-gradient-to-b from-[#142346] to-[#142346]/80 text-white rounded-full flex items-center justify-center shadow-sm ring-1 ring-black/5">
                              <Eye className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-[#142346]">500K+</p>
                              <p className="text-sm text-slate-800">{t("episode2.stats.youtubeViews")}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Episode 2 Video */}
                      <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                          <iframe
                            src="https://www.youtube.com/embed/v7SRyi-jMxA"
                            title={t("episode2.videoTitle")}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>

                    {/* Media Coverage */}
                    <div className="mb-16">
                          <h3 className="text-3xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow">
                        {t("mediaCoverage.title")}
                      </h3>
                      <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />

                      <div className="max-w-md mx-auto">
                        <Link
                          href="http://kapitalis.com/tunisie/2021/03/03/wallah-we-can-crescendo-sur-le-toit-de-la-medina-pour-financer-un-centre-pour-les-enfants-victimes-de-violences-photos/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block p-6 rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-xl font-semibold text-[#142346] group-hover:text-orange-600 transition-colors">
                                {t("mediaCoverage.items.0.title")}
                              </h4>
                              <p className="text-slate-800 mt-2">
                                {isRTL ? (
                                  <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                                    {`${t("mediaCoverage.items.0.desc")}\u200F`}
                                  </span>
                                ) : (
                                  t("mediaCoverage.items.0.desc")
                                )}
                              </p>
                            </div>
                            <ExternalLink className="h-6 w-6 text-slate-800 group-hover:text-orange-600 transition-colors" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Impact Section */}
                    <Card className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none">
                      <CardContent className="p-8">
                        <h4 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow">
                          {t("impact.title")}
                        </h4>
                        <p className="text-lg text-slate-800 leading-relaxed text-center max-w-3xl mx-auto">
                          {isRTL ? (
                            <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                              {`${t("impact.paragraph")}\u200F`}
                            </span>
                          ) : (
                            t("impact.paragraph")
                          )}
                        </p>
                      </CardContent>
                    </Card>
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

// generateMetadata moved to a separate server file (metadata.ts)
