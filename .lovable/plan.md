# Add previous/next arrow controls to the Nails slideshow

## Goal
Make the SERVICES section slideshow manually browsable with minimal line chevron buttons on each side of the image.

## Changes

In `src/routes/index.tsx`, inside the `NailsSlideshow` component:

1. Add left/right chevron buttons inside the slideshow frame.
   - Positioned absolutely, vertically centered, ~16px from the left/right edges.
   - Visible chevron: thin line chevrons (`‹` / `›`), ~28px tall, cream #F5F0E8, stroke ~1.5px.
   - Opacity 70% at rest, 100% on active/press (`active:` state).
   - No circular backgrounds, no fills, no shadows.
   - Invisible tap target: at least 44x44px around each chevron.

2. Behavior:
   - Left chevron goes to the previous slide; right chevron goes to the next slide.
   - Use the existing 1.2s crossfade transition.
   - Reset the 5-second auto-advance timer on manual navigation so the next auto-change does not fire immediately after a tap.

3. Keep unchanged:
   - 5-second auto-advance, looping, crossfade.
   - Pause on touch.
   - Swipe left/right.
   - Gold dot indicators below.
   - Reduced-motion fallback.
   - 4:5 portrait frame and rounded corners.

## Untouched

- "Nails" title, service list, description.
- The three service index rows.
- All other sections.
