// Finish definitions shared by the 3D scene and the finish picker.
// Swatch colours are only used for the small chip dot; the scene builds its own materials.

export type FinishId = "chrome" | "cat-eye" | "glazed" | "french" | "pearl";

export type Finish = {
  id: FinishId;
  label: string;
  swatch: string;
  description: string;
};

export const FINISHES: Record<FinishId, Finish> = {
  chrome: {
    id: "chrome",
    label: "Chrome",
    swatch: "linear-gradient(135deg, #f4f4f2 0%, #9a9a98 45%, #f8f8f6 70%, #7c7c7a 100%)",
    description: "Mirror chrome over gel. Catches every light in the room.",
  },
  "cat-eye": {
    id: "cat-eye",
    label: "Cat-eye",
    swatch: "linear-gradient(135deg, #2a0f22 0%, #5a2346 50%, #c9a0c0 58%, #3b1530 70%)",
    description: "Deep plum with a magnetic shimmer that moves as your hand does.",
  },
  glazed: {
    id: "glazed",
    label: "Glazed",
    swatch: "linear-gradient(135deg, #f6dfe0 0%, #f0c9cc 50%, #fff6f4 100%)",
    description: "Sheer pink with a pearly glaze, like the first bite of a donut.",
  },
  french: {
    id: "french",
    label: "French",
    swatch: "linear-gradient(180deg, #ffffff 0%, #ffffff 38%, #e6c3b6 40%, #e6c3b6 100%)",
    description: "Nude base, crisp white tip, a soft smile line. Never out of style.",
  },
  pearl: {
    id: "pearl",
    label: "Bridal pearl",
    swatch: "linear-gradient(135deg, #fbf7f0 0%, #efe4ec 45%, #e7eef0 70%, #fbf7f0 100%)",
    description: "Soft ivory with a pearl sheen. Made for the dress, and the photos.",
  },
};

export const FINISHES_A: FinishId[] = ["chrome", "cat-eye", "glazed", "french", "pearl"];
export const FINISHES_B: FinishId[] = ["pearl", "chrome", "cat-eye", "glazed", "french"];
