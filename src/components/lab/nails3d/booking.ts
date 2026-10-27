import { BOOKING_URL } from "@/lib/designs";
import type { FinishId } from "./finishes";

/**
 * Booking link that carries the chosen finish. The booking site has no field for it,
 * so it travels as utm_content: it shows up in analytics, and the front desk can see
 * which look a client came for.
 */
export function bookThisLookUrl(finish: FinishId, version: "A" | "B") {
  const params = new URLSearchParams({
    utm_source: "web",
    utm_medium: "hero-3d",
    utm_campaign: `WEB26LAB${version}`,
    utm_content: finish,
  });
  return `${BOOKING_URL}?${params.toString()}`;
}
