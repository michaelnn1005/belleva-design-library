# /standard page detail fixes

## Goal
Apply three polish fixes to `src/routes/standard.tsx` without changing any other copy or structure.

## Tasks

1. **Lining numerals on index numbers**
   - Add `font-variant-numeric: lining-nums` (via Tailwind `lining-nums`) to all index numerals:
     - "Your appointment" steps `01`–`05`.
     - "What we don't do" items `01`–`06`.
   - Keep existing sizing, color, and spacing unchanged.

2. **Typographic quotes across the page**
   - Replace straight quotes (`'` and `"`) with curly typographic equivalents (`'`, `'`, `"`, `"`) everywhere in `src/routes/standard.tsx`.
   - Include the four quoted questions in "Things you're allowed to ask" and any contractions (e.g., "don't" → "don't", "isn't" → "isn't", "we're" → "we're").
   - Preserve JSX escaping where needed.

3. **Terminology and brand spelling audit**
   - Confirm every instance of the business type says "salon", never "studio".
   - Confirm the brand is spelled "Belleva" everywhere (not "Belleleva" or other variants).
   - Fix any misspellings found.

## Verification
- Run TypeScript typecheck.
- Open `/standard` on mobile and desktop to confirm numerals render as lining figures, quotes are curly, and no terminology issues remain.
