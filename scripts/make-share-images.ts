// Builds the 1200x630 share images in public/share/ (the picture that shows when a page link is
// posted on Facebook, Instagram, iMessage, etc.). Rendered by headless Chrome with the site's own
// fonts and photos, so they match the website.
//
//   cd scripts && bun make-share-images.ts
import { spawn } from "bun";
import { mkdirSync, readFileSync } from "fs";

const OUT = `${import.meta.dir}/../public/share`;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

type Card = {
  name: string;
  photo: string; // file in /public/img
  crop?: [number, number, number]; // poster crop window, as in src/lib/nail-sets.ts
  eyebrow: string;
  title: string; // may contain <i>
  sub: string;
};

const CARDS: Card[] = [
  {
    name: "home",
    photo: "gallery-20-emerald-serpent-1122.webp",
    crop: [1.55, 0.33, 0],
    eyebrow: "Belleva Nails · Denton, TX",
    title: "Find your <i>next</i> set.",
    sub: "Real sets, all made in our Denton salon. Book the design you love.",
  },
  {
    name: "bridal",
    photo: "bridal-step-wedding-1072.webp",
    eyebrow: "Belleva Bridal",
    title: "Your hands are in <i>every</i> photo.",
    sub: "Trial set, wedding set and a guarantee through your big day. Free to join.",
  },
  {
    name: "services",
    photo: "gallery-22-ink-current-1122.webp",
    crop: [1.55, 0.17, 0.29],
    eyebrow: "Belleva Nails · Services",
    title: "Nails, pedicure, waxing <i>&amp;</i> lashes.",
    sub: "Gel-X, builder gel, acrylic and dipping – with real prices up front.",
  },
];

// photos are embedded, since a page written in place cannot load files from the dev server
const photoData = (file: string) =>
  `data:image/webp;base64,${Buffer.from(readFileSync(`${import.meta.dir}/../public/img/${file}`)).toString("base64")}`;

const html = (c: Card) => {
  const [s, l, t] = c.crop ?? [1, 0, 0];
  const ox = c.crop ? (l / (1 - 1 / s)) * 100 : 50;
  const oy = c.crop ? (t / (1 - 1 / s)) * 100 : 50;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Inter:wght@300;400;500&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#f6f2ea;display:flex;font-family:Inter,sans-serif;color:#2e4a3c;overflow:hidden}
.copy{flex:1;padding:72px 64px 60px 72px;display:flex;flex-direction:column}
.logo{font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.42em}
.eyebrow{margin-top:auto;font-size:15px;letter-spacing:.26em;text-transform:uppercase;color:#8a7340}
h1{margin-top:20px;font-family:'Cormorant Garamond',serif;font-weight:500;font-size:74px;line-height:1.02}
h1 i{color:#8a7340}
p{margin-top:24px;font-size:21px;line-height:1.5;font-weight:300;max-width:560px;color:#2e4a3ccc}
.rule{margin-top:34px;width:56px;height:1px;background:#8a7340}
.photo{width:504px;height:630px;overflow:hidden;position:relative}
.photo img{width:100%;height:100%;object-fit:cover;transform:scale(${s});transform-origin:${ox}% ${oy}%}
</style></head><body>
<div class="copy"><div class="logo">BELLEVA</div><div class="eyebrow">${c.eyebrow}</div><h1>${c.title}</h1><p>${c.sub}</p><div class="rule"></div></div>
<div class="photo"><img src="${photoData(c.photo)}"></div>
</body></html>`;
};

mkdirSync(OUT, { recursive: true });
const port = 9335;
const proc = spawn([CHROME, "--headless=new", "--hide-scrollbars", "--no-first-run",
  `--remote-debugging-port=${port}`, `--user-data-dir=/tmp/belleva-share-${port}`, "about:blank"],
  { stdout: "ignore", stderr: "ignore" });
let wsUrl = "";
for (let i = 0; i < 50 && !wsUrl; i++) {
  await Bun.sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    wsUrl = list.find((t: any) => t.type === "page")?.webSocketDebuggerUrl ?? "";
  } catch {}
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map<number, (v: any) => void>();
ws.onmessage = (m) => {
  const d = JSON.parse(String(m.data));
  if (d.id && pending.has(d.id)) { pending.get(d.id)!(d.result ?? d.error); pending.delete(d.id); }
};
const send = (method: string, params: any = {}) =>
  new Promise<any>((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
await send("Page.enable");
for (const c of CARDS) {
  await send("Page.navigate", { url: "about:blank" });
  await Bun.sleep(300);
  const tree = await send("Page.getFrameTree");
  await send("Page.setDocumentContent", { frameId: tree.frameTree.frame.id, html: html(c) });
  await Bun.sleep(3500); // fonts and photo
  const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 86 });
  await Bun.write(`${OUT}/${c.name}.jpg`, Buffer.from(shot.data, "base64"));
  console.log(`public/share/${c.name}.jpg`);
}
proc.kill();
process.exit(0);
