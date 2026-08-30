# Plan: Add fabric background image to /standard hero

## Goal
Use the uploaded dark-green fabric image as the full-bleed background of the Opening/hero section on `/standard`, with a flat forest-green overlay, while preserving all existing text, typography, spacing, and scroll-triggered fade-up animation.

## Steps

1. **Create the asset**
   - Run `lovable-assets create --file /mnt/user-uploads/image-4.png --filename standard-hero-fabric.png > src/assets/standard-hero-fabric.png.asset.json`.
   - Import the new asset pointer in `src/routes/standard.tsx`.

2. **Update the hero background**
   - Replace the current solid `bg-forest` placeholder `<div>` with an absolute `<img>`:
     - `src={standardHeroFabricAsset.url}`
     - `alt=""` (decorative) and `aria-hidden="true"`
     - `className="absolute inset-0 h-full w-full object-cover object-center"`
   - Keep the existing overlay `<div>` and change it to a flat forest green layer at 35% opacity.
   - To preempt mobile readability issues on the dark fabric, use a responsive overlay: 45% opacity below the `md` breakpoint and 35% at `md` and above.

3. **Preserve everything else**
   - Leave the label, heading, subline, spacing, max-widths, bottom-left alignment, and `FadeUpSection` animation exactly as they are.

4. **Verify**
   - Run the build and check the `/standard` preview on mobile and desktop.
   - Confirm the heading remains legible; if not, lock the overlay at 45% across all breakpoints.

## Files to change
- `src/routes/standard.tsx`
- New `src/assets/standard-hero-fabric.png.asset.json`
