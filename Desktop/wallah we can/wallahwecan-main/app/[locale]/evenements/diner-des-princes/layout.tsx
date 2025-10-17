import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  // PHASE 1 i18n fix: Align signature with parent [locale]/layout
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Events.Diner.Page' });
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function DinerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
