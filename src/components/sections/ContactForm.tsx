"use client";

import { useActionState, useState, type FocusEvent, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { contactSchema, type ContactFieldErrors } from "@/lib/validation/contact";
import { Magnetic } from "@/components/layout/Magnetic";

const initialState: ContactFormState = { status: "idle" };

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

  if (state.status === "success") {
    return (
      <div className="glass-panel p-6 text-text-primary md:p-8" role="status">
        <p className="flex items-center gap-2 font-mono text-sm text-accent">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Message sent.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
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
          Name
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
          Email
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
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          onBlur={handleBlur}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={messageError ? "message-error" : undefined}
          className={fieldClasses}
        />
        {messageError && (
          <p id="message-error" role="alert" className="mt-1 text-sm text-danger">
            {messageError}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-danger">
          {state.message}
        </p>
      )}

      {/* The one other bordered/filled CTA on the page besides Hero's
          "View My Work" — same signature-gradient fill, so the site's
          two real conversion moments (come look at the work, get in
          touch) read as the same kind of action. */}
      <Magnetic className="block w-full" strength={0.15}>
        <button
          type="submit"
          disabled={pending}
          className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ backgroundImage: "var(--gradient-signature)" }}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {pending ? "Sending…" : "Send Message"}
        </button>
      </Magnetic>
    </form>
  );
}
