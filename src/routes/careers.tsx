import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";

import careersHeroDesktopAsset from "@/assets/careers-hero-desktop.png.asset.json";
import careersHeroMobileAsset from "@/assets/careers-hero-mobile.png.asset.json";

const TITLE = "Careers — Belleva Nails";
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
}: {
  items: EditorialItem[];
  variant: "dark" | "light";
}) {
  const numberColor = variant === "dark" ? "text-gold" : "text-gold";
  const titleColor = variant === "dark" ? "text-cream" : "text-forest";
  const descColor =
    variant === "dark" ? "text-cream/80" : "text-forest/80";
  const ruleColor =
    variant === "dark" ? "border-gold/40" : "border-[#E5DFD3]";

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={item.number}
          className={`flex gap-4 py-6 ${i !== 0 ? `border-t ${ruleColor}` : ""}`}
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
            <p className={`mt-1.5 text-[15px] leading-[1.6] ${descColor}`}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
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
      "Bring the effort and a goal you actually want. We bring the clients and the system to keep them — that part is ours to carry.",
  },
  {
    number: "03",
    title: "Room to grow",
    description: "In nails if that's your path, and beyond it if you want more.",
  },
  {
    number: "04",
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
      "Come if you want more than a chair. Put real work in, respect the people next to you, and keep the drama at the door. Attitude first — skill we build together. Our pedicure technicians currently earn $4,000–$5,000 a month before tips. Technicians who do design earn $6,000–$9,500 a month, before cash tips. Getting to the top of that range is a partnership: your hands, our marketing. There's room past the chair too — content, the desk, operations, and a seat at the table when the next location opens.",
  },
  {
    number: "02",
    title: "Front desk",
    description:
      "We're hiring experience here — you've run a front before. You're the one who actually likes talking to clients, likes helping people, and is curious about how a business works. The desk is where this salon grows next. It's not a waiting-room job.",
  },
  {
    number: "03",
    title: "Investor",
    description:
      "We're opening more locations and looking for the right partner to do it with. If you care about creating more value for people, you're already walking the same road we are. If you've read this far and think like an owner, let's talk.",
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
          <picture className="absolute inset-0">
            <source
              media="(min-width: 769px)"
              srcSet={careersHeroDesktopAsset.url}
            />
            <img
              src={careersHeroMobileAsset.url}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center rounded-none"
            />
          </picture>
          {/* Overlay */}
          <div className="absolute inset-0 bg-forest/40" aria-hidden="true" />

          {/* Content */}
          <div className="relative mx-auto flex h-full max-w-[720px] items-end px-6 pb-10 md:px-12 md:pb-16">
            <FadeUpSection className="w-full">
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
        <section className="bg-background px-6 pb-16 pt-12 md:px-12 md:pb-24 md:pt-16">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-forest">
                I spent six years at the chair, then ran the floor as a manager before I ever owned a salon. I've seen this industry from every seat — including the ones where you get shorted, talked down to, or pushed aside. That's a big part of why I built this one.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* WHAT YOU GET HERE */}
        <section className="bg-forest px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#FAF8F5]">
                What you get here
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-cream md:text-[48px]">
                The floor matters.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <EditorialIndex items={WHAT_YOU_GET_ITEMS} variant="dark" />
            </FadeUpSection>
          </div>
        </section>

        {/* WHERE THIS CAN GO */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Who we&apos;re hiring
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-forest md:text-[48px]">
                Three seats.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <EditorialIndex
                items={WHERE_THIS_CAN_GO_ITEMS}
                variant="light"
              />
            </FadeUpSection>
          </div>
        </section>

        {/* WHAT WE ASK */}
        <section className="bg-cream px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                What we ask
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-forest md:text-[48px]">
                The whole list.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <div className="border-t border-gold/40">
                {[
                  "Show up for the client.",
                  "Keep learning.",
                  "Bring a good attitude.",
                ].map((line) => (
                  <p
                    key={line}
                    className="border-b border-gold/40 py-5 font-display text-[21px] font-normal leading-[1.4] text-forest md:text-[22px]"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-[13px] text-forest/70">
                That&apos;s it — and it&apos;s non-negotiable.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="bg-forest px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Who this is for
              </p>
              <p className="mt-6 max-w-[34ch] font-display text-[20px] font-normal leading-[1.45] text-cream md:text-[21px]">
                Anyone, regardless of race, color, gender, or background, who
                wants to get better and be part of a place where the leader puts
                the team first.
              </p>
              <p className="mt-6 max-w-[34ch] font-display text-[22px] font-normal italic leading-[1.4] text-cream md:text-[24px]">
                If you want a place that will push you further than you thought
                you&apos;d go — come work with me. Helping you get there is my
                job.
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-gold">
                — Michael
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* TWO YEARS, ONE TEAM */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Two years, one team
              </p>
              <div className="mt-6 max-w-[34ch] space-y-5">
                <p className="font-display text-[20px] font-normal leading-[1.45] text-forest lining-nums md:text-[21px]">
                  In two years, this salon went from a{" "}
                  <span className="lining-nums">4.2</span> to a{" "}
                  <span className="lining-nums">4.7</span> on Google — from a few
                  hundred reviews to a thousand.
                </p>
                <p className="font-display text-[20px] font-normal leading-[1.45] text-forest md:text-[21px]">
                  That&apos;s not a marketing line. That&apos;s the floor doing
                  the work, client after client. That&apos;s the team, not me.
                </p>
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* HOW TO REACH ME */}
        <section className="bg-cream px-6 py-16 md:px-12 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                How to reach me
              </p>
              <div className="mt-6 space-y-2 text-[16px] text-forest">
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
                    href="mailto:michael@bellevanail.com"
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-gold"
                  >
                    michael@bellevanail.com
                  </a>
                </p>
              </div>
              <p className="mt-5 text-[16px] text-forest">
                Or leave your details below — it goes straight to my inbox.
              </p>
            </FadeUpSection>

            <FadeUpSection className="mt-8">
              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Years doing nails"
                  className="w-full border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
                />
                <textarea
                  rows={3}
                  placeholder="Message"
                  className="w-full resize-none border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center rounded-full border border-forest bg-forest px-5 py-2 text-xs text-cream transition-colors duration-300 hover:bg-forest-soft"
                >
                  Send
                </button>
              </form>
              <p className="mt-3 text-[12px] text-forest/60">
                Demo form — not yet connected.
              </p>
            </FadeUpSection>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyBottomBar show={true} />
    </div>
  );
}
