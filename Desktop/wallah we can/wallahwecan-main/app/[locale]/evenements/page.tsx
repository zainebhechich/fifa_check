"use client";

// PHASE 1 i18n fix
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import { NewsletterSection } from "../../../components/newsletter-section";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export default function EvenementsPage() {
  const t = useTranslations("Events.Page");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const events = [
    {
      id: 1,
      title: t("events.items.diner.title"),
      description: t("events.items.diner.description"),
      image:
        "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_evenement.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfZXZlbmVtZW50LndlYnAiLCJpYXQiOjE3NTg2NTA3MzksImV4cCI6MTkxNjMzMDczOX0.3wDzP-Gk5AOohkoLB-YViusxniW0qPVUcC-fLJqw3Wc",
      slug: "diner-des-princes",
    },
    {
      id: 2,
      title: t("events.items.crescendo.title"),
      description: t("events.items.crescendo.description"),
      image:
        "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_crescendo.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfY3Jlc2NlbmRvLndlYnAiLCJpYXQiOjE3NTg2NTIwNTgsImV4cCI6MTkxNjMzMjA1OH0.cUfFsvRCmxfSX_cdn26SWNvdnTTE27BcpGl4yGth4_I",
      slug: "crescendo",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <WallahWeCanNavbar />
      <main className="relative pt-24 pb-12">
        {/* Grainy Background - replaced with solid color per request */}
        <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: '#fffff2' as const }} />

        <div className="relative z-10">
          {/* Events Section */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-black/10 backdrop-blur-[2px]"
            />
            <div className="relative p-3 md:p-4">
              <section className="py-12 md:py-16" dir={isRTL ? "rtl" : "ltr"}>
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow mb-3">
                      {t("events.title")}
                    </h2>
                    <div className="mx-auto mb-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                    <p className="text-lg text-slate-800" style={{ unicodeBidi: isRTL ? ("plaintext" as any) : undefined }}>
                      {t("events.description")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {events.map((ev) => (
                      <motion.div
                        key={ev.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white/70 backdrop-blur-md ring-1 ring-white/40 hover:-translate-y-0.5">
                          <CardHeader className="p-0">
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <Image
                                src={ev.image || "/placeholder.svg"}
                                alt={ev.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                          </CardHeader>
                          <CardContent className={`p-6 ${isRTL ? "text-right" : "text-left"}`}>
                            <h3 className="text-xl font-semibold text-[#142346] mb-3">{ev.title}</h3>
                            <p className="text-slate-800 mb-4 line-clamp-2" style={{ unicodeBidi: isRTL ? ("plaintext" as any) : undefined }}>
                              {ev.description}
                            </p>
                            <Link href={`/${locale}/evenements/${ev.slug}`}>
                              <Button className="bg-[#142346] hover:bg-[#142346]/90 text-white">
                                {t("readMore")}
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Newsletter Section */}
          <NewsletterSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
