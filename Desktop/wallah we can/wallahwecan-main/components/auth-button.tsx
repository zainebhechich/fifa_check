import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "../lib/supabase/server"; // PHASE 1 i18n fix: normalize import
import { LogoutButton } from "./logout-button";
import { getLocale, getTranslations } from 'next-intl/server'; // PHASE 1 i18n fix

export async function AuthButton() {
  const supabase = await createClient();
  const locale = await getLocale(); // PHASE 1 i18n fix
  const t = await getTranslations('Auth.Section.tabs'); // PHASE 1 i18n fix

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href={`/${locale}/auth/login`}>{t('login')}</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href={`/${locale}/auth/register`} prefetch>
          {t('signup')}
        </Link>
      </Button>
    </div>
  );
}
