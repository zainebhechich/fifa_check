"use client";

import { useTranslations } from "next-intl"; // PHASE 1 i18n fix

export default function GeneralConditionsPage() {
  const t = useTranslations('GeneralConditions.Page');
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <p>{t('content')}</p>
    </div>
  );
}
