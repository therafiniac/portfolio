import { GraduationCap } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TechChip } from "@/components/ui/TechChip";
import { experience } from "@/lib/data/experience";
import { education } from "@/lib/data/education";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Dates in the data are "MMM YYYY", a bare "YYYY", or "Present" — this
// parses all three into a real Date so a duration can be computed, rather
// than hand-maintaining a duration string per entry that would drift out
// of sync with the dates.
function parseEntryDate(value: string): Date {
  if (value === "Present") return new Date();
  const [month, year] = value.split(" ");
  if (year) {
    return new Date(Number(year), Math.max(MONTHS.indexOf(month), 0), 1);
  }
  return new Date(Number(month), 0, 1);
}

function formatDuration(start: string, end: string): string {
  const months = Math.max(
    1,
    (parseEntryDate(end).getFullYear() - parseEntryDate(start).getFullYear()) * 12 +
      (parseEntryDate(end).getMonth() - parseEntryDate(start).getMonth()),
  );
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remainder > 0) parts.push(`${remainder} mo${remainder > 1 ? "s" : ""}`);
  return parts.join(" ");
}

// Bolds figures (150+, 3, etc.) in a highlight bullet so scan-reading the
// timeline surfaces the concrete claim instead of losing it inside a sentence.
function renderHighlight(text: string) {
  return text.split(/(\d[\d,]*\+?%?)/g).map((part, i) =>
    /^\d/.test(part) ? (
      <strong key={i} className="font-semibold text-accent-secondary">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function Experience() {
  return (
    <Section id="experience" index="04" tint eyebrow="Track Record" title="Experience">
      <div className="relative space-y-12">
        {/* Green at the top (the current-role segment) fading into the
            regular accent/muted fade below — a color echo of the pulsing
            --status-live dot on the current entry, not just the dot alone,
            so "this part of the timeline is where I am now" reads at a
            glance rather than only up close. */}
        <div
          className="absolute left-[5px] top-2 bottom-2 w-px overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, var(--status-live), var(--accent) 20%, color-mix(in srgb, var(--line) 60%, transparent) 60%, transparent 100%)",
          }}
        >
          {/* A small bright segment traveling top-to-bottom on a loop — see
              globals.css for why this is top/opacity only (cheap) and
              percentage-based (works at any timeline height). */}
          <span
            aria-hidden="true"
            className="trail-light absolute left-1/2 h-16 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-accent to-transparent blur-[1px]"
          />
        </div>
        {experience.map((entry) => {
          const isCurrent = entry.end === "Present";
          return (
            <div
              key={`${entry.org}-${entry.start}`}
              className="relative grid grid-cols-1 gap-2 pl-8 md:grid-cols-[200px_1fr] md:gap-8"
            >
              {/* Current role gets the same pulsing --status-live treatment
                  as the Hero status dot and the live GitHub stat — it's a
                  genuinely live/ongoing status, the token's actual role,
                  not a repurposed accent color. The shadow color-mixes
                  the same token rather than a hardcoded rgb() literal —
                  a literal baked in the dark-theme hex would silently
                  mismatch the actual (different) light-theme color. */}
              <span
                className={`absolute left-0 top-1.5 h-[10px] w-[10px] rounded-full ${
                  isCurrent
                    ? "bg-status-live shadow-[0_0_12px_2px_color-mix(in_srgb,var(--status-live)_50%,transparent)] motion-safe:animate-pulse"
                    : "bg-accent shadow-[0_0_12px_2px_color-mix(in_srgb,var(--accent)_40%,transparent)]"
                }`}
                aria-hidden="true"
              />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-secondary">
                  {entry.start} — {entry.end}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                  {formatDuration(entry.start, entry.end)}
                </p>
              </div>
              <div>
                <h3 className="text-text-primary">
                  {entry.role} <span className="text-text-muted">· {entry.org}</span>
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-text-muted">
                  {entry.location}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-text-muted">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="text-accent-secondary" aria-hidden="true">
                        →
                      </span>
                      <span>{renderHighlight(highlight)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tech.map((tech) => (
                    <TechChip key={tech}>{tech}</TechChip>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deliberately separate from the timeline above — a plain row, no
          dots or connecting line, so it reads as its own thing rather than
          another entry on the "track record" trail. */}
      <div className="mt-16 border-t border-line/40 pt-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-secondary">Education</p>
        <div className="mt-5 space-y-5">
          {education.map((entry) => (
            <div key={entry.institution} className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line/60 bg-surface text-accent">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-text-primary">{entry.degree}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-text-muted">
                  {entry.institution} · {entry.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
