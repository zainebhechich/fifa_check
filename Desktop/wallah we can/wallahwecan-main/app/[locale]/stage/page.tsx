"use client";

import React, { type FormEvent, type CSSProperties } from "react";
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer"; // PHASE 1 i18n fix: relative import
import { Button } from "../../../components/ui/button"; // PHASE 1 i18n fix
import { Input } from "../../../components/ui/input"; // PHASE 1 i18n fix
import { Label } from "../../../components/ui/label"; // PHASE 1 i18n fix
import { Textarea } from "../../../components/ui/textarea"; // PHASE 1 i18n fix
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"; // PHASE 1 i18n fix
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"; // PHASE 1 i18n fix
import { useState } from "react";
import { toast } from "sonner";
import { notifyStage } from "../../actions/notify"; // PHASE 1 i18n fix
import { motion } from "framer-motion";
import { useTranslations } from "next-intl"; // PHASE 1 i18n fix

type StudyYearValue = "" | "L1" | "L2" | "L3" | "M1" | "M2";
type InternshipTypeValue = "" | "observation" | "application" | "pfe";
type DurationValue = "" | "1m" | "2m" | "3m" | "6m";

type StageFormState = {
  nom: string;
  prenom: string;
  age: string;
  email: string;
  numero: string;
  universite: string;
  specialite: string;
  anneeEtude: StudyYearValue;
  typeStage: InternshipTypeValue;
  dureeStage: DurationValue;
  message: string;
};

const createInitialFormState = (): StageFormState => ({
  nom: "",
  prenom: "",
  age: "",
  email: "",
  numero: "",
  universite: "",
  specialite: "",
  anneeEtude: "",
  typeStage: "",
  dureeStage: "",
  message: "",
});

export default function StagePage() {
  const t = useTranslations("Stage.Page");
  const [formData, setFormData] = useState<StageFormState>(() => createInitialFormState());

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.anneeEtude || !formData.typeStage || !formData.dureeStage) {
        toast.error(t("toasts.error"));
        return;
      }

      const studyYearLabels: Record<Exclude<StudyYearValue, "">, string> = {
        L1: t("form.studyYears.L1"),
        L2: t("form.studyYears.L2"),
        L3: t("form.studyYears.L3"),
        M1: t("form.studyYears.M1"),
        M2: t("form.studyYears.M2"),
      };

      const internshipTypeLabels: Record<Exclude<InternshipTypeValue, "">, string> = {
        observation: t("form.internshipTypes.observation"),
        application: t("form.internshipTypes.application"),
        pfe: t("form.internshipTypes.pfe"),
      };

      const durationLabels: Record<Exclude<DurationValue, "">, string> = {
        "1m": t("form.durations.1m"),
        "2m": t("form.durations.2m"),
        "3m": t("form.durations.3m"),
        "6m": t("form.durations.6m"),
      };

      await notifyStage({
        ...formData,
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        age: formData.age.trim(),
        email: formData.email.trim(),
        numero: formData.numero.trim(),
        universite: formData.universite.trim(),
        specialite: formData.specialite.trim(),
        anneeEtude: studyYearLabels[formData.anneeEtude as Exclude<StudyYearValue, "">],
        typeStage: internshipTypeLabels[formData.typeStage as Exclude<InternshipTypeValue, "">],
        dureeStage: durationLabels[formData.dureeStage as Exclude<DurationValue, "">],
        message: formData.message.trim(),
      });

      setFormData(createInitialFormState());
  (e.currentTarget as HTMLFormElement).reset();
  toast.success(t("toasts.success"));
    } catch (err) {
      console.error(err);
      toast.error(t("toasts.error"));
    }
  };

  const bgStyle: CSSProperties = {
    background: `radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)), url("data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    filter: "contrast(100%) brightness(100%)",
  };

  return (
    <div className="min-h-screen relative">
      {/* Grainy background */}
      <div className="fixed inset-0 w-full h-full z-0" style={bgStyle} />

      <div className="sticky top-0 z-50 w-full bg-white">
        <WallahWeCanNavbar />
      </div>

      <main className="relative pt-24 pb-8 container mx-auto px-4 z-10">
        <div className="relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-center mb-6 md:mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
                {t("title")}
              </h1>
              <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
              <p className="mt-2 text-base md:text-lg text-white/90">{t("subtitle")}</p>
            </motion.div>

            {/* Framed content wrapper */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-black/10 backdrop-blur-[2px]"
              />
              <div className="relative p-3 md:p-4 space-y-8 md:space-y-10">
                {/* Introduction */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="rounded-lg bg-white/70 backdrop-blur-md ring-1 ring-white/40 p-8"
                >
                  <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-6">
                    {t("form.title")}
                  </h2>
                  <p className="text-lg text-slate-800 leading-relaxed mb-6">{t("intro.p1")}</p>
                </motion.div>

                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <Card className="bg-white/10 backdrop-blur-xl ring-1 ring-white/20 border-none rounded-lg shadow-xl">
                    <CardHeader className="text-center pb-1">
                      <CardTitle className="text-2xl text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600">
                        {t("form.title")}
                      </CardTitle>
                      <div className="mx-auto mt-2 h-0.5 w-14 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                    </CardHeader>
                    <CardContent className="grid gap-6 lg:grid-cols-12">
                      <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="nom">{t("form.lastName")} *</Label>
                            <Input
                              id="nom"
                              value={formData.nom}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, nom: e.target.value }))
                              }
                              required
                              className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                            />
                          </div>
                          <div>
                            <Label htmlFor="prenom">{t("form.firstName")} *</Label>
                            <Input
                              id="prenom"
                              value={formData.prenom}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, prenom: e.target.value }))
                              }
                              required
                              className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <Label htmlFor="age">{t("form.age")} *</Label>
                            <Input
                              id="age"
                              type="number"
                              value={formData.age}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, age: e.target.value }))
                              }
                              required
                              className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">{t("form.email")} *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, email: e.target.value }))
                              }
                              required
                              className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                            />
                          </div>
                          <div>
                            <Label htmlFor="numero">{t("form.phone")} *</Label>
                            <Input
                              id="numero"
                              value={formData.numero}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, numero: e.target.value }))
                              }
                              required
                              className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="universite">{t("form.university")} *</Label>
                            <Input
                              id="universite"
                              value={formData.universite}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, universite: e.target.value }))
                              }
                              required
                              className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                            />
                          </div>
                          <div>
                            <Label htmlFor="specialite">{t("form.specialty")} *</Label>
                            <Input
                              id="specialite"
                              value={formData.specialite}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, specialite: e.target.value }))
                              }
                              required
                              className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="anneeEtude">{t("form.studyYear")} *</Label>
                          <Select
                            value={formData.anneeEtude || undefined}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                anneeEtude: value as StudyYearValue,
                              }))
                            }
                          >
                            <SelectTrigger className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none">
                              <SelectValue placeholder={t("form.selectStudyYear")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="L1">{t("form.studyYears.L1")}</SelectItem>
                              <SelectItem value="L2">{t("form.studyYears.L2")}</SelectItem>
                              <SelectItem value="L3">{t("form.studyYears.L3")}</SelectItem>
                              <SelectItem value="M1">{t("form.studyYears.M1")}</SelectItem>
                              <SelectItem value="M2">{t("form.studyYears.M2")}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="typeStage">{t("form.internshipType")} *</Label>
                          <Select
                            value={formData.typeStage || undefined}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                typeStage: value as InternshipTypeValue,
                              }))
                            }
                          >
                            <SelectTrigger className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none">
                              <SelectValue placeholder={t("form.selectInternshipType")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="observation">{t("form.internshipTypes.observation")}</SelectItem>
                              <SelectItem value="application">{t("form.internshipTypes.application")}</SelectItem>
                              <SelectItem value="pfe">{t("form.internshipTypes.pfe")}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="dureeStage">{t("form.duration")} *</Label>
                          <Select
                            value={formData.dureeStage || undefined}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                dureeStage: value as DurationValue,
                              }))
                            }
                          >
                            <SelectTrigger className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none">
                              <SelectValue placeholder={t("form.selectDuration")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1m">{t("form.durations.1m")}</SelectItem>
                              <SelectItem value="2m">{t("form.durations.2m")}</SelectItem>
                              <SelectItem value="3m">{t("form.durations.3m")}</SelectItem>
                              <SelectItem value="6m">{t("form.durations.6m")}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="message">{t("form.message")}</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, message: e.target.value }))
                            }
                            rows={4}
                            placeholder={t("form.messagePlaceholder")}
                            className="bg-white/70 border-white/40 min-h-[88px] md:min-h-[100px] focus-visible:ring-2 focus-visible:ring-[#142346] focus-visible:outline-none"
                          />
                        </div>

                        <div>
                          <Label htmlFor="cv">{t("form.cv")} *</Label>
                          <Input
                            id="cv"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                          />
                        </div>

                        <Button type="submit" className="w-full bg-[#142346] hover:bg-[#142346]/90 text-white font-medium">
                          {t("form.confirm")}
                        </Button>
                      </form>

                      <aside className="lg:col-span-4">
                        <div className="sticky top-24 p-5 rounded-lg bg-white/80 ring-1 ring-black/10 text-slate-800">
                          <h3 className="text-lg font-semibold text-[#142346]">{t("sidebar.title")}</h3>
                          <ul className="mt-3 space-y-2 text-sm">
                            <li>{t("sidebar.items.associativeExperience")}</li>
                            <li>{t("sidebar.items.concreteImpact")}</li>
                            <li>{t("sidebar.items.mentorship")}</li>
                            <li>{t("sidebar.items.rewarding")}</li>
                          </ul>
                        </div>
                      </aside>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
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
