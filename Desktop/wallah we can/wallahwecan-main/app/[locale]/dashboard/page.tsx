"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { getCurrentUserClient, signOutClient } from "../../../lib/auth-client";
import { useLocale, useTranslations } from "next-intl";

interface UserSummary {
  email: string | null;
  full_name: string | null;
  role: string | null;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserSummary | null>(null);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Dashboard');

  useEffect(() => {
    const load = async () => {
      const { user: u, userData } = await getCurrentUserClient();
      if (!u) {
        router.push(`/${locale}/auth/login`);
        return;
      }
      setUser({
        email: u.email ?? null,
        full_name: userData?.full_name ?? u.email ?? null,
        role: userData?.role ?? null,
      });
      setLoading(false);
    };
    load();
  }, [router]);

  const handleLogout = async () => {
    await signOutClient();
    router.push(`/${locale}`);
  };

  const displayName = useMemo(() => {
    if (user?.full_name && user.full_name.trim().length > 0) {
      return user.full_name;
    }
    if (user?.email && user.email.trim().length > 0) {
      return user.email;
    }
    return t('card.defaultName');
  }, [user?.full_name, user?.email, t]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading.title')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WallahWeCanNavbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>{t('card.greeting', { name: displayName })}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{t('card.welcome')}</p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => router.push(`/${locale}/shop`)}>{t('card.actions.shop')}</Button>
                <Button variant="outline" onClick={() => router.push(`/${locale}/orders`)}>
                  {t('card.actions.orders')}
                </Button>
                <Button variant="ghost" onClick={handleLogout}>{t('card.actions.logout')}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
