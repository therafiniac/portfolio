import { triggerSurprise } from "@/components/layout/SurpriseFact";
import { triggerMatrixRain } from "@/components/layout/MatrixRain";
import { triggerPageGlitch } from "@/components/layout/PageGlitch";
import { triggerKonamiBurst } from "@/components/layout/KonamiEasterEgg";
import { triggerPageShake } from "@/components/layout/PageShake";

// Shared by every hidden gesture that wants "one of the site's other
// easter eggs, at random" rather than a single fixed outcome — first
// built for ContextMenu.tsx's "surprise me" row.
export const SURPRISE_OUTCOMES = ["fact", "matrix", "glitch", "konami", "shake"] as const;
export type SurpriseOutcome = (typeof SURPRISE_OUTCOMES)[number];

function shuffled(): SurpriseOutcome[] {
  const arr = [...SURPRISE_OUTCOMES];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// A shuffle-bag, not independent Math.random() picks each time — plain
// uniform random over 5 options *feels* far less random than it is,
// because it can (correctly, honestly) land on the same one 2-3 times in
// a handful of draws. A bag draws every outcome exactly once per cycle
// before any repeats, the same trick Tetris-style randomizers use, which
// is what actually reads as "random" to a person watching a short
// sequence of results. Module-level state (not per-component), so every
// caller pulls from the same bag and a full cycle is a true guarantee
// regardless of which gesture triggered which draw.
let bag: SurpriseOutcome[] = [];
let lastFired: SurpriseOutcome | null = null;

export function pickSurpriseOutcome(): SurpriseOutcome {
  if (bag.length === 0) {
    bag = shuffled();
    // Also guards the seam between cycles: without this, the last draw
    // of one cycle and the first draw of the next could coincidentally
    // be the same outcome, since a fresh shuffle doesn't know what just
    // fired. The *next* draw is bag[bag.length - 1] (pop() removes from
    // the end, not the front) — swapping index 0 here instead would
    // guard a position nothing actually reads next.
    const nextIndex = bag.length - 1;
    if (bag[nextIndex] === lastFired && bag.length > 1) {
      const swapWith = Math.floor(Math.random() * nextIndex);
      [bag[nextIndex], bag[swapWith]] = [bag[swapWith], bag[nextIndex]];
    }
  }
  const outcome = bag.pop()!;
  lastFired = outcome;
  return outcome;
}

export function fireSurpriseOutcome(outcome: SurpriseOutcome) {
  if (outcome === "fact") triggerSurprise();
  else if (outcome === "matrix") triggerMatrixRain();
  else if (outcome === "glitch") triggerPageGlitch();
  else if (outcome === "shake") triggerPageShake();
  else triggerKonamiBurst();
}
