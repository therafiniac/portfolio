'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MessageSquare,
  User,
  AtSign,
  FileText,
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { siteConfig, socialLinks } from '@/data/site';
import { cn } from '@/lib/utils';
import type { ContactFormData } from '@/types';

// ─── EmailJS config — fill in .env.local ──────────────────────
const EJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
const EJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
const EJS_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';

// ─── Contact info items ───────────────────────────────────────
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: siteConfig.location,
    href: 'https://maps.google.com/?q=Baruipur,Kolkata,India',
  },
];

// ─── Social icon resolver ─────────────────────────────────────
function SocialIcon({ icon }: { icon: string }) {
  if (icon === 'github') return <Github size={18} />;
  if (icon === 'linkedin') return <Linkedin size={18} />;
  if (icon === 'mail') return <Mail size={18} />;
  return null;
}

// ─── Input field ─────────────────────────────────────────────
function InputField({
  label,
  icon: Icon,
  error,
  className,
  ...props
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
        {label}
      </label>
      <div
        className={cn(
          'relative flex items-center rounded-xl border transition-all duration-200',
          focused
            ? 'border-[var(--brand)] shadow-sm shadow-[var(--brand)]/20'
            : error
              ? 'border-red-500/50'
              : 'border-[var(--border)]',
          'bg-[var(--bg-secondary)]',
        )}
      >
        <span
          className={cn(
            'absolute left-3.5 transition-colors duration-200',
            focused ? 'text-[var(--brand)]' : 'text-[var(--text-muted)]',
          )}
        >
          <Icon size={15} />
        </span>
        <input
          {...props}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className="w-full bg-transparent pl-10 pr-4 py-3 text-sm text-[var(--text)]
            placeholder:text-[var(--text-muted)]/50 outline-none rounded-xl"
        />
      </div>
      {error && (
        <span className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </span>
      )}
    </div>
  );
}

// ─── Textarea field ───────────────────────────────────────────
function TextareaField({
  label,
  icon: Icon,
  error,
  ...props
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
        {label}
      </label>
      <div
        className={cn(
          'relative flex rounded-xl border transition-all duration-200',
          focused
            ? 'border-[var(--brand)] shadow-sm shadow-[var(--brand)]/20'
            : error
              ? 'border-red-500/50'
              : 'border-[var(--border)]',
          'bg-[var(--bg-secondary)]',
        )}
      >
        <span
          className={cn(
            'absolute left-3.5 top-3.5 transition-colors duration-200',
            focused ? 'text-[var(--brand)]' : 'text-[var(--text-muted)]',
          )}
        >
          <Icon size={15} />
        </span>
        <textarea
          {...props}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className="w-full bg-transparent pl-10 pr-4 py-3 text-sm text-[var(--text)]
            placeholder:text-[var(--text-muted)]/50 outline-none rounded-xl resize-none
            min-h-[140px]"
        />
      </div>
      {error && (
        <span className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </span>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const leftView = useInView(leftRef, { once: true, margin: '-60px' });

  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  // ── Validation ──────────────────────────────────────────────
  const validate = (): boolean => {
    const e: Partial<ContactFormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20)
      e.message = 'Message too short (min 20 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((err) => ({ ...err, [name]: undefined }));
    }
  };

  // ── Submit ──────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_name: 'Rafi',
        },
        EJS_KEY,
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      toast.success("Message sent! I'll get back to you soon 🚀");
    } catch {
      setStatus('error');
      toast.error('Failed to send. Please try emailing directly.');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding bg-[var(--bg-secondary)]/40"
    >
      <div className="container-custom">
        <SectionTitle
          eyebrow="Contact"
          title="Let's work"
          highlight="together"
          subtitle="Have a project in mind or just want to say hi? My inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
          {/* ── Left: info panel ─────────────────────────────── */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -30 }}
            animate={leftView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Availability card */}
            <div
              className="relative overflow-hidden p-5 sm:p-6 rounded-2xl
              bg-gradient-to-br from-[var(--brand)]/15 to-[var(--accent)]/8
              border border-[var(--brand)]/20"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32
                bg-[var(--brand)]/10 rounded-full blur-3xl pointer-events-none"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest">
                    Available for work
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-[var(--text)] mb-2">
                  Open to opportunities
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  I&apos;m currently open to freelance projects, full-time
                  roles, and exciting collaborations. Let&apos;s build something
                  great together.
                </p>
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    href.startsWith('http') ? 'noopener noreferrer' : undefined
                  }
                  className="flex items-center gap-4 p-4 rounded-xl
                    bg-[var(--bg-card)] border border-[var(--border)]
                    hover:border-[var(--brand)]/40 hover:shadow-lg hover:shadow-[var(--brand)]/5
                    transition-all group"
                >
                  <span
                    className="h-10 w-10 flex items-center justify-center
                    rounded-lg bg-[var(--brand)]/10 border border-[var(--brand)]/20
                    text-[var(--brand)] flex-shrink-0
                    group-hover:bg-[var(--brand)]/20 transition-colors"
                  >
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      {label}
                    </p>
                    <p
                      className="text-sm font-medium text-[var(--text)] truncate
                      group-hover:text-[var(--brand)] transition-colors"
                    >
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                Find me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-11 w-11 flex items-center justify-center rounded-xl
                      bg-[var(--bg-card)] border border-[var(--border)]
                      text-[var(--text-muted)] hover:text-[var(--brand)]
                      hover:border-[var(--brand)]/40 hover:shadow-lg
                      hover:shadow-[var(--brand)]/10 transition-all"
                  >
                    <SocialIcon icon={s.icon} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: contact form ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)]
              border border-[var(--border)] shadow-xl shadow-black/5"
            >
              <h3 className="font-display font-bold text-xl text-[var(--text)] mb-6">
                Send a message
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-5">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Your Name"
                      icon={User}
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      error={errors.name}
                      autoComplete="name"
                    />
                    <InputField
                      label="Email Address"
                      icon={AtSign}
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      autoComplete="email"
                    />
                  </div>

                  {/* Subject */}
                  <InputField
                    label="Subject"
                    icon={FileText}
                    name="subject"
                    type="text"
                    placeholder="Project enquiry / Job opportunity / Just saying hi"
                    value={form.subject}
                    onChange={handleChange}
                    error={errors.subject}
                  />

                  {/* Message */}
                  <TextareaField
                    label="Message"
                    icon={MessageSquare}
                    name="message"
                    placeholder="Tell me about your project, timeline, budget — anything that helps me understand what you need..."
                    value={form.message}
                    onChange={handleChange}
                    error={errors.message}
                  />

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    whileHover={status === 'idle' ? { scale: 1.02, y: -2 } : {}}
                    whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                    className={cn(
                      'w-full flex items-center justify-center gap-2.5',
                      'px-6 py-3.5 rounded-xl font-medium text-sm transition-all',
                      status === 'success'
                        ? 'bg-[var(--accent)] text-[#0a0f1a] shadow-lg shadow-[var(--accent)]/25'
                        : status === 'error'
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                          : 'bg-[var(--brand)] text-white shadow-lg shadow-[var(--brand)]/25 hover:bg-[var(--brand-dark)]',
                      (status === 'sending' || status === 'success') &&
                        'cursor-not-allowed opacity-80',
                    )}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {status === 'sending' && (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </motion.span>
                      )}
                      {status === 'success' && (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 size={16} />
                          Message Sent!
                        </motion.span>
                      )}
                      {status === 'error' && (
                        <motion.span
                          key="error"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          <AlertCircle size={16} />
                          Failed — Try Again
                        </motion.span>
                      )}
                      {status === 'idle' && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          <Send size={16} />
                          Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  {/* Response time note */}
                  <p
                    className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2
              px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
                  >
                    <CheckCircle2
                      size={13}
                      className="text-[var(--accent)] flex-shrink-0"
                    />
                    Typical response time: within 24 hours
                  </p>
                  {/* EmailJS not configured notice */}
                  {/* {(!EJS_SERVICE || !EJS_TEMPLATE || !EJS_KEY) && (
                    <p
                      className="text-[11px] font-mono text-[var(--text-muted)] text-center
                      px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]"
                    >
                      ⚠️ Add EmailJS credentials to{' '}
                      <code className="text-[var(--brand)]">.env.local</code> to
                      enable form submission
                    </p>
                  )} */}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
