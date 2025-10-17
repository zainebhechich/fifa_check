import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Locale-aware OAuth callback to support /fr/auth/callback, /en/auth/callback, /ar/auth/callback
export async function GET(request: Request) {
  const { searchParams, origin, pathname } = new URL(request.url)
  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) next = '/'

  if (!code) {
    const m2 = pathname.match(/^\/(fr|en|ar)\//)
    const localePrefix2 = m2 ? `/${m2[1]}` : ''
    return NextResponse.redirect(`${origin}${localePrefix2}/auth/auth-code-error`)
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('OAuth callback (locale) exchange error:', error.message)
      const m3 = pathname.match(/^\/(fr|en|ar)\//)
      const localePref3 = m3 ? `/${m3[1]}` : ''
      return NextResponse.redirect(`${origin}${localePref3}/auth/auth-code-error`)
    }
    const forwardedHost = request.headers.get('x-forwarded-host')
    const isLocal = process.env.NODE_ENV === 'development'
    if (isLocal) return NextResponse.redirect(`${origin}${next}`)
    if (forwardedHost) return NextResponse.redirect(`https://${forwardedHost}${next}`)
    return NextResponse.redirect(`${origin}${next}`)
  } catch (e) {
    console.error('OAuth callback (locale) unexpected error:', e)
    const m4 = pathname.match(/^\/(fr|en|ar)\//)
    const localePref4 = m4 ? `/${m4[1]}` : ''
    return NextResponse.redirect(`${origin}${localePref4}/auth/auth-code-error`)
  }
}
