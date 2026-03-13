'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Code2,
  Layers,
  Figma,
} from 'lucide-react';
import { siteConfig, socialLinks } from '@/data/site';

// ─── Typewriter hook ──────────────────────────────────────────
function useTypewriter(words: readonly string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ─── Floating tech badge ──────────────────────────────────────
interface FloatingBadgeProps {
  label: string;
  icon: React.ReactNode;
  className: string;
  delay: number;
}

function FloatingBadge({ label, icon, className, delay }: FloatingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl
        bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border)]
        shadow-lg text-xs font-mono font-medium text-[var(--text-muted)]
        select-none ${className}`}
      style={{
        animation: `float ${3.5 + delay}s ease-in-out ${delay}s infinite`,
      }}
    >
      {icon}
      {label}
    </motion.div>
  );
}

// ─── Social icon map ──────────────────────────────────────────
const SocialIcon = ({ icon, size = 18 }: { icon: string; size?: number }) => {
  if (icon === 'github') return <Github size={size} />;
  if (icon === 'linkedin') return <Linkedin size={size} />;
  if (icon === 'mail') return <Mail size={size} />;
  return null;
};

// ─── Stagger container ────────────────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ───────────────────────────────────────────────
export default function Hero() {
  const role = useTypewriter(siteConfig.roles);
  const sectionRef = useRef<HTMLElement>(null);

  // ── Subtle parallax on mouse move ────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const bgX = useTransform(springX, [-0.5, 0.5], ['-2%', '2%']);
  const bgY = useTransform(springY, [-0.5, 0.5], ['-2%', '2%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--bg)]"
    >
      {/* ── Animated mesh background ─────────────────────────── */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        {/* Grid dots */}
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full
          bg-[var(--brand)]/10 blur-[120px] animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full
          bg-[var(--accent)]/8 blur-[100px] animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[300px] rounded-full bg-[var(--brand)]/5 blur-[80px]"
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[var(--bg)]/60" />
      </motion.div>

      {/* ── Floating badges (desktop only) ───────────────────── */}
      <FloatingBadge
        label="React.js"
        icon={<Code2 size={13} className="text-[var(--brand)]" />}
        className="top-[22%] left-[6%]"
        delay={0.8}
      />
      <FloatingBadge
        label="Next.js"
        icon={<Layers size={13} className="text-[var(--text-muted)]" />}
        className="top-[38%] left-[4%]"
        delay={1.0}
      />
      <FloatingBadge
        label="Figma"
        icon={<Figma size={13} className="text-[var(--accent)]" />}
        className="top-[55%] left-[7%]"
        delay={1.2}
      />
      <FloatingBadge
        label="Node.js"
        icon={<Code2 size={13} className="text-green-400" />}
        className="top-[22%] right-[6%]"
        delay={1.0}
      />
      <FloatingBadge
        label="MongoDB"
        icon={<Layers size={13} className="text-green-500" />}
        className="top-[40%] right-[4%]"
        delay={0.9}
      />
      <FloatingBadge
        label="Tailwind"
        icon={<Sparkles size={13} className="text-cyan-400" />}
        className="top-[57%] right-[7%]"
        delay={1.1}
      />

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="container-custom relative z-10 pt-[var(--nav-height)]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center max-w-4xl mx-auto px-4"
        >
          {/* Eyebrow pill */}
          <motion.div variants={item}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              border border-[var(--border)] bg-[var(--bg-card)]/60 backdrop-blur-sm
              text-xs font-mono text-[var(--text-muted)] mb-8 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Available for freelance &amp; full-time roles
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="font-display font-extrabold text-[clamp(2.4rem,7vw,5.5rem)]
              leading-[1.05] tracking-tight text-[var(--text)] mb-4"
          >
            Hi, I&apos;m{' '}
            <span className="relative inline-block">
              <span className="text-gradient">Rafi Ahmed</span>
              {/* Underline squiggle */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M2 8 C60 2, 120 12, 180 6 S260 2, 298 7"
                  stroke="url(#grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient
                    id="grad"
                    x1="0"
                    y1="0"
                    x2="300"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--brand)" />
                    <stop offset="1" stopColor="var(--accent)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={item}
            className="h-12 sm:h-14 flex items-center justify-center mb-6"
          >
            <span
              className="font-display font-semibold text-[clamp(1.1rem,3.5vw,2rem)]
              text-[var(--text-muted)]"
            >
              I&apos;m a{' '}
              <span className="text-[var(--brand)] font-bold">
                {role}
                <span
                  className="inline-block w-0.5 h-[1em] bg-[var(--brand)] ml-0.5
                  align-middle animate-blink"
                />
              </span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed
              max-w-2xl mb-10"
          >
            I build fast, accessible, and visually polished web experiences —
            from pixel-perfect UIs to robust backend APIs. Currently crafting
            digital products with the{' '}
            <span className="text-[var(--text)] font-medium">MERN stack</span>{' '}
            and a strong eye for design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5
                rounded-xl bg-[var(--brand)] text-white font-medium text-sm sm:text-base
                shadow-lg shadow-[var(--brand)]/25 hover:bg-[var(--brand-dark)]
                hover:shadow-[var(--brand)]/40 transition-all"
            >
              <Sparkles size={16} />
              View My Work
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5
                rounded-xl border border-[var(--border)] text-[var(--text)]
                font-medium text-sm sm:text-base
                hover:border-[var(--brand)]/60 hover:text-[var(--brand)]
                hover:bg-[var(--brand)]/5 transition-all"
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={item}
            className="flex items-center gap-2 mb-16 sm:mb-20"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="h-10 w-10 flex items-center justify-center rounded-xl
                  border border-[var(--border)] text-[var(--text-muted)]
                  hover:border-[var(--brand)]/50 hover:text-[var(--brand)]
                  hover:bg-[var(--brand)]/8 transition-all"
              >
                <SocialIcon icon={social.icon} size={17} />
              </motion.a>
            ))}

            <span className="mx-2 h-4 w-px bg-[var(--border)]" />

            <span className="text-xs font-mono text-[var(--text-muted)]">
              therafiniac.com
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={item}
            className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4
              max-w-2xl mx-auto"
          >
            {siteConfig.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center gap-1 px-4 py-4 rounded-2xl
                  bg-[var(--bg-card)]/60 backdrop-blur-sm border border-[var(--border)]
                  hover:border-[var(--brand)]/30 hover:bg-[var(--brand)]/5
                  transition-all group"
              >
                <span className="font-display font-bold text-2xl sm:text-3xl text-gradient">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span
                  className="text-[10px] sm:text-xs font-mono text-[var(--text-muted)]
                  text-center leading-tight group-hover:text-[var(--text)] transition-colors"
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div className="relative z-10 flex justify-center py-8">
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-col items-center gap-1.5 text-[var(--text-muted)]
            hover:text-[var(--brand)] transition-colors group"
          aria-label="Scroll to next section"
        >
          <div
            className="relative h-10 w-5 rounded-full border border-[var(--border)]
            flex items-start justify-center pt-1.5 group-hover:border-[var(--brand)]/50
            transition-colors overflow-hidden"
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-[var(--brand)]"
              animate={{ y: [0, 14, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
