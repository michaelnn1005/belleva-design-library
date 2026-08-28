# SERVICE Filter Chip Row Fix

## Current state
- `src/lib/designs.ts` already defines `SERVICE_FILTERS` as exactly `["Gel-X", "Builder gel", "Dipping", "Acrylic"]`.
- `src/routes/index.tsx` already renders only `SERVICE_FILTERS` and uses compact sizing: `px-[14px]`, `text-[14px]`, `gap-2`.
- A mobile screenshot of the live preview shows the SERVICE row contains only those 4 chips and fits within the viewport.

## What this plan will do
1. Audit `src/lib/designs.ts` and `src/routes/index.tsx` for any stray/hardcoded SERVICE chips (e.g., Regular gel, Pedicure, Waxing, Lashes, French, Chrome, Minimal) and remove them if found.
2. Confirm `SERVICE_FILTERS` has exactly 4 entries in the stated order.
3. Confirm the SERVICE row uses the compact chip sizing and styling: active = `bg-forest text-cream`, inactive = `border-hairline`.
4. Apply the same compact sizing to the OCCASION row while keeping its 5 chips unchanged.
5. Verify each remaining chip still filters the design grid correctly by checking `matchesFilter` coverage for Gel-X, Builder gel, Dipping, and Acrylic.
6. Run a build check and capture a mobile screenshot to confirm no horizontal scrolling in the SERVICE row.

## Out of scope
- No changes to the design grid cards.
- No changes to the SERVICES text section below the grid.
- No changes to any other section.