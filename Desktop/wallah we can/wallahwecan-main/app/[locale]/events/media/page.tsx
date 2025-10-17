"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl"; // PHASE 1 i18n fix

import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "../../../../components/footer";
import { PinContainer } from "../../../../components/ui/3d-pin";

type MediaCard = {
  type: "media";
  title: string;
  href: string;
  label: string;
  desc: string;
  color: string;
  image?: string;
};

type PdfCard = {
  type: "pdf";
  name: string;
  url: string;
  img?: string;
};

type MediaCardData = Omit<MediaCard, "type">;
type PdfCardData = Omit<PdfCard, "type">;

type VideoEntry = {
  label: string;
  url: string;
};

type ArticleEntry = {
  title: string;
  source: string;
  link: string;
};

type PublicationCta = {
  href: string;
  image: string;
  alt: string;
};

function VideoButton({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 focus:outline-none overflow-hidden ${
        active
          ? "bg-gradient-to-r from-orange-500/30 to-[rgb(28,52,94)]/30 text-orange-100 shadow-lg"
          : "bg-gradient-to-r from-white/10 to-white/5 text-orange-200/80 hover:from-orange-500/20 hover:to-[rgb(28,52,94)]/20 hover:text-orange-100"
      }`}
    >
      <span className="relative z-10">{label}</span>
      {active ? (
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-[rgb(28,52,94)]/20 animate-pulse" />
      ) : null}
    </button>
  );
}

export default function MediaPage() {
  const t = useTranslations("Events.Media"); // PHASE 1 i18n fix
  const locale = useLocale() ?? "en";
  const isRTL = locale === "ar";
  const punct = isRTL ? "۔" : ".";

  const [_scrollX, setScrollX] = useState(0);
  const [paused, _setPaused] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeRadio, setActiveRadio] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [displayedText, setDisplayedText] = useState("");

  const _rowRef = useRef<HTMLDivElement>(null);
  const newsTextRef = useRef<HTMLDivElement | null>(null);

  // Safe extraction of structured translation data (avoid runtime crash when missing)
  // Safe raw accessor wrapper: returns fallback if key missing
  const safeRaw = <T,>(key: string, fallback: T): T => {
    try {
      return t.raw(key) as T;
    } catch {
      return fallback;
    }
  };

  const rawMedia = safeRaw<unknown>("cards.media", []);
  const rawPdfs = safeRaw<unknown>("cards.pdfs", []);
  const rawRadio = safeRaw<unknown>("radio.videos", []);
  const rawTv = safeRaw<unknown>("tv.videos", []);
  const rawArticles = safeRaw<unknown>("more.articles", []);
  const publicationCta = safeRaw<PublicationCta | undefined>("publications.cta", undefined); // expects {href,image,alt,button}
  const tickerList = (() => { try { return t("ticker.list"); } catch { return ""; } })();
  const fullText = (() => { try { return t("aboutText"); } catch { return ""; } })();

  const mediaCardData: MediaCardData[] = Array.isArray(rawMedia) ? rawMedia as MediaCardData[] : [];
  const pdfCardData: PdfCardData[] = Array.isArray(rawPdfs) ? rawPdfs as PdfCardData[] : [];
  const radioVideos: VideoEntry[] = Array.isArray(rawRadio) ? rawRadio as VideoEntry[] : [];
  const tvVideos: VideoEntry[] = Array.isArray(rawTv) ? rawTv as VideoEntry[] : [];
  const moreArticles: ArticleEntry[] = Array.isArray(rawArticles) ? rawArticles as ArticleEntry[] : [];

  const mediaCards: MediaCard[] = mediaCardData.length ? mediaCardData.map((card) => ({ ...card, type: "media" as const })) : [];
  const pdfCards: PdfCard[] = pdfCardData.length ? pdfCardData.map((card) => ({ ...card, type: "pdf" as const })) : [];
  const allCards: (MediaCard | PdfCard)[] = [...mediaCards, ...pdfCards];

  const activeTvVideo = tvVideos[activeVideo] ?? tvVideos[0];
  const activeRadioVideo = radioVideos[activeRadio] ?? radioVideos[0];

  function isMediaCard(card: MediaCard | PdfCard): card is MediaCard {
    return card.type === "media";
  }

  function isPdfCard(card: MediaCard | PdfCard): card is PdfCard {
    return card.type === "pdf";
  }


  // Restore scroll functions accidentally removed by patch
  const _scrollLeft = () => {
    setIsAutoScrolling(false);
    setScrollX((prev) => prev + 300);
  };

  const _scrollRight = () => {
    setIsAutoScrolling(false);
    setScrollX((prev) => prev - 300);
  };

  const _handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    setIsAutoScrolling(false);
    setScrollX((prev) => prev - event.deltaY);
  };

  // Typing effect for aboutText (displayedText)
  useEffect(() => {
    if (!fullText) return;
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [fullText, locale]);

  // Auto-scroll the media cards ticker unless paused or user interacted
  useEffect(() => {
    let rafId: number;
    let lastTs: number | undefined;

    const speedPxPerSec = 30; // horizontal speed

    const tick = (ts: number) => {
      if (paused || !isAutoScrolling) {
        lastTs = ts;
        rafId = requestAnimationFrame(tick);
        return;
      }
      if (lastTs === undefined) lastTs = ts;
      const dt = ts - lastTs;
      const delta = (dt / 1000) * speedPxPerSec;
      setScrollX((prev) => prev - delta);
      lastTs = ts;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [paused, isAutoScrolling]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black" dir={isRTL ? "rtl" : "ltr"}>
      <div className="fixed inset-0 w-full h-full" style={{ backgroundColor: '#fffff2' as const }} />

      <div className="relative z-10">
        <WallahWeCanNavbar />

        <section className="min-h-screen flex flex-col justify-center items-center">
          <div className="container mx-auto px-4">
            <div className="pt-32 pb-8">
              <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-black text-black dark:text-white leading-none tracking-tight text-center flex flex-wrap items-baseline justify-center gap-x-2 sm:gap-x-3">
                {isRTL ? (
                  <>
                    <span className="inline">{t("hero.life")}</span>
                    <span className="inline">&</span>
                    <span className="inline">{t("hero.media")}{punct}</span>
                  </>
                ) : (
                  <>
                    <span className="inline">{t("hero.media")}</span>
                    <span className="inline">&</span>
                    <span className="inline">{t("hero.life")}{punct}</span>
                  </>
                )}
              </h1>
            </div>

            <div className="bg-gradient-to-r from-[#1c345e] via-orange-500 to-[#1c345e] py-3 sm:py-4 overflow-hidden mb-8 sm:mb-12">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-[#1c345e] to-orange-500 z-10 px-4 sm:px-6 flex-shrink-0">
                  <span className="flex gap-1 sm:gap-2 text-xs sm:text-sm font-semibold uppercase whitespace-nowrap text-white">
                    <span className="hidden xs:inline">{t("ticker.news")}</span> {t("ticker.ticker")}
                    <span>+++</span>
                  </span>
                </div>
                <div className="overflow-hidden flex-1 relative">
                  <div
                    ref={newsTextRef}
                    className="marquee flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap text-xs sm:text-sm will-change-transform"
                  >
                    <span className="flex-shrink-0 text-amber-50/90">{tickerList}</span>
                    <span className="flex-shrink-0 text-amber-50/90" aria-hidden="true">{tickerList}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-20 mt-20 md:mt-28">
              <div>
                <h2 className="text-[3rem] md:text-[4rem] lg:text-[6rem] font-black text-black dark:text-white leading-none tracking-tight">
                  {t("dontClose.line1")}
                  <br />
                  {t("dontClose.line2")}
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-slate-800 dark:text-white text-lg font-medium leading-relaxed font-sans">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <main className="py-6 container mx-auto px-2">
          <div className="flex flex-col items-center w-full">
            <div className="text-center mb-8 w-full">
              <p className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-white text-center">
                {isRTL ? (
                  <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>
                    {`${t("weAttractMedia")}\u200F`}
                  </span>
                ) : (
                  t("weAttractMedia")
                )}
              </p>
            </div>

            <div className="overflow-x-auto w-full relative min-h-[12rem] sm:min-h-[16rem] group px-2 sm:px-0">
              <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 py-2 sm:py-4" style={{ minWidth: '100%' }}>
                {[...allCards, ...allCards].map((card, index) => {
                  if (isMediaCard(card)) {
                    return (
                      <div key={`media-${card.title}-${index}`} className="flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 px-1 sm:px-2">
                        <PinContainer title={card.title} href={card.href}>
                          <div className="relative w-full h-full rounded-lg overflow-hidden">
                            {card.image ? (
                              <Image
                                src={card.image}
                                alt={card.title}
                                className="object-cover"
                                fill
                                sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 160px"
                              />
                            ) : (
                              <div className={`w-full h-full bg-gradient-to-br ${card.color}`} />
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                              <h3 className="font-bold text-xs text-white mb-1 text-center">{card.label}</h3>
                              <div className="text-xs font-normal text-center">
                                <span className="text-slate-200">{card.desc}</span>
                              </div>
                            </div>
                          </div>
                        </PinContainer>
                      </div>
                    );
                  }

                  if (isPdfCard(card)) {
                    return (
                      <div key={`pdf-${card.name}-${index}`} className="flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 px-1 sm:px-2">
                        <PinContainer title={card.name} href={card.url}>
                          <div className="flex flex-col p-2 tracking-tight text-slate-100/50 w-full h-full">
                            <div className="flex-1 flex flex-col items-center justify-center relative rounded-lg overflow-hidden">
                              <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100">
                                {card.img ? (
                                  <Image
                                    src={card.img}
                                    alt={card.name}
                                    className="object-cover"
                                    fill
                                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 160px"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      className="h-10 w-10 text-red-600 fill-current"
                                      aria-hidden="true"
                                    >
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 2l6 6h-6z" />
                                      <text x="6" y="19" fontSize="6" fill="currentColor">
                                        PDF
                                      </text>
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                                <span className="text-xs font-bold text-white text-center block">{card.name}</span>
                              </div>
                            </div>
                          </div>
                        </PinContainer>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white mb-6">
              {t("tv.title")}
            </h2>
            {tvVideos.length > 0 ? (
              <div className="flex flex-wrap gap-4 mb-8 justify-center">
                {tvVideos.map((video, index) => (
                  <VideoButton
                    key={video.label}
                    label={video.label}
                    onClick={() => setActiveVideo(index)}
                    active={activeVideo === index}
                  />
                ))}
              </div>
            ) : null}
            <div className="w-full max-w-xl aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              {activeTvVideo ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={activeTvVideo.url}
                  title={activeTvVideo.label}
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white mb-2">
              {t("radio.title")}
            </h2>
            <p className="mb-6 text-center text-slate-600 dark:text-slate-300 max-w-2xl">
              {t("radio.description")}
            </p>
            {radioVideos.length > 0 ? (
              <div className="flex flex-wrap gap-4 mb-8 justify-center">
                {radioVideos.map((video, index) => (
                  <VideoButton
                    key={video.label}
                    label={video.label}
                    onClick={() => setActiveRadio(index)}
                    active={activeRadio === index}
                  />
                ))}
              </div>
            ) : null}
            <div className="w-full max-w-xl aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              {activeRadioVideo ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={activeRadioVideo.url}
                  title={activeRadioVideo.label}
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white mb-2">
              {t("more.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-6">
              {moreArticles.map((article) => (
                <a
                  key={article.link ?? article.title}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative backdrop-blur-sm bg-gradient-to-br from-white/20 to-white/10 dark:from-white/10 dark:to-white/5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 p-6 group hover:from-orange-500/20 hover:to-[rgb(28,52,94)]/20"
                >
                  <div className="flex flex-col h-full">
                    <span className="text-slate-800 dark:text-white font-bold text-lg mb-2 group-hover:underline">
                      {article.title}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 mb-2">{article.source}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{t("more.read")}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white mb-2">
              {t("publications.title")}
            </h2>
            <p className="mb-6 text-center text-slate-600 dark:text-slate-300 max-w-2xl">
              {t("publications.subtitle")}
            </p>
            <a
              href={publicationCta?.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-xs w-full relative backdrop-blur-sm bg-gradient-to-br from-white/20 to-white/10 dark:from-white/10 dark:to-white/5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group overflow-hidden hover:from-orange-500/20 hover:to-[rgb(28,52,94)]/20"
            >
              {publicationCta?.image ? (
                <Image
                  src={publicationCta.image}
                  alt={publicationCta.alt || t("publications.title")}
                  className="w-full h-48 object-cover rounded-t-xl"
                  width={400}
                  height={192}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-white/20 dark:bg-white/10">
                  <span className="text-sm text-slate-600 dark:text-slate-200">
                    {t("publications.cta")}
                  </span>
                </div>
              )}
              <div className="p-4 bg-black/60 text-white text-center">
                <span className="font-semibold text-sm">{publicationCta?.alt || t("publications.title")}</span>
              </div>
            </a>
          </div>
        </main>

        <Footer />
      </div>
      {/* Local styles for ticker marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee { animation: marquee 40s linear infinite; }
      `}</style>
    </div>
  );
}
