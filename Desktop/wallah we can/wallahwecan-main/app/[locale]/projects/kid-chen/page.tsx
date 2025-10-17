import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "../../../../components/footer";
import { KidChenHero } from "../../../../components/kid-chen-hero";
import { KidChenKeyFigures } from "../../../../components/kid-chen-key-figures";
import { KidChenProcessDiagram } from "../../../../components/kid-chen-process-diagram"; // Updated import
import { KidChenBeneficiaries } from "../../../../components/kid-chen-beneficiaries";
import { KidChenCallToAction } from "../../../../components/kid-chen-call-to-action";
import { getTranslations } from "next-intl/server";

export default function KidChenPage() {
  const bgStyle = {
    backgroundColor: '#fffff2',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black" style={{ backgroundColor: '#fffff2' }}>
      <WallahWeCanNavbar />

      <main className="relative pt-24 pb-6">
  {/* Background matching contact page and main page */}
  <div className="absolute inset-0 w-full h-full" style={bgStyle} />

        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <KidChenHero />
            <KidChenKeyFigures />
            <section className="py-6">
              <div className="container mx-auto px-4">
                <div className="rounded-2xl bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md">
                  <KidChenProcessDiagram />
                </div>
              </div>
            </section>
            <KidChenBeneficiaries />
            <KidChenCallToAction />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  // PHASE 1 i18n fix: Align with [locale]/layout params Promise
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'KidChen.Page' });
  return {
    title: t('title'),
    description: t('description'),
  };
}
