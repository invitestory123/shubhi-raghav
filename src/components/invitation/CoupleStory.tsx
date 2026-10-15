import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import brideImg from "@/assets/portrait-bride.jpg";
import groomImg from "@/assets/portrait-groom.jpg";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

function PortraitCard({
  src,
  alt,
  name,
  role,
  parentage,
  text,
  flip,
}: {
  src: string;
  alt: string;
  name: string;
  role: string;
  parentage: string;
  text?: string;
  flip?: boolean;
}) {
  return (
    <Reveal delay={flip ? 0.12 : 0} className="group">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="plate paper-grain overflow-hidden rounded-[2.2rem] border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] shadow-lg"
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
            initial={{ scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 70%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 65%)",
            }}
          />
        </div>
        <div className="px-6 pt-6 pb-8 text-center">
          <p className="font-sans text-[0.62rem] tracking-[0.4em] text-gold-deep uppercase">
            {role}
          </p>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl text-primary font-medium tracking-wide">
            {name}
          </h3>
          <p className="mt-3 text-sm font-sans font-medium text-primary/80 tracking-wide sm:text-base leading-relaxed">
            {parentage}
          </p>
          {text && (
            <p className="mt-3 text-xs sm:text-sm font-script italic text-muted-foreground leading-relaxed">
              &ldquo;{text}&rdquo;
            </p>
          )}
        </div>
      </motion.article>
    </Reveal>
  );
}

export function CoupleStory() {
  const { story, heavenlyBlessings, inviteLead, shloka } = invitation;

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--blush) 26%, var(--ivory)) 50%, var(--ivory) 100%)",
        }}
      />
      <div className="mx-auto max-w-5xl">
        {/* Heavenly Blessings Card */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="glass-plate rounded-[2rem] p-8 sm:p-10 border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] shadow-sm">
            <div className="flex items-center justify-center gap-2 text-gold-deep mb-3">
              <Sparkles size={16} />
              <p className="font-sans text-[0.68rem] tracking-[0.38em] uppercase font-semibold">
                {heavenlyBlessings.title}
              </p>
              <Sparkles size={16} />
            </div>

            <div className="space-y-2 mt-4">
              {heavenlyBlessings.elders.map((elder, idx) => (
                <p
                  key={idx}
                  className="font-display text-lg sm:text-xl text-primary leading-snug font-medium"
                >
                  {elder}
                </p>
              ))}
            </div>

            <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

            <p className="font-script text-lg sm:text-xl text-primary/85 italic leading-relaxed">
              &ldquo;{inviteLead}&rdquo;
            </p>
          </div>
        </Reveal>

        <Ornament className="mt-12" />

        {/* The Couple Cards */}
        <div className="mt-12">
          <SectionTitle
            eyebrow="The Beginning of Our Forever"
            title={story.title}
            note="Two loving families uniting in joy and celebration"
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10">
            <PortraitCard
              src={brideImg}
              alt={`Portrait of the bride ${story.bride.name}`}
              name={story.bride.name}
              role={story.bride.role}
              parentage={story.bride.parentage}
              text={story.bride.text}
            />
            <PortraitCard
              src={groomImg}
              alt={`Portrait of the groom ${story.groom.name}`}
              name={story.groom.name}
              role={story.groom.role}
              parentage={story.groom.parentage}
              text={story.groom.text}
              flip
            />
          </div>
        </div>

        {/* Auspicious Ganesh Shloka Card */}
        <Reveal delay={0.16} className="mt-14 mx-auto max-w-2xl">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="glass-plate rounded-3xl p-6 sm:p-8 text-center border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] relative overflow-hidden"
          >
            <div className="flex justify-center mb-3 text-gold-deep opacity-80">
              <Heart size={18} className="fill-[var(--gold)]" />
            </div>
            <p
              className="text-base sm:text-lg md:text-xl text-primary font-semibold leading-relaxed tracking-wide whitespace-pre-line"
              style={{ fontFamily: "var(--font-devanagari)" }}
            >
              {shloka.sanskrit}
            </p>
            <p className="mt-4 font-script text-sm sm:text-base text-primary/80 italic">
              {shloka.meaning}
            </p>
            <p className="mt-3 font-sans text-[0.62rem] sm:text-xs tracking-[0.25em] text-gold-deep uppercase font-semibold">
              Sacred Mangalam &amp; Divine Invocations
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
