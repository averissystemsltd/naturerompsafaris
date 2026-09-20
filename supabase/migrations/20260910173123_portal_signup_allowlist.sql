-- Restrict portal self-signup to Nature Romp and Averis Systems domains.
-- Unlisted emails cannot create an auth user (the trigger aborts the insert)
-- and never receive an admin profile.

create or replace function public.handle_new_portal_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  email_domain text;
begin
  email_domain := lower(split_part(coalesce(new.email, ''), '@', 2));

  if email_domain not in ('naturerompsafaris.com', 'averissystems.com') then
    raise exception 'This email is not allowed to create a portal account'
      using errcode = '42501';
  end if;

  insert into public.profiles (id, full_name, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'admin',
    'active'
  )
  on conflict (id) do update
  set
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    role = 'admin',
    status = 'active',
    updated_at = now();

  return new;
end;
$$;

revoke all on function public.handle_new_portal_user() from public;
revoke all on function public.handle_new_portal_user() from anon, authenticated;

-- Replace leftover Benroso contact details on the site_settings singleton
-- with Nature Romp numbers from the live site / env.
update public.site_settings
set
  company_name = 'Nature Romp Safaris',
  email = 'info@naturerompsafaris.com',
  phone_primary = '+254 722 714812',
  phone_secondary = '+254 739 206698',
  phone_office = '+254 722 714812',
  address_short = 'Nature Romp Safaris, Embassy House, Mezzanine, Harambee Avenue, P.O Box 10323, 00100-GPO, Nairobi, Kenya',
  postal_address = 'P.O Box 10323, 00100-GPO, Nairobi, Kenya',
  kato_address = 'Embassy House, Harambee Avenue, Nairobi, Kenya',
  theme_color = '#5D2411',
  whatsapp_message = 'Hello Nature Romp Safaris! I''d like help planning my Kenya/Tanzania safari. Could you guide me on destinations, travel dates, group size, and the best options for my trip?',
  updated_at = now()
where singleton_key = 'default';
