"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappHref } from "@/lib/data/contact";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Appears once there's actually somewhere to go back to — roughly one
// viewport of scroll, not the moment the page loads (a button that's
// always there for a page you just opened is noise, not a shortcut).
const SHOW_AFTER_PX = 480;

// Stacked above WhatsAppButton (bottom-6) with a clean gap rather than
// both sitting at bottom-6 and overlapping once scroll reveals this one.

// glass-fab (globals.css) mirrors nav-glass's border/blur/shadow recipe
// but with `position: fixed` baked into its own rule — nav-glass's own
// plain-CSS `position: relative` silently wins over a Tailwind `fixed`
// utility regardless of class order (confirmed the hard way: without
// glass-fab this button just scrolled away with the page instead of
// staying pinned). Routes through Lenis's own scrollTo (falling
// back to the native smooth-scroll when Lenis hasn't mounted — reduced
// motion, mainly) rather than window.scrollTo unconditionally, so this
// doesn't fight Lenis for control of the scroll the way a raw native
// call would.
export function BackToTopButton() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();
  const language = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > SHOW_AFTER_PX);
  });

  function handleClick() {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          aria-label={t(strings.footer.backToTop, language)}
          className="glass-fab bottom-20 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full text-text-muted transition-colors hover:text-accent"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Always present, not scroll-gated like BackToTopButton above — this is
// a contact channel, not a scroll shortcut, so it should read the same
// way a business's WhatsApp widget does: there from the moment you land.
// Same glass-fab shell/muted-icon family as the back-to-top button so
// the two form one visual system rather than two competing styles, per
// AGENTS.md's palette rule that literal WhatsApp-brand green isn't
// available here — --status-live already owns green for actual
// online/live status, not a third-party logo color.
export function WhatsAppButton() {
  const language = useLanguage();

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(strings.floatingActions.whatsapp, language)}
      className="glass-fab bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full text-text-muted transition-colors hover:text-accent"
    >
      <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
