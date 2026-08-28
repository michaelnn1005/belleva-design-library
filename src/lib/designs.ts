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

export const PLACEHOLDER_TONES: readonly [string, string, string, string] = ["#EAE4D8", "#3A5A4A", "#E3DACB", "#EFEAE0"];

export function toneAt(index: number): string {
  return PLACEHOLDER_TONES[index % PLACEHOLDER_TONES.length] ?? "#EAE4D8";
}
