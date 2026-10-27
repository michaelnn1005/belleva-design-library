import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { NailsHeroA } from "@/components/lab/NailsHeroA";
import { NailsHeroB } from "@/components/lab/NailsHeroB";

// Experimental: not linked from the menu and kept out of search engines.
// Compare the two 3D hero concepts with ?v=a / ?v=b (or the switch at the bottom).
type Search = { v: "a" | "b" };

export const Route = createFileRoute("/lab/nails-hero")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    v: search["v"] === "b" ? "b" : "a",
  }),
  head: () => ({
    meta: [
      { title: "Lab · 3D nail hero · Belleva Nails" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: NailsHeroLab,
});

function NailsHeroLab() {
  const { v } = Route.useSearch();

  return (
    <div className="min-h-screen bg-background">
      {/* Version A sits on dark forest (light header); B on cream (dark header). */}
      <SiteHeader heroPassed={v === "b"} />
      {v === "a" ? <NailsHeroA key="a" /> : <NailsHeroB key="b" />}

      <nav
        aria-label="Compare hero versions"
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-forest/15 bg-background/95 p-1 text-[12px] shadow-sm backdrop-blur"
      >
        <span className="whitespace-nowrap px-3 uppercase tracking-[0.14em] text-gold">Lab</span>
        {(["a", "b"] as const).map((id) => (
          <Link
            key={id}
            to="/lab/nails-hero"
            search={{ v: id }}
            aria-current={v === id ? "page" : undefined}
            className={`whitespace-nowrap rounded-full px-4 py-2 transition-colors ${
              v === id ? "bg-forest text-cream" : "text-forest hover:bg-cream"
            }`}
          >
            Version {id.toUpperCase()}
          </Link>
        ))}
      </nav>
    </div>
  );
}
