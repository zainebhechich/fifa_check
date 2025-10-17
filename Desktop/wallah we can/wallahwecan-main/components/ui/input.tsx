"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const radius = 100;
  const [hovered, setHovered] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(${hovered ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px, #E04403, transparent 80%)
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <input
        type={type}
        ref={ref}
        className={cn(
          `flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input
           placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-orange-500
           disabled:cursor-not-allowed disabled:opacity-50 transition duration-300
           group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium
           dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:placeholder-text-neutral-600
           dark:focus-visible:ring-orange-500`,
          className
        )}
        {...props}
      />
    </motion.div>
  );
});

Input.displayName = "Input";

export { Input };
