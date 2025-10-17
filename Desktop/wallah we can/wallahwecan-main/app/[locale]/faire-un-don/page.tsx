"use client";

import React from "react";
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Building2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl"; // PHASE 1 i18n fix

export default function FaireUnDonPage() {
  const t = useTranslations('Donate.Page'); // PHASE 1 i18n fix
  const locale = useLocale(); // PHASE 1 i18n fix: detect current locale
  const isRTL = typeof locale === 'string' && locale.startsWith('ar'); // PHASE 1 i18n fix: RTL layout for Arabic
  return (
    <div className={`min-h-screen relative ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundColor: '#fffff2',
        }}
      />
      <div className="sticky top-0 z-50 w-full bg-white">
        <WallahWeCanNavbar />
      </div>
  <main className={`pt-24 pb-12 container mx-auto px-4 relative z-10 ${isRTL ? 'text-right' : 'text-left'}`}> {/* PHASE 1 i18n fix: mirror text for RTL */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`${isRTL ? 'text-right' : 'text-center'} mb-6 md:mb-8`}>
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
                {t('title')}
              </h1>
              <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
              <p className="mt-2 text-base md:text-lg text-white/90">
                {t('subtitle')}
              </p>
            </div>

            {/* Framed wrapper for parity */}
            <div className="relative mb-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-black/10 backdrop-blur-[2px]"
              />
              <div className="relative p-3 md:p-4">
                {/* Why Donate Section */}
                <div className={`rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 p-8 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}> {/* PHASE 1 i18n fix: mirror section for RTL */}
                  <h2 className={`text-3xl font-bold ${isRTL ? 'text-right' : 'text-center'} text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-6`}>
                    {t('why.title')}
                  </h2>
                  <p className="text-lg text-slate-800 leading-relaxed mb-6" style={isRTL ? { unicodeBidi: 'plaintext' } : undefined}>
                    {t('why.p1')}
                  </p>
                  <div className="bg-white/80 ring-1 ring-black/10 p-6 rounded-lg mb-6">
                    <p className={`text-xl font-semibold text-[#142346] ${isRTL ? 'text-right' : 'text-center'}`} style={isRTL ? { unicodeBidi: 'plaintext' } : undefined}>
                      {t('why.highlight')}
                    </p>
                  </div>
                  <p className="text-lg text-slate-800 leading-relaxed mb-6" style={isRTL ? { unicodeBidi: 'plaintext' } : undefined}>
                    {t('why.p2')}
                  </p>
                  <p className="text-slate-800" style={isRTL ? { unicodeBidi: 'plaintext' } : undefined}>
                    {t('why.p3')}
                  </p>
                </div>

                {/* Bank Transfer Information */}
                <div>
                  <h2 className={`text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 ${isRTL ? 'text-right' : 'text-center'}`}>
                    {t('bank.title')}
                  </h2>
                  <p className={`text-lg text-white/90 mb-8 ${isRTL ? 'text-right' : 'text-center'}`} style={isRTL ? { unicodeBidi: 'plaintext' } : undefined}>
                    {t('bank.intro')}
                  </p>

                  <div className={`grid lg:grid-cols-2 gap-6 md:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}> {/* PHASE 1 i18n fix: mirror cards for RTL */}
                    {/* Tunisia Bank Details */}
                    <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none" dir={isRTL ? 'rtl' : 'ltr'}>
                      <CardHeader className={`${isRTL ? 'text-right' : 'text-center'} pb-1`}>
                        <CardTitle className={`text-2xl ${isRTL ? 'text-right' : 'text-center'} text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 flex items-center justify-center gap-2`}>
                          <Building2 className="h-6 w-6 text-orange-500" />
                          {t('bank.tunisia.title')}
                        </CardTitle>
                        <div className="mx-auto mt-2 h-0.5 w-14 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                      </CardHeader>
                      <CardContent className={`space-y-4 text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}> {/* PHASE 1 i18n fix: mirror content for RTL */}
                        <div>
                          <h4 className="font-semibold text-[#142346]">
                            {t('bank.tunisia.ribTitle')}
                          </h4>
                          <p>{t('bank.tunisia.association')}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-3 text-sm" style={isRTL ? { unicodeBidi: 'plaintext' } : undefined}>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.tunisia.agency')}</span> Agence MARSA SAFSAF (K9)
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.tunisia.phone')}</span> +216 27 068 084
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.tunisia.rib')}</span> 08 055 0200920020517 04
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.tunisia.iban')}</span> TN59 0805 5020 0920 0205 1704
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.tunisia.bic')}</span> BIATTNTT
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.tunisia.currency')}</span> TND
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.tunisia.accountName')}</span> Association Wallah We Can
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.tunisia.address')}</span> Rue Abdelhafidh EL MEKKI 2070 LA MARSA
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* France Bank Details */}
                    <Card className="bg-white/70 backdrop-blur-md ring-1 ring-white/40 border-none" dir={isRTL ? 'rtl' : 'ltr'}>
                      <CardHeader className={`${isRTL ? 'text-right' : 'text-center'} pb-1`}>
                        <CardTitle className={`text-2xl ${isRTL ? 'text-right' : 'text-center'} text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 flex items-center justify-center gap-2`}>
                          <Building2 className="h-6 w-6 text-orange-500" />
                          {t('bank.france.title')}
                        </CardTitle>
                        <div className="mx-auto mt-2 h-0.5 w-14 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                      </CardHeader>
                      <CardContent className={`space-y-4 text-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}> {/* PHASE 1 i18n fix: mirror content for RTL */}
                        <div>
                          <h4 className="font-semibold text-[#142346]">
                            {t('bank.france.ribTitle')}
                          </h4>
                          <p>{t('bank.france.association')}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-3 text-sm" style={isRTL ? { unicodeBidi: 'plaintext' } : undefined}>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.france.agency')}</span> BNPPARB PARIS R DE PASSY (02302)
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.france.rib')}</span> 30004 02302 00010201268 43
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.france.iban')}</span> FR76 3000 4023 0200 0102 0126 843
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.france.bic')}</span> BNPAFRPPXXX
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.france.currency')}</span> EUR
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.france.accountName')}</span> WALLAH WE CAN FRANCE
                          </div>
                          <div>
                            <span className="font-semibold text-[#142346]">{t('bank.france.address')}</span> 6 RUE VICTOR DEJEANTE 75020 PARIS
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className={`mt-8 p-6 rounded-lg bg-white/80 ring-1 ring-black/10 ${isRTL ? 'text-right' : 'text-center'}`}>
                    <p className="text-slate-800" style={isRTL ? { unicodeBidi: 'plaintext' } : undefined}>
                      {t.rich('receipt.prompt', {
                        email: (chunks) => (
                          <a
                            href="mailto:finances@wallahwecan.org"
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-orange-500 to-amber-400 hover:opacity-90 font-semibold"
                          >
                            {chunks}
                          </a>
                        )
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
