import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Copy, Check, ExternalLink, Compass } from "lucide-react";
import mapPlate from "@/assets/map-plate.jpg";
import car from "@/assets/wedding-car.png";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal } from "./Reveal";

export function VenueSection() {
  const [copied, setCopied] = useState(false);

  const mapsUrl =
    invitation.venue.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.venue.mapsQuery)}`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${invitation.venue.name}, ${invitation.venue.city}`
  )}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(invitation.venue.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <section id="venue" className="relative overflow-hidden px-5 py-24">
      {/* Background tone */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--peach) 22%, var(--ivory)) 45%, var(--cream) 100%)",
        }}
      />

      <div className="mx-auto max-w-4xl text-center">
        {/* Header matching user reference: "THE VENUE" -> "Find your way to us" */}
        <Reveal>
          <p className="font-sans text-[0.68rem] tracking-[0.38em] text-gold-deep uppercase font-semibold">
            THE VENUE
          </p>
          <h2 className="mt-2 font-script text-4xl sm:text-5xl md:text-6xl text-primary font-normal tracking-wide italic">
            Find your way to us
          </h2>
        </Reveal>

        {/* Decorative Dashed Path matching reference photo */}
        <Reveal delay={0.06} className="mt-5 flex items-center justify-center gap-2 max-w-md mx-auto">
          <span className="h-2 w-2 rounded-full bg-gold-deep ring-4 ring-gold-deep/20 shrink-0" />
          <div className="relative flex-1 border-t-2 border-dashed border-gold-deep/45" />
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin size={22} className="text-gold-deep fill-gold-deep/20 shrink-0" />
          </motion.div>
        </Reveal>

        <Ornament className="mt-6" />

        {/* Illustrated Map Plate with Vintage Wedding Car (Reference Image 1) */}
        <Reveal delay={0.12} className="mt-10">
          <div className="plate relative overflow-hidden rounded-[2.2rem] border-2 border-[color-mix(in_oklab,var(--gold)_35%,transparent)] shadow-xl bg-card">
            {/* Top Bar with Venue name and status */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-[color-mix(in_oklab,var(--gold)_20%,transparent)] bg-[color-mix(in_oklab,var(--ivory)_85%,transparent)]">
              <div className="flex items-center gap-2">
                <Compass size={16} className="text-gold-deep" />
                <span className="font-sans text-[0.65rem] tracking-[0.24em] text-primary uppercase font-bold">
                  Illustrated Destination Map
                </span>
              </div>
              <span className="rounded-full bg-gold-deep/15 px-3 py-0.5 font-sans text-[0.58rem] tracking-[0.16em] uppercase text-gold-deep font-semibold">
                Jaipur, Rajasthan
              </span>
            </div>

            {/* Main Illustrated Map Artwork */}
            <div className="relative">
              <img
                src={mapPlate}
                alt="Hand-painted illustrated map art of Jaipur with Ananta Spa & Resort"
                loading="lazy"
                width={1280}
                height={1024}
                className="h-72 w-full object-cover sm:h-96 md:h-[28rem] filter saturate-[1.08] contrast-[1.02]"
              />

              {/* Gentle gradient overlay for contrast */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 65%, color-mix(in oklab, var(--cream) 80%, transparent) 100%)",
                }}
              />

              {/* Vintage Wedding Car rolling along the illustrated road */}
              <motion.div
                className="absolute bottom-3 left-2 sm:left-6 w-44 sm:w-64 md:w-72 drop-shadow-lg"
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={car}
                  alt="Vintage wedding car arriving at the resort"
                  loading="lazy"
                  width={1175}
                  height={567}
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              {/* Venue Marker Pin overlay on the map */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="absolute top-1/3 right-1/4 -translate-y-1/2 rounded-full bg-white/95 px-3.5 py-1.5 shadow-lg border border-gold-deep/40 backdrop-blur-sm hidden sm:flex items-center gap-1.5"
              >
                <span className="h-2 w-2 rounded-full bg-rose animate-ping" />
                <span className="font-sans text-[0.65rem] tracking-wider font-bold text-primary">
                  {invitation.venue.name}
                </span>
              </motion.div>
            </div>

            {/* Bottom Venue Card Info & Action Links */}
            <div className="p-6 sm:p-8 bg-[color-mix(in_oklab,var(--card)_95%,var(--cream))] text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="font-sans text-[0.62rem] tracking-[0.28em] text-gold-deep uppercase font-bold">
                    Official Wedding Destination
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-primary mt-1">
                    {invitation.venue.name}
                  </h3>
                  <p className="mt-1.5 font-sans text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed flex items-start gap-1.5">
                    <MapPin size={16} className="text-gold-deep shrink-0 mt-0.5" />
                    <span>{invitation.venue.address}</span>
                  </p>
                </div>

                {/* Direct Venue CTAs */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <motion.a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-sans text-[0.66rem] tracking-[0.2em] text-primary-foreground uppercase shadow-md font-semibold cursor-pointer"
                  >
                    <Navigation size={14} /> Open in Google Maps <ExternalLink size={12} />
                  </motion.a>

                  <motion.button
                    type="button"
                    onClick={handleCopyAddress}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="glass-plate inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 font-sans text-[0.66rem] tracking-[0.18em] text-primary uppercase border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] font-semibold cursor-pointer hover:bg-gold/10"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-olive" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy Address
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Transit & Arrival Guide */}
              <div className="mt-6 pt-5 border-t border-[color-mix(in_oklab,var(--gold)_18%,transparent)] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-background/50 p-3.5 border border-border/50">
                  <p className="font-sans text-[0.58rem] tracking-[0.2em] text-gold-deep uppercase font-bold">
                    Jaipur Airport (JAI)
                  </p>
                  <p className="font-display text-sm sm:text-base text-primary font-medium mt-0.5">
                    ~42 km (approx. 50 mins)
                  </p>
                </div>
                <div className="rounded-xl bg-background/50 p-3.5 border border-border/50">
                  <p className="font-sans text-[0.58rem] tracking-[0.2em] text-gold-deep uppercase font-bold">
                    Railway Station
                  </p>
                  <p className="font-display text-sm sm:text-base text-primary font-medium mt-0.5">
                    ~34 km (approx. 40 mins)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
