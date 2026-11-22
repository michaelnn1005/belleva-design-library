import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/Img";
import { BOOKING_URL } from "@/lib/designs";
import { cropStyle, setByKey } from "@/lib/nail-sets";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

// Desktop (lg+) closing sequence, one pinned forest screen (replaces the separate Vision quote
// and booking sections at this size):
//   1. "The Belleva vision" lights up word by word as you scroll, the last line in gold;
//   2. the quote drifts up and fades while a small photo of a set rises in its place;
//   3. the photo grows into a tall 4:5 frame and moves to the left (never larger than the
//      photo itself, so it stays sharp), cycling through a few real sets;
//   4. the booking copy settles in beside it, straight on the forest background.
// Scrolling back reverses everything.

const DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Belleva+Nails,+2200+W+University+Dr+Ste+180,+Denton,+TX+76201";
const LINES = [
  { words: ["You", "spend", "your", "days"], gold: false },
  { words: ["caring", "for", "everyone", "else."], gold: false },
  { words: ["Here,", "someone", "cares", "for", "you."], gold: true },
];
const WORD_COUNT = LINES.reduce((n, l) => n + l.words.length, 0);
// Real sets whose photos are 4:5 like the frame, so each poster crop lands exactly on the nails.
const SETS = [
  "amber",
  "gallery-20-emerald-serpent",
  "linen",
  "gallery-22-ink-current",
].map(setByKey);

const START_W = 240;
const COPY_W = 500;
// the fixed header covers the top of the screen, so the pair sits a little below centre
const DROP = 24;

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export function RevealCta() {
  const quote = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  // a new set every few seconds (skipped for visitors who prefer less motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setShown((s) => (s + 1) % SETS.length), 3200);
    return () => window.clearInterval(id);
  }, []);

  const ref = useScrollProgress<HTMLElement>(({ pin: p }) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // 1. words light up one after another
    const lit = (p / 0.28) * WORD_COUNT;
    quote.current?.querySelectorAll<HTMLElement>(".vq-word").forEach((w, i) => {
      w.style.opacity = (0.16 + 0.84 * clamp(lit - i)).toFixed(3);
    });
    // 2. quote drifts up and fades
    const out = easeOut(clamp((p - 0.3) / 0.1));
    if (quote.current) {
      quote.current.style.opacity = (1 - out).toFixed(3);
      quote.current.style.transform = `translateY(${(-60 * out).toFixed(1)}px)`;
    }

    // final layout: photo frame on the left, copy on the right, the pair centred
    const finalH = Math.min(vh * 0.72, 660);
    const finalW = finalH * 0.8;
    const gap = Math.min(96, vw * 0.06);
    const left = (vw - (finalW + gap + COPY_W)) / 2;
    const finalX = left + finalW / 2;

    // 3. photo rises small in the middle, then grows and slides left
    const rise = easeOut(clamp((p - 0.33) / 0.1));
    const g = easeInOut(clamp((p - 0.42) / 0.22));
    if (frame.current) {
      const w = mix(START_W, finalW, g);
      const s = frame.current.style;
      s.opacity = rise.toFixed(3);
      s.width = `${w.toFixed(1)}px`;
      s.height = `${(w * 1.25).toFixed(1)}px`;
      s.left = `${mix(vw / 2, finalX, g).toFixed(1)}px`;
      s.transform = `translate(-50%, calc(-50% + ${(DROP + (1 - rise) * 90).toFixed(1)}px))`;
    }

    // 4. copy settles in line by line
    if (copy.current) {
      const c = copy.current;
      c.style.left = `${(left + finalW + gap).toFixed(1)}px`;
      const k0 = clamp((p - 0.6) / 0.16);
      c.style.visibility = k0 > 0.01 ? "visible" : "hidden";
      c.querySelectorAll<HTMLElement>("[data-in]").forEach((el, i) => {
        const k = easeOut(clamp((p - 0.6 - i * 0.03) / 0.14));
        el.style.opacity = k.toFixed(3);
        el.style.transform = `translateY(${((1 - k) * 28).toFixed(1)}px)`;
      });
    }
  });

  return (
    <section
      ref={ref}
      aria-label="The Belleva vision, and booking your next set"
      className="relative hidden h-[280vh] bg-forest lg:block"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={quote}
          className="absolute inset-0 flex flex-col items-center justify-center text-center will-change-transform"
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold-light">
            The Belleva vision
          </p>
          <blockquote className="mt-9 font-display text-[clamp(44px,4.2vw,60px)] italic leading-[1.3] text-cream">
            {LINES.map((line, li) => (
              <span key={li} className={`block ${line.gold ? "text-gold-light" : ""}`}>
                {line.words.map((w, wi) => (
                  <span key={wi}>
                    <span className="vq-word" style={{ opacity: 0.16 }}>
                      {w}
                    </span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </blockquote>
          <p className="mt-9 text-[11px] uppercase tracking-[0.28em] text-cream/70">
            Belleva · Denton, TX
          </p>
        </div>

        {/* photo frame: starts small in the middle, ends as a tall 4:5 frame on the left */}
        <div
          ref={frame}
          className="absolute left-1/2 top-1/2 h-[300px] w-[240px] opacity-0"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[16px] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.75)]">
            {SETS.map((set, i) => (
              <div
                key={set.key}
                className="absolute inset-0 overflow-hidden transition-opacity duration-[1200ms] ease-out"
                style={{ opacity: i === shown ? 1 : 0 }}
              >
                <Img
                  image={set.image}
                  alt={i === shown ? `${set.name} nail set by Belleva Nails` : ""}
                  decorative={i !== shown}
                  sizes="(min-width: 1024px) 540px, 1px"
                  className="h-full w-full object-cover"
                  style={cropStyle(set.crop)}
                />
              </div>
            ))}
          </div>
          <p className="absolute left-0 top-full mt-4 flex items-center gap-3 whitespace-nowrap text-[11px] uppercase tracking-[0.2em] text-cream/75">
            <span className="h-px w-6 bg-gold-light" />
            <span key={shown} className="reveal-caption">
              {SETS[shown]!.name} · a real Belleva set
            </span>
          </p>
        </div>

        {/* booking copy, straight on the forest background */}
        <div
          ref={copy}
          className="invisible absolute top-1/2 text-cream"
          style={{ width: COPY_W, transform: `translateY(calc(-50% + ${DROP}px))` }}
        >
          <p data-in className="text-[11px] uppercase tracking-[0.32em] text-gold-light">
            Belleva Nails · Denton
          </p>
          <h2
            data-in
            className="mt-5 font-display text-[clamp(52px,4.6vw,68px)] font-normal leading-[1.02]"
          >
            Your next set
            <br />
            <i className="text-gold-light">starts here.</i>
          </h2>
          <p data-in className="mt-6 text-[16px] leading-[1.7] text-cream/80">
            2200 W University Dr, Ste 180, Denton, TX.
            <br />
            Next to Dutch Bros.
          </p>
          <div data-in className="mt-9 flex gap-3">
            <a
              href={BOOKING_URL}
              className="inline-flex min-h-[50px] items-center whitespace-nowrap rounded-full bg-cream px-8 py-3 text-[13px] uppercase tracking-[0.12em] text-forest transition-colors hover:bg-white"
            >
              Book an appointment
            </a>
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] items-center whitespace-nowrap rounded-full border border-cream/50 px-8 py-3 text-[13px] uppercase tracking-[0.12em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              Get directions
            </a>
          </div>
          <p data-in className="mt-7 text-[13px] text-cream/65">
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
