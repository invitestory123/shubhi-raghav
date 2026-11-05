import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, ExternalLink, X, Disc3, Sparkles } from "lucide-react";

const SPOTIFY_TRACK_ID = "0PKLIjYe9K78lky2LxUz2P";
const SPOTIFY_URL = `https://open.spotify.com/track/${SPOTIFY_TRACK_ID}?si=ysqeijGmReqZrMyBrnvn6A`;

export function BgmPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <>
      {/* Floating Minimized Widget */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2"
        >
          {/* Main Pill Button */}
          <motion.button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Wedding Background Music Player"
            className="glass-plate flex items-center gap-2.5 rounded-full px-3.5 py-2 border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] shadow-lg backdrop-blur-md cursor-pointer hover:border-[var(--gold)] transition-colors"
            style={{
              background: "color-mix(in oklab, var(--ivory) 85%, transparent)",
            }}
          >
            {/* Spinning Disc / Lotus icon */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-white shadow-xs"
            >
              <Disc3 size={16} />
            </motion.div>

            {/* Track Info & Equalizer */}
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-sans text-[0.62rem] tracking-[0.16em] uppercase text-gold-deep font-bold flex items-center gap-1">
                <Music size={10} /> Wedding Song
              </span>
              <span className="font-display text-xs text-primary font-medium line-clamp-1">
                Kaafi Hai Na
              </span>
            </div>

            {/* Equalizer Waveform Bars */}
            <div className="flex items-end gap-[3px] h-3.5 px-1">
              {[0.4, 0.9, 0.6, 0.8, 0.3].map((height, i) => (
                <motion.span
                  key={i}
                  className="w-[2.5px] rounded-full bg-gold-deep"
                  animate={{
                    height: isPlaying ? ["20%", `${height * 100}%`, "30%"] : "20%",
                  }}
                  transition={{
                    duration: 0.7 + i * 0.15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <span className="font-sans text-[0.55rem] tracking-[0.18em] uppercase text-primary/70 font-semibold pl-0.5">
              {isOpen ? "Close" : "Listen"}
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Expanded Spotify Music Player Drawer / Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-[1.8rem] plate paper-grain p-4 sm:p-5 border-2 border-[color-mix(in_oklab,var(--gold)_40%,transparent)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[color-mix(in_oklab,var(--gold)_20%,transparent)]">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-gold-deep" />
                <div>
                  <h4 className="font-display text-sm text-primary font-semibold">
                    Wedding Celebration Track
                  </h4>
                  <p className="font-sans text-[0.62rem] text-muted-foreground tracking-wider uppercase">
                    Kaafi Hai Na · Garvit - Priyansh & Jonita Gandhi
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-primary/60 hover:text-primary hover:bg-gold/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Official Spotify Iframe Player */}
            <div className="mt-3 overflow-hidden rounded-xl bg-black/5 shadow-inner">
              <iframe
                title="Spotify Background Music - Kaafi Hai Na"
                src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full rounded-xl"
              />
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-3 flex items-center justify-between pt-2 text-xs">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] tracking-wider uppercase text-primary/80 hover:text-primary transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Volume2 size={14} className="text-gold-deep" /> Wave Active
                  </>
                ) : (
                  <>
                    <VolumeX size={14} /> Wave Paused
                  </>
                )}
              </button>

              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-sans text-[0.65rem] tracking-wider uppercase text-gold-deep hover:text-primary transition-colors font-semibold"
              >
                Open in Spotify <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
