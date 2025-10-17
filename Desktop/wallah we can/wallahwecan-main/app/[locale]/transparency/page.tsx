"use client";

import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import dynamic from "next/dynamic";
import React from "react";

const WavyBackground = dynamic(() => import("../../../components/ui/wavy-background"));
import { SVGMaskEffect } from "../../../components/ui/svg-mask-effect";
import GlassFolderGrid from "../../../components/glass-folder-grid";
import { NewsletterSection } from "../../../components/newsletter-section";
import { Card, CardContent } from "../../../components/ui/card";
import { Shield, RefreshCw, Eye, Clock } from "lucide-react";
import { useTranslations } from "next-intl"; // PHASE 1 i18n fix

export default function TransparencyPage() {
  const t = useTranslations('Transparency.Page'); // PHASE 1 i18n fix
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <WallahWeCanNavbar />

      <main className="relative pt-24 pb-6">
        {/* Enhanced Background with Wavy Elements */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)),
              radial-gradient(circle at 20% 80%, rgba(252,132,19,0.15), transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(6,43,124,0.15), transparent 50%),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
            `,
            filter: "contrast(100%) brightness(100%)",
          }}
        />

        {/* Enhanced Wavy Background Component - More Visible */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <WavyBackground className="w-full h-full" />
        </div>

        {/* Subtle gradient overlay for better blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Header - Consistent with other pages */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
                {t('title')}
              </h1>
              <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
              <div className="mt-2 flex items-center justify-center gap-2 text-xs md:text-sm text-white/80">
                <Clock className="h-4 w-4" />
                <span>{t('updatedRegularly')}</span>
              </div>
            </div>

            {/* Mission Section */}
            <section className="py-12 md:py-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 mb-3">
                  {t('mission.title')}
                </h2>
                <div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl ring-1 ring-white/40 border-none">
                  <CardContent className="p-6">
                    <SVGMaskEffect />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Commitments Section */}
            <section className="py-12 md:py-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 mb-3">
                  {t('commitments.title')}
                </h2>
                <div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl ring-1 ring-white/40 border-none">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/90 ring-1 ring-black/10">
                        <div className="w-10 h-10 rounded-md bg-[#142346]/10 text-[#142346] flex items-center justify-center">
                          <Eye className="h-5 w-5" />
                        </div>
                        <div className="leading-tight">
                          <div className="font-semibold text-gray-900 text-sm">{t('commitments.totalTransparency.title')}</div>
                          <p className="text-xs text-gray-700/90">{t('commitments.totalTransparency.desc')}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/90 ring-1 ring-black/10">
                        <div className="w-10 h-10 rounded-md bg-[#142346]/10 text-[#142346] flex items-center justify-center">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div className="leading-tight">
                          <div className="font-semibold text-gray-900 text-sm">{t('commitments.legalCompliance.title')}</div>
                          <p className="text-xs text-gray-700/90">{t('commitments.legalCompliance.desc')}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/90 ring-1 ring-black/10">
                        <div className="w-10 h-10 rounded-md bg-[#142346]/10 text-[#142346] flex items-center justify-center">
                          <RefreshCw className="h-5 w-5" />
                        </div>
                        <div className="leading-tight">
                          <div className="font-semibold text-gray-900 text-sm">{t('commitments.regularUpdates.title')}</div>
                          <p className="text-xs text-gray-700/90">{t('commitments.regularUpdates.desc')}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Documents Section */}
            <section className="py-12 md:py-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 mb-3">
                  {t('documents.title')}
                </h2>
                <div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                <p className="mt-4 text-sm text-white/80 max-w-2xl mx-auto">{t('documents.subtitle')}</p>
              </div>

              <div className="max-w-6xl mx-auto">
                <Card className="bg-white/80 backdrop-blur-md shadow-md rounded-xl ring-1 ring-white/40 border-none">
                  <CardContent className="p-6">
                    <GlassFolderGrid />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-12 md:py-16">
              <NewsletterSection />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
