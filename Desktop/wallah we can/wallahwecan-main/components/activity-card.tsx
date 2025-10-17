"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl" // PHASE 1 i18n fix

interface Activity {
  id: number
  title: string
  description: string
  image: string
  category: string
  duration: string
  participants: string
  price: string
}

interface ActivityCardProps {
  activity: Activity
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const t = useTranslations("TeamBuilding.Activities") // PHASE 1 i18n fix
  const locale = useLocale() // PHASE 1 i18n fix
  const isRtl = locale === 'ar' // PHASE 1 i18n fix

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-slate-200 dark:border-neutral-800",
        isHovered && "scale-[1.02]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0 relative">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={activity.image || "/placeholder.svg"}
            alt={activity.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <Badge className="absolute top-3 left-3 bg-orange-600 text-white">{activity.category}</Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-slate-800 dark:text-white line-clamp-2">{activity.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{activity.description}</p>

          <div className="flex flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1 text-slate-500">
              <Clock className="h-3 w-3" />
              {activity.duration}
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <Users className="h-3 w-3" />
              {activity.participants}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-orange-600 dark:text-orange-500">{activity.price}</span>
        </div>

        <Button className="bg-orange-600 hover:bg-orange-700 text-white" size="sm">
          <Mail className={`h-4 w-4 ${isRtl ? 'ml-2' : 'mr-2'}`} /> {/* PHASE 1 i18n fix: RTL spacing */}
          {t("quoteCta")}
        </Button>
      </CardFooter>
    </Card>
  )
}
