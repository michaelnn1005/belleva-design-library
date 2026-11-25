// Checks that every address Google knows still works on a site, and that each page is set up
// for Google (title, canonical, business data). Run it on the test copy before switching the
// domain, and on bellevanail.com right after:
//
//   cd scripts && bun check-urls.ts https://bellevanail.com
//   cd scripts && bun check-urls.ts http://localhost:8080
//
// Exit code 1 if anything fails.

const base = (process.argv[2] ?? "https://bellevanail.com").replace(/\/$/, "");
const CANON = "https://bellevanail.com";

/** [address to request, page it must end on] */
const OLD: [string, string][] = [
  ["/", "/"],
  ["/about/", "/standard"],
  ["/about", "/standard"],
  ["/blog/", "/"],
  ["/booking/", "/booking"],
  ["/booking", "/booking"],
  ["/contact/", "/contact"],
  ["/services/", "/services"],
  ["/visit/", "/contact"],
  ["/blog/gel-x-vs-builder-gel-perfect-match-for-your-nail-goals/", "/"],
  ["/about.html", "/standard"],
  ["/feed/", "/"],
  ["/wp-sitemap.xml", "/sitemap.xml"],
  ["/booking/?utm_source=instagram&utm_medium=social", "/booking"],
];

const PAGES = ["/", "/services", "/booking", "/bridal", "/contact", "/standard", "/faq", "/careers"];

let failed = 0;
const ok = (good: boolean, line: string) => {
  if (!good) failed++;
  console.log(`${good ? "✓" : "✗"} ${line}`);
};

async function follow(url: string) {
  const hops: string[] = [];
  let res: Response | undefined;
  for (let i = 0; i < 6; i++) {
    res = await fetch(url, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 belleva-url-check" } });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      hops.push(String(res.status));
      url = new URL(res.headers.get("location")!, url).toString();
      continue;
    }
    break;
  }
  return { url, status: res!.status, hops, res: res! };
}

console.log(`\nOld addresses on ${base}`);
for (const [from, to] of OLD) {
  const r = await follow(base + from);
  const finalPath = new URL(r.url).pathname;
  const keepsQuery = !from.includes("?") || new URL(r.url).search.includes("utm_source=instagram");
  const permanent = r.hops.every((h) => h === "301" || h === "308");
  ok(
    r.status === 200 && finalPath === to && keepsQuery && permanent && r.hops.length <= 2,
    `${from} → ${finalPath} (${[...r.hops, r.status].join(" → ")})`,
  );
}

console.log(`\nPages`);
for (const p of PAGES) {
  const r = await follow(base + p);
  const html = r.status === 200 ? await r.res.text() : "";
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1] ?? "";
  const schema = html.includes('"@type":"NailSalon"');
  const noindexHeader = r.res.headers.get("x-robots-tag") ?? "";
  ok(
    r.status === 200 && r.hops.length === 0 && !!title && canonical === CANON + p && schema,
    `${p} ${r.status}  "${title}"  canonical=${canonical || "missing"}${schema ? "" : "  (no business data)"}${noindexHeader ? `  [${noindexHeader}]` : ""}`,
  );
}

console.log(`\nSitemap and robots`);
{
  const r = await follow(base + "/sitemap.xml");
  const xml = r.status === 200 ? await r.res.text() : "";
  const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  ok(PAGES.every((p) => locs.includes(CANON + p)), `/sitemap.xml lists ${locs.length} pages`);
  const robots = await (await fetch(base + "/robots.txt")).text();
  ok(robots.includes(`Sitemap: ${CANON}/sitemap.xml`), "/robots.txt points to the sitemap");
}

if (base === CANON) {
  console.log(`\nDomain variants`);
  for (const v of ["http://bellevanail.com/", "https://www.bellevanail.com/", "http://www.bellevanail.com/services/"]) {
    const r = await follow(v);
    ok(r.status === 200 && new URL(r.url).origin === CANON, `${v} → ${r.url}`);
  }
}

console.log(failed ? `\n${failed} problem(s) found.` : "\nAll good.");
process.exit(failed ? 1 : 0);
