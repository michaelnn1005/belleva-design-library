# Nails slideshow in the SERVICES section

Turn the single flagship Nails photo into a slow, calm auto-playing slideshow using the 5 uploaded nail photos, with the text overlays removed.

## Images

- Clean all 5 uploaded photos (Scarlet Stars, Crimson Orbit, Polished Charm, Sculpted Elegance, Linen Bloom) so no titles, taglines, gold rules or bellevanail.com URLs remain — just the nails.
- Upload the cleaned files as CDN assets and use them as the slides.
- The request mentions 4 slides; since 5 photos were provided, the slideshow will run 5 slides with 5 dots. Say the word if you'd rather drop one.
- Note: the photos are portrait, so a 3:2 frame crops them tightly. The crop will be centered on the nails/hands.

## Slideshow behaviour

- Same frame as today: 3:2 ratio, 10px rounded corners, full content width.
- Auto-advance every 5s, looping infinitely.
- Crossfade only — 1.2s ease-in-out opacity, stacked absolutely so there is no layout shift. No sliding, zoom or bounce.
- Auto-advance pauses while a finger is on the image, resumes on release.
- Swipe left/right on the image changes slides.
- Dots: centered ~12px below the image, ~6px diameter, ~10px gap, active matte gold #8A7340, inactive #CFC8BA. Tapping a dot crossfades to that slide.
- No arrows, no play/pause, no captions.
- Reduced motion: first image shows statically, no auto-advance, dots still switch images instantly.

## Untouched

The "Nails" title, service list line, description, the 01/02/03 index rows, and every other section stay exactly as they are.

## Technical notes

- New `NailsSlideshow` component in `src/routes/index.tsx` (local state + `setInterval`, cleared on unmount, touch handlers for pause/swipe, `prefers-reduced-motion` media query check).
- Cleaned images become `.asset.json` pointers in `src/assets/` and are imported like the existing ones.
