"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import arMessages from "@/messages/ar.json";

const messagesByLocale: Record<string, any> = {
  en: enMessages,
  fr: frMessages,
  ar: arMessages,
};

const supportedLocales = new Set(["en", "fr", "ar"]);

function GlobalErrorContent({ error }: { error: Error }) {
  const t = useTranslations("GlobalError");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground p-6">
      <h2>{t("title")}</h2>
      <pre className="max-w-xl whitespace-pre-wrap break-words bg-muted/40 p-4 rounded text-sm" aria-live="polite">
        {error.message}
      </pre>
      <button type="button" onClick={() => window.location.reload()} className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 transition-colors">
        {t("retry")}
      </button>
    </div>
  );
}

export default function GlobalError({ error }: { error: Error }) {
  const pathname = usePathname();

  const locale = useMemo(() => {
    if (!pathname) return "fr";
    const [, maybeLocale] = pathname.split("/");
    if (maybeLocale && supportedLocales.has(maybeLocale)) {
      return maybeLocale;
    }
    return "fr";
  }, [pathname]);

  const messages = messagesByLocale[locale] ?? frMessages;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className="min-h-screen bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <GlobalErrorContent error={error} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}