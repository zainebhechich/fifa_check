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