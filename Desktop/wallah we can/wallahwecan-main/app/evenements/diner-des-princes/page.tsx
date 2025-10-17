import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function DinerDesPrincesPage() {
  const locale = await getLocale();
  redirect(`/${locale}/evenements/diner-des-princes`);
}
