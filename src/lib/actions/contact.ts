"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validation/contact";
import { checkRateLimit } from "@/lib/rate-limit";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  message?: string;
};

const GENERIC_ERROR: ContactFormState = {
  status: "error",
  message: `Something went wrong sending your message. Please email me directly instead.`,
};

// Vercel's edge network sets this on every request before it reaches the
// app; in local dev (no proxy in front) it's absent, so every request
// shares one "unknown" bucket — harmless, and it's actually how the rate
// limit gets exercised in local testing.
async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headersList.get("x-real-ip") ?? "unknown";
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real visitors never see or fill this field (see ContactForm.tsx).
  // A bot that fills it gets a fake success so it doesn't learn to probe
  // for a different tell.
  if (formData.get("company")) {
    return { status: "success" };
  }

  const ip = await getClientIp();
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil((rateLimit.retryAfterSeconds ?? 60) / 60);
    return {
      status: "error",
      message: `Too many messages sent. Please try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set — cannot send email.");
    return GENERIC_ERROR;
  }

  const { name, email, message } = parsed.data;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      // "onboarding@resend.dev" is Resend's shared test sender, usable with
      // no domain verification. Switch to a rafiera.com address once that
      // domain is verified in the Resend dashboard.
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "therafiniac@gmail.com",
        reply_to: email,
        subject: `New inquiry from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Contact form: Resend API error", response.status, body);
      return GENERIC_ERROR;
    }
  } catch (error) {
    console.error("Contact form: failed to reach email service", error);
    return GENERIC_ERROR;
  }

  return { status: "success" };
}
