// Old bellevanail.com (WordPress) addresses → pages on the new site, so links from Google,
// Instagram, saved bookmarks and printed cards keep working, and the pages' Google ranking
// carries over. Permanent (301) redirects tell Google "this page moved here for good".
//
// The old site's pages, from its sitemap (Nov 2026): / about blog booking contact services visit.
// Test every one with: cd scripts && bun check-urls.ts <site address>

const CANONICAL_HOST = "bellevanail.com";

/** Old path (no trailing slash) → new path. */
export const OLD_PAGES: Record<string, string> = {
  "/about": "/standard",
  "/visit": "/contact",
  "/blog": "/",
  "/home": "/",
  "/apply": "/careers",
  "/index.html": "/",
  "/index.php": "/",
  "/about.html": "/standard",
  "/visit.html": "/contact",
  "/blog.html": "/",
  "/booking.html": "/booking",
  "/services.html": "/services",
  "/contact.html": "/contact",
  // WordPress feeds and sitemaps that Google and readers may still request
  "/feed": "/",
  "/comments/feed": "/",
  "/wp-sitemap.xml": "/sitemap.xml",
  "/wp-sitemap-posts-page-1.xml": "/sitemap.xml",
  "/sitemap_index.xml": "/sitemap.xml",
};

/** Hosts that are copies of the site (tests, Lovable). Google is told not to list them. */
const isCopyHost = (host: string) =>
  /\.lovable\.app$|\.lovableproject\.com$|\.workers\.dev$|\.pages\.dev$/.test(host);

/**
 * The redirect for a request, or null to serve it normally.
 * Query strings (utm_…, fbclid) are kept so ads still get credit.
 */
export function redirectFor(url: URL): string | null {
  let host = url.hostname;
  let path = url.pathname;
  let changed = false;

  if (host === `www.${CANONICAL_HOST}`) {
    host = CANONICAL_HOST;
    changed = true;
  }

  // one address per page: /services/ → /services (files like /sitemap.xml are left alone)
  if (path.length > 1 && path.endsWith("/")) {
    path = path.replace(/\/+$/, "") || "/";
    changed = true;
  }

  const mapped = OLD_PAGES[path.toLowerCase()];
  if (mapped) {
    path = mapped;
    changed = true;
  } else if (/^\/(blog|category|tag|author)\//i.test(path)) {
    // old blog posts no longer exist; send readers home rather than to an error page
    path = "/";
    changed = true;
  }

  if (!changed) return null;
  return `${url.protocol}//${host}${url.port ? `:${url.port}` : ""}${path}${url.search}`;
}

/** Adds "don't list this copy in Google" to responses from test/Lovable addresses. */
export function markCopyHost(url: URL, response: Response): Response {
  if (!isCopyHost(url.hostname)) return response;
  const res = new Response(response.body, response);
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}
