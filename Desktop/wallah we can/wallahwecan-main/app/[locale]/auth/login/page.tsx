"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl"; // PHASE 1 i18n fix
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "../../../../components/ui/button"; // PHASE 1 i18n fix: normalize import
import { Input } from "../../../../components/ui/input"; // PHASE 1 i18n fix: normalize import
import { Label } from "../../../../components/ui/label"; // PHASE 1 i18n fix: normalize import
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card"; // PHASE 1 i18n fix: normalize import
import { Separator } from "../../../../components/ui/separator"; // PHASE 1 i18n fix: normalize import
import { Footer } from "../../../../components/footer"; // PHASE 1 i18n fix: normalize import
import { createClient as createBrowserSupabaseClient } from "../../../../lib/supabase/client"; // create client on demand
import { useAuth } from "../../../../contexts/auth-context";

const WallahWeCanNavbar = dynamic(() => import("../../../../navbar"), {
  ssr: false,
  loading: () => <div className="h-16" />,
});

type AuthState = {
  error?: string;
  success?: boolean;
  redirectTo?: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [authState, setAuthState] = useState<AuthState | null>(null); // PHASE 1 i18n fix
  const [isSubmitting, setIsSubmitting] = useState(false); // PHASE 1 i18n fix
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false); // PHASE 1 i18n fix
  const [redirectUrl, setRedirectUrl] = useState<string>("/");
  const [origin, setOrigin] = useState<string>("");
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Auth.Login"); // PHASE 1 i18n fix
  const tCommon = useTranslations("Common.General"); // PHASE 1 i18n fix
  const { signIn: _signIn } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("redirect");
    const safe = raw && raw.startsWith('/') && !raw.startsWith('//') ? raw : `/${locale}`;
    setRedirectUrl(safe);
    // Prefer configured site URL if provided to ensure correct absolute domain in OAuth redirects
    const envSite = process.env.NEXT_PUBLIC_SITE_URL;
    setOrigin(envSite && envSite.startsWith('http') ? envSite : window.location.origin);
  }, [locale]);

  const handleGoogleLogin = async () => {
    setAuthState(null); // PHASE 1 i18n fix
    setIsGoogleSubmitting(true); // PHASE 1 i18n fix
    try {
      const resolvedOrigin = origin || process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
  const supabase = createBrowserSupabaseClient()
  const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${resolvedOrigin}/${locale}/auth/callback?next=${encodeURIComponent(redirectUrl)}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) {
  console.error("OAuth error", error); // PHASE 1 i18n fix
        setAuthState({ error: t("errors.google") }); // PHASE 1 i18n fix
      }
    } catch (error) {
  console.error("OAuth exception", error); // PHASE 1 i18n fix
      setAuthState({ error: t("errors.google") }); // PHASE 1 i18n fix
    } finally {
      setIsGoogleSubmitting(false); // PHASE 1 i18n fix
    }
  };

  useEffect(() => {
    if (authState?.success) {
      const params = new URLSearchParams(window.location.search);
      const redirect = authState.redirectTo || params.get("redirect");
      router.push(redirect || "/");
    }
  }, [authState, router]);

  useEffect(() => {
    try {
      router.prefetch(`/${locale}/auth/register`);
      router.prefetch(`/${locale}/auth/forgot-password`);
    } catch (prefetchError) {
  console.warn("Prefetch error", prefetchError); // PHASE 1 i18n fix
    }
  }, [router, locale]);

  useEffect(() => {
    // Minimal listener; AuthContext already tracks state. Only redirect if login occurs here.
  const supabase = createBrowserSupabaseClient()
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        router.push(redirectUrl);
      }
    });
    return () => subscription.unsubscribe();
  }, [router, redirectUrl]);

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          filter: "contrast(100%) brightness(100%)",
        }}
      />
      <div className="relative z-10">
        <WallahWeCanNavbar />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-md bg-white/20 dark:bg-neutral-800/30 backdrop-blur-md border border-white/30 ring-1 ring-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle> {/* PHASE 1 i18n fix */}
                <CardDescription>{t("description")}</CardDescription> {/* PHASE 1 i18n fix */}
              </CardHeader>

              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleSubmitting}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {isGoogleSubmitting ? t("buttons.googleLoading") : t("buttons.google")} {/* PHASE 1 i18n fix */}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">{tCommon("or")}</span>
                  </div>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    setAuthState(null); // PHASE 1 i18n fix
                    setIsSubmitting(true); // PHASE 1 i18n fix
                    const formData = new FormData(event.currentTarget);
                    const email = formData.get("email") as string;
                    const password = formData.get("password") as string;

                    try {
                      const supabase = createBrowserSupabaseClient()
                      const { error } = await supabase.auth.signInWithPassword({ email, password });
                      if (error) {
                        console.error("Password login error", error); // PHASE 1 i18n fix
                        setAuthState({ error: t("errors.generic") }); // PHASE 1 i18n fix
                        return;
                      }

                      setAuthState({ success: true, redirectTo: redirectUrl }); // PHASE 1 i18n fix
                      router.push(redirectUrl);
                    } catch (error) {
                      console.error("Password login exception", error); // PHASE 1 i18n fix
                      setAuthState({ error: t("errors.generic") }); // PHASE 1 i18n fix
                    } finally {
                      setIsSubmitting(false); // PHASE 1 i18n fix
                    }
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("fields.email.label")}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("fields.email.placeholder")}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t("fields.password.label")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("fields.password.placeholder")}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showPassword ? t("accessibility.hidePassword") : t("accessibility.showPassword")}
                        </span>
                      </Button>
                    </div>
                  </div>

                  {authState?.error && (
                    <p className="text-red-300 text-sm text-center">{authState.error}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <Link
                  href={`/${locale}/auth/forgot-password`}
                  className="text-sm text-orange-200 hover:underline"
                >
                  {t("links.forgotPassword")}
                </Link>
                <div className="text-sm text-center">
                  {t("links.noAccountPrompt")} {" "}
                  <Link prefetch href={`/${locale}/auth/register`} className="text-orange-200 hover:underline">
                    {t("links.signUp")}
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
