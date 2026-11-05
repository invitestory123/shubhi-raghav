import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, MapPin, Calendar } from "lucide-react";
import garden from "@/assets/garden-courtyard.jpg";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

function FormattedNote({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={idx} className="font-bold text-primary">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 60%"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="itinerary" className="relative overflow-hidden px-4 sm:px-6 py-24">
      {/* Background Ambience */}
      <img
        src={garden}
        alt=""
        aria-hidden
        loading="lazy"
        width={1536}
        height={1024}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--ivory) 80%, transparent) 25%, color-mix(in oklab, var(--cream) 80%, transparent) 75%, var(--ivory) 100%)",
        }}
      />

      <div className="mx-auto max-w-4xl">
        {/* Header matching user screenshots */}
        <SectionTitle
          eyebrow="Itinerary & Auspicious Ceremonies"
          title="Wedding Celebrations"
          note="Join us in every step of this joyous 3-day celebration"
        />
        <Ornament className="mt-8" />

        {/* Auspicious Major Celebrations Timeline with Vine and Roman Numerals */}
        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          {/* Animated decorative vine drawing down as guest scrolls */}
          <svg
            aria-hidden
            className="absolute top-0 left-2.5 sm:left-4 h-full w-8 pointer-events-none"
            viewBox="0 0 40 1600"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M20 0 C34 140, 6 280, 20 420 C34 560, 6 700, 20 840 C34 980, 6 1120, 20 1260 C34 1400, 6 1500, 20 1600"
              stroke="var(--olive)"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.65"
              style={{ pathLength: draw }}
            />
            {[90, 290, 510, 730, 950, 1170, 1390].map((y, i) => (
              <motion.ellipse
                key={y}
                cx={i % 2 ? 30 : 10}
                cy={y}
                rx="8"
                ry="4"
                fill="var(--sage)"
                opacity="0.75"
                transform={`rotate(${i % 2 ? 24 : -24} ${i % 2 ? 30 : 10} ${y})`}
                style={{ scale: draw }}
              />
            ))}
          </svg>

          <ol className="space-y-10 sm:space-y-12">
            {invitation.celebrations.map((event, i) => (
              <li key={event.id}>
                <Reveal delay={i * 0.05}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="plate paper-grain relative rounded-[2rem] p-6 sm:p-8 border-2 border-[color-mix(in_oklab,var(--gold)_35%,transparent)] shadow-md"
                  >
                    {/* Roman Numeral Badge */}
                    <span
                      className="absolute -left-[2.85rem] sm:-left-[4.1rem] top-7 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full font-display text-sm sm:text-base text-primary-foreground shadow-md font-bold"
                      style={{ background: "var(--gradient-gold)" }}
                    >
                      {romanNumerals[i] || String(i + 1)}
                    </span>

                    {/* Top Row: Day and Date */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color-mix(in_oklab,var(--gold)_20%,transparent)] pb-3">
                      <div>
                        <span className="font-sans text-[0.66rem] sm:text-xs tracking-[0.25em] text-gold-deep uppercase font-bold">
                          {event.day}
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide text-primary mt-0.5">
                          {event.name}
                        </h3>
                      </div>
                      <span className="rounded-full bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] px-3.5 py-1 font-sans text-xs sm:text-sm tracking-wider text-gold-deep font-semibold">
                        {event.date}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>

                    {/* Special note with elegant dignity and prominence without highlight styling */}
                    {event.specialNote && (
                      <div className="mt-3.5 border-l-2 border-gold-deep/60 pl-3.5 py-1 flex items-center gap-2">
                        <span className="text-gold-deep text-sm select-none">✦</span>
                        <p className="font-sans text-xs sm:text-sm text-primary font-semibold tracking-wide">
                          <span className="text-gold-deep uppercase tracking-wider text-[0.68rem] font-bold mr-1.5">
                            Note:
                          </span>
                          {event.specialNote}
                        </p>
                      </div>
                    )}

                    {/* Circled part: Time and Venue with LARGE BOLD FONT for elders & hall/lawn only */}
                    <div className="mt-5 rounded-2xl bg-[color-mix(in_oklab,var(--card)_80%,transparent)] p-4 sm:p-5 border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] shadow-2xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                        {/* Time */}
                        <div className="flex items-center gap-2.5 font-sans text-base sm:text-lg md:text-xl font-bold text-primary">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-deep/15 text-gold-deep shrink-0">
                            <Clock size={19} strokeWidth={2.2} />
                          </span>
                          <span>{event.time}</span>
                        </div>

                        {/* Venue (Hall or Lawn name only) */}
                        <div className="flex items-center gap-2.5 font-sans text-base sm:text-lg md:text-xl font-bold text-primary">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-deep/15 text-gold-deep shrink-0">
                            <MapPin size={19} strokeWidth={2.2} />
                          </span>
                          <span>{event.venue}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Detailed 3-Day Itinerary Guide */}
        <div className="mt-24">
          <SectionTitle
            eyebrow="Detailed Schedule"
            title="Celebration Itinerary"
            note="From arrivals to joyful farewells across all 3 days"
          />
          <Ornament className="mt-8" />

          {/* Day selection tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {invitation.itineraryDays.map((day, idx) => (
              <button
                key={day.dayLabel}
                type="button"
                onClick={() => setActiveDay(idx)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 font-semibold cursor-pointer ${
                  activeDay === idx
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "glass-plate text-primary/75 hover:text-primary border border-[color-mix(in_oklab,var(--gold)_35%,transparent)]"
                }`}
              >
                <Calendar size={14} className={activeDay === idx ? "text-primary-foreground" : "text-gold-deep"} />
                <span>{day.dayLabel}</span>
                <span className="text-[0.66rem] opacity-80">
                  ({idx === 0 ? "3 Dec" : idx === 1 ? "4 Dec" : "5 Dec"})
                </span>
              </button>
            ))}
          </div>

          {/* Active day events panel with large, clear font sizes and matching highlighted pills for time and venue */}
          <Reveal delay={0.1} className="mt-8">
            <div className="plate paper-grain rounded-[2.2rem] p-6 sm:p-9 border-2 border-[color-mix(in_oklab,var(--gold)_35%,transparent)] shadow-lg">
              <div className="text-center pb-6 border-b border-[color-mix(in_oklab,var(--gold)_25%,transparent)]">
                <span className="font-sans text-[0.66rem] sm:text-xs tracking-[0.3em] uppercase text-gold-deep font-bold">
                  {invitation.itineraryDays[activeDay]?.dateLabel}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-medium mt-1">
                  {invitation.itineraryDays[activeDay]?.theme}
                </h3>
              </div>

              <div className="mt-6 divide-y divide-[color-mix(in_oklab,var(--gold)_20%,transparent)]">
                {invitation.itineraryDays[activeDay]?.events.map((ev, i) => (
                  <div
                    key={i}
                    className="py-5 first:pt-2 last:pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-display text-lg sm:text-xl md:text-2xl text-primary font-semibold">
                          {ev.title}
                        </h4>
                        {ev.is24hr && (
                          <span className="rounded-full bg-gold-deep/15 px-2.5 py-0.5 text-[0.58rem] tracking-wider uppercase text-gold-deep font-bold">
                            Round the Clock
                          </span>
                        )}
                      </div>

                      {ev.note && (
                        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          <FormattedNote text={ev.note} />
                        </p>
                      )}
                    </div>

                    {/* Both Venue and Time highlighted in matching prominent pills */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-center mt-1 md:mt-0">
                      {/* Highlighted Venue Pill */}
                      <span className="font-sans text-xs sm:text-sm tracking-wide text-primary font-bold bg-[color-mix(in_oklab,var(--ivory)_95%,transparent)] px-3.5 py-1.5 rounded-full border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] shadow-2xs flex items-center gap-1.5">
                        <MapPin size={15} className="text-gold-deep shrink-0" />
                        {ev.venue}
                      </span>

                      {/* Highlighted Time Pill */}
                      <span className="font-sans text-xs sm:text-sm tracking-wide text-primary font-bold bg-[color-mix(in_oklab,var(--ivory)_95%,transparent)] px-3.5 py-1.5 rounded-full border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] shadow-2xs flex items-center gap-1.5">
                        <Clock size={15} className="text-gold-deep shrink-0" />
                        {ev.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
