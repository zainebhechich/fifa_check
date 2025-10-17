import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function CrescendoPage() {
  const locale = await getLocale();
  redirect(`/${locale}/evenements/crescendo`);
}
