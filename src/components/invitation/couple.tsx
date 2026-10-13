"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { Reveal, Arabesque, SectionHeading, Skyline } from "./atmosphere";
import { wedding } from "@/lib/wedding";

function CoupleCard({
  name,
  role,
  blurb,
  delay,
  from,
  monogram,
}: {
  name: string;
  role: string;
  blurb: string;
  delay: number;
  from: number;
  monogram: string;
}) {
  const reduce = useReducedMotion();

  return (
    <Reveal delay={delay} className="text-center">
      <motion.div
        className="relative mx-auto w-full max-w-[17rem]"
        initial={reduce ? false : { x: from, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Soft royal halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-b from-amber-400/20 via-rose-300/15 to-amber-200/20 blur-md"
        />

        {/* Card Frame */}
        <div className="relative rounded-3xl border border-amber-300/60 bg-white/90 p-8 shadow-soft backdrop-blur-sm">
          {/* Decorative Corner flourishes */}
          <div className="pointer-events-none absolute inset-2 rounded-2xl border border-amber-400/25" />

          {/* Monogram Crest */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-400/60 bg-gradient-to-tr from-amber-100 via-amber-50 to-white shadow-inner">
            <span className="font-display text-4xl font-bold text-amber-700 tracking-wider">
              {monogram}
            </span>
          </div>

          <h3 className="mt-5 font-display text-3xl font-medium text-stone-900">{name}</h3>
          <p className="mt-1 text-[0.68rem] uppercase tracking-[0.25em] text-amber-700 font-semibold">
            {role}
          </p>

          <div className="my-3 mx-auto h-px w-10 bg-amber-300/60" />

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 font-serif italic">
            &ldquo;{blurb}&rdquo;
          </p>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function Couple() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-stone-50/70 px-6 py-20">
      <Arabesque opacity={0.07} />

      <div className="relative mx-auto max-w-md">
        <SectionHeading kicker="Two Hearts, One Journey" title="The Couple" />

        <div className="mt-12 space-y-10">
          <CoupleCard
            name={wedding.bride.name}
            role={wedding.bride.role}
            blurb={wedding.bride.blurb}
            delay={0.05}
            from={-30}
            monogram="S"
          />

          <motion.div
            className="flex items-center justify-center gap-3 text-amber-600"
            initial={reduce ? false : { scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: "spring", stiffness: 240, damping: 16 }}
          >
            <span className="h-px w-16 bg-amber-400/40" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/50 bg-white shadow-sm font-display text-2xl italic text-amber-600">
              &amp;
            </div>
            <span className="h-px w-16 bg-amber-400/40" />
          </motion.div>

          <CoupleCard
            name={wedding.groom.name}
            role={wedding.groom.role}
            blurb={wedding.groom.blurb}
            delay={0.15}
            from={30}
            monogram="R"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <Skyline />
      </div>
    </section>
  );
}
