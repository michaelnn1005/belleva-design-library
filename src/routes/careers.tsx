import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";

const TITLE = "Careers — Belleva Nails";
const DESCRIPTION =
  "Come build with us at Belleva Nails in Denton, Texas. A salon built by a nail tech who knows what the floor is worth.";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/careers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
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

type EditorialItem = {
  number: string;
  title: string;
  description: string;
};

function EditorialIndex({
  items,
  variant,
}: {
  items: EditorialItem[];
  variant: "dark" | "light";
}) {
  const numberColor = variant === "dark" ? "text-gold" : "text-gold";
  const titleColor = variant === "dark" ? "text-cream" : "text-forest";
  const descColor =
    variant === "dark" ? "text-cream/80" : "text-forest/80";
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
            className={`w-14 flex-shrink-0 font-display text-[28px] leading-none ${numberColor} lining-nums`}
          >
            {item.number}
          </span>
          <div>
            <p
              className={`font-display text-[20px] font-medium leading-[1.3] md:text-[22px] ${titleColor}`}
            >
              {item.title}
            </p>
            <p className={`mt-1.5 text-[15px] leading-[1.6] ${descColor}`}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const WHAT_YOU_GET_ITEMS: EditorialItem[] = [
  {
    number: "01",
    title: "A clear, healthy floor",
    description: "No favoritism, no bullying, no surprises on payday.",
  },
  {
    number: "02",
    title: "Income first",
    description: "We don't grow by squeezing the people doing the work.",
  },
  {
    number: "03",
    title: "Room to grow",
    description: "In nails if that's your path, and beyond it if you want more.",
  },
  {
    number: "04",
    title: "A team that's still climbing",
    description:
      "We stay small on purpose and hire for character and skill, not chair count.",
  },
];

const WHERE_THIS_CAN_GO_ITEMS: EditorialItem[] = [
  {
    number: "01",
    title: "Master your craft",
    description:
      "Design work, advanced systems, the sets that get photographed. We train for it — you don't figure it out alone.",
  },
  {
    number: "02",
    title: "Beyond the chair",
    description:
      "Content, front desk, operations. If you have a strength outside nails, we'd rather use it than waste it.",
  },
  {
    number: "03",
    title: "The business track",
    description:
      "We're building a team to help this salon grow into more than one. If you can think past your own chair, there's a seat at that table.",
  },
];

function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader heroPassed={true} />

      <main>
        {/* OPENING */}
        <section className="bg-background px-6 pb-16 pt-[120px] md:px-12 md:pb-24 md:pt-[140px]">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Careers
              </p>
              <h1 className="mt-4 font-display text-[36px] font-medium leading-[1.05] text-forest md:text-[56px]">
                Come build with us.
              </h1>
              <p className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-forest">
                I spent six years at the chair, then ran the floor as a manager before I ever owned a salon. I've seen this industry from every seat — including the ones where you get shorted, talked down to, or pushed aside. That's a big part of why I built this one.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* WHAT YOU GET HERE */}
        <section className="bg-forest px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                What you get here
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-cream md:text-[48px]">
                The floor matters.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <EditorialIndex items={WHAT_YOU_GET_ITEMS} variant="dark" />
            </FadeUpSection>
          </div>
        </section>

        {/* WHERE THIS CAN GO */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Where this can go
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-forest md:text-[48px]">
                Three ways up.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <EditorialIndex
                items={WHERE_THIS_CAN_GO_ITEMS}
                variant="light"
              />
            </FadeUpSection>
          </div>
        </section>

        {/* WHAT WE ASK */}
        <section className="bg-cream px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                What we ask
              </p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.1] text-forest md:text-[48px]">
                The whole list.
              </h2>
            </FadeUpSection>
            <FadeUpSection className="mt-10">
              <div className="border-t border-gold/40">
                {[
                  "Show up for the client.",
                  "Keep learning.",
                  "Bring a good attitude.",
                ].map((line) => (
                  <p
                    key={line}
                    className="border-b border-gold/40 py-5 font-display text-[21px] font-normal leading-[1.4] text-forest md:text-[22px]"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-[13px] text-forest/70">
                That&apos;s it — and it&apos;s non-negotiable.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="bg-forest px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Who this is for
              </p>
              <p className="mt-6 max-w-[34ch] font-display text-[20px] font-normal leading-[1.45] text-cream md:text-[21px]">
                Anyone, regardless of race, color, gender, or background, who
                wants to get better and be part of a place where the leader puts
                the team first.
              </p>
              <p className="mt-6 max-w-[34ch] font-display text-[22px] font-normal italic leading-[1.4] text-cream md:text-[24px]">
                If you want a place that will push you further than you thought
                you&apos;d go — come work with me. Helping you get there is my
                job.
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-gold">
                — Michael
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* TWO YEARS, ONE TEAM */}
        <section className="bg-background px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Two years, one team
              </p>
              <div className="mt-6 max-w-[34ch] space-y-5">
                <p className="font-display text-[20px] font-normal leading-[1.45] text-forest lining-nums md:text-[21px]">
                  In two years, this salon went from a{" "}
                  <span className="lining-nums">4.2</span> to a{" "}
                  <span className="lining-nums">4.7</span> on Google — from a few
                  hundred reviews to a thousand.
                </p>
                <p className="font-display text-[20px] font-normal leading-[1.45] text-forest md:text-[21px]">
                  That&apos;s not a marketing line. That&apos;s the floor doing
                  the work, client after client. That&apos;s the team, not me.
                </p>
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* HOW TO REACH ME */}
        <section className="bg-cream px-6 py-16 md:px-12 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                How to reach me
              </p>
              <div className="mt-6 space-y-2 text-[16px] text-forest">
                <p>
                  Call or text:{" "}
                  <a
                    href="tel:+14693770984"
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-gold"
                  >
                    (469) 377-0984
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:michael@bellevanail.com"
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-gold"
                  >
                    michael@bellevanail.com
                  </a>
                </p>
              </div>
              <p className="mt-5 text-[16px] text-forest">
                Or leave your details below — it goes straight to my inbox.
              </p>
            </FadeUpSection>

            <FadeUpSection className="mt-8">
              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Years doing nails"
                  className="w-full border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
                />
                <textarea
                  rows={3}
                  placeholder="Message"
                  className="w-full resize-none border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center rounded-full border border-forest bg-forest px-5 py-2 text-xs text-cream transition-colors duration-300 hover:bg-forest-soft"
                >
                  Send
                </button>
              </form>
              <p className="mt-3 text-[12px] text-forest/60">
                Demo form — not yet connected.
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
