"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Trail } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { useTheme, type Theme } from "@/lib/useTheme";

// WebGL materials take real colors, not CSS custom properties, so the
// two token values from AGENTS.md's table are hardcoded here rather
// than read live — `useTheme` (shared with ThemeToggle/HeroCanvas)
// supplies which of the two is actually active right now.
const ACCENT: Record<Theme, string> = { dark: "#89b4fa", light: "#1e66f5" };
const ACCENT_SECONDARY: Record<Theme, string> = { dark: "#eba0ac", light: "#e64553" };
// Light theme's --accent (#1e66f5) is a considerably darker, more
// saturated blue than dark theme's pastel #89b4fa — under the exact same
// point-light rig the core rendered as a near-black navy blob instead of
// a vibrant center, since the material had far less light hitting it
// relative to how dark that base color already is. A brighter (still
// neutral/white, not colored — colored point lights already blew out to
// a flat white hotspot once at high intensity, see below) ambient fill
// specifically for light lifts the core without recreating that.
const AMBIENT_INTENSITY: Record<Theme, number> = { dark: 0.5, light: 1.6 };
// Core opacity light-mode-only tweak — dark's value is unchanged from
// before it existed. Outer mesh color went grey -> black -> back to
// accent blue (matching the core) per iteration, so it's just ACCENT
// itself now for both themes rather than a separate always-diverging
// token.
const CORE_OPACITY: Record<Theme, number> = { dark: 1, light: 0.88 };
const OUTER_MESH_COLOR: Record<Theme, string> = ACCENT;

// Read outside React's render loop (a ref, not state) — this only feeds
// useFrame, which already runs its own rAF loop independent of React
// re-renders, so routing scroll position through setState here would
// just be extra re-renders buying nothing. Normalized against one
// viewport height: the scene reaches its full scroll-driven energy right
// around where Hero itself scrolls out of view, not still ramping up
// deep into the page.
function useScrollProgressRef() {
  const progress = useRef(0);
  useEffect(() => {
    function handleScroll() {
      progress.current = Math.min(window.scrollY / window.innerHeight, 1);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return progress;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}

function isWebglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// One point of light chasing around the primary ring on a loop, dragging
// a fading trail behind it — the same "small bright segment traveling a
// fixed loop forever" idea as Experience's trail-light and the navbar's
// torch, just in 3D, now with an actual tail instead of a bare dot so it
// reads as motion at a glance instead of "a point that happens to move."
function TravelingSpark({ radius, color }: { radius: number; color: string }) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * 0.6;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0);
  });
  return (
    // Trail's `width` prop maps to `lineWidth: 0.1 * width` internally
    // (drei's Trail.js) — 2.2 was over 10x a sane value, which is what
    // rendered as a wide pale streak instead of a thin glowing line.
    <Trail width={0.3} length={2.5} decay={1.6} color={color} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

// The brand mark (BrandMark.tsx's round "R" badge — navbar/footer/
// favicon) reimagined as a small orbital system rather than a literal
// scaled-up badge or a stock wireframe-icosahedron (the single most
// common three.js tutorial primitive — "generic" was the exact right
// word for it). Three independent rings on different axes/speeds read
// as mechanical and alive the way one spinning shape doesn't; the core
// uses MeshDistortMaterial so it visibly breathes rather than sitting
// as a flat static fill; a spark with a real trail travels the primary
// ring on a loop; a large, very faint wireframe sphere encloses the
// whole system — a containment field, not another visible layer — for
// depth without adding visual noise.
function OrbitalMark({
  reducedMotion,
  accentColor,
  accentSecondaryColor,
  outerMeshColor,
  coreOpacity,
  scrollProgress,
}: {
  reducedMotion: boolean;
  accentColor: string;
  accentSecondaryColor: string;
  outerMeshColor: string;
  coreOpacity: number;
  scrollProgress: RefObject<number>;
}) {
  const groupRef = useRef<Group>(null);
  const ring1 = useRef<Mesh>(null);
  const ring2 = useRef<Mesh>(null);
  const ring3 = useRef<Mesh>(null);
  const tilt = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Cursor and scroll drive the same tilt/spin, not two separate
    // effects competing for the object — scrolling past Hero reads as
    // the scene winding up and settling into a new resting tilt, the
    // same physical "the thing you're leaving keeps a little momentum"
    // feel the cursor pull already has, rather than an unrelated bolt-on.
    const scroll = reducedMotion ? 0 : scrollProgress.current;

    if (!reducedMotion) {
      if (ring1.current) ring1.current.rotation.z = t * (0.22 + scroll * 0.35);
      if (ring2.current) ring2.current.rotation.x = t * (0.16 + scroll * 0.28);
      if (ring3.current) ring3.current.rotation.y = t * (0.28 + scroll * 0.4);
    }

    const group = groupRef.current;
    if (!group) return;

    if (reducedMotion) {
      group.rotation.set(0.35, 0.5, 0);
      return;
    }

    const target = { x: -state.pointer.y * 0.22 - scroll * 0.3, z: state.pointer.x * 0.14 + scroll * 0.2 };
    tilt.current.x += (target.x - tilt.current.x) * 0.06;
    tilt.current.y += (target.z - tilt.current.y) * 0.06;
    group.rotation.x = tilt.current.x;
    group.rotation.z = tilt.current.y;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.15, 32, 20]} />
        <meshBasicMaterial color={outerMeshColor} wireframe transparent opacity={0.05} />
      </mesh>

      {/* Opaque in dark mode for the documented reason below; light mode
          trades a little of that reliability for a lighter, less "solid
          blob" look, at coreOpacity=0.88 (not lower — the depth-sorting
          artifact this comment warns about becomes visible past ~0.8).
          Original note: a transparent core meant depth sorting against it
          was per-object, not per-pixel (three.js's normal transparency
          limitation), which is why the ring/trail behind it could still
          show through when they shouldn't. Solid occludes correctly and
          reliably, full stop, at the cost of the glassier look
          translucency would have given it. */}
      <mesh>
        <icosahedronGeometry args={[0.62, 3]} />
        <MeshDistortMaterial
          color={accentColor}
          factor={reducedMotion ? 0 : 0.4}
          speed={reducedMotion ? 0 : 1.6}
          roughness={0.3}
          metalness={0.15}
          transparent={coreOpacity < 1}
          opacity={coreOpacity}
        />
      </mesh>

      <mesh ref={ring1} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.55, 0.014, 16, 100]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.85} />
        {/* Nested inside ring1 (not a sibling with a matching radius) so
            it inherits ring1's actual transform — tilt and spin both —
            instead of tracing its own flat circle that only coincidentally
            shared ring1's radius. This is what makes it actually hug the
            ring as it turns, rather than drift out of alignment with it. */}
        {!reducedMotion && <TravelingSpark radius={1.55} color={accentColor} />}
      </mesh>
      <mesh ref={ring2} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1.72, 0.01, 16, 100]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[1.38, 0.009, 16, 100]} />
        <meshBasicMaterial color={accentSecondaryColor} transparent opacity={0.45} />
      </mesh>

      <Sparkles
        count={36}
        scale={4}
        size={2.2}
        speed={reducedMotion ? 0 : 0.3}
        color={accentColor}
        opacity={0.5}
      />
    </group>
  );
}

// Same round/gradient-ring language as BrandMark.tsx, just big — for the
// WebGL-unavailable case, so that slot is never just empty space. Plain
// browser CSS here (unlike the favicon/OG copies), so this uses the
// exact same padding/mask ring technique BrandMark.tsx does, not a
// Satori-safe workaround.
function StaticMarkFallback({ accentColor }: { accentColor: string }) {
  return (
    <div aria-hidden="true" className="relative flex aspect-square w-full items-center justify-center rounded-full">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          padding: "2px",
          backgroundImage: "var(--gradient-signature)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <span className="font-mono text-6xl font-bold" style={{ color: accentColor }}>
        R
      </span>
    </div>
  );
}

export function HeroMark3D() {
  const reducedMotion = usePrefersReducedMotion();
  const [webglAvailable] = useState(isWebglAvailable);
  const theme = useTheme();
  const scrollProgress = useScrollProgressRef();

  if (!webglAvailable) {
    return <StaticMarkFallback accentColor={ACCENT[theme]} />;
  }

  return (
    // rounded-full + overflow-hidden — the canvas itself is a plain
    // square DOM element, and the containment sphere/sparkles are big
    // enough to reach its straight edges (most visible near the
    // corners, since a circle never reaches a square's corners but
    // this content does). Masking the box into a circle crops that
    // cleanly instead of tuning every element's size to just barely
    // avoid it — and a round porthole matches the round brand mark
    // this whole scene already is.
    <div className="aspect-square w-full overflow-hidden rounded-full">
        {/* distance 5 with this fov only gave ~3.84 units of visible
            height — smaller than the containment sphere's own 4.3-unit
            diameter, so the camera's rectangular viewport was clipping
            it before the circular DOM mask ever got a chance to. 7
            gives real margin (~5.4 visible) instead of a near-exact fit. */}
      <Canvas camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        {/* 40/20 (physically-correct point-light units, this close to
            the mesh) were blowing the core's specular highlight out to
            a flat white hotspot instead of tinting it — this is what
            actually made the whole thing read as "white," more than
            the trail did. */}
        <ambientLight intensity={AMBIENT_INTENSITY[theme]} />
        <pointLight position={[3, 2, 4]} intensity={3} color={ACCENT[theme]} />
        <pointLight position={[-3, -2, -3]} intensity={1.5} color={ACCENT_SECONDARY[theme]} />
        <Float
          speed={reducedMotion ? 0 : 1.1}
          rotationIntensity={reducedMotion ? 0 : 0.35}
          floatIntensity={reducedMotion ? 0 : 0.7}
        >
          <OrbitalMark
            reducedMotion={reducedMotion}
            accentColor={ACCENT[theme]}
            accentSecondaryColor={ACCENT_SECONDARY[theme]}
            outerMeshColor={OUTER_MESH_COLOR[theme]}
            coreOpacity={CORE_OPACITY[theme]}
            scrollProgress={scrollProgress}
          />
        </Float>
      </Canvas>
    </div>
  );
}
