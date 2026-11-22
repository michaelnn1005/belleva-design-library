-- Bridal sign-ups hold names and phone numbers. Visitors may only add a sign-up; nobody can
-- read, change or delete them through the public API (any signed-in user could before).
-- The salon reads them in Lovable Cloud's table view, in the notification email and in the
-- team's Google Sheet; the website server only inserts.

DROP POLICY IF EXISTS "Signed-in owner can view sign-ups" ON public.bridal_leads;
DROP POLICY IF EXISTS "Signed-in owner can update sign-ups" ON public.bridal_leads;
DROP POLICY IF EXISTS "Signed-in owner can delete sign-ups" ON public.bridal_leads;

REVOKE SELECT, UPDATE, DELETE ON public.bridal_leads FROM authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.bridal_leads FROM anon;
