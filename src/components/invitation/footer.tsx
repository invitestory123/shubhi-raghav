"use client";

import { Heart, Sparkles } from "lucide-react";
import { Aurora, Reveal, FloralDivider } from "./atmosphere";
import { wedding } from "@/lib/wedding";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-900 px-6 py-20 text-center text-stone-200">
      <Aurora className="opacity-40" />
      <div className="absolute inset-0 bg-stone-950/80" />

      <div className="relative z-10 mx-auto max-w-md">
        <Reveal>
          <div className="flex justify-center text-amber-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <FloralDivider className="my-5" />

          {/* Auspicious Vedic Shloka */}
          <p className="font-display text-xl sm:text-2xl font-medium leading-relaxed text-amber-200">
            मङ्गलम् भगवान् विष्णुः मङ्गलं गरुडध्वजः।<br />
            मङ्गलं पुण्डरीकाक्षो मङ्गलाय तनो हरिः॥
          </p>

          <p className="mx-auto mt-6 max-w-sm text-xs sm:text-sm leading-relaxed text-stone-300 font-serif italic">
            {wedding.closing}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="my-8 h-px bg-amber-500/20" />
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-wide text-amber-100">
            {wedding.bride.name} <span className="italic text-amber-400 font-serif">&amp;</span>{" "}
            {wedding.groom.name}
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-amber-400/90 font-medium">
            {wedding.dateLabel}
          </p>
          <p className="mt-1 text-xs text-stone-400">
            {wedding.venue.name} · {wedding.venue.city}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-2 text-xs text-stone-400">
            <p className="flex items-center gap-1.5">
              Celebrating love & togetherness with family and friends
            </p>
            <p className="flex items-center gap-1.5 text-stone-500 text-[0.7rem]">
              Made with <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> for Shubhi &amp; Raghav
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mt-8">
        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] uppercase tracking-[0.32em] text-amber-500/70 transition-opacity hover:text-amber-400 hover:opacity-100"
        >
          InviteStory
        </a>
      </div>
    </footer>
  );
}
