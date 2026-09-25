import { BOOKING_URL } from "@/lib/designs";
import { Link, useLocation } from "@tanstack/react-router";

export function SiteFooter() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  return (
    <footer className="border-t border-[#E5DFD3] bg-background px-6 pb-12 pt-20 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12 lg:grid-cols-4 lg:gap-x-12">
        <div>
          <p className="font-display text-xl tracking-[0.3em] text-forest">BELLEVA</p>
          <div className="mt-6 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
            <a href="https://www.google.com/maps/dir/?api=1&destination=2200%20W%20University%20Dr%2C%20Ste%20180%2C%20Denton%2C%20TX%2076201" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-forest">
              2200 W University Dr, Ste 180<br />Denton, TX 76201
            </a>
            <a href="tel:+19405141808" className="block font-medium transition-colors hover:text-forest">(940) 514-1808</a>
          </div>
        </div>

        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-gold">Hours</p>
          <div className="mt-4 space-y-1 text-[13px] leading-relaxed text-muted-foreground [font-variant-numeric:lining-nums]">
            <p>Mon–Fri: 9:30 AM – 7:30 PM</p>
            <p>Saturday: 9:00 AM – 7:00 PM</p>
            <p>Sunday: 11:00 AM – 5:00 PM</p>
          </div>
        </div>

        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-gold">Social</p>
          <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-[12px] uppercase tracking-[1px] text-forest/70">
            {[["Instagram", "https://instagram.com/bellevanailsdenton"], ["TikTok", "#"], ["Pinterest", "#"], ["Facebook", "#"], ["YouTube", "#"]].map(([label, href], index, links) => (
              <span key={label} className="whitespace-nowrap">
                <a href={href} className="transition-colors hover:text-forest">{label}</a>
                {index < links.length - 1 && <span className="mx-1.5 text-gold">·</span>}
              </span>
            ))}
          </p>
          <Link to="/careers" className="mt-4 inline-block text-gold transition-colors hover:text-forest">
            <span className="font-body text-[11px] uppercase tracking-[2px]">Careers</span>
            <span className="ml-1.5 font-body text-[11px] italic normal-case tracking-normal text-forest/60">– We&apos;re hiring</span>
          </Link>
        </div>

        {!isContactPage && (
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-gold">Reservations</p>
            <div className="mt-4">
              <a href={BOOKING_URL} className="inline-flex w-fit rounded-full bg-forest px-7 py-2.5 text-xs uppercase tracking-[0.1em] text-cream transition-colors hover:bg-forest-soft">Book appointment</a>
              <p className="mt-3 max-w-[240px] text-[12px] leading-relaxed text-muted-foreground">Tell us your occasion in the Note box – we will take care of the rest.</p>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
