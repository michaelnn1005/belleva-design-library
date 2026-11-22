import { useEffect, useRef } from "react";
import { Img } from "@/components/Img";
import { BOOKING_URL } from "@/lib/designs";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cropStyle, setByKey, variantUrl } from "@/lib/nail-sets";

// Desktop (lg+) band between Services and the Standard: "Every set here is real."
// The section is ~1.9 screens tall with a pinned inner screen. While it is pinned:
//   - "Every set here is" rises word by word from behind an invisible line, blurred to sharp,
//     then fills with ink (soft edge), while a gold pen stroke draws underneath and ends in
//     a flourish under "real";
//   - "real" carries real nail photos drifting inside its letters, grey until the ink
//     reaches it, then a gold glint sweeps across and the gold full stop appears;
//   - a row of sets slides the other way underneath (text and photos never overlap);
//   - a gold rule draws along the caption line.

const WORDS = ["Every", "set", "here", "is"];
const INSIDE = [
  "darkly",
  "gallery-20-emerald-serpent",
  "sculpt",
  "gallery-27-smoky-halo",
  "gallery-21-gilded-web",
  "turq",
].map(setByKey); // photos inside "real"
const ROW = [
  "linen",
  "gallery-21-gilded-web",
  "matcha",
  "gallery-20-emerald-serpent",
  "shinobi",
  "gallery-26-silver-bloom",
  "rose",
  "gallery-22-ink-current",
].map(setByKey);
const SHINE = "linear-gradient(105deg, transparent 38%, rgba(255,238,200,.7) 50%, transparent 62%)";
const TILE_W = 300;
const TILE_H = 380;

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const ease = (t: number) => t * t * (3 - 2 * t);

export function RealRibbon() {
  const sentence = useRef<HTMLParagraphElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const rule = useRef<HTMLSpanElement>(null);
  const penPath = useRef<SVGPathElement>(null);
  const penLength = useRef(0);
  const lastProgress = useRef(0);

  // Shape the gold pen stroke to the real word positions (after fonts load, and on resize):
  // a gentle wave under "Every set here is", a swoop under "real", then a tail flicking up.
  useEffect(() => {
    const build = () => {
      const s = sentence.current;
      const path = penPath.current;
      if (!s || !path || !s.offsetWidth) return;
      const box = s.getBoundingClientRect();
      const words = [...s.querySelectorAll<HTMLElement>(".real-word")].map((w) => w.parentElement!);
      const first = words[0]!.getBoundingClientRect();
      const last = words[words.length - 1]!.getBoundingClientRect();
      const real = s.querySelector<HTMLElement>(".real-photo")!.getBoundingClientRect();
      const x0 = first.left - box.left;
      const xa = last.right - box.left;
      const r0 = real.left - box.left;
      const r1 = real.right - box.left;
      const y = box.height + 10;
      const f = (n: number) => n.toFixed(1);
      path.setAttribute(
        "d",
        `M ${f(x0)} ${f(y)} C ${f(x0 + (xa - x0) * 0.35)} ${f(y - 5)}, ${f(x0 + (xa - x0) * 0.7)} ${f(y + 5)}, ${f(xa)} ${f(y)} ` +
          `C ${f(xa + (r0 - xa) * 0.6)} ${f(y - 3)}, ${f(r0)} ${f(y + 14)}, ${f((r0 + r1) / 2)} ${f(y + 12)} ` +
          `C ${f(r1 - 20)} ${f(y + 10)}, ${f(r1 + 30)} ${f(y + 4)}, ${f(r1 + 62)} ${f(y - 34)}`,
      );
      penLength.current = path.getTotalLength();
      path.style.strokeDasharray = String(penLength.current);
      path.style.strokeDashoffset = String(
        penLength.current * (1 - ease(clamp((lastProgress.current - 0.24) / 0.32))),
      );
    };
    void document.fonts.ready.then(build);
    window.addEventListener("resize", build);
    return () => window.removeEventListener("resize", build);
  }, []);

  const ref = useScrollProgress<HTMLElement>(({ pass: p }) => {
    lastProgress.current = p;
    const s = sentence.current;
    if (!s) return;
    s.style.transform = `translateX(${((0.5 - p) * 380).toFixed(1)}px)`;
    s.querySelectorAll<HTMLElement>(".real-word").forEach((el, i) => {
      const rise = ease(clamp((p - (0.22 + i * 0.045)) / 0.07));
      const ink = ease(clamp((p - (0.27 + i * 0.045)) / 0.08));
      el.style.transform = `translateY(${((1 - rise) * 1.15).toFixed(3)}em)`;
      el.style.filter = rise < 1 ? `blur(${((1 - rise) * 8).toFixed(2)}px)` : "";
      el.style.backgroundPosition = `${(1 - ink) * 100}% 0`;
    });
    const pen = penPath.current;
    if (pen && penLength.current) {
      const draw = ease(clamp((p - 0.24) / 0.32));
      pen.style.strokeDashoffset = (penLength.current * (1 - draw)).toFixed(1);
    }
    const real = s.querySelector<HTMLElement>(".real-photo")!;
    const fn = ease(clamp((p - 0.43) / 0.09));
    const glint = clamp((p - 0.5) / 0.12);
    const zoom = 1 + p * 0.12;
    const drift = p * (INSIDE.length - 1) * TILE_W;
    real.style.backgroundPosition =
      `0 0,${(115 - glint * 130).toFixed(1)}% 0,` +
      INSIDE.map((_, i) => `${Math.round(i * TILE_W * zoom - drift)}px -96px`).join(",");
    real.style.backgroundSize =
      "100% 100%,300% 100%," +
      INSIDE.map(() => `${Math.round(TILE_W * zoom)}px ${Math.round(TILE_H * zoom)}px`).join(",");
    real.style.filter = `saturate(${fn.toFixed(3)}) brightness(${(1.06 - fn * 0.06).toFixed(3)})`;
    // "real" rises out of the same line on its turn, then turns from grey to full colour
    const riseReal = ease(clamp((p - 0.4) / 0.07));
    real.style.transform = `translateY(${((1 - riseReal) * 1.15).toFixed(3)}em)`;
    const fd = ease(clamp((p - 0.52) / 0.05));
    const dot = s.querySelector<HTMLElement>(".real-dot")!;
    dot.style.opacity = fd.toFixed(3);
    dot.style.transform = `scale(${(0.4 + fd * 0.6).toFixed(3)})`;
    if (rule.current)
      rule.current.style.transform = `scaleX(${ease(clamp((p - 0.3) / 0.3)).toFixed(3)})`;
    if (strip.current)
      strip.current.style.transform = `translateX(${(-1060 + p * 900).toFixed(1)}px)`;
  });

  return (
    <section
      ref={ref}
      aria-label="Every set here is real"
      className="relative hidden h-[190vh] bg-cream lg:block"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <p
          ref={sentence}
          className="relative mx-auto whitespace-nowrap font-display text-[clamp(96px,9.4vw,136px)] font-normal leading-none tracking-[-0.015em] will-change-transform"
        >
          {WORDS.map((w) => (
            <span key={w}>
              <span className="real-mask">
                <span className="real-word">{w}</span>
              </span>{" "}
            </span>
          ))}
          <span className="real-mask">
            <span
              className="real-photo"
              style={{
                backgroundImage: [
                  "linear-gradient(rgb(29 49 39 / .25), rgb(29 49 39 / .25))",
                  SHINE,
                  ...INSIDE.map((s) => `url(${variantUrl(s.image)})`),
                ].join(","),
              }}
            >
              real
            </span>
          </span>
          <span className="real-dot">.</span>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <path
              ref={penPath}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>

        <div ref={strip} className="mt-[7vh] flex gap-7 will-change-transform">
          {ROW.map((set) => (
            <figure key={set.key} className="m-0 shrink-0">
              <div
                className="h-[clamp(260px,40vh,380px)] overflow-hidden rounded-[12px] shadow-[0_30px_50px_-34px_rgba(0,0,0,0.6)]"
                style={{ aspectRatio: `${set.image.width} / ${set.image.height}` }}
              >
                <Img
                  image={set.image}
                  alt={`${set.name} nail set by Belleva Nails`}
                  sizes="(min-width: 1024px) 300px, 1px"
                  className="h-full w-full object-cover"
                  style={cropStyle(set.crop)}
                />
              </div>
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-forest">
                {set.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="absolute inset-x-16 bottom-[5.5vh] flex justify-between pt-4 text-[11.5px] uppercase tracking-[0.2em] text-muted-foreground">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-forest/15" />
          <span
            ref={rule}
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold"
          />
          <span>
            Made in <b className="font-medium text-forest">our Denton salon</b> · by our own techs
          </span>
          <a href={BOOKING_URL} className="transition-colors hover:text-forest">
            Book the one you love →
          </a>
        </div>
      </div>
    </section>
  );
}
