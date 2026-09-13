# /faq hero: responsive background image

## Goal
Replace the flat forest placeholder in the `/faq` hero with the uploaded responsive images, keeping the same hero structure, height, and text placement as `/standard`.

## Files to change
- `src/routes/faq.tsx` — hero background only
- No other pages modified.

## Assets
1. Create `faq-hero-desktop.png` from `image-24.png` (16:9) as a Lovable Asset.
2. Create `faq-hero-mobile.png` from `image-25.png` (4:5) as a Lovable Asset.
3. Import both pointer JSON files in `src/routes/faq.tsx`.

## Hero background delivery
Replace the current placeholder `<div className="absolute inset-0 bg-forest" />` with a responsive `<picture>` element:
- `<source media="(min-width: 769px)" srcSet={faqHeroDesktopAsset.url} />`
- `<img src={faqHeroMobileAsset.url} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center rounded-none" />`

Add the forest overlay directly above the image:
- `<div className="absolute inset-0 bg-forest/40" aria-hidden="true" />`

## Hero structure and text
Keep the existing hero section exactly as it is:
- Height: `h-[60vh] min-h-[440px] md:h-[70vh] md:min-h-[520px]` (same as `/standard`).
- Header remains transparent over the hero via `heroPassed` state passed to `<SiteHeader />`.
- Existing eyebrow, heading, and subline stay in the lower half, left-aligned, off-white `#FAF8F5`, with the same bottom padding (`pb-10 md:pb-16`).
- No duplicate opening block below the hero — the "BOOKING" group starts directly underneath with its current top spacing (`pt-12 md:pt-16`).

## Verification
- `bunx tsgo` passes.
- Playwright screenshots at mobile (393px) and desktop (1280px) confirm the correct image loads, overlay is 40% forest, text remains readable in the lower-left, and the header is transparent/off-white over the hero.
