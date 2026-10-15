import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, Shirt, Scissors, Home } from "lucide-react";
import garden from "@/assets/garden-courtyard.jpg";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

const romanNumerals = ["I", "II", "III", "IV", "V"];

const serviceIcons: Record<string, typeof Shirt> = {
  Shirt,
  Scissors,
  Sparkles,
  Home,
};

/** Illustrated wedding celebrations timeline stitched together with an animated vine. */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 60%"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="celebrations" className="relative overflow-hidden px-5 py-24">
      <img
        src={garden}
        alt=""
        aria-hidden
        loading="lazy"
        width={1536}
        height={1024}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--ivory) 78%, transparent) 30%, color-mix(in oklab, var(--ivory) 78%, transparent) 70%, var(--ivory) 100%)",
        }}
      />

      <div className="mx-auto max-w-3xl">
        <SectionTitle
          eyebrow="Itinerary & Auspicious Ceremonies"
          title="Wedding Celebrations"
          note="Join us in every step of this joyous 3-day celebration"
        />
        <Ornament className="mt-8" />

        {/* Auspicious Major Celebrations */}
        <div ref={ref} className="relative mt-16 pl-12 sm:pl-16">
          {/* Animated vine that draws down as the guest scrolls */}
          <svg
            aria-hidden
            className="absolute top-0 left-3 h-full w-8 sm:left-5 pointer-events-none"
            viewBox="0 0 40 1200"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M20 0 C34 140, 6 260, 20 400 C34 540, 6 680, 20 820 C34 960, 6 1080, 20 1200"
              stroke="var(--olive)"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.65"
              style={{ pathLength: draw }}
            />
            {[120, 380, 690, 1010].map((y, i) => (
              <motion.ellipse
                key={y}
                cx={i % 2 ? 30 : 10}
                cy={y}
                rx="9"
                ry="4.5"
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
                <Reveal delay={i * 0.06}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="plate paper-grain relative rounded-[1.8rem] px-6 py-7 sm:px-8 border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] shadow-sm"
                  >
                    {/* Badge */}
                    <span
                      className="absolute -left-[3.15rem] top-7 flex h-9 w-9 items-center justify-center rounded-full font-display text-xs text-primary-foreground sm:-left-[4.3rem] shadow-sm font-semibold"
                      style={{ background: "var(--gradient-gold)" }}
                    >
                      {romanNumerals[i] || String(i + 1)}
                    </span>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color-mix(in_oklab,var(--gold)_20%,transparent)] pb-3">
                      <div>
                        <span className="font-sans text-[0.62rem] tracking-[0.25em] text-gold-deep uppercase font-bold">
                          {event.day}
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-wide text-primary">
                          {event.name}
                        </h3>
                      </div>
                      <span className="rounded-full bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] px-3 py-1 font-sans text-[0.62rem] sm:text-xs tracking-[0.16em] text-gold-deep font-semibold">
                        {event.date}
                      </span>
                    </div>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {event.description}
                    </p>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2.5 text-primary/85">
                        <Clock size={16} className="text-gold-deep shrink-0" />
                        <span className="font-sans text-xs sm:text-sm font-medium">
                          {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-primary/85">
                        <MapPin size={16} className="text-gold-deep shrink-0" />
                        <span className="font-sans text-xs sm:text-sm font-medium">
                          {event.venue}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[color-mix(in_oklab,var(--gold)_15%,transparent)] flex items-center justify-between">
                      <span className="font-script text-sm sm:text-base text-gold-deep italic">
                        Venue: {event.venue}
                      </span>
                      <a
                        href={
                          event.mapsUrl ||
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans text-[0.62rem] tracking-[0.2em] uppercase text-primary hover:text-gold-deep transition-colors font-semibold"
                      >
                        <MapPin size={13} /> View Map
                      </a>
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
            note="From arrivals to joyful farewells at Ananta Spa & Resort"
          />
          <Ornament className="mt-8" />

          {/* Day selection tabs */}
          <div className="mt-10 flex justify-center gap-2 sm:gap-3">
            {invitation.itineraryDays.map((day, idx) => (
              <button
                key={day.dayLabel}
                type="button"
                onClick={() => setActiveDay(idx)}
                className={`rounded-full px-5 py-2.5 font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 font-semibold cursor-pointer ${
                  activeDay === idx
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "glass-plate text-primary/70 hover:text-primary"
                }`}
              >
                {day.dayLabel}
              </button>
            ))}
          </div>

          {/* Active day events panel */}
          <Reveal delay={0.1} className="mt-8">
            <div className="plate paper-grain rounded-[2rem] p-6 sm:p-8 border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] shadow-md">
              <div className="text-center pb-6 border-b border-[color-mix(in_oklab,var(--gold)_20%,transparent)]">
                <span className="font-sans text-[0.62rem] tracking-[0.3em] uppercase text-gold-deep font-bold">
                  {invitation.itineraryDays[activeDay]?.dateLabel}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-primary font-medium mt-1">
                  {invitation.itineraryDays[activeDay]?.theme}
                </h3>
              </div>

              <div className="mt-6 divide-y divide-[color-mix(in_oklab,var(--gold)_15%,transparent)]">
                {invitation.itineraryDays[activeDay]?.events.map((ev, i) => (
                  <div key={i} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-lg text-primary font-semibold">
                          {ev.title}
                        </h4>
                        {ev.is24hr && (
                          <span className="rounded-full bg-gold-deep/15 px-2 py-0.5 text-[0.55rem] tracking-[0.15em] uppercase text-gold-deep font-semibold">
                            Round the Clock
                          </span>
                        )}
                      </div>
                      <p className="font-script text-sm sm:text-base text-gold-deep italic">
                        {ev.venue}
                      </p>
                      {ev.note && (
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {ev.note}
                        </p>
                      )}
                    </div>
                    <span className="font-sans text-xs tracking-wider text-primary/80 font-medium shrink-0 self-start sm:self-center bg-[color-mix(in_oklab,var(--ivory)_80%,transparent)] px-3 py-1 rounded-full border border-[color-mix(in_oklab,var(--gold)_20%,transparent)]">
                      {ev.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Dedicated Guest Services */}
        <div className="mt-24">
          <SectionTitle
            eyebrow="Hospitality & Care"
            title="Guest Services"
            note="Thoughtfully arranged for your comfort and convenience"
          />
          <Ornament className="mt-8" />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {invitation.guestServices.map((service, idx) => {
              const IconComp = serviceIcons[service.icon] || Sparkles;
              return (
                <Reveal key={service.title} delay={idx * 0.08}>
                  <div className="plate paper-grain rounded-[1.6rem] p-6 border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] h-full shadow-xs">
                    <IconComp className="text-gold-deep" size={22} strokeWidth={1.5} />
                    <h4 className="mt-3 font-display text-xl text-primary font-medium">
                      {service.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
