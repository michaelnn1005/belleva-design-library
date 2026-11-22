import { useEffect, useRef, type RefObject } from "react";

/** Scroll position of a section, for scroll-driven desktop effects. */
export type ScrollProgress = {
  /** 0 when the section's top reaches the bottom of the screen, 1 when its bottom leaves the top. */
  pass: number;
  /** For tall sections with a sticky child: 0 when the section reaches the top, 1 when it stops being pinned. */
  pin: number;
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));

/**
 * Calls `paint` with the section's scroll progress, desktop (lg+) only.
 * The value glides toward the real scroll position with a short time-based ease
 * (~0.12s), so motion stays smooth with a notchy mouse wheel at any frame rate.
 * Reduced-motion users get the exact position with no glide.
 */
export function useScrollProgress<T extends HTMLElement>(
  paint: (p: ScrollProgress) => void,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const paintRef = useRef(paint);
  paintRef.current = paint;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cur: ScrollProgress | null = null;
    let target: ScrollProgress = { pass: 0, pin: 0 };
    let raf = 0;
    let last = 0;

    const measure = (): ScrollProgress => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return {
        pass: clamp((vh - r.top) / (r.height + vh)),
        pin: clamp(-r.top / Math.max(1, r.height - vh)),
      };
    };
    const step = (now: number) => {
      const k = reduce.matches ? 1 : 1 - Math.exp(-Math.min(200, now - last) / 120);
      last = now;
      const c = cur!;
      c.pass += (target.pass - c.pass) * k;
      c.pin += (target.pin - c.pin) * k;
      const done = Math.abs(target.pass - c.pass) < 3e-4 && Math.abs(target.pin - c.pin) < 3e-4;
      if (done) cur = { ...target };
      paintRef.current(cur!);
      raf = done ? 0 : requestAnimationFrame(step);
    };
    const onScroll = () => {
      if (!desktop.matches) return;
      target = measure();
      if (!cur) {
        cur = { ...target };
        paintRef.current(cur);
        return;
      }
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
