import HomeClient from './HomeClient';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // await to satisfy dynamic route contract

  return <HomeClient locale={locale} />;
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'ar' }];
}
