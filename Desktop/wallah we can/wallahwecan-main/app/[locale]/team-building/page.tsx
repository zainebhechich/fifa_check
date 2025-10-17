import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer"; // PHASE 1 i18n fix: relative import
import { TeamBuildingHero } from "../../../components/team-building-hero"; // PHASE 1 i18n fix
import { TeamBuildingServices } from "../../../components/team-building-services"; // PHASE 1 i18n fix
import { TeamBuildingProcess } from "../../../components/team-building-process"; // PHASE 1 i18n fix
import { TeamBuildingContact } from "../../../components/team-building-contact"; // PHASE 1 i18n fix
import { getTranslations } from "next-intl/server"; // PHASE 1 i18n fix: localized metadata

export default function TeamBuildingPage() {
  const bgStyle = {
    background: `radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)), url("data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    filter: "contrast(100%) brightness(100%)",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <WallahWeCanNavbar />

      <main className="relative pt-24 pb-6">
        {/* Background matching contact page and main page */}
        <div className="absolute inset-0 w-full h-full" style={bgStyle} />

        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <TeamBuildingHero />
            <TeamBuildingServices />
            <TeamBuildingProcess />
            <TeamBuildingContact />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  // PHASE 1 i18n fix: Parent [locale]/layout provides params as a Promise
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TeamBuilding.Page' });
  return {
    title: t('title'),
    description: t('description'),
  };
}
