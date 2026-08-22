import type { Language } from "@/lib/useLanguage";
import type { Localized } from "@/types";

// The one place a Localized field gets resolved to a plain string —
// every consumer calls t(field, language) instead of reaching into
// .en/.bn directly, so a future fallback rule (e.g. bn -> en if a
// translation is ever missing) only needs to change here.
export function t(field: Localized, language: Language): string {
  return field[language];
}
