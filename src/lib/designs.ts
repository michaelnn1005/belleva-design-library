export type Design = {
  id: string;
};

export const DESIGNS: Design[] = [
  { id: "linen-bloom" },
  { id: "star-porcelain" },
  { id: "golden-flow" },
  { id: "crimson-jewels" },
  { id: "navy-starlet" },
  { id: "verdant-drift" },
  { id: "balanced-form" },
  { id: "playful-lines" },
  { id: "orbit" },
  { id: "midnight-ornament" },
  { id: "pearl-veil" },
  { id: "espresso-french" },
];

export const BOOKING_URL = "https://bellevanail.com/booking";
export const SALON_TEL = "tel:+19405141808";
export const SALON_SMS = "sms:+19405141808";
/** Belleva on Google: hours (including holiday hours), photos and reviews. */
export const GOOGLE_PROFILE_URL = "https://www.google.com/search?q=Belleva+Nails+Denton+TX";

export const PLACEHOLDER_TONES: readonly [string, string, string, string] = ["#EAE4D8", "#3A5A4A", "#E3DACB", "#EFEAE0"];

export function toneAt(index: number): string {
  return PLACEHOLDER_TONES[index % PLACEHOLDER_TONES.length] ?? "#EAE4D8";
}
