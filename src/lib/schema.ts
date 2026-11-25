// What Google reads about the salon (schema.org "NailSalon"), on every page as JSON-LD.
// Keep name, address, phone and hours identical to the Google Business Profile — Google
// trusts a business more when every listing says exactly the same thing.
import { BOOKING_URL } from "@/lib/designs";
import { CANONICAL_ORIGIN } from "@/lib/marketing";

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "2200 W University Dr, Ste 180",
  addressLocality: "Denton",
  addressRegion: "TX",
  postalCode: "76201",
  addressCountry: "US",
};

const hours = (days: string[], opens: string, closes: string) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: days,
  opens,
  closes,
});

export const SALON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  "@id": `${CANONICAL_ORIGIN}/#salon`,
  name: "Belleva Nails",
  url: `${CANONICAL_ORIGIN}/`,
  image: `${CANONICAL_ORIGIN}/share/home.jpg`,
  telephone: "+1-940-514-1808",
  email: "bellevanailsdenton@gmail.com",
  priceRange: "$$",
  address: ADDRESS,
  hasMap:
    "https://maps.google.com/?q=Belleva+Nails+2200+W+University+Dr+Ste+180+Denton+TX+76201",
  areaServed: ["Denton", "Corinth", "Argyle", "Krum", "Sanger", "Lake Dallas"].map((name) => ({
    "@type": "City",
    name: `${name}, TX`,
  })),
  openingHoursSpecification: [
    hours(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "09:30", "19:30"),
    hours(["Saturday"], "09:00", "19:00"),
    hours(["Sunday"], "11:00", "17:00"),
  ],
  sameAs: [
    "https://www.instagram.com/bellevanailsdenton/",
    "https://www.facebook.com/profile.php?id=61569011714593",
    "https://www.tiktok.com/@belleva.nail",
    "https://www.pinterest.com/bellevanailsdenton/",
    "https://www.youtube.com/@BellevaNail",
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: { "@type": "EntryPoint", urlTemplate: BOOKING_URL },
    result: { "@type": "Reservation", name: "Nail appointment" },
  },
};

/** <script type="application/ld+json"> for the root <head>. */
export const schemaScript = () => ({
  type: "application/ld+json",
  // "<" escaped so the JSON can never close the script tag early
  children: JSON.stringify(SALON_SCHEMA).replace(/</g, "\\u003c"),
});
