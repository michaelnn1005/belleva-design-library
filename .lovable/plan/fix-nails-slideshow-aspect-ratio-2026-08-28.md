# Fix Nails slideshow aspect ratio

## Goal
Stop the portrait nail photos from being cropped/zoomed inside the landscape 3:2 slideshow frame by switching the frame to 4:5 portrait.

## Change

In `src/routes/index.tsx`, inside the `NailsSlideshow` component:

- Change the slideshow container from `aspect-[3/2]` to `aspect-[4/5]`.
- Keep `rounded-[10px]`, `w-full`, `object-cover`, `object-center`, the 5s auto-advance, the 1.2s crossfade, dot indicators, swipe, and touch-pause exactly as they are.
- The dot row naturally sits below the taller frame.

## Untouched

- "Nails" title, service list, description.
- The three service index rows.
- All other sections.
