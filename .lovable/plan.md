# Belleva Nails — /standard About page

Create a new `/standard` route as the About page, using the same design system, header, footer, and sticky bottom bar as the home page. Add a "Standard" nav link that routes here.

## What gets built

1. **Shared chrome extraction**
   - Move the sticky header, footer, and sticky mobile bottom bar from `src/routes/index.tsx` into reusable components under `src/components/` (e.g. `SiteHeader`, `SiteFooter`, `StickyBottomBar`).
   - Import them back into `src/routes/index.tsx` so the home page looks identical.

2. **Header navigation update**
   - Add a "Standard" text link beside the BELLEVA wordmark on desktop.
   - On mobile, collapse the links into a hamburger menu that reveals Home and Standard.
   - Keep the existing "Book" pill button on the right.
   - The "Standard" link uses TanStack `<Link to="/standard">`.

3. **New `/standard` route**
   - Create `src/routes/standard.tsx`.
   - `head()` with Belleva-specific title, description, og:title, og:description, og:type, twitter:card.
   - Render the shared header, footer, and sticky bottom bar.
   - Four sections, mobile-first:

### Section 1 — OPENING (off-white #FAF8F5)
- Eyebrow: "THE BELLEVA STANDARD" (Inter 10–11px, uppercase, tracking 2px, gold #8A7340)
- H1: "A nail salon that keeps its word." (Cormorant Garamond 500)
- Body (Inter, forest green #2F4A3E): "Belleva Nails is a salon in Denton, Texas. We build sets that are meant to be worn, not babied — and we put our name on how long they last."

### Section 2 — GUARANTEE (forest green #2F4A3E block, cream text)
- Eyebrow: "14-DAY GUARANTEE"
- H2: "14 days. In writing." — Cormorant with `font-variant-numeric: lining-nums` so "14" renders correctly.
- Body (cream): "If anything lifts, chips or breaks within 14 days of your appointment, come back and we fix it — free. The industry standard is 7 — we doubled it, because our work can take it."
- Decorative watermark: number "14" in Cormorant ~180px mobile / ~260px desktop, cream at 7% opacity, positioned top-right behind text, clipped at the right edge — same treatment as the home page Standard section.

### Section 3 — HYGIENE (off-white)
- Eyebrow: "HYGIENE"
- H2: "What clean means here."
- Three lines, each preceded by a thin 1px gold (#8A7340) horizontal rule:
  - "Tools sterilized between every client"
  - "Single-use files and buffers, every visit"
  - "Fresh liners for every pedicure"

### Section 4 — CTA (cream #F5F0E8)
- Cormorant italic line: "Come see it for yourself."
- Green pill button "Book an appointment" → `https://bellevanail.com/booking`
- Small line below (Inter 12px): "Tell us your occasion in the Note box — we'll take care of it."

4. **Scroll animations**
   - Reuse the existing `useFadeIn` pattern but extend it to fade + rise 12px (`translate-y-3` → `translate-y-0`).
   - Each section and major block animates once when ~20–30% visible.
   - Respect `prefers-reduced-motion: reduce` by disabling transforms/transitions.

5. **Global copy consistency**
   - Replace the remaining "studio" in the home page meta description with "salon" so the brand word is consistent everywhere.

## Verification
- Build passes and route tree regenerates.
- Clicking "Standard" in the header navigates to `/standard`.
- `/standard` renders the four sections in order with correct colors and typography.
- Mobile viewport shows hamburger nav and sticky bottom bar.
