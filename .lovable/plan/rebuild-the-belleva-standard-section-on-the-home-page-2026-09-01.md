# Rebuild "The Belleva Standard" section on the home page

## Goal
Replace the interior content of the homepage's forest-green "THE BELLEVA STANDARD" section while preserving its shell, watermark, and final Google Maps line.

## What stays
- Forest green background (`bg-forest`).
- Gold eyebrow label "THE BELLEVA STANDARD".
- Large "14" watermark: Cormorant ~180px / 260px desktop, cream at 7% opacity, top-right, clipped.
- Closing line: "Find Belleva Nails on Google Maps." in gold.

## What is removed
- Old H2: "The industry standard is a 7-day guarantee. Cute. Ours is 14."
- The "7 DAYS → 14 DAYS" comparison row.
- The guarantee body paragraph.

## New content, in order
1. **H2** — Cormorant Garamond 500, cream:  
   "Things you're allowed to ask here."
2. **Three stacked lines** — Cormorant Garamond 400, ~21px cream. Each line has a thin 1px gold (`#8A7340`) rule above it at 40% opacity. No bullets or icons.
   - "Ask to see the lab reports."
   - "Ask us to open the tool pouch in front of you."
   - "Ask why we chose your tech for you."
3. **Text link** — 28px below the last line. Inter 14px cream, arrow "→" in gold, underlined on hover only. Links to `/standard`:  
   "Most salons hope you never ask. Our whole standard is in writing →"
4. Existing gold "Find Belleva Nails on Google Maps." line remains at the bottom.

## Animation
- Each of the three lines fades in and rises 12px.
- 80ms stagger between lines.
- Triggers once on scroll into view.
- Respects `prefers-reduced-motion`.

## Files to edit
- `src/routes/index.tsx`
