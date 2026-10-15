import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import sunset from "@/assets/sunset-sky.jpg";
import lanternImg from "@/assets/lantern.png";
import { invitation } from "@/content/invitation";
import { LanternField } from "./LanternField";
import { Ornament } from "./Reveal";

const blessings = [
  "May your evenings always be filled with joy and warmth.",
  `May the sacred journey of ${invitation.couple.bride} & ${invitation.couple.groom} be blessed with abundance.`,
  "May laughter, peace, and prosperity echo in your home forever.",
  "May Lord Ganesha shower divine grace, love, and protection upon you both.",
  "May your bond grow stronger with each passing sunrise.",
];

/** A soft aurora wash — pure CSS, no heavy canvas, cheap on mobile. */
function AuroraGlow() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[70%] w-[70%] rounded-full blur-[90px]"
          style={{
            left: `${i * 26 - 10}%`,
            top: `${8 + i * 12}%`,
            background: [
              "color-mix(in oklab, var(--lavender) 55%, transparent)",
              "color-mix(in oklab, var(--peach) 50%, transparent)",
              "color-mix(in oklab, var(--skyblue) 48%, transparent)",
            ][i],
            mixBlendMode: "screen",
            opacity: 0.55,
          }}
          animate={reduced ? {} : { x: [0, 40, -30, 0], y: [0, -26, 18, 0] }}
          transition={{ duration: 30 + i * 11, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Footer() {
  const [released, setReleased] = useState<{ id: number; text: string; left: number }[]>([]);

  const release = () => {
    const id = Date.now();
    setReleased((prev) => [
      ...prev,
      {
        id,
        text: blessings[Math.floor(Math.random() * blessings.length)]!,
        left: 18 + Math.random() * 64,
      },
    ]);
    setTimeout(() => setReleased((prev) => prev.filter((r) => r.id !== id)), 7000);
  };

  return (
    <footer className="relative overflow-hidden pt-28 pb-14">
      <img
        src={sunset}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--ivory) 40%, transparent) 26%, color-mix(in oklab, var(--lavender) 30%, transparent) 100%)",
        }}
      />
      <AuroraGlow />
      <LanternField count={7} travel={1.05} className="opacity-90" />

      {/* Released wish lanterns */}
      <AnimatePresence>
        {released.map((r) => (
          <motion.div
            key={r.id}
            className="pointer-events-none absolute bottom-10 z-10 flex w-44 flex-col items-center text-center"
            style={{ left: `${r.left}%` }}
            initial={{ y: 0, opacity: 0, scale: 0.7 }}
            animate={{ y: -520, opacity: [0, 1, 1, 0], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 7, ease: "easeOut" }}
          >
            <img
              src={lanternImg}
              alt=""
              width={580}
              height={751}
              className="w-10 drop-shadow-[0_0_18px_color-mix(in_oklab,var(--gold)_65%,transparent)]"
            />
            <span className="mt-2 font-script text-sm text-primary italic font-medium">{r.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-20 mx-auto max-w-xl px-6 text-center">
        <Ornament />

        {/* Warm Blessings Note Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="plate paper-grain mt-10 rounded-3xl p-7 sm:p-9 border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] shadow-md"
        >
          <div className="flex items-center justify-center gap-2 text-gold-deep mb-2">
            <Sparkles size={16} />
            <span className="font-sans text-[0.68rem] tracking-[0.3em] uppercase font-semibold">
              Cordially Invited
            </span>
            <Sparkles size={16} />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-primary font-medium tracking-wide">
            {invitation.note.heading}
          </h3>
          <p className="mt-2 font-script text-xl sm:text-2xl text-gold-deep italic font-medium">
            {invitation.note.subheading}
          </p>
        </motion.div>

        {/* Interactive Wish Lantern Action */}
        <motion.button
          type="button"
          onClick={release}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="glass-plate mt-10 rounded-full px-8 py-3.5 font-sans text-[0.66rem] tracking-[0.3em] text-primary uppercase shadow-sm border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] cursor-pointer font-semibold"
        >
          ✨ Release a wish lantern for {invitation.couple.bride} &amp; {invitation.couple.groom}
        </motion.button>

        {/* With Love and Regards */}
        <div className="mt-14 space-y-1">
          <p className="font-script text-xl text-primary/80 italic">
            {invitation.compliments.regards}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-primary font-medium tracking-wide">
            {invitation.compliments.family}
          </h2>
          {invitation.compliments.firm && (
            <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-gold-deep uppercase font-semibold">
              {invitation.compliments.firm}
            </p>
          )}
        </div>

        <p className="mt-6 font-sans text-[0.62rem] tracking-[0.34em] text-primary/65 uppercase">
          {invitation.dateLabel} · {invitation.venue.name}
        </p>

        <p className="mt-10 inline-flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.3em] text-primary/55 uppercase">
          Made with <Heart size={11} className="fill-rose text-rose" /> for our families and friends
        </p>
      </div>
    </footer>
  );
}
