import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { useFadeUp } from "@/hooks/use-fade-up";

const TITLE = "Contact — Belleva Nails";
const DESCRIPTION =
  "Visit Belleva Nails in Denton, Texas. Book online, call, or send a message.";

const BOOKING_URL =
  "https://bellevanail.com/booking?utm_source=website&utm_medium=contact&utm_campaign=WEB26CT";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
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

function HairlineLabel({
  children,
  bgClass,
}: {
  children: React.ReactNode;
  bgClass: string;
}) {
  return (
    <div className="relative flex items-center">
      <div className="absolute inset-0 flex items-center">
        <div className="h-px w-full bg-[#2F4A3E]/15" />
      </div>
      <span
        className={`relative pr-4 text-[11px] uppercase tracking-[0.14em] text-gold ${bgClass}`}
      >
        {children}
      </span>
    </div>
  );
}

function ContactPage() {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <SiteHeader heroPassed={true} />

      <main>
        {/* OPENING */}
        <section className="bg-[#FAF8F5] px-6 pb-12 pt-32 md:px-12 md:pb-16 md:pt-36">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                Contact
              </p>
              <h1 className="mt-3 font-display text-[40px] leading-[1.05] text-[#2F4A3E] md:text-[56px] [font-variant-numeric:lining-nums]">
                Find us.
              </h1>
              <p className="mt-5 max-w-[540px] font-sans text-[16px] leading-[1.7] text-[#2F4A3E]/80">
                Rayzor Ranch, on University Drive. Same salon, same hours, one
                phone number.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* DETAILS */}
        <section className="bg-[#F5F0E8] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[960px]">
            <FadeUpSection>
              <div className="grid gap-12 md:grid-cols-3 md:gap-10">
                {/* Visit */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                    Visit
                  </p>
                  <div className="mt-5 space-y-1 font-sans text-[15px] leading-[1.7] text-[#2F4A3E]">
                    <p className="font-medium">Belleva Nails</p>
                    <p>2200 W University Dr, Ste 180</p>
                    <p>Denton, TX 76201</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Belleva+Nails+2200+W+University+Dr+Ste+180+Denton+TX+76201"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block font-sans text-[14px] text-[#2F4A3E] underline-offset-4 hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </div>

                {/* Reach us */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                    Reach us
                  </p>
                  <div className="mt-5 space-y-2 font-sans text-[15px] leading-[1.7] text-[#2F4A3E]">
                    <p>
                      Phone:{" "}
                      <a
                        href="tel:+19405141808"
                        className="underline-offset-4 hover:underline"
                      >
                        (940) 514-1808
                      </a>
                    </p>
                    <p>
                      Email:{" "}
                      <a
                        href="mailto:bellevanailsdenton@gmail.com"
                        className="underline-offset-4 hover:underline"
                      >
                        bellevanailsdenton@gmail.com
                      </a>
                    </p>
                    <p>
                      Instagram:{" "}
                      <a
                        href="https://instagram.com/bellevanailsdenton"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        @bellevanailsdenton
                      </a>
                    </p>
                  </div>
                  <p className="mt-5 font-display text-[17px] italic leading-[1.5] text-[#2F4A3E]/75">
                    For appointments, use the Book button. For everything else,
                    call or write.
                  </p>
                </div>

                {/* Hours */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-gold">
                    Hours
                  </p>
                  <div className="mt-5 space-y-2 font-sans text-[15px] leading-[1.7] text-[#2F4A3E] [font-variant-numeric:lining-nums]">
                    <div className="flex justify-between">
                      <span>Monday – Friday</span>
                      <span>9:30 AM – 7:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM – 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>11:00 AM – 5:00 PM</span>
                    </div>
                  </div>
                  <p className="mt-5 font-sans text-[13px] leading-[1.6] text-[#2F4A3E]/70">
                    Central Time. Holiday hours are posted on Google.
                  </p>
                </div>
              </div>
            </FadeUpSection>
          </div>
        </section>

        {/* NOTE LINE */}
        <section className="bg-[#2F4A3E] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#FAF8F5]/80">
                When you book
              </p>
              <h2 className="mt-3 font-display text-[36px] leading-[1.1] text-[#FAF8F5] md:text-[48px] [font-variant-numeric:lining-nums]">
                Write your occasion in the Note.
              </h2>
              <p className="mt-5 max-w-[640px] font-sans text-[16px] leading-[1.7] text-[#FAF8F5]/85">
                Wedding, prom, birthday, a photoshoot, a specific design, or a
                technician you&apos;d like to request — put it in the Note on the
                last page of booking. We read every one before you arrive, and
                we plan around it.
              </p>
            </FadeUpSection>
          </div>
        </section>

        {/* MESSAGE FORM */}
        <section className="bg-[#FAF8F5] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <HairlineLabel bgClass="bg-[#FAF8F5]">Send a message</HairlineLabel>

              <form
                className="mt-10 max-w-[560px] space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] text-gold">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-2 w-full border border-[#2F4A3E]/30 bg-transparent px-0 py-3 font-sans text-[15px] text-[#2F4A3E] placeholder:text-[#2F4A3E]/35 focus:border-[#2F4A3E]/60 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] text-gold">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="mt-2 w-full border border-[#2F4A3E]/30 bg-transparent px-0 py-3 font-sans text-[15px] text-[#2F4A3E] placeholder:text-[#2F4A3E]/35 focus:border-[#2F4A3E]/60 focus:outline-none"
                    placeholder="(940) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] text-gold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-2 w-full border border-[#2F4A3E]/30 bg-transparent px-0 py-3 font-sans text-[15px] text-[#2F4A3E] placeholder:text-[#2F4A3E]/35 focus:border-[#2F4A3E]/60 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.14em] text-gold">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="mt-2 w-full resize-none border border-[#2F4A3E]/30 bg-transparent px-0 py-3 font-sans text-[15px] text-[#2F4A3E] placeholder:text-[#2F4A3E]/35 focus:border-[#2F4A3E]/60 focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center bg-[#2F4A3E] px-8 py-4 font-sans text-[12px] uppercase tracking-[0.14em] text-[#FAF8F5] transition-colors hover:bg-[#3A5A4A]"
                >
                  Send message
                </button>

                <p className="block pt-2 font-sans text-[13px] leading-[1.6] text-[#2F4A3E]/70">
                  We reply during salon hours. If it&apos;s about today&apos;s
                  appointment, please call.
                </p>
              </form>
            </FadeUpSection>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="bg-[#F5F0E8] px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <FadeUpSection>
              <h2 className="font-display text-[36px] leading-[1.1] text-[#2F4A3E] md:text-[48px] [font-variant-numeric:lining-nums]">
                Ready when you are.
              </h2>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center bg-[#2F4A3E] px-8 py-4 font-sans text-[12px] uppercase tracking-[0.14em] text-[#FAF8F5] transition-colors hover:bg-[#3A5A4A]"
              >
                Book an appointment
              </a>
              <p className="mt-4 font-display text-[17px] italic leading-[1.5] text-[#2F4A3E]/75">
                Booked visits get the most careful technician match.
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
