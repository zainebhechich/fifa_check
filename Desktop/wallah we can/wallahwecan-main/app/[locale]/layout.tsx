import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

// NOTE: Root app/layout.tsx already renders the <html>/<body>. Rendering them
// again here caused hydration mismatches (different className/style). This
// layout must ONLY provide the locale-specific message provider.

type Params = { locale: string };
type Props = { children: ReactNode; params: Promise<Params> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params; // keep async contract
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
