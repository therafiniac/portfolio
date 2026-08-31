import { ImageResponse } from "next/og";

const SIZE = 192;

// manifest.ts's install icon — same round-badge language as icon.tsx
// (the browser-tab favicon) and BrandMark.tsx (the in-page nav mark),
// just generated at the larger size Android/Chrome's install prompt
// actually requires (icon.tsx's 32x32 is too small to reuse directly).
// A route handler, not the icon.tsx file-convention (that convention
// only wires up one default favicon size, not arbitrary manifest sizes).
// Same nested-circle gradient-ring technique as icon.tsx — see that
// file's own comment for why (Satori doesn't support BrandMark.tsx's
// mask-based ring).
const RING_WIDTH = 9;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: SIZE,
          height: SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundImage: "linear-gradient(135deg, #89b4fa, #eba0ac)",
        }}
      >
        <div
          style={{
            width: SIZE - RING_WIDTH * 2,
            height: SIZE - RING_WIDTH * 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "#11111b",
            color: "#89b4fa",
            fontFamily: "monospace",
            fontSize: 108,
            fontWeight: 700,
          }}
        >
          R
        </div>
      </div>
    ),
    { width: SIZE, height: SIZE },
  );
}
