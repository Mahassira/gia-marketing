"use client";

import { useReducedMotion } from "framer-motion";

const VIDEO_SRC = "/media/services-atmosphere.mp4";
const POSTER_SRC = "/media/services-atmosphere-poster.jpg";

/**
 * The persistent background video shared across /services, /industries,
 * /work, and /insights. This component lives in
 * app/[locale]/(atmosphere)/layout.tsx — a shared layout wrapping only
 * those four routes (a Next.js route group, transparent to the URL:
 * moving a page into "(atmosphere)/" does not change its path at all).
 *
 * Why this achieves "the video keeps playing as you move between these
 * pages": Next.js does NOT remount a layout when navigating between
 * sibling routes that share it — only the nested `children` (each
 * page's own content) swaps out. Since this <video> element lives in
 * the shared layout rather than in any individual page, it is never
 * unmounted while the user clicks between these four pages via normal
 * in-app navigation (<Link>), so playback continues uninterrupted.
 *
 * Real, unavoidable limits (not bugs): a hard refresh, or landing on
 * one of these pages directly from an external link/bookmark, restarts
 * the video from 0 — there is no way to persist actual playback state
 * across a real browser page load. Service detail pages
 * (/services/[slug]) and insight articles (/insights/[slug]) are
 * deliberately NOT part of this route group, so this video never
 * appears there — those get their own separate videos instead.
 *
 * Loops continuously (muted, autoplay, playsInline). Under reduced
 * motion, only the static poster frame is shown — no video element,
 * no autoplay.
 */
export function PersistentBackgroundVideo() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!shouldReduceMotion && (
        <video
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* Restrained scrim for any future text placed over this banner —
          currently none of the four pages overlay text directly on it
          (their existing headings sit below it, unchanged), but this
          keeps it consistent with the same treatment used on Hero. */}
      <div className="absolute inset-0 bg-ink/20" />
    </div>
  );
}
