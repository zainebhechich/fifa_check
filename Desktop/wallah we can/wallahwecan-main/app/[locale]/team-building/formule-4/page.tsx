"use client";

import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "../../../../components/footer";
import { TeamBuildingContact } from "../../../../components/team-building-contact";
import { motion } from "framer-motion";
import { Users, Clock, MapPin, Heart } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useTranslations } from "next-intl";

const benefitsOrder = ["affordable", "impact", "partnership"] as const;

export default function Formule4Page() {
  const t = useTranslations("TeamBuilding.Formulas.Formule4");
  const bgStyle = {
    background: `radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)), url("data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    filter: "contrast(100%) brightness(100%)",
  };

  const benefitItems = benefitsOrder.map((key) => ({
    icon: Heart,
    text: t(`sections.benefits.items.${key}`),
    key,
  }));

  const detailCards = [
    {
      icon: Users,
      title: t("sections.details.cards.participants.title"),
      description: t("sections.details.cards.participants.description"),
    },
    {
      icon: Clock,
      title: t("sections.details.cards.booking.title"),
      description: t("sections.details.cards.booking.description"),
    },
    {
      icon: MapPin,
      title: t("sections.details.cards.transport.title"),
      description: t("sections.details.cards.transport.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <WallahWeCanNavbar />
      <main className="relative pt-24 pb-6">
        <div className="absolute inset-0 w-full h-full" style={bgStyle} />

        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8"
            >
              <div className="inline-block bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {t("badge")}
              </div>
              <div className="relative inline-block">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-2">
                  {t("title")}
                </h1>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              </div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4">
                {t("subtitle")}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center mb-8"
            >
              <Button
                onClick={() =>
                  document
                    .getElementById("team-building-contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-[rgb(20,35,70)] hover:bg-[rgb(20,35,70)]/90 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg"
              >
                {t("cta")}
              </Button>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md"
              >
                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-4">
                  {t("sections.description.title")}
                </h2>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>{t("sections.description.paragraph1")}</p>
                  <p>{t("sections.description.paragraph2")}</p>
                </div>
              </motion.div>

              {/* Avantages */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md"
              >
                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-4">
                  {t("sections.benefits.title")}
                </h2>
                <ul className="space-y-3 text-gray-700">
                  {benefitItems.map(({ icon: Icon, text, key }) => (
                    <li key={key} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Détails logistiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 mt-6 shadow-md"
            >
              <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-6">
                {t("sections.details.title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {detailCards.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-lg p-4 text-center"
                  >
                    <Icon className="w-8 h-8 text-[rgb(20,35,70)] mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-700">{description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <TeamBuildingContact />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
