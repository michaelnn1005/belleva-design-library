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
      </main>

      <SiteFooter />
      <StickyBottomBar show={showBar} />
    </div>
  );
}
