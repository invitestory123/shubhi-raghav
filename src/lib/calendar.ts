import { wedding } from "@/lib/wedding";

function toICSDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function getGoogleCalendarUrl() {
  const start = toICSDate(wedding.ceremonyDateISO);
  const end = toICSDate("2026-12-04T23:30:00+05:30");
  const title = `${wedding.bride.name} & ${wedding.groom.name} — Wedding Celebration`;
  const details = `With love & blessings of our families, we invite you to celebrate the Wedding of ${wedding.bride.name} & ${wedding.groom.name}.\n\nDates: ${wedding.dateLabel}\nVenue: ${wedding.venue.name}, ${wedding.venue.city}\nAddress: ${wedding.venue.address}\nDirections: ${wedding.venue.mapsUrl}`;
  const location = `${wedding.venue.name}, ${wedding.venue.address}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details: details,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function openGoogleCalendar() {
  if (typeof window !== "undefined") {
    window.open(getGoogleCalendarUrl(), "_blank", "noopener,noreferrer");
  }
}

/** Builds and downloads an .ics file for the wedding. */
export function downloadInvite() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(wedding.ceremonyDateISO)}`,
    `DTEND:${toICSDate("2026-12-04T23:30:00+05:30")}`,
    `SUMMARY:${wedding.bride.name} & ${wedding.groom.name} — Wedding Celebration`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    `DESCRIPTION:With love\\, we invite you to celebrate the Wedding Celebrations of ${wedding.bride.name} & ${wedding.groom.name} at ${wedding.venue.name}\\, ${wedding.venue.city}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "shubhi-raghav-wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}
