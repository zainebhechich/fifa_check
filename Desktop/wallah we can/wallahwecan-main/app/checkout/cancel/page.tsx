import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'

// PHASE 1 i18n fix: Redirect non-locale route to default FR locale
export default async function CheckoutCancelRedirect() {
  const locale = await getLocale()
  redirect(`/${locale}/checkout/cancel`)
}
