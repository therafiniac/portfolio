import { ImageResponse } from "next/og";

const SIZE = 512;

// Same reasoning as icon-192/route.tsx — the other size manifest.ts
// declares (512x512, the other one Android's install-prompt spec checks
// for).
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
          fontSize: 288,
          fontWeight: 700,
          borderRadius: "50%",
          border: "24px solid #89b4fa",
        }}
      >
        R
      </div>
    ),
    { width: SIZE, height: SIZE },
  );
}
