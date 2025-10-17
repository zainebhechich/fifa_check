"use client";

import { useState } from 'react'
import { Button } from './ui/button' // PHASE 1 i18n fix: normalize import
import { Input } from './ui/input' // PHASE 1 i18n fix: normalize import
import { Label } from './ui/label' // PHASE 1 i18n fix: normalize import
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select' // PHASE 1 i18n fix: normalize import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card' // PHASE 1 i18n fix: normalize import
import { Alert, AlertDescription } from './ui/alert' // PHASE 1 i18n fix: normalize import
import { signUp } from '../app/actions/auth' // PHASE 1 i18n fix: normalize import
import { useTranslations } from 'next-intl' // PHASE 1 i18n fix

export function UserRegistrationForm() {
  const t = useTranslations('Auth.Register') // PHASE 1 i18n fix
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    dateOfBirth: '',
    gender: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (formData.password !== formData.confirmPassword) {
      setError(t('errors.passwordsMismatch'))
      setLoading(false)
      return
    }

    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'confirmPassword') {
        form.append(key, value)
      }
    })

    try {
      const result = await signUp(form)
      if (result.error) {
        setError(result.error)
      } else {
  setSuccess(result.message || t('success.accountCreated'))
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          phoneNumber: '',
          address: '',
          city: '',
          postalCode: '',
          country: 'France',
          dateOfBirth: '',
          gender: ''
        })
      }
    } catch {
      setError(t('errors.generic'))
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>
          {t('subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('sections.basic')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">{t('fields.email')} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="fullName">{t('fields.fullName')} *</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">{t('fields.password')} *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">{t('fields.confirmPassword')} *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('sections.contact')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phoneNumber">{t('fields.phone')}</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  disabled={loading}
                  placeholder={t('placeholders.phone')}
                />
              </div>
              <div>
                <Label htmlFor="country">{t('fields.country')}</Label>
                <Select value={formData.country} onValueChange={(value) => handleChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="France">{t('countries.france')}</SelectItem>
                    <SelectItem value="Belgium">{t('countries.belgium')}</SelectItem>
                    <SelectItem value="Switzerland">{t('countries.switzerland')}</SelectItem>
                    <SelectItem value="Canada">{t('countries.canada')}</SelectItem>
                    <SelectItem value="Other">{t('countries.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">{t('fields.address')}</Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                disabled={loading}
                placeholder={t('placeholders.address')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">{t('fields.city')}</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  disabled={loading}
                  placeholder={t('placeholders.city')}
                />
              </div>
              <div>
                <Label htmlFor="postalCode">{t('fields.postalCode')}</Label>
                <Input
                  id="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  disabled={loading}
                  placeholder={t('placeholders.postalCode')}
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('sections.personal')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">{t('fields.dob')}</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="gender">{t('fields.gender')}</Label>
                <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('placeholders.gender')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t('genders.male')}</SelectItem>
                    <SelectItem value="female">{t('genders.female')}</SelectItem>
                    <SelectItem value="other">{t('genders.other')}</SelectItem>
                    <SelectItem value="prefer_not_to_say">{t('genders.preferNot')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('creating') : t('submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
