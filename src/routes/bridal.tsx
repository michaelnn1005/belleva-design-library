import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";
import bridalHeroAsset from "@/assets/bridal-hero.png.asset.json";

const TITLE = "Belleva Bridal — Belleva Nails";
const DESCRIPTION =
  "The Belleva Bridal program: a trial, a wedding-day set, and a guarantee through your big day.";

const BOOKING_URL =
  "https://bellevanail.com/booking?utm_source=web&utm_medium=site&utm_campaign=WEB26BRD";

export const Route = createFileRoute("/bridal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/bridal" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/bridal" }],
  }),
  component: BridalPage,
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

function BridalPage() {
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
        {/* HERO */}
        <section
          id="hero"
          className="relative h-[60vh] min-h-[440px] w-full md:h-[70vh] md:min-h-[520px]"
        >
          <img
            src={bridalHeroAsset.url}
            alt="Bridal nail set in soft neutral tones at Belleva Nails"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-forest/45 md:bg-forest/35" />

          <div className="relative mx-auto flex h-full max-w-[720px] items-end px-6 pb-10 md:px-12 md:pb-16">
            <FadeUpSection className="w-full">
              <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-[#FAF8F5]/80">
                BELLEVA BRIDAL
              </p>
              <h1 className="mt-3 max-w-[640px] font-display lining-nums text-[36px] leading-[1.1] text-[#FAF8F5] md:text-[56px]">
                Your hands are in every photo.
              </h1>
              <p className="mt-4 max-w-[480px] font-sans text-[16px] leading-[1.6] text-[#FAF8F5]/75">
                We treat them that way.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-[48px] items-center rounded-full border border-[#FAF8F5] px-8 py-3 text-sm text-[#FAF8F5] transition-colors hover:bg-[#FAF8F5] hover:text-forest"
              >
                Book your trial
              </a>
            </FadeUpSection>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[12px] font-normal uppercase tracking-[0.12em] text-gold">
                HOW IT WORKS
              </p>
              <h2 className="mt-3 font-display lining-nums text-[32px] leading-[1.1] text-forest md:text-[48px]">
                Decided weeks ago. Perfect on the day.
              </h2>
            </FadeUpSection>

            <StaggerFadeUp staggerMs={80} className="mt-12 flex flex-col gap-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                  THE TRIAL
                </p>
                <p className="mt-2 text-[17px] leading-[1.65] text-forest">
                  Two to four weeks before the wedding, we build your set — shade, shape and design matched to your dress. We photograph the final look and keep it on file, so nothing is left to memory.
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                  THE WEDDING SET
                </p>
                <p className="mt-2 text-[17px] leading-[1.65] text-forest">
                  Three to five days before the big day, your trial technician — or one fully briefed on your exact set — recreates it. You leave with a small care kit from us.
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                  THE DAY
                </p>
                <p className="mt-2 text-[17px] leading-[1.65] text-forest">
                  You don&apos;t think about your nails. That&apos;s the point.
                </p>
              </div>
            </StaggerFadeUp>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="bg-forest px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-[#FAF8F5]/80">
                THE GUARANTEE
              </p>
              <h2 className="mt-3 font-display lining-nums text-[32px] leading-[1.1] text-[#FAF8F5] md:text-[48px]">
                Guaranteed through your big day.
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#FAF8F5]/90">
                Every set carries our 14-day guarantee, and your wedding set is done days before the ceremony — so it&apos;s covered through the wedding and well into the honeymoon.
              </p>
              <p className="mt-6 text-[16px] text-gold">
                And if anything happens before the day itself, call us. Brides get same-day repairs. No queue.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* BRIDAL PARTY */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[12px] font-normal uppercase tracking-[0.12em] text-gold">
                THE BRIDAL PARTY
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-forest">
                Bringing your bridesmaids? Book one appointment and write your party size in the Note. The front desk will call you the same day to arrange chairs side by side.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* JUST MARRIED */}
        <section className="bg-[#F5F0E8] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[12px] font-normal uppercase tracking-[0.12em] text-gold">
                JUST MARRIED
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-forest">
                Recently married? Ask the front desk about Just Married — a couples session before the honeymoon, and a little something reserved for your next visit.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* PLACEHOLDER FOR FINAL TWO SECTIONS */}
        <section className="bg-background px-6 md:px-12">
          <div className="mx-auto max-w-[720px]" />
        </section>
      </main>

      <SiteFooter />
      <StickyBottomBar show={showBar} />
    </div>
  );
}
