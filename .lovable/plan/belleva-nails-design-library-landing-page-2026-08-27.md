# Belleva Nails — design library landing page

A mobile-first single page that works like a lookbook: browse real nail sets, filter them, open one, book it.

## What gets built

**Single route** at `/` (replacing the placeholder), plus a detail modal for each design.

Sections, top to bottom:
1. Sticky minimal header — BELLEVA wordmark left, outlined gold "Book" pill right.
2. Hero — "Find your next set." with the one-line subtitle, heavy whitespace.
3. Filter chip row — horizontally scrollable, 12 chips, single active selection, actually filters the grid.
4. Design grid — 2 columns mobile / 3 desktop, the exact 12 designs with their collection, name, and "Service · from $XX" line. Images are solid placeholder blocks (4:5, 10px radius) rotating through #EAE4D8, #3A5A4A, #E3DACB, #EFEAE0 with a small centered "Photo" label.
5. Design detail modal — larger image, name, service, price, "Book this design" button to https://bellevanail.com/booking, plus the note-box instruction line.
6. The Belleva Standard — full-width forest green band, gold eyebrow, cream Cormorant heading and body, gold Google Maps line.
7. From our clients — cream background, 3 placeholder portraits with "[client quote goes here]" and a name. No stars, ratings, or counts.
8. Footer — hairline top divider, wordmark, address, phone, hours, Instagram handle, solid green "Book an appointment" pill.
9. Sticky mobile-only bottom bar — solid green, "Book an appointment" with a thin gold arrow, appears once the hero is scrolled past.

## Design system

- Tokens in `src/styles.css` (oklch): off-white background, forest green (#2F4A3E–#3A5A4A range), cream #F5F0E8, matte gold #8A7340 for hairlines/eyebrows/arrows only, hairline #E2DCD2. No pink, no gradients, no shadows, no glow.
- Cormorant Garamond (500/600) for headings, Inter (400/500) for body, loaded via a `<link>` in the root route head.
- Eyebrow style: Inter 10–11px, uppercase, 2px tracking, gold.
- Generous padding throughout, no card borders or shadows, images rounded 10px, buttons pill-shaped.
- Motion: slow opacity fade-in on scroll for images only (IntersectionObserver). Nothing sliding, bouncing, or parallax.

## Technical notes

- Design data lives in a typed array in a local module; filtering is client state matching against each design's tags plus its service name, so "Gel-X"/"Builder gel"/"Dipping"/"Acrylic" chips work alongside the occasion/style tags.
- Detail view is a modal (keeps the single-page feel) with keyboard/escape close and focus handling.
- Booking links are plain external anchors to https://bellevanail.com/booking.
- Route `head()` gets a Belleva-specific title, description, og:title, og:description, og:type, twitter:card.
- No backend needed — everything is static content.

## Copy

Only the text supplied in the brief is used. No added taglines, emojis, or marketing lines.
