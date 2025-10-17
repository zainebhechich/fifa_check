"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useLocale } from "next-intl"

// PHASE 1 i18n fix: normalize alias imports to relative paths
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { GardeinsGlobeIcon } from "../icons/gardeins-globe"

const languages = [
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "ar", label: "العربية", flag: "🇸🇦" },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() || "fr"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <GardeinsGlobeIcon className="h-5 w-5" />
          <span className="sr-only">Changer de langue</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onSelect={() => {
              // PHASE 1 i18n fix: ensure only one locale prefix
              const base = pathname || '/';
              const noLocale = base.replace(/^\/(fr|en|ar)(?=\/|$)/, '') || '/';
              const newPath = `/${lang.value}${noLocale.startsWith('/') ? noLocale : `/${noLocale}`}`
                .replace(/\/+/g, '/')
                .replace(/^\/(fr|en|ar)\/(fr|en|ar)(?=\/|$)/, '/$1');
              router.push(newPath)
            }}
            className="cursor-pointer"
          >
            <span className="flex items-center">
              <span className="mr-2 text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </span>
            <Check className={cn("ml-auto h-4 w-4", currentLocale === lang.value ? "opacity-100" : "opacity-0")} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
