import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { IntroGate } from "@/components/invitation/IntroGate";
import { Hero } from "@/components/invitation/Hero";
import { CoupleStory } from "@/components/invitation/CoupleStory";
import { Countdown } from "@/components/invitation/Countdown";
import { Details } from "@/components/invitation/Details";
import { Timeline } from "@/components/invitation/Timeline";
import { Gallery } from "@/components/invitation/Gallery";
import { Footer } from "@/components/invitation/Footer";
import { invitation } from "@/content/invitation";

const title = `${invitation.couple.bride} & ${invitation.couple.groom} — Wedding Celebrations | 3–5 December 2026`;
const description = `Together with their families, ${invitation.couple.bride} & ${invitation.couple.groom} cordially invite you to celebrate their wedding celebrations on 3–5 December 2026 at ${invitation.venue.name}, ${invitation.venue.city}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: "InviteStory" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:image:secure_url", content: "/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: `${invitation.couple.title} Wedding Celebrations | Ananta Spa & Resort, Jaipur`,
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "/og-image.png" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-background">
      <IntroGate />
      <Hero />
      <CoupleStory />
      <Countdown />
      <Details />
      <Timeline />
      <Gallery />
      <Footer />
    </main>
  );
}
