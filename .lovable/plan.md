# Add "The Edit" featured-design scroll strip in SERVICES

## Goal
Insert a horizontally scrolling featured-design strip between the Nails flagship block and the 01/02/03 service index list.

## Changes

In `src/routes/index.tsx`, inside the SERVICES section:

1. Insert a new block after the Nails flagship tile (slideshow + text) and before the `01 Pedicure` index list.
2. Add a gold eyebrow label: "THE EDIT" (Inter 10px, uppercase, letter-spacing 2px, #8A7340).
3. Add a horizontal scroll row:
   - Native touch scrolling with momentum (`overflow-x-auto`).
   - No arrows, no autoplay.
   - Cards ~200px wide, gap 16px.
   - Row bleeds off the right edge to hint more content.
   - Left edge aligns with the section's text margin.
   - Optional soft right-edge fade (same style as the clients marquee).
4. Each card:
   - 4:5 image, rounded 10px, placeholder for now.
   - Set name in Cormorant Garamond 16px forest green below the image.
   - "from $XX" in Inter 12px muted below the name.
   - No borders, no shadows.
   - Entire card links to `https://bellevanail.com/booking`.
5. Cards data:
   - Linen Bloom $70
   - Star Porcelain $75
   - Golden Flow $65
   - Crimson Jewels $60
   - Navy Starlet $70
   - Pearl Veil $70

## Untouched

- Nails slideshow, Nails title, service list, description.
- 01/02/03 service index list.
- All other sections.
