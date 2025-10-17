"use client";

import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";

import { cn } from "../lib/utils";

interface ThreeDScrollTriggerRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ThreeDScrollTriggerContext =
  React.createContext<MotionValue<number> | null>(null);

export function ThreeDScrollTriggerContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });

  return (
    <ThreeDScrollTriggerContext.Provider value={velocityFactor}>
      <div className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </ThreeDScrollTriggerContext.Provider>
  );
}

export function ThreeDScrollTriggerRow(props: ThreeDScrollTriggerRowProps) {
  const sharedVelocityFactor = useContext(ThreeDScrollTriggerContext);
  if (sharedVelocityFactor) {
    return (
      <ThreeDScrollTriggerRowImpl
        {...props}
        velocityFactor={sharedVelocityFactor}
      />
    );
  }
  return <ThreeDScrollTriggerRowLocal {...props} />;
}

interface ThreeDScrollTriggerRowImplProps extends ThreeDScrollTriggerRowProps {
  velocityFactor: MotionValue<number>;
}

function ThreeDScrollTriggerRowImpl({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
  velocityFactor,
  ...props
}: ThreeDScrollTriggerRowImplProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numCopies, setNumCopies] = useState(1);
  const x = useMotionValue(0);

  const prevTimeRef = useRef(0);
  const unitWidthRef = useRef(0);
  const baseXRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use a single observer for the container to update the number of copies
    const ro = new ResizeObserver(([entry]) => {
      const containerWidth = entry.contentRect.width;
      const block = container.querySelector(
        ".threed-scroll-trigger-block"
      ) as HTMLDivElement;
      if (!block) return;

      const blockWidth = block.scrollWidth;
      unitWidthRef.current = blockWidth;

      if (blockWidth > 0) {
        const nextCopies = Math.max(
          3,
          Math.ceil(containerWidth / blockWidth) + 2
        );
        setNumCopies(nextCopies);
      }
    });

    ro.observe(container);

    return () => ro.disconnect();
  }, []);

  useAnimationFrame((time) => {
    const dt = (time - prevTimeRef.current) / 1000;
    prevTimeRef.current = time;

    const unitWidth = unitWidthRef.current;
    if (unitWidth <= 0) return;

    const velocity = velocityFactor.get();
    const speedMultiplier = Math.min(5, Math.abs(velocity));
    const scrollDirection = velocity >= 0 ? 1 : -1;
    const currentDirection = direction * scrollDirection;

    const pixelsPerSecond = (unitWidth * baseVelocity) / 100;
    const moveBy =
      currentDirection * pixelsPerSecond * (1 + speedMultiplier) * dt;

    const newX = baseXRef.current + moveBy;
    baseXRef.current = wrap(0, unitWidth, newX);
    x.set(baseXRef.current);
  });

  const childrenArray = React.Children.toArray(children);

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden whitespace-nowrap", className)}
      {...props}
    >
      <motion.div
        className="inline-flex will-change-transform transform-gpu"
        style={{ x: useTransform(x, (v) => `${-v}px`) }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "inline-flex shrink-0",
              i === 0 && "threed-scroll-trigger-block"
            )}
            aria-hidden={i !== 0}
          >
            {childrenArray}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ThreeDScrollTriggerRowLocal(props: ThreeDScrollTriggerRowProps) {
  const { scrollY } = useScroll();
  const localVelocity = useVelocity(scrollY);
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });
  return (
    <ThreeDScrollTriggerRowImpl
      {...props}
      velocityFactor={localVelocityFactor}
    />
  );
}

// All available partners from the partner folder
const partners = [
  { name: "Republic", logo: "/partner/republic.webp" },
  { name: "TV5", logo: "/partner/tv5.webp" },
  { name: "Dach", logo: "/partner/dach.webp" },
  { name: "Medic", logo: "/partner/medic.webp" },
  { name: "Colab", logo: "/partner/colab.webp" },
  { name: "Med", logo: "/partner/med.webp" },
  { name: "Sante", logo: "/partner/sante.webp" },
  { name: "Mabroyuka", logo: "/partner/mabroyuka.webp" },
  { name: "Value", logo: "/partner/value.webp" },
  { name: "ATB", logo: "/partner/atb.webp" },
  { name: "Aziza", logo: "/partner/aziza.webp" },
  { name: "Agri", logo: "/partner/agri.webp" },
  { name: "Labes", logo: "/partner/labes.webp" },
  { name: "Expensya", logo: "/partner/expensya.webp" },
  { name: "Chopard", logo: "/partner/chopard.webp" },
  { name: "Dior", logo: "/partner/dior.webp" },
  { name: "Dolce", logo: "/partner/dolce.png" },
  { name: "Femme", logo: "/partner/femme.webp" },
  { name: "Protection", logo: "/partner/protection.png" },
  { name: "Orange", logo: "/partner/orange.png" },
  { name: "Lyance", logo: "/partner/lyance.png" },
  { name: "GS1", logo: "/partner/gs1.png" },
  { name: "Isolmax", logo: "/partner/isolmax.png" },
  { name: "Institut Français", logo: "/partner/instituefr.png" },
  { name: "Astral", logo: "/partner/astral.png" },
  { name: "Carte Assurance", logo: "/partner/carteassurence.png" },
  { name: "Cap", logo: "/partner/cap.webp" },
  { name: "Hasdrubal", logo: "/partner/hasdrubal.png" },
  { name: "Sofrecom", logo: "/partner/sofrecom.png" },
  { name: "Cotugrain", logo: "/partner/cotugrain.png" },
  { name: "CTAB", logo: "/partner/ctab.png" },
  { name: "Galerie des Décorateurs", logo: "/partner/GALERIEDESDECORS.png" },
  { name: "Soli", logo: "/partner/soli.png" },
  { name: "Ahkili", logo: "/partner/ahkili.png" },
  { name: "TLS Contact", logo: "/partner/TLScontact .png" },
  { name: "OneTech", logo: "/partner/OneTech.png" },
  { name: "MAPED", logo: "/partner/MAPED.png" },
  { name: "Chnatelle", logo: "/partner/chnatelle.png" },
];
import { useTranslations, useLocale } from "next-intl";

export function PartnersSection() {
  const t = useTranslations("PartnersSection")
  const locale = useLocale()
  const _isRtl = locale === "ar"
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-10 text-center text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 drop-shadow">
          {t("title")}
        </h2>
        
        <ThreeDScrollTriggerContainer>
          <ThreeDScrollTriggerRow 
            baseVelocity={3} 
            direction={1}
            className="py-8"
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-lg bg-white/95 backdrop-blur-sm p-6 shadow-sm mx-4 min-w-[200px] h-24"
              >
                <Image
                  src={partner.logo}
                  alt={t("logoAlt", { name: partner.name })}
                  width={150}
                  height={80}
                  className="h-auto w-auto max-h-16 object-contain"
                />
              </div>
            ))}
          </ThreeDScrollTriggerRow>
        </ThreeDScrollTriggerContainer>
      </div>
    </section>
  );
}
