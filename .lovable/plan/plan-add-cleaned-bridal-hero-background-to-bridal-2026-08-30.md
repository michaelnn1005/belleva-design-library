# Plan: Add cleaned bridal hero background to /bridal

## Goal
Use the uploaded nail-design photo as the full-bleed background of the `/bridal` hero, with all on-image text removed first. Keep the existing forest-green overlay, typography, button, and scroll-driven header behavior exactly as they are.

## Steps

1. **Clean the uploaded image**
   - Use `imagegen--edit_image` on `user-uploads://ChatGPT_Image_Jun_22_2026_06_14_56_PM.png`.
   - Remove all text overlays: "SHAPE STUDY", "Blush Curve", the descriptor bullets, and "bellevanail.com".
   - Preserve the manicured hand, rings, nail design, fabric/leaves, and natural lighting.
   - Save the cleaned image to a temporary path.

2. **Create the Lovable Asset**
   - Run `lovable-assets create --file <cleaned-image> --filename bridal-hero.png > src/assets/bridal-hero.png.asset.json`.

3. **Update the /bridal hero**
   - In `src/routes/bridal.tsx`, import the new asset pointer.
   - Replace the `PLACEHOLDER_IMAGE` SVG with `bridalHeroAsset.url` on the hero `<img>`.
   - Keep `className="absolute inset-0 h-full w-full object-cover object-center"` and the existing `alt` text.
   - Keep the overlay flat forest green `#2F4A3E`:
     - 45% opacity below the `md` breakpoint (mobile safeguard for legibility).
     - 35% opacity at `md` and above.
   - Leave the label, heading, subline, pill button, spacing, bottom-left alignment, and `FadeUpSection` animation untouched.
   - Leave the scroll-driven `heroPassed` / `SiteHeader` behavior untouched.

4. **Verify**
   - Run the build and check the `/bridal` preview on mobile and desktop.
   - Confirm the heading remains legible; if 45% mobile overlay is still insufficient, lock it at a higher value only on the smallest breakpoint.

## Files to change
- `src/routes/bridal.tsx`
- New `src/assets/bridal-hero.png.asset.json`
