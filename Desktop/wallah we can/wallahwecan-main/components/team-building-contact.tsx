"use client"

import { useState } from "react"
// PHASE 1 i18n fix: normalize alias imports to relative paths & add i18n
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { Building, Target, MessageSquare, Send, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"
import { notifyTeamBuilding } from "../app/actions/notify"
import { cn } from "../lib/utils"

export function TeamBuildingContact() {
  const t = useTranslations("TeamBuilding.Contact") // PHASE 1 i18n fix
  const locale = useLocale()
  const isRtl = typeof locale === 'string' && locale.startsWith('ar')
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    teamSize: '',
    preferredDates: '',
    serviceInterests: [] as string[],
    budget: '',
    message: '',
    newsletter: false,
    terms: false
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const serviceOptions = [
    { id: 'solidarity', label: t('services.solidarity') },
    { id: 'environmental', label: t('services.environmental') },
    { id: 'creative', label: t('services.creative') },
    { id: 'leadership', label: t('services.leadership') },
    { id: 'hackathon', label: t('services.hackathon') },
    { id: 'humanitarian', label: t('services.humanitarian') }
  ]

  const budgetRanges = [
    { value: '1000-5000', label: t('budget.r1') },
    { value: '5000-10000', label: t('budget.r2') },
    { value: '10000-20000', label: t('budget.r3') },
    { value: '20000+', label: t('budget.r4') },
    { value: 'custom', label: t('budget.custom') }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleServiceInterestChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      serviceInterests: checked
        ? [...prev.serviceInterests, serviceId]
        : prev.serviceInterests.filter(id => id !== serviceId)
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await notifyTeamBuilding(formData)
      setIsSubmitted(true)
      ;(e.currentTarget as HTMLFormElement).reset()
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="team-building-contact" className="py-16 lg:py-24" dir={isRtl ? "rtl" : "ltr"}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={cn("text-center", isRtl && "text-right")}
          >
            <div className="w-16 h-16 bg-white/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle size={32} className="text-[rgb(20,35,70)]" />
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-4">
              {isRtl ? (<span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('success.title')}{'\u200F'}</span>) : t('success.title')}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {isRtl ? (<span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('success.description')}{'\u200F'}</span>) : t('success.description')}
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-white/10 backdrop-blur-sm"
            >
              {t('success.cta')}
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="team-building-contact" className="py-16 lg:py-24" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn("text-center mb-8")}
        >
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600 mb-3 text-center">
              {isRtl ? (<span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('title')}{'\u200F'}</span>) : t('title')}
            </h2>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          </div>
          <p className={cn("text-lg text-white/90 max-w-3xl mx-auto px-4 text-center") }>
            {isRtl ? (<span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('subtitle')}{'\u200F'}</span>) : t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Company Information */}
            <div className="space-y-4">
              <div className={cn("flex items-center gap-3", isRtl && "flex-row-reverse") }>
                <div className="w-8 h-8 bg-gradient-to-br from-[rgb(20,35,70)] to-[rgb(20,35,70)]/80 rounded-lg flex items-center justify-center">
                  <Building size={16} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600">
                  {t('sections.companyInfo')}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName" className="text-gray-900">{t('fields.companyName')} *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder={t('placeholders.companyName')}
                    required
                    className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[rgb(20,35,70)] focus-visible:outline-none"
                  />
                </div>

                <div>
                  <Label htmlFor="contactPerson" className="text-gray-900">{t('fields.contactPerson')} *</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder={t('placeholders.contactPerson')}
                    required
                    className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[rgb(20,35,70)] focus-visible:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-gray-900">{t('fields.email')} *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('placeholders.email')}
                    required
                    className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[rgb(20,35,70)] focus-visible:outline-none"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-900">{t('fields.phone')} *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('placeholders.phone')}
                    required
                    className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[rgb(20,35,70)] focus-visible:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <div className={cn("flex items-center gap-3", isRtl && "flex-row-reverse") }>
                <div className="w-8 h-8 bg-gradient-to-br from-[rgb(20,35,70)] to-[rgb(20,35,70)]/80 rounded-lg flex items-center justify-center">
                  <Target size={16} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600">
                  {t('sections.projectDetails')}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teamSize" className="text-gray-900">{t('fields.teamSize')} *</Label>
                  <Input
                    id="teamSize"
                    name="teamSize"
                    type="number"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    placeholder={t('placeholders.teamSize')}
                    required
                    min="1"
                    className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[rgb(20,35,70)] focus-visible:outline-none"
                  />
                </div>

                <div>
                  <Label htmlFor="preferredDates" className="text-gray-900">{t('fields.preferredDates')}</Label>
                  <Input
                    id="preferredDates"
                    name="preferredDates"
                    value={formData.preferredDates}
                    onChange={handleInputChange}
                    placeholder={t('placeholders.preferredDates')}
                    className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[rgb(20,35,70)] focus-visible:outline-none"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">
                  {t('fields.serviceInterests')} *
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <div key={service.id} className={cn("flex items-center gap-2", isRtl && "flex-row-reverse") }>
                      <Checkbox
                        id={service.id}
                        checked={formData.serviceInterests.includes(service.id)}
                        onCheckedChange={(checked) => handleServiceInterestChange(service.id, checked as boolean)}
                        className="border-gray-300 data-[state=checked]:bg-[rgb(20,35,70)] data-[state=checked]:border-[rgb(20,35,70)]"
                      />
                      <Label htmlFor={service.id} className="text-sm text-gray-900">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">
                  {t('fields.budget')}
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {budgetRanges.map((range) => (
                    <label key={range.value} className={cn("flex items-center gap-3 cursor-pointer", isRtl && "flex-row-reverse") }>
                      <input
                        type="radio"
                        name="budget"
                        value={range.value}
                        checked={formData.budget === range.value}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[rgb(20,35,70)] border-gray-300 focus:ring-[rgb(20,35,70)]"
                      />
                      <span className="text-sm text-gray-900">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4">
              <div className={cn("flex items-center gap-3", isRtl && "flex-row-reverse") }>
                <div className="w-8 h-8 bg-gradient-to-br from-[rgb(20,35,70)] to-[rgb(20,35,70)]/80 rounded-lg flex items-center justify-center">
                  <MessageSquare size={16} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-[rgb(20,35,70)] to-orange-600">
                  {t('sections.message')}
                </h3>
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-900">
                  {t('fields.message')} *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('placeholders.message')}
                  required
                  className="bg-white/70 border-white/40 focus-visible:ring-2 focus-visible:ring-[rgb(20,35,70)] focus-visible:outline-none"
                />
                <p className="text-xs text-gray-600 mt-2">
                  {t('hints.minChars', { count: 20 })} ({formData.message.length}/20)
                </p>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className={cn("flex items-center gap-2", isRtl && "flex-row-reverse") }>
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => setFormData(prev => ({...prev, newsletter: checked as boolean}))}
                  className="border-gray-300 data-[state=checked]:bg-[rgb(20,35,70)] data-[state=checked]:border-[rgb(20,35,70)]"
                />
                <Label htmlFor="newsletter" className="text-sm text-gray-900">
                  {t('consents.newsletter')}
                </Label>
              </div>

              <div className={cn("flex items-center gap-2", isRtl && "flex-row-reverse") }>
                <Checkbox
                  id="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) => setFormData(prev => ({...prev, terms: checked as boolean}))}
                  className="border-gray-300 data-[state=checked]:bg-[rgb(20,35,70)] data-[state=checked]:border-[rgb(20,35,70)]"
                />
                <Label htmlFor="terms" className="text-sm text-gray-900">
                  {t('consents.terms')} *
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-[rgb(20,35,70)] hover:bg-[rgb(20,35,70)]/90 text-white py-3 text-lg font-medium shadow-lg"
              >
                <Send className={cn("w-5 h-5", isRtl ? "ml-2" : "mr-2") } />
                {isSubmitting ? t('actions.submitting') : t('actions.submit')}
              </Button>

              <p className={cn("text-center text-sm text-gray-700 mt-3", isRtl && "text-right") }>
                {isRtl ? (<span dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{t('hints.responseTime')}{'\u200F'}</span>) : t('hints.responseTime')}
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
