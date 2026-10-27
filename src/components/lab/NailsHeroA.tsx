import { useState } from "react";
import { Img } from "@/components/Img";
import { IMAGES } from "@/lib/images";
import { FINISHES, FINISHES_A, type FinishId } from "./nails3d/finishes";
import { FinishPicker } from "./nails3d/FinishPicker";
import { NailsCanvas } from "./nails3d/NailsCanvas";
import { bookThisLookUrl } from "./nails3d/booking";

/**
 * Version A — the concept as briefed: a floating cluster of five almond nails on the
 * right, copy + finish picker + Book on the left. Dark forest stage so chrome and
 * cat-eye read as jewellery. Below 768px (or without WebGL) a still photo stands in.
 */
export function NailsHeroA() {
  const [finish, setFinish] = useState<FinishId>("chrome");
  const [no3d, setNo3d] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden bg-forest">
      <div className="relative z-10 mx-auto grid min-h-svh max-w-[1248px] items-center px-6 pb-14 pt-28 md:max-w-[1280px] md:grid-cols-[5fr_6fr] md:gap-8 md:px-10 lg:max-w-[1328px] lg:px-16">
        <div className="max-w-[520px]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-gold-light">
            Belleva Nails · Denton
          </p>
          <h1 className="mt-4 font-display text-[48px] font-normal leading-[1.02] text-cream lining-nums md:text-[64px] lg:text-[80px]">
            Find your
            <br />
            next set.
          </h1>
          <p
            className="mt-5 min-h-[3.2em] text-[16px] leading-[1.6] text-cream/85 md:text-[17px]"
            aria-live="polite"
          >
            {FINISHES[finish].description}
          </p>
          <div className="mt-8">
            <FinishPicker
              options={FINISHES_A}
              value={finish}
              onChange={setFinish}
              tone="dark"
              name="finish-a"
            />
          </div>
          <a
            href={bookThisLookUrl(finish, "A")}
            className="mt-9 inline-flex min-h-[48px] items-center gap-3 rounded-full bg-cream px-8 py-3 text-[14px] text-forest transition-colors hover:bg-background"
          >
            Book this look
            <span aria-hidden="true" className="text-gold">
              →
            </span>
          </a>
          <p className="mt-3 text-[12px] text-cream/60">
            We&apos;ll note “{FINISHES[finish].label}” with your booking.
          </p>
        </div>

        <div className="relative mt-12 aspect-square w-full md:mt-0">
          {no3d ? (
            <Img
              image={IMAGES["nail-slide-1"]}
              alt="A Belleva nail set"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-full w-full rounded-[10px] object-cover"
            />
          ) : (
            <NailsCanvas layout="cluster" finish={finish} onUnavailable={() => setNo3d(true)} />
          )}
        </div>
      </div>
    </section>
  );
}
