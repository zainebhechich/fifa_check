import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "@/components/footer";
import { GreenSchoolHero } from "@/components/green-school-hero";
import { GreenSchoolPillars } from "@/components/green-school-pillars";
import { GreenSchoolPdfSection } from "@/components/green-school-pdf-section";
import { GreenSchoolBeforeAfterSection } from "@/components/green-school-before-after-section";
import { GreenSchoolTeamSection } from "@/components/green-school-team-section";
import { GreenSchoolCallToAction } from "@/components/green-school-call-to-action";

export default function GreenSchoolPage() {

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffff2" }}>
      <WallahWeCanNavbar />

      <main className="relative pt-24 pb-6">
  {/* Page background set on container to #fffff2 */}

        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <GreenSchoolHero />
            <GreenSchoolPillars />
            <GreenSchoolPdfSection />
            <GreenSchoolBeforeAfterSection />
            <GreenSchoolTeamSection />
            <GreenSchoolCallToAction />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
