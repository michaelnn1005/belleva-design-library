import { useRef } from "react";
import { Img } from "@/components/Img";
import { BOOKING_URL } from "@/lib/designs";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { NAIL_SETS, cropStyle, type NailSet } from "@/lib/nail-sets";

// Desktop (lg+) home hero: copy on the left, three columns of real sets drifting
// slowly in opposite directions on the right. Phones and tablets keep the photo hero.

// Fill the three columns automatically: each set goes to the column that is currently
// shortest (tile height follows the photo's own proportions), so any mix of portrait,
// square or landscape photos ends up with columns of roughly equal length.
function balanceColumns(sets: NailSet[], count = 3): NailSet[][] {
  const cols: NailSet[][] = Array.from({ length: count }, () => []);
  const heights = new Array<number>(count).fill(0);
  for (const set of sets) {
    const i = heights.indexOf(Math.min(...heights));
    cols[i]!.push(set);
    // relative tile height for a unit-width column, plus room for the caption
    heights[i]! += set.image.height / set.image.width + 0.15;
  }
  return cols;
}

const COLUMNS = balanceColumns(NAIL_SETS);
// Tiles are spaced with bottom padding (not gap) so two copies are exactly twice one
// pass and the -50% loop is seamless.
// Seconds for one full pass of a 6-tile column (scaled by column length so the drift
// speed stays the same as sets are added); the middle column runs downward.
const DURATIONS = [52, 60, 56];

function Tile({ look, copy }: { look: NailSet; copy: boolean }) {
  return (
    <figure className="m-0 pb-[18px]">
      {/* The tile keeps the photo's own proportions: plain photos are never cropped,
          and the poster crop window above stays exact. */}
      <div
        className="overflow-hidden rounded-[10px] bg-[#e9e3d7] shadow-[0_14px_30px_-20px_rgba(0,0,0,0.4)]"
        style={{ aspectRatio: `${look.image.width} / ${look.image.height}` }}
      >
        <Img
          image={look.image}
          alt={copy ? "" : `${look.name} nail set by Belleva Nails`}
          decorative={copy}
          sizes="(min-width: 1024px) 360px, 1px"
          className="h-full w-full object-cover"
          style={cropStyle(look.crop)}
        />
      </div>
      <figcaption className="mt-2 text-[11px] uppercase tracking-[0.16em] text-forest">
        {look.name}
      </figcaption>
    </figure>
  );
}

// While scrolling out of the hero, the copy drifts back and fades and the three
// columns pull apart at different speeds (depth), on top of their own slow drift.
const SHIFT = [-0.18, -0.42, -0.28];

export function LookbookHero({ onExplore }: { onExplore: () => void }) {
  const introRef = useRef<HTMLDivElement>(null);
  const shiftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rootRef = useScrollProgress<HTMLDivElement>(({ pass }) => {
    const y = Math.max(0, (2 * pass - 1) * window.innerHeight); // px scrolled past the hero top
    const fade = Math.min(1, y / window.innerHeight);
    if (introRef.current) {
      introRef.current.style.transform = `translateY(${(y * 0.35).toFixed(1)}px)`;
      introRef.current.style.opacity = String(Math.max(0, 1 - fade * 1.3));
    }
    shiftRefs.current.forEach((el, i) => {
      if (el) el.style.transform = `translateY(${(y * SHIFT[i]!).toFixed(1)}px)`;
    });
  });

  return (
    <div ref={rootRef} className="absolute inset-0 hidden bg-cream lg:block">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 70% at 74% 55%, rgb(29 49 39 / 0.10), transparent 70%), radial-gradient(30% 40% at 18% 30%, rgb(184 149 90 / 0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid h-full max-w-[1328px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] grid-rows-[minmax(0,1fr)] px-16 lg:gap-10 xl:gap-20">
        <div
          ref={introRef}
          className="lookbook-intro flex flex-col justify-center will-change-transform"
        >
          <p className="eyebrow text-[11px] tracking-[0.32em]">The Belleva lookbook</p>
          {/* Each line rises from behind an invisible line, blurred to sharp; then every
              ~7.5s a soft gold glint sweeps across the whole headline. */}
          <h1 className="mt-6 font-display text-[84px] font-normal leading-[0.98] tracking-[-0.01em] text-forest lining-nums xl:text-[100px]">
            <span className="hero-line">
              <span className="whitespace-nowrap">Find your</span>
            </span>
            <span className="hero-line">
              <span className="whitespace-nowrap">
                <i className="hero-next">next</i> set.
                {/* for Google and screen readers: what and where, as the old site's headline
                    said. Kept inside the line so .hero-line:first/last-child timings don't shift. */}
                <span className="sr-only"> Belleva Nails, nail salon in Denton, Texas.</span>
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-[27rem] text-[19px] leading-[1.55] text-forest">
            Real designs, made in our Denton salon. Book the one you love.
          </p>
          <div className="mt-9 flex items-center gap-3">
            <a
              href={BOOKING_URL}
              className="hero-btn-book inline-flex min-h-[48px] items-center rounded-full bg-forest whitespace-nowrap px-5 py-3 text-[12px] uppercase tracking-[0.12em] xl:px-8 xl:text-[14px] text-cream"
            >
              Book an appointment
              <span aria-hidden="true" className="hero-arrow">
                →
              </span>
            </a>
            <button
              type="button"
              onClick={onExplore}
              className="hero-btn-ghost inline-flex min-h-[48px] items-center rounded-full border border-forest whitespace-nowrap px-5 py-3 text-[12px] uppercase tracking-[0.12em] xl:px-8 xl:text-[14px] text-forest"
              aria-label="Scroll to services"
            >
              Explore services
            </button>
          </div>
          <p className="mt-7 flex items-center gap-3 text-[14px] text-forest/75">
            <span aria-hidden="true" className="hero-live-dot" />
            Real sets, all done by our own techs
          </p>
        </div>

        <div className="lookbook-cols grid h-full grid-cols-3 grid-rows-[minmax(0,1fr)] gap-[18px]">
          {COLUMNS.map((col, i) => (
            <div key={i} className="overflow-hidden">
              <div
                ref={(el) => {
                  shiftRefs.current[i] = el;
                }}
                className="will-change-transform"
              >
                <div
                  className={`lookbook-track flex flex-col ${i === 1 ? "lookbook-down" : ""}`}
                  style={{ animationDuration: `${((DURATIONS[i]! * col.length) / 6).toFixed(1)}s` }}
                >
                  {[false, true].map((copy) =>
                    col.map((set) => <Tile key={`${set.key}-${copy}`} look={set} copy={copy} />),
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
