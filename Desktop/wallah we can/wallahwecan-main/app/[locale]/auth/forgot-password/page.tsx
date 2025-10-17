"use client";

import React from "react";
import { useState } from "react";
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
import { Mail, ArrowLeft } from "lucide-react";
import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "../../../../components/footer"; // PHASE 1 i18n fix: normalize import
import { createClient as createBrowserSupabaseClient } from "../../../../lib/supabase/client"; // unify supabase client usage
import { useLocale, useTranslations } from "next-intl"; // PHASE 1 i18n fix

export default function ForgotPasswordPage() {
  const locale = useLocale();
  const t = useTranslations("Auth.ForgotPassword"); // PHASE 1 i18n fix
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [origin, setOrigin] = useState("");

  React.useEffect(() => {
    // Set client-side only value after hydration
    setOrigin(window.location.origin);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/${locale}/auth/reset-password`,
      });

      if (error) {
        setError(error.message ?? t("errors.generic")); // PHASE 1 i18n fix
      } else {
        setMessage(t("successDescription")); // PHASE 1 i18n fix
      }
    } catch {
      setError(t("errors.generic")); // PHASE 1 i18n fix
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <WallahWeCanNavbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
              <CardDescription>{t("description")}</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("emailLabel")}</Label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("placeholder")}
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {message && <p className="text-green-500 text-sm text-center">{message}</p>}

                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={isLoading}
                >
                  {isLoading ? t("sending") : t("submit")}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2">
              <Link
                href={`/${locale}/auth/login`}
                className="flex items-center text-sm text-orange-600 hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                {t("alreadyHaveAccount")}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
