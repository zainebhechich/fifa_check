"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import dynamic from "next/dynamic";
const WallahWeCanNavbar = dynamic(() => import("../../../../navbar"), {
  ssr: false,
  loading: () => <div className="h-16" />,
});
import { Footer } from "../../../../components/footer"; // PHASE 1 i18n fix: normalize import
import { signUp } from "../../../actions/auth"; // PHASE 1 i18n fix: normalize import
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl"; // PHASE 1 i18n fix

type SignUpState = {
  error?: string;
  success?: boolean;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, setState] = useState<SignUpState | null>(null); // PHASE 1 i18n fix
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Auth.Register"); // PHASE 1 i18n fix

  const translateError = useMemo(
    () =>
      (message?: string) => {
        if (!message) {
          return undefined;
        }

        const normalized = message.toLowerCase();

        if (
          normalized.includes("email") &&
          (normalized.includes("exists") ||
            normalized.includes("déjà") ||
            normalized.includes("already") ||
            normalized.includes("registered") ||
            normalized.includes("email_exists"))
        ) {
          return t("errors.emailExists");
        }

        if (normalized.includes("required") || normalized.includes("requis")) {
          return t("errors.missingFields");
        }

        return t("errors.generic");
      },
    [t]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setState(null); // PHASE 1 i18n fix

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const fullName = formData.get("fullName") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setState({ error: t("errors.passwordsMismatch") }); // PHASE 1 i18n fix
      setIsLoading(false);
      return;
    }

    if (!email || !password || !fullName) {
      setState({ error: t("errors.missingFields") }); // PHASE 1 i18n fix
      setIsLoading(false);
      return;
    }

    try {
      const res = await signUp(formData);
      if (res?.error) {
        setState({ error: translateError(res.error) }); // PHASE 1 i18n fix
        return;
      }

      if (res?.success) {
        setState({ success: true });
        const params = new URLSearchParams({ message: t("success.accountCreated") });
        router.push(`/${locale}/auth/login?${params.toString()}`); // PHASE 1 i18n fix
      }
    } catch {
      setState({ error: t("errors.generic") }); // PHASE 1 i18n fix
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      router.prefetch(`/${locale}/auth/login`); // PHASE 1 i18n fix
    } catch (prefetchError) {
      console.warn("Prefetch error", prefetchError); // PHASE 1 i18n fix
    }
  }, [locale, router]);

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
                <CardDescription>{t("subtitle")}</CardDescription> {/* PHASE 1 i18n fix */}
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("fields.fullName")}</Label> {/* PHASE 1 i18n fix */}
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder={t("placeholders.fullName")}
                        className="pl-10"
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("fields.email")}</Label> {/* PHASE 1 i18n fix */}
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("placeholders.email")}
                        className="pl-10"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t("fields.password")}</Label> {/* PHASE 1 i18n fix */}
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("placeholders.password")}
                        className="pl-10 pr-10"
                        required
                        autoComplete="new-password"
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t("fields.confirmPassword")}</Label> {/* PHASE 1 i18n fix */}
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("placeholders.confirmPassword")}
                        className="pl-10 pr-10"
                        required
                        autoComplete="new-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? t("accessibility.hidePassword")
                            : t("accessibility.showPassword")}
                        </span>
                      </Button>
                    </div>
                  </div>

                  {state?.error && (
                    <p className="text-red-500 text-sm text-center">{state.error}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading}
                  >
                    {isLoading ? t("creating") : t("submit")}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center">
                  {t("links.haveAccountPrompt")}{" "}
                  <Link prefetch href={`/${locale}/auth/login`} className="text-orange-600 hover:underline">
                    {t("links.login")}
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
