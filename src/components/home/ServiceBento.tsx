import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Img } from "@/components/Img";
import { IMAGES, type OptimizedImage } from "@/lib/images";
import { NAIL_SETS, cropStyle } from "@/lib/nail-sets";

// Desktop (lg+) "What we do" as a photo grid: a tall Nails tile that cycles through real
// sets (with the set's name in a chip), a wide Pedicure tile, and Waxing and Lashes below.
// Tiles open upward one by one as the grid scrolls into view; on hover the photo eases in,
// a thin gold frame appears and a line of detail plus "Book" slides up.

type Tile = {
  key: "nails" | "pedi" | "wax" | "lash";
  name: string;
  hash: "nail-systems" | "pedicures" | "waxing" | "lashes";
  kicker: string;
  more: string;
  image?: OptimizedImage;
};

const TILES: Tile[] = [
  {
    key: "nails",
    name: "Nails",
    hash: "nail-systems",
    kicker: "Gel-X · Builder gel · Acrylic · Dipping · from $42",
    more: "Sets and designs, built to last two to three weeks.",
  },
  {
    key: "pedi",
    name: "Pedicure",
    hash: "pedicures",
    kicker: "Classic to deluxe · from $26",
    more: "From a 20-minute refresh to the 80-minute Belleva Premium with jelly soak.",
    image: IMAGES["wwd-pedicure"],
  },
  {
    key: "wax",
    name: "Waxing",
    hash: "waxing",
    kicker: "Face · body · from $10",
    more: "Smooth, top to toe.",
    image: IMAGES["wwd-waxing"],
  },
  {
    key: "lash",
    name: "Lashes",
    hash: "lashes",
    kicker: "Classic · Volume · Mega volume",
    more: "Full sets from $130, fills from $65.",
    image: IMAGES["wwd-lashes"],
  },
];
// Every set in the collection takes a turn; only the previous, current and next photos are
// mounted so the tile never downloads the whole library at once.
const NAIL_CYCLE = NAIL_SETS;
const CYCLE_MS = 2600;

export function ServiceBento() {
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  // cycle the Nails tile through real sets once it is on screen
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setShown((i) => (i + 1) % NAIL_CYCLE.length), CYCLE_MS);
    return () => window.clearInterval(t);
  }, [inView]);

  return (
    <div ref={root} className={`bento relative mt-12 ${inView ? "is-in" : ""}`}>
      {/* sits on the same line as the "What we do." heading above */}
      <div className="absolute -top-[58px] right-0">
        <Link
          to="/services"
          className="border-b border-forest/40 pb-0.5 text-[12px] uppercase tracking-[0.16em] text-forest transition-colors hover:border-gold"
        >
          Full menu &amp; times →
        </Link>
      </div>
      <div className="bento-grid">
        {TILES.map((t, i) => (
          <Link
            key={t.key}
            to="/services"
            hash={t.hash}
            className={`bento-tile bento-${t.key}`}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="bento-media">
              {t.key === "nails" ? (
                NAIL_CYCLE.map((set, j) => {
                  const n = NAIL_CYCLE.length;
                  if (j !== shown && j !== (shown + 1) % n && j !== (shown - 1 + n) % n)
                    return null;
                  return (
                    <div key={set.key} className={`bento-shot ${j === shown ? "is-on" : ""}`}>
                      {set.crop ? (
                        // salon poster: zoom to the nails, away from the printed text
                        <Img
                          image={set.image}
                          alt={j === shown ? `${set.name} nail set by Belleva Nails` : ""}
                          decorative={j !== shown}
                          sizes="(min-width: 1024px) 560px, 1px"
                          className="h-full w-full object-cover"
                          style={cropStyle(set.crop)}
                        />
                      ) : (
                        // plain photo: shown whole (no fingers or designs cut off) over a soft,
                        // blurred copy of itself that fills the rest of the tile
                        <>
                          <Img
                            image={set.image}
                            alt=""
                            decorative
                            sizes="200px"
                            className="bento-backdrop h-full w-full object-cover"
                          />
                          <Img
                            image={set.image}
                            alt={j === shown ? `${set.name} nail set by Belleva Nails` : ""}
                            decorative={j !== shown}
                            sizes="(min-width: 1024px) 560px, 1px"
                            className="bento-whole absolute inset-0 h-full w-full object-contain"
                          />
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bento-shot is-on">
                  <Img
                    image={t.image!}
                    alt=""
                    decorative
                    sizes={
                      t.key === "pedi"
                        ? "(min-width: 1024px) 760px, 1px"
                        : "(min-width: 1024px) 380px, 1px"
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
            {t.key === "nails" && (
              <span className="bento-chip" aria-hidden="true">
                Now showing · <b className="font-medium">{NAIL_CYCLE[shown]!.name}</b>
              </span>
            )}
            <span className="bento-frame" aria-hidden="true" />
            <span className="bento-text">
              <span className="bento-kicker">{t.kicker}</span>
              <span className="bento-name">{t.name}</span>
              <span className="bento-more">
                <span className="block">{t.more}</span>
                <span className="bento-book">Book {t.name.toLowerCase()} →</span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
