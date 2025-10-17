import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  // PHASE 1 i18n fix: Next.js 15 passes params as a Promise when a parent layout does so
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Events.Crescendo.Page' });
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function CrescendoLayout({ children }: { children: React.ReactNode }) {
  // Server layout wrapper for Crescendo route
  return <>{children}</>;
}
