-- Deny PostgREST access to internal enquiry sequence counters.
-- The SECURITY DEFINER trigger still writes here as the table owner.

create policy "no client access to enquiry counters"
  on public.enquiry_reference_counters
  for all
  to anon, authenticated
  using (false)
  with check (false);
