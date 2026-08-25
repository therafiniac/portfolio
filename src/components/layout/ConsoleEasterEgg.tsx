"use client";

import { useEffect } from "react";

// A small, low-stakes personality beat for the one audience segment
// guaranteed to open devtools on a developer's own portfolio — costs
// nothing for everyone else, who never sees it. Colors are the Mocha
// palette's own accent/surface tokens as literal hex (console styling
// can't read CSS custom properties), not a separate palette invented
// just for this.
export function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%c rafi@portfolio %c poking around, huh? ",
      "background:#89b4fa;color:#11111b;font-family:monospace;font-weight:700;padding:2px 6px;border-radius:3px 0 0 3px;",
      "background:#181825;color:#cdd6f4;font-family:monospace;padding:2px 6px;border-radius:0 3px 3px 0;",
    );
    console.log(
      "%cif you're reading source instead of the rendered page, we probably speak the same language.\ntherafiniac@gmail.com — always open to a real conversation.",
      "color:#a6adc8;font-family:monospace;font-size:12px;line-height:1.5;",
    );
  }, []);

  return null;
}
