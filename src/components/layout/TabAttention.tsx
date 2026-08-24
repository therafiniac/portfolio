"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Swaps the browser tab title while this tab is hidden, back to whatever
// it actually was the moment it's visible again — a small nudge for
// anyone who tabbed away mid-read. Browser chrome only, never rendered
// on the page itself, so it doesn't compete with any on-page copy.
export function TabAttention() {
  const language = useLanguage();

  useEffect(() => {
    const originalTitle = document.title;
    const awayTitle = t(strings.tabAttention.comeBack, language);

    function handleVisibilityChange() {
      document.title = document.hidden ? awayTitle : originalTitle;
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle;
    };
  }, [language]);

  return null;
}
