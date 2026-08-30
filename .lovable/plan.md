# Belleva Bridal benefit list restyle

## Goal
Restyle the four benefit lines in the homepage "Belleva Bridal" section while leaving every other element untouched.

## Changes
- File: `src/routes/index.tsx`
- Target: the benefit list inside the `#bridal` section (currently four `<p>` elements with gold em-dashes).

### New structure
Replace the four em-dash lines with a vertical stack of four labeled items, using a `flex flex-col gap-6` container.

Each item:
- Label: Inter uppercase, 11px, letter-spacing `0.14em`, matte gold `#8A7340`.
- Text: Inter 17px, forest green `#2F4A3E`, line-height 1.5, `margin-top: 6px`.

### Copy mapping
| Label            | Text                                        |
|------------------|---------------------------------------------|
| THE TRIAL        | A trial set to lock in your exact design.   |
| THE WEDDING SET  | The same look, recreated before the wedding.|
| THE CARE KIT     | A small kit to take home.                   |
| THE GUARANTEE    | A set guaranteed through your big day.      |

## What stays the same
- Section label `BELLEVA BRIDAL`
- Heading "Joining costs nothing. You just get more."
- Intro paragraph
- "Join the bridal program" pill button
- Line under the button ("Free to join — tell us your wedding date in the Note box.")
- All surrounding sections and global styles

## Verification
- Preview the homepage on mobile and confirm the four items render with the new typography and 24px gap, no dashes/bullets/icons.
- Confirm no other section changed.