import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

// i18n: Redirect non-locale route to default locale path
export default async function EcolibreePage() {
  const locale = await getLocale();
  redirect(`/${locale}/projects/ecolibree`);
}
