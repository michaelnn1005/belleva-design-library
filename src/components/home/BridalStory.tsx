import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Img } from "@/components/Img";
import { IMAGES, type OptimizedImage } from "@/lib/images";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

// Desktop (lg+) home Bridal section as a wedding album that turns sideways as you scroll.
// The section pins; four album pages (tell us → we match → trial → wedding set) slide left,
// the page in the middle comes into focus, and a labelled gold timeline fills underneath.
// The last page is the wedding-date picker, which opens the Bridal form with the date filled in.
// Every piece of text lives inside its own page, so nothing swaps in place or overlaps.

type Page = {
  image: OptimizedImage;
  num: string;
  title: string;
  label: string;
  text: string;
  sparks?: boolean;
};

const PAGES: Page[] = [
  {
    image: IMAGES["bridal-step-tell"],
    num: "01",
    label: "Tell us",
    title: "Tell us about your day",
    text: "Your wedding date, when you'd like to come in, your dress colour and the look you love. A short form, or simply a text.",
  },
  {
    image: IMAGES["bridal-step-match"],
    num: "02",
    label: "We match",
    title: "We match your nail artist",
    text: "We pair you with the technician whose work fits your style, then text you to confirm a trial time that suits you.",
  },
  {
    image: IMAGES["bridal-step-trial"],
    num: "03",
    label: "Your trial",
    title: "Your trial",
    text: "Two to four weeks before the wedding, we build your set to match your dress and photograph the final look, so nothing is left to memory.",
    sparks: true,
  },
  {
    image: IMAGES["bridal-step-wedding"],
    num: "04",
    label: "Wedding set",
    title: "Your wedding set",
    text: "Three to five days before the big day, it's recreated exactly. You leave with a care kit, and it's guaranteed through your big day.",
  },
];
// Gold star charms and the wedding band on the trial photo (percent of its 4:5 frame) that catch the light.
const SPARKS: [number, number, number][] = [
  [33.2, 50.8, 0],
  [48.2, 74.9, 1.2],
  [78.6, 51.4, 2.4],
];

const clamp = (v: number) => Math.max(0, Math.min(1, v));

export function BridalStory() {
  const [date, setDate] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);

  const ref = useScrollProgress<HTMLElement>(({ pin }) => {
    const t = track.current;
    if (!t) return;
    // a short hold at both ends, then the album slides from its first page to its last
    const p = clamp((pin - 0.06) / 0.86);
    const pad = 64;
    const distance = Math.max(0, t.scrollWidth - (window.innerWidth - pad * 2));
    t.style.transform = `translate3d(${(-p * distance).toFixed(1)}px,0,0)`;
    if (fill.current) fill.current.style.transform = `scaleX(${p.toFixed(4)})`;
    // focus the page nearest the middle of the screen; photos drift a little for depth
    const mid = window.innerWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.current.forEach((card, i) => {
      if (!card) return;
      const r = card.getBoundingClientRect();
      const off = (r.left + r.width / 2 - mid) / window.innerWidth;
      const d = Math.abs(off);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
      card.style.setProperty("--focus", (1 - clamp(d * 1.6)).toFixed(3));
      card.style.setProperty("--drift", `${(-off * 60).toFixed(1)}px`);
    });
    setActive((a) => (a === best ? a : best));
  });

  const saveDate = (e: FormEvent) => {
    e.preventDefault();
    const d = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `?date=${date}` : "";
    void navigate({ href: `/bridal${d}#join` });
  };

  // earliest selectable date; set after mount so server and browser render the same markup
  const [today, setToday] = useState<string>();
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  const labels = [...PAGES.map((p) => p.label), "Your date"];

  return (
    <section
      ref={ref}
      id="bridal-story"
      aria-label="Belleva bridal, step by step"
      className="relative hidden h-[460vh] bg-background lg:block"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-[96px]">
        <div className="mx-auto flex w-full max-w-[1328px] items-end justify-between gap-12 px-16">
          <div>
            <p className="eyebrow">Belleva bridal</p>
            <h2 className="mt-4 font-display text-[clamp(40px,3.6vw,52px)] font-normal leading-[1.1] text-forest">
              Joining costs nothing.
              <br />
              You just get <span className="bridal-more">more.</span>
            </h2>
          </div>
          <p className="max-w-[400px] pb-2 text-[16px] leading-[1.65] text-muted-foreground">
            No packages, no fees – just a bride who walks in calm, because everything about her
            nails was decided weeks ago. Here is how it works.
          </p>
        </div>

        <div className="relative mt-[4vh] flex-1">
          <div
            ref={track}
            className="album-track absolute left-16 top-0 flex h-full items-start gap-8 will-change-transform"
          >
            {PAGES.map((page, i) => (
              <article
                key={page.num}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className={`album-page ${i === active ? "is-active" : ""}`}
              >
                <div className="album-photo">
                  <div className="album-shot">
                    <Img
                      image={page.image}
                      alt={`${page.title} – Belleva bridal`}
                      sizes="(min-width: 1024px) 420px, 1px"
                      className="h-full w-full object-cover"
                    />
                    {page.sparks &&
                      SPARKS.map(([x, y, d]) => (
                        <i
                          key={`${x}-${y}`}
                          aria-hidden="true"
                          className="bridal-spark"
                          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }}
                        />
                      ))}
                  </div>
                </div>
                <div className="album-text">
                  <p className="font-display text-[64px] leading-none text-gold/35">{page.num}</p>
                  <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.18em] text-gold">
                    {page.title}
                  </p>
                  <p className="mt-3 font-display text-[24px] leading-[1.35] text-forest">
                    {page.text}
                  </p>
                </div>
              </article>
            ))}

            <article
              ref={(el) => {
                cards.current[PAGES.length] = el;
              }}
              className={`album-page album-cta ${active === PAGES.length ? "is-active" : ""}`}
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-gold-light">
                Free to join
              </p>
              <h3 className="mt-5 font-display text-[44px] font-normal leading-[1.08] text-cream">
                Ready when
                <br />
                <i>you are.</i>
              </h3>
              <form onSubmit={saveDate} className="mt-8">
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-gold-light">
                    Your wedding date
                  </span>
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border-b border-cream/30 bg-transparent py-2.5 text-[15px] text-cream outline-none [color-scheme:dark] focus:border-gold-light"
                  />
                </label>
                <button type="submit" className="bridal-save mt-6 border-gold-light text-cream">
                  Plan my bridal nails
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <circle cx="8" cy="10" r="4.5" />
                    <path d="M6 4.5 8 2l2 2.5L8 5.6z" />
                  </svg>
                </button>
              </form>
              <p className="mt-6 text-[13px] leading-[1.6] text-cream/75">
                Rather talk it through? Text{" "}
                <a
                  href="sms:+19405141808"
                  className="whitespace-nowrap text-cream underline decoration-gold-light underline-offset-4"
                >
                  (940) 514-1808
                </a>{" "}
                and we&apos;ll arrange everything.
              </p>
            </article>
          </div>
        </div>

        {/* labelled timeline: the gold line fills as the album turns; the current step lights up */}
        <div className="mx-auto mb-[5vh] mt-6 w-full max-w-[1328px] px-16" aria-hidden="true">
          <div className="relative h-px bg-forest/15">
            <span ref={fill} className="absolute inset-0 origin-left scale-x-0 bg-gold" />
          </div>
          <div className="mt-3 flex justify-between">
            {labels.map((l, i) => (
              <span
                key={l}
                className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ${
                  i <= active ? "text-forest" : "text-forest/35"
                }`}
              >
                <i
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${i <= active ? "bg-gold" : "bg-forest/20"}`}
                />
                {i < PAGES.length ? `0${i + 1} · ${l}` : l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
