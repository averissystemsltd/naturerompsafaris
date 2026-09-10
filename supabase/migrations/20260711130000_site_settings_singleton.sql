-- Ensure the site_settings singleton row exists.
--
-- The portal Settings actions persist via `update ... where singleton_key = 'default'`,
-- which silently affects zero rows when the singleton is missing. Seeding the row
-- (using the branded column defaults) lets the admin save settings immediately and
-- lets the public site read live values instead of only the BRAND_* fallbacks.
--
-- This is configuration infrastructure (a singleton), not portal-managed content
-- like tours/packages/parks — so it is intentionally kept as a structural migration.
insert into public.site_settings (singleton_key, favicon_url)
values ('default', '/assets/brand-favicon.png')
on conflict (singleton_key) do nothing;
