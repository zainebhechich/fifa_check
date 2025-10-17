"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { useTranslations } from "next-intl"

export default function AnimatedTestimonialsDemo() {
  const t = useTranslations('Testimonials');

  const testimonials = [
    {
      quote: t('testimonial1.quote'),
      name: t('testimonial1.name'),
      designation: t('testimonial1.designation'),
      src: "#22c55e, #059669, #047857",
    },
    {
      quote: t('testimonial2.quote'),
      name: t('testimonial2.name'),
      designation: t('testimonial2.designation'),
      src: "#f97316, #ea580c, #dc2626",
    },
    {
      quote: t('testimonial3.quote'),
      name: t('testimonial3.name'),
      designation: t('testimonial3.designation'),
      src: "#3b82f6, #2563eb, #1d4ed8",
    },
    {
      quote: t('testimonial4.quote'),
      name: t('testimonial4.name'),
      designation: t('testimonial4.designation'),
      src: "#8b5cf6, #7c3aed, #6d28d9",
    },
    {
      quote: t('testimonial5.quote'),
      name: t('testimonial5.name'),
      designation: t('testimonial5.designation'),
      src: "#06b6d4, #0891b2, #0e7490",
    },
  ]

  return <AnimatedTestimonials testimonials={testimonials} />
}
