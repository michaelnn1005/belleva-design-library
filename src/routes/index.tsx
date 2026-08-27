import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BOOKING_URL,
  DESIGNS,
  FILTERS,
  matchesFilter,
  toneAt,
  type Design,
} from "@/lib/designs";

const TITLE = "Belleva Nails — Denton nail design library";
const DESCRIPTION =
  "Browse real nail sets made in our Denton studio, filter by service or occasion, and book the design you love.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Placeholder({ tone, className = "" }: { tone: string; className?: string }) {
  const { ref, visible } = useFadeIn();
  const light = tone !== "#3A5A4A";
  return (
    <div
      ref={ref}
      className={`fade-up ${visible ? "fade-in-visible" : ""} flex aspect-[4/5] items-center justify-center rounded-[10px] ${className}`}
      style={{ backgroundColor: tone }}
    >
      <span
        className="eyebrow"
        style={{ color: light ? "#8A7340" : "#F5F0E8" }}
      >
        Photo
      </span>
    </div>
  );
}

function Index() {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Design | null>(null);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const visible = DESIGNS.filter((d) => matchesFilter(d, filter));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
          <span className="font-display text-xl tracking-[0.3em] text-forest">BELLEVA</span>
          <a
            href={BOOKING_URL}
            className="rounded-full border border-gold px-5 py-2 text-xs text-gold transition-colors hover:bg-cream"
          >
            Book
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-32 pt-40 text-center md:pb-48 md:pt-72">
        <h1 className="font-display text-[54px] leading-[1.05] text-forest md:text-[86px]">
          Find your next set.
        </h1>
        <p className="mx-auto mt-8 max-w-md text-[13px] font-light leading-relaxed text-muted-foreground">
          Real designs, made in our studio. Book the one you love.
        </p>
      </section>

      <div className="mx-auto max-w-6xl overflow-x-auto px-6 pb-32 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-3">
          {FILTERS.map((chip) => {
            const active = chip === filter;
            return (
              <button
                key={chip}
                onClick={() => setFilter(chip)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-xs transition-colors ${
                  active
                    ? "bg-forest text-cream"
                    : "border border-hairline text-muted-foreground hover:border-gold"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-48 md:px-12 md:pb-80">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-10 md:gap-y-20">
          {visible.map((design, i) => (
            <button
              key={design.id}
              onClick={() => setSelected(design)}
              className="text-left"
            >
              <Placeholder tone={toneAt(i)} />
              <p className="eyebrow mt-5">{design.collection}</p>
              <h2 className="mt-2 font-display text-[22px] text-forest">{design.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {design.service} · from ${design.price}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-forest px-6 py-48 md:px-12 md:py-80">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">The Belleva standard</p>
          <h2 className="mt-8 max-w-2xl font-display text-[40px] leading-[1.15] text-cream md:text-[58px]">
            The industry standard is a 7-day guarantee. Cute. Ours is 14.
          </h2>
          <p className="mt-8 max-w-[560px] text-[13px] font-light leading-relaxed text-cream/80">
            Every set is guaranteed for 14 days. If anything chips, lifts, or breaks, come back and
            we fix it free. No receipts argued, no questions asked.
          </p>
          <p className="mt-16 text-xs text-gold">Find Belleva Nails on Google Maps.</p>
        </div>
      </section>

      <section className="bg-cream px-6 py-48 md:px-12 md:py-80">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-[40px] text-forest md:text-[54px]">From our clients</h2>
          <p className="mt-4 text-[13px] font-light text-muted-foreground">Real sets, real words.</p>
          <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-10">
            {["Sarah M.", "Ana R.", "Jill T."].map((name, i) => (
              <div key={name}>
                <Placeholder tone={toneAt(i + 2)} />
                <p className="mt-6 font-display text-[22px] italic leading-relaxed text-forest">
                  [client quote goes here]
                </p>
                <p className="mt-3 text-xs text-muted-foreground">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-hairline bg-background px-6 py-40 md:px-12 md:py-56">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl tracking-[0.3em] text-forest">BELLEVA</p>
            <div className="mt-8 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
              <p>2200 W University Dr, Ste 180, Denton, TX 76201</p>
              <p>(940) 514-1808</p>
              <p>Mon-Fri 9:30-7:30 · Sat 9-7 · Sun 11-5</p>
              <p>@bellevanailsdenton</p>
            </div>
          </div>
          <a
            href={BOOKING_URL}
            className="inline-flex w-fit rounded-full bg-forest px-8 py-3 text-sm text-cream transition-colors hover:bg-forest-soft"
          >
            Book an appointment
          </a>
        </div>
        <div className="h-16 md:hidden" />
      </footer>

      {showBar && (
        <a
          href={BOOKING_URL}
          className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-center gap-3 bg-forest px-6 py-4 text-sm text-cream md:hidden"
        >
          Book an appointment
          <svg width="18" height="8" viewBox="0 0 18 8" fill="none" aria-hidden="true">
            <path d="M0 4h16M13 1l3 3-3 3" stroke="#8A7340" strokeWidth="1" />
          </svg>
        </a>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-background px-6 py-10 md:px-12"
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
        >
          <div className="mx-auto max-w-xl">
            <button
              onClick={() => setSelected(null)}
              className="eyebrow"
              autoFocus
            >
              Close
            </button>
            <div className="mt-10">
              <Placeholder
                tone={toneAt(DESIGNS.findIndex((d) => d.id === selected.id))}
              />
            </div>
            <p className="eyebrow mt-8">{selected.collection}</p>
            <h2 className="mt-3 font-display text-[40px] text-forest">{selected.name}</h2>
            <p className="mt-2 text-[13px] font-light text-muted-foreground">
              {selected.service} · from ${selected.price}
            </p>
            <a
              href={BOOKING_URL}
              className="mt-10 inline-flex rounded-full bg-forest px-8 py-3 text-sm text-cream transition-colors hover:bg-forest-soft"
            >
              Book this design
            </a>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground">
              On the last booking step, tell us your occasion in the Note box so we can prepare for
              you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
