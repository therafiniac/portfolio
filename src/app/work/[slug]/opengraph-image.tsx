import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { clientProjects } from "@/lib/data/clientWork";

export const alt = "Rafi Ahmed Laskar — Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Per-project share card, picked up automatically by Next's file
// convention for this route segment (overriding the generic root
// opengraph-image.tsx just for /work/[slug]) — every case study now
// shares with its own real screenshot and name instead of the same
// generic "Rafi Ahmed Laskar" card every other page uses.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = clientProjects.find((p) => p.slug === slug);

  // Defensive only — generateStaticParams (page.tsx) already restricts
  // real slugs, so this path shouldn't be reachable. Falls back to the
  // same generic branded card the root opengraph-image.tsx renders,
  // duplicated rather than extracted: two occurrences doesn't clear this
  // project's own "extract after it appears more than twice" bar.
  if (!project) {
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
          <div style={{ display: "flex", fontSize: 72, fontWeight: 600, color: "#cdd6f4", letterSpacing: -1 }}>
            Rafi Ahmed Laskar
          </div>
        </div>
      ),
      size,
    );
  }

  const imageBuffer = await readFile(join(process.cwd(), "public", project.coverImage));
  const imageSrc = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#11111b",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
            width: 460,
            flexShrink: 0,
            padding: "0 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "2px solid #89b4fa",
              color: "#89b4fa",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div
            style={{
              display: "flex",
              color: "#eba0ac",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {project.category.en}
          </div>
          <div style={{ display: "flex", color: "#cdd6f4", fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>
            {project.name.en}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, position: "relative" }}>
          <img
            src={imageSrc}
            alt=""
            width={740}
            height={630}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
