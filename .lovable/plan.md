# Bridal sign-up form (lead capture) on /bridal

Goal: the homepage "Join the bridal program" button leads to a sign-up form on /bridal that saves bridal leads to a new `bridal_leads` table, instead of opening the booking link directly.

## 1. Backend (Lovable Cloud)

- Enable Lovable Cloud (creates the Supabase project and the `src/integrations/supabase/*` clients).
- Migration — new table `public.bridal_leads`:
  - `id uuid primary key default gen_random_uuid()`
  - `first_name text not null`
  - `phone text not null`
  - `wedding_date date not null`
  - `party_size integer`
  - `note text`
  - `consent boolean not null default true`
  - `created_at timestamptz not null default now()`
- Same migration, GRANTs + RLS:
  - `GRANT INSERT ON public.bridal_leads TO anon;` (anyone can submit)
  - `GRANT SELECT, UPDATE, DELETE ON public.bridal_leads TO authenticated;`
  - `GRANT ALL ON public.bridal_leads TO service_role;`
  - `ENABLE ROW LEVEL SECURITY`
  - Policies: INSERT `TO anon WITH CHECK (true)`; SELECT / UPDATE / DELETE `TO authenticated` (salon owner account only — the list is never shown on any public page).

## 2. Submit server function

- New `src/lib/bridal.functions.ts`: `submitBridalLead` (`createServerFn`, POST, public).
- Zod validation: first_name (required, ≤100), phone (required, ≤40), wedding_date (required, date string), party_size (optional number 1–50), note (optional, ≤2000), consent (must be true).
- Insert with a server publishable client created inside the handler (`SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY`, no session, `sb_`-key fetch shim). No admin client, no bearer middleware needed.
- Returns `{ ok: true }` or a friendly error.

## 3. Form on /bridal

- New section `id="join"`, placed between the COMMON QUESTIONS section and the CTA band. Background off-white `#FAF8F5`, content `max-w-[720px]`, left-aligned, gold hairline label "JOIN THE BRIDAL PROGRAM", Cormorant heading "Save your wedding date.", one line of Inter body text.
- Fields (Inter, brand hairline inputs, pill submit button in the existing gold-outline style):
  - Row of two columns from `md` up, single column on mobile: First name* (text), Phone* (tel), Wedding date* (date), Party size (number, optional).
  - Full width: Note (textarea, 3 rows), placeholder: "Anything we should keep in mind - your dress, colors, a design you love, timing."
  - Required checkbox, exact text: "Yes, text me about my bridal appointments at Belleva Nails. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out."
- Submit button: "Join the bridal program". On success the form is replaced by a calm confirmation ("Thank you — we'll text you shortly to set up your trial."); on error an inline message shows. No page reload.
- The existing CTA band ("Book your trial") and hero booking button stay exactly as they are.

## 4. Homepage link change

- In the home bridal section, change the "Join the bridal program" `<a href={BOOKING_URL}>` to `<Link to="/bridal" hash="join">` (same pill styling, same helper line below it). Nothing else on the homepage changes.

## 5. Verification

- `bunx tsgo` typecheck.
- Playwright: click the homepage button → lands on /bridal scrolled to the form; fill and submit the form; confirm the row appears in `bridal_leads`; confirm the success state renders. Check mobile (393px) and desktop (1280px).
