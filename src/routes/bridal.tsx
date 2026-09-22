import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { submitBridalLead } from "@/lib/bridal.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";
import bridalHeroAsset from "@/assets/bridal-hero-atmosphere.png.asset.json";
import bridalCtaEucalyptusAsset from "@/assets/bridal-cta-eucalyptus.png.asset.json";
import bridalTrialStillAsset from "@/assets/bridal-trial-still.png.asset.json";
import bridalBetweenStillAsset from "@/assets/bridal-between-still.png.asset.json";
import bridalJustMarriedAsset from "@/assets/bridal-just-married.png.asset.json";

const TITLE = "Belleva Bridal — Belleva Nails";
const DESCRIPTION =
  "The Belleva Bridal program: a trial, a wedding-day set, and a guarantee through your big day.";

const BOOKING_URL =
  "https://bellevanail.com/booking?utm_source=web&utm_medium=site&utm_campaign=WEB26BRD";

export const Route = createFileRoute("/bridal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/bridal" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/bridal" }],
  }),
  component: BridalPage,
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

function StaggerFadeUp({
  children,
  staggerMs = 80,
  className = "",
}: {
  children: React.ReactNode;
  staggerMs?: number;
  className?: string;
}) {
  const { ref, visible } = useFadeUp(0.2);
  const items = Array.isArray(children) ? children : [children];
  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className={`transform transition-all duration-700 ease-out ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
          style={{
            transitionDelay: visible ? `${i * staggerMs}ms` : "0ms",
          }}
        >
          {child}
        </div>
      ))}
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

type BridalFaqItem = {
  question: string;
  answer: string;
};

function BridalAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: BridalFaqItem;
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

const CONSENT_TEXT =
  "Yes, text me about my bridal appointments at Belleva Nails. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out.";

function BridalJoinForm() {
  const submitLead = useServerFn(submitBridalLead);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const partyRaw = String(fd.get("partySize") ?? "").trim();
    if (!consent) {
      setError("Please check the box so we can text you about your appointments.");
      return;
    }
    setStatus("submitting");
    setError(null);
    const result = await submitLead({
      data: {
        firstName: String(fd.get("firstName") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        weddingDate: String(fd.get("weddingDate") ?? ""),
        partySize: partyRaw ? Number(partyRaw) : null,
        note: String(fd.get("note") ?? "") || null,
        smsConsent: true,
      },
    }).catch(() => ({
      ok: false as const,
      error: "Something went wrong sending your sign-up. Please call us instead.",
    }));
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("idle");
      setError(result.error);
    }
  }

  const inputClass =
    "w-full rounded-none border border-forest/25 bg-transparent px-4 py-3 text-[16px] text-forest outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold";

  if (status === "success") {
    return (
      <div className="mt-8 border-t border-forest/12 pt-8">
        <p className="font-display text-[24px] leading-[1.3] text-forest md:text-[28px]">
          Thank you — we&apos;ll text you shortly to set up your trial.
        </p>
        <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
          Keep an eye on your phone. If anything changes, just tell us in a reply.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8" noValidate={false}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="bridal-first-name"
            className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-gold"
          >
            First name *
          </label>
          <input
            id="bridal-first-name"
            name="firstName"
            type="text"
            required
            maxLength={100}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="bridal-phone"
            className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-gold"
          >
            Phone *
          </label>
          <input
            id="bridal-phone"
            name="phone"
            type="tel"
            required
            maxLength={40}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="bridal-date"
            className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-gold"
          >
            Wedding date *
          </label>
          <input
            id="bridal-date"
            name="weddingDate"
            type="date"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="bridal-party"
            className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-gold"
          >
            Party size
          </label>
          <input
            id="bridal-party"
            name="partySize"
            type="number"
            min={1}
            max={50}
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="bridal-note"
            className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-gold"
          >
            Note
          </label>
          <textarea
            id="bridal-note"
            name="note"
            rows={3}
            maxLength={2000}
            placeholder="Anything we should keep in mind - your dress, colors, a design you love, timing."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <label htmlFor="bridal-consent" className="mt-6 flex cursor-pointer items-start gap-3">
        <input
          id="bridal-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-[3px] h-4 w-4 shrink-0 accent-[#2F4A3E]"
          required
        />
        <span className="text-[13px] leading-[1.6] text-forest/80">{CONSENT_TEXT}</span>
      </label>

      {error && (
        <p className="mt-4 text-[14px] leading-[1.5] text-[#8A4B3A]" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 inline-flex min-h-[48px] items-center rounded-full border border-gold px-8 py-3 text-sm text-forest transition-colors hover:bg-forest hover:text-cream disabled:cursor-wait disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Join the bridal program"}
      </button>
    </form>
  );
}

function BridalPage() {
  const [showBar, setShowBar] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const [openFaqKey, setOpenFaqKey] = useState<string | null>(null);

  const toggleFaq = (key: string) => {
    setOpenFaqKey((current) => (current === key ? null : key));
  };

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight - 20 : window.innerHeight - 20;
      setHeroPassed(window.scrollY > threshold);
      setShowBar(window.scrollY > 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader heroPassed={heroPassed} />

      <main>
        {/* HERO */}
        <section
          id="hero"
          className="relative h-[60vh] min-h-[440px] w-full md:h-[70vh] md:min-h-[520px]"
        >
          <img
            src={bridalHeroAsset.url}
            alt="Bridal nail set in soft neutral tones at Belleva Nails"
            className="absolute inset-0 h-full w-full object-cover object-[50%_25%] md:object-[58%_20%] lg:object-[50%_20%] rounded-none"
          />
          <div className="absolute inset-0 bg-forest/45 md:bg-forest/35" />

          <div className="relative mx-auto flex h-full max-w-[1200px] items-end px-6 pb-10 md:px-10 lg:px-16 md:pb-16">
            <FadeUpSection className="w-full md:max-w-[55%]">
              <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-[#FAF8F5]/80">
                BELLEVA BRIDAL
              </p>
              <h1 className="mt-3 max-w-[640px] font-display lining-nums text-[36px] leading-[1.1] text-[#FAF8F5] md:text-[56px]">
                Your hands are in every photo.
              </h1>
              <p className="mt-4 max-w-[480px] font-sans text-[16px] leading-[1.6] text-[#FAF8F5]/75">
                We treat them that way.
              </p>
              <Link
                to="/bridal"
                hash="join"
                className="mt-8 inline-flex min-h-[48px] items-center rounded-full border border-[#FAF8F5] px-8 py-3 text-sm text-[#FAF8F5] transition-colors hover:bg-[#FAF8F5] hover:text-forest"
              >
                Book your trial
              </Link>
            </FadeUpSection>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-background px-6 py-16 md:px-10 lg:px-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <FadeUpSection>
              <p className="text-[12px] font-normal uppercase tracking-[0.12em] text-gold">
                HOW IT WORKS
              </p>
              <h2 className="mt-3 font-display lining-nums text-[32px] leading-[1.1] text-forest md:text-[48px]">
                Decided weeks ago. Perfect on the day.
              </h2>
            </FadeUpSection>

            <StaggerFadeUp staggerMs={80} className="mt-12 flex flex-col gap-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                  THE TRIAL
                </p>
                <p className="mt-2 text-[17px] leading-[1.65] text-forest">
                  Two to four weeks before the wedding, we build your set — shade, shape and design matched to your dress. We photograph the final look and keep it on file, so nothing is left to memory.
                </p>
              </div>
              <div className="w-full rounded-none">
                <img
                  src={bridalTrialStillAsset.url}
                  alt="Bridal nail trial detail at Belleva Nails"
                  className="aspect-[4/5] w-full object-cover rounded-none"
                />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                  THE WEDDING SET
                </p>
                <p className="mt-2 text-[17px] leading-[1.65] text-forest">
                  Three to five days before the big day, your trial technician — or one fully briefed on your exact set — recreates it. You leave with a small care kit from us.
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                  THE DAY
                </p>
                <p className="mt-2 text-[17px] leading-[1.65] text-forest">
                  You don&apos;t think about your nails. That&apos;s the point.
                </p>
              </div>
            </StaggerFadeUp>
          </div>
        </section>

        <section className="bg-background px-6 py-2 md:px-10 lg:px-16 md:py-4 rounded-none">
          <div className="mx-auto max-w-[1200px] rounded-none">
            <img
              src={bridalBetweenStillAsset.url}
              alt="Silk and eucalyptus detail"
              className="aspect-[4/5] w-full object-cover rounded-none"
            />
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="bg-forest px-6 py-16 md:px-10 lg:px-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <FadeUpSection>
              <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-[#FAF8F5]/80">
                THE GUARANTEE
              </p>
              <h2 className="mt-3 font-display lining-nums text-[32px] leading-[1.1] text-[#FAF8F5] md:text-[48px]">
                Guaranteed through your big day.
              </h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-[#FAF8F5]/90">
                Every set carries our 14-day guarantee, and your wedding set is done days before the ceremony — so it&apos;s covered through the wedding and well into the honeymoon.
              </p>
              <p className="mt-6 border-l-2 border-gold pl-4 text-[16px] font-medium text-[#FAF8F5]/95">
                And if anything happens before the day itself, call us. Brides get same-day repairs. No queue.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* BRIDAL PARTY */}
        <section className="bg-background px-6 py-16 md:px-10 lg:px-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <FadeUpSection>
              <p className="text-[12px] font-normal uppercase tracking-[0.12em] text-gold">
                THE BRIDAL PARTY
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-forest">
                Bringing your bridesmaids? Book one appointment and write your party size in the Note. The front desk will call you the same day to arrange chairs side by side.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* JUST MARRIED */}
        <section
          className="relative flex min-h-[560px] flex-col justify-start rounded-none px-6 py-24 md:px-10 lg:px-16 md:py-20 lg:py-28"
          style={{
            backgroundImage: `url(${bridalJustMarriedAsset.url})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 100%",
            backgroundRepeat: "no-repeat",
            borderRadius: 0,
          }}
        >
          <div className="absolute inset-0 bg-[rgba(47,74,62,0.55)]" />
          <div className="relative mx-auto w-full max-w-[1200px]">
            <FadeUpSection>
              <p className="text-[12px] font-normal uppercase tracking-[0.12em] text-gold">
                JUST MARRIED
              </p>
              <p className="mt-4 max-w-[640px] text-[17px] leading-[1.7] text-cream">
                Recently married? Ask the front desk about Just Married — a couples session before the honeymoon, and a little something reserved for your next visit.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* MINI-FAQ */}
        <section className="bg-background px-6 py-16 md:px-10 lg:px-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <FadeUpSection>
              <HairlineLabel>COMMON QUESTIONS</HairlineLabel>
            </FadeUpSection>

            <FadeUpSection className="mt-6">
              <div className="border-t border-forest/12">
                {[
                  {
                    question: "When should I book my trial?",
                    answer:
                      "Two to four weeks before the wedding. It gives us time to order anything custom, and lets you live with the set before deciding.",
                  },
                  {
                    question: "What if a nail chips before the wedding?",
                    answer:
                      "Call us. Bride repairs are same-day — your set is fixed before it's ever in a photo.",
                  },
                  {
                    question: "Can my whole bridal party come together?",
                    answer:
                      "Yes. Write your party size in the booking Note and we'll call you the same day to set up chairs together.",
                  },
                ].map((item, i) => (
                  <BridalAccordionItem
                    key={i}
                    item={item}
                    isOpen={openFaqKey === `bridal-faq-${i}`}
                    onToggle={() => toggleFaq(`bridal-faq-${i}`)}
                  />
                ))}
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* JOIN THE BRIDAL PROGRAM — SIGN-UP FORM */}
        <section id="join" className="scroll-mt-20 bg-background px-6 py-16 md:px-10 lg:px-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <FadeUpSection>
              <HairlineLabel>JOIN THE BRIDAL PROGRAM</HairlineLabel>
              <h2 className="mt-8 font-display lining-nums text-[32px] leading-[1.1] text-forest md:text-[44px]">
                Save your wedding date.
              </h2>
              <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-muted-foreground">
                Tell us when you&apos;re getting married and we&apos;ll text you to set up your trial. Free to join — no packages, no fees.
              </p>
            </FadeUpSection>
            <FadeUpSection className="w-full">
              <BridalJoinForm />
            </FadeUpSection>
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative rounded-none bg-forest px-6 py-20 md:px-10 lg:px-16 md:py-20 lg:py-28"
          style={{
            backgroundImage: `url(${bridalCtaEucalyptusAsset.url})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-forest/45 md:bg-forest/35" />
          <div className="relative mx-auto max-w-[640px]">
            <FadeUpSection>
              <h2 className="font-display lining-nums text-[32px] leading-[1.1] text-[#FAF8F5] md:text-[48px]">
                The one thing already handled.
              </h2>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-[48px] items-center rounded-full border border-[#FAF8F5] px-8 py-3 text-sm text-[#FAF8F5] transition-colors hover:bg-[#FAF8F5] hover:text-forest"
              >
                Book your trial
              </a>
              <p className="mt-4 text-[15px] text-[#FAF8F5]/70">
                Add &quot;wedding&quot; and your date in the Note — we&apos;ll take care of the rest.
              </p>
            </FadeUpSection>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyBottomBar show={showBar} />
    </div>
  );
}
