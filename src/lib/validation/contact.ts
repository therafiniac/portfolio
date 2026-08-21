import { z } from "zod";

// Shared between the client form (instant feedback, no native browser
// tooltips) and the Server Action (the actual gate) — one set of rules,
// not two copies that can drift.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(2000, "Message is too long."),
});

export type ContactFieldErrors = Partial<Record<"name" | "email" | "message", string>>;
