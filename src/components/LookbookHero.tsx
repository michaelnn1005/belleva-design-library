import { Img } from "@/components/Img";
import { BOOKING_URL } from "@/lib/designs";
import { IMAGES, type OptimizedImage } from "@/lib/images";

// Desktop (lg+) home hero: copy on the left, three columns of real sets drifting
// slowly in opposite directions on the right. Phones and tablets keep the photo hero.

type Look = {
  image: OptimizedImage;
  name: string;
  // The salon's photos are posters with the set name printed on them. Each one is
  // zoomed to a window that shows only the nails: [scale, left, top] where left/top
  // are the window's top-left corner as a fraction of the photo.
  crop: [number, number, number];
};

const LOOKS = {
  rose: { image: IMAGES["gallery-01-rose-veil"], name: "Rosé Veil", crop: [1.6, 0.19, 0.34] },
  milky: { image: IMAGES["gallery-02-milky-orbit"], name: "Milky Orbit", crop: [1.55, 0, 0.32] },
  charm: {
    image: IMAGES["gallery-03-polished-charm"],
    name: "Polished Charm",
    crop: [1.7, 0.41, 0.12],
  },
  matcha: {
    image: IMAGES["gallery-04-matcha-plaid-french"],
    name: "Matcha Plaid French",
    crop: [1.75, 0.43, 0.05],
  },
  linen: { image: IMAGES["gallery-05-linen-bloom"], name: "Linen Bloom", crop: [1.55, 0.17, 0.35] },
  sculpt: {
    image: IMAGES["gallery-06-sculpted-elegance"],
    name: "Sculpted Elegance",
    crop: [1.55, 0.1, 0.33],
  },
  verdant: {
    image: IMAGES["gallery-07-verdant-drift"],
    name: "Verdant Drift",
    crop: [1.55, 0.3, 0],
  },
  lemon: { image: IMAGES["gallery-08-lemon-meadow"], name: "Lemon Meadow", crop: [1.5, 0.33, 0.3] },
  balanced: {
    image: IMAGES["gallery-09-balanced-form"],
    name: "Balanced Form",
    crop: [1.55, 0.35, 0.35],
  },
  darkly: {
    image: IMAGES["gallery-10-darkly-iconic"],
    name: "Darkly Iconic",
    crop: [1.5, 0.33, 0.1],
  },
  turq: {
    image: IMAGES["gallery-11-turquoise-rodeo"],
    name: "Turquoise Rodeo",
    crop: [1.5, 0.17, 0.27],
  },
  web: { image: IMAGES["gallery-12-shadow-web"], name: "Shadow Web", crop: [1.5, 0.33, 0.28] },
  wings: {
    image: IMAGES["gallery-13-iridescent-wings"],
    name: "Iridescent Wings",
    crop: [1.4, 0.15, 0.2],
  },
  amber: { image: IMAGES["gallery-14-amber-foil"], name: "Amber Foil", crop: [1.4, 0.15, 0.22] },
  harle: { image: IMAGES["gallery-15-harlequin-set"], name: "Harlequin Set", crop: [1.5, 0, 0.27] },
  shinobi: { image: IMAGES["gallery-16-shinobi-edge"], name: "Shinobi Edge", crop: [1.65, 0, 0.3] },
  thriller: {
    image: IMAGES["gallery-17-thriller-set"],
    name: "Thriller Set",
    crop: [1.72, 0.42, 0.3],
  },
} satisfies Record<string, Look>;

const COLUMNS: (keyof typeof LOOKS)[][] = [
  ["rose", "shinobi", "lemon", "amber", "milky", "balanced"],
  ["darkly", "linen", "harle", "wings", "charm", "web"],
  ["turq", "matcha", "thriller", "verdant", "sculpt"],
];
// Tiles are spaced with bottom padding (not gap) so two copies are exactly twice one
// pass and the -50% loop is seamless.
// Seconds for one full pass; the middle column runs downward.
const DURATIONS = [52, 60, 56];

function cropStyle([scale, left, top]: Look["crop"]) {
  // transform-origin is the point that stays put while scaling, so the window
  // starting at (left, top) of width 1/scale is reached from origin = left / (1 - 1/scale).
  const k = 1 - 1 / scale;
  return {
    transform: `scale(${scale})`,
    transformOrigin: `${((left / k) * 100).toFixed(1)}% ${((top / k) * 100).toFixed(1)}%`,
  };
}

function Tile({ look, copy }: { look: Look; copy: boolean }) {
  return (
    <figure className="m-0 pb-[18px]">
      {/* The tile keeps the photo's own proportions so the crop window above is exact. */}
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

export function LookbookHero({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="absolute inset-0 hidden bg-cream lg:block">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 70% at 74% 55%, rgb(29 49 39 / 0.10), transparent 70%), radial-gradient(30% 40% at 18% 30%, rgb(184 149 90 / 0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid h-full max-w-[1328px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] grid-rows-[minmax(0,1fr)] px-16 lg:gap-10 xl:gap-20">
        <div className="lookbook-intro flex flex-col justify-center">
          <p className="eyebrow text-[11px] tracking-[0.32em]">The Belleva lookbook</p>
          <h1 className="mt-6 font-display text-[84px] font-normal leading-[0.98] tracking-[-0.01em] text-forest lining-nums xl:text-[100px]">
            <span className="whitespace-nowrap">Find your</span>
            <br />
            <span className="whitespace-nowrap">
              <i>next</i> set.
            </span>
          </h1>
          <p className="mt-6 max-w-[27rem] text-[19px] leading-[1.55] text-forest">
            Real designs, made in our Denton salon. Book the one you love.
          </p>
          <div className="mt-9 flex items-center gap-3">
            <a
              href={BOOKING_URL}
              className="inline-flex min-h-[48px] items-center rounded-full bg-forest whitespace-nowrap px-5 py-3 text-[12px] uppercase tracking-[0.12em] xl:px-8 xl:text-[14px] text-cream transition-colors hover:bg-forest-soft"
            >
              Book an appointment
            </a>
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex min-h-[48px] items-center rounded-full border border-forest whitespace-nowrap px-5 py-3 text-[12px] uppercase tracking-[0.12em] xl:px-8 xl:text-[14px] text-forest transition-colors hover:bg-forest/5"
              aria-label="Scroll to services"
            >
              Explore services
            </button>
          </div>
        </div>

        <div className="lookbook-cols grid h-full grid-cols-3 grid-rows-[minmax(0,1fr)] gap-[18px]">
          {COLUMNS.map((col, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className={`lookbook-track flex flex-col ${i === 1 ? "lookbook-down" : ""}`}
                style={{ animationDuration: `${DURATIONS[i]}s` }}
              >
                {[false, true].map((copy) =>
                  col.map((key) => <Tile key={`${key}-${copy}`} look={LOOKS[key]} copy={copy} />),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
