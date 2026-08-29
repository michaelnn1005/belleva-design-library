# Plan: Add sterilization photo to "The tray" section on /standard

## Goal
Replace the empty 3:2 placeholder image under the "The tray" section on `/standard` with the uploaded sterilization/autoclave photo, adjusted to fit the existing 3:2 landscape slot.

## Steps

1. **Reframe the uploaded image to 3:2 landscape**
   - Source: `user-uploads://image-2.png` (1122×1402, portrait).
   - Use `imagegen--edit_image` to crop/reframe it to a 3:2 landscape composition (target 1200×800) that keeps the autoclave, tray, and tools clearly in frame, with a clean editorial look and no text.
   - Save the result to a temporary path (e.g. `/mnt/documents/tray-photo-cropped.png`).

2. **Upload the cropped image to Lovable Assets**
   - Run `lovable-assets create --file /mnt/documents/tray-photo-cropped.png --filename tray-photo.png`.
   - Write the CLI output to `src/assets/tray-photo.png.asset.json`.

3. **Update `src/routes/standard.tsx`**
   - Import the new asset pointer at the top of the route file.
   - Replace the current placeholder `div` inside the 3:2 container under "The tray" with an `<img>`:
     - `src={trayPhotoAsset.url}`
     - `alt="Disinfected tools laid out on a clean tray at Belleva Nails"`
     - `className="h-full w-full object-cover"`
   - Keep the surrounding `aspect-[3/2] w-full bg-cream/8` container and fade animation unchanged.

4. **Verify**
   - Run `bun run build` to confirm no errors.
   - Check the `/standard` preview to ensure the image fills the 3:2 slot without layout shift.

## Notes
- The original photo is portrait (≈4:5), so it will be cropped to landscape as part of the edit rather than squeezed or stretched.
- No other section on `/standard` will be changed.
