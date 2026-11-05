/**
 * Copy and structured wedding celebration details for Shubhi & Raghav.
 * Destination Wedding at Ananta Spa & Resort, Jaipur, Rajasthan.
 */

export interface EventItem {
  id: string;
  name: string;
  day?: string;
  date: string;
  time: string;
  venue: string;
  address?: string;
  description: string;
  dateISO: string;
  mapsQuery: string;
  mapsUrl?: string;
}

export interface GuestService {
  title: string;
  description: string;
  icon: string;
}

export interface DayItinerary {
  dayLabel: string;
  dateLabel: string;
  theme: string;
  events: {
    time: string;
    title: string;
    venue: string;
    note?: string;
    is24hr?: boolean;
  }[];
}

export const invitation = {
  invocations: [
    "॥ श्री गणेशाय नमः ॥",
    "॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥",
  ],
  tagline: "The Beginning of Our Forever",
  subTagline: "Until We Say Forever",
  couple: {
    bride: "Shubhi",
    groom: "Raghav",
    initials: "S & R",
    title: "Shubhi & Raghav",
  },
  heavenlyBlessings: {
    title: "With Heavenly Blessings of Elders & Almighty",
    elders: [
      "With the heavenly blessings of our elders and the grace of the Almighty",
      "We cordially invite you to celebrate the joyous union of our families",
    ],
  },
  inviteLead:
    "Together with their families, cordially invite you to celebrate the wedding celebrations of their beloved",
  story: {
    title: "Shubhi & Raghav",
    subtitle: "Two souls, two families, one sacred journey",
    bride: {
      name: "Shubhi",
      role: "The Bride",
      parentage: "Graceful, radiant, and stepping into forever with a heart full of joy.",
      text: "With elegance, warmth, and a bright smile that lights up every room, Shubhi begins life's most beautiful journey hand in hand.",
    },
    groom: {
      name: "Raghav",
      role: "The Groom",
      parentage: "Thoughtful, spirited, and ready to walk life's most beautiful journey hand in hand.",
      text: "Stepping into this new dawn with steadfast love, cheerful spirit, and a heart full of lifelong promises.",
    },
  },
  shloka: {
    sanskrit:
      "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    meaning:
      "O Lord Ganesha of curved trunk and brilliant radiance, please make all our sacred journeys smooth and obstacle-free.",
  },
  /** ISO date-time of the main wedding ceremony (Pheras), used by countdown and calendar. */
  dateISO: "2026-12-04T19:00:00+05:30",
  dateLabel: "3 – 5 December 2026",
  weddingDayLabel: "Friday, 4 December 2026",
  timeLabel: "Wedding Ceremony: 7:00 PM onwards",
  venue: {
    name: "Ananta Spa & Resort",
    city: "Jaipur, Rajasthan",
    address: "Delhi - Jaipur Highway (NH-8), Bhanpur Kalan, Jaipur, Rajasthan 302001",
    mapsQuery: "Ananta Spa and Resorts Jaipur",
    mapsUrl:
      "https://maps.google.com/maps/place//data=!4m2!3m1!1s0x396da39cb2edc1d3:0xd9cc1f3d0916b4c1?entry=s&sa=X&ved=2ahUKEwj4qIWOnbSXAxWjaHADHSVCDwcQ4kB6BAgUEAA&hl=en",
  },
  dressCode: "Royal Festive & Traditional Indian Elegance",
  hero: {
    kicker: "The Beginning of Our Forever",
    eyebrow: "Save the Date",
    blessing: "Until We Say Forever",
  },
  celebrations: [
    {
      id: "welcome-lunch",
      name: "Welcome Lunch",
      day: "Day 1",
      date: "Thursday, 3 December 2026",
      time: "12:00 PM – 4:00 PM",
      venue: "Triangular Lawn",
      address: "Triangular Lawn, Jaipur",
      description:
        "A delightful culinary feast to warmly welcome all our guests and commence our wedding celebrations. Henna artists will be available during lunch.",
      dateISO: "2026-12-03T12:00:00+05:30",
      mapsQuery: "Ananta Spa and Resorts Jaipur",
    },
    {
      id: "sagan",
      name: "Sagan Ceremony",
      day: "Day 1",
      date: "Thursday, 3 December 2026",
      time: "7:00 PM onwards",
      venue: "Sakura",
      address: "Sakura, Jaipur",
      description:
        "Auspicious blessings, exchange of shagun, celebratory music, cocktail & grand welcome dinner.",
      dateISO: "2026-12-03T19:00:00+05:30",
      mapsQuery: "Ananta Spa and Resorts Jaipur",
    },
    {
      id: "gaur",
      name: "Gaur Ceremony",
      day: "Day 2",
      date: "Friday, 4 December 2026",
      time: "9:00 AM",
      venue: "Yuri",
      address: "Yuri, Jaipur",
      description: "Traditional pooja & sacred bridal blessings invoking divine grace and familial harmony.",
      dateISO: "2026-12-04T09:00:00+05:30",
      mapsQuery: "Ananta Spa and Resorts Jaipur",
    },
    {
      id: "haldi",
      name: "Haldi Celebration",
      day: "Day 2",
      date: "Friday, 4 December 2026",
      time: "12:00 PM (Noon)",
      venue: "Ikigai Lawn",
      address: "Ikigai Lawn, Jaipur",
      description:
        "Sun-kissed turmeric rituals, vibrant beats, fresh floral blooms & joyful splashes of love. Henna artists will be available during haldi.",
      dateISO: "2026-12-04T12:00:00+05:30",
      mapsQuery: "Ananta Spa and Resorts Jaipur",
    },
    {
      id: "safabandi",
      name: "Safabandi",
      day: "Day 2",
      date: "Friday, 4 December 2026",
      time: "6:30 PM",
      venue: "Resort Courtyard",
      address: "Resort Courtyard, Jaipur",
      description:
        "Traditional turban tying ceremony followed by celebratory dhol beats.",
      dateISO: "2026-12-04T18:30:00+05:30",
      mapsQuery: "Ananta Spa and Resorts Jaipur",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      day: "Day 2",
      date: "Friday, 4 December 2026",
      time: "7:00 PM onwards",
      venue: "Waterfall Lawn",
      address: "Waterfall Lawn, Jaipur",
      description:
        "Varmala, sacred vows around the holy agni fire, blessings of elders & the royal wedding reception dinner.",
      dateISO: "2026-12-04T19:00:00+05:30",
      mapsQuery: "Ananta Spa and Resorts Jaipur",
    },
    {
      id: "pheras",
      name: "Pheras",
      day: "Day 2",
      date: "Friday, 4 December 2026",
      time: "11:00 PM",
      venue: "Waterfall Lawn",
      address: "Waterfall Lawn, Jaipur",
      description:
        "Under the stars and around the sacred fire, SHUBHI and RAGHAV take the vows - officially beginning forever and a lifetime of deciding what to order for dinner",
      dateISO: "2026-12-04T23:00:00+05:30",
      mapsQuery: "Ananta Spa and Resorts Jaipur",
    },
  ] as EventItem[],

  itineraryDays: [
    {
      dayLabel: "Day 1",
      dateLabel: "Thursday, 3rd December 2026",
      theme: "Arrivals & Sagan Festivities",
      events: [
        {
          time: "12:00 PM onwards",
          title: "Check-in & Welcome",
          venue: "Resort Lobby",
          note: "Warm greetings, traditional hospitality & room allotment.",
        },
        {
          time: "12:00 PM – 4:00 PM",
          title: "Welcome Lunch",
          venue: "Triangular Lawn",
          note: "A delightful culinary feast to commence our celebrations. Henna artists will be available during lunch.",
        },
        {
          time: "4:00 PM",
          title: "Hi - Tea",
          venue: "Kissaten Tea Lounge",
          note: "Artisanal teas, brews and savory evening nibbles.",
        },
        {
          time: "7:00 PM onwards",
          title: "Sagan Ceremony",
          venue: "Sakura",
          note: "Auspicious blessings, exchange of shagun, music & dinner.",
        },
        {
          time: "Round the Clock",
          title: "Brews & Bites",
          venue: "Kissaten Tea Lounge",
          note: "24-hour refreshment station with hot beverages & light snacks.",
          is24hr: true,
        },
      ],
    },
    {
      dayLabel: "Day 2",
      dateLabel: "Friday, 4th December 2026",
      theme: "The Auspicious Wedding Day",
      events: [
        {
          time: "7:30 AM – 10:30 AM",
          title: "Celebratory Breakfast",
          venue: "Shio Kosho Restaurant",
          note: "Energizing morning spread to fuel the festivities.",
        },
        {
          time: "9:00 AM",
          title: "Gaur Ceremony",
          venue: "Yuri",
          note: "Traditional pooja & sacred bridal blessings.",
        },
        {
          time: "12:00 PM (Noon)",
          title: "Haldi Celebration",
          venue: "Ikigai Lawn",
          note: "Sun-kissed turmeric rituals, vibrant beats & joyful splashes. Henna artists will be available during haldi.",
        },
        {
          time: "4:00 PM",
          title: "Hi - Tea",
          venue: "Kissaten Tea Lounge",
          note: "Relax and rejuvenate before the grand evening.",
        },
        {
          time: "6:30 PM",
          title: "Safabandi",
          venue: "Resort Courtyard",
          note: "Traditional turban tying ceremony & jubilant procession.",
        },
        {
          time: "7:00 PM onwards",
          title: "Wedding Ceremony",
          venue: "Waterfall Lawn",
          note: "Varmala, sacred vows around the holy fire & wedding reception dinner.",
        },
        {
          time: "11:00 PM",
          title: "Pheras",
          venue: "Waterfall Lawn",
          note: "Under the stars and around the sacred fire, SHUBHI and RAGHAV take the vows - officially beginning forever and a lifetime of deciding what to order for dinner",
        },
        {
          time: "Round the Clock",
          title: "Brew",
          venue: "Kissaten Tea Lounge",
          note: "24-hour refreshments available for guests at all hours.",
          is24hr: true,
        },
      ],
    },
    {
      dayLabel: "Day 3",
      dateLabel: "Saturday, 5th December 2026",
      theme: "Farewell & Good Wishes",
      events: [
        {
          time: "7:30 AM – 10:30 AM",
          title: "GoodBye Breakfast",
          venue: "Shio Kosho Restaurant",
          note: "Hearty farewell breakfast with family and friends.",
        },
        {
          time: "9:00 AM",
          title: "Check-out & Departures",
          venue: "Front Desk",
          note: "Cherishing beautiful memories as we bid adieu.",
        },
      ],
    },
  ] as DayItinerary[],

  guestServices: [
    {
      title: "Ironing Assistance",
      description: "Complimentary garment pressing service to keep your wedding attire impeccable.",
      icon: "Shirt",
    },
    {
      title: "Men's Grooming",
      description: "Professional grooming & styling assistance available on-site.",
      icon: "Scissors",
    },
    {
      title: "Women's Salon",
      description: "Hair styling, draping & makeup assistance. Please enquire at the hospitality desk.",
      icon: "Sparkles",
    },
  ] as GuestService[],

  note: {
    heading: "Your Blessings Are Our Greatest Gift",
    subheading: "Your gracious presence and heartfelt prayers make our celebration complete.",
  },
  compliments: {
    regards: "With heartfelt love & best compliments",
    family: "The Families of Shubhi & Raghav",
    firm: "Ananta Spa & Resort, Jaipur",
  },
} as const;
