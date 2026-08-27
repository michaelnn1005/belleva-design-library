export type Design = {
  id: string;
  name: string;
  collection: string;
  service: string;
  tags: string[];
  price: number;
};

export const FILTERS = [
  "All",
  "Wedding",
  "Everyday",
  "Date night",
  "Holiday",
  "Gel-X",
  "Builder gel",
  "Dipping",
  "Acrylic",
  "French",
  "Chrome",
  "Minimal",
] as const;

export const DESIGNS: Design[] = [
  { id: "linen-bloom", name: "Linen Bloom", collection: "SIGNATURE SET", service: "Gel-X", tags: ["Wedding", "French"], price: 70 },
  { id: "star-porcelain", name: "Star Porcelain", collection: "ART FOCUS", service: "Gel-X", tags: ["Wedding", "Chrome"], price: 75 },
  { id: "golden-flow", name: "Golden Flow", collection: "SIGNATURE SET", service: "Builder gel", tags: ["Everyday", "Minimal"], price: 65 },
  { id: "crimson-jewels", name: "Crimson Jewels", collection: "DETAIL EDIT", service: "Dipping", tags: ["Holiday"], price: 60 },
  { id: "navy-starlet", name: "Navy Starlet", collection: "BELLEVA EDIT", service: "Gel-X", tags: ["Date night"], price: 70 },
  { id: "verdant-drift", name: "Verdant Drift", collection: "BELLEVA EDIT", service: "Acrylic", tags: ["Everyday"], price: 65 },
  { id: "balanced-form", name: "Balanced Form", collection: "SIGNATURE SET", service: "Builder gel", tags: ["Minimal"], price: 65 },
  { id: "playful-lines", name: "Playful Lines", collection: "BELLEVA EDIT", service: "Gel-X", tags: ["Date night"], price: 70 },
  { id: "orbit", name: "Orbit", collection: "ART FOCUS", service: "Acrylic", tags: ["Chrome", "Holiday"], price: 75 },
  { id: "midnight-ornament", name: "Midnight Ornament", collection: "DETAIL EDIT", service: "Dipping", tags: ["Holiday", "Date night"], price: 60 },
  { id: "pearl-veil", name: "Pearl Veil", collection: "SIGNATURE SET", service: "Gel-X", tags: ["Wedding", "Minimal"], price: 70 },
  { id: "espresso-french", name: "Espresso French", collection: "BELLEVA EDIT", service: "Builder gel", tags: ["Everyday", "French"], price: 65 },
];

export const BOOKING_URL = "https://bellevanail.com/booking";

export const PLACEHOLDER_TONES: readonly [string, string, string, string] = ["#EAE4D8", "#3A5A4A", "#E3DACB", "#EFEAE0"];

export function matchesFilter(design: Design, filter: string) {
  if (filter === "All") return true;
  return design.service === filter || design.tags.includes(filter);
}

export function toneAt(index: number): string {
  return PLACEHOLDER_TONES[index % PLACEHOLDER_TONES.length] ?? "#EAE4D8";
}
