import { BOOKING_URL } from "@/lib/designs";
import { Link, useLocation } from "@tanstack/react-router";

export function SiteFooter() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  return (
    <footer className="border-t border-[#E5DFD3] bg-background px-6 pb-12 pt-20 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3 lg:gap-x-16">
        <div>
          <p className="font-display text-xl tracking-[0.3em] text-forest">BELLEVA</p>
          <div className="mt-10 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
            <a href="https://www.google.com/maps/dir/?api=1&destination=2200%20W%20University%20Dr%2C%20Ste%20180%2C%20Denton%2C%20TX%2076201" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-forest">
              2200 W University Dr, Ste 180, Denton, TX 76201
            </a>
            <a href="tel:+19405141808" className="block transition-colors hover:text-forest">(940) 514-1808</a>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[1px] text-gold">Hours</p>
          <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">Mon-Fri 9:30-7:30 · Sat 9-7 · Sun 11-5</p>
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <p className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] uppercase tracking-[1px] text-forest/60">
            {[["Instagram", "https://instagram.com/bellevanailsdenton"], ["TikTok", "#"], ["Pinterest", "#"], ["Facebook", "#"], ["YouTube", "#"]].map(([label, href], index, links) => (
              <span key={label} className="whitespace-nowrap">
                <a href={href} className="transition-colors hover:text-forest">{label}</a>
                {index < links.length - 1 && <span className="mx-1 text-gold">·</span>}
              </span>
            ))}
          </p>
          <Link to="/careers" className="mt-3 inline-block text-gold transition-colors hover:text-forest">
            <span className="font-body text-[11px] uppercase tracking-[2px]">Careers</span>
            <span className="ml-1.5 font-body text-[11px] italic normal-case tracking-normal text-forest/60">— We&apos;re hiring</span>
          </Link>

          {!isContactPage && (
            <div className="mt-12">
              <a href={BOOKING_URL} className="inline-flex w-fit rounded-full bg-forest px-8 py-3 text-sm text-cream transition-colors hover:bg-forest-soft">Book an appointment</a>
              <p className="mt-3 max-w-[260px] text-[11px] leading-relaxed text-muted-foreground">Tell us your occasion in the Note box — we will take care of the rest.</p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
