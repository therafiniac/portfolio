"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useModalA11y } from "@/lib/useModalA11y";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Same useSyncExternalStore idiom useLanguage.ts/useTheme.ts already use
// for "read something only the client knows" — the React-recommended
// way to get a stable, non-cascading-render "has this mounted on the
// client yet" flag (needed below since document.body doesn't exist
// during SSR, so the portal can only render once mounted).
function subscribe() {
  return () => {};
}
function getSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

export type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
  orientation?: "portrait";
};

// A click-to-enlarge overlay for CaseStudy.tsx's gallery — the inline
// shots are object-cover'd into a fixed 16:10 (or 9:19.5 for a portrait
// capture) box to keep the stacked layout even, which can crop a sliver
// off a real screenshot's edges. This shows the same image object-contain
// instead, at a size only the viewport itself caps, so nothing about the
// original capture is lost — a genuine "see the real thing," not just a
// bigger version of the same crop. Arrow-key/button navigation cycles
// through the whole gallery without closing back out to the page each
// time.
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const open = index !== null;
  const current = open ? images[index] : null;
  const language = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  // document.body doesn't exist during SSR — createPortal below can only
  // run once mounted on the client. The dialog is never open on first
  // paint (index starts null), so returning null until then is visually
  // identical to rendering AnimatePresence with no open children.
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useModalA11y(open, dialogRef);

  useEffect(() => {
    if (!open || index === null) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((index! + 1) % images.length);
      if (event.key === "ArrowLeft") onNavigate((index! - 1 + images.length) % images.length);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, index, images.length, onClose, onNavigate]);

  if (!mounted) return null;

  // Portaled to <body> (rather than rendered inline where CaseStudy.tsx
  // mounts this, inside <main>) so it's a genuine sibling of <main>, not
  // a descendant of it — useModalA11y's inert-siblings loop needs that to
  // avoid inerting its own ancestor along with everything else.
  return createPortal(
    <AnimatePresence>
      {open && current && index !== null && (
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-bg/95 px-4 py-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={t(strings.lightbox.close, language)}
            className="glass-fab right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:text-accent"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onNavigate((index - 1 + images.length) % images.length);
                }}
                aria-label={t(strings.lightbox.previousImage, language)}
                className="glass-fab left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-text-muted transition-colors hover:text-accent"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onNavigate((index + 1) % images.length);
                }}
                aria-label={t(strings.lightbox.nextImage, language)}
                className="glass-fab right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-text-muted transition-colors hover:text-accent"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </>
          )}

          <div
            className={`relative max-h-[75vh] w-full ${
              current.orientation === "portrait" ? "max-w-sm" : "max-w-5xl"
            } ${current.orientation === "portrait" ? "aspect-[9/19.5]" : "aspect-[16/10]"}`}
            onClick={(event) => event.stopPropagation()}
          >
            <Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" />
          </div>

          {current.caption && (
            <p className="max-w-2xl text-center font-mono text-xs text-text-muted">{current.caption}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
