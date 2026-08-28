import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BOOKING_URL } from "@/lib/designs";
import nailLibraryAsset from "@/assets/nail-library.jpg.asset.json";
import bridalNailsAsset from "@/assets/bridal-nails.png.asset.json";
import slide1 from "@/assets/nail-slide-1.png.asset.json";
import slide2 from "@/assets/nail-slide-2.png.asset.json";
import slide3 from "@/assets/nail-slide-3.png.asset.json";
import slide4 from "@/assets/nail-slide-4.png.asset.json";
import slide5 from "@/assets/nail-slide-5.png.asset.json";

const NAIL_SLIDES = [slide1, slide2, slide3, slide4, slide5];

function NailsSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tick, setTick] = useState(0);
  const touchX = useRef<number | null>(null);

  const goNext = () => {
    setIndex((i) => (i + 1) % NAIL_SLIDES.length);
    setTick((t) => t + 1);
  };

  const goPrev = () => {
    setIndex((i) => (i - 1 + NAIL_SLIDES.length) % NAIL_SLIDES.length);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(goNext, 5000);
    return () => window.clearInterval(id);
  }, [paused, reduced, tick]);

  return (
    <div>
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[10px]"
        onTouchStart={(e) => {
          setPaused(true);
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          setPaused(false);
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX ?? null;
          touchX.current = null;
          if (start === null || end === null) return;
          const dx = end - start;
          if (Math.abs(dx) < 40) return;
          if (dx < 0) {
            goNext();
          } else {
            goPrev();
          }
        }}
      >
        {NAIL_SLIDES.map((slide, i) => (
          <img
            key={slide.url}
            src={slide.url}
            alt="Nail set by Belleva Nails"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              opacity: i === index ? 1 : 0,
              transition: reduced ? "none" : "opacity 1.2s ease-in-out",
            }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous nail photo"
          className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center opacity-70 transition-opacity active:opacity-100"
        >
          <svg
            width="14"
            height="28"
            viewBox="0 0 14 28"
            fill="none"
            stroke="#F5F0E8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="11,2 3,14 11,26" />
          </svg>
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next nail photo"
          className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center opacity-70 transition-opacity active:opacity-100"
        >
          <svg
            width="14"
            height="28"
            viewBox="0 0 14 28"
            fill="none"
            stroke="#F5F0E8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="3,2 11,14 3,26" />
          </svg>
        </button>
      </div>
      <div className="mt-3 flex items-center justify-center gap-[10px]">
        {NAIL_SLIDES.map((slide, i) => (
          <button
            key={slide.url}
            type="button"
            aria-label={`Show nail photo ${i + 1}`}
            onClick={() => {
              setIndex(i);
              setTick((t) => t + 1);
            }}
            className="h-[6px] w-[6px] rounded-full transition-colors duration-300"
            style={{ backgroundColor: i === index ? "#8A7340" : "#CFC8BA" }}
          />
        ))}
      </div>
    </div>
  );
}


const TITLE = "Belleva Nails — Denton nail design library";
const DESCRIPTION =
  "Browse real nail sets made in our Denton studio and book the design you love.";

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

function ServicesSection() {
  const { ref, visible } = useFadeIn();

  const indexItems = [
    {
      index: "01",
      name: "Pedicure",
      line: "care and color, classic to deluxe",
    },
    {
      index: "02",
      name: "Waxing",
      line: "quick, clean, precise",
    },
    {
      index: "03",
      name: "Lashes",
      line: "ask us when you book",
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className={`fade-up ${visible ? "fade-in-visible" : ""} bg-background px-6 py-20 md:px-12`}
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Services</p>
        <h2 className="mt-5 font-display text-[28px] leading-[1.2] text-forest">
          What we do.
        </h2>

        <div className="mt-10">
          <NailsSlideshow />
        </div>

        <a href={BOOKING_URL} className="mt-6 block">
          <div>
            <h3 className="font-display text-[26px] leading-[1.2] text-forest">
              Nails
            </h3>
            <p className="mt-2 text-[12px] uppercase tracking-[1.5px] text-muted-foreground">
              Gel-X · Builder gel · Acrylic · Dipping
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              Sets and designs, built to last past week two.
            </p>
          </div>
        </a>


        <div className="mt-12">
          {indexItems.map((item) => (
            <a
              key={item.name}
              href={BOOKING_URL}
              className="block border-t border-[#E5DFD3] py-6 transition-colors hover:bg-cream/30"
            >
              <div className="flex items-start gap-4">
                <span className="w-8 shrink-0 pt-1 font-sans text-[11px] uppercase tracking-[1px] text-gold">
                  {item.index}
                </span>
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-3">
                  <h3 className="font-display text-[22px] leading-[1.2] text-forest">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground md:mt-0">
                    {item.line}
                  </p>
                </div>
              </div>
            </a>
          ))}
          <div className="border-b border-[#E5DFD3]" />
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [showBar, setShowBar] = useState(false);
  const [quotesPaused, setQuotesPaused] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);

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

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
          onClick={scrollToServices}
          className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-background/90 transition-opacity hover:opacity-70 md:bottom-10"
          aria-label="Scroll to services"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">
            Explore services
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

      <ServicesSection />

      <section className="relative bg-forest px-6 py-24 md:px-12 md:py-80">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 top-0 z-0 select-none font-display text-[180px] leading-none text-cream/7 md:-right-8 md:top-48 md:text-[260px]"
        >
          14
        </span>
        <div className="relative z-10 mx-auto max-w-3xl">
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
    </div>
  );
}
