import { Panel } from "@/components/layout/Panel";

export function SignatureViz() {
  return (
    <Panel index="01" title="COMMENT-TREE ALGORITHM">
      <p className="max-w-2xl text-text-muted">
        An interactive breakdown of the Reddit Clone&apos;s threaded comment
        system: a linear list resolved into an infinite-depth tree via a
        hash-map lookup, in O(N) time. Hover or scrub a node below.
      </p>
      <div className="mt-8 flex h-64 items-center justify-center rounded border border-dashed border-line font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
        diagram — pending interactive build
      </div>
    </Panel>
  );
}
