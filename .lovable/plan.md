# Forms audit — reduce to 2 forms, connect them

Goal: the site currently has 3 forms (bridal on /bridal, contact form in the footer on every page except /contact, application form on /careers). The two latter are demo forms that do nothing. Reduce to 2 real forms, both saving to the backend and emailing the salon.

## Inventory decision

- **Bridal form** (/bridal #join): keep exactly as is. It stays the only structured lead form (first name, phone, wedding date, party size, note, SMS consent) because bridal follow-up happens by text.
- **Footer contact form**: keep and connect. It is the only general "I don't want to call" channel, and it sits unobtrusively at the bottom of every page. Fields stay: Name, Email, Message.
- **Careers application form** (/careers): remove. The page already offers call/text (469) 377-0984 and email michael@bellevanail.com; the form duplicates those channels and currently shows "Demo form — not yet connected."

Result: 2 forms on the whole site — bridal and footer contact.

## 1. Backend (Lovable Cloud)

- Migration — new table `public.contact_messages`:
  - `id uuid primary key default gen_random_uuid()`
  - `name text not null`
  - `email text not null`
  - `message text not null`
  - `created_at timestamptz not null default now()`
- Same migration, grants + RLS:
  - `GRANT INSERT ON public.contact_messages TO anon;`
  - `GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;`
  - `GRANT ALL ON public.contact_messages TO service_role;`
  - `ENABLE ROW LEVEL SECURITY`
  - Policies: INSERT `TO anon WITH CHECK (true)`; SELECT / UPDATE / DELETE `TO authenticated`. Never shown publicly.

## 2. Submit server function

- New `src/lib/contact.functions.ts`: `submitContactMessage` (`createServerFn`, POST, public), modeled on `src/lib/bridal.functions.ts`.
- Zod: name (required, ≤100), email (required, valid, ≤200), message (required, ≤2000).
- Insert with a server publishable client created inside the handler (same fetch shim Bearer→apikey as bridal). No admin client, no bearer middleware.

## 3. Email notification to Michael

- Prerequisite: sending email requires a sender domain the salon owns (e.g. bellevanail.com). No domain is configured yet — the user sets it up via the email setup dialog; form submissions save regardless, emails only start flowing once the domain verifies.
- After a successful insert, in the same handler, send a short notification email to `michael@bellevanail.com` via Lovable's managed email API (`sendLovableEmail` with `LOVABLE_API_KEY`):
  - Contact messages: subject "New contact message — {name}", body with name, email, message, time.
  - Bridal leads (added to the existing `submitBridalLead` handler, UI unchanged): subject "New bridal sign-up — {firstName}", body with phone, wedding date, party size, note.
- Best-effort: if the email send fails, the submission still succeeds and is still saved; the error is logged only.

## 4. Footer form wiring

- `src/components/SiteFooter.tsx`: wire the existing form to `submitContactMessage` with a small state machine (idle / submitting / success / error), same pattern as `BridalJoinForm`.
- Success: replace the form with a calm line, e.g. "Thank you — we'll get back to you shortly." Error: inline message, no page reload.
- Remove the "Demo form — not yet connected." note.
- Nothing else in the footer changes; the form still hides on /contact.

## 5. Careers — remove the application form

- `src/routes/careers.tsx`: delete the demo form block and its "Demo form — not yet connected." note and the "Or leave your details below" line.
- In its place, a pill button "Email Michael" (`mailto:michael@bellevanail.com`) in the existing forest/gold button style, under the "How to reach me" block. Call/text link stays.

## 6. Verification

- `bunx tsgo` typecheck.
- Playwright at 393px and 1280px: submit the footer form → success state + row in `contact_messages`; confirm /careers no longer shows a form and the mailto button renders; homepage → /bridal#join flow still works.
- Delete test rows afterwards.
