'use client';
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Camera, Calendar } from "lucide-react";
import { useTranslations } from "next-intl"; // PHASE 1 i18n fix

export default function EventsPage() {
  const t = useTranslations('Events.Page'); // PHASE 1 i18n fix
  const locale = useLocale();
  const isRTL = locale === 'ar';
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black" dir={isRTL ? 'rtl' : 'ltr'}>
      <WallahWeCanNavbar />
      <main className="pt-24 pb-12 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className={`text-3xl md:text-4xl font-bold text-center mb-10 text-[rgb(28,52,94)]`}>
            {t('title')}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-[#E04403] flex items-center gap-3">
                  <Camera className="h-8 w-8" />
                  {t('media.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}` }>
                <p className="text-gray-700" style={{ unicodeBidi: isRTL ? 'plaintext' as any : undefined }}>{t('media.description')}</p>
                <ul className={`list-disc list-inside text-gray-600 space-y-2 ${isRTL ? 'pe-5' : 'ps-5'}` }>
                  <li>{t('media.items.photos')}</li>
                  <li>{t('media.items.videos')}</li>
                  <li>{t('media.items.reports')}</li>
                  <li>{t('media.items.highlights')}</li>
                </ul>
                <Link href={`/${locale}/events/media`}>
                  <Button className="w-full bg-[#E04403] hover:bg-[#E04403]/90">
                    {t('media.cta')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-[#E04403] flex items-center gap-3">
                  <Calendar className="h-8 w-8" />
                  {t('events.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}` }>
                <p className="text-gray-700" style={{ unicodeBidi: isRTL ? 'plaintext' as any : undefined }}>{t('events.description')}</p>
                <ul className={`list-disc list-inside text-gray-600 space-y-2 ${isRTL ? 'pe-5' : 'ps-5'}` }>
                  <li>{t('events.items.diner')}</li>
                  <li>{t('events.items.crescendo')}</li>
                  <li>{t('events.items.fundraising')}</li>
                  <li>{t('events.items.conferences')}</li>
                </ul>
                <Link href={`/${locale}/evenements`}>
                  <Button className="w-full bg-[#E04403] hover:bg-[#E04403]/90">
                    {t('events.cta')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-[rgb(28,52,94)] mb-4">{t('follow.title')}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">{t('follow.description')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
