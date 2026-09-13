import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";

const TITLE = "FAQ — Belleva Nails";
const DESCRIPTION =
  "Answers about booking, walk-ins, cancellations, bridal, gift cards, and the Belleva Standard guarantee.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faq" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
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

function HairlineLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 right-0 flex items-center">
        <div className="h-px w-full bg-forest/15" />
      </div>
      <span className="relative bg-background pr-4 text-[12px] uppercase tracking-[0.14em] text-gold">
        {children}
      </span>
    </div>
  );
}

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

type FaqGroup = {
  eyebrow: string;
  items: FaqItem[];
};

const FAQ_GROUPS: FaqGroup[] = [
  {
    eyebrow: "BOOKING",
    items: [
      {
        question: "Do I need to book, or can I walk in?",
        answer:
          "Walk-ins are welcome. Booking is better — it gives us time to match you with the right technician and prepare for what you want.",
      },
      {
        question: "Do you take a deposit?",
        answer: "No. Not for anything.",
      },
      {
        question: "What if I need to cancel or reschedule?",
        answer:
          "Just let us know 24 hours ahead if you can. No fee either way.",
      },
      {
        question: "What should I write in the Note when I book?",
        answer:
          'Anything that helps us prepare: the occasion, a design you have in mind, a technician you\'d like, or "I\'m in a hurry." We read every Note before you arrive.',
      },
      {
        question: "Can I book for a group?",
        answer:
          "Yes — book one appointment and write the number of people in the Note. The front desk will call you the same day to arrange chairs and timing.",
      },
      {
        question: "Can I request a specific technician?",
        answer:
          "Of course. Write their name in the Note. If you don't have one yet, tell us what you're looking for and we'll match you with the technician whose strengths fit.",
      },
      {
        question: "What if the technician I want is fully booked?",
        answer:
          "The front desk will suggest someone whose strengths match — same skill, same standard. If no one fits, we'd rather move you to another day than hand you to whoever is free. Your set matters more than our schedule.",
      },
    ],
  },
  {
    eyebrow: "DESIGN",
    items: [
      {
        question: "I have a design in mind — how do I make sure you can do it?",
        answer:
          "Book ahead and describe it in the Note, or bring the photo with you. Design work is scheduled with a design technician and with the time built in, so it never gets rushed.",
      },
      {
        question: "How do I keep the same technician every visit?",
        answer:
          "Rebook at the front desk before you leave. Your technician and your usual timing are held — it's the one thing walk-ins can't get.",
      },
    ],
  },
  {
    eyebrow: "THE GUARANTEE",
    items: [
      {
        question: "What does the 14-day guarantee cover?",
        answer: (
          <>
            Chips, lifts, and breaks within 14 days — we fix them at no charge.
            Book online with "Repair" in the Note, or call and ask for the front
            desk. The full policy is on{" "}
            <Link
              to="/standard"
              className="text-forest underline underline-offset-4 hover:text-forest/80"
            >
              The Belleva Standard page
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    eyebrow: "HYGIENE & PRODUCTS",
    items: [
      {
        question: "How do you clean your tools?",
        answer:
          "Metal tools are washed, soaked in EPA-registered hospital-grade disinfectant, and stored in a UV cabinet between clients. Files, buffers and wipes are used once. Every pedicure gets a new liner.",
      },
      {
        question: "What products do you use?",
        answer:
          "FarmHouse Fresh for pedicures — a Texas farm skincare brand. Our CBD products carry a QR code on every bottle; scan it and read the lab report yourself.",
      },
      {
        question: "Can I see the lab report?",
        answer:
          "Yes — every CBD bottle in the salon has a QR code. Scan it and read the lab report yourself.",
      },
    ],
  },
  {
    eyebrow: "BRIDAL",
    items: [
      {
        question: "Do you do bridal?",
        answer: (
          <>
            Yes — trial set before the wedding, wedding set a few days out, and
            your bridal party alongside you. The full program is on{" "}
            <a
              href="/bridal"
              className="text-forest underline underline-offset-4 hover:text-forest/80"
            >
              the Bridal page
            </a>
            .
          </>
        ),
      },
    ],
  },
  {
    eyebrow: "GIFT CARDS",
    items: [
      {
        question: "Do you sell gift cards?",
        answer:
          "Yes — at the front desk, or by phone. Phone orders are paid by Zelle; pick the card up at the salon or we'll text you a photo of it, whichever you prefer.",
      },
    ],
  },
  {
    eyebrow: "YOUR VISIT",
    items: [
      {
        question: "Do you serve drinks?",
        answer:
          "Yes, and they're on us. Vietnamese coffee (iced or hot) is the one we're known for. There's also iced tea, sodas, juice, still or sparkling water — and a mimosa or champagne if you're 21+. Just ask at check-in.",
      },
    ],
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-forest/12">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[44px] w-full items-center justify-between py-[18px] text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[19px] leading-[1.3] text-forest lining-nums md:text-[22px]">
          {item.question}
        </span>
        <span
          className={`ml-4 shrink-0 text-[22px] leading-none text-forest transition-transform duration-[250ms] ease-in-out md:text-[24px] ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-[250ms] ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-[18px] text-[16px] leading-[1.65] text-forest/80">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function FaqGroupSection({
  group,
  openKey,
  onToggle,
  groupIndex,
}: {
  group: FaqGroup;
  openKey: string | null;
  onToggle: (key: string) => void;
  groupIndex: number;
}) {
  return (
    <section className={`px-6 md:px-12 ${groupIndex === 0 ? "pt-12 md:pt-16" : ""}`}>
      <div className="mx-auto max-w-[720px]">
        <FadeUpSection className={groupIndex === 0 ? "" : "mt-16 md:mt-[64px]"}>
          <HairlineLabel>{group.eyebrow}</HairlineLabel>
        </FadeUpSection>

        <FadeUpSection className="mt-6">
          <div className="border-t border-forest/12">
            {group.items.map((item, i) => {
              const key = `${group.eyebrow}-${i}`;
              return (
                <AccordionItem
                  key={key}
                  item={item}
                  isOpen={openKey === key}
                  onToggle={() => onToggle(key)}
                />
              );
            })}
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}

function FaqPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);
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

  const handleToggle = (key: string) => {
    setOpenKey((current) => (current === key ? null : key));
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader heroPassed={heroPassed} />

      <main>
        {/* Hero */}
        <section
          id="hero"
          className="relative h-[60vh] min-h-[440px] w-full md:h-[70vh] md:min-h-[520px]"
        >
          {/* Placeholder background */}
          <div className="absolute inset-0 bg-forest" aria-hidden="true" />
          {/* Content */}
          <div className="relative mx-auto flex h-full max-w-[720px] items-end px-6 pb-10 md:px-12 md:pb-16">
            <FadeUpSection className="w-full">
              <p className="text-[12px] uppercase tracking-[0.12em] text-[#FAF8F5]/80">
                QUESTIONS
              </p>
              <h1 className="mt-3 font-display text-[36px] leading-[1.05] text-[#FAF8F5] lining-nums md:text-[56px]">
                Asked and answered.
              </h1>
              <p className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-[#FAF8F5]/75">
                If it isn't here, call us — a real person will pick up the phone.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* FAQ groups */}
        {FAQ_GROUPS.map((group, i) => (
          <FaqGroupSection
            key={group.eyebrow}
            group={group}
            groupIndex={i}
            openKey={openKey}
            onToggle={handleToggle}
          />
        ))}

        {/* Closing */}
        <section className="px-6 pb-[120px] pt-24 md:px-12">
          <div className="mx-auto max-w-[720px] text-center">
            <FadeUpSection>
              <p className="font-display text-[22px] leading-[1.3] text-forest lining-nums md:text-[28px]">
                Still wondering? Book and write your question in the Note.
              </p>
              <a
                href="https://bellevanail.com/booking?utm_source=web&utm_medium=site&utm_campaign=WEB26FAQ"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-gold px-6 py-3 text-[14px] font-medium uppercase tracking-[0.12em] text-forest transition-colors hover:bg-gold/10"
              >
                Book an appointment
              </a>
              <p className="mt-3.5 text-[15px] text-forest/70">
                Rebook before you leave and your technician is held for next time.
              </p>
            </FadeUpSection>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyBottomBar show={false} />
    </div>
  );
}
