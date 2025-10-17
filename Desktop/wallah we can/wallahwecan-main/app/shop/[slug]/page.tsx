// PHASE 1 redirect stub
import { getLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}


export default async function LegacyProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const locale = await getLocale()
  redirect(`/${locale}/shop/${slug}`)
}

