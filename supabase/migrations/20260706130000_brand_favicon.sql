-- Set default site favicon to bundled Nature Romp brand asset
update public.site_settings
set favicon_url = '/assets/brand-favicon.png'
where singleton_key = 'default';
