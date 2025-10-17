// i18n.ts
import { getRequestConfig } from "next-intl/server";

// PHASE 1 i18n fix: default to 'fr' and fallback to 'fr' to match project requirement
export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale || "fr"; // ensure it's never undefined and defaults to FR

  try {
    return {
      locale: safeLocale, // ✅ required
      messages: (await import(`./messages/${safeLocale}.json`)).default
    };
  } catch (error) {
    console.error("❌ Missing locale file for:", safeLocale, error);
    return {
      locale: "fr", // ✅ fallback to FR per requirements
      messages: (await import("./messages/fr.json")).default
    };
  }
});