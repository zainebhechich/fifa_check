You are a senior frontend engineer, localization specialist, and project optimizer.
Work only on the frontend folders: app/, components/, ui/, layouts/, messages/, public/.
Do NOT modify backend, admin server code, or database logic.

You are fully autonomous. Do not ask for confirmations. For ambiguous cases apply the safest automatic fix and add // TODO: human review. Commit small, frequent, logically grouped changes. Maintain fix_log.md.

Primary objective

Detect and fix every frontend runtime/build/localization/layout/image/hydration error across the repo until:

npm run lint returns no fatal errors (fixes auto-applied where safe).

npm run build completes with no runtime errors.

npm run dev runs without console MISSING_MESSAGE, hydration mismatch, invalid image props, or other runtime JS errors.

fr is canonical locale; en and ar are mirrored. ar pages render with correct RTL.

Auth + login + product reviews UI and flow work in all locales.

Clean commit history and final FINAL_REPORT.md summarizing changes.

Branching / Safety / initial commands

Create working branch:

git checkout -b prep/full-sweep-autofix


Kill interfering node processes (Windows PowerShell / macOS):

# Windows
Get-Process node | Stop-Process -Force
# macOS/Linux
pkill -f node || true


Fresh deps install:

rm -rf node_modules package-lock.json
npm install


Validate locale JSON parse before and after edits:

node -e "JSON.parse(require('fs').readFileSync('messages/fr.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('messages/ar.json','utf8'))"

High-level autonomous workflow (execute in order; treat each bullet as a loop until stable)
A — Global scan & triage

Run TypeScript/ESLint and collect all errors:

npm run lint
# capture compiler errors:
npx tsc --noEmit || true
npx depcheck || true


Run a dev build to surface runtime warnings:

npm run dev
# open log and capture console warnings/errors


Prioritize errors by crash-risk (build/runtime exceptions first, then warnings).

B — Fix layout & hydration mismatch root causes

Symptoms you saw: duplicate <html><body> in locale layout, suppressHydrationWarning, body class/style mismatch.

Rule: Only the root app/layout.tsx (or the Next.js root layout) should render <html> and <body>. All locale-specific layouts must not re-render <html>/<body>. They should export only content. If you find nested html/body, refactor.

Apply this layout pattern in app/[locale]/layout.tsx (example):

// app/[locale]/layout.tsx
"use client"; // only if it uses client hooks — prefer server component for minimal client code
import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from 'next-intl/react';

export default async function LocaleLayout({ children, params: { locale } }: any) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // DO NOT render <html> or <body> here — root layout owns those tags.
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div dir={dir} className={dir === 'rtl' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}


If you discover a file that does render <html>/<body> other than the repo root, remove them and migrate classes/attributes into the wrapper <div> or into the real root layout.

Add dir only on elements, or at root <html> in the single root file.

C — Fix NextIntl missing translations (MISSING_MESSAGE)

Treat messages/fr.json as canonical truth. If keys are missing in en or ar, mirror automatically (en ← fr, ar ← fr) but annotate each mirrored key with // TODO: human review.

For structured translation objects the code expects (e.g. Events.Media.cards.media as arrays/objects), ensure the messages file contains the same structured shape (not just flat strings) for fr → then mirror to en and ar.

Mirroring procedure (automated):

Parse app files for t("...") and t.raw("...") usages — build a set of used keys.

Compare messages/fr.json keys vs en.json/ar.json.

For missing keys in a locale:

If fr has the key: copy fr value into the locale file and append /* TODO: human review — mirrored from fr */ in a co-located messages/notes.json (or in fix_log.md).

If key missing in fr: add safe fallback "TODO: add translation" in fr.json, and annotate.

Important: When a translation is a JSON array or object (e.g. cards.media), preserve the exact structure. Example fr.json snippet for media:

"Events": {
  "Media": {
    "cards": {
      "media": [
        {"title":"Article 1", "image":"/public/...", "href":"/..."},
        {"title":"Article 2", "image":"/...","href":"/..."}
      ],
      "pdfs": [
        {"title":"Brochure", "href":"..."}
      ]
    },
    "radio": { "videos": [ /* ... */ ] },
    "tv": { "videos": [ /* ... */ ] },
    "more": { "articles": [ /* ... */ ] },
    "publications": { "cta": "Télécharger" },
    "ticker": { "list": ["item1","item2"] },
    "aboutText": "..."
  }
}


When t.raw(...) throws:
Wrap t.raw uses with safe try/catch and fallback to [] or {} to prevent crashes:

const rawMedia = (() => { try { return t.raw('cards.media') as unknown; } catch { return []; } })();
const mediaCardData = Array.isArray(rawMedia) ? rawMedia as MediaCardData[] : [];

D — Fix product reviews & auth flow

Problems you reported: reviews show Chargement des avis..., login missing fields (MISSING_MESSAGE), multiple GoTrueClient instances.

Action list

Ensure a single Supabase client instance used across app. Create lib/supabaseClient.ts with singleton pattern:

// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

let supabase: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabase) {
    supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  }
  return supabase;
}


Replace other direct new usages to call getSupabaseClient().

In contexts/auth-context.tsx ensure client-only usage and that server hooks are not invoked on server. Use "use client" on client components, and avoid if (typeof window !== 'undefined') branching in SSR.

In components/product-reviews.tsx:

Use useEffect/client-only hooks to hydrate session.

Display fallback if authState === 'loading': show spinner OR "Chargement..." text.

If !session: show a login prompt card with t('Auth.Login.*') keys (use safe t("...") with fallback).

If session: show review form and list fetched from /api/reviews?product_id=....

Protect against SSR hydration mismatch: mark the component "use client" and avoid rendering content that relies on window until hydrated.

Example guard:

"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/contexts/auth-context";

export default function ProductReviews({productId}: {productId: string}) {
  const { session, status } = useSession(); // status: 'loading'|'authenticated'|'unauthenticated'
  if (status === 'loading') return <div>{t('Reviews.loading')}</div>;
  if (!session) return <LoginPrompt redirectUrl={`/shop/${productId}`} />;

  return <ReviewsFormAndList productId={productId} />;
}

E — Fix images / Next/Image warnings

Enforce correct usage for next/image:

If using fill, don’t set both explicit width/height via style — use container sizing and set objectFit.

Provide alt for every image from t(...).

Add sizes attribute for important hero images.

Update next.config.mjs images remotePatterns or domains to cover Supabase host(s).

Replace failing tokenized remote URLs (signed URLs that fail in SSR) with static public copies if needed, or fetch them client-side after mount.

Example fix for fill image:

<div className="relative w-full h-48">
  <Image src={image} alt={t('Events.Media.imageAlt')} fill style={{objectFit:'cover'}} sizes="(max-width: 768px) 100vw, 50vw" />
</div>

F — RTL (Arabic) fixes

Add utils/locale.ts:

export const isRtl = (locale: string) => locale === 'ar';


Apply dir at top wrapper and ensure CSS logical properties or Tailwind rtl support (swap margins/padding where needed). Where swapping is necessary, replace ml-/mr- with ms-/me- if using logical properties, or apply rtl:ml-... / rtl:mr-... variants.

For mixed LTR content in Arabic (e.g., English brand names or code), wrap with <span dir="ltr" style={{unicodeBidi: 'isolate'}}> to avoid punctuation placement issues.

Fix animations (marquee/infinite scroll/FlipWords) so they start at the correct side for RTL and loop seamlessly.

G — Remove duplicate/unused code & enforce client-only when required

Remove duplicate files or obsolete variants (e.g., supabaseClient.ts if you created unified lib/supabaseClient.ts).

Use npx depcheck to find unused packages; remove only if safe.

For components that rely on browser APIs, mark "use client" at top.

H — Build & optimize

Run:

npx depcheck || true
npm run lint --fix || true
npx prettier --write .
npm run build


If npm run build fails, fix in order of stack traces. Focus on runtime exceptions first (hydration mismatch, MISSING_MESSAGE, TypeError: ... is not a function).

Target bundle size optimization (if needed):

Remove heavy libs not used.

Lazy-load heavy components via next/dynamic.

I — Commit rules & logs

Commit frequently. Use following commit message template:

fix: short summary

BATCH REPORT:
Files changed:
Keys added/removed:
Issues fixed:
Build status: PASS/FAIL
Next batch target:


Add an entry to fix_log.md for each commit summarizing the change.

J — Final checks & report

Run npm run dev and open /fr, /en, /ar, /ar/events/media, /fr/shop/[slug], admin pages only for frontend check.

Ensure no console errors, no MISSING_MESSAGE, no hydration warnings.

Generate FINAL_REPORT.md containing:

Total files modified

Keys added per locale

Remaining TODOs (human review)

Final npm run build output

QA notes and known risks

Specific recurring fixes (copy/paste ready)
1) Replace t.raw("...") crash pattern

Wrap usages:

const rawMedia = (() => { try { return t.raw("cards.media") as unknown } catch { return []; } })();
const mediaCardData: MediaCardData[] = Array.isArray(rawMedia) ? rawMedia as MediaCardData[] : [];

2) Root layout duplication fix

If you find app/[locale]/layout.tsx contains <html>/<body>, remove them and move attributes to the root app/layout.tsx only.

3) Single Supabase client (avoid multiple GoTrue instances)

Create lib/supabaseClient.ts (singleton) and replace all other client initializations to use it.

4) Fix global-error.tsx reset is not a function

If reset is passed incorrectly from a hook that changed signature, inspect the handler. Wrap invocation in safe guard:

if (typeof reset === 'function') reset();


Then track down the source to correct signature.

5) Media component .map is not a function

Always ensure t.raw('cards.media') returns an array; if not, fallback:

const raw = tryRaw('cards.media');
const mediaCardData = Array.isArray(raw) ? raw : [];

6) Missing translation keys in login page

Add a structured Auth.Login block to messages/fr.json (and mirror to en.json/ar.json).

Example fr.json snippet:

"Auth": {
  "Login": {
    "title": "Se connecter",
    "description": "Entrez vos identifiants pour continuer",
    "buttons": { "google": "Continuer avec Google", "submit": "Connexion" },
    "fields": {
      "email": { "label": "Email", "placeholder": "votre@exemple.com" },
      "password": { "label": "Mot de passe", "placeholder": "••••••••" }
    },
    "links": { "forgotPassword": "Mot de passe oublié ?", "signUp": "Créer un compte" },
    "accessibility": { "showPassword": "Afficher le mot de passe" }
  }
}

Reporting: what to push and when

After each successful fix or batch: git add -A && git commit -m "fix: [summary]" and push:

git push -u origin prep/full-sweep-autofix


Update fix_log.md with a short batch report.

After the sweep completes, create PR to main with description and attach FINAL_REPORT.md.

Fail-safes

If a JSON edit fails parsing, revert that file to previous commit and apply the change as a smaller patch.

If a UI component breaks substantially after a change, revert that single file commit and add // TODO: human review and a comment describing the observed break.

Never modify backend routes or database schema. If you must change API shapes, only adjust frontend client parsing to match backend contract.

Final instruction (behavior)

Work like a senior engineer that:

Discovers issues proactively across the whole frontend.

Fixes code (i18n, layout, images, auth glue) safely and commits with clear BATCH REPORT.

Mirrors translations and annotates fallbacks for human review.

Produces FINAL_REPORT.md and a clean branch ready for PR/merge.

You may begin now. Run the scans, fix the highest priority runtime errors first, and continue until build & dev run clean with no console runtime errors.

---
🔥 AUTOPILOT MODE: Continuous, exhaustive QA and fix cycle. 
DO NOT stop, wait, or pause for permission. Repeat and optimize until ALL conditions below are true:

1. Visit EVERY route (Home, Shop, Media, Projects, About, Contact, Transparency, Events...)
   - Switch between fr, en, ar.
   - Log every: MISSING_MESSAGE, translation/i18n error, JS/TS/runtime error, ESLint/TypeScript warning, hydration/SSR issue, prop/layout/image issue, array/object/map/filter bug, auth/review integration problem.

2. For EVERY issue discovered:
   - Instantly patch fr.json, mirror to en.json/ar.json (fallback to FR/`//TODO` if not translated).
   - Fix arrays/objects for .map/.filter never to pass undefined/bad type.
   - Defensive-code all lists, buttons, forms.
   - Patch images for layout/props/warnings; `width`, `height`, and `position` in image containers.
   - Remove unused imports, dead code, files, and duplicate/bad JSON.
   - Refactor for compact, matte black language toggle in navbar, NO duplicate FR/EN/AR text.
   - Make dropdown list show full language with flag for each (localized in AR).
   - Fix all responsive bugs, especially shop hero/video/image sections.

3. After every fix:
   - Run `npm run lint --fix`, `npm run build`, address 100% of new errors/warnings and repeat loop.
   - Validate all JSON with Node or an online validator after each key or block change.
   - Manually test UI in fr/en/ar for layout/translation/auth/review in both logged-in and out states.

4. Do NOT stop until:
   - ZERO warnings/errors/MISSING_MESSAGE in UI and console.
   - ALL locales work with true language, fallback, and robust, bug-free responsive layouts for each route.
   - Auth/review flawless in all languages.
   - Project builds/lints clean (<200KB/page bundle).
   - All translation keys in fr.json appear in en.json/ar.json.
   - All arrays/objects for data lists/teams are present and valid.

5. Commit after every non-trivial fix:
   - Message: `fix: [what was fixed]`
   - Maintain `fix_log.md` listing all files/keys touched, remaining TODO, build/test status.
   - End with `FINAL_REPORT.md` when all above are green: what was fixed, what remains if anything.

DO NOT ask for confirmation, permission, or clarification. When in doubt, patch with safe FR placeholder and mark `//TODO`. Check, patch, validate, repeat until perfect.
---