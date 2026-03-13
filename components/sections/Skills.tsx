'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Monitor, Server, Wrench, Palette } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiSass,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiGit,
  SiGithub,
  SiVisualstudiocode,
  SiVite,
  SiWordpress,
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiCanva,
} from 'react-icons/si';
import { GiMongoose } from 'react-icons/gi';
import SectionTitle from '@/components/ui/SectionTitle';
import { skillCategories } from '@/data/skills';
import { cn } from '@/lib/utils';

// ─── Icon map ─────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  SiReact: SiReact,
  SiNextdotjs: SiNextdotjs,
  SiTypescript: SiTypescript,
  SiJavascript: SiJavascript,
  SiTailwindcss: SiTailwindcss,
  SiHtml5: SiHtml5,
  SiCss3: SiCss3,
  SiSass: SiSass,
  SiBootstrap: SiBootstrap,
  SiNodedotjs: SiNodedotjs,
  SiExpress: SiExpress,
  SiMongodb: SiMongodb,
  SiMongoose: GiMongoose,
  SiPostman: SiPostman,
  SiJsonwebtokens: SiPostman, // fallback — no dedicated icon
  SiGit: SiGit,
  SiGithub: SiGithub,
  SiVisualstudiocode: SiVisualstudiocode,
  SiVite: SiVite,
  SiWordpress: SiWordpress,
  SiFilezilla: SiGit, // fallback
  SiFigma: SiFigma,
  SiAdobephotoshop: SiAdobephotoshop,
  SiAdobeillustrator: SiAdobeillustrator,
  SiCanva: SiCanva,
};

// ─── Icon colors ──────────────────────────────────────────────
const iconColorMap: Record<string, string> = {
  SiReact: '#61DAFB',
  SiNextdotjs: '#ffffff',
  SiTypescript: '#3178C6',
  SiJavascript: '#F7DF1E',
  SiTailwindcss: '#06B6D4',
  SiHtml5: '#E34F26',
  SiCss3: '#1572B6',
  SiSass: '#CC6699',
  SiBootstrap: '#7952B3',
  SiNodedotjs: '#339933',
  SiExpress: '#ffffff',
  SiMongodb: '#47A248',
  SiMongoose: '#AA2929',
  SiPostman: '#FF6C37',
  SiJsonwebtokens: '#d63aff',
  SiGit: '#F05032',
  SiGithub: '#ffffff',
  SiVisualstudiocode: '#007ACC',
  SiVite: '#646CFF',
  SiWordpress: '#21759B',
  SiFilezilla: '#BF0000',
  SiFigma: '#F24E1E',
  SiAdobephotoshop: '#31A8FF',
  SiAdobeillustrator: '#FF9A00',
  SiCanva: '#00C4CC',
};

// ─── Category icon map ────────────────────────────────────────
const categoryIconMap: Record<string, React.ElementType> = {
  monitor: Monitor,
  server: Server,
  wrench: Wrench,
  palette: Palette,
};

// ─── Level label ──────────────────────────────────────────────
const levelLabel = (level: number) => {
  const labels = [
    '',
    'Beginner',
    'Familiar',
    'Proficient',
    'Advanced',
    'Expert',
  ];
  return labels[level] ?? '';
};

const levelColor = (level: number) => {
  if (level === 5) return 'text-[var(--accent)]';
  if (level === 4) return 'text-[var(--brand)]';
  return 'text-[var(--text-muted)]';
};

// ─── Skill card ───────────────────────────────────────────────
function SkillCard({
  name,
  icon,
  level,
  index,
}: {
  name: string;
  icon: string;
  level: number;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[icon];
  const color = iconColorMap[icon] ?? 'var(--brand)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        delay: index * 0.04,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center gap-3 p-4 rounded-2xl
        bg-[var(--bg-card)] border border-[var(--border)] cursor-default
        hover:border-[var(--brand)]/40 hover:shadow-xl hover:shadow-[var(--brand)]/8
        transition-all duration-300 group overflow-hidden"
    >
      {/* Glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${color}12 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative z-10 h-10 w-10 flex items-center justify-center
          rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]
          group-hover:border-transparent transition-colors"
      >
        {Icon ? (
          <Icon
            size={22}
            style={{ color: hovered ? color : 'var(--text-muted)' }}
            className="transition-colors duration-200"
          />
        ) : (
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {name.slice(0, 2)}
          </span>
        )}
      </motion.div>

      {/* Name */}
      <span
        className="relative z-10 text-xs font-medium text-[var(--text-muted)]
        group-hover:text-[var(--text)] transition-colors text-center leading-tight"
      >
        {name}
      </span>

      {/* Level dots */}
      <div className="relative z-10 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            animate={hovered && i < level ? { scale: 1.3 } : { scale: 1 }}
            transition={{ delay: i * 0.04, type: 'spring', stiffness: 400 }}
            className={cn(
              'h-1 w-1 rounded-full transition-colors duration-200',
              i < level
                ? level === 5
                  ? 'bg-[var(--accent)]'
                  : 'bg-[var(--brand)]'
                : 'bg-[var(--border)]',
            )}
          />
        ))}
      </div>

      {/* Level tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute bottom-1 right-2 text-[9px] font-mono',
              levelColor(level),
            )}
          >
            {levelLabel(level)}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Category tab ─────────────────────────────────────────────
function CategoryTab({
  title,
  icon,
  active,
  onClick,
  count,
}: {
  title: string;
  icon: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  const Icon = categoryIconMap[icon] ?? Monitor;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl',
        'text-sm font-medium transition-all duration-200 border',
        active
          ? 'bg-[var(--brand)] text-white border-[var(--brand)] shadow-lg shadow-[var(--brand)]/25'
          : 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--brand)]/40 hover:text-[var(--text)]',
      )}
    >
      <Icon size={15} />
      <span className="hidden sm:inline">{title}</span>
      <span className="sm:hidden">{title.split(' ')[0]}</span>
      <span
        className={cn(
          'text-[10px] font-mono px-1.5 py-0.5 rounded-full',
          active
            ? 'bg-white/20 text-white'
            : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]',
        )}
      >
        {count}
      </span>
    </motion.button>
  );
}

// ─── Marquee strip (all skills scrolling) ─────────────────────
function SkillMarquee() {
  const allSkills = skillCategories.flatMap((c) => c.skills);
  const doubled = [...allSkills, ...allSkills]; // duplicate for seamless loop

  return (
    <div className="relative overflow-hidden py-4">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10
        bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10
        bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none"
      />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-3 w-max"
      >
        {doubled.map((skill, i) => {
          const Icon = iconMap[skill.icon];
          const color = iconColorMap[skill.icon] ?? 'var(--brand)';
          return (
            <div
              key={`${skill.name}-${i}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full
                bg-[var(--bg-card)] border border-[var(--border)]
                text-xs font-mono text-[var(--text-muted)] whitespace-nowrap
                flex-shrink-0"
            >
              {Icon && <Icon size={13} style={{ color }} />}
              {skill.name}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerView = useInView(headerRef, { once: true, margin: '-80px' });

  const activeCategory = skillCategories[activeTab];

  return (
    <section id="skills" className="section-padding bg-[var(--bg)]">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Skills & Tools"
          title="What I work"
          highlight="with"
          subtitle="A curated toolkit built over 3+ years of professional development and design work."
          center
          className="text-center [&_p]:text-center [&_p]:text-balance [&_p]:mx-auto"
        />

        {/* ── Category tabs ─────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {skillCategories.map((cat, i) => (
            <CategoryTab
              key={cat.title}
              title={cat.title}
              icon={cat.icon}
              active={activeTab === i}
              onClick={() => setActiveTab(i)}
              count={cat.skills.length}
            />
          ))}
        </motion.div>

        {/* ── Skills grid ───────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase">
                {activeCategory.title}
              </span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {activeCategory.skills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  level={skill.level}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Proficiency legend ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-8
            mb-16 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]"
        >
          <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
            Proficiency
          </span>
          {[
            { level: 3, label: 'Proficient', color: 'bg-[var(--border)]' },
            { level: 4, label: 'Advanced', color: 'bg-[var(--brand)]' },
            { level: 5, label: 'Expert', color: 'bg-[var(--accent)]' },
          ].map(({ level, label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      i < level ? color : 'bg-[var(--border)]',
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Scrolling marquee ─────────────────────────────── */}
        <div className="mb-8">
          <p
            className="text-center text-xs font-mono text-[var(--text-muted)]
            uppercase tracking-widest mb-6"
          >
            Full tech stack
          </p>
          <SkillMarquee />
        </div>
      </div>
    </section>
  );
}
