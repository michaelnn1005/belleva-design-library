# Replace flagship Nails image with cleaned uploaded design

## What the user wants
1. Remove all text overlays from the uploaded nail-design image: "BELLEVA EDIT", "Verdant Drift", "3D FLOWERS · SWIRL ART · COLOR FADE", and "bellevanail.com".
2. Use the cleaned image as the new photo under the "What we do." heading in the SERVICES section, replacing the current neutral placeholder.

## Current state
- `src/routes/index.tsx` imports `servicesNails` from `src/assets/services-nails.jpg` and renders it as the 3:2 flagship image in the SERVICES section.
- The uploaded image is available at `user-uploads://ChatGPT_Image_Jul_13_2026_04_28_50_PM.png`.

## Plan
1. Edit the uploaded image to remove all text/branding overlays while preserving the nail art and dark fabric background.
2. Create a Lovable Asset from the cleaned image and save the `.asset.json` pointer to `src/assets/services-nails.png.asset.json` (or `.jpg` depending on output).
3. Update `src/routes/index.tsx` to import the new asset pointer and use it in place of `services-nails.jpg`.
4. Delete the old `src/assets/services-nails.jpg` if it is no longer referenced.
5. Run a build and a mobile/desktop screenshot check to confirm the new image appears correctly under "What we do."

## Scope guardrails
- Only the SERVICES flagship image changes.
- No changes to text, layout, other images, or sections.
- Keep the 3:2 aspect ratio and rounded-[10px] treatment.
