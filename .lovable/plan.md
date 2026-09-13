# /services hero: responsive image and layout

## What to build
Update the `/services` page hero so it serves a different uploaded image on desktop vs mobile, with layout values matching each breakpoint.

## Scope
Only `src/routes/services.tsx`. No other pages or sections change.

## Details

### Assets
1. Create two Lovable Assets from the uploaded images:
   - `services-hero-desktop.png` from `image-17.png`
   - `services-hero-mobile.png` from `image-18.png`
2. Import both pointer JSON files in `src/routes/services.tsx`.

### Hero image delivery
Use a `<picture>` element as the hero background image:
- `<source media="(min-width: 769px)" srcSet={desktopAsset.url} />`
- `<img src={mobileAsset.url} alt="" aria-hidden="true" />`
Keep the image `absolute inset-0 h-full w-full object-cover rounded-none`.

### Layout values

**Mobile (max-width: 768px):**
- `object-position: center top`
- Forest overlay at 35% (`bg-forest/35`)
- Hero height: `h-[80vh] min-h-[520px]`
- Content aligned to bottom: `items-end`
- Bottom padding: `pb-14` (56px)

**Desktop (min-width: 769px):**
- `object-position: center right`
- Forest overlay at 35% (`md:bg-forest/35`)
- Hero height: `h-[70vh] min-h-[520px]`
- Content vertically centered: `md:items-center`
- Bottom padding: `md:pb-16`

### Cleanup
Remove the previous mobile-only overrides that used `object-[100%_25%]`, the 45% mobile overlay, and bottom-only alignment. The hero now switches image source and layout cleanly by breakpoint.

## Verification
- Typecheck passes (`bunx tsgo`).
- Playwright screenshots at mobile (393px) and desktop (1280px) confirm the correct image, object position, overlay density, and content alignment.
