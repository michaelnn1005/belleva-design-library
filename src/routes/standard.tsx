import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";

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

function StandardPage() {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBar(window.scrollY > 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader heroPassed />

      <main>
        {/* OPENING */}
        <section className="bg-background px-6 pt-20 pb-16 md:px-12 md:pt-30 md:pb-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[12px] uppercase tracking-[0.12em] text-gold">
                THE BELLEVA STANDARD
              </p>
              <h1 className="mt-6 max-w-[640px] font-display text-[34px] leading-[1.1] text-forest md:text-[56px]">
                What you should expect from a nail salon. And what you get here.
              </h1>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-forest/80 md:text-[18px]">
                Most of this page should be normal. It isn&apos;t, in this
                industry — which is why we wrote it down.
              </p>
              <div className="mt-10 h-px w-16 bg-gold/40" />
            </FadeUpSection>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="relative bg-cream px-6 py-16 md:px-12 md:py-24">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-0 z-0 select-none font-display text-[200px] leading-none text-forest/6 md:-right-10 md:top-4 md:text-[320px]"
          >
            14
          </span>
          <div className="relative z-10 mx-auto max-w-[720px]">
            <FadeUpSection>
              <h2 className="font-display text-[32px] leading-[1.1] text-forest md:text-[48px]">
                Fourteen days. Not seven.
              </h2>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-forest/80 md:text-[18px]">
                If your set chips, lifts, or breaks within 14 days, we fix it. No charge. Technical fault, obviously. Car door, most of the time — bring it in and we&apos;ll take a look.
              </p>
              <p className="mt-5 text-[15px] italic text-gold">
                The industry standard is 7 days. Cute. Ours is 14.
              </p>

              <div className="mt-12">
                <p className="text-[12px] uppercase tracking-[0.12em] text-gold">
                  How to claim
                </p>
                <div className="mt-4 space-y-1">
                  <p className="text-[17px] leading-[1.7] text-forest">
                    — Book online and write &quot;Repair&quot; in the Note.
                  </p>
                  <p className="text-[17px] leading-[1.7] text-forest">
                    — Or call us and ask to be transferred to the front desk.
                  </p>
                  <p className="text-[17px] leading-[1.7] text-forest">
                    — Weekday repairs are the fastest. Weekends fill up.
                  </p>
                </div>
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* DAY 1 / 7 / 14 */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1100px]">
            <FadeUpSection>
              <h2 className="max-w-[640px] font-display text-[32px] leading-[1.1] text-forest md:text-[48px]">
                Same hands. Same set. Three photos.
              </h2>

              <div className="mt-12 flex flex-col gap-4 md:mt-12 md:flex-row md:gap-6">
                {[
                  { label: "DAY 1", alt: "Gel-X set, day 1" },
                  { label: "DAY 7", alt: "Gel-X set, day 7" },
                  { label: "DAY 14", alt: "Gel-X set, day 14" },
                ].map((slot) => (
                  <div key={slot.label} className="flex-1">
                    <div className="aspect-[4/5] w-full bg-cream">
                      <div
                        aria-label={slot.alt}
                        role="img"
                        className="h-full w-full bg-cream"
                      />
                    </div>
                    <p className="mt-3 text-[12px] uppercase tracking-[0.12em] text-gold">
                      {slot.label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-[15px] text-forest/70">
                One Gel-X set, photographed by us. No retouching.
              </p>
              <p className="mt-4 text-[17px] text-forest md:text-[18px]">
                This is what &quot;lasts two weeks&quot; is supposed to look like.
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
                      "We read your Note before you sit down.",
                  },
                  {
                    number: "02",
                    title: "Tell us",
                    description:
                      "What you want, what you don't, anything specific. The more we know, the better this goes.",
                  },
                  {
                    number: "03",
                    title: "The match",
                    description:
                      "We pair you with the technician whose strengths fit your request. Not whoever is free.",
                  },
                  {
                    number: "04",
                    title: "Your feedback",
                    description:
                      "Before you leave, we ask. Honestly. It's how we get better.",
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
                    <span className="w-14 flex-shrink-0 font-display text-[28px] leading-none text-gold">
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
              <p className="text-[12px] uppercase tracking-[0.12em] text-gold">
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

              <div className="mt-12 aspect-[3/2] w-full bg-cream/8">
                <div
                  aria-label="Disinfected tools laid out on a clean tray at Belleva Nails"
                  role="img"
                  className="h-full w-full bg-cream/8"
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
                    The optional CBD upgrade is lab-tested, and we'll show you the report if you ask.
                  </p>
                  <p className="text-[17px] leading-[1.7] text-forest/80 md:text-[18px]">
                    Everything else is chosen the same way: because we'd use it on our own hands.
                  </p>
                </div>
              </FadeUpSection>
            </div>

            <div className="flex-1">
              <FadeUpSection>
                <div className="aspect-[4/5] w-full bg-cream">
                  <div
                    aria-label="FarmHouse Fresh pedicure products on the counter at Belleva Nails"
                    role="img"
                    className="h-full w-full bg-cream"
                  />
                </div>
              </FadeUpSection>
            </div>
          </div>
        </section>
      {/* WHAT WE DON'T DO */}
      <section className="bg-cream px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <FadeUpSection>
            <p className="text-[12px] uppercase tracking-[0.12em] text-gold">
              WHAT WE DON&apos;T DO
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
              "No hidden fees. You'll know the price before we start.",
              "No deposits.",
            ].map((line, i) => (
              <div
                key={line}
                className="flex items-start gap-4 md:gap-6"
              >
                <span
                  className="w-16 flex-shrink-0 font-display text-[44px] leading-none text-gold/35 md:w-[88px] md:text-[64px]"
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
      <section className="bg-forest px-6 py-20 md:px-12 md:py-[120px]">
        <div className="mx-auto max-w-[640px]">
          <FadeUpSection>
            <p className="text-[12px] uppercase tracking-[0.12em] text-gold">
              A NOTE FROM THE FOUNDER
            </p>
            <div className="mt-6 space-y-[18px]">
              <p className="text-[17px] leading-[1.75] text-background/90 md:text-[18px]">
                I started in this industry nearly ten years ago, at the table, doing nails. Then managing a salon. Then opening my own. Everything you have read on this page comes from what I saw in those years, and from deciding Belleva would do it differently.
              </p>
              <p className="text-[17px] leading-[1.75] text-background/90 md:text-[18px]">
                The people who sit in our chairs are usually the ones taking care of everyone else. This hour is the one they keep for themselves. We treat it that way.
              </p>
              <p className="text-[17px] leading-[1.75] text-background/90 md:text-[18px]">
                We are still learning. Every note, every review, every &quot;this could be better&quot; has shaped how we work, and we are grateful for all of it. To the clients who gave us a second chance, thank you. To the ones who left, thank you too. You showed us what needed to change. And to those who have stayed year after year, Belleva is what it is because of you.
              </p>
              <p className="text-[17px] leading-[1.75] text-background/90 md:text-[18px]">
                We don&apos;t take that trust for granted.
              </p>
            </div>

            <div className="mt-10">
              <p className="font-display text-[40px] italic leading-none text-background">
                Michael
              </p>
              <p className="mt-2 text-[14px] text-background/70">
                Founder, Belleva Nails
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
              Write your occasion in the Note. We&apos;ll take care of it.
            </p>
          </FadeUpSection>
        </div>
      </section>

      </main>

      <SiteFooter />
      <StickyBottomBar show={showBar} />
    </div>
  );
}
