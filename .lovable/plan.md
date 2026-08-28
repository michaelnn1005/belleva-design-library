# Replace Belleva Bridal placeholder with cleaned uploaded image

## Goal
Swap the generated bridal placeholder image in the Belleva Bridal section with the uploaded nail-design photo, with all on-image text overlays removed first.

## Steps

1. **Clean the uploaded image**
   - Use `imagegen--edit_image` on `user-uploads://ChatGPT_Image_Jun_29_2026_04_25_06_PM.png` to remove the text overlays ("DETAIL EDIT", "Star Curve", descriptors, "bellevanail.com") while preserving the nail design, hand, rings, and fabric background.
   - Save the cleaned image to a temporary path first.

2. **Create a Lovable Asset pointer**
   - Run `lovable-assets create --file <cleaned-image> --filename bridal-nails.png` and write the output to `src/assets/bridal-nails.png.asset.json`.

3. **Update the bridal section in `src/routes/index.tsx`**
   - Replace `import bridalNails from "@/assets/bridal-nails.jpg";` with an import of the new asset pointer.
   - Use the asset's `.url` as the `src` for the bridal section image.

4. **Remove the old placeholder**
   - Delete `src/assets/bridal-nails.jpg` (the generated placeholder) once it is no longer referenced.

5. **Verify**
   - Take a mobile Playwright screenshot of the Belleva Bridal section to confirm the cleaned image renders correctly in the 4:5 crop and that no text overlays remain.
