import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "@/components/footer";

export default function JoinUsPage() {
  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          filter: "contrast(100%) brightness(100%)",
        }}
      />
      <div className="relative z-10">
        <WallahWeCanNavbar />
        <main className="pt-24 pb-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white/20 dark:bg-neutral-800/30 backdrop-blur-md border border-white/30 ring-1 ring-white/40 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <h1 className="text-4xl font-bold text-center mb-4 text-brand-gradient">
              Rejoignez-nous
            </h1>
            <p className="text-lg text-center text-white/90">
              Découvrez comment vous pouvez devenir bénévole ou membre de notre équipe.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
