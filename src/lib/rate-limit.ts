// Best-effort, in-memory rate limiting — no external store (Redis/KV are
// explicitly out of scope for this project, see AGENTS.md). A module-level
// Map survives across requests handled by the same warm server instance,
// but resets on a cold start and isn't shared across multiple instances —
// good enough to blunt a naive bot hammering the contact form, not a hard
// guarantee under distributed abuse. If that ever becomes a real problem,
// swapping this module for a real store is a one-file change: every
// caller only depends on `checkRateLimit`'s signature.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

// Sliding window per key (e.g. an IP address) — a plain array of request
// timestamps rather than a fixed-window counter, so a burst right at a
// window boundary can't double the effective limit.
const requestLog = new Map<string, number[]>();

// Caps how much memory a long-running instance can accumulate from
// distinct callers that never come back — without this, an entry for
// every unique IP that ever hit the form would sit in the Map forever.
// No background timer/cron (unreliable in serverless anyway); this just
// sweeps opportunistically once the map gets large.
const MAX_TRACKED_KEYS = 10_000;

function pruneExpired(map: Map<string, number[]>, now: number) {
  for (const [key, timestamps] of map) {
    const active = timestamps.filter((t) => now - t < WINDOW_MS);
    if (active.length === 0) map.delete(key);
    else map.set(key, active);
  }
}

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();

  if (requestLog.size > MAX_TRACKED_KEYS) pruneExpired(requestLog, now);

  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const retryAfterMs = WINDOW_MS - (now - timestamps[0]);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return { allowed: true };
}
