import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

// PHASE 1 i18n fix: Redirect non-locale route to default locale path
export default async function Formule3Page() {
  const locale = await getLocale();
  redirect(`/${locale}/team-building/formule-3`);
}
