import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

// i18n: Redirect non-locale route to default locale path
export default async function UpdatePasswordPage() {
  const locale = await getLocale();
  redirect(`/${locale}/auth/update-password`);
}
