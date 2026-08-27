# Hero micro-fixes

Three targeted adjustments to the hero on `/` so text stays above the nails and the skin-tone contrast is readable.

## 1. Move hero text to the upper third
- Reduce the top offset of the centered text group so it sits in the upper third of `100svh`.
- Keep text centered horizontally; the photo of hands/nails must remain fully visible below the text group.
- Adjust the flex alignment if needed (currently `justify-start` with a large top padding, so tightening that padding is the minimal change).

## 2. Add an eyebrow above the H1
- Insert a small uppercase line above the H1 reading: `THE DESIGN LIBRARY — DENTON, TX`.
- Style: Inter, 11px, uppercase, letter-spacing 2px, off-white (#FAF8F5 / `text-background`).
- Use a utility string inline rather than modifying the global `.eyebrow` class, so it doesn't affect the gold eyebrows elsewhere.

## 3. Darken the flat overlay
- Change the hero overlay from `rgba(20,30,25,0.30)` to `rgba(20,30,25,0.38)`.
- Keep it a single flat layer, no gradient.

## Files touched
- `src/routes/index.tsx` only.
