# Global tablet and desktop layout pass

## Goal
Rebuild the shared layout behavior at 768px and 1280px without changing the existing 393px presentation, content, imagery, ordering, colors, typography, or effects.

## 1. Shared container and readable text measure
- Update the page-section wrappers across `/`, `/standard`, `/faq`, `/bridal`, `/contact`, `/services`, and `/careers` from the current 720px-centered pattern to a left-aligned `max-width: 1200px` container.
- Preserve current mobile padding at 393px; use 40px horizontal padding from 768px and 64px from 1024px.
- Keep body copy in left-aligned inner blocks capped at approximately `65ch`; retain narrower intentional text measures where they already improve composition.
- Let section media, grids, price lists, accordions, and other structured content use the wider container rather than widening body paragraphs.

## 2. Section rhythm
- Preserve current mobile section spacing exactly.
- Normalize standard section spacing to 80px from 768px and 112px from 1024px across all seven pages.
- Remove the homepage Belleva Standard section’s current oversized desktop `py-80` band and bring it into the same 80px/112px rhythm.
- Preserve intentionally compact internal bands and spacing that are not section-to-section gaps.

## 3. Image heroes
- For `/standard`, `/faq`, `/bridal`, `/services`, and `/careers`, use the shared 1200px container for hero copy and constrain its column to at most 55% from 768px upward.
- Keep hero copy aligned to the left container edge.
- Cap image hero height at 70vh from 1024px while preserving each existing mobile height, minimum height, image, overlay, and transparent-header behavior.
- Change responsive `<picture>` sources on `/faq`, `/services`, and `/careers` so desktop artwork starts at 768px, then tune tablet object positioning using the existing images only.
- Tune the single-image `/standard` and `/bridal` tablet crops with responsive object positioning.
- `/contact` currently has no image hero; keep it image-free and apply only the shared container and rhythm rules rather than introducing a new image.
- Keep the homepage hero’s existing mobile composition and apply only the shared desktop container alignment needed by this pass.

## 4. Header
- Keep the compact menu button and menu overlay through 1023px.
- Move the five-link inline navigation to the 1024px breakpoint; keep Book visible and preserve current styling and behavior.
- Align the header interior to the shared 1200px container with unchanged mobile presentation, 40px tablet padding, and 64px desktop padding.

## 5. Footer
- Reorganize the existing footer content into one column on mobile, two columns from 768px, and three columns from 1024px.
- Column 1: logo, address, phone. Column 2: hours. Column 3: social links, Careers, and Book.
- At 768px, place the third content group on the next grid row without changing its content or controls.
- Use the shared 1200px container and responsive horizontal padding while preserving the current mobile stack and the existing `/contact` behavior that hides Book.

## Files in scope
- `src/styles.css`
- `src/components/SiteHeader.tsx`
- `src/components/SiteFooter.tsx`
- `src/routes/index.tsx`
- `src/routes/standard.tsx`
- `src/routes/faq.tsx`
- `src/routes/bridal.tsx`
- `src/routes/contact.tsx`
- `src/routes/services.tsx`
- `src/routes/careers.tsx`

## Verification
- Run the project typecheck.
- Capture and inspect every listed page at 393px, 768px, and 1280px.
- Confirm 393px is visually unchanged, 768px retains the compact header, 1024px+ shows inline navigation, body lines remain readable, image crops are intentional, hero copy stays within 55%, section rhythm is consistent, and the footer becomes 1/2/3 columns at the specified breakpoints.
