import { Sparkles, Shirt, Scissors, Home } from "lucide-react";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

const serviceIcons: Record<string, typeof Shirt> = {
  Shirt,
  Scissors,
  Sparkles,
  Home,
};

export function GuestServices() {
  return (
    <section id="services" className="relative overflow-hidden px-5 py-24 bg-[color-mix(in_oklab,var(--ivory)_70%,var(--cream))]">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="Hospitality & Care"
          title="Guest Services"
          note="Thoughtfully arranged for your comfort and convenience"
        />
        <Ornament className="mt-8" />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {invitation.guestServices.map((service, idx) => {
            const IconComp = serviceIcons[service.icon] || Sparkles;
            return (
              <Reveal key={service.title} delay={idx * 0.08}>
                <div className="plate paper-grain rounded-[1.8rem] p-6 sm:p-7 border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] h-full shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                      <IconComp size={22} strokeWidth={1.6} />
                    </div>
                    <h4 className="font-display text-xl sm:text-2xl text-primary font-medium">
                      {service.title}
                    </h4>
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
