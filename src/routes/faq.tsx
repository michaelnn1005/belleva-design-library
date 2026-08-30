import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";
import { BOOKING_URL } from "@/lib/designs";

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

type FaqItem = {
  question: string;
  answer: string;
};

type FaqGroup = {
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

const FAQ_GROUPS: FaqGroup[] = [
  {
    eyebrow: "Booking",
    title: "Appointments, walk-ins, and changes",
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
          "Anything that helps us prepare: the occasion, a design you have in mind, a technician you'd like, or \"I'm in a hurry.\" We read every Note before you arrive.",
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
    eyebrow: "Design",
    title: "Bringing an idea to life",
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
    eyebrow: "The guarantee",
    title: "Our 14-day promise",
    items: [
      {
        question: "What does the 14-day guarantee cover?",
        answer:
          "Chips, lifts, and breaks within 14 days — we fix them at no charge. Book online with \"Repair\" in the Note, or call and ask for the front desk. The full policy is on The Belleva Standard page.",
      },
    ],
  },
  {
    eyebrow: "Hygiene & products",
    title: "What touches your hands",
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
    ],
  },
  {
    eyebrow: "Bridal",
    title: "Wedding-day nails",
    items: [
      {
        question: "Do you do bridal?",
        answer:
          "Yes — trial set before the wedding, wedding set a few days out, and your bridal party alongside you. The full program is on the Bridal page.",
      },
    ],
  },
  {
    eyebrow: "Gift cards",
    title: "Give an hour at Belleva",
    items: [
      {
        question: "Do you sell gift cards?",
        answer:
          "Yes — at the front desk, or by phone. Phone orders are paid by Zelle; pick the card up at the salon or we'll text you a photo of it, whichever you prefer.",
      },
    ],
  },
];

function FaqGroupSection({ group }: { group: FaqGroup }) {
  return (
    <section className="border-t border-forest/12 px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[720px]">
        <FadeUpSection>
          <p className="text-[12px] uppercase tracking-[0.14em] text-gold">
            {group.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[32px] leading-[1.1] text-forest md:text-[48px]">
            {group.title}
          </h2>
        </FadeUpSection>

        <div className="mt-10">
          {group.items.map((item, i) => (
            <FadeUpSection key={item.question}>
              <div
                className={`py-6 ${
                  i !== group.items.length - 1 ? "border-b border-forest/12" : ""
                }`}
              >
                <p className="font-sans text-[16px] font-medium leading-[1.5] text-forest md:text-[17px]">
                  {item.question}
                </p>
                <p className="mt-3 text-[15px] leading-[1.7] text-forest/75 md:text-[16px]">
                  {item.answer}
                </p>
              </div>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader heroPassed={true} />

      <main className="pt-[88px]">
        {/* Page intro */}
        <section className="px-6 pb-8 pt-8 md:px-12 md:pb-12 md:pt-12">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[12px] uppercase tracking-[0.14em] text-gold">
                FAQ
              </p>
              <h1 className="mt-3 font-display text-[40px] leading-[1.05] text-forest md:text-[64px]">
                Questions we get a lot.
              </h1>
              <p className="mt-5 max-w-[520px] text-[16px] leading-[1.6] text-forest/75 md:text-[17px]">
                If you don't see what you're looking for, write to us or call the front desk — we'll answer honestly.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* FAQ groups */}
        {FAQ_GROUPS.map((group) => (
          <FaqGroupSection key={group.eyebrow} group={group} />
        ))}

        {/* Closing CTA */}
        <section className="bg-forest px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-[#FAF8F5]/80">
                Still have a question?
              </p>
              <h2 className="mt-3 font-display text-[32px] leading-[1.1] text-cream md:text-[48px]">
                Ask us directly.
              </h2>
              <p className="mt-5 max-w-[520px] text-[17px] leading-[1.7] text-cream/90 md:text-[18px]">
                Call the salon, write to us through the contact form, or ask at the front desk during your next visit.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="tel:+19405141808"
                  className="inline-flex min-h-[48px] items-center rounded-full border border-background bg-transparent px-8 py-3 text-[14px] text-background transition-all duration-300 hover:bg-background hover:text-forest"
                >
                  Call (940) 514-1808
                </a>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center rounded-full border border-background bg-transparent px-8 py-3 text-[14px] text-background transition-all duration-300 hover:bg-background hover:text-forest"
                >
                  Book an appointment
                </a>
              </div>
            </FadeUpSection>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyBottomBar show={false} />
    </div>
  );
}
