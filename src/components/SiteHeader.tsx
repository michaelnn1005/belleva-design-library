import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BOOKING_URL } from "@/lib/designs";

export function SiteHeader({ heroPassed = true }: { heroPassed?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = heroPassed;

  const navLinkClass = `text-[12px] uppercase tracking-[1.5px] transition-colors duration-300 ${
    scrolled ? "text-forest hover:text-gold" : "text-background/90 hover:text-background"
  }`;

  const iconColor = scrolled ? "text-forest" : "text-background";

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-background" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
          <Link
            to="/"
            className={`font-display text-xl tracking-[0.3em] transition-colors duration-300 ${
              scrolled ? "text-forest" : "text-background"
            }`}
          >
            BELLEVA
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className={navLinkClass}>
              Home
            </Link>
            <Link to="/standard" className={navLinkClass}>
              Standard
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`md:hidden ${iconColor}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-background px-6 py-5 md:hidden">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-8">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-display text-[32px] leading-none text-forest"
            >
              Home
            </Link>
            <Link
              to="/standard"
              onClick={() => setMenuOpen(false)}
              className="font-display text-[32px] leading-none text-forest"
            >
              Standard
            </Link>
            <a
              href={BOOKING_URL}
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex w-fit rounded-full bg-forest px-8 py-3 text-sm text-cream"
            >
              Book an appointment
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
