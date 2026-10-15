import { invitation } from "@/content/invitation";

function toICSDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function getGoogleCalendarUrl() {
  const start = toICSDate(invitation.dateISO);
  const end = toICSDate("2026-12-04T23:30:00+05:30");
  const title = `${invitation.couple.bride} & ${invitation.couple.groom} — Wedding Celebration`;
  const details = `With love & blessings of our families, we invite you to celebrate the Wedding of ${invitation.couple.bride} & ${invitation.couple.groom}.\n\nDates: ${invitation.dateLabel}\nVenue: ${invitation.venue.name}, ${invitation.venue.city}\nAddress: ${invitation.venue.address}\nDirections: ${invitation.venue.mapsUrl}`;
  const location = `${invitation.venue.name}, ${invitation.venue.address}`;

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
    "PRODID:-//Wedding Storybook//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(invitation.dateISO)}`,
    `DTEND:${toICSDate("2026-12-04T23:30:00+05:30")}`,
    `SUMMARY:${invitation.couple.bride} & ${invitation.couple.groom} — Wedding Celebration`,
    `LOCATION:${invitation.venue.name}\\, ${invitation.venue.address}`,
    `DESCRIPTION:With love\\, we invite you to celebrate the Wedding Celebrations of ${invitation.couple.bride} & ${invitation.couple.groom} at ${invitation.venue.name}\\, ${invitation.venue.city}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${invitation.couple.bride.toLowerCase()}-${invitation.couple.groom.toLowerCase()}-wedding.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
