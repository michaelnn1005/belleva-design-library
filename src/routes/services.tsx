import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";
import { BOOKING_URL } from "@/lib/designs";
import servicesHeroAsset from "@/assets/services-hero.png.asset.json";

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
              <span className={`inline-block whitespace-nowrap font-body text-[14px] ${priceColor} lining-nums`}>
                — {item.price}
              </span>
            </p>
            {item.cbd && (
              <p className="mt-1 text-[10px] uppercase tracking-[1.5px] text-gold">
                Lab-tested CBD
              </p>
            )}
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


const NAIL_SYSTEMS: {
  name: string;
  descriptor: string;
  rows: [string, string][];
}[] = [
  {
    name: "Gel-X",
    descriptor:
      "Soft-gel extensions shaped to you, no drilling. The set most of our designs are built on.",
    rows: [
      ["Short", "$65"],
      ["Medium", "$70"],
      ["Long", "$75"],
    ],
  },
  {
    name: "Builder gel",
    descriptor:
      "A strengthening overlay on your natural nail, for growing length without extensions.",
    rows: [
      ["Full set", "$55"],
      ["Fill", "$50"],
    ],
  },
  {
    name: "Dipping",
    descriptor:
      "Powder, no UV, a hard finish that holds. Plus means the price rises with length and detail.",
    rows: [
      ["Color", "$42+"],
      ["French", "$50+"],
      ["French color tips", "$55+"],
      ["Ombre", "$55+"],
    ],
  },
  {
    name: "Gel / Shellac",
    descriptor:
      "Gel polish over a full manicure, in three levels of care.",
    rows: [
      ["Gel manicure", "$42"],
      ["Signature", "$52"],
      ["Belleva", "$65"],
    ],
  },
  {
    name: "Acrylic",
    descriptor:
      "The classic structure. Fills every two to three weeks keep it clean.",
    rows: [
      ["Pink & white", "$65 (fill $55)"],
      ["With gel polish", "$55 (fill $50)"],
      ["With regular polish", "$45 (fill $40)"],
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

const WAXING: { label: string; entries: [string, string][] }[] = [
  {
    label: "Face",
    entries: [
      ["Lip", "$10"],
      ["Chin", "$10"],
      ["Brow", "$12"],
      ["Side burns", "$16"],
      ["Full face", "from $42"],
    ],
  },
  {
    label: "Body",
    entries: [
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
    ],
  },
];

const LASHES: { label: string; rows: [string, string][] }[] = [
  {
    label: "Classic",
    rows: [
      ["Full set", "$130"],
      ["2-week fill", "from $65"],
      ["3-week fill", "from $75"],
    ],
  },
  {
    label: "Volume",
    rows: [
      ["Full set", "$145"],
      ["2-week fill", "from $70"],
      ["3-week fill", "from $90"],
    ],
  },
  {
    label: "Mega Volume",
    rows: [
      ["Full set", "$180"],
      ["2-week fill", "from $90"],
      ["3-week fill", "from $95"],
    ],
  },
];

function ServicesPage() {
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight - 20 : window.innerHeight - 20;
      setHeroPassed(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader heroPassed={heroPassed} />

      <main>
        {/* OPENING */}
        <section
          id="hero"
          className="relative h-[60vh] min-h-[440px] w-full md:h-[70vh] md:min-h-[520px]"
        >
          <img
            src={servicesHeroAsset.url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-[center_right] rounded-none"
          />
          <div className="absolute inset-0 bg-forest/35" />
          <div className="relative mx-auto flex h-full max-w-[720px] items-center px-6 md:px-12">
            <FadeUpSection className="w-full">
              <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-[#FAF8F5]/80">
                Services
              </p>
              <h1 className="mt-3 max-w-[640px] font-display text-[36px] font-medium leading-[1.1] text-[#FAF8F5] md:text-[56px]">
                The menu.
              </h1>
              <p className="mt-5 max-w-[560px] font-sans text-[16px] leading-[1.6] text-[#FAF8F5]/75">
                Real prices, real times. Book online and tell us your occasion
                in the Note box — we&apos;ll have everything ready.
              </p>
              <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  ["Pedicures", "#pedicures"],
                  ["Manicures", "#manicures"],
                  ["Nail systems", "#nail-systems"],
                  ["Extras", "#extras"],
                  ["Waxing", "#waxing"],
                  ["Lashes", "#lashes"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="font-sans text-[12px] uppercase tracking-[0.12em] text-[#FAF8F5]/80 no-underline transition-colors hover:text-[#FAF8F5] hover:underline underline-offset-4"
                  >
                    {label}
                  </a>
                ))}
              </nav>
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
              <p className="mt-4 max-w-[560px] font-sans text-[17px] leading-[1.55] text-forest/75">
                Every set below is guaranteed for 14 days. Designs go in the
                Note when you book.
              </p>
            </FadeUpSection>
            <FadeUpSection className="mt-0 md:mt-4">
              <div>
                {NAIL_SYSTEMS.map((group, i) => (
                  <div
                    key={group.name}
                    className={`py-10 ${i !== 0 ? "border-t border-forest/12" : ""}`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                      {group.name}
                    </p>
                    <p className="mt-2 max-w-[560px] font-sans text-[15px] leading-[1.55] text-forest/70">
                      {group.descriptor}
                    </p>
                    <div className="mt-4">
                      {group.rows.map(([variant, price]) => (
                        <div
                          key={variant}
                          className="flex h-10 items-center justify-between font-display text-[22px] leading-none text-forest lining-nums"
                        >
                          <span>{variant}</span>
                          <span>{price}</span>
                        </div>
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
              <h2 className="mb-10 mt-3 font-display text-[30px] font-medium leading-[1.1] text-cream lining-nums md:text-[40px]">
                Smooth, top to toe.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-8">
              <div>
                {WAXING.map((group, i) => (
                  <div key={group.label} className={i !== 0 ? "mt-8" : ""}>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gold/70">
                      {group.label}
                    </p>
                    <div className="mt-3">
                      <PriceList entries={group.entries} variant="dark" />
                    </div>
                  </div>
                ))}
              </div>
            </FadeUpSection>

            <FadeUpSection className="mt-16">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Lashes
              </p>
              <h2 className="mb-10 mt-3 font-display text-[30px] font-medium leading-[1.1] text-cream lining-nums md:text-[40px]">
                Lashes, three ways.
              </h2>
              <div>
                {LASHES.map((lash, i) => (
                  <div
                    key={lash.label}
                    className={`py-8 ${i !== 0 ? "border-t border-cream/15" : "pt-0"}`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gold/70">
                      {lash.label}
                    </p>
                    <div className="mt-3">
                      {lash.rows.map(([variant, price]) => (
                        <div
                          key={variant}
                          className="flex h-9 items-center justify-between font-sans text-[17px] leading-none text-cream lining-nums"
                        >
                          <span>{variant}</span>
                          <span>{price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* GOOD TO KNOW */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Good to know
              </p>
              <div className="mt-10 space-y-8">
                <div className="border-t border-[#2F4A3E]/12 pt-8">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                    Guarantee
                  </p>
                  <p className="mt-2 font-sans text-[16px] leading-[1.6] text-forest/85">
                    Anything wrong within 14 days, we fix it free. Weekday
                    repairs are the fastest.
                  </p>
                </div>
                <div className="border-t border-[#2F4A3E]/12 pt-8">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                    Design
                  </p>
                  <p className="mt-2 font-sans text-[16px] leading-[1.6] text-forest/85">
                    Book ahead and put your design in the Note. We match you with
                    a technician who does that kind of work.
                  </p>
                </div>
                <div className="border-t border-[#2F4A3E]/12 pt-8">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                    On CBD
                  </p>
                  <p className="mt-2 font-sans text-[16px] leading-[1.6] text-forest/85">
                    CBD services are 18+ and not recommended during pregnancy or
                    breastfeeding. Tell your tech about any allergies. Every batch
                    is lab-tested; reports at the front desk and on
                    bellevanail.com.
                  </p>
                </div>
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
