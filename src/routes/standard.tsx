import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";

import proofDay1Asset from "@/assets/proof-day1.jpg.asset.json";
import proofDay7Asset from "@/assets/proof-day7.jpg.asset.json";
import proofDay14Asset from "@/assets/proof-day14.jpg.asset.json";
import standardFounderDeskAsset from "@/assets/standard-founder-desk.png.asset.json";
import standardHeroSalonTableAsset from "@/assets/standard-hero-salon-table.png.asset.json";
import standardTrayAsset from "@/assets/standard-tray.png.asset.json";

const TITLE = "The Belleva Standard — Belleva Nails";
const DESCRIPTION =
  "What you should expect from a nail salon — and what you get at Belleva Nails in Denton, Texas.";

export const Route = createFileRoute("/standard")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/standard" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/standard" }],
  }),
  component: StandardPage,
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

function StaggerFadeUp({
  children,
  staggerMs = 80,
  className = "",
}: {
  children: React.ReactNode;
  staggerMs?: number;
  className?: string;
}) {
  const { ref, visible } = useFadeUp(0.2);
  const items = Array.isArray(children) ? children : [children];
  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className={`transform transition-all duration-700 ease-out ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
          style={{
            transitionDelay: visible ? `${i * staggerMs}ms` : "0ms",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

const PROOF_SLOTS = [
  { label: "DAY 1", alt: "Gel-X set, day 1", src: proofDay1Asset.url },
  { label: "DAY 7", alt: "Gel-X set, day 7", src: proofDay7Asset.url },
  { label: "DAY 14", alt: "Gel-X set, day 14", src: proofDay14Asset.url },
];

function ProofGallery() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Desktop: three in a row */}
      <div className="mt-12 hidden gap-6 lg:flex">
        {PROOF_SLOTS.map((slot) => (
          <div key={slot.label} className="flex-1">
            <div className="aspect-[4/5] w-full bg-cream">
              <img
                src={slot.src}
                alt={slot.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-[12px] uppercase tracking-[0.12em] text-gold">
              {slot.label}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile: single image with toggles */}
      <div className="mt-8 lg:hidden">
        <div className="flex items-center gap-8">
          {PROOF_SLOTS.map((slot, i) => (
            <button
              key={slot.label}
              type="button"
              onClick={() => setActive(i)}
              className={`flex h-11 items-center border-b text-[12px] uppercase tracking-[0.12em] transition-colors ${
                active === i
                  ? "border-forest text-forest"
                  : "border-transparent text-forest/45"
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
        <div className="relative mt-6 aspect-[4/5] w-full bg-cream">
          {PROOF_SLOTS.map((slot, i) => (
            <img
              key={slot.label}
              src={slot.src}
              alt={slot.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[250ms] ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function StandardPage() {
  const [showBar, setShowBar] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight - 20 : window.innerHeight - 20;
      setHeroPassed(window.scrollY > threshold);
      setShowBar(window.scrollY > 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader heroPassed={heroPassed} />

      <main>
        {/* OPENING */}
        <section
          id="hero"
          className="relative h-[60vh] min-h-[440px] w-full md:h-[70vh] md:min-h-[520px]"
        >
          {/* Background image */}
          <img
            src={standardHeroSalonTableAsset.url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-bottom"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-forest/45 md:bg-forest/35" />
          {/* Content */}
          <div className="relative mx-auto flex h-full max-w-[720px] items-end px-6 pb-10 md:px-12 md:pb-16">
            <FadeUpSection className="w-full">
              <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-[#FAF8F5]/80">
                THE BELLEVA STANDARD
              </p>
              <h1 className="mt-3 max-w-[640px] font-display text-[36px] leading-[1.1] text-[#FAF8F5] md:text-[56px]">
                The bare minimum. Done properly.
              </h1>
              <p className="mt-5 max-w-[480px] font-sans text-[16px] leading-[1.6] text-[#FAF8F5]/75">
                Everything on this page should be normal. In this industry, it isn’t.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="relative bg-cream px-6 py-16 md:px-12 md:py-24">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 z-0 h-[160px] select-none overflow-hidden font-display text-[160px] leading-none text-forest/6 md:-right-10 md:top-4 md:h-auto md:text-[320px]"
          >
            14
          </span>
          <div className="relative z-10 mx-auto max-w-[720px]">
            <FadeUpSection>
              <h2 className="font-display text-[32px] leading-[1.1] text-forest md:text-[48px]">
                Fourteen days. Not seven.
              </h2>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-forest/80 md:text-[18px]">
                If your set chips, lifts, or breaks within 14 days, we fix it. No charge. Technical fault, obviously. Car door, most of the time — bring it in and we’ll take a look.
              </p>
              <p className="mt-5 text-[15px] italic text-gold">
                The industry standard is 7 days. Cute. Ours is 14.
              </p>

              <div className="mt-14 md:mt-16">
                <div className="relative flex items-center">
                  <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#2F4A3E]/15" aria-hidden="true" />
                  <p className="relative bg-cream pr-4 text-[12px] font-normal uppercase tracking-[0.14em] text-gold">
                    HOW TO CLAIM
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-3 lg:gap-10">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                      Online
                    </p>
                    <p className="mt-2 text-[17px] leading-[1.6] text-forest">
                      Book as usual and write “Repair” in the Note.
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                      By phone
                    </p>
                    <p className="mt-2 text-[17px] leading-[1.6] text-forest">
                      Call{" "}
                      <a
                        href="tel:+19405141808"
                        className="underline underline-offset-4 decoration-forest/30"
                      >
                        (940) 514-1808
                      </a>{" "}
                      and ask for the front desk.
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                      Timing
                    </p>
                    <p className="mt-2 text-[17px] leading-[1.6] text-forest">
                      Weekday repairs are the fastest. Weekends fill up.
                    </p>
                  </div>
                </div>
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* THE PROOF */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1100px]">
            <FadeUpSection>
              <p className="text-[12px] uppercase tracking-[0.12em] text-gold">
                THE PROOF
              </p>
              <h2 className="mt-3 max-w-[640px] font-display text-[32px] leading-[1.1] text-forest md:text-[48px]">
                One set. Two weeks. No retouching.
              </h2>
              <p className="mt-4 max-w-[520px] text-[17px] text-forest/75">
                Day 1 is what you’d expect. Day 14 is the point.
              </p>

              <ProofGallery />

              <p className="mt-5 text-[15px] text-forest/70">
                Photographed by us, on a client, with her permission.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* YOUR APPOINTMENT */}
        <section className="bg-cream px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-12 lg:flex-row lg:gap-20">
            <div className="max-w-[600px]">
              <FadeUpSection>
                <p className="text-[12px] uppercase tracking-[0.12em] text-gold">
                  YOUR APPOINTMENT
                </p>
                <h2 className="mt-3 font-display text-[32px] leading-[1.1] text-forest md:text-[48px]">
                  What an hour here looks like.
                </h2>
              </FadeUpSection>

              <StaggerFadeUp staggerMs={80} className="mt-12">
                {[
                  {
                    number: "01",
                    title: "Check-in",
                    description:
                      "We read your Note before you sit down. Coffee, tea, or something bubbly — drinks are on us.",
                  },
                  {
                    number: "02",
                    title: "Tell us",
                    description:
                      "What you want, what you don’t, anything specific. The more we know, the better this goes.",
                  },
                  {
                    number: "03",
                    title: "The match",
                    description:
                      "We pair you with the technician whose strengths fit your request — that’s the whole system.",
                  },
                  {
                    number: "04",
                    title: "Your feedback",
                    description:
                      "There's a box at the front desk for you. Say what worked and what didn't; the honest ones help us most. Every month we draw a few cards and send a small gift. It's our way of saying thank you for helping us get better.",
                  },
                  {
                    number: "05",
                    title: "Your next visit",
                    description:
                      "Held at the front desk, three to four weeks out, with the same technician when possible.",
                  },
                ].map((step, i, arr) => (
                  <div
                    key={step.number}
                    className={`flex gap-4 py-6 ${
                      i !== arr.length - 1 ? "border-b border-forest/12" : ""
                    }`}
                  >
                    <span className="w-14 flex-shrink-0 font-display text-[28px] leading-none text-gold lining-nums">
                      {step.number}
                    </span>
                    <div>
                      <p className="font-body text-[17px] font-medium text-forest">
                        {step.title}
                      </p>
                      <p className="mt-1 text-[16px] leading-[1.6] text-forest/75">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </StaggerFadeUp>

              <p className="mt-10 max-w-[560px] text-[15px] italic leading-[1.6] text-forest/70">
                Booked appointments get the most careful match. Walk-ins are welcome — we just have less time to plan.
              </p>
            </div>

            <div className="hidden flex-1 lg:block">
              <div className="sticky top-[120px]">
                <div
                  aria-label="Front desk consultation at Belleva Nails"
                  role="img"
                  className="aspect-[3/4] w-full bg-forest/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* THE TRAY */}
        <section className="bg-forest px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-[#FAF8F5]/80">
                BETWEEN EVERY CLIENT
              </p>
              <h2 className="mt-3 font-display text-[32px] leading-[1.1] text-cream md:text-[48px]">
                The tray.
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-[17px] leading-[1.7] text-cream/90 md:text-[18px]">
                  Every metal tool is washed, soaked in EPA-registered, hospital-grade disinfectant, and stored in a UV cabinet between clients.
                </p>
                <p className="text-[17px] leading-[1.7] text-cream/90 md:text-[18px]">
                  Files, buffers, and wipes are used once and thrown away.
                </p>
                <p className="text-[17px] leading-[1.7] text-cream/90 md:text-[18px]">
                  Every pedicure gets a new liner. Every time.
                </p>
              </div>

              <div className="mt-12 aspect-[4/5] w-full rounded-none">
                <img
                  src={standardTrayAsset.url}
                  alt="Sterilized tools and single-use files arranged on a clean steel tray at Belleva Nails"
                  className="h-full w-full object-cover rounded-none"
                />
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* WHAT TOUCHES YOUR HANDS */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-12 lg:flex-row lg:gap-20">
            <div className="max-w-[520px]">
              <FadeUpSection>
                <p className="text-[12px] uppercase tracking-[0.12em] text-gold">
                  WHAT TOUCHES YOUR HANDS
                </p>
                <h2 className="mt-3 font-display text-[32px] leading-[1.1] text-forest md:text-[48px]">
                  What we use, and why.
                </h2>
                <div className="mt-6 space-y-4">
                  <p className="text-[17px] leading-[1.7] text-forest/80 md:text-[18px]">
                    Our pedicure products come from FarmHouse Fresh, a Texas farm skincare brand — plant-based, made a few hours from here.
                  </p>
                  <p className="text-[17px] leading-[1.7] text-forest/80 md:text-[18px]">
                    Every CBD product we use, in a manicure or a pedicure, has a QR code on the back of the bottle. Scan it and read the lab report yourself. No need to ask — though you can.
                  </p>
                  <p className="text-[17px] leading-[1.7] text-forest/80 md:text-[18px]">
                    Everything else is chosen the same way: because we’d use it on our own hands.
                  </p>
                </div>
              </FadeUpSection>
            </div>

            <div className="flex-1">
              <FadeUpSection>
                <div
                  aria-label="FarmHouse Fresh pedicure products on the counter at Belleva Nails"
                  role="img"
                  className="aspect-[4/5] w-full bg-cream"
                />
              </FadeUpSection>
            </div>
          </div>
        </section>

        {/* THINGS YOU'RE ALLOWED TO ASK */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[680px]">
            <FadeUpSection>
              <p className="text-[12px] uppercase tracking-[0.12em] text-gold">
                THINGS YOU’RE ALLOWED TO ASK
              </p>
              <h2 className="mt-3 font-display text-[32px] leading-[1.1] text-forest md:text-[48px]">
                Ask. We’d rather you did.
              </h2>
            </FadeUpSection>

            <div className="mt-10 border-y border-forest/12">
              {[
                "Can I see the lab report?",
                "Can you open the tool pouch in front of me?",
                "Who’s doing my nails, and why them?",
                "It chipped on day 12. Is that still covered?",
              ].map((line) => (
                <p
                  key={line}
                  className="border-b border-forest/12 py-5 font-display text-[21px] leading-[1.4] italic text-forest lining-nums last:border-b-0 md:text-[26px]"
                >
                  “{line}”
                </p>
              ))}
            </div>

            <FadeUpSection>
              <p className="mt-12 text-[18px] font-medium text-gold">
                Yes — scan the QR code on the bottle. Yes. We'll tell you. And yes.
              </p>
            </FadeUpSection>
          </div>
        </section>
      {/* WHAT WE DON'T DO */}
      <section className="bg-cream px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <FadeUpSection>
            <p className="text-[12px] uppercase tracking-[0.12em] text-gold">
              WHAT WE DON’T DO
            </p>
            <h2 className="mt-3 font-display text-[32px] leading-[1.1] text-forest md:text-[48px]">
              A short list. On purpose.
            </h2>
          </FadeUpSection>

          <StaggerFadeUp staggerMs={60} className="mt-10 space-y-7">
            {[
              "No MMA acrylic. Ever.",
              "No reused files, buffers, or liners.",
              "No rushing. Design appointments are booked with the time built in.",
              "No upsell scripts at the chair.",
              "No hidden fees. You’ll know the price before we start.",
              "No deposits.",
            ].map((line, i) => (
              <div
                key={line}
                className="flex items-start gap-4 md:gap-6"
              >
                <span
                  className="w-16 flex-shrink-0 font-display text-[44px] leading-none text-gold/35 lining-nums md:w-[88px] md:text-[64px]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-2 text-[17px] leading-[1.5] text-forest md:pt-3 md:text-[18px]">
                  {line}
                </p>
              </div>
            ))}
          </StaggerFadeUp>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="relative rounded-none bg-forest pt-20 md:pt-[120px]">
        <div className="relative z-10 mx-auto max-w-[640px] px-6 md:px-12">
          <FadeUpSection>
            <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-gold">
              A NOTE FROM THE FOUNDER
            </p>
            <div className="mt-6 space-y-5">
              <p className="font-display text-[19px] font-normal leading-[1.75] text-cream md:text-[20px]">
                I spent six years at the chair, then ran the floor as a manager before I ever owned a salon. I know what a rushed set feels like from both sides of the table. Belleva runs on one rule that costs us money and we keep anyway: quality over volume. We’d rather ask you to wait for the right tech than hand you to the wrong one — so we stay small on purpose, and we hire slowly.
              </p>
              <p className="font-display text-[19px] font-normal leading-[1.75] text-cream md:text-[20px]">
                To everyone who has trusted us with their hands these past two years: thank you. You’re the reason we get to keep raising the bar. And to those who came once and didn’t come back — thank you, too. You taught us things no compliment ever could.
              </p>
              <p className="font-display text-[19px] font-normal leading-[1.75] text-cream md:text-[20px]">
                We are not a perfect salon, and we won’t pretend to be one. What we can promise is simpler than that: we will show up for you with everything we have, and we will try to be a little better than we were the day before — every set, every visit, every year. That’s the whole plan.
              </p>
            </div>

            <div>
              <div
                className="h-[48px] w-[140px] bg-transparent"
                aria-hidden="true"
              />
              <div className="h-px w-[140px] bg-gold" aria-hidden="true" />
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                Michael — Founder, Belleva Nails
              </p>
            </div>

            <a
              href="https://bellevanail.com/booking?utm_source=web&utm_medium=site&utm_campaign=WEB26STD"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-16 inline-flex min-h-[48px] items-center rounded-full border border-background bg-transparent px-8 py-3 text-[14px] text-background transition-all duration-300 hover:bg-background hover:text-forest"
            >
              Book an appointment
            </a>
            <p className="mt-4 text-[15px] text-background/70">
              Write your occasion in the Note. We’ll take care of it.
            </p>
          </FadeUpSection>
        </div>

        <div className="relative mt-20 h-[240px] w-full overflow-hidden rounded-none md:mt-[120px] md:h-[320px]">
          <img
            src="/founder-notebook-PLACEHOLDER.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 rounded-none"
            style={{ backgroundColor: "rgba(47,74,62,0.38)" }}
          />
        </div>
      </section>

      </main>

      <SiteFooter />
      <StickyBottomBar show={showBar} />
    </div>
  );
}
