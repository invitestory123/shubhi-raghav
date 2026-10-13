"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, ChevronDown, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Aurora, FloralDivider } from "./atmosphere";
import { wedding } from "@/lib/wedding";

export function Hero({ start = true }: { start?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const rise = (delay: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 24 },
    animate: start ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-100/60 px-6 py-12 text-center"
    >
      <Aurora className="opacity-50" />

      {/* Royal Arch Frame Accent in Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-8 bottom-12 rounded-[2.5rem] border border-amber-300/30 shadow-inner"
      >
        <span className="absolute inset-2 rounded-[2rem] border border-amber-400/20" />
      </div>

      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : textOpacity }}
        className="relative z-10 mx-auto my-auto flex w-full max-w-lg flex-col items-center pt-8 pb-10"
      >
        {/* Sacred Invocation */}
        <motion.div {...rise(0.05)} className="space-y-1.5">
          <p className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-amber-700">
            {wedding.shloka}
          </p>
          <p className="max-w-md text-[0.8rem] leading-relaxed text-stone-600 font-serif italic">
            {wedding.shlokaSub}
          </p>
        </motion.div>

        <motion.div {...rise(0.2)}>
          <FloralDivider className="my-5" />
        </motion.div>

        <motion.p
          {...rise(0.25)}
          className="text-[0.72rem] uppercase tracking-[0.45em] text-amber-800/80 font-medium"
        >
          Save the Date
        </motion.p>

        {/* Couple Names */}
        <motion.h1 {...rise(0.35)} className="mt-4 font-display text-foreground">
          <span className="block text-5xl sm:text-6xl font-normal tracking-wide text-stone-900 drop-shadow-sm">
            {wedding.bride.name}
          </span>
          <motion.span
            className="my-1 block text-3xl sm:text-4xl italic text-amber-600 font-serif"
            animate={reduce || !start ? {} : { scale: [1, 1.12, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            &amp;
          </motion.span>
          <span className="block text-5xl sm:text-6xl font-normal tracking-wide text-stone-900 drop-shadow-sm">
            {wedding.groom.name}
          </span>
        </motion.h1>

        <motion.p
          {...rise(0.48)}
          className="mt-5 max-w-sm text-xs sm:text-sm leading-relaxed text-stone-600"
        >
          {wedding.blessing}
        </motion.p>

        {/* Event Dates & Destination Badge */}
        <motion.div
          {...rise(0.6)}
          className="mt-8 inline-flex flex-col items-center gap-2 rounded-3xl border border-amber-300/60 bg-white/85 px-8 py-4 shadow-soft backdrop-blur-md"
        >
          <div className="flex items-center gap-2 text-amber-800">
            <CalendarDays className="h-4 w-4 text-amber-600" />
            <p className="font-display text-lg font-semibold tracking-[0.16em] uppercase text-stone-900">
              {wedding.dateLabel}
            </p>
          </div>
          <div className="h-px w-14 bg-amber-400/30" />
          <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-stone-700">
            <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>{wedding.venue.name}, {wedding.venue.city}</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.div
        aria-hidden
        className="relative z-10 flex flex-col items-center gap-1 text-stone-500/80 mb-2"
        animate={reduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] font-medium text-amber-800/70">
          Scroll to explore
        </span>
        <ChevronDown className="h-4 w-4 text-amber-600" />
      </motion.div>
    </section>
  );
}
