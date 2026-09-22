# Forms audit — one form left (bridal), emailing the salon

Goal: the site currently has 3 forms (bridal on /bridal, contact form in the footer, application form on /careers); the latter two are demo forms that do nothing. Reduce to exactly one form — the bridal form — and email the salon on every new bridal sign-up.

## Inventory decision

- **Bridal form** (/bridal #join): keep exactly as is. It stays the only form on the site (first name, phone, wedding date, party size, note, SMS consent); bridal follow-up happens by text.
- **Footer contact form**: remove entirely. All contact paths go through call/text, Instagram, or Book, consistent with /contact. No contact_messages table, no contact server function.
- **Careers application form**: remove. The page already offers call/text (469) 377-0984 and email; the form duplicates those channels and currently shows "Demo form — not yet connected."

Result: 1 form on the whole site — bridal.

## 1. Bridal email notification

- Prerequisite: sending email requires a sender domain the salon owns (e.g. bellevanail.com). No domain is configured yet — the user sets it up via the email setup dialog; submissions save regardless, emails only start flowing once the domain verifies.
- Scaffold the email template registry and server-only send helper via Lovable's managed email infrastructure, then add one template for the bridal notification.
- After a successful insert, in the same `submitBridalLead` handler, send the notification (best-effort: if the send fails, the submission still succeeds and is saved; the error is logged only).
- Recipient: `bellevanailsdenton@gmail.com`.
- Subject: `[BRIDAL] New sign-up - {firstName} - {weddingDate}`.
- Body: phone, wedding date, party size, note, submitted time (Central Time).

## 2. Footer — remove the contact form

- `src/components/SiteFooter.tsx`: delete the form block and its "Demo form — not yet connected." note.
- Keep the address, hours, phone, social links, Careers link and the "Book an appointment" button unchanged.

## 3. Careers — remove the application form

- `src/routes/careers.tsx`: delete the demo form block, its "Demo form — not yet connected." note and the "Or leave your details below" line.
- In its place, a pill button "Email Michael" (`mailto:michaelnn1005@gmail.com`) in the existing forest/gold button style, under the "How to reach me" block. Call/text link stays.
- Update the email link in "How to reach me" to `michaelnn1005@gmail.com` as well.

## 4. Verification

- `bunx tsgo` typecheck.
- Playwright at 393px, 768px and 1280px: confirm no form remains anywhere on the site except the bridal form on /bridal; footer and careers render correctly.
- Confirm the bridal flow still submits and saves.
