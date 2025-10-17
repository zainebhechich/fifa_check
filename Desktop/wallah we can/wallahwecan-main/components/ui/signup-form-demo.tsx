"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { IconBrandGoogle, IconBrandFacebook } from "@tabler/icons-react"
import { signIn, signUp, signOut, getCurrentUser } from "@/app/actions/auth"
import { useTranslations } from "next-intl" // PHASE 1 i18n fix

export default function SignupFormDemo() {
  const t = useTranslations('Auth.SignupDemo') // PHASE 1 i18n fix
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [authMessage, setAuthMessage] = useState<string | null>(null)
  const [isAuthSuccess, setIsAuthSuccess] = useState<boolean | null>(null)

  const resolveUserName = (
    userData: { prenom?: string | null; nom?: string | null } | null,
    email: string | null | undefined,
  ) => {
    const prenom = userData?.prenom?.trim() ?? ""
    const nom = userData?.nom?.trim() ?? ""
    const fullName = `${prenom} ${nom}`.trim()
    if (fullName) {
      return fullName
    }
    return email?.split("@")[0] ?? ""
  }

  const applyAuthFeedback = (result: any, successMessage: string) => {
    if (result?.error) {
      setAuthMessage(result.error)
      setIsAuthSuccess(false)
    } else if (result?.message) {
      setAuthMessage(result.message)
      setIsAuthSuccess(result.success ?? true)
    } else if (result?.success) {
      setAuthMessage(successMessage)
      setIsAuthSuccess(true)
    } else {
      setAuthMessage(t('feedback.unexpectedError'))
      setIsAuthSuccess(false)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const { user, userData } = await getCurrentUser()
      if (user) {
        const email = user.email ?? null
        setUserEmail(email)
        const displayName = resolveUserName(userData, email)
        setUserName(displayName || t('userDefault')) // PHASE 1 i18n fix
      } else {
        setUserEmail(null)
        setUserName(null)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (authMessage && !isAuthSuccess) {
      const timer = setTimeout(() => {
        setAuthMessage(null)
        setIsAuthSuccess(null)
  }, 5000) // PHASE 1 i18n fix
      return () => clearTimeout(timer)
    }
  }, [authMessage, isAuthSuccess])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthMessage(null)
    setIsAuthSuccess(null)

    const formData = new FormData(e.currentTarget)
    if (isLogin) {
      const result = await signIn(formData)
      setIsLoading(false)
      applyAuthFeedback(result, t('feedback.loginSuccess'))

      if (result?.success) {
        const { user, userData } = await getCurrentUser()
        if (user) {
          const email = user.email ?? null
          setUserEmail(email)
          const displayName = resolveUserName(userData, email)
          setUserName(displayName || t('userDefault')) // PHASE 1 i18n fix
        }
      }
    } else {
      const result = await signUp(formData)
      setIsLoading(false)
      applyAuthFeedback(result, t('feedback.signupSuccess'))

      if (result?.success) {
        const { user, userData } = await getCurrentUser()
        if (user) {
          const email = user.email ?? null
          setUserEmail(email)
          const displayName = resolveUserName(userData, email)
          setUserName(displayName || t('userDefault')) // PHASE 1 i18n fix
        }
      }
    }

  }

  const handleSignOut = async () => {
    setIsLoading(true)
    const result = await signOut()
    setIsLoading(false)
    applyAuthFeedback(result, t('feedback.logoutSuccess'))
    if (result?.success) {
      setUserEmail(null)
      setUserName(null)
    }
  }

  if (userEmail) {
    return (
      <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-white p-8 dark:bg-black">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
              style={{ backgroundColor: "rgb(28, 52, 94)" }}
            >
              <span className="text-white text-xl font-bold">{userName?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "rgb(28, 52, 94)" }}>
            {t('welcome', { name: userName || '' })}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">{t('loggedInAs', { email: userEmail || '' })}</p>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button className="flex flex-col items-center p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: "#E04403" }}
              >
                <span className="text-white text-xs">📦</span>
              </div>
              <span className="text-xs font-medium" style={{ color: "#E04403" }}>
                {t('quickActions.orders')}
              </span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: "rgb(28, 52, 94)" }}
              >
                <span className="text-white text-xs">❤️</span>
              </div>
              <span className="text-xs font-medium" style={{ color: "rgb(28, 52, 94)" }}>
                {t('quickActions.favorites')}
              </span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mb-1">
                <span className="text-white text-xs">⚙️</span>
              </div>
              <span className="text-xs font-medium text-gray-700">{t('quickActions.settings')}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-xl p-4 text-white" style={{ backgroundColor: "#E04403" }}>
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm opacity-90">{t('stats.orders')}</div>
            </div>
            <div className="rounded-xl p-4 text-white" style={{ backgroundColor: "rgb(28, 52, 94)" }}>
              <div className="text-2xl font-bold">127</div>
              <div className="text-sm opacity-90">{t('stats.loyaltyPoints')}</div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
            disabled={isLoading}
          >
            {isLoading ? t('signout.loading') : t('signout.cta')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-white p-8 dark:bg-black">
      {/* Tab Switcher */}
      <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            isLogin ? "bg-white shadow-md" : "text-gray-600 hover:text-gray-800"
          }`}
          style={isLogin ? { color: "rgb(28, 52, 94)" } : {}}
        >
          {t('tab.login')}
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            !isLogin ? "bg-white shadow-md" : "text-gray-600 hover:text-gray-800"
          }`}
          style={!isLogin ? { color: "#E04403" } : {}}
        >
          {t('tab.signup')}
        </button>
      </div>

      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {isLogin ? t('headline.login') : t('headline.signup')}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        {isLogin
          ? t('subhead.login')
          : t('subhead.signup')}
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">{t('fields.firstname')}</Label>
              <Input id="firstname" name="firstname" placeholder={t('placeholders.firstname')} type="text" required />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">{t('fields.lastname')}</Label>
              <Input id="lastname" name="lastname" placeholder={t('placeholders.lastname')} type="text" required />
            </LabelInputContainer>
          </div>
        )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">{t('fields.email')}</Label>
          <Input id="email" name="email" placeholder={t('placeholders.email')} type="email" required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">{t('fields.password')}</Label>
          <Input id="password" name="password" placeholder={t('placeholders.password')} type="password" required />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-12 w-full rounded-md font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-all duration-200 disabled:opacity-50"
          style={{
            background: isLogin
              ? "linear-gradient(135deg, rgb(28, 52, 94), rgb(20, 40, 80))"
              : "linear-gradient(135deg, #E04403, #C73A02)",
          }}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {t('loading')}
            </div>
          ) : (
            <>{isLogin ? t('cta.login') : t('cta.signup')} &rarr;</>
          )}
          <BottomGradient />
        </button>

        {authMessage && (
          <div
            className={cn(
              "mt-4 text-center text-sm p-3 rounded-md",
              isAuthSuccess
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
              isAuthSuccess && !isLogin && "font-bold text-base", // Make signup success message more prominent
            )}
          >
            {authMessage}
            {isAuthSuccess && !isLogin && (
              <p className="mt-2 text-xs">
                {t('verifyEmailNote')}
              </p>
            )}
          </div>
        )}

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black hover:bg-gray-100 transition-colors dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">{t('providers.google')}</span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black hover:bg-gray-100 transition-colors dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
          >
            <IconBrandFacebook className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">{t('providers.facebook')}</span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
}
