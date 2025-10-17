"use client";
import React from "react";
import { cn } from "@/lib/utils";

type GlassFolderProps = {
  className?: string;
  pdfUrl?: string;
};

const GlassFolder: React.FC<GlassFolderProps> = ({ className, pdfUrl: _pdfUrl }) => {
  return (
    <section
      className={cn(
        "relative group flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="relative w-48 h-36 cursor-pointer transition-all duration-500 ease-out group-hover:scale-105">
        {/* Main folder body */}
        <div className="relative w-full h-full">
          {/* Folder tab */}
          <div className="absolute -top-2 left-4 w-16 h-6 bg-gradient-to-br from-orange-400/90 to-orange-300/80 backdrop-blur-sm rounded-t-lg border border-orange-200/30 shadow-sm"></div>
          
          {/* Main folder container */}
          <div className="w-full h-full bg-gradient-to-br from-orange-300/80 to-orange-100/60 backdrop-blur-md rounded-lg border border-orange-200/40 shadow-lg group-hover:shadow-xl transition-all duration-300">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
            
            {/* Inner glow */}
            <div className="absolute inset-1 bg-gradient-to-br from-white/10 to-orange-200/20 rounded-md"></div>
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-30 rounded-lg" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
            
            {/* PDF indicator dot */}
            <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-sm opacity-80"></div>
          </div>
          
          {/* Bottom shadow */}
          <div className="absolute -bottom-1 left-1 right-1 h-2 bg-orange-400/20 blur-sm rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default GlassFolder;
