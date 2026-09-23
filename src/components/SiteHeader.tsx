import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BOOKING_URL } from "@/lib/designs";

type NavItem =
  | { label: string; to: "/services" | "/standard" | "/faq" | "/bridal" | "/contact" }
  | { label: string; href: string; placeholder?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Services", to: "/services" },
  { label: "Standard", to: "/standard" },
  { label: "Bridal", to: "/bridal" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader({ heroPassed = true }: { heroPassed?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = heroPassed;
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const baseLinkClass =
    "font-body text-[15px] font-normal tracking-[0.02em] no-underline decoration-1 underline-offset-[6px] transition-colors duration-300";

  const desktopLinkClass = (isActive: boolean) => {
    const color = scrolled ? "text-forest" : "text-background";
    const underline = isActive ? "underline" : "hover:underline";
    return `${baseLinkClass} ${color} ${underline}`;
  };

  const iconColor = scrolled ? "text-forest" : "text-background";

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-background" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <Link
            to="/"
            className={`font-display text-xl tracking-[0.3em] transition-colors duration-300 ${
              scrolled ? "text-forest" : "text-background"
            }`}
          >
            BELLEVA
          </Link>

          <div className="flex items-center gap-10">
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.map((item) => {
              if ("to" in item) {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={desktopLinkClass(isActive)}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={desktopLinkClass(false)}
                  onClick={
                    item.placeholder
                      ? (e) => e.preventDefault()
                      : undefined
                  }
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`lg:hidden ${iconColor}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>

            <a
              href={BOOKING_URL}
              className={`rounded-full border px-5 py-2 text-xs transition-all duration-300 ${
                scrolled
                  ? "border-gold text-gold hover:bg-cream"
                  : "border-background/70 text-background hover:bg-background/15"
              }`}
            >
              Book
            </a>
          </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-background px-6 py-5 lg:hidden">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-display text-xl tracking-[0.3em] text-forest"
            >
              BELLEVA
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="text-forest"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-5">
            {NAV_ITEMS.map((item) => {
              if ("to" in item) {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={`font-display text-[34px] leading-[1.1] sm:text-[40px] ${
                      isActive ? "text-gold" : "text-forest"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.placeholder) e.preventDefault();
                    setMenuOpen(false);
                  }}
                  className="font-display text-[34px] leading-[1.1] sm:text-[40px] text-forest"
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href={BOOKING_URL}
              onClick={() => setMenuOpen(false)}
              className="mt-10 inline-flex w-fit rounded-full bg-forest px-8 py-3 text-sm text-cream"
            >
              Book an appointment
            </a>
            <p className="mt-3 font-body text-sm text-forest/70">
              Tell us your occasion in the Note box.
            </p>
          </nav>
          <div className="mt-12 border-t border-forest/15 pb-8 pt-6 font-body text-sm leading-[1.6] text-forest">
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-gold">
                Visit
              </p>
              <p>
                2200 W University Dr, Ste 180, Denton, TX 76201. Next to Dutch
                Bros.
              </p>
            </div>
            <div className="mt-4">
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-gold">
                Hours
              </p>
              <p>Mon-Fri 9:30am-7:30pm / Sat 9am-7pm / Sun 11am-5pm</p>
            </div>
            <div className="mt-4">
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-gold">
                Call
              </p>
              <a href="tel:+19405141808" className="underline decoration-1 underline-offset-[6px]">
                (940) 514-1808
              </a>
            </div>
            <Link
              to="/careers"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-block text-gold transition-colors hover:text-forest"
            >
              <span className="font-body text-[11px] uppercase tracking-[2px]">Careers</span>
              <span className="ml-1.5 font-body text-[11px] italic normal-case tracking-normal text-forest/60">
                — We're hiring
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
