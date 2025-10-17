"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Footer } from "../../../../components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

const WallahWeCanNavbar = dynamic(() => import("../../../../navbar"), {
  ssr: false,
  loading: () => <div className="h-16" />,
});

export default function AuthCodeErrorPage() {
  const locale = useLocale();
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
              <CardHeader>
                <CardTitle>Authentication Error</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/80">
                  We couldn’t complete your sign-in. This can happen if the login window was closed or the code expired. Please try again.
                </p>
                <div className="flex gap-2">
                  <Link href={`/${locale}/auth/login`}>
                    <Button className="bg-orange-600 hover:bg-orange-700">Back to Login</Button>
                  </Link>
                  <Link href={`/${locale}`}>
                    <Button variant="outline">Go Home</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
