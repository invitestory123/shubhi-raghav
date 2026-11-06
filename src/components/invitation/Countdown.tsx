import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { invitation } from "@/content/invitation";
import { LanternField } from "./LanternField";
import { SectionTitle, Reveal } from "./Reveal";
import { ScratchDateCard } from "./ScratchDateCard";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="glass-plate relative flex min-w-[4.6rem] flex-col items-center rounded-2xl px-3 py-4 sm:min-w-[6rem] sm:px-5 sm:py-6 shadow-sm border border-[color-mix(in_oklab,var(--gold)_30%,transparent)]">
      {/* Subtle sparkling glow */}
      <span className="pointer-events-none absolute -top-1.5 -right-1.5 text-amber-400/80 animate-pulse">
        ✦
      </span>
      <div className="relative h-9 overflow-hidden sm:h-12">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: 22, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -22, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block font-display text-3xl text-primary tabular-nums sm:text-4xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 font-sans text-[0.55rem] tracking-[0.3em] text-gold-deep uppercase sm:text-[0.62rem]">
        {label}
      </span>
    </div>
  );
}

/** Decorative shimmering sparkles around the countdown section */
function SparkleAura() {
  const stars = [
    { top: "10%", left: "12%", size: 16, delay: 0, dur: 3 },
    { top: "18%", right: "15%", size: 20, delay: 1, dur: 3.5 },
    { top: "38%", left: "8%", size: 14, delay: 1.8, dur: 2.8 },
    { top: "45%", right: "10%", size: 18, delay: 0.5, dur: 3.2 },
    { top: "70%", left: "14%", size: 15, delay: 2.2, dur: 3.4 },
    { top: "82%", right: "12%", size: 22, delay: 1.2, dur: 4 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, idx) => (
        <motion.div
          key={idx}
          className="absolute text-amber-400/70"
          style={{ top: s.top, left: s.left, right: s.right }}
          animate={{
            scale: [0.3, 1.25, 0.3],
            opacity: [0.15, 0.95, 0.15],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={s.size} />
        </motion.div>
      ))}
    </div>
  );
}

export function Countdown() {
  const target = new Date(invitation.dateISO).getTime();
  const [left, setLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setLeft(diff(target));
    const id = setInterval(() => setLeft(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section id="countdown-section" className="relative overflow-hidden px-5 py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--lavender) 30%, var(--ivory)) 55%, color-mix(in oklab, var(--peach) 26%, var(--ivory)) 100%)",
        }}
      />
      <LanternField count={6} className="opacity-70" travel={1.1} />
      <SparkleAura />

      <div className="relative mx-auto max-w-3xl">
        <SectionTitle
          title="Counting Down to Our Wedding"
        />

        {/* Live Countdown Timer with ambient golden radiance */}
        <div className="relative mt-10">
          {/* Subtle glowing halo behind units */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-80 rounded-full blur-2xl opacity-40 bg-gradient-to-r from-amber-300 via-rose-300 to-amber-300"
          />

          <div className="relative flex flex-wrap justify-center gap-3 sm:gap-4">
            <Unit value={left.days} label="Days" />
            <Unit value={left.hours} label="Hours" />
            <Unit value={left.minutes} label="Minutes" />
            <Unit value={left.seconds} label="Seconds" />
          </div>
        </div>

        {/* Interactive Scratch To Reveal The Wedding Date */}
        <Reveal delay={0.12} className="mt-14">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2">
              <Sparkles size={14} className="text-gold-deep animate-pulse" />
              <span className="font-sans text-[0.62rem] tracking-[0.32em] uppercase text-gold-deep font-bold">
                Save the Date
              </span>
              <Sparkles size={14} className="text-gold-deep animate-pulse" />
            </div>
            <p className="font-script text-xl sm:text-2xl text-primary italic mt-1">
              Scratch below to unveil our wedding date
            </p>
          </div>
          <ScratchDateCard />
        </Reveal>
      </div>
    </section>
  );
}
