import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Img } from "@/components/Img";
import { BOOKING_URL } from "@/lib/designs";
import { cropStyle, setByKey } from "@/lib/nail-sets";
import { useFadeUp } from "@/hooks/use-fade-up";
import { PAGES } from "@/components/home/BridalStory";
import { CLOSING_SETS, DIRECTIONS } from "@/components/home/RevealCta";

// Phones and tablets (below lg): light versions of the desktop home's signature moments.
// No pinned scrolling – everything is a normal page that you swipe sideways where there
// is more to see, so it stays smooth on any phone:
//   PhoneLookbook  – the hero: a swipeable strip of real sets (desktop: drifting columns)
//   PhoneBridal    – the four bridal steps as swipe cards (desktop: the turning album)
//   PhoneClosing   – a real-set photo and the booking copy (desktop: the growing photo)

/**
 * A horizontal snap strip. Tracks which card is at the left edge, can jump to a card,
 * and (optionally) moves on by itself while on screen, pausing whenever the visitor
 * touches it and never for people who prefer reduced motion.
 */
function useStrip(count: number, autoMs?: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const holdUntil = useRef(0);

  const go = (i: number) => {
    const el = ref.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    // the strip is the cards' offsetParent, so offsetLeft is the card's place inside it
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    el.scrollTo({ left: card.offsetLeft - pad, behavior: "smooth" });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const edge =
        el.getBoundingClientRect().left + (parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0);
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i < count; i++) {
        const d = Math.abs((el.children[i] as HTMLElement).getBoundingClientRect().left - edge);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      // the last cards can't reach the left edge, so the very end counts as the last one
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = count - 1;
      activeRef.current = best;
      setActive(best);
    };
    const hold = () => (holdUntil.current = Date.now() + 7000);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", hold, { passive: true });
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("wheel", hold, { passive: true });

    let timer: number | undefined;
    let io: IntersectionObserver | undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (autoMs && !reduced) {
      let onScreen = false;
      io = new IntersectionObserver(([e]) => (onScreen = !!e?.isIntersecting), { threshold: 0.5 });
      io.observe(el);
      timer = window.setInterval(() => {
        if (!onScreen || document.hidden || Date.now() < holdUntil.current) return;
        go(activeRef.current >= count - 1 ? 0 : activeRef.current + 1);
      }, autoMs);
    }
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("wheel", hold);
      io?.disconnect();
      window.clearInterval(timer);
    };
  }, [count, autoMs]);

  return { ref, active, go };
}

const STRIP =
  "relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-6 px-6 [scrollbar-width:none] md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden";

// ---------------------------------------------------------------- hero

const HERO_SETS = [
  "gallery-20-emerald-serpent",
  "rose",
  "turq",
  "gallery-22-ink-current",
  "linen",
  "darkly",
  "gallery-26-silver-bloom",
  "amber",
  "matcha",
  "wings",
  "gallery-25-retro-bloom",
  "shinobi",
].map(setByKey);

export function PhoneLookbook({ onExplore }: { onExplore: () => void }) {
  const { ref, active } = useStrip(HERO_SETS.length, 3200);

  return (
    <div className="relative z-10 flex min-h-svh flex-col justify-end pb-8 pt-[88px] lg:hidden">
      <div className="flex flex-1 flex-col justify-end">
        <div ref={ref} className={STRIP} aria-label="Real Belleva nail sets">
          {HERO_SETS.map((set, i) => (
            <figure key={set.key} className="m-0 shrink-0 snap-start">
              <div
                className="h-[max(220px,min(92vw,calc(100svh-440px),520px))] overflow-hidden rounded-[10px] bg-black/20 shadow-[0_24px_40px_-24px_rgba(0,0,0,0.7)]"
                style={{ aspectRatio: `${set.image.width} / ${set.image.height}` }}
              >
                <Img
                  image={set.image}
                  alt={`${set.name} nail set by Belleva Nails`}
                  sizes="(min-width: 1024px) 1px, (min-width: 768px) 380px, 86vw"
                  priority={i === 0}
                  skipOnDesktop
                  className="h-full w-full object-cover"
                  style={cropStyle(set.crop)}
                />
              </div>
              <figcaption className="mt-2.5 text-[10px] uppercase tracking-[0.18em] text-cream/70">
                {set.name}
              </figcaption>
            </figure>
          ))}
          <div aria-hidden="true" className="w-3 shrink-0" />
        </div>
        {/* where you are in the strip */}
        <div className="mx-6 mt-4 flex items-center gap-4 md:mx-10">
          <div className="relative h-px flex-1 bg-cream/20">
            <div
              className="absolute inset-y-0 left-0 bg-gold-light transition-all duration-500 ease-out"
              style={{ width: `${((active + 1) / HERO_SETS.length) * 100}%` }}
            />
          </div>
          <p className="text-[10px] tabular-nums tracking-[0.18em] text-cream/60">
            {String(active + 1).padStart(2, "0")} / {HERO_SETS.length}
          </p>
        </div>
      </div>

      <div className="mt-7 px-6 md:px-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
          The Belleva lookbook
        </p>
        <h1 className="mt-3 font-display text-[46px] font-normal leading-[1.02] tracking-[-0.01em] text-cream lining-nums md:text-[64px]">
          Find your <i className="text-gold-light">next</i> set.
          <span className="sr-only"> Belleva Nails, nail salon in Denton, Texas.</span>
        </h1>
        <p className="mt-3 max-w-[340px] text-[15px] leading-[1.5] text-cream/85 md:max-w-[460px] md:text-[17px]">
          Real designs, made in our Denton salon. Book the one you love.
        </p>
        <div className="mt-6 flex items-center gap-2.5">
          <a
            href={BOOKING_URL}
            className="inline-flex min-h-[46px] items-center whitespace-nowrap rounded-full bg-cream px-5 text-[12px] uppercase tracking-[0.12em] text-forest active:bg-white"
          >
            Book an appointment
          </a>
          <button
            type="button"
            onClick={onExplore}
            className="inline-flex min-h-[46px] items-center whitespace-nowrap rounded-full border border-cream/50 px-5 text-[12px] uppercase tracking-[0.12em] text-cream active:bg-cream/10"
            aria-label="Scroll to services"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- bridal

export function PhoneBridal() {
  const { ref, active, go } = useStrip(PAGES.length);

  return (
    <section id="bridal" className="bg-background py-20 md:py-24 lg:hidden">
      <div className="px-6 md:px-10">
        <p className="eyebrow">Belleva bridal</p>
        <h2 className="mt-5 font-display text-[34px] font-normal leading-[1.12] text-forest md:text-[44px]">
          Joining costs nothing.
          <br />
          You just get <i className="text-gold">more.</i>
        </h2>
        <p className="mt-4 max-w-[360px] text-[15px] font-light leading-relaxed text-muted-foreground md:max-w-[480px]">
          No packages, no fees – just a bride who walks in calm, because everything about her nails
          was decided weeks ago. Here is how it works.
        </p>
      </div>

      {/* step tabs, also a progress line */}
      <div className="mt-8 grid grid-cols-4 gap-2 px-6 md:px-10">
        {PAGES.map((page, i) => (
          <button
            key={page.num}
            type="button"
            onClick={() => go(i)}
            className="text-left"
            aria-label={`Step ${page.num}: ${page.title}`}
          >
            <span
              className={`block h-[2px] transition-colors duration-500 ${i <= active ? "bg-gold" : "bg-forest/15"}`}
            />
            <span
              className={`mt-2 block text-[9px] uppercase tracking-[0.14em] transition-colors duration-500 md:text-[10px] ${i === active ? "text-forest" : "text-forest/45"}`}
            >
              {page.label}
            </span>
          </button>
        ))}
      </div>

      <div ref={ref} className={`mt-5 ${STRIP}`}>
        {PAGES.map((page, i) => (
          <article key={page.num} className="w-[80vw] max-w-[340px] shrink-0 snap-start">
            <div className="aspect-[4/5] overflow-hidden rounded-[10px] bg-cream">
              <Img
                image={page.image}
                alt={`${page.title} – Belleva bridal nails`}
                sizes="(min-width: 1024px) 1px, 340px"
                skipOnDesktop
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-[34px] leading-none text-gold/40">{page.num}</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                {page.label}
              </span>
            </p>
            <h3 className="mt-2 font-display text-[22px] leading-[1.3] text-forest">
              {page.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-muted-foreground">{page.text}</p>
            {i === PAGES.length - 1 && <span className="sr-only">End of steps.</span>}
          </article>
        ))}
        <div aria-hidden="true" className="w-3 shrink-0" />
      </div>

      <div className="mt-10 px-6 md:px-10">
        <Link
          to="/bridal"
          hash="join"
          className="inline-flex min-h-[48px] items-center rounded-full bg-forest px-7 text-[13px] uppercase tracking-[0.12em] text-cream active:bg-forest/90"
        >
          Plan my bridal nails
        </Link>
        <p className="mt-3 text-[13px] text-muted-foreground">
          Free to join – or simply text{" "}
          <a
            href="sms:+19405141808"
            className="whitespace-nowrap text-forest underline underline-offset-4"
          >
            (940) 514-1808
          </a>
          .
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- closing

export function PhoneClosing() {
  const { ref, visible } = useFadeUp(0.15);
  const [shown, setShown] = useState(0);

  // cycle through a few real sets while the block is on screen
  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setShown((s) => (s + 1) % CLOSING_SETS.length), 3200);
    return () => window.clearInterval(t);
  }, [visible]);

  const rise = `transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`;
  const after = (ms: number) => ({ transitionDelay: `${ms}ms` });

  return (
    <section
      aria-label="Book your next set"
      className="bg-forest px-6 pb-24 md:px-10 md:pb-24 lg:hidden"
    >
      <div
        ref={ref}
        className="mx-auto max-w-[420px] md:grid md:max-w-[880px] md:grid-cols-2 md:items-center md:gap-10"
      >
        <div className={rise} style={after(0)}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] shadow-[0_40px_70px_-36px_rgba(0,0,0,0.75)]">
            {CLOSING_SETS.map((set, i) => (
              <div
                key={set.key}
                className="absolute inset-0 overflow-hidden transition-opacity duration-[1200ms] ease-out"
                style={{ opacity: i === shown ? 1 : 0 }}
              >
                <Img
                  image={set.image}
                  alt={i === shown ? `${set.name} nail set by Belleva Nails` : ""}
                  decorative={i !== shown}
                  sizes="(min-width: 1024px) 1px, (min-width: 768px) 420px, 100vw"
                  skipOnDesktop
                  className="h-full w-full object-cover"
                  style={cropStyle(set.crop)}
                />
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-cream/70">
            <span className="h-px w-6 bg-gold-light" />
            <span key={shown} className="reveal-caption">
              {CLOSING_SETS[shown]!.name} · a real Belleva set
            </span>
          </p>
        </div>

        <div className="mt-10 text-cream md:mt-0">
          <p
            style={after(150)}
            className={`text-[10px] uppercase tracking-[0.3em] text-gold-light ${rise}`}
          >
            Belleva Nails · Denton
          </p>
          <h2
            style={after(250)}
            className={`mt-4 font-display text-[44px] font-normal leading-[1.04] md:text-[52px] ${rise}`}
          >
            Your next set
            <br />
            <i className="text-gold-light">starts here.</i>
          </h2>
          <p style={after(350)} className={`mt-5 text-[15px] leading-[1.7] text-cream/80 ${rise}`}>
            2200 W University Dr, Ste 180, Denton, TX.
            <br />
            Next to Dutch Bros.
          </p>
          <div style={after(450)} className={`mt-8 flex flex-col gap-3 ${rise}`}>
            <a
              href={BOOKING_URL}
              className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-cream px-8 text-[13px] uppercase tracking-[0.12em] text-forest active:bg-white"
            >
              Book an appointment
            </a>
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-cream/50 px-8 text-[13px] uppercase tracking-[0.12em] text-cream active:bg-cream/10"
            >
              Get directions
            </a>
          </div>
          <p style={after(550)} className={`mt-6 text-[13px] text-cream/65 ${rise}`}>
            Questions? Text{" "}
            <a
              href="sms:+19405141808"
              className="whitespace-nowrap text-cream underline decoration-gold-light underline-offset-4"
            >
              (940) 514-1808
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
