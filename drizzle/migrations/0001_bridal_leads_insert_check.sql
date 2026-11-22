DROP POLICY IF EXISTS "Anyone can submit a bridal sign-up" ON public.bridal_leads;

CREATE POLICY "Anyone can submit a bridal sign-up"
  ON public.bridal_leads
  FOR INSERT
  TO anon
  WITH CHECK (
    sms_consent = true
    AND char_length(btrim(first_name)) BETWEEN 1 AND 100
    AND char_length(btrim(phone)) BETWEEN 7 AND 40
    AND (party_size IS NULL OR party_size BETWEEN 1 AND 50)
    AND (note IS NULL OR char_length(note) <= 2000)
  );
