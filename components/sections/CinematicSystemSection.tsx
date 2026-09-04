"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, type MotionValue } from "framer-motion";
import { ScrollDrivenVideo } from "@/components/motion/ScrollDrivenVideo";

const DESKTOP_VIDEO = "/media/gia-cinematic-desktop.mp4";
const DESKTOP_POSTER = "/media/gia-cinematic-desktop-poster.jpg";
const MOBILE_VIDEO = "/media/gia-cinematic-mobile.mp4";
const MOBILE_POSTER = "/media/gia-cinematic-mobile-poster.jpg";

const stageDescriptions = {
  en: [
    "Understand the business before choosing the channel.",
    "Connect the right channels to a clear strategy.",
    "Turn attention into qualified opportunities.",
    "Capture and manage every opportunity systematically.",
    "Improve the journey from opportunity to customer.",
    "Build a stronger foundation for sustainable growth.",
  ],
  ar: [
    "فهم العمل قبل اختيار القناة.",
    "ربط القنوات المناسبة باستراتيجية واضحة.",
    "تحويل الاهتمام إلى فرص مؤهلة.",
    "التقاط كل فرصة وإدارتها بطريقة منهجية.",
    "تحسين الرحلة من الفرصة إلى العميل.",
    "بناء أساس أقوى لنمو مستدام.",
  ],
} as const;

export function CinematicSystemSection({
  stages,
  arabic,
}: {
  stages: string[];
  arabic: boolean;
}) {
  return (
    <section className="bg-surface py-16 sm:py-20 lg:py-28" aria-labelledby="gia-cinematic-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-8 lg:mb-12">
          <div className={arabic ? "text-right" : "text-left"} dir={arabic ? "rtl" : "ltr"}>
            <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-gold">
              GIA / DIGITAL MARKETING ADVISORY
            </p>
            <h2 id="gia-cinematic-heading" className={`mt-3 max-w-3xl text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl lg:text-4xl ${arabic ? "font-heading-ar" : "font-heading"}`}>
              {arabic ? "من الاستراتيجية إلى النمو — كنظام واحد مترابط." : "From strategy to growth — as one connected system."}
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-xs leading-5 text-muted lg:block" dir={arabic ? "rtl" : "ltr"}>
            {arabic ? "مرّر لاكتشاف كيف تتصل كل مرحلة بالتي تليها." : "Scroll to see how each stage connects to the next."}
          </p>
        </div>

        <DesktopExperience stages={stages} arabic={arabic} />
        <MobileExperience stages={stages} arabic={arabic} />
      </div>
    </section>
  );
}

function DesktopExperience({ stages, arabic }: { stages: string[]; arabic: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const activeIndex = useActiveStage(scrollYProgress, stages.length);
  const descriptions = arabic ? stageDescriptions.ar : stageDescriptions.en;

  return (
    <div ref={sectionRef} className="relative hidden lg:block">
      <div className="relative min-h-[145vh]">
        <div className="sticky top-20 grid min-h-[72vh] grid-cols-[minmax(260px,0.72fr)_minmax(0,1.55fr)] items-center gap-12 xl:gap-16">
          <div className={arabic ? "order-2 text-right" : "order-1 text-left"} dir={arabic ? "rtl" : "ltr"}>
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-muted">
                {arabic ? "رحلة النمو" : "Growth journey"}
              </span>
            </div>

            <div className="space-y-0">
              {stages.map((stage, index) => {
                const active = index === activeIndex;
                return (
                  <div
                    key={`${stage}-${index}`}
                    className={`relative border-b border-border py-4 transition-all duration-300 ${active ? "opacity-100" : "opacity-45"}`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`mt-1 shrink-0 font-heading text-[10px] tracking-[0.18em] ${active ? "text-gold" : "text-muted"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className={`text-xl font-semibold tracking-[-0.025em] ${active ? "text-ink" : "text-ink/70"} ${arabic ? "font-heading-ar" : "font-heading"}`}>
                          {stage}
                        </p>
                        <motion.p
                          initial={false}
                          animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0, marginTop: active ? 6 : 0 }}
                          className={`overflow-hidden text-xs leading-5 text-muted ${arabic ? "font-heading-ar" : "font-body"}`}
                        >
                          {descriptions[index]}
                        </motion.p>
                      </div>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{ scaleX: active ? 1 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35 }}
                      style={{ transformOrigin: arabic ? "right" : "left" }}
                      className="absolute bottom-[-1px] h-px w-16 bg-gold"
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-muted">
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</span>
              <span>{arabic ? "مرّر للأسفل" : "Keep scrolling"}</span>
            </div>
          </div>

          <div className={arabic ? "order-1" : "order-2"}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] bg-ink shadow-[0_28px_80px_rgba(0,0,0,0.13)]">
              <ScrollDrivenVideo
                src={DESKTOP_VIDEO}
                poster={DESKTOP_POSTER}
                progress={scrollYProgress}
                className="absolute inset-0"
                reduceMotion={reduceMotion}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7" dir={arabic ? "rtl" : "ltr"}>
                <span className="font-heading text-[9px] uppercase tracking-[0.24em] text-white/65">GIA</span>
                <span className="font-heading text-[9px] tracking-[0.2em] text-white/60">{String(activeIndex + 1).padStart(2, "0")}</span>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7" dir={arabic ? "rtl" : "ltr"}>
                <motion.p
                  key={activeIndex}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                  className={`text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl ${arabic ? "font-heading-ar" : "font-heading"}`}
                >
                  {stages[activeIndex]}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileExperience({ stages, arabic }: { stages: string[]; arabic: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const activeIndex = useActiveStage(scrollYProgress, stages.length);
  const descriptions = arabic ? stageDescriptions.ar : stageDescriptions.en;

  return (
    <div ref={sectionRef} className="lg:hidden" dir={arabic ? "rtl" : "ltr"}>
      <div className="relative mb-7 overflow-hidden rounded-[12px] bg-ink shadow-[0_22px_60px_rgba(0,0,0,0.12)]">
        <div className="relative aspect-[9/14] max-h-[620px] min-h-[430px]">
          <div className="absolute inset-0">
            <ScrollDrivenVideo
              src={MOBILE_VIDEO}
              poster={MOBILE_POSTER}
              progress={scrollYProgress}
              className="absolute inset-0"
              reduceMotion={reduceMotion}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5" dir={arabic ? "rtl" : "ltr"}>
            <span className="font-heading text-[9px] uppercase tracking-[0.24em] text-white/65">GIA / DIGITAL MARKETING ADVISORY</span>
            <span className="font-heading text-[9px] tracking-[0.2em] text-white/60">{String(activeIndex + 1).padStart(2, "0")}</span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
            <motion.p
              key={activeIndex}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className={`text-3xl font-semibold tracking-[-0.03em] text-white ${arabic ? "font-heading-ar" : "font-heading"}`}
            >
              {stages[activeIndex]}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        {stages.map((stage, index) => {
          const active = index === activeIndex;
          return (
            <div key={`${stage}-${index}`} className={`relative border-b border-border py-4 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-45"}`}>
              <div className="flex items-start gap-4">
                <span className={`mt-1 shrink-0 font-heading text-[10px] tracking-[0.18em] ${active ? "text-gold" : "text-muted"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className={`text-lg font-semibold tracking-[-0.02em] ${active ? "text-ink" : "text-ink/70"} ${arabic ? "font-heading-ar" : "font-heading"}`}>
                    {stage}
                  </p>
                  <p className={`mt-1 text-xs leading-5 text-muted ${active ? "block" : "hidden"} ${arabic ? "font-heading-ar" : "font-body"}`}>
                    {descriptions[index]}
                  </p>
                </div>
              </div>
              {active && <div className={`absolute bottom-[-1px] h-px w-12 bg-gold ${arabic ? "right-0" : "left-0"}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function useActiveStage(progress: MotionValue<number>, count: number) {
  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(value * count)));
    setActive((current) => (current === next ? current : next));
  });

  return active;
}
