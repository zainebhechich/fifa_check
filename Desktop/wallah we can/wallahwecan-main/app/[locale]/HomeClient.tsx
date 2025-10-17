"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import WallahWeCanNavbar from "../../navbar";
import { EngagementsSection } from "../../components/engagements-section";
import { ScrollVelocityContainer, ScrollVelocityRow } from "../../components/magicui/scroll-based-velocity";
import { AnimatedAchievementsSection } from "../../components/animated-achievements-section";
import { CallToActionSection } from "../../components/call-to-action-section";
import { CommitmentSection } from "../../components/commitment-section";
import { PartnersSection } from "../../components/partners-section";
import { NewsletterSection } from "../../components/newsletter-section";
import { ProjectsLayoutGridSection } from "../../components/projects-layout-grid-section";
import { Footer } from "../../components/footer";
import { FlipWords } from "../../components/ui/flip-words";
import { Toaster } from "sonner";

// Client-only dynamic import for features
const FeaturesSection = dynamic(
  () => import("../../components/features-section").then((m) => m.FeaturesSection),
  { ssr: false }
);

// Client-only hero video component
const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      v.muted = true;
      v.play().catch(() => {});
    };

    tryPlay();

    const onInteract = () => tryPlay();
    document.addEventListener("click", onInteract, { once: true });

    return () => document.removeEventListener("click", onInteract);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dmxofpavo/video/upload/v1699999999/avenir.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

// Client-only grainy background component
const GrainyBackground = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        background: `radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91))`,
        filter: "contrast(100%) brightness(100%)",
      }}
    />
  );
};

// Client-only scroll velocity component
const ScrollingBrandBand = () => {
  return (
    <div className="bg-transparent">
      <ScrollVelocityContainer className="text-3xl md:text-6xl font-bold py-6">
        <ScrollVelocityRow baseVelocity={10} direction={1}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(28,52,94)] via-[rgb(28,52,94)] to-orange-500">
            WALLAH WE CAN
          </span>
          <span className="mx-4 text-orange-500">•</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(28,52,94)] via-[rgb(28,52,94)] to-orange-500">
            WALLAH WE WILL
          </span>
          <span className="mx-4 text-orange-500">•</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(28,52,94)] via-[rgb(28,52,94)] to-orange-500">
            WALLAH WE DO
          </span>
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={8} direction={-1}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(28,52,94)] via-[rgb(28,52,94)] to-orange-500">
            WALLAH WE CAN
          </span>
          <span className="mx-4 text-orange-500">•</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(28,52,94)] via-[rgb(28,52,94)] to-orange-500">
            WALLAH WE WILL
          </span>
          <span className="mx-4 text-orange-500">•</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(28,52,94)] via-[rgb(28,52,94)] to-orange-500">
            WALLAH WE DO
          </span>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
};

interface HomeClientProps {
  locale: string;
}

export default function HomeClient({ locale }: HomeClientProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const t = useTranslations('Hero');
  const words = t.raw('words');
  const heroTitle = t('title'); // PHASE 1 i18n fix
  const heroSubtitle = t('subtitle'); // PHASE 1 i18n fix
  const isRTL = locale === 'ar';
  const punct = isRTL ? '۔' : '.'; // PHASE 1 i18n fix: proper punctuation for RTL

  // Only render after client mount to prevent hydration errors
  useEffect(() => {
    setMounted(true);

    // Prefetch important routes
    const routes = [
      "/get-involved",
      "/adherer",
      "/stage",
      "/faire-un-don",
      "/projects",
      "/evenements",
      "/a-propos",
      "/contact",
      "/transparency",
      "/shop",
    ];
    routes.forEach((route) => router.prefetch(`/${locale}${route}`));
  }, [router, locale]); // PHASE 1 fix: ensure locale prefetch updates when locale changes

  if (!mounted) return null; // Avoid SSR mismatch

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <WallahWeCanNavbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-white" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute inset-0 w-full h-full">
            <HeroVideo />
          </div>
          <div className="relative z-10 container mx-auto px-4 flex h-full flex-col items-center justify-center text-center pt-32 md:pt-40 lg:pt-48">
            <h1
              className={`max-w-4xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl ${isRTL ? 'text-right' : 'text-center'}`}
              dir="auto"
              style={isRTL ? ({ unicodeBidi: 'plaintext' } as React.CSSProperties) : undefined}
            >
              {heroTitle}
              <br />
              {heroSubtitle}{' '}
              <FlipWords words={words} className="text-orange-200 dark:text-orange-200" />{punct}
            </h1>
          </div>
        </section>

        {/* Scrolling Brand Band */}
        <ScrollingBrandBand />

        {/* Main Content with Grainy Background */}
        <div className="relative">
          <GrainyBackground />

          <div className="relative z-10">
            <EngagementsSection />
            <ProjectsLayoutGridSection />
            <FeaturesSection />
            <AnimatedAchievementsSection />
            <CallToActionSection />
            <CommitmentSection />
            <PartnersSection />
            <NewsletterSection />
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
