export interface ItineraryEvent {
  time: string;
  title: string;
  venue: string;
  note?: string;
  icon?: string;
  is24hr?: boolean;
}

export interface ItineraryDay {
  dayLabel: string;
  dateLabel: string;
  theme?: string;
  events: ItineraryEvent[];
}

export const wedding = {
  // Auspicious Hindu Wedding Invocation
  shloka: "॥ श्री गणेशाय नमः ॥",
  shlokaSub: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
  blessing:
    "With the heavenly blessings of our elders and the grace of the Almighty, we cordially invite you to celebrate the joyous union of our families.",

  bride: {
    name: "Shubhi",
    fullName: "Shubhi",
    role: "The Bride",
    blurb: "Graceful, radiant, and stepping into forever with a heart full of joy.",
  },

  groom: {
    name: "Raghav",
    fullName: "Raghav",
    role: "The Groom",
    blurb: "Thoughtful, spirited, and ready to walk life's most beautiful journey hand in hand.",
  },

  // Wedding Dates & Destination
  dateISO: "2026-12-03T12:00:00+05:30",
  ceremonyDateISO: "2026-12-04T19:00:00+05:30",
  endDateISO: "2026-12-05T10:00:00+05:30",
  dateLabel: "3 – 5 December 2026",
  weddingDayLabel: "Friday, 4 December 2026",
  timeLabel: "Wedding Ceremony: 7:00 PM onwards",

  venue: {
    name: "Ananta Spa & Resort",
    city: "Jaipur, Rajasthan",
    address: "Delhi - Jaipur Highway (NH-8), Bhanpur Kalan, Jaipur, Rajasthan 302001",
    mapsUrl:
      "https://maps.google.com/maps/place//data=!4m2!3m1!1s0x396da39cb2edc1d3:0xd9cc1f3d0916b4c1?entry=s&sa=X&ved=2ahUKEwj4qIWOnbSXAxWjaHADHSVCDwcQ4kB6BAgUEAA&hl=en",
    preview: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    embedMapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113812.44686419816!2d75.87532398539229!3d27.054366914561726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396da39cb2edc1d3%3A0xd9cc1f3d0916b4c1!2sAnanta%20Spa%20%26%20Resorts%20Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },

  itinerary: [
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
          icon: "KeyRound",
        },
        {
          time: "12:00 PM – 4:00 PM",
          title: "Welcome Lunch",
          venue: "Triangular Lawn",
          note: "A delightful culinary feast to commence our celebrations.",
          icon: "UtensilsCrossed",
        },
        {
          time: "4:00 PM",
          title: "High Tea",
          venue: "Kissaten Tea Lounge",
          note: "Artisanal teas, brews and savory evening nibbles.",
          icon: "Coffee",
        },
        {
          time: "7:00 PM onwards",
          title: "Sagan Ceremony",
          venue: "Sakura",
          note: "Auspicious blessings, exchange of shagun, music & dinner.",
          icon: "Sparkles",
        },
        {
          time: "Round the Clock",
          title: "Brews & Bites",
          venue: "Kissaten Tea Lounge",
          note: "24-hour refreshment station with hot beverages & light snacks.",
          icon: "Clock",
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
          title: "Breakfast Buffet",
          venue: "Shio Kosho Restaurant",
          note: "Energizing morning spread to fuel the festivities.",
          icon: "Utensils",
        },
        {
          time: "9:00 AM",
          title: "Gaur Ceremony",
          venue: "Yuri",
          note: "Traditional pooja & sacred bridal blessings.",
          icon: "Flower2",
        },
        {
          time: "12:00 PM (Noon)",
          title: "Haldi Celebration",
          venue: "Ikigai Lawn",
          note: "Sun-kissed turmeric rituals, vibrant beats & joyful splashes.",
          icon: "Sun",
        },
        {
          time: "4:00 PM",
          title: "High Tea",
          venue: "Kissaten Tea Lounge",
          note: "Relax and rejuvenate before the grand evening.",
          icon: "Coffee",
        },
        {
          time: "6:30 PM",
          title: "Safabandi & Baraat",
          venue: "Resort Courtyard",
          note: "Traditional turban tying ceremony & jubilant procession.",
          icon: "Crown",
        },
        {
          time: "7:00 PM onwards",
          title: "Wedding Ceremony (Pheras)",
          venue: "Waterfall Lawn",
          note: "Varmala, sacred vows around the holy fire & wedding reception dinner.",
          icon: "HeartHandshake",
        },
        {
          time: "Round the Clock",
          title: "Tea & Snacks",
          venue: "Kissaten Tea Lounge",
          note: "24-hour refreshments available for guests at all hours.",
          icon: "Clock",
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
          title: "Breakfast Buffet",
          venue: "Shio Kosho Restaurant",
          note: "Hearty farewell breakfast with family and friends.",
          icon: "Utensils",
        },
        {
          time: "10:00 AM",
          title: "Check-out & Departures",
          venue: "Front Desk",
          note: "Cherishing beautiful memories as we bid adieu.",
          icon: "LogOut",
        },
      ],
    },
  ] as ItineraryDay[],

  // Dedicated Guest Services & Hospitality
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
    {
      title: "In-Room Amenities",
      description: "Steam iron and hair dryer are thoughtfully equipped in all guest rooms.",
      icon: "Home",
    },
  ],

  meta: {
    siteUrl: "https://shubhi-raghav.vercel.app",
    title: "Shubhi & Raghav — Wedding Celebrations | 3–5 Dec 2026",
    description:
      "Together with their families, Shubhi & Raghav cordially invite you to celebrate their wedding celebrations on 3-5 December 2026 at Ananta Spa & Resort, Jaipur, Rajasthan.",
    ogTitle: "Shubhi & Raghav — Wedding Celebrations | 3–5 December 2026",
    ogDescription:
      "Together with their families, Shubhi & Raghav cordially invite you to celebrate their wedding celebrations on 3–5 December 2026 at Ananta Spa & Resort, Jaipur, Rajasthan.",
    ogImage: "/og-image.png",
    ogImageAlt: "Shubhi & Raghav Wedding Celebrations | Ananta Spa & Resort, Jaipur",
    ogImageType: "image/png",
    ogSiteName: "InviteStory",
  },

  closing:
    "Your presence and heartfelt blessings are the greatest gifts we could ever ask for. Join us as we celebrate love, laughter, and lifelong friendship.",
} as const;
