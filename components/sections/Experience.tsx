'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { experiences } from '@/data/experience';
import { certifications } from '@/data/certifications';
import { cn } from '@/lib/utils';

// ─── Platform badge colors ─────────────────────────────────────
const platformColors: Record<string, string> = {
  Udemy: 'bg-[#A435F0]/10 text-[#A435F0] border-[#A435F0]/20',
  'Webtek Labs':
    'bg-[var(--brand)]/10 text-[var(--brand)] border-[var(--brand)]/20',
};

// ─── Timeline item ────────────────────────────────────────────
function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof experiences)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-8">
      {/* ── Left: timeline spine ────────────────────────────── */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            delay: index * 0.15,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            'relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border-2 flex-shrink-0',
            item.current
              ? 'bg-[var(--brand)]/15 border-[var(--brand)] shadow-lg shadow-[var(--brand)]/20'
              : 'bg-[var(--bg-card)] border-[var(--border)]',
          )}
        >
          <Briefcase
            size={16}
            className={
              item.current ? 'text-[var(--brand)]' : 'text-[var(--text-muted)]'
            }
          />
          {/* Pulse ring for current */}
          {item.current && (
            <span
              className="absolute inset-0 rounded-xl animate-ping
              bg-[var(--brand)]/20 pointer-events-none"
            />
          )}
        </motion.div>

        {/* Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{
              delay: index * 0.15 + 0.3,
              duration: 0.6,
              ease: 'easeOut',
            }}
            style={{ transformOrigin: 'top' }}
            className="mt-2 w-px flex-1 bg-gradient-to-b from-[var(--brand)]/40 to-[var(--border)]"
          />
        )}
      </div>

      {/* ── Right: content card ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          delay: index * 0.15 + 0.1,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn('flex-1 mb-12 pb-2', isLast && 'mb-0')}
      >
        <div
          className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]
          hover:border-[var(--brand)]/30 hover:shadow-xl hover:shadow-[var(--brand)]/5
          transition-all group"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-bold text-lg text-[var(--text)]">
                  {item.role}
                </h3>
                {item.current && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                    text-[10px] font-mono bg-[var(--accent)]/10 text-[var(--accent)]
                    border border-[var(--accent)]/20"
                  >
                    <span className="h-1 w-1 rounded-full bg-[var(--accent)] animate-pulse" />
                    Current
                  </span>
                )}
              </div>
              <p className="font-medium text-[var(--brand)] text-sm">
                {item.company}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 sm:items-end flex-shrink-0">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-mono
                text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2.5 py-1
                rounded-lg border border-[var(--border)]"
              >
                <Calendar size={11} />
                {item.period}
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-mono
                text-[var(--text-muted)]"
              >
                <MapPin size={11} />
                {item.location}
              </span>
            </div>
          </div>

          {/* Description bullets */}
          <ul className="space-y-2.5 mb-5">
            {item.description.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: index * 0.1 + i * 0.06 + 0.3,
                  duration: 0.4,
                }}
                className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]
                  leading-relaxed"
              >
                <CheckCircle2
                  size={14}
                  className="text-[var(--brand)] flex-shrink-0 mt-0.5"
                />
                {point}
              </motion.li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)]">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono
                  bg-[var(--bg-secondary)] text-[var(--text-muted)]
                  border border-[var(--border)]
                  group-hover:border-[var(--brand)]/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Certification card ───────────────────────────────────────
function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col gap-4 p-5 rounded-2xl
        bg-[var(--bg-card)] border border-[var(--border)]
        hover:border-[var(--brand)]/30 hover:shadow-xl hover:shadow-[var(--brand)]/5
        transition-all group"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        {/* Icon */}
        <div
          className="h-10 w-10 flex items-center justify-center rounded-xl flex-shrink-0
          bg-[var(--brand)]/10 border border-[var(--brand)]/20
          group-hover:bg-[var(--brand)]/20 transition-colors"
        >
          <Award size={18} className="text-[var(--brand)]" />
        </div>

        {/* Year + platform */}
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={cn(
              'px-2.5 py-0.5 rounded-full text-[10px] font-mono border',
              platformColors[cert.platform] ??
                'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--border)]',
            )}
          >
            {cert.platform}
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {cert.year}
          </span>
        </div>
      </div>

      {/* Title + issuer */}
      <div className="flex-1">
        <h4
          className="font-display font-semibold text-sm sm:text-base text-[var(--text)]
          leading-snug mb-1 group-hover:text-[var(--brand)] transition-colors"
        >
          {cert.title}
        </h4>
        <p className="text-xs text-[var(--text-muted)] font-mono">
          by {cert.issuer}
        </p>
      </div>

      {/* Link */}
      {cert.link ? (
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono
            text-[var(--brand)] hover:text-[var(--accent)] transition-colors mt-auto"
        >
          <ExternalLink size={11} />
          View Certificate
        </a>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 text-xs font-mono
          text-[var(--border)] mt-auto select-none"
        >
          <ExternalLink size={11} />
          Add link in data/certifications.ts
        </span>
      )}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function Experience() {
  const eduRef = useRef<HTMLDivElement>(null);
  const eduInView = useInView(eduRef, { once: true, margin: '-60px' });

  return (
    <section id="experience" className="section-padding bg-[var(--bg)]">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Experience & Education"
          title="My professional"
          highlight="journey"
          subtitle="Where I've worked, what I've learned, and the certifications I've earned along the way."
        />

        {/* ── Two-column layout ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">
          {/* ── Left: Work timeline ───────────────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div
                className="h-8 w-8 flex items-center justify-center rounded-lg
                bg-[var(--brand)]/10 border border-[var(--brand)]/20"
              >
                <Briefcase size={15} className="text-[var(--brand)]" />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--text)]">
                Work Experience
              </h3>
            </motion.div>

            {/* Timeline */}
            <div>
              {experiences.map((exp, i) => (
                <TimelineItem
                  key={exp.id}
                  item={exp}
                  index={i}
                  isLast={i === experiences.length - 1}
                />
              ))}
            </div>

            {/* Education heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8 mt-10"
            >
              <div
                className="h-8 w-8 flex items-center justify-center rounded-lg
                bg-[var(--accent)]/10 border border-[var(--accent)]/20"
              >
                <GraduationCap size={15} className="text-[var(--accent)]" />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--text)]">
                Education
              </h3>
            </motion.div>

            {/* Education card */}
            <motion.div
              ref={eduRef}
              initial={{ opacity: 0, x: 24 }}
              animate={eduInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-6 sm:gap-8 mt-2"
            >
              {/* Dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="h-10 w-10 flex items-center justify-center rounded-xl
                  bg-[var(--accent)]/10 border-2 border-[var(--accent)]/50 flex-shrink-0"
                >
                  <GraduationCap size={16} className="text-[var(--accent)]" />
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 pb-2">
                <div
                  className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-card)]
                  border border-[var(--border)] hover:border-[var(--accent)]/30
                  hover:shadow-xl hover:shadow-[var(--accent)]/5 transition-all"
                >
                  <div
                    className="flex flex-col sm:flex-row sm:items-start
                    sm:justify-between gap-2 mb-3"
                  >
                    <div>
                      <h3 className="font-display font-bold text-base text-[var(--text)] mb-0.5">
                        B.Tech — Computer Science &amp; Engineering
                      </h3>
                      <p className="text-sm text-[var(--accent)] font-medium">
                        Adamas University
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-mono
                      text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2.5 py-1
                      rounded-lg border border-[var(--border)] flex-shrink-0 h-fit"
                    >
                      <MapPin size={11} />
                      Kolkata, India
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Studied core CS fundamentals — data structures, algorithms,
                    databases, operating systems, and software engineering
                    principles.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Certifications ─────────────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div
                className="h-8 w-8 flex items-center justify-center rounded-lg
                bg-[var(--accent)]/10 border border-[var(--accent)]/20"
              >
                <Award size={15} className="text-[var(--accent)]" />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--text)]">
                Certifications
              </h3>
            </motion.div>

            {/* Cert grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
