-- Bridal request details: when she'd like to come in for her trial, her dress colour and the
-- look she has in mind. All optional; the salon uses them to match her with the right nail tech.
ALTER TABLE public.bridal_leads
  ADD COLUMN IF NOT EXISTS preferred_visit_date date,
  ADD COLUMN IF NOT EXISTS dress_color text,
  ADD COLUMN IF NOT EXISTS design_idea text;
