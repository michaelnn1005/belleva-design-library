// Adds new nail photos to the home lookbook (desktop hero) in one go.
//
//   1. Drop photos into /anh-nails-moi at the repo root. Name each file after the set,
//      e.g. "Pearl Glaze.jpg" -> shown as "Pearl Glaze". JPG, PNG, WebP and iPhone HEIC work.
//   2. cd scripts && bun add-nails.ts          (add --dry to preview into anh-nails-moi/.dry/ only)
//
// For each photo it: turns it upright (EXIF), trims plain borders, keeps the WHOLE
// picture (no cropping; the hero tile takes the photo's own proportions), saves it as
// scripts/originals/gallery-NN-<slug>.webp, regenerates the responsive variants, and
// appends it to src/lib/nail-sets.ts. Processed files move to anh-nails-moi/da-them/.
// The hero balances its three columns by photo height automatically.
import sharp from "sharp";
import { readdirSync, mkdirSync, renameSync, readFileSync, writeFileSync, rmSync } from "fs";

const ROOT = `${import.meta.dir}/..`;
const DROP = `${ROOT}/anh-nails-moi`;
const DONE = `${DROP}/da-them`;
const ORIGINALS = `${import.meta.dir}/originals`;
const SETS = `${ROOT}/src/lib/nail-sets.ts`;
const MARKER = "  // add-nails.ts: new sets go above this line";
const LONG_SIDE = 2000; // plenty for a ~360px tile at 2x, still sharp if reused larger
const MIN_LONG_SIDE = 900; // warn below this: it will look soft
const DRY = process.argv.includes("--dry");

mkdirSync(DROP, { recursive: true });
mkdirSync(DONE, { recursive: true });
if (DRY) mkdirSync(`${DROP}/.dry`, { recursive: true });

const files = readdirSync(DROP).filter((f) => /\.(jpe?g|png|webp|heic|heif)$/i.test(f)).sort();
if (!files.length) {
  console.log(`No photos in ${DROP}. Drop some in and run again.`);
  process.exit(0);
}

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "set";
const displayName = (s: string) => s.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();

let next = Math.max(0, ...readdirSync(ORIGINALS).map((f) => Number(/^gallery-(\d+)-/.exec(f)?.[1] ?? 0))) + 1;
const added: { key: string; name: string; w: number; h: number }[] = [];

for (const file of files) {
  const base = file.replace(/\.[^.]+$/, "");
  let input = `${DROP}/${file}`;
  // sharp's prebuilt binary can't decode HEIC; macOS sips can.
  if (/\.hei[cf]$/i.test(file)) {
    const tmp = `${DROP}/.${base}.jpg`;
    Bun.spawnSync(["sips", "-s", "format", "jpeg", input, "--out", tmp]);
    input = tmp;
  }
  const upright = await sharp(input).rotate().toBuffer();
  // Trim only plain borders (white frames, flat backgrounds touching every edge);
  // fall back to the full photo if trimming would eat into it.
  let img = upright;
  try {
    const t = await sharp(upright).trim({ threshold: 14 }).toBuffer({ resolveWithObject: true });
    const o = await sharp(upright).metadata();
    if (t.info.width * t.info.height > 0.2 * o.width! * o.height!) img = t.data;
  } catch {}
  const key = `gallery-${String(next).padStart(2, "0")}-${slugify(base)}`;
  const out = await sharp(img)
    .resize({ width: LONG_SIDE, height: LONG_SIDE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(DRY ? `${DROP}/.dry/${key}.webp` : `${ORIGINALS}/${key}.webp`);
  if (Math.max(out.width, out.height) < MIN_LONG_SIDE) console.warn(`! ${file}: only ${out.width}x${out.height}, will look soft`);
  added.push({ key, name: displayName(base), w: out.width, h: out.height });
  if (input !== `${DROP}/${file}`) rmSync(input);
  if (!DRY) renameSync(`${DROP}/${file}`, `${DONE}/${file}`);
  next++;
}

if (DRY) {
  for (const a of added) console.log(`(dry) ${a.name}: ${a.key} ${a.w}x${a.h}`);
  process.exit(0);
}
console.log("Regenerating image variants...");
const r = Bun.spawnSync([process.execPath, "optimize-images.ts"], { cwd: import.meta.dir, stdout: "inherit", stderr: "inherit" });
if (r.exitCode !== 0) throw new Error("optimize-images.ts failed");

let sets = readFileSync(SETS, "utf8");
if (!sets.includes(MARKER)) throw new Error(`marker not found in ${SETS}`);
const lines = added
  .map((a) => `  {\n    key: "${a.key}",\n    image: IMAGES["${a.key}"],\n    name: ${JSON.stringify(a.name)},\n  },\n`)
  .join("");
sets = sets.replace(MARKER, lines + MARKER);
writeFileSync(SETS, sets);

for (const a of added) {
  const shape = a.h / a.w > 1.15 ? "portrait" : a.w / a.h > 1.15 ? "landscape" : "square";
  console.log(`+ ${a.name}  (${a.key}, ${a.w}x${a.h}, ${shape}, shown whole)`);
}
console.log(`Added ${added.length} set(s) to src/lib/nail-sets.ts.`);
