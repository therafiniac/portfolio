// Shared by every hidden gesture gated to "genuinely empty space" —
// EmptyBackgroundDoubleClick.tsx and CursorPaint.tsx. "Empty" is checked
// structurally: the target IS one of the page's own container elements
// (body/main/section — Section.tsx renders a real <section> with
// generous padding on every side) rather than some deeper content
// element that happens to cover that pixel. A gesture that lands on real
// text/an image/a card is a hit on THAT element, never on its section
// ancestor, so this only ever passes on genuinely open space.
const BACKGROUND_TAGS = new Set(["BODY", "HTML", "MAIN", "SECTION"]);

export function isBackgroundTarget(el: Element | null): boolean {
  return !!el && BACKGROUND_TAGS.has(el.tagName);
}
