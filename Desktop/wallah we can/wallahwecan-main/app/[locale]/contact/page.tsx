"use client";

import type { CSSProperties, FormEvent } from "react";
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Linkedin, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { submitContact } from "./actions";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Contact"); // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = typeof locale === 'string' && locale.startsWith('ar')
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    subject: "",
    message: "",
  });
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = e.currentTarget as HTMLFormElement;
      const fd = new FormData(form);
      if (reason) fd.set("reason", reason);
      await submitContact(fd);
  toast.success(t('success')); // PHASE 1 i18n fix
      setFormData({ nom: "", email: "", subject: "", message: "" });
      setReason("");
      form.reset();
    } catch (err) {
      console.error(err);
  toast.error(t('error')); // PHASE 1 i18n fix
    } finally {
      setIsSubmitting(false);
    }
  };

  const bgStyle: CSSProperties = {
    backgroundColor: '#fffff2',
  };

  return (
  <div className="min-h-screen" style={bgStyle}>
      <WallahWeCanNavbar />
      <main className="relative pt-24 pb-6">
        <div className="absolute inset-0 w-full h-full" style={bgStyle} />

        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center mb-6 md:mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
                {t("title")}
              </h1>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs md:text-sm text-white/80">
                <Clock className="h-4 w-4" />
                <span>{t("responseTime")}</span>
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-black/10 backdrop-blur-[2px]"
              />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative grid grid-cols-1 items-stretch lg:grid-cols-12 gap-4 md:gap-5 p-3 md:p-4"
              >
                {/* Left: Contact details */}
                <Card className="flex flex-col rounded-lg bg-white/10 backdrop-blur-xl ring-1 ring-white/20 border-none self-start lg:self-center lg:col-span-5 lg:order-2">
                  <CardHeader className="pb-1 text-center">
                    <CardTitle className="text-base md:text-lg font-semibold text-[#142346] text-center">
                      {t("contactDetails")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-3">
                    <ul className="space-y-2">
                      <li className={`flex items-start gap-3 p-2 rounded-lg bg-white/80 ring-1 ring-black/10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-white to-white/60 text-[#142346] shadow-sm ring-1 ring-black/5 flex items-center justify-center ${isRtl ? 'ml-0 mr-3' : ''}`}>
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div className={`leading-tight ${isRtl ? 'text-right' : ''}`}>
                          <div className="font-semibold text-gray-900">{t('address')}{/* PHASE 1 i18n fix */}</div>
                          <p className="text-sm text-gray-700/90">{t('addressValue')}{/* PHASE 1 i18n fix */}</p>
                        </div>
                      </li>
                      <li className={`flex items-start gap-3 p-2 rounded-lg bg-white/80 ring-1 ring-black/10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-md bg-[#142346]/10 text-[#142346] flex items-center justify-center ${isRtl ? 'ml-0 mr-3' : ''}`}>
                          <Mail className="h-5 w-5" />
                        </div>
                        <div className={`leading-tight ${isRtl ? 'text-right' : ''}`}>
                          <div className="font-semibold text-gray-900">{t('email')}{/* PHASE 1 i18n fix */}</div>
                          <a
                            href="mailto:contact@wallahwecan.org"
                            className="text-sm text-[#0c445c] hover:underline"
                          >
                            contact@wallahwecan.org
                          </a>
                        </div>
                      </li>
                      <li className={`flex items-start gap-3 p-2 rounded-lg bg-white/80 ring-1 ring-black/10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-md bg-[#142346]/10 text-[#142346] flex items-center justify-center ${isRtl ? 'ml-0 mr-3' : ''}`}>
                          <Phone className="h-5 w-5" />
                        </div>
                        <div className={`leading-tight ${isRtl ? 'text-right' : ''}`}>
                          <div className="font-semibold text-gray-900">{t('phone')}{/* PHASE 1 i18n fix */}</div>
                          <a
                            href="tel:+21627068084"
                            className="text-sm text-[#0c445c] hover:underline"
                          >
                            +216 27 068 084
                          </a>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-auto pt-2">
                      <p className="text-xs text-gray-700/80 mb-2">{t('followUs')}{/* PHASE 1 i18n fix */}</p>
                      <div className="flex items-center gap-2.5">
                        <a
                          href="https://www.facebook.com/wallahwecan"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('aria.facebook')}
                          className="group"
                        >
                          <span className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-b from-white to-white/60 ring-1 ring-black/5 text-[#142346] shadow-sm group-hover:scale-105 transition-transform">
                            <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                          </span>
                        </a>
                        <a
                          href="https://www.instagram.com/wallah_we_can/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('aria.instagram')}
                          className="group"
                        >
                          <span className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-b from-white to-white/60 ring-1 ring-black/5 text-[#142346] shadow-sm group-hover:scale-105 transition-transform">
                            <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                          </span>
                        </a>
                        <a
                          href="https://www.youtube.com/channel/UCqpmRl29WlQ-lS72GyzjUXw"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('aria.youtube')}
                          className="group"
                        >
                          <span className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-b from-white to-white/60 ring-1 ring-black/5 text-[#142346] shadow-sm group-hover:scale-105 transition-transform">
                            <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                          </span>
                        </a>
                        <a
                          href="https://www.linkedin.com/company/wallah-we-can-worldwide"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('aria.linkedin')}
                          className="group"
                        >
                          <span className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-b from-white to-white/60 ring-1 ring-black/5 text-[#142346] shadow-sm group-hover:scale-105 transition-transform">
                            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Right: Form */}
                <Card className="flex flex-col rounded-lg bg-white/10 backdrop-blur-xl ring-1 ring-white/20 border-none self-start lg:col-span-7 lg:order-1">
                  <CardHeader className="pb-1 text-center">
                    <CardTitle className="text-base md:text-lg font-semibold text-[#142346] text-center">{t('sendMessage')}{/* PHASE 1 i18n fix */}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4" dir={isRtl ? 'rtl' : 'ltr'}>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nom" className={`${isRtl ? 'text-right' : ''}`}>{t('name')} *</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="nom"
                            name="nom"
                            placeholder={t('name')}
                            value={formData.nom}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, nom: e.target.value })}
                            required
                            className={`bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none ${isRtl ? 'text-right' : ''}`}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className={`${isRtl ? 'text-right' : ''}`}>{t('emailField')} *</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t('emailField')}
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className={`bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none ${isRtl ? 'text-right' : ''}`}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="subject" className={`${isRtl ? 'text-right' : ''}`}>{t('subject')}</Label> {/* PHASE 1 i18n fix */}
                          <Input
                            id="subject"
                            name="subject"
                            placeholder={t('subject')}
                            value={formData.subject}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, subject: e.target.value })}
                            className={`bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none ${isRtl ? 'text-right' : ''}`}
                          />
                        </div>
                        <div>
                          <Label className={`${isRtl ? 'text-right' : ''}`}>{t('reason')}</Label> {/* PHASE 1 i18n fix */}
                          <Select value={reason} onValueChange={(v: string) => setReason(v)}>
                            <SelectTrigger className={`bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none ${isRtl ? 'text-right' : ''}`}>
                              <SelectValue placeholder={t('selectReason')} /> {/* PHASE 1 i18n fix */}
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">{t('general')}{/* PHASE 1 i18n fix */}</SelectItem>
                              <SelectItem value="partnership">{t('partnership')}{/* PHASE 1 i18n fix */}</SelectItem>
                              <SelectItem value="donation">{t('donation')}{/* PHASE 1 i18n fix */}</SelectItem>
                              <SelectItem value="press">{t('press')}{/* PHASE 1 i18n fix */}</SelectItem>
                              <SelectItem value="volunteer">{t('volunteer')}{/* PHASE 1 i18n fix */}</SelectItem>
                            </SelectContent>
                          </Select>
                          <input type="hidden" name="reason" value={reason} />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className={`${isRtl ? 'text-right' : ''}`}>{t('message')} *</Label> {/* PHASE 1 i18n fix */}
                        <Textarea
                          id="message"
                          name="message"
                          placeholder={t('message')}
                          value={formData.message}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                          rows={5}
                          required
                          className={`bg-white/70 border-white/40 min-h-[88px] md:min-h-[100px] focus-visible:ring-2 focus-visible:ring-[#142346] focus-visible:outline-none ${isRtl ? 'text-right' : ''}`}
                        />
                      </div>

                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="mt-auto w-full bg-[#142346] hover:bg-[#142346]/90 text-white font-medium"
                      >
                        {isSubmitting ? t('sending') : t('send')}{/* PHASE 1 i18n fix */}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Map */}
            <div className="mt-6">
              <Card className="rounded-lg bg-white/10 backdrop-blur-xl ring-1 ring-white/20 border-none self-start overflow-hidden">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 drop-shadow">{t('locateUs')}{/* PHASE 1 i18n fix */}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl overflow-hidden ring-1 ring-white/30">
                    {/* PHASE 1 i18n fix: localized map title */}
                    <iframe
                      title={t('mapTitle')}
                      src="https://maps.google.com/maps?q=16%20rue%20de%20Palestine%2C%20Lafayette%2C%20Tunis%2C%20Tunisia&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-[320px] md:h-[420px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
