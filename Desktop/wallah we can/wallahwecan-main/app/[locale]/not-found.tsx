import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';

// PHASE 1 i18n fix: localized 404 page under [locale]
export default async function NotFound() {
  // Use existing Common namespace; fallback keys if NotFound subtree missing
  let t: any;
  try {
    t = await getTranslations('Common.NotFound');
  } catch {
    t = await getTranslations('Common');
  }
  const locale = await getLocale();
  const withLocale = (path: string) => `/${locale}${path.startsWith('/') ? '' : '/'}${path.replace(/^\/+/, '')}`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-3xl font-bold mb-2">{t('title', { default: 'Page not found' })}</h1>
      <p className="text-muted-foreground mb-6">{t('description', { default: 'The page you are looking for could not be found.' })}</p>
      <Link href={withLocale('/')} className="text-blue-600 hover:underline">
        {t('backHome', { default: 'Back home' })}
      </Link>
    </main>
  );
}
