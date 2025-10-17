"use client";

import { useLocale, useTranslations } from 'next-intl'; // PHASE 1 i18n fix
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
// PHASE 1 i18n fix: normalize alias imports to relative paths
import { Button } from './ui/button';
// PHASE 1 i18n fix: normalize dropdown imports to relative paths
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { GardeinsGlobeIcon } from './icons/gardeins-globe';

const languages = [
  { code: 'fr', label: 'FR', native: 'Français', nativeAr: 'الفرنسية' },
  { code: 'en', label: 'EN', native: 'English', nativeAr: 'الإنجليزية' },
  { code: 'ar', label: 'AR', native: 'العربية', nativeAr: 'العربية' },
] as const;

export function LanguageToggle() {
  const locale = useLocale();
  const tLang = useTranslations('Common.Languages'); // still used for a11y only
  const tSwitcher = useTranslations('Common.LanguageSwitcher'); // PHASE 1 i18n fix
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;

    // Remove any existing locale prefix
    const noLocale = pathname.replace(/^\/(fr|en|ar)(?=\/|$)/, '') || '/';
    // Prepend exactly one locale
    const newPath = `/${newLocale}${noLocale.startsWith('/') ? noLocale : `/${noLocale}`}`
      .replace(/\/+/g, '/')
      .replace(/^\/(fr|en|ar)\/(fr|en|ar)(?=\/|$)/, '/$1');

    startTransition(() => router.push(newPath)); // PHASE 1 i18n fix: use push to trigger route change
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 px-2 py-1.5 sm:px-3 sm:py-2 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-900/5 dark:hover:bg-white/5"
          disabled={isPending}
          aria-label={tSwitcher('trigger')}
        >
          {/* Matte black (currentColor) single-tone icon */}
          <GardeinsGlobeIcon className="h-4 w-4" mono color="currentColor" />
          {/* Single active code, uppercase, no box/border */}
          <span className="font-semibold tracking-wide">{currentLanguage?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {languages.map((language) => {
          let name: string = language.native;
          try {
            name = tLang(language.code as any);
          } catch {
            // Fallback to embedded native names to avoid MISSING_MESSAGE runtime errors
            name = locale === 'ar' ? language.nativeAr : language.native;
          }
          const localizedFullName = name;
          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`cursor-pointer gap-2 py-2.5 px-3 text-sm ${
                locale === language.code ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50' : ''
              }`}
              disabled={isPending}
              aria-label={tSwitcher('switchTo', { language: name })}
            >
              <span className="font-semibold w-8">{language.label}</span>
              <span className="text-neutral-600 dark:text-neutral-300">{localizedFullName}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
