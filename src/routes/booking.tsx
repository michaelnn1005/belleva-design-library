import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SALON_SMS, SALON_TEL } from "@/lib/designs";
import { canonicalLink, canonicalUrl } from "@/lib/marketing";

// bellevanail.com/booking has always been the salon's booking page (Google, Instagram bio,
// printed cards and every Book button point here), so the new site keeps the exact address
// and shows the same ABC Salon booking system the old page embedded.
const ABC_BOOKING = "https://abcsalon.net/feedback/appointment?appid=uqE0w67";

const TITLE = "Book an Appointment · Belleva Nails, Denton TX";
const DESCRIPTION =
  "Book your nail appointment at Belleva Nails in Denton, Texas: pick your services, your technician and a time that suits you.";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: canonicalUrl("/booking") },
    ],
    links: [canonicalLink("/booking")],
  }),
  component: BookingPage,
});

const LINK =
  "underline decoration-forest/40 underline-offset-4 transition-colors hover:decoration-forest";

function BookingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <SiteHeader heroPassed={true} />

      <main className="px-4 pb-16 pt-24 md:px-10 md:pt-28 lg:pt-32">
        <div className="mx-auto max-w-[760px]">
          <div className="px-2 md:px-0">
            <p className="text-[12px] uppercase tracking-[0.12em] text-gold">Book</p>
            <h1 className="mt-2 font-display text-[36px] leading-[1.05] text-forest md:text-[48px] [font-variant-numeric:lining-nums]">
              Book your appointment.
            </h1>
            <p className="mt-3 text-[15px] leading-[1.6] text-forest/80 md:text-[16px]">
              Pick your services and a time below. Rather talk to us?{" "}
              <a href={SALON_TEL} className={`whitespace-nowrap ${LINK}`}>
                Call (940) 514-1808
              </a>{" "}
              or{" "}
              <a href={SALON_SMS} className={LINK}>
                send a text
              </a>
              .
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-[12px] border border-forest/12 bg-white shadow-[0_20px_50px_-30px_rgba(47,74,62,0.45)]">
            <iframe
              src={ABC_BOOKING}
              title="Belleva Nails online booking"
              className="block h-[max(640px,calc(100svh-150px))] w-full border-0"
              loading="eager"
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-top-navigation-by-user-activation"
            />
          </div>

          <p className="mt-4 px-2 text-center text-[13px] text-forest/60 md:px-0">
            Trouble with the form?{" "}
            <a href={ABC_BOOKING} target="_blank" rel="noopener noreferrer" className={LINK}>
              Open the booking page on its own
            </a>
            .
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
