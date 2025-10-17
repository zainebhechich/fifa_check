"use client"
// PHASE 1 i18n fix: Localized all user-facing strings in ProductReviews and synced message catalogs.

import * as React from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Star, LogIn } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"

import { cn } from "../lib/utils"
import { useAuth } from "../contexts/auth-context"

interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  is_approved: boolean
  profiles?: {
    id: string
    nom: string
    prenom: string
  }
}

interface ProductReviewsProps {
  productId: string
  initialReviews?: Review[]
}

export function ProductReviews({ productId, initialReviews = [] }: ProductReviewsProps) {
  const pathname = usePathname()
  const { user: authUser, profile } = useAuth()
  const [reviews, setReviews] = React.useState<Review[]>(initialReviews)
  const [loading, setLoading] = React.useState(false)
  const [rating, setRating] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const tReviews = useTranslations('Shop.Reviews')
  const tDetail = useTranslations('Shop.ProductDetail')
  const locale = useLocale()
  const isRtl = locale?.startsWith("ar")

  React.useEffect(() => {
    if (initialReviews.length === 0) {
      fetchReviews()
    }
  }, [productId, initialReviews.length])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/reviews?product_id=${productId}`)
      const result = await response.json()

      if (!response.ok) {
        console.error("Error fetching reviews:", result.error)
      } else {
        // Filter only approved reviews on the frontend
        const approvedReviews = (result.data || []).filter((review: Review) => review.is_approved)
        setReviews(approvedReviews)
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!authUser || !profile) {
      toast.error(tReviews('errors.loginRequired'))
      return
    }

    if (rating === 0 || !comment) {
      toast.error(tReviews('errors.fillAllFields'))
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          user_id: profile?.id || null, // Use profile.id which is UUID
          rating: rating,
          comment: comment,
        })
      })
      const result = await response.json()

      if (!response.ok) {
        console.error("Error submitting review:", result.error)
        toast.error(tReviews('errors.submitError'))
      } else {
        toast.success(tReviews('success.pendingApproval'))
        // Clear form
        setRating(0)
        setComment("")
        // Refresh reviews (though new one won't show until approved)
        fetchReviews()
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error(tReviews('errors.submitError'))
    } finally {
      setSubmitting(false)
    }
  }

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  // Determine if current user already has a (approved or pending) review
  const hasUserReview = React.useMemo(() => {
    if (!authUser) return false
    return initialReviews.some(r => r.user_id === authUser.id) || reviews.some(r => r.user_id === authUser.id)
  }, [authUser, initialReviews, reviews])

  // Reset form state when auth user changes (prevents stale data like test strings)
  React.useEffect(() => {
    setRating(0)
    setComment("")
  }, [authUser])

  return (
    <Card
      dir={isRtl ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-white/20 dark:bg-neutral-800/30 backdrop-blur-md border border-white/30 dark:border-white/10 ring-1 ring-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
    >
      {/* soft gradient/shine overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent" />

      <CardHeader>
        <CardTitle
          className={cn(
            "text-2xl font-bold text-white drop-shadow flex items-center justify-between",
            isRtl && "flex-row-reverse"
          )}
        >
          <span className={cn(isRtl ? "text-right" : "text-left")}>{tDetail('reviewsTitle')}</span>
          {reviews.length > 0 && (
            <div
              className={cn(
                "flex items-center gap-2 text-lg",
                isRtl && "flex-row-reverse"
              )}
            >
              <div
                className={cn("flex text-yellow-300 drop-shadow", isRtl && "flex-row-reverse")}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-current" : "opacity-60"}`} />
                ))}
              </div>
              <span className="text-white/80">
                {averageRating.toFixed(1)} {tReviews('reviewsCount', { count: reviews.length })}
              </span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-white/90">{tReviews('loading')}</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-white/90">{tReviews('empty')}</div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-white/20 pb-4 last:border-b-0">
                <div
                  className={cn(
                    "flex items-center mb-2",
                    isRtl && "flex-row-reverse text-right"
                  )}
                >
                  <h4 className="font-semibold text-white">
                    {review.profiles ? `${review.profiles.prenom} ${review.profiles.nom}` : tReviews('anonymous')}
                  </h4>
                  <div
                    className={cn(
                      "flex text-yellow-300",
                      isRtl ? "mr-4 flex-row-reverse" : "ml-4"
                    )}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "opacity-60"}`} />
                    ))}
                  </div>
                  <span
                    className={cn(
                      "text-sm text-white/80",
                      isRtl ? "mr-auto" : "ml-auto"
                    )}
                  >
                    {new Date(review.created_at).toLocaleDateString(locale)} {/* PHASE 1 i18n fix */}
                  </span>
                </div>
                <p className={cn("text-white/90", isRtl && "text-right")}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/20">
          <h3 className={cn("text-xl font-bold text-white mb-4", isRtl && "text-right")}>{tReviews('leaveReviewTitle')}</h3>

          {!authUser ? (
            <div className="text-center py-8">
              <p className="text-white/80 mb-4">{tReviews('mustBeLoggedIn')}</p>
              <Link href={`/${locale}/auth/login?redirect=${encodeURIComponent(pathname)}`}>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <LogIn className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2")} />
                  {tReviews('login')}
                </Button>
              </Link>
            </div>
          ) : hasUserReview ? (
            <div className="text-center py-6">
              <p className="text-white/80 mb-2">{tReviews('alreadyReviewed')}</p>
              <p className="text-sm text-white/60">{tReviews('alreadyReviewedHint')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="rating" className={cn("text-white/90", isRtl && "text-right")}>{tReviews('yourRating')}</Label>
                <div
                  className={cn(
                    "flex items-center gap-1",
                    isRtl && "flex-row-reverse justify-end"
                  )}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-6 w-6 cursor-pointer transition-colors",
                        star <= rating ? "text-yellow-300 fill-current" : "text-white/50 hover:text-yellow-200",
                      )}
                      aria-label={tReviews('rateStar', { value: star })}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comment" className={cn("text-white/90", isRtl && "text-right")}>{tReviews('yourComment')}</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                  rows={5}
                  required
                  placeholder={tReviews('commentPlaceholder')}
                  className={cn(
                    "bg-white/60 dark:bg-white/10 text-black dark:text-white border-white/30 focus-visible:ring-white/50",
                    isRtl ? "text-right" : "text-left"
                  )}
                />
              </div>
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={submitting}>
                {submitting ? tReviews('submitting') : tReviews('submitReview')}
              </Button>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
