import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Img } from "@/components/Img";
import { IMAGES } from "@/lib/images";
import { FINISHES, FINISHES_B, type FinishId } from "./nails3d/finishes";
import { FinishPicker } from "./nails3d/FinishPicker";
import { NailsCanvas } from "./nails3d/NailsCanvas";
import { bookThisLookUrl } from "./nails3d/booking";

/**
 * Version B — one large nail the client can turn by dragging, on the light cream stage
 * used across the site, with a Bridal pearl finish first in line. One nail shows each
 * finish up close (the point of choosing a finish), costs a fifth of the GPU work, and
 * the drag gives touch-screen tablets an interaction that doesn't depend on a mouse.
 */
export function NailsHeroB() {
  const [finish, setFinish] = useState<FinishId>("pearl");
  const [no3d, setNo3d] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden bg-cream">
      <div className="relative z-10 mx-auto grid min-h-svh max-w-[1248px] items-center px-6 pb-14 pt-28 md:max-w-[1280px] md:grid-cols-2 md:gap-10 md:px-10 lg:max-w-[1328px] lg:px-16">
        <div className="max-w-[520px] md:order-1">
          <p className="text-[11px] uppercase tracking-[0.14em] text-gold">Try it on</p>
          <h1 className="mt-4 font-display text-[48px] font-normal leading-[1.02] text-forest lining-nums md:text-[64px] lg:text-[80px]">
            Find your
            <br />
            next set.
          </h1>
          <div className="mt-8">
            <FinishPicker
              options={FINISHES_B}
              value={finish}
              onChange={setFinish}
              tone="light"
              name="finish-b"
            />
          </div>
          <p
            className="mt-6 min-h-[3.2em] max-w-[440px] text-[16px] leading-[1.6] text-forest/80"
            aria-live="polite"
          >
            {FINISHES[finish].description}
          </p>
          <a
            href={bookThisLookUrl(finish, "B")}
            className="mt-7 inline-flex min-h-[48px] items-center gap-3 rounded-full bg-forest px-8 py-3 text-[14px] text-cream transition-colors hover:bg-forest-soft"
          >
            Book this look
            <span aria-hidden="true" className="text-gold-light">
              →
            </span>
          </a>
          {finish === "pearl" && (
            <p className="mt-3 text-[12px] text-forest/60">
              Getting married? Pearl is part of our{" "}
              <Link to="/bridal" className="underline underline-offset-4">
                bridal program
              </Link>
              .
            </p>
          )}
        </div>

        <div className="relative mt-12 aspect-[4/5] w-full md:order-2 md:mt-0">
          {no3d ? (
            <Img
              image={IMAGES["bridal-guarantee"]}
              alt="A bride's pearl-pink manicure"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-full w-full rounded-[10px] object-cover"
            />
          ) : (
            <>
              {/* Soft halo so ivory finishes separate from the cream stage. */}
              <div
                aria-hidden="true"
                className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(47,74,62,0.16)_0%,rgba(47,74,62,0.06)_45%,transparent_70%)]"
              />
              <NailsCanvas
                layout="single"
                finish={finish}
                onUnavailable={() => setNo3d(true)}
                className="relative cursor-grab active:cursor-grabbing"
              />
              <p className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-[11px] uppercase tracking-[0.14em] text-forest/50 md:block">
                Drag to turn
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
