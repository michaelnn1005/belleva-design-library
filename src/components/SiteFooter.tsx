import { BOOKING_URL } from "@/lib/designs";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E5DFD3] bg-background px-6 pt-20 pb-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-xl tracking-[0.3em] text-forest">BELLEVA</p>

        <div className="mt-10 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=2200%20W%20University%20Dr%2C%20Ste%20180%2C%20Denton%2C%20TX%2076201"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-colors hover:text-forest"
          >
            2200 W University Dr, Ste 180, Denton, TX 76201
          </a>
          <a href="tel:+19405141808" className="block transition-colors hover:text-forest">
            (940) 514-1808
          </a>
          <p>Mon-Fri 9:30-7:30 · Sat 9-7 · Sun 11-5</p>
        </div>

        <div className="mt-10">
          <p className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] uppercase tracking-[1px] text-forest/60">
            <span className="whitespace-nowrap">
              <a href="https://instagram.com/bellevanailsdenton" className="transition-colors hover:text-forest">Instagram</a>
              <span className="mx-1 text-gold">·</span>
            </span>
            <span className="whitespace-nowrap">
              <a href="#" className="transition-colors hover:text-forest">TikTok</a>
              <span className="mx-1 text-gold">·</span>
            </span>
            <span className="whitespace-nowrap">
              <a href="#" className="transition-colors hover:text-forest">Pinterest</a>
              <span className="mx-1 text-gold">·</span>
            </span>
            <span className="whitespace-nowrap">
              <a href="#" className="transition-colors hover:text-forest">Facebook</a>
              <span className="mx-1 text-gold">·</span>
            </span>
            <span className="whitespace-nowrap">
              <a href="#" className="transition-colors hover:text-forest">YouTube</a>
            </span>
          </p>
        </div>

        <div id="contact" className="mt-12">
          <p className="text-[10px] uppercase tracking-[2px] text-gold">Write to us</p>
          <form className="mt-5 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Name"
              className="w-full border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
            />
            <textarea
              rows={3}
              placeholder="Message"
              className="w-full resize-none border-0 border-b border-[#CFC8BA] bg-transparent py-3 text-[14px] text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="mt-4 inline-flex items-center rounded-full border border-gold bg-transparent px-7 py-3.5 text-[14px] text-forest transition-all duration-300 hover:bg-forest hover:text-cream active:bg-forest active:text-cream"
            >
              Send
            </button>
          </form>
          <p className="mt-3 text-[10px] italic text-muted-foreground">Demo form — not yet connected.</p>
        </div>

        <div className="mt-12">
          <a
            href={BOOKING_URL}
            className="inline-flex w-fit rounded-full bg-forest px-8 py-3 text-sm text-cream transition-colors hover:bg-forest-soft"
          >
            Book an appointment
          </a>
          <p className="mt-3 max-w-[260px] text-[11px] leading-relaxed text-muted-foreground">
            Tell us your occasion in the Note box — we will take care of the rest.
          </p>
        </div>
      </div>
    </footer>
  );
}
