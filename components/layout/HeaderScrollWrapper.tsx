"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * Isolates the "compact header on scroll" behavior (Phase 7 priority
 * #8) into the smallest possible client boundary — Header itself stays
 * a Server Component; only this thin wrapper needs the client, and its
 * children (Logo, nav, language switcher, mobile nav — all already
 * built) are passed through unchanged.
 *
 * Deliberately a plain scroll listener + CSS height transition, not
 * Framer Motion: a single height/shadow toggle doesn't need a motion
 * library, and `passive: true` plus a simple boolean threshold (not a
 * continuous rAF loop) keeps this essentially free at scroll time.
 */
export function HeaderScrollWrapper({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b border-border bg-surface transition-[height] duration-300 ${
        isScrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
      }`}
    >
      {children}
    </header>
  );
}
