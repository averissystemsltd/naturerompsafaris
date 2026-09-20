-- Harden enquiry counters and translation FK indexes used by CMS autosave.

alter table public.enquiry_reference_counters enable row level security;

revoke all on table public.enquiry_reference_counters from anon, authenticated, public;

revoke all on function public.set_enquiry_reference_code() from public, anon, authenticated;

revoke all on function public.get_portal_team() from public, anon;
grant execute on function public.get_portal_team() to authenticated;
grant execute on function public.get_portal_team() to service_role;

create index if not exists blog_translations_post_id_idx
  on public.blog_translations (post_id);
create index if not exists blog_translations_og_image_id_idx
  on public.blog_translations (og_image_id);
create index if not exists destination_translations_destination_id_idx
  on public.destination_translations (destination_id);
create index if not exists destination_translations_og_image_id_idx
  on public.destination_translations (og_image_id);
create index if not exists experience_translations_experience_id_idx
  on public.experience_translations (experience_id);
create index if not exists experience_translations_og_image_id_idx
  on public.experience_translations (og_image_id);
create index if not exists tour_translations_tour_id_idx
  on public.tour_translations (tour_id);
create index if not exists tour_translations_og_image_id_idx
  on public.tour_translations (og_image_id);
create index if not exists accommodation_translations_accommodation_id_idx
  on public.accommodation_translations (accommodation_id);
create index if not exists accommodation_translations_og_image_id_idx
  on public.accommodation_translations (og_image_id);
create index if not exists package_translations_package_id_idx
  on public.package_translations (package_id);
create index if not exists package_translations_og_image_id_idx
  on public.package_translations (og_image_id);
create index if not exists fleet_vehicle_translations_vehicle_id_idx
  on public.fleet_vehicle_translations (vehicle_id);
create index if not exists fleet_vehicle_translations_og_image_id_idx
  on public.fleet_vehicle_translations (og_image_id);
create index if not exists national_park_translations_og_image_id_idx
  on public.national_park_translations (og_image_id);
create index if not exists blog_posts_author_id_idx
  on public.blog_posts (author_id);
create index if not exists media_assets_created_by_idx
  on public.media_assets (created_by);
create index if not exists fleet_gallery_items_media_id_idx
  on public.fleet_gallery_items (media_id);
create index if not exists team_members_media_id_idx
  on public.team_members (media_id);
create index if not exists enquiries_assigned_to_idx
  on public.enquiries (assigned_to);
create index if not exists newsletter_campaigns_created_by_idx
  on public.newsletter_campaigns (created_by);
