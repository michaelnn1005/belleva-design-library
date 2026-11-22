// Ad tracking and sharing settings. Setup guide: docs/marketing/README.md
//
// Paste the IDs from Google Analytics and Meta (Facebook/Instagram) below. While an ID is empty,
// nothing from that service loads and nothing is sent, so the site behaves exactly as before.

/** Google Analytics 4 measurement ID, e.g. "G-AB12CD34EF". */
export const GA4_ID = "";
/** Meta Pixel ID (Facebook / Instagram ads), e.g. "123456789012345". */
export const META_PIXEL_ID = "";

/** The site's public address, used for share images. Change when a custom domain is connected. */
export const SITE_URL = "https://belleva-design-library.lovable.app";

/** Absolute URL of a file in /public, for share previews (Facebook, iMessage, etc. need full URLs). */
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

/** Share-preview meta tags for a page, using one of the 1200x630 images in /public/share. */
export function shareMeta(image: string, path?: string) {
  return [
    { property: "og:image", content: absoluteUrl(`/share/${image}.jpg`) },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    ...(path ? [{ property: "og:url", content: absoluteUrl(path) }] : []),
    { property: "og:site_name", content: "Belleva Nails" },
    { name: "twitter:image", content: absoluteUrl(`/share/${image}.jpg`) },
  ];
}

/** <script> tags for the root <head>: only the services that have an ID. */
export function trackingScripts() {
  const scripts: { src?: string; async?: boolean; children?: string }[] = [];
  if (GA4_ID) {
    scripts.push({ src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`, async: true });
    scripts.push({
      children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
    });
  }
  if (META_PIXEL_ID) {
    scripts.push({
      children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
    });
  }
  return scripts;
}

type Win = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/**
 * The actions that matter for ads. Each one goes to Google Analytics (as the event name) and to
 * Meta (as its standard event, so ads can optimise for it).
 */
const EVENTS = {
  book_click: "Schedule",
  call_click: "Contact",
  text_click: "Contact",
  directions_click: "FindLocation",
  bridal_lead: "Lead",
} as const;
export type MarketingEvent = keyof typeof EVENTS;

export function track(event: MarketingEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  try {
    // bridal sign-ups use Google's recommended lead event name
    w.gtag?.("event", event === "bridal_lead" ? "generate_lead" : event, params);
    w.fbq?.("track", EVENTS[event], params);
  } catch {
    // tracking must never break the page
  }
}

/** Page views after in-site navigation (Google Analytics counts these on its own). */
export function trackPageView() {
  try {
    (window as Win).fbq?.("track", "PageView");
  } catch {
    // ignore
  }
}

// ---- remember which ad brought the visitor, and hand it on to the booking site ----

const AD_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ttclid",
];
const STORE = "belleva_ad";

/** On arrival: keep the ad parameters from the landing URL for the rest of the visit. */
export function rememberAdSource() {
  try {
    const url = new URL(window.location.href);
    const found: Record<string, string> = {};
    for (const k of AD_KEYS) {
      const v = url.searchParams.get(k);
      if (v) found[k] = v;
    }
    if (Object.keys(found).length) sessionStorage.setItem(STORE, JSON.stringify(found));
  } catch {
    // private mode or blocked storage: nothing to remember
  }
}

/**
 * A booking link with the visitor's ad source on it. The page's own campaign code
 * (e.g. WEB26BRD) moves to utm_content so the salon still sees which page they booked from.
 */
export function withAdSource(href: string) {
  let ad: Record<string, string> | null = null;
  try {
    ad = JSON.parse(sessionStorage.getItem(STORE) ?? "null");
  } catch {
    return href;
  }
  if (!ad) return href;
  try {
    const url = new URL(href);
    const ownCampaign = url.searchParams.get("utm_campaign");
    if (ownCampaign && ad["utm_campaign"] && !ad["utm_content"])
      url.searchParams.set("utm_content", ownCampaign);
    for (const [k, v] of Object.entries(ad)) url.searchParams.set(k, v);
    return url.toString();
  } catch {
    return href;
  }
}
