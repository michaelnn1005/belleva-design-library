# Careers hero rebuild

## Goal
Add a full-bleed hero section to `/careers` that matches the `/faq` hero structure and height, using the two uploaded images. Move the existing "CAREERS" eyebrow and "Come build with us." heading into the hero; leave the intro paragraph below the hero as the first off-white block.

## What will change
- `src/routes/careers.tsx` only.

## Plan

1. **Create CDN assets for the two uploaded hero images**
   - Upload `/mnt/user-uploads/image-27.png` as `careers-hero-desktop.png` (16:9, desktop).
   - Upload `/mnt/user-uploads/image-28.png` as `careers-hero-mobile.png` (4:5, mobile).
   - Write the resulting `.asset.json` pointers to `src/assets/careers-hero-desktop.png.asset.json` and `src/assets/careers-hero-mobile.png.asset.json`.

2. **Update imports and scroll state in `src/routes/careers.tsx`**
   - Import `useState` and `useEffect` from React.
   - Import the two new asset pointers.
   - Add `const [heroPassed, setHeroPassed] = useState(false);` and the same scroll listener used on `/faq` to toggle `heroPassed` once the user scrolls past `#hero`.
   - Change `<SiteHeader heroPassed={true} />` to `<SiteHeader heroPassed={heroPassed} />`.

3. **Insert the hero section at the top of `<main>`**
   - `<section id="hero" className="relative h-[60vh] min-h-[440px] w-full md:h-[70vh] md:min-h-[520px]">`
   - Background via `<picture>`:
     - `<source media="(min-width: 769px)" srcSet={careersHeroDesktopAsset.url} />`
     - `<img src={careersHeroMobileAsset.url} alt="" aria-hidden="true" className="h-full w-full object-cover object-center rounded-none" />`
   - Overlay: `<div className="absolute inset-0 bg-forest/40" aria-hidden="true" />`
   - Content container: `relative mx-auto flex h-full max-w-[720px] items-end px-6 pb-10 md:px-12 md:pb-16`
   - Inside the content, render the eyebrow and heading moved from the opening block:
     - Eyebrow: keep current `text-[11px] uppercase tracking-[0.14em]` but color `text-[#FAF8F5]`.
     - Heading: keep current `mt-4 font-display text-[36px] font-medium leading-[1.05] md:text-[56px]` but color `text-[#FAF8F5]`.

4. **Trim the opening off-white block**
   - Remove the eyebrow and heading from the existing opening section so only the intro paragraph remains.
   - Keep the paragraph's text, font, size, color, max-width, and spacing exactly as it is now.
   - Keep the section's background, padding, and container unchanged.

5. **Leave everything else untouched**
   - All other `/careers` sections, components, footer, and sticky bottom bar stay as-is.
   - No changes to any other route or shared component.

## Verification
- Run `bunx tsgo` and confirm exit code 0.
- Capture Playwright screenshots at 393×805 (mobile) and 1280×1800 (desktop) to confirm:
  - Header is transparent over the hero with off-white logo/menu/Book button.
  - Hero shows the correct image per breakpoint with forest overlay.
  - "CAREERS" and "Come build with us." sit in the lower-left of the hero.
  - Intro paragraph appears directly below the hero, not duplicated.
