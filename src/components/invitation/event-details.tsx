"use client";

import { motion } from "framer-motion";
import {
  CalendarPlus,
  Clock,
  Coffee,
  Crown,
  Flower2,
  HeartHandshake,
  Home,
  Info,
  KeyRound,
  LogOut,
  MapPin,
  Navigation,
  Scissors,
  Shirt,
  Sparkles,
  Sun,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal, Arabesque, Corners, SectionHeading, Skyline } from "./atmosphere";
import { Button } from "@/components/ui/button";
import { downloadInvite, openGoogleCalendar } from "@/lib/calendar";
import { wedding, type ItineraryDay, type ItineraryEvent } from "@/lib/wedding";

function getEventIcon(iconName?: string) {
  switch (iconName) {
    case "KeyRound":
      return <KeyRound className="h-4 w-4 text-amber-600" />;
    case "UtensilsCrossed":
      return <UtensilsCrossed className="h-4 w-4 text-amber-600" />;
    case "Coffee":
      return <Coffee className="h-4 w-4 text-amber-600" />;
    case "Sparkles":
      return <Sparkles className="h-4 w-4 text-amber-600" />;
    case "Utensils":
      return <Utensils className="h-4 w-4 text-amber-600" />;
    case "Flower2":
      return <Flower2 className="h-4 w-4 text-amber-600" />;
    case "Sun":
      return <Sun className="h-4 w-4 text-amber-600" />;
    case "Crown":
      return <Crown className="h-4 w-4 text-amber-600" />;
    case "HeartHandshake":
      return <HeartHandshake className="h-4 w-4 text-amber-600" />;
    case "LogOut":
      return <LogOut className="h-4 w-4 text-amber-600" />;
    default:
      return <Clock className="h-4 w-4 text-amber-600" />;
  }
}

function getServiceIcon(iconName: string) {
  switch (iconName) {
    case "Shirt":
      return <Shirt className="h-5 w-5 text-amber-600" />;
    case "Scissors":
      return <Scissors className="h-5 w-5 text-amber-600" />;
    case "Sparkles":
      return <Sparkles className="h-5 w-5 text-amber-600" />;
    case "Home":
      return <Home className="h-5 w-5 text-amber-600" />;
    default:
      return <Sparkles className="h-5 w-5 text-amber-600" />;
  }
}

export function EventDetails() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const currentDay = wedding.itinerary[selectedDayIndex];

  const addToCalendar = () => {
    openGoogleCalendar();
    toast.success("Opening Google Calendar...", {
      description: `${wedding.weddingDayLabel} · ${wedding.venue.name}`,
    });
  };

  return (
    <section id="itinerary" className="relative overflow-hidden bg-stone-50 px-5 sm:px-6 py-20">
      <Arabesque opacity={0.06} size={110} />
      <div className="relative mx-auto max-w-xl">
        <SectionHeading kicker="Wedding Celebrations" title="Itinerary & Program" />

        {/* Day Selector Tabs */}
        <div className="mt-8 flex rounded-2xl border border-amber-300/60 bg-amber-100/40 p-1.5 shadow-sm">
          {wedding.itinerary.map((day: ItineraryDay, idx: number) => {
            const isActive = selectedDayIndex === idx;
            return (
              <button
                key={day.dayLabel}
                type="button"
                onClick={() => setSelectedDayIndex(idx)}
                className={`relative flex-1 py-2.5 px-2 text-center rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-white text-stone-900 shadow-sm border border-amber-300/40"
                    : "text-stone-600 hover:text-stone-900 hover:bg-white/40"
                }`}
              >
                <span className="block font-display text-sm sm:text-base font-semibold">
                  {day.dayLabel}
                </span>
                <span className="block text-[0.62rem] sm:text-[0.68rem] tracking-wider uppercase opacity-75 font-normal">
                  {idx === 0 ? "3 Dec" : idx === 1 ? "4 Dec" : "5 Dec"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Day Header */}
        <div className="mt-6 text-center">
          <p className="font-display text-2xl sm:text-3xl font-medium text-stone-900">
            {currentDay.dateLabel}
          </p>
          {currentDay.theme && (
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-amber-700 font-semibold">
              {currentDay.theme}
            </p>
          )}
        </div>

        {/* Events Timeline List */}
        <div className="mt-8 space-y-4">
          {currentDay.events.map((evt: ItineraryEvent, i: number) => (
            <Reveal key={`${evt.title}-${i}`} delay={0.04 * i}>
              <motion.div
                whileHover={{ y: -2 }}
                className={`relative rounded-2xl border p-5 transition-all shadow-sm ${
                  evt.is24hr
                    ? "border-amber-400/80 bg-gradient-to-r from-amber-50/90 via-amber-100/40 to-white/90"
                    : "border-amber-200/80 bg-white/90"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-300/60 bg-amber-50">
                      {getEventIcon(evt.icon)}
                    </div>
                    <div>
                      <h4 className="font-display text-lg sm:text-xl font-semibold text-stone-900 leading-snug">
                        {evt.title}
                      </h4>
                      <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                        <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>{evt.venue}</span>
                      </p>
                    </div>
                  </div>

                  {/* Time Badge */}
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-wide ${
                      evt.is24hr
                        ? "bg-amber-600 text-white shadow-sm"
                        : "border border-amber-300/60 bg-amber-50 text-amber-900"
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    <span>{evt.time}</span>
                  </span>
                </div>

                {evt.note && (
                  <p className="mt-3 pl-12 text-xs leading-relaxed text-stone-600 font-normal">
                    {evt.note}
                  </p>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* ================= GUEST HOSPITALITY & SERVICES ================= */}
        <Reveal delay={0.12} className="mt-16">
          <div className="relative rounded-3xl border border-amber-400/60 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40 p-6 sm:p-7 shadow-sm">
            <Corners className="opacity-70" />
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-white px-3.5 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-amber-800 font-semibold shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Hospitality Concierge
              </span>
              <h3 className="mt-2.5 font-display text-2xl sm:text-3xl font-medium text-stone-900">
                Services Available for Guests
              </h3>
              <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-stone-600">
                To ensure your stay is comfortable and worry-free, the following amenities and services are arranged for all our esteemed guests:
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {wedding.guestServices.map((service, idx) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-amber-200/70 bg-white/95 p-4 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 border border-amber-200">
                      {getServiceIcon(service.icon)}
                    </div>
                    <h5 className="font-display text-base font-semibold text-stone-900">
                      {service.title}
                    </h5>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-2xl border border-amber-300/50 bg-amber-100/50 p-3.5 text-xs text-amber-950">
              <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                For Women Salon and Men Grooming scheduling, please enquire directly at the Hospitality Help Desk in the main lobby.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ================= VENUE & MAP DIRECTIONS ================= */}
        <Reveal delay={0.18} className="mt-12">
          <div className="relative rounded-3xl border border-amber-300/60 bg-white/95 p-7 shadow-sm">
            <Corners className="opacity-70" />
            <div className="text-center">
              <p className="text-[0.65rem] uppercase tracking-[0.34em] text-amber-700 font-semibold">
                Destination
              </p>
              <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-stone-900">
                {wedding.venue.name}
              </h3>
              <p className="mt-1 text-xs text-amber-800 font-medium">
                {wedding.venue.city}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                {wedding.venue.address}
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="group relative flex-1 h-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm shadow-sm"
              >
                <a
                  href={wedding.venue.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center gap-2"
                >
                  <Navigation className="h-4 w-4 text-amber-200" />
                  <span>Get Directions (Google Maps)</span>
                </a>
              </Button>

              <Button
                type="button"
                onClick={addToCalendar}
                variant="outline"
                size="lg"
                className="flex-1 h-12 rounded-full border-amber-300 bg-white text-stone-800 hover:bg-amber-50 text-sm font-medium"
              >
                <CalendarPlus className="mr-2 h-4 w-4 text-amber-600" />
                Add to Calendar
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <Skyline />
      </div>
    </section>
  );
}
