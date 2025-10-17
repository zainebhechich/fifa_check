"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [maskSize, setMaskSize] = useState(size);
  const containerRef = useRef<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    
    // Only trigger when mouse is in the middle area of the container
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    const triggerZoneWidth = containerRect.width * 0.6; // 60% of width
    const triggerZoneHeight = containerRect.height * 0.4; // 40% of height
    
    const isInTriggerZone = 
      Math.abs(x - centerX) < triggerZoneWidth / 2 && 
      Math.abs(y - centerY) < triggerZoneHeight / 2;
    
    if (isInTriggerZone) {
      setMousePosition({ x, y });
      setMaskSize(revealSize);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setMaskSize(size);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative h-full w-full bg-transparent", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main text - visible when NOT hovering */}
      {!isHovered && (
        <div className="flex h-full w-full items-center justify-center text-center">
          <div className="mx-auto max-w-4xl text-2xl sm:text-3xl font-semibold px-4" style={{ color: '#fbf0d9' }}>
            {children}
          </div>
        </div>
      )}
      
      {/* Masked reveal text - only visible on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 flex h-full w-full items-center justify-center bg-transparent"
          style={{
            WebkitMaskImage: `radial-gradient(circle ${maskSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 40%, transparent 50%)`,
            maskImage: `radial-gradient(circle ${maskSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 40%, transparent 50%)`,
          } as React.CSSProperties}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="flex h-full w-full items-center justify-center text-center">
            {revealText}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export function SVGMaskEffect() {
  return (
    <div className="flex h-[12rem] w-full items-center justify-center overflow-hidden">
      <MaskContainer
        revealText={
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#142346] via-[#27457a] to-orange-600 mb-2">
              Notre Mission
            </h3>
            <p className="text-sm md:text-base text-slate-800 leading-relaxed">
              Pour <span className="font-semibold text-[#142346]">Wallah We Can</span>, la bonne gouvernance{" "}
              <span className="font-bold">N'EST PAS QU'UN SLOGAN</span>.{" "}
              La transparence <span className="font-bold text-orange-600">EST UN DEVOIR</span>.
            </p>
          </div>
        }
        className="h-[12rem] rounded-md"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-lg md:text-xl font-bold text-[#142346] mb-2">
            Gouvernance & Transparence
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-[#142346]">Wallah We Can</span> s'engage pour la bonne gouvernance en développant des règles et des pratiques qui garantissent le respect des droits des bénéficiaires, des engagés et des soutiens dans la transparence.
          </p>
        </div>
      </MaskContainer>
    </div>
  );
}
