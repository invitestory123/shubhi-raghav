"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, CalendarRange, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { openGoogleCalendar } from "@/lib/calendar";
import { wedding } from "@/lib/wedding";

/** Floating quick actions that slide up once the hero is scrolled past. */
export function ActionDock({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    {
      icon: CalendarRange,
      label: "Itinerary",
      onClick: () => {
        const el = document.getElementById("itinerary");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      icon: CalendarPlus,
      label: "Save Date",
      onClick: () => {
        openGoogleCalendar();
        toast.success("Opening Google Calendar...", { description: wedding.dateLabel });
      },
    },
    {
      icon: Navigation,
      label: "Directions",
      href: wedding.venue.mapsUrl,
    },
  ];

  return (
    <AnimatePresence>
      {enabled && show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-x-0 bottom-4 z-[58] flex justify-center px-4"
        >
          <div className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-stone-900/90 p-1.5 shadow-xl backdrop-blur-md">
            {items.map(({ icon: Icon, label, href, onClick }) => {
              const inner = (
                <motion.span
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-stone-100 transition-colors hover:bg-amber-500/20 hover:text-amber-200 cursor-pointer"
                >
                  <Icon className="h-3.5 w-3.5 text-amber-400" />
                  <span>{label}</span>
                </motion.span>
              );
              return href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer noopener">
                  {inner}
                </a>
              ) : (
                <button key={label} type="button" onClick={onClick}>
                  {inner}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
