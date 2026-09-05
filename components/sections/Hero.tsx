"use client";

import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

const DESKTOP_VIDEO = "/media/gia-cinematic-desktop.mp4";
const DESKTOP_POSTER = "/media/gia-cinematic-desktop-poster.jpg";
const MOBILE_VIDEO = "/media/gia-cinematic-mobile.mp4";
const MOBILE_POSTER = "/media/gia-cinematic-mobile-poster.jpg";

interface HeroProps {
  label: string;
  headline: string;
  supportingText: string;
  primaryCta: string;
  secondaryCta: string;
  flowLabels: string[];
  arabic: boolean;
}

/**
 * Hero, merged with the cinematic video experience per explicit
 * request: the approved Cairo/GIA video plays as an ambient background
 * (autoplay, muted, looped — NOT scroll-scrubbed, since this section
 * is visible immediately with no scroll needed), with the existing
 * Hero content (label, H1, supporting text, CTAs) overlaid on top in
 * white/light text. The 6-stage flow diagram that used to sit below
 * the CTAs was removed per explicit request — it was covering the
 * video's own GIA logo reveal; the CTAs were also pushed down slightly
 * so that logo stays clearly visible in the empty space above them.
 *
 * The standalone CinematicSystemSection is no longer rendered on the
 * homepage as a separate section (its scroll-driven multi-viewport
 * treatment was the source of the "large black area" complaint it was
 * built to fix in the first place) — its file is intentionally left
 * in place, unused, rather than deleted, in case it's wanted again.
 *
 * This became a Client Component because it needs useReducedMotion()
 * to decide whether to autoplay the video at all — under reduced
 * motion, only the static poster image is shown, no video element.
 */
export function Hero({
  label,
  headline,
  supportingText,
  primaryCta,
  secondaryCta,
  arabic,
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-ink lg:min-h-screen">
      {/* Background: real approved video, one asset per breakpoint,
          matching the same desktop/mobile split already used elsewhere
          in the project. Poster is always present underneath — never
          hidden via display:none — so there's no blank state while the
          video loads, on error, or under reduced motion. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={DESKTOP_POSTER}
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover lg:block"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MOBILE_POSTER}
        alt=""
        className="absolute inset-0 h-full w-full object-cover lg:hidden"
      />
      {!shouldReduceMotion && (
        <>
          <video
            src={DESKTOP_VIDEO}
            poster={DESKTOP_POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full object-cover lg:block"
          />
          <video
            src={MOBILE_VIDEO}
            poster={MOBILE_POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover lg:hidden"
          />
        </>
      )}
      {/* Restrained scrim — video stays clearly visible, just enough
          for the white headline text to stay legible over bright
          frames (sky, city lights). */}
      <div className="absolute inset-0 bg-ink/35" aria-hidden="true" />

      <Container className="relative flex flex-col gap-10 py-16 sm:py-20 lg:gap-16 lg:py-24">
        <Reveal className="flex max-w-3xl flex-col items-start gap-5 sm:gap-6">
          <span className="text-xs font-medium tracking-wide text-surface/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)] sm:text-sm">
            {label}
          </span>
          <h1
            className={`text-balance text-3xl text-surface sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl [text-shadow:0_2px_12px_rgba(0,0,0,0.35)] ${
              arabic ? "font-heading-ar leading-snug" : "font-heading leading-tight"
            }`}
          >
            {headline}
          </h1>
          <p className="max-w-xl text-base text-surface/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)] sm:text-lg">{supportingText}</p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
            <Button href="/contact" variant="primary" className="w-full sm:w-auto">
              {primaryCta}
            </Button>
            <Button href="/services" variant="onDark" className="w-full sm:w-auto">
              {secondaryCta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
