import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function Formule4Page() {
  const locale = await getLocale();
  redirect(`/${locale}/team-building/formule-4`);
}
