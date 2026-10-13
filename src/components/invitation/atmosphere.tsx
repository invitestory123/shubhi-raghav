"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Ambient royal palace glow backdrop in warm gold, rose gold & ivory palette.
 */
export function Aurora({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  const blobs = [
    {
      style: "left-[-15%] top-[-10%] h-[70vh] w-[70vh] bg-amber-400/15",
      anim: { x: [0, 35, 0], y: [0, 25, 0] },
      duration: 18,
    },
    {
      style: "right-[-20%] top-[10%] h-[60vh] w-[60vh] bg-rose-400/15",
      anim: { x: [0, -30, 0], y: [0, 35, 0] },
      duration: 22,
    },
    {
      style: "left-[10%] bottom-[-20%] h-[65vh] w-[65vh] bg-yellow-400/10",
      anim: { x: [0, 25, 0], y: [0, -30, 0] },
      duration: 26,
    },
    {
      style: "right-[5%] bottom-[-10%] h-[45vh] w-[45vh] bg-amber-300/15",
      anim: { x: [0, -20, 0], y: [0, -15, 0] },
      duration: 30,
    },
  ];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full opacity-70 blur-[90px] ${b.style}`}
          animate={reduce ? {} : b.anim}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/** Scroll-triggered fade + gentle rise. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Royal Indian Kalash / Lotus & Paisley floral divider. */
export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-3 text-gold ${className}`}>
      <span className="h-px w-14 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <svg width="36" height="22" viewBox="0 0 36 22" fill="none" className="text-gold">
        {/* Lotus bloom motif */}
        <path
          d="M18 3c2.4 0 4.2 1.8 4.2 4.2 0 2.8-2.4 4.8-4.2 7-1.8-2.2-4.2-4.2-4.2-7C13.8 4.8 15.6 3 18 3Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M18 7c3.5-1 6.5.5 8 3.5-2.5 1.5-5 1.2-8-.5M18 7c-3.5-1-6.5.5-8 3.5 2.5 1.5 5 1.2 8-.5"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.8"
        />
        <circle cx="18" cy="18" r="1.6" fill="currentColor" />
        <circle cx="9" cy="14" r="1.1" fill="currentColor" opacity="0.6" />
        <circle cx="27" cy="14" r="1.1" fill="currentColor" opacity="0.6" />
      </svg>
      <span className="h-px w-14 bg-gradient-to-l from-transparent via-gold/60 to-transparent" />
    </div>
  );
}

/** Regal Indian Jali / Lattice pattern */
const royalJali =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='0.75' opacity='0.35'%3E%3Cpath d='M0 40 Q20 20 40 40 Q60 60 80 40'/%3E%3Cpath d='M0 40 Q20 60 40 40 Q60 20 80 40'/%3E%3Cpath d='M40 0 Q20 20 40 40 Q60 60 40 80'/%3E%3Cpath d='M40 0 Q60 20 40 40 Q20 60 40 80'/%3E%3Ccircle cx='40' cy='40' r='3.5'/%3E%3C/g%3E%3C/svg%3E\")";

export function Arabesque({
  className = "",
  opacity = 0.08,
  size = 80,
}: {
  className?: string;
  opacity?: number;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: royalJali,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        maskImage: "radial-gradient(120% 80% at 50% 50%, black, transparent 80%)",
        WebkitMaskImage: "radial-gradient(120% 80% at 50% 50%, black, transparent 80%)",
      }}
    />
  );
}

/** Ornate gold corner brackets for framed cards. */
export function Corners({ className = "" }: { className?: string }) {
  const corner = (extra: string) => (
    <span aria-hidden className={`pointer-events-none absolute h-6 w-6 border-gold/50 ${extra}`} />
  );
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {corner("left-0 top-0 rounded-tl-2xl border-l-2 border-t-2")}
      {corner("right-0 top-0 rounded-tr-2xl border-r-2 border-t-2")}
      {corner("bottom-0 left-0 rounded-bl-2xl border-b-2 border-l-2")}
      {corner("bottom-0 right-0 rounded-br-2xl border-b-2 border-r-2")}
    </span>
  );
}

/** Regal Rajasthani Palace Silhouette (Jaipur Chhatri & Fortress crest). */
export function Skyline({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className={`relative -mt-px h-16 w-full ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 800 120"
        preserveAspectRatio="none"
        className="h-full w-full text-gold/25"
        fill="none"
      >
        {/* Rolling Aravalli hills base */}
        <path
          d="M0 108h800V96c-50-6-85-18-120-22-35-4-60 6-95 6-30 0-55-14-85-14-40 0-70 12-100 10-35-2-65-16-105-16-45 0-75 14-115 14-40 0-70-12-105-12-35 0-55 8-75 16v32z"
          fill="currentColor"
          opacity="0.22"
        />
        {/* Rajasthani Chhatri Palace Pavilion in the center */}
        <g stroke="currentColor" strokeWidth="1.2" opacity="0.65">
          {/* Main Chhatri dome */}
          <path d="M375 80 V55 C375 42 400 32 400 32 C400 32 425 42 425 55 V80" />
          <path d="M400 32 V20 M396 20 H404" />
          <path d="M370 80 H430" />
          {/* Pillars */}
          <path d="M382 55 V80 M418 55 V80" />
          {/* Side miniature chhatris */}
          <path d="M340 85 V68 C340 58 355 52 355 52 C355 52 370 58 370 68 V85" />
          <path d="M430 85 V68 C430 58 445 52 445 52 C445 52 460 58 460 68 V85" />
          {/* Base ornamental line */}
          <path d="M0 112 H800" strokeWidth="1.4" />
        </g>
      </svg>
    </div>
  );
}

/** Gilded section heading: kicker, gradient title, floral rule. */
export function SectionHeading({
  kicker,
  title,
  className = "",
}: {
  kicker: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={`text-center ${className}`}>
      <p className="text-[0.68rem] uppercase tracking-[0.44em] text-gold font-medium">{kicker}</p>
      <h2 className="mt-2.5 font-display text-[2.5rem] sm:text-[2.8rem] leading-tight text-foreground font-normal tracking-wide">
        {title}
      </h2>
      <FloralDivider className="mt-4" />
    </Reveal>
  );
}
