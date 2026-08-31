"use client";

import { ContactCtaTile } from "@/components/layout/ContactCtaTile";
import { strings } from "@/lib/i18n-strings";

// WorkCard (ClientWork.tsx) has no fixed height of its own — its chrome
// bar + fixed-aspect screenshot + fixed-height text stack determine each
// row's height naturally. This tile deliberately has no height of its own
// either; it relies on CSS Grid's default `align-items: stretch` to grow
// to match whatever the real project cards in its row end up being, so it
// never needs to duplicate that math.
//
// Only one filler ever gets built (see buildGridItems in ClientWork.tsx) —
// a "schematic" variant with no href/text used to live here too, for a
// grid-item count that never lands on an even number of rows, but that
// case has never actually come up and the variant sat unreachable. Add it
// back if that scenario ever does.
export function WorkFillerTile() {
  return <ContactCtaTile heading={strings.workFiller.heading} cta={strings.workFiller.cta} className="h-full rounded-xl" />;
}
