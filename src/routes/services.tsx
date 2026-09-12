import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";
import { BOOKING_URL } from "@/lib/designs";

const TITLE = "Services — Belleva Nails";
const DESCRIPTION =
  "The Belleva Nails menu: pedicures, manicures, nail systems, a la carte extras, waxing and lashes. Real prices, real times — Denton, Texas.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function FadeUpSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useFadeUp(0.2);
  return (
    <div
      ref={ref}
      className={`fade-up ${visible ? "fade-in-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function CbdTag() {
  return (
    <span className="ml-3 align-middle text-[10px] uppercase tracking-[1.5px] text-gold">
      Lab-tested CBD
    </span>
  );
}

type MenuItem = {
  number: string;
  title: string;
  price: string;
  description: string;
  cbd?: boolean;
  note?: string;
};

function MenuIndex({
  items,
  variant,
}: {
  items: MenuItem[];
  variant: "dark" | "light";
}) {
  const titleColor = variant === "dark" ? "text-cream" : "text-forest";
  const priceColor = variant === "dark" ? "text-cream/70" : "text-forest/70";
  const descColor = variant === "dark" ? "text-cream/80" : "text-forest/80";
  const ruleColor =
    variant === "dark" ? "border-gold/40" : "border-[#E5DFD3]";

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={item.number}
          className={`flex gap-4 py-6 ${i !== 0 ? `border-t ${ruleColor}` : ""}`}
        >
          <span
            className="w-14 flex-shrink-0 font-display text-[28px] leading-none text-gold lining-nums"
          >
            {item.number}
          </span>
          <div>
            <p
              className={`font-display text-[20px] font-medium leading-[1.3] md:text-[22px] ${titleColor}`}
            >
              {item.title}{" "}
              <span className={`font-body text-[14px] ${priceColor} lining-nums`}>
                — {item.price}
              </span>
              {item.cbd && <CbdTag />}
            </p>
            <p className={`mt-1.5 text-[15px] leading-[1.6] ${descColor}`}>
              {item.description}
            </p>
            {item.note && (
              <p className="mt-2 text-[13px] leading-[1.6] text-gold">
                {item.note}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function PriceList({
  entries,
  variant,
}: {
  entries: [string, string][];
  variant: "dark" | "light";
}) {
  const textColor = variant === "dark" ? "text-cream" : "text-forest";
  return (
    <ul className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
      {entries.map(([name, price]) => (
        <li
          key={name}
          className={`flex items-baseline justify-between gap-4 text-[14px] ${textColor}`}
        >
          <span>{name}</span>
          <span className="lining-nums">{price}</span>
        </li>
      ))}
    </ul>
  );
}

const PEDICURES: MenuItem[] = [
  {
    number: "01",
    title: "The Advance",
    price: "$26 · 20 mins",
    description:
      "No massage, no ceremony. Trim, shape, cuticle care, polish — twenty minutes and you're back to your day. We won't take it personally.",
  },
  {
    number: "02",
    title: "The Basic",
    price: "$33 · 30 mins",
    description:
      "You know this one. Foot scrub, mud mask, callus care, and a proper massage with organic lotion. A classic for a reason.",
  },
  {
    number: "03",
    title: "The Deluxe",
    price: "$45 · 45 mins",
    description:
      "Hot stones, paraffin wax, and a 13-minute massage with a scent we pick for you — trust the house. It hasn't missed yet.",
  },
  {
    number: "04",
    title: "The Elegant Belleva",
    price: "$59 · 60 mins",
    description:
      "Lab-tested CBD gummies, drops, or tea to start. Then a 20-minute massage. Sixty minutes that feel like a long weekend.",
    cbd: true,
  },
  {
    number: "05",
    title: "The Belleva Special",
    price: "$73 · 60 mins",
    description:
      "A 28-minute massage with CBD oil and steam. Yes, we timed it. Paraffin, hot stones — and a small gift we refuse to describe.",
    cbd: true,
    note: "For every Special, we donate $1 to United Way of Denton County.",
  },
  {
    number: "06",
    title: "The Belleva Premium",
    price: "$89 · 70–80 mins",
    description:
      "Opens with a jelly soak — pellets hit the water and turn the whole basin into wobble. Childish? Completely. Clients ask for it by name. Then a 36-minute massage, neck and head included, steam, your pick of collagen socks or paraffin. And yes — the secret gift gets an upgrade too.",
    cbd: true,
    note: "For every Premium, we donate $1 to United Way of Denton County.",
  },
];

const MANICURES: MenuItem[] = [
  {
    number: "01",
    title: "The Classic",
    price: "$22 · 20 mins",
    description: "Trim, shape, cuticle care, lotion massage, polish. Simple, done right.",
  },
  {
    number: "02",
    title: "The Deluxe",
    price: "$39 · 30 mins",
    description: "Adds mud mask, paraffin wax, hot towels, and a 12-minute massage.",
  },
  {
    number: "03",
    title: "The Belleva Premium",
    price: "$52",
    description: "CBD to start, an 18-minute massage, paraffin, neck heat. Your hands, but the upgraded version.",
    cbd: true,
  },
];

const CBD_NOTE =
  "CBD services are 18+ and not recommended during pregnancy or breastfeeding. Tell your tech about any allergies. Every batch is lab-tested — reports at the front desk and bellevanail.com.";

const NAIL_SYSTEMS: { name: string; lines: string[] }[] = [
  { name: "Gel-X", lines: ["Short $65 · Medium $70 · Long $75"] },
  { name: "Builder gel", lines: ["Full set $55 · Fill $50"] },
  {
    name: "Dipping",
    lines: ["Color $42+ · French $50+ · French color tips $55+ · Ombre $55+"],
  },
  { name: "Gel / Shellac", lines: ["Gel manicure $42 · Signature $52 · Belleva $65"] },
  {
    name: "Acrylic",
    lines: [
      "Pink & white $65 (fill $55)",
      "With gel polish $55 (fill $50)",
      "With regular polish $45 (fill $40)",
    ],
  },
];

const A_LA_CARTE: [string, string][] = [
  ["Polish change hands", "$12"],
  ["Polish change toes", "$16"],
  ["Gel polish change hands", "$25"],
  ["Gel polish change toes", "$30"],
  ["Paraffin wax", "$9"],
  ["Collagen sock or gloves", "$10"],
  ["Add tips", "$5"],
  ["Length", "from $5"],
  ["Shape", "$5"],
  ["3 colors", "$5"],
  ["Cuticle trim", "$5"],
  ["Add manicure", "$10"],
  ["Chrome", "$15"],
  ["Cat eye", "$20"],
];

const WAXING: [string, string][] = [
  ["Lip", "$10"],
  ["Chin", "$10"],
  ["Brow", "$12"],
  ["Side burns", "$16"],
  ["Full face", "from $42"],
  ["Underarm", "from $26"],
  ["Half arm", "from $26"],
  ["Full arm", "from $36"],
  ["Half legs", "from $42"],
  ["Full legs", "from $62"],
  ["Stomach", "from $25"],
  ["Chest", "from $36"],
  ["Back", "from $36"],
  ["Bikini", "from $42"],
  ["Brazilian", "from $62"],
];

const LASHES: { style: string; prices: string }[] = [
  {
    style: "Classic",
    prices: "Full set $130 · 2-week fill from $65 · 3-week fill from $75",
  },
  {
    style: "Volume",
    prices: "Full set $145 · 2-week fill from $70 · 3-week fill from $90",
  },
  {
    style: "Mega Volume",
    prices: "Full set $180 · 2-week fill from $90 · 3-week fill from $95",
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader heroPassed={true} />

      <main>
        {/* OPENING */}
        <section className="bg-background px-6 pb-16 pt-[120px] md:px-12 md:pb-24 md:pt-[140px]">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Services
              </p>
              <h1 className="mt-4 font-display text-[36px] font-medium leading-[1.05] text-forest md:text-[56px]">
                The menu.
              </h1>
              <p className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-forest">
                Real prices, real times. Book online and tell us your occasion
                in the Note box — we&apos;ll have everything ready.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* PEDICURES */}
        <section className="bg-forest px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Pedicures
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-cream md:text-[48px]">
                Six ways to sit back.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <MenuIndex items={PEDICURES} variant="dark" />
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <p className="text-[13px] leading-[1.7] text-cream/70 lining-nums">
                {CBD_NOTE}
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* MANICURES */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Manicures
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-forest md:text-[48px]">
                Hands, three ways.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <MenuIndex items={MANICURES} variant="light" />
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <p className="text-[13px] leading-[1.7] text-forest/70 lining-nums">
                {CBD_NOTE}
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* NAIL SYSTEMS */}
        <section className="bg-cream px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Nail systems
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-forest md:text-[48px]">
                The build.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <div>
                {NAIL_SYSTEMS.map((group, i) => (
                  <div
                    key={group.name}
                    className={`py-6 ${i !== 0 ? "border-t border-[#E5DFD3]" : ""}`}
                  >
                    <p className="text-[11px] uppercase tracking-[2px] text-gold">
                      {group.name}
                    </p>
                    <div className="mt-2 space-y-1">
                      {group.lines.map((line) => (
                        <p
                          key={line}
                          className="font-display text-[19px] font-normal leading-[1.5] text-forest lining-nums"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* A LA CARTE */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                A la carte
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-forest md:text-[48px]">
                Little extras.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <PriceList entries={A_LA_CARTE} variant="light" />
            </FadeUpSection>
          </div>
        </section>

        {/* WAXING & LASHES */}
        <section className="bg-forest px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Waxing
              </p>
            </FadeUpSection>
            <FadeUpSection className="mt-8">
              <PriceList entries={WAXING} variant="dark" />
            </FadeUpSection>

            <FadeUpSection className="mt-16">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Lashes
              </p>
            </FadeUpSection>
            <FadeUpSection className="mt-8">
              <div>
                {LASHES.map((lash, i) => (
                  <div
                    key={lash.style}
                    className={`py-5 ${i !== 0 ? "border-t border-gold/40" : ""}`}
                  >
                    <p className="font-display text-[20px] font-normal leading-[1.4] text-cream">
                      {lash.style}{" "}
                      <span className="font-body text-[14px] text-cream/70 lining-nums">
                        — {lash.prices}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream px-6 py-16 md:px-12 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="font-display text-[24px] font-normal italic leading-[1.3] text-forest">
                Found yours?
              </p>
              <a
                href={BOOKING_URL}
                className="mt-6 inline-flex items-center rounded-full bg-forest px-8 py-3 text-sm text-cream transition-colors duration-300 hover:bg-forest-soft"
              >
                Book an appointment
              </a>
              <p className="mt-4 text-[12px] text-forest/70">
                Tell us your occasion in the Note box — we&apos;ll take care of
                it.
              </p>
            </FadeUpSection>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyBottomBar show={true} />
    </div>
  );
}
