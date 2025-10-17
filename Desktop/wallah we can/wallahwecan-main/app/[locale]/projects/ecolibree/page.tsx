import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "@/components/footer";
import { EcolibreeHero } from "@/components/ecolibree-hero";
import { EcolibreeMissionVision } from "@/components/ecolibree-mission-vision";
import { EcolibreePartnership } from "@/components/ecolibree-partnership";
import { EcolibreeActions } from "@/components/ecolibree-actions";
import { EcolibreeGuideGallery } from "@/components/ecolibree-guide-gallery";
import { EcolibreeVideoShowcase } from "@/components/ecolibree-video-showcase";
import { EcolibreeYoutubeVideos } from "@/components/ecolibree-youtube-videos";
import { EcolibreeMediaPartners } from "@/components/ecolibree-media-partners";
import { EcolibreeTeam } from "@/components/ecolibree-team";
import { EcolibreeCallToAction } from "@/components/ecolibree-call-to-action";

export default function EcolibreePage() {
  const bgStyle = {
    backgroundColor: '#fffff2',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <WallahWeCanNavbar />

      <main className="relative pt-24 pb-6">
        {/* Background matching contact page and main page */}
        <div className="absolute inset-0 w-full h-full" style={bgStyle} />

        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <EcolibreeHero />
            <EcolibreeMissionVision />
            <EcolibreePartnership />
            <EcolibreeActions />
            <EcolibreeGuideGallery />
            <EcolibreeVideoShowcase />
            <EcolibreeYoutubeVideos />
            <EcolibreeMediaPartners />
            <EcolibreeTeam />
            <EcolibreeCallToAction />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
