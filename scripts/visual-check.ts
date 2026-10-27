// Visual regression check for phone and tablet layouts.
//
// Renders every page at phone/tablet widths from two versions of the site and
// compares them pixel by pixel, so desktop-only changes can be proven not to
// touch mobile or tablet.
//
//   cd scripts && bun install
//   bun visual-check.ts [base-ref]        # default base: origin/main
//
// "current" is the working tree, served by the dev server on :8080
// (start it with `bun run dev --port 8080`). "base" is checked out into a
// temporary git worktree and served on :8091. Needs Google Chrome installed.
// Differences are written to scripts/.visual-check/ as side-by-side PNGs.
import sharp from "sharp";
import { spawn } from "bun";
import { mkdirSync, rmSync, existsSync } from "fs";
import { tmpdir } from "os";

const ROOT = `${import.meta.dir}/..`;
const OUT = `${import.meta.dir}/.visual-check`;
const BASE_REF = process.argv[2] ?? "origin/main";
const CURRENT_URL = "http://localhost:8080";
const BASE_PORT = 8091;
const BASE_URL = `http://localhost:${BASE_PORT}`;
const PAGES = ["/", "/standard", "/services", "/bridal", "/faq", "/contact", "/careers"];
// Everything below Tailwind's lg breakpoint (1024px), where the desktop layout starts.
const VIEWPORTS = [
  { w: 375, h: 812, mobile: true },
  { w: 390, h: 844, mobile: true },
  { w: 430, h: 932, mobile: true },
  { w: 768, h: 1024, mobile: true },
  { w: 834, h: 1194, mobile: true },
  { w: 1000, h: 1300, mobile: true },
];
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const sh = (cmd: string[], cwd = ROOT) => {
  const r = Bun.spawnSync(cmd, { cwd, stdout: "pipe", stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`${cmd.join(" ")}\n${r.stderr.toString()}`);
  return r.stdout.toString().trim();
};

async function waitFor(url: string, seconds = 90) {
  for (let i = 0; i < seconds * 2; i++) {
    try { if ((await fetch(url)).ok) return; } catch {}
    await Bun.sleep(500);
  }
  throw new Error(`timed out waiting for ${url}`);
}

// ---- base version in a throwaway worktree ----
const baseSha = sh(["git", "rev-parse", "--short", BASE_REF]);
const headSha = sh(["git", "rev-parse", "--short", "HEAD"]);
const wt = `${tmpdir()}/belleva-visual-base-${baseSha}`;
if (!existsSync(wt)) sh(["git", "worktree", "add", "--detach", wt, BASE_REF]);
sh([process.execPath, "install", "--frozen-lockfile"], wt);
const baseServer = spawn([process.execPath, "run", "dev", "--port", String(BASE_PORT), "--strictPort"], {
  cwd: wt, stdout: "ignore", stderr: "ignore", env: { ...process.env, BELLEVA_LOCAL: "1" },
});
await waitFor(CURRENT_URL);
await waitFor(BASE_URL);

// ---- minimal CDP client ----
async function openChrome(port: number) {
  const proc = spawn([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
    `--remote-debugging-port=${port}`, `--user-data-dir=${tmpdir()}/belleva-visual-chrome-${port}`, "about:blank"],
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
  const listeners: ((e: any) => void)[] = [];
  ws.onmessage = (m) => {
    const msg = JSON.parse(String(m.data));
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)!(msg.result ?? msg.error); pending.delete(msg.id); }
    else if (msg.method) listeners.forEach((f) => f(msg));
  };
  const send = (method: string, params: any = {}) =>
    new Promise<any>((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async (expression: string) =>
    (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.value;
  await send("Page.enable");
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  return {
    async shoot(url: string, vp: (typeof VIEWPORTS)[number]) {
      await send("Emulation.setDeviceMetricsOverride", { width: vp.w, height: vp.h, deviceScaleFactor: 1, mobile: vp.mobile });
      const loaded = new Promise<void>((r) => listeners.push((e) => e.method === "Page.loadEventFired" && r()));
      await send("Page.navigate", { url });
      await loaded;
      listeners.length = 0;
      // Freeze anything time-based (marquee, transitions) so both versions render identically.
      // Embedded third-party content (the Google map) is hidden: its tiles change between loads,
      // but its frame still takes up space, so layout shifts are still caught.
      await evaluate(`(() => { const s = document.createElement('style');
        s.textContent = '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}iframe{visibility:hidden!important}';
        document.head.appendChild(s); })()`);
      await Bun.sleep(1200);
      const docH: number = await evaluate("document.documentElement.scrollHeight");
      const shots: Buffer[] = [];
      for (let y = 0; y < docH; y += vp.h) {
        await evaluate(`(async () => {
          window.scrollTo({ top: ${y}, behavior: 'instant' });
          await new Promise(r => setTimeout(r, 250));
          await Promise.all([...document.images].filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000); })));
          await document.fonts.ready;
          await new Promise(r => setTimeout(r, 250));
        })()`);
        const shot = await send("Page.captureScreenshot", { format: "png" });
        shots.push(Buffer.from(shot.data, "base64"));
      }
      return { docH, shots };
    },
    close() { ws.close(); proc.kill(); },
  };
}

async function diff(a: Buffer, b: Buffer) {
  const [ra, rb] = await Promise.all([a, b].map((x) => sharp(x).raw().ensureAlpha().toBuffer({ resolveWithObject: true })));
  if (ra.info.width !== rb.info.width || ra.info.height !== rb.info.height) return Infinity;
  let changed = 0;
  for (let i = 0; i < ra.data.length; i += 4) {
    if (Math.abs(ra.data[i] - rb.data[i]) > 8 || Math.abs(ra.data[i + 1] - rb.data[i + 1]) > 8 || Math.abs(ra.data[i + 2] - rb.data[i + 2]) > 8) changed++;
  }
  return changed;
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const [cur, base] = await Promise.all([openChrome(9601), openChrome(9602)]);
const problems: string[] = [];
console.log(`Comparing working tree (${headSha}+local edits) against ${BASE_REF} (${baseSha}) below 1024px\n`);
try {
  for (const vp of VIEWPORTS) {
    for (const page of PAGES) {
      const [c, b] = await Promise.all([cur.shoot(CURRENT_URL + page, vp), base.shoot(BASE_URL + page, vp)]);
      let line = `${String(vp.w).padStart(4)}px ${page.padEnd(10)} `;
      if (c.docH !== b.docH) {
        line += `DIFFERENT page height (${b.docH} -> ${c.docH})`;
        problems.push(line);
      }
      let worst = 0;
      for (let i = 0; i < Math.min(c.shots.length, b.shots.length); i++) {
        const n = await diff(c.shots[i], b.shots[i]);
        if (n > 0) {
          worst = Math.max(worst, n);
          const name = `${OUT}/${vp.w}${page.replace(/\//g, "_") || "_home"}-${i}.png`;
          const before = await sharp(b.shots[i]).toBuffer();
          await sharp({ create: { width: vp.w * 2 + 12, height: vp.h, channels: 3, background: "#ff00ff" } })
            .composite([{ input: before, left: 0, top: 0 }, { input: c.shots[i], left: vp.w + 12, top: 0 }])
            .png().toFile(name);
        }
      }
      if (worst > 0 && c.docH === b.docH) problems.push(line + `pixels changed (worst segment: ${worst}px)`);
      console.log(line + (c.docH !== b.docH || worst > 0 ? "CHANGED" : "identical"));
    }
  }
} finally {
  cur.close();
  base.close();
  baseServer.kill();
}

console.log(problems.length
  ? `\n${problems.length} phone/tablet differences — before|after images in scripts/.visual-check/`
  : `\nAll phone and tablet layouts are pixel-identical to ${BASE_REF}.`);
process.exit(problems.length ? 1 : 0);
