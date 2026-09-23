# Desktop header navigation (>= 1024px)

## Goal
Restyle and reposition the desktop inline navigation in `src/components/SiteHeader.tsx` only. Mobile (below 1024px) stays exactly as it is: hamburger + full-screen menu unchanged.

## Current state
- Inline nav already renders from 1024px (`lg:flex`) and the hamburger is already hidden at 1024px (`lg:hidden`), but links use 12px uppercase gold-highlight styling and sit centered between logo and Book.

## Changes (header file only)

1. Structure — right-side group
   - Wrap the nav and the existing "menu button + Book" group in one right-aligned flex container; the outer `justify-between` keeps the logo left and this group right.
   - Nav sits before the Book button, 40px gap to the Book button group, vertically centered throughout.

2. Nav links
   - Five links: Services, Standard, Bridal, FAQ, Contact — same routes as today.
   - Typography: Inter (font-body), 15px, weight 400, letter-spacing 0.02em.
   - Spacing: 36px between links, no separator characters.
   - Color: same rule as the logo — off-white over the hero (transparent header), forest when scrolled/light background. Active page no longer switches to gold; color stays identical to the logo.

3. Underline behavior
   - Hover: 1px underline, 6px offset, in the link's own color (`decoration-1 underline-offset-[6px]`).
   - Current page: underline always visible (same 1px/6px spec).
   - Non-hovered, non-current links: no underline.

4. Book button
   - Existing outline pill stays unchanged (styling and behavior).

5. No Careers link, no icons, shadows, or gradients.

## Files in scope
- `src/components/SiteHeader.tsx` — the only file edited.

## Verification
- Typecheck.
- Playwright at 1280px: hamburger absent, inline nav right-aligned before Book, underline appears on hover and is permanent on the current page; logo/Book vertically centered with links.
- Playwright at 393px and 768px: hamburger and full-screen menu unchanged.
