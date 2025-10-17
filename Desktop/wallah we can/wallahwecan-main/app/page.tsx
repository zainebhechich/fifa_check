"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SUPPORTED_LOCALES = ["fr", "en", "ar"] as const;

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const navigatorLocale = typeof navigator !== "undefined" ? navigator.language?.split("-")?.[0]?.toLowerCase() : undefined;
    const targetLocale = (navigatorLocale && SUPPORTED_LOCALES.includes(navigatorLocale as typeof SUPPORTED_LOCALES[number]))
      ? (navigatorLocale as typeof SUPPORTED_LOCALES[number])
      : "fr";
    router.replace(`/${targetLocale}`);
  }, [router]);

  return null;
}
