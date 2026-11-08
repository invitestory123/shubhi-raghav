import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarPlus, Sparkles, MapPin, RotateCcw, Check } from "lucide-react";
import { invitation } from "@/content/invitation";

function buildIcs() {
  const start = new Date(invitation.dateISO);
  const end = new Date(start.getTime() + 5 * 3_600_000);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Storybook//EN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@shubhi-raghav-wedding`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${invitation.couple.bride} & ${invitation.couple.groom} — Wedding Celebrations`,
    `LOCATION:${invitation.venue.name}, ${invitation.venue.address}`,
    `DESCRIPTION:Wedding Celebrations of ${invitation.couple.bride} & ${invitation.couple.groom} at ${invitation.venue.name}, Jaipur.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export function ScratchDateCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const isDrawingRef = useRef(false);

  // Paint the golden festive scratch foil
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 420;
    const height = rect.height || 260;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.globalCompositeOperation = "source-over";

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#C99A45");
    grad.addColorStop(0.25, "#E8CA83");
    grad.addColorStop(0.5, "#D8AD55");
    grad.addColorStop(0.75, "#F7E2A8");
    grad.addColorStop(1, "#B8842E");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative ornate border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.strokeStyle = "rgba(184, 132, 46, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(15, 15, width - 30, height - 30);

    // Corner decorative flourishes
    const drawCorner = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI / 2);
      ctx.stroke();
      ctx.restore();
    };
    drawCorner(22, 22, 0);
    drawCorner(width - 22, 22, Math.PI / 2);
    drawCorner(width - 22, height - 22, Math.PI);
    drawCorner(22, height - 22, (Math.PI * 3) / 2);

    // Subtle star sparkle accents
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    const sparkles = [
      { x: width * 0.18, y: height * 0.28, r: 2.5 },
      { x: width * 0.82, y: height * 0.24, r: 2 },
      { x: width * 0.15, y: height * 0.72, r: 2 },
      { x: width * 0.84, y: height * 0.76, r: 2.8 },
      { x: width * 0.5, y: height * 0.2, r: 3 },
    ];
    sparkles.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Elegant text prompts
    ctx.fillStyle = "#3D2B1F";
    ctx.font = "bold 13px 'Karla', sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.22em";
    ctx.fillText("॥ श्री गणेशाय नमः ॥", width / 2, height / 2 - 42);

    ctx.fillStyle = "#2A1810";
    ctx.font = "600 20px 'Marcellus', Georgia, serif";
    ctx.fillText("SAVE OUR WEDDING DATE", width / 2, height / 2 - 8);

    ctx.fillStyle = "#5A3D22";
    ctx.font = "italic 14px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("✨ Scratch with finger or mouse to reveal ✨", width / 2, height / 2 + 24);

    ctx.fillStyle = "rgba(61, 43, 31, 0.75)";
    ctx.font = "500 11px 'Karla', sans-serif";
    ctx.fillText("Shubhi & Raghav", width / 2, height / 2 + 54);

    setIsRevealed(false);
    setPercentScratched(0);
  };

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) initCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute scratched area
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      // Sample down for fast performance
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      let transparentPixels = 0;
      const totalSampled = data.length / 16; // sample every 4th pixel

      for (let i = 3; i < data.length; i += 16) {
        if (data[i] < 128) {
          transparentPixels++;
        }
      }

      const percent = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));
      setPercentScratched(percent);

      // Once scratched past 40%, automatically reveal completely
      if (percent >= 40) {
        setIsRevealed(true);
      }
    } catch {
      // In case of any cross-origin/taint issue, fallback safely
    }
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";

    // Feathered scratch brush
    const radius = 28;
    const radialGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGrad.addColorStop(0, "rgba(0, 0, 0, 1)");
    radialGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.85)");
    radialGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = radialGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    setIsScratching(true);
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      setIsScratching(false);
      checkScratchPercentage();
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    setIsScratching(true);
    const touch = e.touches[0];
    if (touch) scratchAt(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    // prevent scrolling while scratching canvas
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) scratchAt(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      setIsScratching(false);
      checkScratchPercentage();
    }
  };

  const handleInstantReveal = () => {
    setIsRevealed(true);
    setPercentScratched(100);
  };

  const handleReset = () => {
    setIsRevealed(false);
    setPercentScratched(0);
    setTimeout(initCanvas, 50);
  };

  const mapsUrl =
    invitation.venue.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.venue.mapsQuery)}`;

  return (
    <div className="relative mx-auto max-w-xl px-2 sm:px-0">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-[2.2rem] border-2 border-[color-mix(in_oklab,var(--gold)_55%,transparent)] p-8 sm:p-12 shadow-2xl min-h-[220px] flex items-center justify-center select-none"
        style={{
          background: "radial-gradient(ellipse at 50% 35%, #3E161D 0%, #290D13 65%, #180608 100%)",
          boxShadow: "0 24px 55px -15px rgba(24, 6, 8, 0.45), inset 0 0 35px rgba(212, 175, 55, 0.2)",
        }}
      >
        {/* Subtle royal ornate inner border */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-2.5 sm:inset-3 rounded-[1.8rem] border border-amber-300/35"
        />

        {/* Delicate corner star flourishes */}
        <span aria-hidden className="pointer-events-none absolute top-4 left-4 text-amber-300/60 text-xs">✦</span>
        <span aria-hidden className="pointer-events-none absolute top-4 right-4 text-amber-300/60 text-xs">✦</span>
        <span aria-hidden className="pointer-events-none absolute bottom-4 left-4 text-amber-300/60 text-xs">✦</span>
        <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 text-amber-300/60 text-xs">✦</span>

        {/* Underneath Revealed Content: Only "4 December 2026" and Add to Calendar button in luxurious styling */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-wide bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(251,191,36,0.45)]">
            4 December 2026
          </h3>

          {/* Sparkle burst effect on reveal */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                {[
                  { top: "15%", left: "15%", size: 18, delay: 0 },
                  { top: "18%", right: "18%", size: 22, delay: 0.15 },
                  { top: "40%", left: "8%", size: 16, delay: 0.25 },
                  { top: "45%", right: "10%", size: 20, delay: 0.1 },
                  { bottom: "25%", left: "20%", size: 16, delay: 0.3 },
                  { bottom: "20%", right: "22%", size: 18, delay: 0.2 },
                ].map((sp, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute text-amber-300"
                    style={{ top: sp.top, left: sp.left, right: sp.right, bottom: sp.bottom }}
                    animate={{
                      scale: [0.6, 1.4, 0.8],
                      opacity: [0.4, 1, 0.4],
                      rotate: [0, 90, 180],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: sp.delay,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles size={sp.size} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action CTA */}
          <div className="mt-6 flex flex-wrap justify-center">
            <motion.a
              href={buildIcs()}
              download={`${invitation.couple.bride.toLowerCase()}-${invitation.couple.groom.toLowerCase()}-wedding.ics`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-sans text-xs sm:text-sm tracking-[0.2em] uppercase font-bold cursor-pointer transition-all"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F5DEB3 50%, #C59B27 100%)",
                color: "#240A0F",
                boxShadow: "0 4px 20px rgba(212, 175, 55, 0.45)",
              }}
            >
              <CalendarPlus size={16} /> Add to Calendar
            </motion.a>
          </div>
        </div>

        {/* Scratch Canvas Overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0 z-20 h-full w-full cursor-crosshair touch-none select-none"
              style={{
                borderRadius: "inherit",
                boxShadow: "inset 0 0 20px rgba(184, 132, 46, 0.3)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Scratch Floating Badge / Helper */}
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-none absolute bottom-3 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 backdrop-blur-md"
          >
            <p className="font-sans text-[0.6rem] sm:text-[0.68rem] tracking-[0.18em] text-white/95 uppercase font-medium flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-300 animate-spin" />
              {percentScratched > 0 ? `${percentScratched}% scratched` : "Scratch to unveil"}
            </p>
          </motion.div>
        )}
      </div>

      {/* Control bar under the card */}
      <div className="mt-3 flex items-center justify-between px-3 text-xs">
        {!isRevealed ? (
          <button
            type="button"
            onClick={handleInstantReveal}
            className="font-sans text-[0.62rem] sm:text-xs tracking-[0.16em] uppercase text-gold-deep hover:text-primary transition-colors underline decoration-gold-deep/40 underline-offset-4 cursor-pointer"
          >
            Tap here to reveal instantly
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 text-[0.64rem] font-sans tracking-[0.14em] uppercase text-olive font-semibold">
            <Check size={13} /> Wedding date revealed
          </span>
        )}

        {isRevealed && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 font-sans text-[0.62rem] sm:text-xs tracking-[0.16em] uppercase text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <RotateCcw size={12} /> Scratch again
          </button>
        )}
      </div>
    </div>
  );
}
