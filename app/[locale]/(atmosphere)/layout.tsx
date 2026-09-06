import type { ReactNode } from "react";
import { PersistentBackgroundVideo } from "@/components/motion/PersistentBackgroundVideo";

/**
 * Shared layout for /services, /industries, /work, /insights — a
 * Next.js route group ("(atmosphere)"), which is transparent to the
 * URL (these pages' paths are completely unchanged). Its purpose is
 * narrow: host the persistent background video banner these four
 * pages share (see PersistentBackgroundVideo.tsx for why this specific
 * file location is what makes cross-page playback continuity work).
 *
 * Each page's own existing content (breadcrumb, heading, grids, etc.)
 * renders via {children} completely unchanged, in normal document
 * flow, directly below this banner — this layout does not alter any
 * of those pages' own markup or design.
 */
export default function AtmosphereLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative h-[45vh] min-h-[320px] sm:h-[50vh] lg:h-[55vh]">
        <PersistentBackgroundVideo />
      </div>
      {children}
    </>
  );
}
