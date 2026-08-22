"use client";

import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

export function LanguageToggle() {
  const language = useLanguage();

  function toggle() {
    const next = language === "en" ? "bn" : "en";
    document.documentElement.setAttribute("data-lang", next);
    document.documentElement.setAttribute("lang", next);
    localStorage.setItem("language", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        language === "en" ? t(strings.nav.switchToBengali, "en") : t(strings.nav.switchToBengali, "bn")
      }
      className="flex h-9 shrink-0 items-center justify-center rounded-full px-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted transition-colors hover:text-accent"
    >
      {language === "en" ? "বাং" : "EN"}
    </button>
  );
}
