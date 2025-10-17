"use client"

import React from "react"
import { useTranslations } from "next-intl" // PHASE 1 i18n fix
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signIn, signUp } from "@/app/actions/auth"
import { useRouter } from "next/navigation"

interface AuthSectionProps {
  isLoggedIn: boolean
}

export function AuthSection({ isLoggedIn }: AuthSectionProps) {
  const t = useTranslations('Auth.Section') // PHASE 1 i18n fix
  const [loginState, setLoginState] = React.useState<{ error?: string; success?: boolean; redirectTo?: string } | null>(null)
  const [signupState, setSignupState] = React.useState<{ error?: string; success?: boolean; message?: string } | null>(null)
  const [_isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    if (loginState?.success && loginState?.redirectTo) {
      router.push(loginState.redirectTo)
    }
  }, [loginState, router])

  React.useEffect(() => {
    if (signupState?.success) {
      // Show success message or redirect
      if (signupState.message) {
        alert(signupState.message) // Or use a toast notification
      }
    }
  }, [signupState])

  const handleLoginSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setLoginState(null)
    try {
      const result = await signIn(formData)
      setLoginState(result as { error?: string; success?: boolean; redirectTo?: string })
    } catch {
  setLoginState({ error: t('errors.unexpected') }) // PHASE 1 i18n fix
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setSignupState(null)
    try {
      const result = await signUp(formData)
      setSignupState(result as { error?: string; success?: boolean; message?: string })
    } catch {
  setSignupState({ error: t('errors.unexpected') }) // PHASE 1 i18n fix
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoggedIn) {
    return null // Don't render auth section if user is logged in
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">{t('tabs.login')}</TabsTrigger>
          <TabsTrigger value="signup">{t('tabs.signup')}</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>{t('login.title')}</CardTitle>
              <CardDescription>{t('login.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input type="email" name="email" placeholder={t('fields.email')} required />
                </div>
                <div className="space-y-2">
                  <Input type="password" name="password" placeholder={t('fields.password')} required />
                </div>
                {loginState?.error && <p className="text-red-500 text-sm text-center">{loginState.error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loginState?.success === false}
                >
                  {t('login.cta')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>{t('signup.title')}</CardTitle>
              <CardDescription>{t('signup.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder={t('fields.firstName')} name="fullName" required /> {/* PHASE 1 i18n fix */}
                  <Input placeholder={t('fields.lastName')} name="lastName" /> {/* PHASE 1 i18n fix */}
                </div>
                <div className="space-y-2">
                  <Input type="email" name="email" placeholder={t('fields.email')} required />
                </div>
                <div className="space-y-2">
                  <Input type="password" name="password" placeholder={t('fields.password')} required />
                </div>
                <div className="space-y-2">
                  <Input type="password" name="confirmPassword" placeholder={t('fields.confirmPassword')} required />
                </div>
                {signupState?.error && <p className="text-red-500 text-sm text-center">{signupState.error}</p>}
                {signupState?.success && <p className="text-green-500 text-sm text-center">{signupState.message}</p>}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={signupState?.success === false}
                >
                  {t('signup.cta')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
