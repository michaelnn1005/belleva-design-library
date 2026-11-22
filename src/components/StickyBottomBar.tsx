import { BOOKING_URL } from "@/lib/designs";
import { Link, useLocation } from "@tanstack/react-router";

const SALON_SMS = "sms:+19405141808";
const BAR =
  "fixed inset-x-0 bottom-0 z-30 flex items-stretch bg-forest text-sm text-cream shadow-[0_-10px_30px_-18px_rgba(0,0,0,0.5)] md:hidden";
const MAIN = "flex flex-1 items-center justify-center gap-3 px-6 py-4";

function Arrow() {
  return (
    <svg width="18" height="8" viewBox="0 0 18 8" fill="none" aria-hidden="true">
      <path d="M0 4h16M13 1l3 3-3 3" stroke="#8A7340" strokeWidth="1" />
    </svg>
  );
}

// Phones only: the main action stays one tap away once the visitor has scrolled past the top,
// with a second button to text the salon. On the Bridal page it leads to the bridal form.
export function StickyBottomBar({ show, bridal = false }: { show: boolean; bridal?: boolean }) {
  const location = useLocation();
  if (!show) return null;

  if (location.pathname === "/careers") {
    return (
      <div className={BAR}>
        <a href="sms:+14693770984" className={MAIN}>
          Text Michael
          <Arrow />
        </a>
      </div>
    );
  }

  return (
    <div className={`${BAR} pb-[env(safe-area-inset-bottom)]`}>
      {bridal ? (
        <Link to="/bridal" hash="join" className={MAIN}>
          Plan my bridal nails
          <Arrow />
        </Link>
      ) : (
        <a href={BOOKING_URL} className={MAIN}>
          Book an appointment
          <Arrow />
        </a>
      )}
      <a
        href={SALON_SMS}
        aria-label="Text Belleva Nails at (940) 514-1808"
        className="flex items-center gap-2 border-l border-cream/20 px-5 text-[13px] text-cream/90"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <path d="M4 5h16v11H9l-5 4z" strokeLinejoin="round" />
        </svg>
        Text
      </a>
    </div>
  );
}
