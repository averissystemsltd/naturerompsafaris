-- Rebrand enquiry references from Benroso (BENS) to Nature Romp Safaris (NRS).
-- Display format: NRS-2026-00001 (calendar year, zero-padded sequence)

create or replace function public.generate_enquiry_reference_code(p_created_at timestamptz default now())
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_year integer;
  v_next integer;
begin
  v_year := extract(year from coalesce(p_created_at, now()))::integer;

  insert into public.enquiry_reference_counters (year, last_value)
  values (v_year, 1)
  on conflict (year) do update
  set last_value = enquiry_reference_counters.last_value + 1
  returning last_value into v_next;

  return 'NRS-' || v_year::text || '-' || lpad(v_next::text, 5, '0');
end;
$$;

revoke all on function public.generate_enquiry_reference_code(timestamptz) from public;
grant execute on function public.generate_enquiry_reference_code(timestamptz) to service_role;

update public.enquiries
set reference_code = regexp_replace(reference_code, '^BENS-', 'NRS-')
where reference_code like 'BENS-%';
