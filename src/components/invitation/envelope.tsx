"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, Music, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

/** Ornate gilded corner flourish */
function RoyalCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      className={`pointer-events-none absolute h-16 w-16 text-amber-500/60 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M2 62V22C2 11 11 2 22 2h40" />
      <path d="M8 62V24c0-9 7-16 16-16h38" opacity="0.6" />
      <path d="M14 30c8 0 14-6 14-14" opacity="0.8" />
      <circle cx="21" cy="21" r="2.5" fill="currentColor" stroke="none" />
      <path d="M28 16c5-4 11-4 16 0-5 4-11 4-16 0Z" opacity="0.9" />
      <path d="M16 28c-4 5-4 11 0 16 4-5 4-11 0-16Z" opacity="0.9" />
    </svg>
  );
}

export function EnvelopeIntro({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="royal-intro-overlay"
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-stone-950 px-4 select-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpening ? 0 : 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient warm palace glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-stone-950/80 to-stone-950"
          />

          {/* Drifting golden motes */}
          {!reduce &&
            Array.from({ length: 18 }, (_, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="pointer-events-none absolute rounded-full bg-amber-300/60 blur-[1px]"
                style={{
                  left: `${(i * 47) % 100}%`,
                  top: `${(i * 31) % 100}%`,
                  width: 3 + (i % 4),
                  height: 3 + (i % 4),
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.85, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 5 + (i % 4),
                  delay: (i * 0.4) % 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Royal Invitation Card / Envelope */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: isOpening ? 1.08 : 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-3xl border border-amber-500/40 bg-gradient-to-b from-stone-900/95 via-stone-900/90 to-stone-950/95 p-8 sm:p-10 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            {/* Double border frame */}
            <div className="pointer-events-none absolute inset-2.5 rounded-[1.35rem] border border-amber-500/25" />
            <RoyalCorner className="top-1 left-1" />
            <RoyalCorner className="top-1 right-1 scale-x-[-1]" />
            <RoyalCorner className="bottom-1 left-1 scale-y-[-1]" />
            <RoyalCorner className="bottom-1 right-1 scale-[-1]" />

            {/* Sacred Invocations */}
            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-display text-2xl sm:text-3xl font-medium tracking-wide text-amber-300 drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)]"
              >
                {wedding.shloka}
              </motion.p>

              <div className="my-4 flex items-center justify-center gap-3 text-amber-400/80">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/70" />
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/70" />
              </div>

              <p className="text-[0.68rem] uppercase tracking-[0.38em] text-stone-300/80 font-medium">
                Wedding Celebrations
              </p>

              {/* Couple Names */}
              <h1 className="mt-5 font-display text-4xl sm:text-5xl text-amber-100 tracking-wide">
                <span>{wedding.bride.name}</span>
                <span className="mx-2 font-serif italic text-amber-400">&amp;</span>
                <span>{wedding.groom.name}</span>
              </h1>

              {/* Date & Destination */}
              <div className="mt-4 flex flex-col items-center gap-1">
                <p className="font-display text-base tracking-[0.18em] uppercase text-amber-300">
                  {wedding.dateLabel}
                </p>
                <p className="text-xs text-stone-300 tracking-wider">
                  {wedding.venue.name} · {wedding.venue.city}
                </p>
              </div>

              {/* Royal Seal & Tap to Open Button */}
              <motion.div className="mt-8 flex flex-col items-center">
                <motion.button
                  type="button"
                  onClick={handleOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex flex-col items-center focus:outline-none"
                  aria-label="Open Wedding Invitation"
                >
                  {/* Wax Seal Circle */}
                  <motion.div
                    className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-500 shadow-[0_0_25px_rgba(217,119,6,0.5)] border-2 border-amber-300/80"
                    animate={
                      reduce
                        ? {}
                        : {
                            boxShadow: [
                              "0 0 20px rgba(217,119,6,0.35)",
                              "0 0 35px rgba(217,119,6,0.75)",
                              "0 0 20px rgba(217,119,6,0.35)",
                            ],
                          }
                    }
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Inner gold seal imprint */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/50 bg-amber-800/60">
                      <span className="font-display text-xl font-bold tracking-wider text-amber-100">
                        S &amp; R
                      </span>
                    </div>
                  </motion.div>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-stone-900/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.26em] text-amber-200 backdrop-blur-md transition-all group-hover:border-amber-400 group-hover:bg-amber-950/50 group-hover:text-amber-100">
                    <span>Tap to Open Invitation</span>
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
