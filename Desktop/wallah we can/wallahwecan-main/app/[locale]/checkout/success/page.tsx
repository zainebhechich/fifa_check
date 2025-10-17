"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { Button } from '../../../../components/ui/button';
import { cn } from '../../../../lib/utils';

function SuccessContent() {
  const t = useTranslations('Checkout'); // PHASE 1 i18n fix
  const locale = useLocale(); // PHASE 1 i18n fix
  const isRtl = locale?.startsWith('ar');
  const successTitle = t('success.title');
  const successDescription = t('success.description');
  const successNotice = t('success.notice');
  const viewOrdersLabel = t('success.viewOrders');
  const continueShoppingLabel = t('success.continueShopping');

  const withLocale = (path: string) => `/${locale}/${path.replace(/^\/+/g, '')}`;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={cn(
        'min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100',
        isRtl && 'text-right'
      )}
    >
      <div className="max-w-md w-full mx-4">
        <div className={cn('bg-white rounded-lg shadow-lg p-8 text-center', isRtl && 'text-right')}
        >
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {successTitle}
            </h1>
            <p className="text-gray-600">
              {successDescription}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className={cn('text-sm text-green-800', isRtl && 'text-right')}>
              {successNotice}
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href={withLocale('/dashboard')}>
                {viewOrdersLabel}
              </Link>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href={withLocale('/shop')}>
                {continueShoppingLabel}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
