-- Mock schema for Wizard of Oz Prototype

CREATE TYPE mock_job_status AS ENUM (
  'pending', 
  'dispatched', 
  'en_route', 
  'on_scene', 
  'towing', 
  'completed'
);

CREATE TABLE mock_tow_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  status mock_job_status DEFAULT 'pending',
  customer_name TEXT NOT NULL,
  mock_location JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
