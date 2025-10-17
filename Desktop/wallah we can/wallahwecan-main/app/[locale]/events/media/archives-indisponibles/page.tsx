import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'Media.ArchivesUnavailable' });
	return {
		title: t('title'),
		description: t('description'),
	};
}

export default async function ArchivesIndisponiblesPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params; // align with async params contract used elsewhere
	const t = await getTranslations({ locale, namespace: 'Media.ArchivesUnavailable' });

	// Basic sanity: if key missing we trigger 404 to surface i18n parity issues during QA
	try {
		const title = t('title');
		return (
			<main className="mx-auto max-w-3xl px-4 py-16 text-center">
				<h1 className="text-3xl font-bold mb-4">{title}</h1>
				<p className="text-muted-foreground mb-6">{t('intro')}</p>
				<div className="rounded-lg border p-6 bg-muted/30">
					<p className="mb-2 font-medium">{t('status')}</p>
					<p className="text-sm text-muted-foreground">{t('explanation')}</p>
				</div>
			</main>
		);
			} catch {
		notFound();
	}
}

