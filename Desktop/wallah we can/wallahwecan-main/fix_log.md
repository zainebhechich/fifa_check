# Fix Log

Date: 2025-10-14

Summary:
- Fixed malformed JSON structure in `messages/ar.json` (was causing parse errors at top of file).
- Extracted misplaced About content and reconstructed proper `About` and `Adherer.Page` sections in Arabic.
- Added missing Arabic keys to achieve parity with French canonical:
  - `Common.General.*` (title, description, errors.google, errors.generic, buttons.googleLoading, fields.password.placeholder)
  - Full `Achievements.*` block
- Verified locale parity using `messages/compare-locales.js`.
- Ran lint and production build: both passed.

Files changed:
- `messages/ar.json` — rebuilt top-level structure; added `About`, `Adherer.Page` fixes; added `Achievements` and `Common.General` keys.
- (Executed) `messages/compare-locales.js` — audit showed 0 missing keys for en/ar vs fr after fixes.

Validation:
- Lint: PASS (no warnings or errors)
- Build: PASS (Next.js 15.5.4 compiled successfully)

Notes / TODO:
- Optional: Convert `messages/compare-locales.js` to ESM if desired by linter, though current usage is fine.
- Continue routine i18n audits after future content changes.
## Batch Fix Log - 2025-10-04

### Pages/Components Fixed
- HomeClient.tsx (hero video responsiveness, hero text block vertical spacing, Arabic punctuation)
- events/media/page.tsx (RTL, hero vertical spacing, Arabic punctuation, scroll fixes)
- product-detail.tsx (next/image fill error, responsive image)
- ecolibree-hero.tsx (added RTL dir handling, Arabic line-height tweak)
- kid-chen-hero.tsx (added RTL dir handling, Arabic line-height tweak)
- modern-hero-section.tsx (added RTL dir handling, Arabic line-height tweak)
- shop-hero.tsx (removed negative margin, added top padding for navbar offset)
- [locale]/layout.tsx & [locale]/page.tsx (fixed params typing: removed unnecessary Promise wrapping)
- green-school-pillars.tsx (removed hard-coded French rawPillars, added dir for RTL)
- green-school-team-section.tsx (moved member role/description to translation keys, added dir for RTL)
- ecolibree-team.tsx (moved member role/description to translation keys, added dir for RTL)
- [locale]/layout.tsx & page.tsx re-fixed (await params, added html wrapper & dir) + not-found fallback & translation keys added (Common.NotFound in fr/en/ar)
- events/media/page.tsx (Arabic hero word order corrected, publications.cta object key usage adjusted to string, alt fallback improved)
- hydration mismatch: removed duplicate <html>/<body> from app/[locale]/layout.tsx (now only provider) to align with root layout
- added structured Auth.Login translation block in fr.json; removed legacy flat keys to eliminate MISSING_MESSAGE errors; parity already existed in en/ar
- restored updated Hero text (investment wording + new words array) in fr.json
- added safe guards in events/media page for missing translation arrays (Array.isArray checks) and fallback extraction
- replaced global-error reset() call with window.location.reload() to prevent runtime TypeError

### Translation Keys Updated
- Verified all keys present in en.json, fr.json, ar.json (no missing keys)

### RTL/Layout Adjustments
- Applied dir="rtl" for Arabic pages/sections
- Used Arabic dot (۔) for punctuation in hero and media pages
- Ensured hero video and overlays are fully responsive
- Moved hero text block down for vertical balance

### Errors Resolved
- Fixed next/image fill/width error in product-detail.tsx
- Restored scrollLeft/scrollRight/handleWheel in media page

---

## 2025-10-16

- chore(ci): Add GitHub Actions workflow `.github/workflows/ci.yml`
  - Runs locale parity check (messages/compare-locales.js)
  - Runs ESLint
  - Conditionally runs `npm run build` when Supabase env secrets are configured
- Validation:
  - Lint: PASS (No ESLint warnings or errors)
  - Build: PASS locally (Next.js 15.5.4); only deprecation warnings from transitive dependencies
  - i18n parity: PASS (fr/en/ar counts equal; 0 missing/extra/type mismatches)

Next steps
- Optional: Replace page-level hardcoded `bg-white` with `bg-background` where appropriate to respect the new off-white theme (non-functional, style-only change).
- Consider adding a job matrix for Node LTS versions and caching for faster CI.

