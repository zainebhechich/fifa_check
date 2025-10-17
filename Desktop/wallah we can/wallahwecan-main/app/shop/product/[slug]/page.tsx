import { redirect } from "next/navigation"
import { getLocale } from "next-intl/server"

export default async function LegacyProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const p = await params
  const locale = await getLocale()
  // Redirect legacy route to the canonical /[locale]/shop/[slug]
  redirect(`/${locale}/shop/${encodeURIComponent(p.slug)}`)
}
