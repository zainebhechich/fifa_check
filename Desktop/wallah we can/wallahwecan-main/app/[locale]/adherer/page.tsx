"use client";

import React, { type FormEvent, type CSSProperties } from "react";
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { notifyAdherer } from "../../actions/notify";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl"; // PHASE 1 i18n fix

const SKILL_KEYS = [
  "communication",
  "design",
  "cleanEnergy",
  "agriculture",
  "entrepreneurship",
  "childRights",
  "psychology",
  "accounting",
  "videoEditing",
  "projectManagement",
] as const;

type SkillKey = (typeof SKILL_KEYS)[number] | "other";

type StatusValue = "" | "etudiant" | "professionnel" | "aucun";
type AvailabilityValue = "" | "2h" | "4h" | "6h";

type FormDataState = {
  nom: string;
  prenom: string;
  age: string;
  email: string;
  numero: string;
  statut: StatusValue;
  specialite: string;
  skills: SkillKey[];
  autres: string;
  message: string;
  disponibilite: AvailabilityValue;
};

const createInitialFormState = (): FormDataState => ({
  nom: "",
  prenom: "",
  age: "",
  email: "",
  numero: "",
  statut: "",
  specialite: "",
  skills: [],
  autres: "",
  message: "",
  disponibilite: "",
});

export default function AdhererPage() {
  const t = useTranslations('Adherer.Page');
  const [formData, setFormData] = useState<FormDataState>(() => createInitialFormState());

  const skillsOptions: Array<{ key: SkillKey; label: string }> = [
    ...SKILL_KEYS.map((key) => ({ key, label: t(`skills.${key}`) })),
    { key: "other", label: t('form.other') },
  ];

  const handleSkillChange = (skill: SkillKey, checked: boolean) => {
    setFormData((prev) => {
      const isSelected = prev.skills.includes(skill);
      if (checked && isSelected) {
        return prev;
      }

      if (!checked && !isSelected) {
        return prev;
      }

      const nextSkills = checked
        ? [...prev.skills, skill]
        : prev.skills.filter((s) => s !== skill);

      return {
        ...prev,
        skills: nextSkills,
        ...(skill === "other" && !checked ? { autres: "" } : {}),
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.statut || !formData.disponibilite) {
        toast.error(t('toasts.error'));
        return;
      }

      const statusLabels: Record<Exclude<StatusValue, "">, string> = {
        etudiant: t('form.statuses.student'),
        professionnel: t('form.statuses.professional'),
        aucun: t('form.statuses.none'),
      };

      const availabilityLabels: Record<Exclude<AvailabilityValue, "">, string> = {
        "2h": t('form.availabilities.2h'),
        "4h": t('form.availabilities.4h'),
        "6h": t('form.availabilities.6h'),
      };

      const translatedSkills = formData.skills.map((skillKey) => {
        if (skillKey === "other") {
          return formData.autres.trim()
            ? `${t('form.other')}: ${formData.autres.trim()}`
            : t('form.other');
        }

        return t(`skills.${skillKey}`);
      });

      await notifyAdherer({
        ...formData,
        statut: statusLabels[formData.statut as Exclude<StatusValue, "">],
        disponibilite: availabilityLabels[formData.disponibilite as Exclude<AvailabilityValue, "">],
        skills: translatedSkills,
        autres: formData.autres.trim(),
      });

      setFormData(createInitialFormState());
      (e.currentTarget as HTMLFormElement).reset();
      toast.success(t('toasts.success'));
    } catch (err) {
      console.error(err);
      toast.error(t('toasts.error'));
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
                {t('title')}
              </h1>
              <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
              <p className="mt-2 text-base md:text-lg text-white/90">{t('subtitle')}</p>
            </motion.div>

            {/* Framed content wrapper for improved readability and consistency */}
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
                  <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-6">{t('becomeMember')}</h2>
                  <p className="text-lg text-slate-800 leading-relaxed mb-6">
                    {t('intro.p1')}
                  </p>
                  <p className="text-lg text-slate-800 leading-relaxed mb-6">
                    {t('intro.p2')}
                  </p>

                  <div className="p-6 rounded-lg bg-white/80 ring-1 ring-black/10">
                    <h3 className="text-xl font-semibold text-[#142346] mb-2">{t('helpUs.title')}</h3>
                    <p className="text-gray-700 mb-3">{t('helpUs.subtitle')}</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1.5">
                      <li>{t('helpUs.items.conferences')}</li>
                      <li>{t('helpUs.items.presentations')}</li>
                      <li>{t('helpUs.items.social')}</li>
                    </ul>
                  </div>
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
                      <CardTitle className="text-2xl text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600">{t('form.title')}</CardTitle>
                      <div className="mx-auto mt-2 h-0.5 w-14 rounded-full bg-gradient-to-r from-[#142346] to-orange-500" />
                    </CardHeader>
                    <CardContent className="grid gap-6 lg:grid-cols-12">
                      <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="nom">{t('form.lastName')} *</Label>
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
                            <Label htmlFor="prenom">{t('form.firstName')} *</Label>
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
                            <Label htmlFor="age">{t('form.age')} *</Label>
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
                            <Label htmlFor="email">{t('form.email')} *</Label>
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
                            <Label htmlFor="numero">{t('form.phone')} *</Label>
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

                        <div>
                          <Label htmlFor="statut">{t('form.status')} *</Label>
                          <Select
                            value={formData.statut || undefined}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, statut: value as StatusValue }))
                            }
                          >
                            <SelectTrigger className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none">
                              <SelectValue placeholder={t('form.selectStatus')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="etudiant">{t('form.statuses.student')}</SelectItem>
                              <SelectItem value="professionnel">{t('form.statuses.professional')}</SelectItem>
                              <SelectItem value="aucun">{t('form.statuses.none')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="specialite">{t('form.specialty')}</Label>
                          <Input
                            id="specialite"
                            value={formData.specialite}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, specialite: e.target.value }))
                            }
                            className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                          />
                        </div>

                        <div>
                          <Label>{t('form.skills')}</Label>
                          <div className="grid md:grid-cols-3 gap-4 mt-2">
                            {skillsOptions.map((skill) => {
                              const checkboxId = `skill-${skill.key}`;
                              return (
                                <div key={skill.key} className="flex items-center gap-2">
                                <Checkbox
                                    id={checkboxId}
                                    checked={formData.skills.includes(skill.key)}
                                    onCheckedChange={(checked) =>
                                      handleSkillChange(skill.key, checked === true)
                                    }
                                  />
                                  <Label htmlFor={checkboxId} className="text-sm">
                                    {skill.label}
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {formData.skills.includes("other") && (
                          <div>
                            <Label htmlFor="autres">{t('form.other')}</Label>
                            <Input
                              id="autres"
                              value={formData.autres}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, autres: e.target.value }))
                              }
                              className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                            />
                          </div>
                        )}

                        <div>
                          <Label htmlFor="message">{t('form.message')}</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, message: e.target.value }))
                            }
                            rows={4}
                            className="bg-white/70 border-white/40 min-h-[88px] md:min-h-[100px] focus-visible:ring-2 focus-visible:ring-[#142346] focus-visible:outline-none"
                          />
                        </div>

                        <div>
                          <Label htmlFor="cv">{t('form.cv')}</Label>
                          <Input
                            id="cv"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none"
                          />
                        </div>

                        <div>
                          <Label>{t('form.availability')} *</Label>
                          <Select
                            value={formData.disponibilite || undefined}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                disponibilite: value as AvailabilityValue,
                              }))
                            }
                          >
                            <SelectTrigger className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[#0c445c] focus-visible:outline-none">
                              <SelectValue placeholder={t('form.selectAvailability')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2h">{t('form.availabilities.2h')}</SelectItem>
                              <SelectItem value="4h">{t('form.availabilities.4h')}</SelectItem>
                              <SelectItem value="6h">{t('form.availabilities.6h')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-[#142346] hover:bg-[#142346]/90 text-white font-medium"
                        >
                          {t('form.confirm')}
                        </Button>
                      </form>

                      <aside className="lg:col-span-4">
                        <div className="sticky top-24 p-5 rounded-lg bg-white/80 ring-1 ring-black/10 text-slate-800">
                          <h3 className="text-lg font-semibold text-[#142346]">{t('sidebar.title')}</h3>
                          <ul className="mt-3 space-y-2 text-sm">
                            <li>{t('sidebar.items.network')}</li>
                            <li>{t('sidebar.items.skillsForChildren')}</li>
                            <li>{t('sidebar.items.concreteProjects')}</li>
                            <li>{t('sidebar.items.newsletter')}</li>
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
