"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";

interface PageVideoBannerProps {
  desktopVideo: string;
  desktopPoster: string;
  mobileVideo: string;
  mobilePoster: string;
  className?: string;
}

/**
 * Reusable per-page cinematic video banner — used independently by
 * each interior page that has its own dedicated video (Services,
 * Industries, About, ...). Deliberately NOT the cross-page-persistent
 * approach attempted earlier: that required splitting a URL segment's
 * ownership across a route group and a plain sibling folder (for
 * pages with a [slug] dynamic child, like /services), which Next.js's
 * router does not actually support — it broke the production build
 * ("You cannot have two parallel pages that resolve to the same
 * path"). This component is deliberately simple and self-contained
 * per page instead.
 *
 * Loads only ONE video at a time: on mount, a matchMedia check
 * determines desktop vs. mobile and only that <video> element is ever
 * rendered — the other version's file is never requested at all (not
 * just hidden via CSS). Before that check resolves (the brief instant
 * before hydration/mount), only the static poster renders — cheap,
 * and viewport-agnostic, so there's no incorrect flash of the wrong
 * version and no double-loading.
 *
 * Respects prefers-reduced-motion (poster only, no video, no
 * autoplay). Muted, playsInline, loops. Always behind content — the
 * caller is responsible for giving this an appropriately positioned,
 * sized wrapper (position: relative on the parent, this component
 * fills it via absolute inset-0) and for layering real page content
 * above it; no text is ever baked into this component.
 */
export function PageVideoBanner({
  desktopVideo,
  desktopPoster,
  mobileVideo,
  mobilePoster,
  className = "",
}: PageVideoBannerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_BREAKPOINT);
    setIsDesktop(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Before the viewport check resolves, show a poster that's correct
  // either way is impossible to guarantee without knowing the
  // viewport — default to the desktop poster (most common first paint
  // on non-mobile devices) since this window is extremely brief and
  // purely visual (no video/asset is loaded twice regardless).
  const activePoster = isDesktop === false ? mobilePoster : desktopPoster;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={activePoster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {!shouldReduceMotion && isDesktop !== null && (
        <video
          key={isDesktop ? "desktop" : "mobile"}
          src={isDesktop ? desktopVideo : mobileVideo}
          poster={activePoster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
