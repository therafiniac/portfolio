"use client";

import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Invisible until it's actually useful — a keyboard/screen-reader user
// hitting Tab on any page here currently has to pass through the entire
// navbar (search, language, theme, menu) before reaching real content,
// on every single page load. sr-only by default, a real visible focused
// pill once Tab actually lands on it — first focusable element in the
// document, ahead of Navbar, so it's the very first Tab stop.
export function SkipToContent() {
  const language = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-medium focus:text-bg"
    >
      {t(strings.skipToContent, language)}
    </a>
  );
}
