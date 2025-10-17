"use client";

import { cn } from "../lib/utils"; // PHASE 1 i18n fix: normalize import
import { createClient } from "../lib/supabase/client"; // PHASE 1 i18n fix: normalize import
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
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl"; // PHASE 1 i18n fix
import { useState } from "react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const t = useTranslations('Auth.UpdatePassword'); // PHASE 1 i18n fix
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      // PHASE 1 i18n fix: redirect under active locale
      router.push(`/${locale}/protected`);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t('errors.generic'));
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
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">{t('newPassword')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('placeholderNewPassword')}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('saving') : t('submit')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
