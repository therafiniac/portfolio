import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Matches BrandMark.tsx's round-badge language so the browser tab icon is
// the same visual signature as the in-page nav mark, not a generic
// Next.js default. BrandMark's own ring is a --gradient-signature mask
// trick that Satori (this ImageResponse renderer) doesn't support, so
// the ring here is two plain nested circles instead: an outer one filled
// with the gradient, an inner one RING_WIDTH smaller filled with the
// page background, sitting on top — the same visual result, built from
// CSS Satori actually renders.
const RING_WIDTH = 1.5;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundImage: "linear-gradient(135deg, #89b4fa, #eba0ac)",
        }}
      >
        <div
          style={{
            width: size.width - RING_WIDTH * 2,
            height: size.height - RING_WIDTH * 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "#11111b",
            color: "#89b4fa",
            fontFamily: "monospace",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          R
        </div>
      </div>
    ),
    size,
  );
}
