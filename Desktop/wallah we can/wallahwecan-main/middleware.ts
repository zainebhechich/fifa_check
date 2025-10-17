// PHASE 1 i18n fix: normalize alias import to relative for edge runtime stability
import { updateSession } from "./lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ["en", "fr", "ar"],
  defaultLocale: "fr",
  // PHASE 1 i18n fix: Always prefix locales so every page lives under /[locale]
  // This ensures NextIntlClientProvider wraps all user-facing routes
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin area: EXCLUDED from i18n entirely. Do not run next-intl; keep hardcoded language.
  if (/^\/admin(\/|$)/.test(pathname)) {
    // Still update Supabase session cookies for admin routes
    return await updateSession(request);
  }

  // PHASE 1 i18n fix: Normalize malformed locale paths to prevent duplication or missing slash
  // 1) Insert missing slash after locale: /arshop -> /ar/shop (only if it's exactly a locale prefix glued to the rest)
  const m1 = pathname.match(/^\/(fr|en|ar)([^/].*)$/);
  if (m1) {
    const locale = m1[1];
    const rest = m1[2];
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/${rest}`.replace(/\/+/g, '/');
    return NextResponse.redirect(url);
  }

  // 2) Collapse duplicated locale segments: /fr/fr/... -> /fr/...
  const m2 = pathname.match(/^\/(fr|en|ar)\/(fr|en|ar)(\/|$)/);
  if (m2 && m2[1] === m2[2]) {
    const locale = m2[1];
    const after = pathname.replace(/^\/(fr|en|ar)\/(?:fr|en|ar)/, `/${locale}`);
    const url = request.nextUrl.clone();
    url.pathname = after.replace(/\/+/g, '/');
    return NextResponse.redirect(url);
  }

  // First, handle internationalization (may be a redirect/rewrite)
  const intlResponse = intlMiddleware(request);

  // Then, update Supabase session cookies and merge them into the intl response
  const supabaseResponse = await updateSession(request);
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie);
  });

  return intlResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - api/.* (API routes)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp, .ico
     * - messages/.* (translation files)
     * Feel free to modify this pattern to include more paths.
     */
    // Include root path so '/' redirects to default locale (fr)
    "/",
    // Exclude admin from i18n handling entirely
    "/((?!_next/static|_next/image|api/.*|favicon.ico|messages/.*|admin(?:/.*)?|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
