import Image from "next/image"
import { cn } from "@/lib/utils"

interface TeamMemberCardProps {
  name: string
  role: string
  imageUrl: string
  description: string // Changed from quote to description, and made it required
  className?: string
}

export function TeamMemberCard({ name, role, imageUrl, description, className }: TeamMemberCardProps) {
  return (
    <div
      className={cn(
        "bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 flex flex-col items-center text-center ring-1 ring-white/40 border-none transition-transform duration-300 hover:scale-[1.02]", // Updated to glassmorphism
        className,
      )}
    >
      <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-orange-500">
        {" "}
        {/* Reduced image size */}
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="80px"
        />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-0.5">{name}</h3> {/* Reduced font size */}
      <p className="text-orange-600 dark:text-orange-500 text-xs font-medium mb-2">{role}</p> {/* Reduced font size */}
      <p className="text-slate-600 dark:text-slate-300 text-sm italic line-clamp-3">&quot;{description}&quot;</p>{" "}
      {/* Ensure description is always present and clamped */}
    </div>
  )
}
