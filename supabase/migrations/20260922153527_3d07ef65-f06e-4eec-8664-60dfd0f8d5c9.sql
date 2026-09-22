CREATE TABLE public.bridal_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  phone text not null,
  wedding_date date not null,
  party_size integer,
  note text,
  consent boolean not null default true,
  created_at timestamptz not null default now()
);

GRANT INSERT ON public.bridal_leads TO anon;
GRANT SELECT, UPDATE, DELETE ON public.bridal_leads TO authenticated;
GRANT ALL ON public.bridal_leads TO service_role;

ALTER TABLE public.bridal_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a bridal sign-up"
  ON public.bridal_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Signed-in owner can view sign-ups"
  ON public.bridal_leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Signed-in owner can update sign-ups"
  ON public.bridal_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Signed-in owner can delete sign-ups"
  ON public.bridal_leads
  FOR DELETE
  TO authenticated
  USING (true);