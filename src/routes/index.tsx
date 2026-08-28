import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BOOKING_URL,
  DESIGNS,
  OCCASION_FILTERS,
  SERVICE_FILTERS,
  matchesFilter,
  toneAt,
  type Design,
} from "@/lib/designs";
import nailLibraryAsset from "@/assets/nail-library.jpg.asset.json";
import bridalNailsAsset from "@/assets/bridal-nails.png.asset.json";

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

const CLIENT_QUOTES: { name: string; text: string }[] = [
  {
    name: "Sarah M.",
    text: "I showed them one photo and they matched it exactly. Three weeks later it still looks like day one.",
  },
  {
    name: "Amanda R.",
    text: "The quietest, calmest salon experience I have had in Denton. My gel-x set got compliments all week.",
  },
  {
    name: "Jessica T.",
    text: "I chipped a nail after ten days and they fixed it free, no questions. That guarantee is real.",
  },
  {
    name: "Lauren K.",
    text: "Booked for my wedding day and the set was perfect with my dress. I nearly cried.",
  },
  {
    name: "Megan D.",
    text: "My tech remembered my last design and suggested the next one before I even asked.",
  },
];

function QuoteCard({
  quote,
}: {
  quote: { name: string; text: string };
}) {
  return (
    <figure className="w-[280px] shrink-0 pr-16">
      <blockquote className="font-display text-[19px] italic leading-[1.5] text-forest">
        {quote.text}
      </blockquote>
      <figcaption className="mt-4 text-[11px] uppercase tracking-[2px] text-forest">
        {quote.name}
      </figcaption>
    </figure>
  );
}

function Placeholder({
  tone,
  src,
  alt = "",
  className = "",
}: {
  tone: string;
  src?: string;
  alt?: string;
  className?: string;
}) {
  const { ref, visible } = useFadeIn();
  const light = tone !== "#3A5A4A";
  return (
    <div
      ref={ref}
      className={`fade-up ${visible ? "fade-in-visible" : ""} relative aspect-[4/5] overflow-hidden rounded-[10px] ${className}`}
      style={{ backgroundColor: src ? undefined : tone }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      ) : (
        <span
          className="eyebrow absolute inset-0 flex items-center justify-center"
          style={{ color: light ? "#8A7340" : "#F5F0E8" }}
        >
          Photo
        </span>
      )}
    </div>
  );
}

function ComparisonRow() {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`fade-up ${visible ? "fade-in-visible" : ""} my-12 flex items-center gap-6`}
    >
      <span className="relative text-[13px] uppercase tracking-[2px] text-[rgba(245,240,232,0.45)]">
        7 DAYS
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[rgba(245,240,232,0.45)]" />
      </span>
      <svg
        width="40"
        height="8"
        viewBox="0 0 40 8"
        fill="none"
        aria-hidden="true"
        className="text-gold"
      >
        <path d="M0 4h38M34 1l4 3-4 3" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="text-[13px] uppercase tracking-[2px] text-cream">
        14 DAYS
      </span>
    </div>
  );
}

function VisionReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const line = (delay: number, className: string, children: React.ReactNode) => (
    <span
      className={`block transition-all ease-out ${className} ${started ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
      style={{
        transitionDuration: started ? "800ms" : "0ms",
        transitionDelay: started ? `${delay}s` : "0s",
      }}
    >
      {children}
    </span>
  );

  return (
    <section className="bg-forest px-6 py-28 md:px-12 md:py-32">
      <div
        ref={ref}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {line(0, "text-[10px] uppercase tracking-[2px] text-gold", "THE BELLEVA VISION")}
        <span className="mt-8 block max-w-[320px]">
          {line(0.8, "font-display text-[26px] italic leading-relaxed text-cream", "You spend your days caring for everyone else.")}
          {line(1.15, "font-display text-[26px] italic leading-relaxed text-cream", "Here, someone cares")}
          {line(1.5, "font-display text-[26px] italic leading-relaxed text-cream", "for you.")}
        </span>
        {line(1.85, "mt-10 block text-[11px] uppercase tracking-[2px] text-cream", "BELLEVA — DENTON, TX")}
      </div>
    </section>
  );
}

function Index() {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Design | null>(null);
  const [showBar, setShowBar] = useState(false);
  const [quotesPaused, setQuotesPaused] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight - 20 : window.innerHeight - 20;
      setHeroPassed(window.scrollY > threshold);
      setShowBar(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToLibrary = () => {
    filterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          heroPassed ? "bg-background" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
          <span
            className={`font-display text-xl tracking-[0.3em] transition-colors duration-300 ${
              heroPassed ? "text-forest" : "text-background"
            }`}
          >
            BELLEVA
          </span>
          <a
            href={BOOKING_URL}
            className={`rounded-full border px-5 py-2 text-xs transition-all duration-300 ${
              heroPassed
                ? "border-gold text-gold hover:bg-cream"
                : "border-background/70 text-background hover:bg-background/15"
            }`}
          >
            Book
          </a>
        </div>
      </header>

      <section
        id="hero"
        className="relative h-svh w-full overflow-hidden bg-forest"
      >
        <img
          src={nailLibraryAsset.url}
          alt="Ink Veil nail design by Belleva Nails"
          className="absolute inset-0 h-full w-full object-cover object-[center_55%] md:object-[center_82%]"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(20,30,25,0.45)" }}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-start px-6 pt-[16vh] text-center md:pt-[18vh]">
          <p className="text-[11px] uppercase tracking-[2px] text-background/90">
            THE DESIGN LIBRARY — DENTON, TX
          </p>
          <h1 className="mt-4 font-display text-[54px] leading-[1.05] text-background md:text-[86px]">
            Find your
            <br className="md:hidden" /> next set.
          </h1>
          <p className="mx-auto mt-6 max-w-[240px] text-[13px] font-light leading-relaxed text-background/90 md:max-w-md">
            Real designs, made in our salon. Book the one you love.
          </p>
        </div>

        <button
          onClick={scrollToLibrary}
          className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-background/90 transition-opacity hover:opacity-70 md:bottom-10"
          aria-label="Scroll to design library"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">
            Browse the library
          </span>
          <div className="flex flex-col items-center">
            <div className="h-10 w-px bg-background/60" />
            <svg
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1l3 3 3-3"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
        </button>
      </section>

      <div
        ref={filterRef}
        className="mx-auto max-w-6xl px-6 pb-32 pt-20 md:px-12"
      >
        <div className="space-y-3">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[2px] text-gold">
              OCCASION
            </p>
            <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max gap-2">
                {OCCASION_FILTERS.map((chip) => {
                  const active = chip === filter;
                  return (
                    <button
                      key={chip}
                      onClick={() => setFilter(chip)}
                      className={`whitespace-nowrap rounded-full border px-[14px] py-2 text-[14px] transition-all duration-200 ${
                        active
                          ? "border-transparent bg-forest text-cream"
                          : "border-hairline text-muted-foreground hover:border-gold"
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[2px] text-gold">
              SERVICE
            </p>
            <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max gap-2">
                {SERVICE_FILTERS.map((chip) => {
                  const active = chip === filter;
                  return (
                    <button
                      key={chip}
                      onClick={() => setFilter(chip)}
                      className={`whitespace-nowrap rounded-full border px-[14px] py-2 text-[14px] transition-all duration-200 ${
                        active
                          ? "border-transparent bg-forest text-cream"
                          : "border-hairline text-muted-foreground hover:border-gold"
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-12 md:pb-80">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-10 md:gap-y-20">
          {visible.map((design, i) => (
            <button
              key={design.id}
              onClick={() => setSelected(design)}
              className="text-left"
            >
              <Placeholder tone={toneAt(i)} src={nailLibraryAsset.url} alt={design.name} />
              <p className="eyebrow mt-5">{design.collection}</p>
              <h2 className="mt-2 font-display text-[22px] text-forest">{design.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {design.service} · from ${design.price}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-forest px-6 py-24 md:px-12 md:py-80">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">The Belleva standard</p>
          <h2 className="mt-8 max-w-2xl font-display text-[40px] leading-[1.15] text-cream lining-nums md:text-[58px]">
            The industry standard is a 7-day guarantee. Cute. Ours is 14.
          </h2>
          <ComparisonRow />
          <p className="max-w-[560px] text-[13px] font-light leading-relaxed text-cream/80">
            Every set is guaranteed for 14 days. If anything chips, lifts, or breaks, come back and
            we fix it free. No receipts argued, no questions asked.
          </p>
          <p className="mt-10 text-xs text-gold">Find Belleva Nails on Google Maps.</p>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-28">
        <p className="eyebrow px-6 md:px-12">From our clients</p>
        <div
          className={`mt-12 overflow-hidden ${quotesPaused ? "marquee-paused" : ""}`}
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
          }}
          onPointerDown={() => setQuotesPaused(true)}
          onPointerUp={() => setQuotesPaused(false)}
          onPointerCancel={() => setQuotesPaused(false)}
          onPointerLeave={() => setQuotesPaused(false)}
        >
          <div className="marquee-track flex items-start">
            {CLIENT_QUOTES.map((quote) => (
              <QuoteCard key={quote.name} quote={quote} />
            ))}
            {CLIENT_QUOTES.map((quote) => (
              <QuoteCard key={`${quote.name}-dup`} quote={quote} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-24 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 w-full">
            <img
              src={bridalNailsAsset.url}
              alt="Elegant bridal nail set"
              className="aspect-[4/5] w-full rounded-[10px] object-cover object-center"
              loading="lazy"
              width={896}
              height={1200}
            />
          </div>
          <p className="eyebrow">BELLEVA BRIDAL</p>
          <h2 className="mt-6 max-w-[340px] font-display text-[28px] leading-[1.2] text-forest">
            Joining costs nothing. You just get more.
          </h2>
          <p className="mt-5 max-w-[340px] text-[15px] font-light leading-relaxed text-muted-foreground">
            Our bridal program is free to join — no packages, no fees.
          </p>
          <div className="mt-5 max-w-[340px] space-y-5">
            <p className="text-[15px] text-forest">
              <span className="text-gold">—</span> A trial set to lock in your exact design
            </p>
            <p className="text-[15px] text-forest">
              <span className="text-gold">—</span> The same look, recreated before the wedding
            </p>
            <p className="text-[15px] text-forest">
              <span className="text-gold">—</span> A small care kit to take home
            </p>
            <p className="text-[15px] text-forest">
              <span className="text-gold">—</span> A set guaranteed through your big day
            </p>
          </div>
          <a
            href={BOOKING_URL}
            className="mt-8 inline-flex items-center gap-2 text-[13px] text-forest transition-colors hover:text-forest-soft"
          >
            Book your trial — tell us your wedding date in the Note box.
            <svg width="18" height="8" viewBox="0 0 18 8" fill="none" aria-hidden="true">
              <path d="M0 4h16M13 1l3 3-3 3" stroke="#8A7340" strokeWidth="1" />
            </svg>
          </a>
        </div>
      </section>

      <VisionReveal />

      <footer className="border-t border-hairline bg-background px-6 py-24 md:px-12 md:py-56">
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
                src={nailLibraryAsset.url}
                alt={selected.name}
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
