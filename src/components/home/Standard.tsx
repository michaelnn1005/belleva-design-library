import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Img } from "@/components/Img";
import { IMAGES } from "@/lib/images";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

// Desktop (lg+) pieces of the home "Belleva standard" section. Phones and tablets keep
// the original heading and staggered lines.

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** Heading whose words rise from behind an invisible line; "ask" turns gold and catches a glint. */
export function AskHeading() {
  const { ref, inView } = useInView<HTMLHeadingElement>(0.4);
  const words = ["Things", "you’re", "allowed", "to", "ask", "here."];
  return (
    <h2
      ref={ref}
      className={`std-heading mt-8 max-w-2xl font-display text-[58px] font-medium leading-[1.15] text-cream lining-nums ${inView ? "is-in" : ""}`}
    >
      {words.map((w, i) => (
        <span key={w}>
          <span className="std-mask">
            <span
              className={`std-word ${w === "ask" ? "std-ask" : ""}`}
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              {w}
            </span>
          </span>{" "}
        </span>
      ))}
    </h2>
  );
}

const ASKS = [
  "Ask to see the lab reports.",
  "Ask us to open the tool pouch in front of you.",
  "Ask why we chose your tech for you.",
];

/** The three questions light up one by one as they scroll past the middle of the screen. */
export function AskChecklist() {
  const rows = useRef<(HTMLAnchorElement | null)[]>([]);
  const ref = useScrollProgress<HTMLDivElement>(() => {
    const line = window.innerHeight * 0.7;
    rows.current.forEach((el) => {
      if (!el) return;
      el.classList.toggle("is-lit", el.getBoundingClientRect().top < line);
    });
  });
  return (
    <div ref={ref} className="mt-10 flex max-w-[760px] flex-col">
      {ASKS.map((q, i) => (
        <Link
          key={q}
          ref={(el) => {
            rows.current[i] = el;
          }}
          to="/standard"
          hash="ask"
          className="std-row group"
          style={{ transitionDelay: `${i * 0.06}s` }}
        >
          <span className="std-num">0{i + 1}</span>
          <span className="std-q">{q}</span>
          <span className="std-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}

/** The tray photo opens upward, then two gold call-outs point at what the questions promise. */
export function TrayEvidence() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  return (
    <figure ref={ref} className={`std-tray m-0 ${inView ? "is-in" : ""}`}>
      <div className="std-tray-clip relative aspect-[4/5] overflow-hidden rounded-[10px]">
        <Img
          image={IMAGES["standard-tray"]}
          alt="Sterilised tools and single-use files on a steel tray at Belleva Nails"
          sizes="460px"
          className="std-tray-img h-full w-full object-cover"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 100 125"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path className="std-lead std-lead-1" pathLength={1} d="M 52 14 C 51 24, 48 36, 45 46" />
          <path className="std-lead std-lead-2" pathLength={1} d="M 42 104 C 52 96, 61 84, 66 70" />
        </svg>
        <span className="std-pin std-pin-1" style={{ left: "45%", top: "36.8%" }} />
        <span className="std-pin std-pin-2" style={{ left: "66%", top: "56%" }} />
        <span className="std-tag std-tag-1" style={{ right: "5%", top: "6%" }}>
          Sealed pouch, opened in front of you
        </span>
        <span className="std-tag std-tag-2" style={{ left: "5%", bottom: "6%" }}>
          Single-use file &amp; buffer
          <span className="std-tag-sub">Used once, then thrown away</span>
        </span>
      </div>
    </figure>
  );
}
