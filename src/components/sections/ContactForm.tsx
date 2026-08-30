"use client";

import { useActionState, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { contactSchema, type ContactFieldErrors } from "@/lib/validation/contact";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const initialState: ContactFormState = { status: "idle" };
const SUDO_PHRASE = "sudo hire me";
const SUDO_EASTER_EGG_DURATION_MS = 2200;

const fieldClasses =
  "mt-2 w-full rounded-lg border border-line bg-transparent px-3 py-2 text-text-primary outline-none transition-colors focus:border-accent";

type FieldName = keyof ContactFieldErrors;

function validateField(field: FieldName, value: string): string | undefined {
  const result = contactSchema.shape[field].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [sudoEasterEgg, setSudoEasterEgg] = useState(false);
  const sudoTriggeredRef = useRef(false);
  const language = useLanguage();

  // Reads the field's own live value on every keystroke without making it
  // a controlled input (no `value=` prop below) — this is a pure side
  // effect, the field itself stays exactly as uncontrolled as it already
  // was for the real submit/validation flow. sudoTriggeredRef stops it
  // re-firing on every keystroke once the phrase is already typed, and
  // resets the moment it's edited out again.
  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const matched = event.target.value.toLowerCase().includes(SUDO_PHRASE);
    if (matched && !sudoTriggeredRef.current) {
      sudoTriggeredRef.current = true;
      setSudoEasterEgg(true);
      window.setTimeout(() => setSudoEasterEgg(false), SUDO_EASTER_EGG_DURATION_MS);
    } else if (!matched) {
      sudoTriggeredRef.current = false;
    }
  }

  if (state.status === "success") {
    return (
      <div className="glass-panel p-6 text-text-primary md:p-8" role="status">
        <p className="flex items-center gap-2 font-mono text-sm text-accent">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          {t(strings.contactForm.sentTitle, language)}
        </p>
        <p className="mt-2 text-sm text-text-muted">{t(strings.contactForm.sentBody, language)}</p>
      </div>
    );
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as FieldName;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setClientErrors((prev) => ({
      ...prev,
      [field]: validateField(field, event.target.value),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!parsed.success) {
      event.preventDefault();
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setClientErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      });
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setClientErrors({});
  }

  function errorFor(field: FieldName) {
    if (!touched[field]) return undefined;
    return clientErrors[field] ?? state.errors?.[field];
  }

  const nameError = errorFor("name");
  const emailError = errorFor("email");
  const messageError = errorFor("message");

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="glass-panel relative space-y-4 p-6 md:p-8"
    >
      {/* Honeypot: visually hidden and out of tab order, real users never
          fill it. See submitContactForm for the server-side check. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="block font-mono text-xs uppercase tracking-[0.15em] text-text-muted"
        >
          {t(strings.contactForm.name, language)}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onBlur={handleBlur}
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? "name-error" : undefined}
          className={fieldClasses}
        />
        {nameError && (
          <p id="name-error" role="alert" className="mt-1 text-sm text-danger">
            {nameError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-mono text-xs uppercase tracking-[0.15em] text-text-muted"
        >
          {t(strings.contactForm.email, language)}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onBlur={handleBlur}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? "email-error" : undefined}
          className={fieldClasses}
        />
        {emailError && (
          <p id="email-error" role="alert" className="mt-1 text-sm text-danger">
            {emailError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs uppercase tracking-[0.15em] text-text-muted"
        >
          {t(strings.contactForm.message, language)}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          onBlur={handleBlur}
          onChange={handleMessageChange}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={messageError ? "message-error" : undefined}
          className={fieldClasses}
        />
        {messageError && (
          <p id="message-error" role="alert" className="mt-1 text-sm text-danger">
            {messageError}
          </p>
        )}
        <AnimatePresence>
          {sudoEasterEgg && (
            <motion.p
              key="sudo-easter-egg"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
              className="mt-1.5 bg-clip-text font-mono text-xs text-transparent"
              style={{ backgroundImage: "var(--gradient-signature)" }}
            >
              {t(strings.contactForm.sudoEasterEgg, language)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-danger">
          {state.message}
        </p>
      )}

      {/* The one other bordered/filled CTA on the page besides Hero's
          "View My Work" — same signature-gradient fill and the same
          cta-shine sweep + glow + lift, so the site's two real
          conversion moments (come look at the work, get in touch) read
          as the same kind of action. */}
      <motion.button
        type="submit"
        disabled={pending}
        whileHover={pending ? undefined : { scale: 1.03, y: -2 }}
        whileTap={pending ? undefined : { scale: 0.97, y: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className="cta-shine flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundImage: "var(--gradient-signature)" }}
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {pending ? t(strings.contactForm.sending, language) : t(strings.contactForm.send, language)}
      </motion.button>
    </form>
  );
}
