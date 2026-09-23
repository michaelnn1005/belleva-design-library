# Plan: Re-layout the homepage design-library hero

## Scope
Change only the `Find your next set.` hero in `src/routes/index.tsx`. Keep the existing image, shared header behavior, colors, typography families, and all following homepage sections unchanged.

## Implementation
- Replace the current full-image hero with a responsive composition:
  - Below 1024px: 60svh image band followed by a solid forest text panel with the specified mobile spacing.
  - From 1024px: 100svh two-column grid with a 58% image area and 42% forest text panel, without a gap.
- Keep the existing photo in the image area, use `object-cover object-[center_40%]`, and apply the existing forest token at 35% opacity only over the photo.
- Keep `SiteHeader` over the hero; preserve its transparent-to-solid scroll behavior by retaining the hero boundary and current `heroPassed` logic.
- Rebuild the text panel in the requested order and spacing:
  1. 12px uppercase library label.
  2. 44px mobile / 64px desktop headline at 1.05 line-height.
  3. Supporting sentence at 16px mobile / 17px desktop.
  4. Existing booking destination on an off-white filled pill button.
  5. The Note-box helper line.
  6. `EXPLORE SERVICES` as a text link to `/services`.
- Import and reuse the shared `BOOKING_URL`; use existing semantic forest/background color tokens with no icons, shadows, or gradients.

## Verification
- Check the homepage at 393px, 768px, and 1280px.
- Confirm the text never overlays the photo or nails, the header remains transparent over the image area, the layout switches at 1024px, and both links point to the correct destinations.
