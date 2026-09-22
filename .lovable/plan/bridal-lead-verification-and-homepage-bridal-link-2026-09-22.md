# Bridal lead verification and homepage bridal link

## Scope

Make only the requested bridal form and homepage Belleva Bridal changes. Do not alter any other section or page.

## 1. Rename the stored SMS consent field

- Apply a database migration renaming `public.bridal_leads.consent` to `sms_consent`, preserving existing values, constraints, default, grants, and row-level access rules.
- Update the bridal submission validation and insert mapping to use `smsConsent` in the app and `sms_consent` in the database.
- Keep the existing required checkbox wording and behavior unchanged.

## 2. Keep bridal email notification best-effort

- Keep the planned notification behavior non-blocking: saving the lead remains the source of truth, and an unavailable or failed email notification must never make the form submission fail.
- Recipient: `bellevanailsdenton@gmail.com`.
- Subject: `[BRIDAL] New sign-up - {firstName} - {weddingDate}`.
- Body fields: phone, wedding date, party size, note, and submitted time.
- Do not configure or verify an email sender domain now. The notification remains inactive until the custom-domain email setup is available.

## 3. Homepage Belleva Bridal section only

- Preserve the existing button styling and its existing destination `/bridal#join`.
- Replace only the small line beneath it with: `Free to join - leave your date, or book your trial if you are ready.`
- Add scroll offset to the existing `#join` section on `/bridal`, so its heading clears the fixed header when reached from the homepage.

## 4. End-to-end verification and cleanup

- Submit one uniquely identifiable test lead through the visible `/bridal` form with first name, phone, wedding date, party size, note, and checked SMS consent.
- Confirm the success state in the page.
- Query `bridal_leads` and verify that exact row contains every submitted field, including `note` and `sms_consent = true`.
- Delete only that uniquely identified test row, then confirm it no longer exists.
- Verify the homepage button opens `/bridal#join` and the form heading is visible below the fixed header.
- Run the project typecheck.

## Out of scope

- No email-domain setup.
- No changes to any other homepage section, bridal section, route, or shared layout.
