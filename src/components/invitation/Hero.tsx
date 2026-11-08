import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroPalace from "@/assets/hero-palace.jpg";
import bougainvillea from "@/assets/bougainvillea.png";
import { LanternField } from "./LanternField";
import { Petals } from "./Petals";
import { invitation } from "@/content/invitation";

/** Chapter one: the palace at dawn, with the sky as the stage. */
export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const skyY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 170]);
  const plateY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 70]);
  const titleY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -60]);
  const fade = useTransform(scrollY, [0, 520], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("countdown-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      {/* Painted sky + palace plate */}
      <motion.div className="absolute inset-0" style={{ y: skyY, scale: 1.08 }}>
        <img
          src={heroPalace}
          alt="Watercolour illustration of a majestic palace beneath a blush dawn sky"
          width={1024}
          height={1536}
          className="h-full w-full object-cover object-bottom"
        />
      </motion.div>

      {/* Soft haze so typography always reads clearly */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--lavender) 22%, transparent) 0%, transparent 34%, color-mix(in oklab, var(--cream) 18%, transparent) 78%, color-mix(in oklab, var(--ivory) 62%, transparent) 100%)",
        }}
      />

      <LanternField count={10} travel={1.1} />
      <Petals count={12} />

      {/* Drifting cloud veils */}
      {!reduced &&
        [0, 1].map((i) => (
          <motion.div
            key={i}
            aria-hidden
            className="pointer-events-none absolute h-40 w-[160%] rounded-full blur-3xl"
            style={{
              top: `${12 + i * 16}%`,
              left: "-30%",
              background: `color-mix(in oklab, var(--ivory) ${34 - i * 10}%, transparent)`,
            }}
            animate={{ x: ["-8%", "18%", "-8%"] }}
            transition={{ duration: 52 + i * 22, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* Birds soaring through the morning sky */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            aria-hidden
            viewBox="0 0 24 8"
            className="pointer-events-none absolute w-4 text-primary/40 sm:w-5"
            style={{ top: `${26 + i * 5}%` }}
            animate={{ x: ["-10vw", "112vw"], y: [0, -14, 6, 0] }}
            transition={{
              duration: 34 + i * 9,
              delay: i * 7,
              repeat: Infinity,
              ease: "linear",
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <path
              d="M1 5C4 1 7 1 10 5M14 5c3-4 6-4 9 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}

      {/* Corner botanicals: blooming bougainvillea */}
      <motion.img
        src={bougainvillea}
        alt=""
        aria-hidden
        width={957}
        height={715}
        className="pointer-events-none absolute -top-6 -left-16 w-52 opacity-90 sm:w-72 md:w-80"
        style={{ y: plateY }}
        animate={reduced ? {} : { rotate: [0, 1.6, -1, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={bougainvillea}
        alt=""
        aria-hidden
        width={957}
        height={715}
        className="pointer-events-none absolute -right-20 bottom-24 w-48 scale-x-[-1] opacity-85 sm:w-64 md:w-72"
        style={{ y: plateY }}
        animate={reduced ? {} : { rotate: [0, -1.4, 1, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Typography in the sky's negative space */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center px-6 pt-[13svh] text-center"
        style={{ y: titleY, opacity: fade }}
      >
        {/* Sacred Invocations */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base font-semibold tracking-wide text-primary/90"
          style={{ fontFamily: "var(--font-devanagari)" }}
        >
          {invitation.invocations.map((inv, idx) => (
            <span
              key={idx}
              className="gold-text px-3 py-1 rounded-full bg-[color-mix(in_oklab,var(--ivory)_65%,transparent)] backdrop-blur-xs shadow-xs"
            >
              {inv}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="mt-4 font-sans text-[0.62rem] tracking-[0.45em] text-primary/75 uppercase sm:text-xs"
        >
          {invitation.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-4xl leading-[1.05] tracking-wide text-primary drop-shadow-[0_2px_18px_rgba(255,255,255,0.7)] sm:text-6xl md:text-7xl font-display"
        >
          <span>{invitation.couple.bride}</span>
          <span className="mx-3 font-script text-2xl italic sm:text-4xl text-gold-deep">&amp;</span>
          <br className="sm:hidden" />
          <span>{invitation.couple.groom}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-2 font-sans text-[0.68rem] tracking-[0.38em] text-primary/70 uppercase sm:text-sm font-semibold"
        >
          Wedding Celebrations
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-4 h-px w-44 origin-center"
          style={{ background: "var(--gradient-gold)" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-3 font-script text-lg sm:text-2xl text-primary/85 italic max-w-md"
        >
          {invitation.hero.blessing}
        </motion.p>

        {/* Date and destination badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.25 }}
          className="mt-6 inline-flex flex-col items-center gap-1.5 rounded-full px-6 py-2.5 sm:px-8 sm:py-3 plate shadow-md"
        >
          <span className="font-sans text-[0.68rem] sm:text-xs tracking-[0.28em] text-gold-deep font-semibold uppercase">
            {invitation.dateLabel}
          </span>
          <span className="font-display text-xs sm:text-sm text-primary tracking-wide">
            {invitation.venue.name} · {invitation.venue.city}
          </span>
        </motion.div>
      </motion.div>

      {/* Royal Animated Scroll Down Indicator with arrow */}
      <motion.button
        type="button"
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-28 sm:bottom-10 md:bottom-12 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group select-none focus:outline-none"
        aria-label="Scroll down to explore invitation"
      >
        <span className="font-sans text-[0.58rem] sm:text-[0.64rem] tracking-[0.32em] uppercase text-primary/75 font-semibold group-hover:text-gold-deep transition-colors">
          Scroll Down
        </span>
        <motion.div
          animate={reduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full glass-plate border border-gold-deep/35 shadow-sm group-hover:border-gold-deep group-hover:bg-gold-deep/15 transition-all"
        >
          <ChevronDown size={17} className="text-gold-deep group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
