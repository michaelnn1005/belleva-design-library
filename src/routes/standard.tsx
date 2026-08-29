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

        {/* FUTURE SECTIONS CONTAINER */}
        <section
          className="min-h-[400px] bg-background"
          aria-label="Future sections"
        />
      </main>

      <SiteFooter />
      <StickyBottomBar show={showBar} />
    </div>
  );
}
