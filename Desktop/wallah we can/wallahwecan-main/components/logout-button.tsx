"use client";

import { createClient as createBrowserSupabaseClient } from "../lib/supabase/client"; // create client on demand
import { Button } from "./ui/button"; // PHASE 1 i18n fix: normalize import
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from 'next-intl'; // PHASE 1 i18n fix

export function LogoutButton() {
  const router = useRouter();
  const locale = useLocale(); // PHASE 1 i18n fix
  const t = useTranslations('Auth.SignupDemo.signout'); // PHASE 1 i18n fix

  const logout = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/auth/login`); // PHASE 1 i18n fix
  };

  return <Button onClick={logout}>{t('cta')}</Button>;
}
