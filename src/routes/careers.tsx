import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";
import { Img } from "@/components/Img";
import { IMAGES } from "@/lib/images";

const TITLE = "Careers · Belleva Nails";
const DESCRIPTION =
  "Come build with us at Belleva Nails in Denton, Texas. A salon built by a nail tech who knows what the floor is worth.";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/careers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

function FadeUpSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useFadeUp(0.2);
  return (
    <div
      ref={ref}
      className={`fade-up ${visible ? "fade-in-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

type EditorialItem = {
  number: string;
  title: string;
  description: string;
};

function EditorialIndex({
  items,
  variant,
  desktopColumns = false,
}: {
  items: EditorialItem[];
  variant: "dark" | "light";
  /** Desktop only: lay the items out side by side, divided by vertical rules. */
  desktopColumns?: boolean;
}) {
  const numberColor = variant === "dark" ? "text-gold" : "text-gold";
  const titleColor = variant === "dark" ? "text-cream" : "text-forest";
  const descColor =
    variant === "dark" ? "text-cream/80" : "text-forest/80";
  const ruleColor =
    variant === "dark" ? "border-gold/40" : "border-[#E5DFD3]";

  return (
    <div className={desktopColumns ? "lg:grid lg:grid-cols-3 lg:gap-12" : ""}>
      {items.map((item, i) => (
        <div
          key={item.number}
          className={`flex gap-4 py-6 ${i !== 0 ? `border-t ${ruleColor}` : ""} ${
            desktopColumns ? `lg:flex-col lg:gap-5 lg:py-0 ${i !== 0 ? "lg:border-l lg:border-t-0 lg:pl-12" : ""}` : ""
          }`}
        >
          <span
            className={`w-14 flex-shrink-0 font-display text-[28px] leading-none ${numberColor} lining-nums`}
          >
            {item.number}
          </span>
          <div>
            <p
              className={`font-display text-[20px] font-medium leading-[1.3] md:text-[22px] ${titleColor}`}
            >
              {item.title}
            </p>
            <div
              className={`mt-1.5 text-[15px] leading-[1.6] ${descColor}`}
            >
              {item.description.split("\n\n").map((para, pi) => (
                <p key={pi} className={pi > 0 ? "mt-5" : ""}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const FOUNDER_PATH = [
  { when: "Six years", what: "At the chair" },
  { when: "Then", what: "Ran the floor" },
  { when: "Now", what: "Built Belleva" },
];

function FounderPath() {
  return (
    <ol className="relative border-l border-gold/50 pl-10">
      {FOUNDER_PATH.map((step, i) => (
        <li key={step.what} className={`relative ${i !== 0 ? "mt-12" : ""}`}>
          <span className="absolute -left-[45px] top-1.5 h-[9px] w-[9px] rounded-full bg-gold" aria-hidden="true" />
          <p className="text-[11px] uppercase tracking-[0.14em] text-gold">{step.when}</p>
          <p className="mt-2 font-display text-[32px] leading-[1.1] text-forest">{step.what}</p>
        </li>
      ))}
    </ol>
  );
}

// Figures quoted from the Nail technician description below.
const PAY_RANGES = [
  { label: "Pedicure technician", low: 4000, high: 5000, note: "before tips" },
  { label: "Design technician", low: 6000, high: 9500, note: "before cash tips" },
];
const PAY_SCALE_MAX = 10000;

function PayRanges() {
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  return (
    <div className="border border-forest/12 bg-cream p-10">
      <p className="text-[11px] uppercase tracking-[0.14em] text-gold">What the chair pays</p>
      <p className="mt-2 font-display text-[28px] leading-[1.15] text-forest">Typical monthly take-home, right now.</p>
      <div className="mt-10 space-y-10">
        {PAY_RANGES.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[14px] font-medium text-forest">{r.label}</p>
              <p className="font-display text-[22px] text-forest lining-nums">
                {fmt(r.low)}–{fmt(r.high)}
              </p>
            </div>
            <div className="relative mt-3 h-2 rounded-full bg-forest/10" aria-hidden="true">
              <div
                className="absolute inset-y-0 rounded-full bg-gold"
                style={{ left: `${(r.low / PAY_SCALE_MAX) * 100}%`, right: `${100 - (r.high / PAY_SCALE_MAX) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-[12px] text-forest/60">{r.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between text-[11px] text-forest/50 lining-nums" aria-hidden="true">
        <span>$0</span>
        <span>$5,000</span>
        <span>$10,000</span>
      </div>
    </div>
  );
}

function GoogleStats() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden border border-forest/12 bg-forest/12">
      <div className="col-span-2 bg-background p-10">
        <p className="text-[11px] uppercase tracking-[0.14em] text-gold">Google rating</p>
        <div className="mt-4 flex items-baseline gap-5 font-display lining-nums">
          <span className="text-[44px] leading-none text-forest/35">4.2</span>
          <span className="text-[28px] text-gold" aria-hidden="true">→</span>
          <span className="text-[88px] leading-none text-forest">4.7</span>
        </div>
        <div className="relative mt-6 h-2 rounded-full bg-forest/10" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 rounded-full bg-forest/25" style={{ width: `${(4.2 / 5) * 100}%` }} />
          <div className="absolute inset-y-0 rounded-full bg-gold" style={{ left: `${(4.2 / 5) * 100}%`, width: `${(0.5 / 5) * 100}%` }} />
        </div>
      </div>
      <div className="bg-background p-10">
        <p className="font-display text-[56px] leading-none text-forest lining-nums">1,100+</p>
        <p className="mt-3 text-[13px] text-forest/70">Google reviews, up from a few hundred</p>
      </div>
      <div className="bg-background p-10">
        <p className="font-display text-[56px] leading-none text-forest lining-nums">2</p>
        <p className="mt-3 text-[13px] text-forest/70">years, one team</p>
      </div>
    </div>
  );
}

const WHAT_YOU_GET_ITEMS: EditorialItem[] = [
  {
    number: "01",
    title: "A floor we work to keep fair",
    description:
      "Turns are shared, problems get heard, and payday is exactly what you were told. We check ourselves on this every week.",
  },
  {
    number: "02",
    title: "We grow your book with you",
    description:
      "Bring the effort and a goal you actually want. We bring the clients and the system to keep them – that part is ours to carry.",
  },
  {
    number: "03",
    title: "A team that's still climbing",
    description:
      "We stay small on purpose and hire for character and skill, not chair count.",
  },
];

const WHERE_THIS_CAN_GO_ITEMS: EditorialItem[] = [
  {
    number: "01",
    title: "Nail technician",
    description:
      "Come if you want more than a chair. Put real work in, respect the people next to you, and keep the drama at the door. Attitude and character come before skill here, every time. We'll teach the skill; we're asking you to bring the rest. Right now, our pedicure technicians typically take home $4,000–$5,000 a month before tips, and technicians who do design $6,000–$9,500 before cash tips. Reaching the top of that range is something we work toward together. And if the chair turns out to be just the start for you, there's room to grow into content, the desk, or operations as we do.",
  },
  {
    number: "02",
    title: "Front desk",
    description:
      "We're looking for someone who's run a front before. You genuinely like talking to clients, you like helping people, and you're curious about how a business works. We ask a lot of the desk, because it's where clients form their first and last impression of us. It's not a waiting-room job.",
  },
  {
    number: "03",
    title: "Investor",
    description:
      "I've spent nine years in this trade: first at a chair, then running the floor, now owning the salon. I learned the craft in the Vietnamese nail community, and I'm grateful for it. What I'm building at Belleva takes that craft and pairs it with a culture that sits in the middle, one that keeps the discipline and warmth we grew up with and lets the rest go. A team people are proud to be part of, where no one gets left behind, and clients can feel that the moment they sit down. That comes first, before growth.\n\nMost of the people in our chairs are women, many of them mothers carrying a whole family. I love my own mother, so I'll say it plainly: they are who this work is for.\n\nWe'd like to open more locations, and I'd rather do it with the right partner than alone. If this is the kind of value you'd want your money to create, I'd like to talk.",
  },
];

function CareersPage() {
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight - 20 : window.innerHeight - 20;
      setHeroPassed(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader heroPassed={heroPassed} />

      <main>
        {/* HERO */}
        <section
          id="hero"
          className="relative h-[60vh] min-h-[440px] w-full md:h-[70vh] md:min-h-[520px]"
        >
          {/* Background image */}
          <Img
            image={IMAGES["careers-hero-desktop"]}
            mobile={IMAGES["careers-hero-mobile"]}
            alt=""
            decorative
            priority
            className="absolute inset-0 h-full w-full object-cover object-center md:object-[58%_center] lg:object-center rounded-none"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-forest/40" aria-hidden="true" />

          {/* Content */}
          <div className="relative mx-auto flex h-full max-w-[1248px] md:max-w-[1280px] lg:max-w-[1328px] items-end px-6 pb-10 md:px-10 lg:px-16 md:pb-16">
            <FadeUpSection className="w-full md:max-w-[55%]">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#FAF8F5]">
                Careers
              </p>
              <h1 className="mt-4 font-display text-[36px] font-medium leading-[1.05] text-[#FAF8F5] md:text-[56px]">
                Come build with us.
              </h1>
            </FadeUpSection>
          </div>
        </section>

        {/* OPENING */}
        <section className="bg-background px-6 pb-16 pt-12 md:px-10 lg:px-16 md:pb-20 md:pt-20 lg:pb-28 lg:pt-28">
          {/* Desktop: the founder's note left, his path through the trade right. */}
          <div className="mx-auto max-w-[1200px] lg:grid lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-20">
            <FadeUpSection>
              <p className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-forest lg:mt-0 lg:max-w-[620px] lg:font-display lg:text-[30px] lg:leading-[1.4]">
                I spent six years at the chair, then ran the floor as a manager before I ever owned a salon. I've seen this industry from every seat – including the ones where you get shorted, talked down to, or pushed aside. That's a big part of why I built this one.
              </p>
            </FadeUpSection>
            <FadeUpSection className="hidden lg:block">
              <FounderPath />
            </FadeUpSection>
          </div>
        </section>

        {/* WHAT YOU GET HERE */}
        <section className="bg-forest px-6 py-16 md:px-10 lg:px-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#FAF8F5]">
                What you get here
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-cream md:text-[48px]">
                The floor matters.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10 lg:mt-16">
              <EditorialIndex items={WHAT_YOU_GET_ITEMS} variant="dark" desktopColumns />
            </FadeUpSection>
          </div>
        </section>

        {/* WHERE THIS CAN GO */}
        <section className="bg-background px-6 py-16 md:px-10 lg:px-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Who we&apos;re hiring
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-forest md:text-[48px]">
                Three seats.
              </h2>
            </FadeUpSection>
            {/* Desktop: roles left, the pay ranges from the Nail technician role right. */}
            <div className="lg:grid lg:grid-cols-[7fr_5fr] lg:items-start lg:gap-16">
              <FadeUpSection className="mt-10">
                <EditorialIndex
                  items={WHERE_THIS_CAN_GO_ITEMS}
                  variant="light"
                />
              </FadeUpSection>
              <FadeUpSection className="hidden lg:sticky lg:top-[104px] lg:mt-16 lg:block">
                <PayRanges />
              </FadeUpSection>
            </div>
          </div>
        </section>

        {/* WHAT WE ASK */}
        <section className="bg-cream px-6 py-16 md:px-10 lg:px-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                What we ask
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-forest md:text-[48px]">
                The whole list.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              {/* Desktop: rows drop the global 65ch cap so they match the top rule; the list is capped as a whole instead. */}
              <div className="border-t border-gold/40 lg:grid lg:grid-cols-3 lg:gap-10 lg:border-t-0">
                {[
                  "Show up for the client.",
                  "Keep learning.",
                  "Bring a good attitude.",
                ].map((line, i) => (
                  <p
                    key={line}
                    className="border-b border-gold/40 py-5 md:max-w-[65ch] lg:max-w-none lg:border-b-0 lg:border-t lg:pt-8 font-display text-[21px] font-normal leading-[1.4] text-forest md:text-[22px] lg:text-[32px] lg:leading-[1.2]"
                  >
                    <span className="mb-4 hidden font-display text-[44px] leading-none text-gold lining-nums lg:block" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-[13px] text-forest/70">
                That&apos;s it – and it&apos;s non-negotiable.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="bg-forest px-6 py-16 md:px-10 lg:px-16 md:py-20 lg:py-28">
          {/* Desktop: the note left, a photo of the work right. */}
          <div className="mx-auto max-w-[1200px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold lg:text-gold-light">
                Who this is for
              </p>
              <p className="mt-6 max-w-[34ch] font-display text-[20px] font-normal leading-[1.45] text-cream md:text-[21px] lg:text-[26px]">
                Anyone, regardless of race, color, gender, or background, who
                wants to get better and be part of a place where the leader puts
                the team first.
              </p>
              <p className="mt-6 max-w-[34ch] font-display text-[22px] font-normal italic leading-[1.4] text-cream md:text-[24px] lg:text-[32px]">
                If you want a place that will push you further than you thought
                you&apos;d go – come work with me. Helping you get there is my
                job.
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-gold">
                · Michael
              </p>
            </FadeUpSection>
            <FadeUpSection className="hidden lg:block">
              <Img
                image={IMAGES["nail-slide-2"]}
                alt="Nail art by a Belleva technician"
                sizes="560px"
                className="aspect-[4/5] w-full object-cover"
              />
            </FadeUpSection>
          </div>
        </section>

        {/* TWO YEARS, ONE TEAM */}
        <section className="bg-background px-6 py-16 md:px-10 lg:px-16 md:py-20 lg:py-28">
          {/* Desktop: the story left, the numbers right. */}
          <div className="mx-auto max-w-[1200px] lg:grid lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Two years, one team
              </p>
              <div className="mt-6 max-w-[34ch] space-y-5">
                <p className="font-display text-[20px] font-normal leading-[1.45] text-forest lining-nums md:text-[21px] lg:text-[26px]">
                  In two years, this salon went from a{" "}
                  <span className="lining-nums">4.2</span> to a{" "}
                  <span className="lining-nums">4.7</span> on Google – from a few
                  hundred reviews to a thousand.
                </p>
                <p className="font-display text-[20px] font-normal leading-[1.45] text-forest md:text-[21px] lg:text-[26px]">
                  That&apos;s not a marketing line. That&apos;s the floor doing
                  the work, client after client. That&apos;s the team, not me.
                </p>
              </div>
            </FadeUpSection>
            <FadeUpSection className="hidden lg:block">
              <GoogleStats />
            </FadeUpSection>
          </div>
        </section>

        {/* HOW TO REACH ME */}
        <section className="bg-cream px-6 py-16 md:px-10 lg:px-16 md:pb-20 md:pt-20 lg:pb-28 lg:pt-28">
          <div className="mx-auto max-w-[1200px] lg:flex lg:items-end lg:justify-between">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                How to reach me
              </p>
              <div className="mt-6 space-y-2 text-[16px] text-forest lg:text-[20px]">
                <p>
                  Call or text:{" "}
                  <a
                    href="tel:+14693770984"
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-gold"
                  >
                    (469) 377-0984
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:michaelnn1005@gmail.com"
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-gold"
                  >
                    michaelnn1005@gmail.com
                  </a>
                </p>

              </div>
            </FadeUpSection>

            <FadeUpSection className="mt-8 lg:mt-0">
              <a
                href="mailto:michaelnn1005@gmail.com"
                className="inline-flex items-center rounded-full border border-forest bg-forest px-7 py-3 text-sm text-cream transition-colors duration-300 hover:bg-forest-soft lg:px-10 lg:py-4 lg:text-[15px]"
              >
                Email Michael
              </a>
            </FadeUpSection>

          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyBottomBar show={true} />
    </div>
  );
}
