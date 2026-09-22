import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";
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
  "Browse real nail sets made in our Denton salon and book the design you love.";

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
  const { ref, visible } = useFadeUp();
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

function StaggeredAskLines() {
  const { ref, visible, reduced } = useFadeUp();
  const lines = [
    "Ask to see the lab reports.",
    "Ask us to open the tool pouch in front of you.",
    "Ask why we chose your tech for you.",
  ];

  return (
    <div ref={ref} className="mt-10 flex flex-col gap-7">
      {lines.map((line, i) => {
        const animated = visible || reduced;
        return (
          <Link
            key={line}
            to="/standard"
            className={`group block transition-all duration-700 ease-out ${
              animated ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: reduced ? "0ms" : `${i * 80}ms` }}
          >
            <div className="h-px w-full bg-gold/40" />
            <div className="flex items-baseline justify-between gap-4 pt-4">
              <p className="font-display text-[21px] font-normal leading-[1.4] text-cream/80 transition-colors duration-200 group-hover:text-cream">
                {line}
              </p>
              <span className="text-[16px] text-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function VisionQuote() {
  const { ref, visible } = useFadeUp();

  const lineClass =
    "transition-all duration-700 ease-out " +
    (visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0");

  return (
    <section className="bg-forest px-6 py-24 md:py-40">
      <div
        ref={ref}
        className="mx-auto flex max-w-[320px] flex-col items-center text-center"
      >
        <p
          className={`text-[11px] uppercase tracking-[2px] text-gold ${lineClass}`}
          style={{ transitionDelay: "0ms" }}
        >
          THE BELLEVA VISION
        </p>
        <blockquote
          className={`mt-8 font-display text-[26px] italic leading-[1.4] text-cream ${lineClass}`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="block">You spend your days</span>
          <span className="block">caring for everyone else.</span>
          <span className="block">Here, someone cares for you.</span>
        </blockquote>
        <p
          className={`mt-8 text-[10px] uppercase tracking-[2px] text-cream/80 ${lineClass}`}
          style={{ transitionDelay: "500ms" }}
        >
          BELLEVA — DENTON, TX
        </p>
      </div>
    </section>
  );
}


function ServicesSection() {
  const { ref, visible } = useFadeUp();

  const indexItems = [
    {
      index: "01",
      name: "Pedicure",
      line: "care and color, classic to deluxe",
      hash: "pedicures",
    },
    {
      index: "02",
      name: "Waxing",
      line: "quick, clean, precise",
      hash: "waxing",
    },
    {
      index: "03",
      name: "Lashes",
      line: "ask us when you book",
      hash: "lashes",
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

        <Link to="/services" hash="nail-systems" className="mt-6 block">
          <div>
            <h3 className="font-display text-[26px] leading-[1.2] text-forest">
              Nails
            </h3>
            <p className="mt-2 text-[12px] uppercase tracking-[1.5px] text-muted-foreground">
              Gel-X · Builder gel · Acrylic · Dipping
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              Sets and designs, built to last two to three weeks.
            </p>
          </div>
        </Link>


        <div className="mt-12">
          {indexItems.map((item) => (
            <Link
              key={item.name}
              to="/services"
              hash={item.hash}
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
      <SiteHeader heroPassed={heroPassed} />

      <section
        id="hero"
        className="relative h-svh w-full overflow-hidden bg-forest md:h-screen"
      >
        <img
          src={nailLibraryAsset.url}
          alt="Ink Veil nail design by Belleva Nails"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(47,74,62,0.45)" }}
        />

        <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 text-left md:px-16">
          <div className="max-w-[320px] md:max-w-[640px]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-background">
              THE DESIGN LIBRARY — DENTON, TX
            </p>
            <h1 className="mt-3 font-display text-[56px] font-normal leading-[1.0] tracking-[-0.01em] text-background lining-nums md:text-[88px]">
              <span className="whitespace-nowrap">Find your</span>
              <br />
              <span className="whitespace-nowrap">next set.</span>
            </h1>
            <p className="mt-4 text-[16px] leading-[1.5] text-background/90 md:text-[18px]">
              Real designs, made in our salon. Book the one you love.
            </p>
            <button
              onClick={scrollToServices}
              className="mt-6 text-[11px] uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-70"
              aria-label="Scroll to services"
            >
              EXPLORE SERVICES
            </button>
          </div>
        </div>
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
          <h2 className="mt-8 max-w-2xl font-display text-[40px] font-medium leading-[1.15] text-cream lining-nums md:text-[58px]">
            Things you’re allowed to ask here.
          </h2>

          <StaggeredAskLines />

          <div className="mt-7">
            <p className="text-[14px] text-cream/70">
              Most salons hope you never ask.
            </p>
            <Link
              to="/standard"
              className="mt-2 inline-block text-[14px] text-cream underline decoration-gold decoration-1 underline-offset-4"
            >
              Read the whole standard{" "}
              <span className="text-gold">→</span>
            </Link>
          </div>

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

      <section id="bridal" className="bg-background px-6 py-24 md:px-12 md:py-28">
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
            No packages, no fees — just a bride who walks in calm, because everything about her nails was decided weeks ago.
          </p>
          <div className="mt-5 flex max-w-[340px] flex-col gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">THE TRIAL</p>
              <p className="mt-[6px] text-[17px] leading-[1.5] text-forest">A trial set to lock in your exact design.</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">THE WEDDING SET</p>
              <p className="mt-[6px] text-[17px] leading-[1.5] text-forest">The same look, recreated before the wedding.</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">THE CARE KIT</p>
              <p className="mt-[6px] text-[17px] leading-[1.5] text-forest">A small kit to take home.</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">THE GUARANTEE</p>
              <p className="mt-[6px] text-[17px] leading-[1.5] text-forest">A set guaranteed through your big day.</p>
            </div>
          </div>
          <div className="mt-8 max-w-[340px]">
            <a
              href={BOOKING_URL}
              className="inline-flex items-center rounded-full border border-gold bg-transparent px-7 py-3.5 text-[14px] text-forest transition-all duration-300 hover:bg-forest hover:text-cream active:bg-forest active:text-cream"
            >
              Join the bridal program
            </a>
            <p className="mt-3 text-[12px] text-muted-foreground">
              Free to join — tell us your wedding date in the Note box.
            </p>
          </div>
        </div>
      </section>

      <VisionQuote />

      <SiteFooter />


      <StickyBottomBar show={showBar} />
    </div>
  );
}
