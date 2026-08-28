# Plan: Editorial Index List for Service Tiles

## Goal
Restyle the three smaller service tiles (Pedicure, Waxing, Lashes) in the **SERVICES** section into a text-only, magazine-style index list. The flagship **Nails** tile and the section header remain untouched.

## Scope
Only `src/routes/index.tsx` and related asset cleanup. No changes to the Nails flagship tile, the "SERVICES" eyebrow/heading, or any other section.

## Implementation Steps

1. **Remove image-based small-tile data**
   - In `ServicesSection`, delete the `smallTiles` array that references `servicesPedicure`, `servicesWaxing`, and `servicesLashes`.
   - Remove the imports for those three placeholder images at the top of the file.
   - (Optional cleanup) Delete the now-unused files `src/assets/services-pedicure.jpg`, `src/assets/services-waxing.jpg`, and `src/assets/services-lashes.jpg`.

2. **Build the editorial index list**
   Replace the current 3-column / stacked image+text grid with a single vertical stack of three full-width rows:
   - Each row is an `<a>` linking to `BOOKING_URL`.
   - A thin 1px horizontal rule (`#E5DFD3`) appears **above** each row and **below** the last row.
   - Row content, left to right:
     - **Index number**: Inter 11px, matte gold `#8A7340`, uppercase, letter-spacing 1px — "01", "02", "03".
     - **~16px gap** to the service name.
     - **Service name**: Cormorant Garamond 22px, forest green `#2F4A3E`.
     - **Description**: Inter 13px muted, on the same line where space allows; on mobile it stacks directly under the name.
   - Generous vertical padding (~24px) inside each row.
   - No icons, arrows, shadows, or images.

3. **Preserve animation**
   - Keep the section wrapped in the existing `useFadeIn` hook so the whole SERVICES section still fades in slowly on scroll.

4. **Verify**
   - Run the dev build to confirm no import errors.
   - Check mobile viewport: the three rows should read cleanly as a magazine index, with descriptions wrapping under names if needed.
   - Confirm each row is fully tappable and navigates to `https://bellevanail.com/booking`.
