
-- Add government_scheme_id column to transportation_bookings if not already added
ALTER TABLE public.transportation_bookings 
ADD COLUMN IF NOT EXISTS government_scheme_id UUID REFERENCES public.government_schemes(id) NULL;
