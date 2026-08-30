# Redesign /faq page

## Goal
Rebuild the existing `/faq` page to match the new editorial FAQ design: a clean opening hero, hairline-labeled accordion groups, and only the first two groups populated with a placeholder for the rest.

## Files to change
- `src/routes/faq.tsx` — full page rewrite
- No other pages modified.

## Opening section
- Background: off-white `#FAF8F5` (uses existing `bg-background` token).
- Padding: `pt-[140px] pb-16 md:pt-[140px] md:pb-[64px]` (extra top clears fixed header).
- Content wrapper: `max-w-[720px] mx-auto px-6 md:px-12`, left-aligned text.
- Label: Inter uppercase 12px, tracking `0.12em`, matte gold `text-gold`: "QUESTIONS".
- Heading: Cormorant Garamond 56px desktop / 36px mobile, `text-forest`, `mt-3`, `lining-nums`: "Asked and answered."
- Subline: Inter 17px, `text-forest/75`, `mt-4`: "If it isn't here, call us — a real person will pick up the phone."
- Fade-up reveal on scroll.

## FAQ groups section
- Same off-white background, continues below opening.
- Each group starts with a hairline label matching the `/standard` "HOW TO CLAIM" pattern:
  - Full-width 1px line in forest green at 15% opacity.
  - Label text (Inter uppercase 12px, tracking `0.14em`, matte gold) left-aligned on top of the line with cream/off-white right padding of 16px so the line breaks behind the text.
  - `mt-16 md:mt-[64px]` above the label, `mb-6` below.
- Accordion items under each label:
  - Question row: full-width tappable button, `min-h-[44px]`, `py-[18px]`, flex between question text and toggle.
  - Question text: Cormorant Garamond 22px desktop / 19px mobile, `text-forest`, `lining-nums`.
  - Toggle: plain text "+" character, rotates to "×" when open (uses `transform rotate-45` or text-swap), no icon font.
  - Answer: Inter 16px, `text-forest/80`, `leading-[1.65]`, expands with `grid-rows` / `grid-template-rows` transition over 250ms ease, `pb-[18px]`.
  - 1px divider (`border-forest/12`) between items. Add divider after the last item in each group as well.
  - One item open at a time; all closed by default. Clicking an open item closes it.
- Fade-up each group and each item on scroll.

## Content
Populate only the first two groups; render a stub container for the remaining groups.

### Group 1 — BOOKING
Label eyebrow: "BOOKING"  
Title: "Appointments, walk-ins, and changes" (used for internal reference / optional screen-reader only; the visible hairline label is "BOOKING")
Items:
1. Do I need to book, or can I walk in? → Walk-ins are welcome. Booking is better — it gives us time to match you with the right technician and prepare for what you want.
2. Do you take a deposit? → No. Not for anything.
3. What if I need to cancel or reschedule? → Just let us know 24 hours ahead if you can. No fee either way.
4. What should I write in the Note when I book? → Anything that helps us prepare: the occasion, a design you have in mind, a technician you'd like, or "I'm in a hurry." We read every Note before you arrive.
5. Can I book for a group? → Yes — book one appointment and write the number of people in the Note. The front desk will call you the same day to arrange chairs and timing.
6. Can I request a specific technician? → Of course. Write their name in the Note. If you don't have one yet, tell us what you're looking for and we'll match you with the technician whose strengths fit.
7. What if the technician I want is fully booked? → The front desk will suggest someone whose strengths match — same skill, same standard. If no one fits, we'd rather move you to another day than hand you to whoever is free. Your set matters more than our schedule.

### Group 2 — DESIGN
Label eyebrow: "DESIGN"  
Items:
1. I have a design in mind — how do I make sure you can do it? → Book ahead and describe it in the Note, or bring the photo with you. Design work is scheduled with a design technician and with the time built in, so it never gets rushed.
2. How do I keep the same technician every visit? → Rebook at the front desk before you leave. Your technician and your usual timing are held — it's the one thing walk-ins can't get.

### Remaining groups container
Render a single empty `<section>` or comment-ready placeholder after the DESIGN group so future groups can be appended without restructuring. Do not populate Guarantee, Hygiene, Bridal, or Gift Cards.

## Header / footer
- Keep `<SiteHeader heroPassed={true} />` so the header is solid off-white on load.
- Keep `<SiteFooter />` and `<StickyBottomBar show={false} />`.
- FAQ nav item active state is already handled by `SiteHeader` (`pathname === item.to`); no change needed.

## Head metadata
- Keep existing title "FAQ — Belleva Nails" and description.

## Constraints
- No icons, no shadows, no gradients.
- `lining-nums` on all Cormorant text.
- 250ms ease transitions on accordion expand/collapse.
- Fade + rise on scroll via existing `useFadeUp` hook.

## Verification
- Build passes.
- Preview `/faq` on mobile and desktop:
  - Opening spacing and typography match spec.
  - Both groups render with hairline labels.
  - Accordions open/close one at a time, plus rotates to ×.
  - No other page changed.