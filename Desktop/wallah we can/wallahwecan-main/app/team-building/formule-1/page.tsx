import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

// i18n: Redirect non-locale route to default locale path
export default async function Formule1Page() {
  const locale = await getLocale();
  redirect(`/${locale}/team-building/formule-1`);
}
