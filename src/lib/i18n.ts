import type { Language } from "@/lib/useLanguage";
import type { Localized } from "@/types";

// The one place a Localized field gets resolved to a plain string —
// every consumer calls t(field, language) instead of reaching into
// .en/.bn directly, so a future fallback rule (e.g. bn -> en if a
// translation is ever missing) only needs to change here.
export function t(field: Localized, language: Language): string {
  return field[language];
}

const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// Every visible digit on the page — stat counters, durations, section
// index watermarks — goes through this in Bengali mode rather than
// staying Arabic-numeral, same as every other piece of UI copy.
export function localizeNumber(value: string | number, language: Language): string {
  const str = String(value);
  return language === "bn" ? str.replace(/[0-9]/g, (d) => BENGALI_DIGITS[Number(d)]) : str;
}
