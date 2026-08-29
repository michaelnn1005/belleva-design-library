import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";
import { BOOKING_URL } from "@/lib/designs";

const TITLE = "The Belleva Standard — About Belleva Nails";
const DESCRIPTION =
  "Belleva Nails is a nail salon in Denton, Texas. We guarantee every set for 14 days.";

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

const WHAT_WE_DONT_DO_LINES = [
  "We don't reuse a file. Ever.",
  "We don't rush the last appointment of the day.",
  "We don't sell you an add-on you didn't ask about.",
  'We don\'t call a set "done" until we\'d wear it ourselves.',
  "We don't argue about the 14 days.",
];

function StaggerFadeUpLines({
  lines,
  baseDelayMs = 80,
}: {
  lines: string[];
  baseDelayMs?: number;
}) {
  const { ref, visible, reduced } = useFadeUp(0.25);

  return (
    <div ref={ref} className="mt-12 space-y-0">
      {lines.map((line, i) => {
        const isLast = i === lines.length - 1;
        const delay = reduced ? 0 : i * baseDelayMs;
        return (
          <div
            key={line}
            className={`border-t border-gold/40 py-6 first:pt-0 ${
              isLast ? "last:pb-0" : ""
            }`}
          >
            <p
              className={`fade-up font-display text-[22px] leading-[1.4] text-cream ${
                visible ? "fade-in-visible" : ""
              }`}
              style={{
                transitionDelay: reduced ? undefined : `${delay}ms`,
              }}
            >
              {isLast ? (
                <>
                  We don&apos;t argue about the{" "}
                  <span className="lining-nums">14</span> days.
                </>
              ) : (
                line
              )}
            </p>
          </div>
        );
      })}
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
        <section className="bg-background px-6 pt-36 pb-24 md:px-12 md:pt-44 md:pb-32">
          <div className="mx-auto max-w-3xl">
            <FadeUpSection>
              <p className="eyebrow">The Belleva Standard</p>
              <h1 className="mt-8 max-w-[320px] font-display text-[40px] leading-[1.15] text-forest md:max-w-md md:text-[58px]">
                A nail salon that keeps its word.
              </h1>
              <p className="mt-8 max-w-[520px] text-[14px] font-light leading-relaxed text-forest">
                Belleva Nails is a salon in Denton, Texas. We build sets that are meant to be worn, not babied — and we put our name on how long they last.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="relative bg-forest px-6 py-24 md:px-12 md:py-32">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-5 top-0 z-0 select-none font-display text-[180px] leading-none text-cream/7 md:-right-8 md:top-48 md:text-[260px]"
          >
            14
          </span>
          <div className="relative z-10 mx-auto max-w-3xl">
            <FadeUpSection>
              <p className="eyebrow">14-Day Guarantee</p>
              <h2 className="mt-8 max-w-[320px] font-display text-[40px] leading-[1.15] text-cream lining-nums md:max-w-md md:text-[58px]">
                14 days. In writing.
              </h2>
              <p className="mt-8 max-w-[560px] text-[14px] font-light leading-relaxed text-cream/90">
                If anything lifts, chips or breaks within 14 days of your appointment, come back and we fix it — free. The industry standard is 7 — we doubled it, because our work can take it.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* HYGIENE */}
        <section className="bg-background px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeUpSection>
              <p className="eyebrow">Hygiene</p>
              <h2 className="mt-8 font-display text-[32px] leading-[1.2] text-forest md:text-[42px]">
                What clean means here.
              </h2>
              <div className="mt-12 space-y-0">
                {[
                  "Tools sterilized between every client",
                  "Single-use files and buffers, every visit",
                  "Fresh liners for every pedicure",
                ].map((line) => (
                  <div key={line} className="border-t border-gold py-6 first:pt-0 last:pb-0">
                    <p className="text-[15px] font-light leading-relaxed text-forest">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* WHAT WE USE */}
        <section className="bg-background px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeUpSection>
              <p className="eyebrow">What We Use</p>
              <h2 className="mt-8 font-display text-[32px] leading-[1.2] text-forest md:text-[42px]">
                What touches your hands.
              </h2>
              <div className="mt-12 space-y-0">
                {[
                  {
                    num: "01",
                    title: "Lab-tested CBD",
                    desc: "Every batch comes with its own lab report. We keep them at the front desk — ask.",
                  },
                  {
                    num: "02",
                    title: "Organic lotions",
                    desc: "Chosen for how they feel on skin, not how they sound on a label.",
                  },
                  {
                    num: "03",
                    title: "Professional gel systems",
                    desc: "Gel-X, builder gel, dip — salon-grade brands, applied by people who use them every day.",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="border-t border-hairline py-6 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-display text-[22px] leading-none text-gold lining-nums">
                        {item.num}
                      </span>
                      <span className="font-display text-[24px] font-medium leading-[1.25] text-forest">
                        {item.title}
                      </span>
                      <span className="text-[15px] leading-relaxed text-forest/80">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 aspect-square w-full rounded-[10px] bg-cream" />
              <p className="mt-6 text-[11px] uppercase tracking-[1px] text-gold">
                No medical claims. Just what&apos;s in the bottle.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* WHAT WE DON'T DO */}
        <section className="bg-forest px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeUpSection>
              <p className="eyebrow">What We Don&apos;t Do</p>
              <h2 className="mt-8 font-display text-[32px] leading-[1.2] text-cream md:text-[42px]">
                Some things we skip.
              </h2>
            </FadeUpSection>
            <StaggerFadeUpLines lines={WHAT_WE_DONT_DO_LINES} />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <FadeUpSection>
              <p className="font-display text-[26px] italic leading-[1.35] text-forest md:text-[34px]">
                Come see it for yourself.
              </p>
              <a
                href={BOOKING_URL}
                className="mt-10 inline-flex rounded-full bg-forest px-8 py-3 text-sm text-cream transition-colors hover:bg-forest-soft"
              >
                Book an appointment
              </a>
              <p className="mt-4 text-[12px] text-muted-foreground">
                Tell us your occasion in the Note box — we&apos;ll take care of it.
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
