import { BOOKING_URL } from "@/lib/designs";
import { useLocation } from "@tanstack/react-router";

export function StickyBottomBar({ show }: { show: boolean }) {
  if (!show) return null;

  const location = useLocation();
  const isCareersPage = location.pathname === "/careers";

  return (
    <a
      href={isCareersPage ? "sms:4693770984" : BOOKING_URL}
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-center gap-3 bg-forest px-6 py-4 text-sm text-cream md:hidden"
    >
      {isCareersPage ? "Text Michael" : "Book an appointment"}
      <svg width="18" height="8" viewBox="0 0 18 8" fill="none" aria-hidden="true">
        <path d="M0 4h16M13 1l3 3-3 3" stroke="#8A7340" strokeWidth="1" />
      </svg>
    </a>
  );
}
