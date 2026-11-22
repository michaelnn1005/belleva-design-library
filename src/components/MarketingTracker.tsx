import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { rememberAdSource, track, trackPageView, withAdSource } from "@/lib/marketing";

// Mounted once in the root. Watches every click on the site, so no button needs its own code:
//   booking links → "book_click" (and the visitor's ad source is added to the link),
//   tel: → "call_click", sms: → "text_click", Google Maps → "directions_click".
// Also remembers the ad that brought the visitor and counts page views for Meta.
export function MarketingTracker() {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    rememberAdSource();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!a || !href) return;
      const from = { page: window.location.pathname };
      if (href.startsWith("https://bellevanail.com/booking")) {
        a.setAttribute("href", withAdSource(href));
        track("book_click", from);
      } else if (href.startsWith("tel:")) {
        track("call_click", from);
      } else if (href.startsWith("sms:")) {
        track("text_click", from);
      } else if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl|maps\.google\./.test(href)) {
        track("directions_click", from);
      }
    };
    // capture phase, so the link is updated before the browser follows it
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false; // the first page view is sent by the pixel itself
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
}
