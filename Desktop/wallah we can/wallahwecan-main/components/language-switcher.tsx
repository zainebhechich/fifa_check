"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl"; // PHASE 1 i18n fix
import { GardeinsGlobeIcon } from "./icons/gardeins-globe";

// PHASE 1 i18n fix: Simple language switcher using translated labels and proper navigation
export function LangSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); // PHASE 1 i18n fix
  const tLang = useTranslations("Common.Languages"); // PHASE 1 i18n fix
  const tSwitcher = useTranslations("Common.LanguageSwitcher"); // PHASE 1 i18n fix

  function switchTo(newLocale: string) {
    if (!pathname) return;
    // Remove any existing locale prefix and prepend the new one
    const noLocale = pathname.replace(/^\/(fr|en|ar)(?=\/|$)/, "");
    const newPath = `/${newLocale}${noLocale.startsWith("/") ? noLocale : `/${noLocale}`}`
      .replace(/\/+/g, "/")
      .replace(/^\/(fr|en|ar)\/(fr|en|ar)(?=\/|$)/, "/$1");
    router.push(newPath); // PHASE 1 i18n fix
  }

  const flags: Record<string, string> = { fr: "🇫🇷", en: "🇺🇸", ar: "🇹🇳" };
  const labels: Record<string, string> = { fr: "FR", en: "EN", ar: "AR" };

  return (
    <div className="inline-flex gap-1.5 items-center">
      <GardeinsGlobeIcon className="h-4 w-4" />
      {(["fr", "en", "ar"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-label={tSwitcher("switchTo", { language: tLang(code as any) })}
          className={`px-2.5 py-1.5 text-sm rounded-md border transition-colors flex items-center gap-1.5 ${
            locale === code
              ? "bg-orange-100 text-orange-700 border-orange-300"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
          }`}
        >
          <span aria-hidden>{flags[code]}</span>
          <span className="font-semibold tracking-wide">{labels[code]}</span>
        </button>
      ))}
    </div>
  );
}
