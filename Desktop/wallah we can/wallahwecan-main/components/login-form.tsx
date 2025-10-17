"use client";

import { cn } from "../lib/utils"; // PHASE 1 i18n fix: normalize import
// Use AuthContext for a single shared Supabase instance / session handling
import { useAuth } from "../contexts/auth-context"; // ensures single client session
import { Button } from "./ui/button"; // PHASE 1 i18n fix: normalize import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"; // PHASE 1 i18n fix: normalize import
import { Input } from "./ui/input"; // PHASE 1 i18n fix: normalize import
import { Label } from "./ui/label"; // PHASE 1 i18n fix: normalize import
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl"; // PHASE 1 i18n fix
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const t = useTranslations('Auth.Login'); // PHASE 1 i18n fix
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      // Redirect back to originating page if present (?redirect=...)
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect') || `/${locale}`;
      router.push(redirect);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
          <CardDescription>
            {t('subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('placeholderEmail')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Link
                    href={`/${locale}/auth/forgot-password`}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t('forgot')}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('loggingIn') : t('submit')}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t('noAccountPrompt')}{" "}
              <Link
                href={`/${locale}/auth/register`}
                prefetch
                className="underline underline-offset-4"
              >
                {t('signUpLink')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
