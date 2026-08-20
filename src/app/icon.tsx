import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Matches BrandMark.tsx's chamfered-badge language so the browser tab icon
// is the same visual signature as the in-page nav mark, not a generic
// Next.js default.
export default function Icon() {
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
          fontSize: 18,
          fontWeight: 700,
          clipPath:
            "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
          border: "1.5px solid #89b4fa",
        }}
      >
        R
      </div>
    ),
    size,
  );
}
