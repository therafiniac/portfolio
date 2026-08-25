import { ImageResponse } from "next/og";

const SIZE = 192;

// manifest.ts's install icon — same round-badge language as icon.tsx
// (the browser-tab favicon) and BrandMark.tsx (the in-page nav mark),
// just generated at the larger size Android/Chrome's install prompt
// actually requires (icon.tsx's 32x32 is too small to reuse directly).
// A route handler, not the icon.tsx file-convention (that convention
// only wires up one default favicon size, not arbitrary manifest sizes).
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#11111b",
          color: "#89b4fa",
          fontFamily: "monospace",
          fontSize: 108,
          fontWeight: 700,
          borderRadius: "50%",
          border: "9px solid #89b4fa",
        }}
      >
        R
      </div>
    ),
    { width: SIZE, height: SIZE },
  );
}
