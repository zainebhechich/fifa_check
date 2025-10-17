import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
// PHASE 1 i18n fix: normalize alias imports to relative paths
import { Toaster } from "../components/ui/sonner";
import { AuthProvider } from "../contexts/auth-context";
import { getLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Wallah We Can - Ensemble pour un avenir meilleur",
  description: "Association dédiée à l'aide aux enfants défavorisés à travers des projets éducatifs, sociaux et environnementaux.",
  generator: "wallahwecan.app",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Keep <html lang> aligned with active locale for a11y/SEO; this runs per request
  const detectedLocale = (await getLocale()) || 'fr';
  const dir = detectedLocale === 'ar' ? 'rtl' : 'ltr'; // PHASE 1 i18n fix: set document direction

  return (
    <html lang={detectedLocale} dir={dir} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head />
  <body className={`antialiased bg-background ${inter.variable} ${poppins.variable}`} style={{ position: 'relative' }}>
        {/* PHASE 1 i18n fix: NextIntlClientProvider moved to app/[locale]/layout.tsx */}
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="wallah-theme">
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
