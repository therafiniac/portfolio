'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Star,
  Clock,
  Archive,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { projects } from '@/data/projects';
import type { ProjectTag } from '@/types';
import { cn } from '@/lib/utils';

// ─── Tag color map ────────────────────────────────────────────
const tagColors: Record<string, string> = {
  React: 'bg-[#61DAFB]/10 text-[#61DAFB] border-[#61DAFB]/20',
  'Next.js': 'bg-white/10 text-white border-white/20',
  'Node.js': 'bg-[#339933]/10 text-[#339933] border-[#339933]/20',
  Express: 'bg-white/10 text-[#94a3b8] border-white/10',
  MongoDB: 'bg-[#47A248]/10 text-[#47A248] border-[#47A248]/20',
  TypeScript: 'bg-[#3178C6]/10 text-[#3178C6] border-[#3178C6]/20',
  Tailwind: 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/20',
  MERN: 'bg-[var(--brand)]/10 text-[var(--brand)] border-[var(--brand)]/20',
  WordPress: 'bg-[#21759B]/10 text-[#21759B] border-[#21759B]/20',
  Figma: 'bg-[#F24E1E]/10 text-[#F24E1E] border-[#F24E1E]/20',
  Other:
    'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--border)]',
};

// ─── Status badge ─────────────────────────────────────────────
const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: 'Completed',
    className:
      'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/20',
  },
  'in-progress': {
    icon: Clock,
    label: 'In Progress',
    className: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  },
  archived: {
    icon: Archive,
    label: 'Archived',
    className:
      'text-[var(--text-muted)] bg-[var(--bg-secondary)] border-[var(--border)]',
  },
};

// ─── Filter tabs ──────────────────────────────────────────────
const filterTabs: { label: string; value: 'all' | 'featured' | ProjectTag }[] =
  [
    { label: 'All', value: 'all' },
    { label: 'Featured', value: 'featured' },
    { label: 'React', value: 'React' },
    { label: 'MERN', value: 'MERN' },
    { label: 'Node.js', value: 'Node.js' },
  ];

// ─── Project card ─────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  // Gradient per project for visual variety
  const gradients = [
    'from-[var(--brand)]/20 via-transparent to-[var(--accent)]/10',
    'from-[var(--accent)]/20 via-transparent to-[var(--brand)]/10',
    'from-purple-500/20 via-transparent to-[var(--brand)]/10',
    'from-[var(--brand)]/15 via-transparent to-purple-500/10',
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col rounded-2xl overflow-hidden
        bg-[var(--bg-card)] border border-[var(--border)]
        hover:border-[var(--brand)]/40 hover:shadow-2xl hover:shadow-[var(--brand)]/8
        transition-all duration-300 group"
    >
      {/* ── Top image / gradient area ───────────────────────── */}
      <div
        className={cn(
          'relative h-44 sm:h-48 bg-gradient-to-br overflow-hidden flex-shrink-0',
          gradient,
        )}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Animated glow orb */}
        <motion.div
          animate={
            hovered ? { scale: 1.3, opacity: 0.6 } : { scale: 1, opacity: 0.3 }
          }
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-32 h-32 rounded-full bg-[var(--brand)] blur-3xl pointer-events-none"
        />

        {/* Project number watermark */}
        <span
          className="absolute bottom-3 right-4 font-display font-extrabold
          text-6xl sm:text-7xl text-white/5 select-none leading-none"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5
            px-2.5 py-1 rounded-full bg-[var(--bg-card)]/80 backdrop-blur-sm
            border border-[var(--border)] text-[10px] font-mono text-[var(--brand)]"
          >
            <Star size={10} className="fill-[var(--brand)]" />
            Featured
          </div>
        )}

        {/* Status badge */}
        <div
          className={cn(
            'absolute top-3 right-3 flex items-center gap-1.5',
            'px-2.5 py-1 rounded-full border text-[10px] font-mono backdrop-blur-sm',
            status.className,
          )}
        >
          <StatusIcon size={10} />
          {status.label}
        </div>

        {/* Hover overlay — action buttons */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-[var(--bg)]/70 backdrop-blur-sm
                flex items-center justify-center gap-3"
            >
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                    bg-[var(--bg-card)] border border-[var(--border)]
                    text-sm font-medium text-[var(--text)]
                    hover:border-[var(--brand)]/50 hover:text-[var(--brand)]
                    transition-colors"
                >
                  <Github size={15} />
                  GitHub
                </motion.a>
              )}
              {project.live ? (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                    bg-[var(--brand)] text-white text-sm font-medium
                    hover:bg-[var(--brand-dark)] transition-colors"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </motion.a>
              ) : (
                <motion.span
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                    bg-[var(--bg-card)]/50 border border-[var(--border)]
                    text-sm font-medium text-[var(--text-muted)] cursor-not-allowed
                    select-none opacity-50"
                >
                  <ExternalLink size={15} />
                  No Live Demo
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Card body ───────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'px-2 py-0.5 rounded-md text-[10px] font-mono border',
                tagColors[tag] ?? tagColors['Other'],
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <div>
          <h3
            className="font-display font-bold text-lg sm:text-xl text-[var(--text)]
            group-hover:text-[var(--brand)] transition-colors leading-tight mb-2"
          >
            {project.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
            {project.longDesc ?? project.description}
          </p>
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[var(--border)]">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono
                text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
            >
              <Github size={13} />
              Source
            </a>
          ) : (
            <span
              className="flex items-center gap-1.5 text-xs font-mono
              text-[var(--border)] cursor-not-allowed select-none"
            >
              <Github size={13} />
              Source
            </span>
          )}

          <span className="h-3 w-px bg-[var(--border)]" />

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono
                text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          ) : (
            <span
              className="flex items-center gap-1.5 text-xs font-mono
              text-[var(--border)] cursor-not-allowed select-none"
              title="No live demo available"
            >
              <ExternalLink size={13} />
              Live Demo
            </span>
          )}

          <motion.span
            animate={hovered ? { x: 4 } : { x: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="ml-auto text-[var(--brand)] opacity-0 group-hover:opacity-100
              transition-opacity"
          >
            <ArrowRight size={15} />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'featured' | ProjectTag
  >('all');

  const filtered = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return p.featured;
    return p.tags.includes(activeFilter as ProjectTag);
  });

  return (
    <section
      id="projects"
      className="section-padding bg-[var(--bg-secondary)]/40"
    >
      <div className="container-custom">
        <SectionTitle
          eyebrow="Projects"
          title="Things I've"
          highlight="built"
          subtitle="A selection of projects that showcase my skills across the full stack. More on GitHub."
        />

        {/* ── Filter tabs ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filterTabs.map((tab) => (
            <motion.button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'relative px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
                activeFilter === tab.value
                  ? 'bg-[var(--brand)] text-white border-[var(--brand)] shadow-lg shadow-[var(--brand)]/25'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--brand)]/40 hover:text-[var(--text)]',
              )}
            >
              {tab.label}
              {tab.value !== 'all' && (
                <span
                  className={cn(
                    'ml-1.5 text-[10px] font-mono',
                    activeFilter === tab.value ? 'opacity-70' : 'opacity-50',
                  )}
                >
                  {tab.value === 'featured'
                    ? projects.filter((p) => p.featured).length
                    : projects.filter((p) =>
                        p.tags.includes(tab.value as ProjectTag),
                      ).length}
                </span>
              )}
            </motion.button>
          ))}

          {/* Project count */}
          <span className="ml-auto self-center text-xs font-mono text-[var(--text-muted)]">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* ── Project grid ──────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state ───────────────────────────────────── */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-3
                text-[var(--text-muted)]"
            >
              <span className="text-4xl">🔍</span>
              <p className="font-mono text-sm">No projects match this filter</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── GitHub CTA ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4
            mt-14 p-6 sm:p-8 rounded-2xl
            bg-[var(--bg-card)] border border-[var(--border)]"
        >
          <div className="text-center sm:text-left">
            <p className="font-display font-semibold text-[var(--text)] text-lg">
              Want to see more?
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              I&apos;m always building something new. Check out my GitHub for
              the latest.
            </p>
          </div>
          <motion.a
            href="https://github.com/therafiniac"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl
              bg-[var(--text)] text-[var(--bg)] text-sm font-medium
              hover:opacity-90 transition-all shadow-lg"
          >
            <Github size={16} />
            View GitHub Profile
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
