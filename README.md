# Belleva Lookbook

Build a mobile-first, single-page landing site for "Belleva Nails" 
— a premium nail studio in Denton, Texas. 

THE CONCEPT (read first):
This is NOT a typical nail salon website. The homepage IS a design 
library — a curated lookbook of real nail sets, like a fashion or 
jewelry brand catalog. Customers browse real designs, filter them, 
and book the one they love. Everything should feel calm, editorial, 
and quietly luxurious. Think: the website of a high-end jewelry 
house that happens to do nails.

=====================================================
BRAND SYSTEM (strict — treat as law)
=====================================================
COLORS (use ONLY these):
- Off-white #FAF8F5 and white #FFFFFF — backgrounds, ~60% of page
- Deep forest green, range #2F4A3E to #3A5A4A — headings, accents, 
  solid blocks, ~30%
- Soft cream #F5F0E8 — secondary background blocks, ~8%
- Muted matte gold #8A7340 — ONLY for hairline borders, tiny 
  eyebrow labels, small arrows, ~2%
FORBIDDEN: pink, red, neon, any gradient, glitter/shiny gold, 
black as a main color, cool gray, drop shadows, glow effects.

TYPOGRAPHY:
- Headings: "Cormorant Garamond" (Google Fonts), weight 500-600. 
  Large sizes, generous line-height, few words.
- Body/UI: "Inter", weight 400-500. Small and quiet.
- Eyebrow labels: Inter, 10-11px, letter-spacing 2px, uppercase, 
  matte gold color.
- Sentence case everywhere except eyebrow labels and the wordmark.

LAYOUT FEEL:
- Whitespace is the main design element. Double the padding you 
  think you need.
- No card borders, no card shadows. Images + text floating on 
  clean background, separated by air.
- Thin 1px hairlines (gold or #E2DCD2) only as section dividers.
- Subtle slow fade-in on scroll for images. Nothing bouncy, 
  nothing sliding sideways, no parallax.
- Corners: images rounded 10px. Buttons: pill shape.

=====================================================
PAGE STRUCTURE (top to bottom)
=====================================================

1. HEADER (minimal, sticky, background #FAF8F5):
- Left: wordmark "BELLEVA" — Cormorant Garamond, letter-spacing 
  3px, forest green.
- Right: small pill button "Book" — outlined, matte gold border, 
  gold text.

2. HERO (centered, lots of air, background #FAF8F5):
- H1: "Find your next set." (Cormorant, ~44px mobile / 72px 
  desktop, forest green)
- Sub (Inter, 15px, muted): "Real designs, made in our studio. 
  Book the one you love."

3. FILTER BAR (one scrollable row of chips):
Chips: All · Wedding · Everyday · Date night · Holiday · Gel-X · 
Builder gel · Dipping · Acrylic · French · Chrome · Minimal
- Active chip: solid forest green, cream text.
- Inactive: thin outline #CFC8BA, gray-green text.
- Filtering must actually work on the grid below.

4. DESIGN GRID (2 columns mobile, 3 desktop, generous gaps):
12 design cards. Each card:
- Image: 4:5 portrait ratio, rounded 10px. Use elegant solid 
  placeholder blocks in these tones for now: #EAE4D8, #3A5A4A, 
  #E3DACB, #EFEAE0 (rotate them) with a tiny centered label 
  "Photo".
- Below image: eyebrow label (collection), then design name in 
  Cormorant 18px forest green, then one small line 
  "Service · from $XX".
Use EXACTLY these 12 designs (name / collection / service / 
filter tags / placeholder price):
1. Linen Bloom / SIGNATURE SET / Gel-X / Wedding, French / $70
2. Star Porcelain / ART FOCUS / Gel-X / Wedding, Chrome / $75
3. Golden Flow / SIGNATURE SET / Builder gel / Everyday, 
   Minimal / $65
4. Crimson Jewels / DETAIL EDIT / Dipping / Holiday / $60
5. Navy Starlet / BELLEVA EDIT / Gel-X / Date night / $70
6. Verdant Drift / BELLEVA EDIT / Acrylic / Everyday / $65
7. Balanced Form / SIGNATURE SET / Builder gel / Minimal / $65
8. Playful Lines / BELLEVA EDIT / Gel-X / Date night / $70
9. Orbit / ART FOCUS / Acrylic / Chrome, Holiday / $75
10. Midnight Ornament / DETAIL EDIT / Dipping / Holiday, Date 
    night / $60
11. Pearl Veil / SIGNATURE SET / Gel-X / Wedding, Minimal / $70
12. Espresso French / BELLEVA EDIT / Builder gel / Everyday, 
    French / $65
(Prices are placeholders for this demo.)
- Clicking a card opens a simple detail view (modal or page): 
  bigger image, name, service, "from $XX", and a primary button 
  "Book this design" linking to https://bellevanail.com/booking 
  with this line underneath in small text: "On the last booking 
  step, tell us your occasion in the Note box so we can prepare 
  for you."

5. THE BELLEVA STANDARD (full-width section, background forest 
green #2F4A3E, cream text, generous padding):
- Eyebrow (gold): THE BELLEVA STANDARD
- Heading (Cormorant, cream): "The industry standard is a 7-day 
  guarantee. Cute. Ours is 14."
- Body (Inter 15px, cream, max-width 560px): "Every set is 
  guaranteed for 14 days. If anything chips, lifts, or breaks, 
  come back and we fix it free. No receipts argued, no questions 
  asked."
- Small quiet line at bottom (gold): "Find Belleva Nails on 
  Google Maps."

6. FROM OUR CLIENTS (background #F5F0E8):
- Heading: "From our clients" / sub: "Real sets, real words."
- 3 entries side by side (stack on mobile): 4:5 placeholder 
  image + one short italic quote + name like "Sarah M." 
  Use quote placeholder text "[client quote goes here]".
- NO star icons, NO ratings, NO review counts anywhere.

7. FOOTER (background #FAF8F5, hairline divider on top):
- BELLEVA wordmark
- Address: 2200 W University Dr, Ste 180, Denton, TX 76201
- Phone: (940) 514-1808
- Hours: Mon-Fri 9:30-7:30 · Sat 9-7 · Sun 11-5
- Instagram: @bellevanailsdenton
- Primary pill button (solid forest green): "Book an appointment" 
  -> https://bellevanail.com/booking

8. STICKY BOTTOM BAR (mobile only, appears after scrolling past 
hero): solid forest green bar, text "Book an appointment", thin 
gold arrow, links to the booking URL.

=====================================================
COPY RULES
=====================================================
All visible text is provided above — do not invent additional 
marketing copy, do not add taglines like "Pamper yourself" or 
"Luxury nails", no emojis, no exclamation marks except none. 
If a label is missing, use the shortest neutral option.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://belleva-design-library.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0bf28fb5-6504-4f9a-8c4c-39d1adb8e5fa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
