"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BookOpen, Eye, X } from "lucide-react"
import { useTranslations, useLocale } from "next-intl" // PHASE 1 i18n fix

export function EcolibreeGuideGallery() {
  const t = useTranslations('Ecolibree.GuideGallery') // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Educational guide images from Supabase storage
  const guideImages = [
    {
      id: 1,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMS53ZWJwIiwiaWF0IjoxNzU4Nzk0MjMwLCJleHAiOjE5MTY0NzQyMzB9.E0LsklxCKa9w1Kbi3xeqoha11JjSz4XsTb4cG-yWn_g",
    },
    {
      id: 2,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMi53ZWJwIiwiaWF0IjoxNzU4Nzk0MjQ5LCJleHAiOjE5MTY0NzQyNDl9.1o5v4Irh7rTDAYdVqdnAi50Oe1tWF81L5EH9NKegI40",
    },
    {
      id: 3,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMy53ZWJwIiwiaWF0IjoxNzU4Nzk0MjYxLCJleHAiOjE5MTY0NzQyNjF9.mls-wEKH4LFHB65KY7FJzEvMWp1FACY4DD76GFXfo3c",
    },
    {
      id: 4,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_4.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfNC53ZWJwIiwiaWF0IjoxNzU4Nzk0MjcxLCJleHAiOjE5MTY0NzQyNzF9.Cj5HbqXxq0FaOWTKNUwEz-Rr7OURvdn8H0PAA3QNyaM",
    },
    {
      id: 5,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_5.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfNS53ZWJwIiwiaWF0IjoxNzU4Nzk0Mjg2LCJleHAiOjE5MTY0NzQyODZ9.I1fEFQWb0-_90ySMY5PySMSZCcN0_XHVgfUl4tahC7w",
    },
    {
      id: 6,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_6.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfNi53ZWJwIiwiaWF0IjoxNzU4Nzk0Mjk4LCJleHAiOjE5MTY0NzQyOTh9.oxFpqKAdkb4R0S6ubpOcRcbdfb_4C0oHOvET8lSAF64",
    },
    {
      id: 7,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_7.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfNy53ZWJwIiwiaWF0IjoxNzU4Nzk0MzA5LCJleHAiOjE5MTY0NzQzMDl9.sBCKwZ9rCn_y5NchRGNUnTAJBBwk8hrmf9A1HrM9ezc",
    },
    {
      id: 8,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_8.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfOC53ZWJwIiwiaWF0IjoxNzU4Nzk0MzE5LCJleHAiOjE5MTY0NzQzMTl9.pdqGJ7AHsJ_JGp72T6fNNuDWYV2MrLtJioq482oITmg",
    },
    {
      id: 9,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_9.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfOS53ZWJwIiwiaWF0IjoxNzU4Nzk0MzMyLCJleHAiOjE5MTY0NzQzMzJ9.I6oNtIqTa7yt0oS5HPyJ0lbL5iiRYbqYvseSus49bMI",
    },
    {
      id: 10,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_10.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMTAud2VicCIsImlhdCI6MTc1ODc5NDM0NiwiZXhwIjoxOTE2NDc0MzQ2fQ.4abFwAxkqohz9vJYjQQjdDxJQmn4HfCiv_McFRDYIqo",
    },
    {
      id: 11,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_11.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMTEud2VicCIsImlhdCI6MTc1ODc5NDM1NSwiZXhwIjoxOTE2NDc0MzU1fQ.KTTd_60eg2ryOblcnkSO7j8BUCtifYUZjom_O93OF2w",
    },
    {
      id: 12,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_12.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMTIud2VicCIsImlhdCI6MTc1ODc5NDQxMiwiZXhwIjoxOTE2NDc0NDEyfQ.fQrjcPlqnAC4L6NA2szB4cWNcqLHiAZxYBRRc4dWJJg",
    },
    {
      id: 13,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_13.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMTMud2VicCIsImlhdCI6MTc1ODc5NDQzNSwiZXhwIjoxOTE2NDc0NDM1fQ.oYdV076va4JQ1m6xXOSXmKzzHxodBcwNctH30sab7Hc",
    },
    {
      id: 14,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_14.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMTQud2VicCIsImlhdCI6MTc1ODc5NDQ0NiwiZXhwIjoxOTE2NDc0NDQ2fQ.5fph7vbv0i8CP1zEPNYIsXnx_uCu1sBtquA7Fbo_vEM",
    },
    {
      id: 15,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_15.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMTUud2VicCIsImlhdCI6MTc1ODc5NDQ1NSwiZXhwIjoxOTE2NDc0NDU1fQ.6toZhk1xZgun5TTHw9HZtVVa7F4Rl4uvc20jftqrADQ",
    },
    {
      id: 16,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_16.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMTYud2VicCIsImlhdCI6MTc1ODc5NDQ2NSwiZXhwIjoxOTE2NDc0NDY1fQ.w0m1Pfc80aECU-CB2rH1SMWUbnZUjlIf8X31hs-p-Cs",
    },
    {
      id: 17,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_17.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMTcud2VicCIsImlhdCI6MTc1ODc5NDQ3MiwiZXhwIjoxOTE2NDc0NDcyfQ.fPkWK6CS2OX10MeONh5JmLy11h7rugF1yAGsX9-GGlU",
    },
    {
      id: 18,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_18.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMTgud2VicCIsImlhdCI6MTc1ODc5NDQ4MCwiZXhwIjoxOTE2NDc0NDgwfQ.OGPGJim-3v_-jVWKlmNpRJ5svG5v9FyKIQEMNMl8it8",
    },
    {
      id: 19,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_19.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMTkud2VicCIsImlhdCI6MTc1ODc5NDQ4OCwiZXhwIjoxOTE2NDc0NDg4fQ.jLhAJOioYwAeDyBlRhf6cNxIFdxs9fbB1hVvkcI9_iw",
    },
    {
      id: 20,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_20.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMjAud2VicCIsImlhdCI6MTc1ODc5NDQ5OCwiZXhwIjoxOTE2NDc0NDk4fQ.-U8CQcv6neY-laOv7O1ymASnUIIpCVug2L-Nei2DLgQ",
    },
    {
      id: 21,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_21.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMjEud2VicCIsImlhdCI6MTc1ODc5NDUwNiwiZXhwIjoxOTE2NDc0NTA2fQ.MM0AuXDKqMGHbxE2Lr092KQaVcCpCd7BaXTRWgUApK0",
    },
    {
      id: 22,
      src: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_22.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfMjIud2VicCIsImlhdCI6MTc1ODc5NDUxNCwiZXhwIjoxOTE2NDc0NTE0fQ.__2xEnizP06fnJnLD1yBK9DngXUOdY6BDxYlpQvbMMU",
    },
  ]

  const getCurrentImage = () => {
    return guideImages.find(img => img.id === selectedImage)
  }

  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md rounded-xl p-6 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[#142346] to-orange-600 drop-shadow-lg text-center">
             {t('title')}
          </h2>
          <p className="text-lg text-blue-900 mb-6 max-w-3xl mx-auto text-center leading-relaxed">
            {isRtl ? (
              <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${t('subtitle1')}\u200F`}</span>
            ) : (
              t('subtitle1')
            )}
            <br />
            {isRtl ? (
              <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${t('subtitle2')}\u200F`}</span>
            ) : (
              t('subtitle2')
            )}
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#142346] to-orange-600 hover:from-[#142346]/90 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 mx-auto px-4 py-2 h-auto min-h-[40px] flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">{t('openButton')}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-orange-600">{t('dialogTitle')}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {guideImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer rounded-lg overflow-hidden bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md aspect-[3/4] hover:shadow-lg transition-shadow duration-300"
                    onClick={() => setSelectedImage(image.id)}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={t('imageTitle', { id: image.id })} // PHASE 1 i18n fix
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-sm font-medium">{t('imageTitle', { id: image.id })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Preview grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mt-8">
            {guideImages.slice(0, 12).map((image) => (
              <div
                key={image.id}
                className="relative group cursor-pointer rounded-lg overflow-hidden bg-white/80 backdrop-blur-md ring-1 ring-white/40 border-none shadow-md aspect-[3/4] hover:shadow-lg transition-shadow duration-300"
                onClick={() => setSelectedImage(image.id)}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={t('imageTitle', { id: image.id })}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-blue-900 leading-relaxed">
              {isRtl ? (
                <span dir="rtl" style={{ unicodeBidi: 'plaintext' as const }}>{`${t('previewNote', { countPreview: 12, total: 22 })}\u200F`}</span>
              ) : (
                t('previewNote', { countPreview: 12, total: 22 })
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-transparent border-none">
          <DialogHeader>
            <DialogTitle className="sr-only">{getCurrentImage() ? t('srTitle', { id: getCurrentImage()!.id }) : ''}</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-50 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            {getCurrentImage() && (
              <div className="p-4">
                <img
                  src={getCurrentImage()?.src}
                  alt={t('imageTitle', { id: getCurrentImage()!.id })}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-slate-800">{t('imageTitle', { id: getCurrentImage()!.id })}</h3>
                  <p className="text-blue-900">{t('imageDescription', { id: getCurrentImage()!.id })}</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
