# /standard Founder Note Restructure

## Goal
Restructure the "A NOTE FROM THE FOUNDER" section on `/standard` so the notebook photo becomes a standalone closing image band and the broken signature placeholder is removed.

## Tasks

1. **Remove broken signature placeholder**
   - Replace the `<img>` inside the signature area with an empty spacer `<div>` 48px tall.
   - Keep the short gold horizontal rule and "Michael — Founder, Belleva Nails" line unchanged.

2. **Move the notebook photo below all content**
   - Change the section background from the photo to flat forest green `#2F4A3E`.
   - Keep all text, the signature area, the "Book an appointment" button, and the "Write your occasion in the Note..." line on the flat forest green background.
   - Add the notebook photo as a full-width closing image band at the very bottom of the section, after all content.
   - Image band height: ~320px desktop, ~240px mobile.
   - `object-fit: cover`, `border-radius: 0`, no shadows.
   - Apply a forest green `#2F4A3E` overlay at 35–40% opacity so it matches the hero treatment.
   - No text, buttons, or other elements on top of the image band.

## Verification
- Run TypeScript typecheck.
- Open `/standard` on mobile and desktop to confirm the signature spacer is 48px, the photo sits below all content, and no text overlaps the image.
