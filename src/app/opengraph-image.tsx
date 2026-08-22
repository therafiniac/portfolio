import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social-share preview (og:image / Twitter card) — Next.js's file-based
// convention picks this up automatically for every share of the root
// page, no manual meta tag wiring needed. Same round-badge brand mark
// and Mocha/accent palette as icon.tsx and BrandMark.tsx, scaled up into
// an actual share card instead of a favicon-sized dot.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#11111b",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            height: 96,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "2px solid #89b4fa",
            color: "#89b4fa",
            fontSize: 44,
            fontWeight: 700,
            marginBottom: 36,
          }}
        >
          R
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            color: "#cdd6f4",
            letterSpacing: -1,
          }}
        >
          Rafi Ahmed Laskar
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 30,
            color: "#a6adc8",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Full Stack Developer
          <span style={{ margin: "0 16px", color: "#eba0ac" }}>&middot;</span>
          <span style={{ color: "#eba0ac" }}>Designer</span>
        </div>
      </div>
    ),
    size,
  );
}
