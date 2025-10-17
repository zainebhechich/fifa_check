"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { Button } from '../../../../components/ui/button';
import { cn } from '../../../../lib/utils';

function CancelContent() {
  const t = useTranslations('Checkout'); // PHASE 1 i18n fix
  const locale = useLocale(); // PHASE 1 i18n fix
  const isRtl = locale?.startsWith('ar');
  const cancelTitle = t('cancel.title');
  const cancelDescription = t('cancel.description');
  const cancelNotice = t('cancel.notice');
  const retryPaymentLabel = t('cancel.retry');
  const continueShoppingLabel = t('cancel.continueShopping');

  const withLocale = (path: string) => `/${locale}/${path.replace(/^\/+/g, '')}`;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={cn(
        'min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100',
        isRtl && 'text-right'
      )}
    >
      <div className="max-w-md w-full mx-4">
        <div className={cn('bg-white rounded-lg shadow-lg p-8 text-center', isRtl && 'text-right')}
        >
          <div className="mb-6">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {cancelTitle}
            </h1>
            <p className="text-gray-600">
              {cancelDescription}
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <p className={cn('text-sm text-red-800', isRtl && 'text-right')}>
              {cancelNotice}
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href={withLocale('/cart')}>
                {retryPaymentLabel}
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

export default function CheckoutCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <CancelContent />
    </Suspense>
  );
}
