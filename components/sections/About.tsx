'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Coffee,
  Code2,
  Palette,
  GraduationCap,
  Heart,
  Download,
  ArrowRight,
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { siteConfig } from '@/data/site';

// ─── Animated counter ─────────────────────────────────────────
function AnimatedCounter({
  end,
  suffix,
  label,
  delay = 0,
}: {
  end: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const delayMs = delay * 1000;
    const startTime = performance.now() + delayMs;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(end * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center sm:items-start gap-1.5 p-5 sm:p-6
        rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]
        hover:border-[var(--brand)]/30 hover:shadow-lg hover:shadow-[var(--brand)]/5
        transition-all group cursor-default"
    >
      <span className="font-display font-extrabold text-3xl sm:text-4xl text-gradient">
        {count}
        {suffix}
      </span>
      <span
        className="text-xs font-mono text-[var(--text-muted)] text-center sm:text-left
        group-hover:text-[var(--text)] transition-colors"
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Info pill ────────────────────────────────────────────────
function InfoPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
      bg-[var(--bg-secondary)] border border-[var(--border)]
      text-xs sm:text-sm text-[var(--text-muted)]"
    >
      <span className="text-[var(--brand)] flex-shrink-0">{icon}</span>
      {label}
    </div>
  );
}

// ─── Fun fact card ────────────────────────────────────────────
function FunFact({
  icon,
  title,
  desc,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3 p-4 rounded-xl
        bg-[var(--bg-card)] border border-[var(--border)]
        hover:border-[var(--brand)]/30 hover:shadow-lg hover:shadow-[var(--brand)]/5
        transition-all group cursor-default"
    >
      <span
        className="flex-shrink-0 h-9 w-9 flex items-center justify-center
        rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]
        group-hover:bg-[var(--brand)]/20 transition-colors"
      >
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-[var(--text)] leading-tight">
          {title}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const imageView = useInView(imageRef, { once: true, margin: '-80px' });

  const funFacts = [
    {
      icon: <Code2 size={18} />,
      title: 'Clean Code Advocate',
      desc: 'Readable code is a form of respect for your future self and teammates.',
    },
    {
      icon: <Palette size={18} />,
      title: 'Design-First Mindset',
      desc: 'Every project starts with Figma. Great UX is non-negotiable for me.',
    },
    {
      icon: <Coffee size={18} />,
      title: 'Fuelled by Coffee',
      desc: 'Best ideas happen at 2AM with a hot cup and lo-fi beats playing.',
    },
    {
      icon: <Heart size={18} />,
      title: 'Lifelong Learner',
      desc: 'Always learning from open source, building in public, sharing knowledge.',
    },
  ];

  return (
    <section id="about" className="section-padding bg-[var(--bg-secondary)]/40">
      <div className="container-custom">
        <SectionTitle
          eyebrow="About Me"
          title="The person behind"
          highlight="the code"
          subtitle="A Full Stack Developer & Designer who loves turning complex problems into elegant, user-friendly digital experiences."
        />

        {/* ── Two-column layout ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* ── Left: Photo ───────────────────────────────────── */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -40 }}
            animate={imageView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto lg:mx-0">
              {/* Glow blob */}
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br
                from-[var(--brand)]/20 to-[var(--accent)]/10 blur-3xl scale-110
                pointer-events-none"
                aria-hidden
              />

              {/* Corner accents */}
              <div
                className="absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2
                border-[var(--brand)] rounded-tl-xl pointer-events-none z-10"
                aria-hidden
              />
              <div
                className="absolute -bottom-3 -right-3 w-14 h-14 border-b-2 border-r-2
                border-[var(--accent)] rounded-br-xl pointer-events-none z-10"
                aria-hidden
              />

              {/* Photo frame */}
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/5]
                bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl"
              >
                {/*
                  ── TO REPLACE WITH YOUR PHOTO ────────────────
                  1. Add your image to /public/photo.jpg
                  2. Import: import Image from "next/image"
                  3. Replace placeholder div below with:
                     <Image src="/photo.jpg" alt="Rafi Ahmed Laskar"
                       fill className="object-cover object-top" priority />
                  ──────────────────────────────────────────────
                */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center
                  bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)] gap-3"
                >
                  <div
                    className="w-20 h-20 rounded-full bg-[var(--brand)]/15
                    border-2 border-[var(--brand)]/30 flex items-center justify-center"
                  >
                    <span className="font-display font-bold text-4xl text-[var(--brand)]">
                      R
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[var(--text-muted)] text-center px-6 opacity-50">
                    Add your photo here
                  </p>
                </div>
              </div>

              {/* Badge — experience */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={imageView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-5 -left-3 sm:-left-5 z-20
                  flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
                  bg-[var(--bg-card)] border border-[var(--border)] shadow-xl"
              >
                <span
                  className="h-8 w-8 flex items-center justify-center
                  rounded-lg bg-[var(--brand)]/15 text-[var(--brand)] flex-shrink-0"
                >
                  <Calendar size={15} />
                </span>
                <div>
                  <p className="text-[10px] font-mono text-[var(--text-muted)]">
                    Experience
                  </p>
                  <p className="text-sm font-display font-bold text-[var(--text)]">
                    3+ Years
                  </p>
                </div>
              </motion.div>

              {/* Badge — location */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={imageView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.65,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -top-4 -right-3 sm:-right-5 z-20
                  flex items-center gap-2 px-3 py-2 rounded-xl
                  bg-[var(--bg-card)] border border-[var(--border)] shadow-xl"
              >
                <MapPin
                  size={13}
                  className="text-[var(--accent)] flex-shrink-0"
                />
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Kolkata, India
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right: Bio ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-4 text-[var(--text-muted)] leading-relaxed text-sm sm:text-base">
              <p>
                I&apos;m{' '}
                <span className="text-[var(--text)] font-semibold">
                  Rafi Ahmed Laskar
                </span>
                , a Full Stack Developer &amp; Designer based in Kolkata, India.
                With over{' '}
                <span className="text-[var(--brand)] font-medium">
                  3 years of experience
                </span>
                , I craft web products that are fast, accessible, and visually
                polished.
              </p>
              <p>
                My journey started with WordPress and vanilla JS, then evolved
                into building full-stack applications with the{' '}
                <span className="text-[var(--text)] font-medium">
                  MERN stack
                </span>
                . What sets me apart is my{' '}
                <span className="text-[var(--text)] font-medium">
                  dual expertise in engineering and design
                </span>{' '}
                — I care as much about pixel-perfect UI as I do about clean
                backend architecture.
              </p>
              <p>
                I hold a{' '}
                <span className="text-[var(--text)] font-medium">
                  B.Tech in Computer Science &amp; Engineering
                </span>{' '}
                from Adamas University, Kolkata. Outside of work, you&apos;ll
                find me exploring new UI trends, building side projects, or deep
                in a Figma rabbit hole.
              </p>
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap gap-2">
              <InfoPill
                icon={<MapPin size={13} />}
                label="Baruipur, Kolkata, India"
              />
              <InfoPill
                icon={<GraduationCap size={13} />}
                label="B.Tech — Computer Science"
              />
              <InfoPill
                icon={<Calendar size={13} />}
                label="Open to opportunities"
              />
            </div>

            <div className="h-px bg-[var(--border)]" />

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-[var(--brand)] text-white text-sm font-medium
                  shadow-lg shadow-[var(--brand)]/20 hover:bg-[var(--brand-dark)] transition-all"
              >
                View Projects <ArrowRight size={15} />
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  border border-[var(--border)] text-[var(--text-muted)] text-sm font-medium
                  hover:border-[var(--brand)]/50 hover:text-[var(--brand)]
                  hover:bg-[var(--brand)]/5 transition-all"
              >
                <Download size={15} /> Download CV
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ── Stats ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-16">
          {siteConfig.stats.map((stat, i) => (
            <AnimatedCounter
              key={stat.label}
              end={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* ── Fun facts ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {funFacts.map((fact, i) => (
            <FunFact key={fact.title} {...fact} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
