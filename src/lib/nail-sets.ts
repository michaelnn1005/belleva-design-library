import type { CSSProperties } from "react";
import { IMAGES, type OptimizedImage } from "@/lib/images";

// The nail sets shown in the desktop home hero (LookbookHero), in display order.
// New photos are added by scripts/add-nails.ts, which appends lines above the marker.

export type NailSet = {
  key: string;
  image: OptimizedImage;
  name: string;
  /**
   * Only for the salon's poster images, which have the set name printed on them:
   * zoom to a window that shows just the nails, as [scale, left, top] where left/top
   * are the window's top-left corner as a fraction of the photo.
   * Plain photos leave this out and are shown whole, never cropped.
   */
  crop?: [number, number, number];
};

export const NAIL_SETS: NailSet[] = [
  {
    key: "rose",
    image: IMAGES["gallery-01-rose-veil"],
    name: "Rosé Veil",
    crop: [1.6, 0.19, 0.34],
  },
  {
    key: "gallery-21-gilded-web",
    image: IMAGES["gallery-21-gilded-web"],
    name: "Gilded Web",
    crop: [1.6, 0.19, 0.28],
  },
  {
    key: "darkly",
    image: IMAGES["gallery-10-darkly-iconic"],
    name: "Darkly Iconic",
    crop: [1.5, 0.33, 0.1],
  },
  {
    key: "gallery-20-emerald-serpent",
    image: IMAGES["gallery-20-emerald-serpent"],
    name: "Emerald Serpent",
    crop: [1.55, 0.33, 0],
  },
  {
    key: "turq",
    image: IMAGES["gallery-11-turquoise-rodeo"],
    name: "Turquoise Rodeo",
    crop: [1.5, 0.17, 0.27],
  },
  {
    key: "gallery-26-silver-bloom",
    image: IMAGES["gallery-26-silver-bloom"],
    name: "Silver Bloom",
    crop: [1.6, 0.375, 0],
  },
  {
    key: "shinobi",
    image: IMAGES["gallery-16-shinobi-edge"],
    name: "Shinobi Edge",
    crop: [1.65, 0, 0.3],
  },
  {
    key: "gallery-22-ink-current",
    image: IMAGES["gallery-22-ink-current"],
    name: "Ink Current",
    crop: [1.55, 0.17, 0.29],
  },
  {
    key: "linen",
    image: IMAGES["gallery-05-linen-bloom"],
    name: "Linen Bloom",
    crop: [1.55, 0.17, 0.35],
  },
  {
    key: "gallery-25-retro-bloom",
    image: IMAGES["gallery-25-retro-bloom"],
    name: "Retro Bloom",
    crop: [1.42, 0.04, 0.28],
  },
  {
    key: "matcha",
    image: IMAGES["gallery-04-matcha-plaid-french"],
    name: "Matcha Plaid French",
    crop: [1.75, 0.43, 0.05],
  },
  {
    key: "gallery-19-color-mosaic",
    image: IMAGES["gallery-19-color-mosaic"],
    name: "Color Mosaic",
    crop: [1.45, 0.3, 0.3],
  },
  {
    key: "lemon",
    image: IMAGES["gallery-08-lemon-meadow"],
    name: "Lemon Meadow",
    crop: [1.5, 0.33, 0.3],
  },
  {
    key: "gallery-28-wine-ribbon",
    image: IMAGES["gallery-28-wine-ribbon"],
    name: "Wine Ribbon",
    crop: [1.55, 0.12, 0.29],
  },
  {
    key: "harle",
    image: IMAGES["gallery-15-harlequin-set"],
    name: "Harlequin Set",
    crop: [1.5, 0, 0.27],
  },
  {
    key: "gallery-27-smoky-halo",
    image: IMAGES["gallery-27-smoky-halo"],
    name: "Smoky Halo",
    crop: [1.5, 0.02, 0],
  },
  {
    key: "thriller",
    image: IMAGES["gallery-17-thriller-set"],
    name: "Thriller Set",
    crop: [1.72, 0.42, 0.3],
  },
  {
    key: "gallery-18-classic-french",
    image: IMAGES["gallery-18-classic-french"],
    name: "Classic French",
    crop: [1.45, 0.3, 0.06],
  },
  {
    key: "amber",
    image: IMAGES["gallery-14-amber-foil"],
    name: "Amber Foil",
    crop: [1.4, 0.15, 0.22],
  },
  {
    key: "gallery-24-pumpkin-pie-set",
    image: IMAGES["gallery-24-pumpkin-pie-set"],
    name: "Pumpkin Pie Set",
    crop: [1.42, 0.3, 0.03],
  },
  {
    key: "wings",
    image: IMAGES["gallery-13-iridescent-wings"],
    name: "Iridescent Wings",
    crop: [1.4, 0.15, 0.2],
  },
  {
    key: "gallery-23-kitty-pop",
    image: IMAGES["gallery-23-kitty-pop"],
    name: "Kitty Pop",
    crop: [1.5, 0.23, 0.1],
  },
  {
    key: "verdant",
    image: IMAGES["gallery-07-verdant-drift"],
    name: "Verdant Drift",
    crop: [1.55, 0.3, 0],
  },
  {
    key: "milky",
    image: IMAGES["gallery-02-milky-orbit"],
    name: "Milky Orbit",
    crop: [1.55, 0, 0.32],
  },
  {
    key: "charm",
    image: IMAGES["gallery-03-polished-charm"],
    name: "Polished Charm",
    crop: [1.7, 0.41, 0.12],
  },
  {
    key: "sculpt",
    image: IMAGES["gallery-06-sculpted-elegance"],
    name: "Sculpted Elegance",
    crop: [1.55, 0.1, 0.33],
  },
  {
    key: "balanced",
    image: IMAGES["gallery-09-balanced-form"],
    name: "Balanced Form",
    crop: [1.55, 0.35, 0.35],
  },
  {
    key: "web",
    image: IMAGES["gallery-12-shadow-web"],
    name: "Shadow Web",
    crop: [1.5, 0.33, 0.28],
  },
  // add-nails.ts: new sets go above this line
];

/** Style for an <img> filling a frame with the photo's own proportions: zooms posters to their crop window, leaves plain photos whole. */
export function cropStyle(crop: NailSet["crop"]): CSSProperties {
  if (!crop) return {};
  const [scale, left, top] = crop;
  // transform-origin is the point that stays put while scaling, so the window
  // starting at (left, top) of width 1/scale is reached from origin = left / (1 - 1/scale).
  const k = 1 - 1 / scale;
  return {
    transform: `scale(${scale})`,
    transformOrigin: `${((left / k) * 100).toFixed(1)}% ${((top / k) * 100).toFixed(1)}%`,
  };
}

/** Plain URL of a mid-size WebP variant, for CSS backgrounds. */
export function variantUrl(image: OptimizedImage, near = 800) {
  const w = image.widths.find((x) => x >= near) ?? image.widths.at(-1)!;
  return `/img/${image.name}-${w}.webp`;
}

export const setByKey = (key: string) => NAIL_SETS.find((s) => s.key === key)!;
