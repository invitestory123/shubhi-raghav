import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, ExternalLink, X, Disc3, Sparkles, Play, Pause, Info } from "lucide-react";

const SPOTIFY_TRACK_ID = "0PKLIjYe9K78lky2LxUz2P";
const SPOTIFY_URL = `https://open.spotify.com/track/${SPOTIFY_TRACK_ID}?si=ysqeijGmReqZrMyBrnvn6A`;

export function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const handlePlayEvent = () => {
      audio.play().catch(() => {});
    };

    window.addEventListener("wedding-bgm-play", handlePlayEvent);

    // Fallback: if user interacted anywhere on the document and audio is paused
    const handleFirstTouch = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    };
    window.addEventListener("pointerdown", handleFirstTouch, { once: true });

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("wedding-bgm-play", handlePlayEvent);
      window.removeEventListener("pointerdown", handleFirstTouch);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      {/* Hidden audio element playing the wedding song */}
      <audio
        id="wedding-bgm"
        ref={audioRef}
        src="/wedding-song.mp3"
        loop
        preload="auto"
      />

      {/* Floating Minimized Widget */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-1.5"
        >
          {/* Main Pill Button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="glass-plate flex items-center gap-2 rounded-full pl-2 pr-3.5 py-1.5 border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] shadow-lg backdrop-blur-md hover:border-[var(--gold)] transition-colors"
            style={{
              background: "color-mix(in oklab, var(--ivory) 90%, transparent)",
            }}
          >
            {/* Spinning Disc / Play button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause Wedding Background Music" : "Play Wedding Background Music"}
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-white shadow-xs cursor-pointer focus:outline-none"
            >
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="flex items-center justify-center w-full h-full"
              >
                <Disc3 size={17} />
              </motion.div>
              <span className="absolute inset-0 flex items-center justify-center bg-black/35 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                {isPlaying ? <Pause size={12} className="fill-white" /> : <Play size={12} className="fill-white ml-0.5" />}
              </span>
            </button>

            {/* Track Info & Equalizer */}
            <div
              onClick={togglePlay}
              className="hidden sm:flex flex-col text-left cursor-pointer"
            >
              <span className="font-sans text-[0.6rem] tracking-[0.16em] uppercase text-gold-deep font-bold flex items-center gap-1">
                <Music size={10} /> {isPlaying ? "Playing Song" : "Song Paused"}
              </span>
              <span className="font-display text-xs text-primary font-medium line-clamp-1">
                Kaafi Hai Na
              </span>
            </div>

            {/* Equalizer Waveform Bars */}
            <div
              onClick={togglePlay}
              className="flex items-end gap-[3px] h-3.5 px-1 cursor-pointer"
            >
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

            {/* Toggle play/pause text */}
            <button
              type="button"
              onClick={togglePlay}
              className="font-sans text-[0.58rem] tracking-[0.18em] uppercase text-primary font-bold hover:text-gold-deep transition-colors px-1 cursor-pointer"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            {/* Info button to open Spotify player */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Track Details"
              title="Track details & Spotify"
              className="p-1 rounded-full text-gold-deep hover:text-primary hover:bg-gold/15 transition-colors cursor-pointer"
            >
              <Info size={14} />
            </button>
          </motion.div>
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
                onClick={togglePlay}
                className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] tracking-wider uppercase text-primary/80 hover:text-primary transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Volume2 size={14} className="text-gold-deep" /> Song Playing
                  </>
                ) : (
                  <>
                    <VolumeX size={14} /> Song Paused
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
