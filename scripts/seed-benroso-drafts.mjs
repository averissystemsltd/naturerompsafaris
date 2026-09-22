import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { loadDumps } from './_extract-benroso-dumps.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const MEDIA_BUCKET = 'media';
const BENROSO_PUBLIC = 'https://grgnxuuywrhwsvhhrqoo.supabase.co/storage/v1/object/public';
const DEST_SUFFIXES = [
  '-safari',
  '-safaris',
  '-tours',
  '-climbing',
  '-excursion-tours',
  '-national-reserve'
];

const BENROSO_DEST_SLUGS = {
  'a07e0b3d-77c9-464b-8dc5-4957b5daca5f': 'aberdare-national-park',
  '8299e9de-cf7e-4b64-9be8-1110aaa01d13': 'amboseli-national-park',
  '64fe2ab2-26d2-470c-bda0-8dcf6b3168a9': 'arusha-cultural-center',
  'a35eb363-e2a3-4a8b-99e9-7a3bb388adbb': 'arusha-national-park',
  'ce8912e4-07d6-4176-be88-42bc118fc0bd': 'cape-town',
  '5c28df5f-4266-482d-9a2b-109ee6fd3b15': 'crescent-island-game-sanctuary',
  '617f8dba-0a2f-4ce3-b33e-389341f07186': 'diani-beach',
  '4ad1f466-8863-40d0-bdf4-c9a3f0b00aa4': 'hells-gate-national-park',
  'fc547203-ae77-4dda-a8bb-7d30502171f3': 'kalasa-waterfalls',
  'b21d173e-734c-4219-bb4f-15de40adeb47': 'kigali-genocide-memorial',
  'af05f8e3-d130-4171-ab67-ef5f6214e263': 'kikuletwa-hot-springs',
  '4516379a-29e6-4c11-8184-61d2d6106537': 'kruger-national-park',
  '51017e50-6327-4888-89a5-6dcf98f73f58': 'lake-baringo',
  '9d583e9e-feeb-4546-ad89-6f6007dfdea7': 'lake-bogoria-national-reserve',
  '420a3ab4-4641-4cc9-9c78-7ea6f885d36d': 'lake-duluti',
  '1d34e1cc-3859-4793-9f99-a0fe5b820c95': 'lake-manyara-national-park',
  '662a8e70-6dd5-407a-8a4d-3d42404d7b87': 'lake-naivasha',
  'a0e9e5f7-4922-426b-ae8f-58164bcdbb38': 'lake-nakuru-national-park',
  '0d0917a3-6446-4a51-8170-720c1ce6ef1f': 'lewa-wildlife-conservancy',
  '2711e252-3105-405f-baae-f49557acac5f': 'maasai-mara',
  '732edde7-3da0-48f9-8bba-d0176f379dc6': 'malindi',
  '6dc8e87c-ae71-4753-a5b6-27ca87a71dde': 'meru-national-park',
  '196525d1-fd25-47f6-b685-be341cc7a338': 'mount-kenya',
  'f83efbdd-dd50-434d-8ca5-1b8af17b3862': 'nairobi',
  'a1c4162c-d015-4712-b3db-b882214cfab2': 'ngorongoro-crater',
  'd4931322-19ed-455d-a0a2-fa7693937a32': 'ol-pejeta-conservancy',
  '24ea68f2-e595-4ed3-a939-8e69ee5d2f5d': 'olduvai-gorge',
  '39b17ffd-ebf2-47ea-9b0b-e5e36b5fe3b4': 'samburu-national-reserve',
  '4f749593-4b94-483f-b04f-1ea7ba68488f': 'serengeti-national-park',
  'df34c30d-b980-4c55-a436-93ea0ff2ae10': 'solio-ranch',
  'c8cbc411-8948-4120-9087-986768086a45': 'taita-hills-wildlife-sanctuary',
  'af63950e-4917-4fb8-b64d-8dbd0dc06c7e': 'tarangire-national-park',
  '2dc2286b-29de-494c-bb36-6f1384505ef5': 'tsavo-east-and-tsavo-west-national-parks',
  'e44c6e45-33a4-4875-8e20-e4d8b6060e55': 'tsavo-east-national-park',
  '074fa9c5-9cc4-440a-a731-8979106fcc93': 'tsavo-west-national-park',
  '0c510e06-99f1-47e5-b417-d8c92f89332b': 'volcanoes-national-park'
};

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function rebrand(value) {
  if (typeof value === 'string') {
    return value
      .replace(/Benroso Safaris/g, 'Nature Romp Safaris')
      .replace(/benroso safaris/gi, 'Nature Romp Safaris')
      .replace(/\bBenroso\b/g, 'Nature Romp')
      .replace(/\bbenroso\b/g, 'Nature Romp');
  }
  if (Array.isArray(value)) return value.map(rebrand);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, next]) => [key, rebrand(next)]));
  }
  return value;
}

function normalizeCountry(value) {
  return value ? String(value).trim().toLowerCase() : null;
}

function findNrDestination(benrosoSlug, nrDests) {
  const exact = nrDests.find((dest) => dest.slug === benrosoSlug);
  if (exact) return exact;
  return (
    nrDests.find((dest) => DEST_SUFFIXES.some((suffix) => dest.slug === `${benrosoSlug}${suffix}`)) ??
    null
  );
}

function mediaUrl(asset) {
  if (asset.url && /^https?:\/\//.test(asset.url)) return asset.url;
  return `${BENROSO_PUBLIC}/${asset.bucket}/${asset.path}`;
}

function extFrom(url, contentType) {
  const fromUrl = url.split('?')[0].split('.').pop()?.toLowerCase();
  if (fromUrl && ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(fromUrl)) {
    return fromUrl === 'jpeg' ? 'jpg' : fromUrl;
  }
  const map = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif'
  };
  return map[contentType] ?? 'jpg';
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await fn(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

function collectMediaIds(destBases, accommodations) {
  const ids = new Set();
  for (const dest of destBases) {
    for (const id of dest.gallery ?? []) ids.add(id);
  }
  for (const accom of accommodations) {
    for (const id of accom.gallery ?? []) ids.add(id);
    if (accom.og_image_id) ids.add(accom.og_image_id);
  }
  return ids;
}

function remapGallery(ids, mediaMap) {
  return (ids ?? []).map((id) => mediaMap.get(id)).filter(Boolean);
}

async function main() {
  loadEnvFile(path.join(ROOT, '.env.local'));
  loadEnvFile(path.join(ROOT, '.env.vercel'));

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (!url || !serviceKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const destBases = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'scripts/_benroso-dest-bases.json'), 'utf8')
  );
  const { translations, accommodations, mediaAssets } = loadDumps();
  const destById = new Map(destBases.map((dest) => [dest.id, dest]));
  const mediaById = new Map(mediaAssets.map((asset) => [asset.id, asset]));

  const { data: nrDestRows, error: destErr } = await supabase
    .from('destination_translations')
    .select('destination_id, slug, name')
    .eq('locale', 'en');
  if (destErr) throw destErr;

  const { data: nrAccomRows, error: accomErr } = await supabase
    .from('accommodation_translations')
    .select('accommodation_id, slug')
    .eq('locale', 'en');
  if (accomErr) throw accomErr;

  const nrDests = nrDestRows ?? [];
  const existingAccomSlugs = new Set((nrAccomRows ?? []).map((row) => row.slug));

  const destIdMap = new Map();
  for (const [benrosoId, slug] of Object.entries(BENROSO_DEST_SLUGS)) {
    const match = findNrDestination(slug, nrDests);
    if (match) destIdMap.set(benrosoId, match.destination_id);
  }

  const destsToInsert = translations.filter((translation) => {
    const match = findNrDestination(translation.slug, nrDests);
    return !match;
  });
  const accomsToInsert = accommodations.filter((accom) => !existingAccomSlugs.has(accom.slug));

  const neededMediaIds = collectMediaIds(
    destsToInsert.map((translation) => destById.get(translation.destination_id)).filter(Boolean),
    accomsToInsert
  );
  const assetsToCopy = [...neededMediaIds]
    .map((id) => mediaById.get(id))
    .filter(Boolean);

  console.log(
    `Seeding ${destsToInsert.length} destination drafts, ${accomsToInsert.length} accommodation drafts, ${assetsToCopy.length} images`
  );

  const mediaMap = new Map();
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  let uploaded = 0;
  let linkedRemote = 0;

  await mapPool(assetsToCopy, 5, async (asset) => {
    const sourceUrl = mediaUrl(asset);
    const newId = randomUUID();
    try {
      const response = await fetch(sourceUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      const ext = extFrom(sourceUrl, response.headers.get('content-type') ?? '');
      const objectPath = `${year}/${month}/${newId}.${ext}`;
      const contentType = response.headers.get('content-type') || `image/${ext === 'jpg' ? 'jpeg' : ext}`;
      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(objectPath, bytes, { contentType, cacheControl: '31536000', upsert: false });
      if (uploadError) throw uploadError;
      const { data: publicUrl } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(objectPath);
      const { error: insertError } = await supabase.from('media_assets').insert({
        id: newId,
        bucket: MEDIA_BUCKET,
        path: objectPath,
        url: publicUrl.publicUrl,
        title: rebrand(asset.title),
        alt: rebrand(asset.alt),
        caption: rebrand(asset.caption),
        focal_point: asset.focal_point,
        dominant_color: asset.dominant_color,
        created_by: null
      });
      if (insertError) throw insertError;
      mediaMap.set(asset.id, newId);
      uploaded += 1;
    } catch (error) {
      const ext = extFrom(sourceUrl, '');
      const objectPath = `imported/benroso/${asset.id}.${ext}`;
      const { error: insertError } = await supabase.from('media_assets').insert({
        id: newId,
        bucket: MEDIA_BUCKET,
        path: objectPath,
        url: sourceUrl,
        title: rebrand(asset.title),
        alt: rebrand(asset.alt),
        caption: rebrand(asset.caption),
        focal_point: asset.focal_point,
        dominant_color: asset.dominant_color,
        created_by: null
      });
      if (insertError) {
        console.warn(`Skipped media ${asset.id}: ${insertError.message}`);
        return;
      }
      mediaMap.set(asset.id, newId);
      linkedRemote += 1;
      console.warn(`Linked remote media ${asset.id}: ${error.message}`);
    }
    if ((uploaded + linkedRemote) % 25 === 0) {
      console.log(`Media progress ${uploaded + linkedRemote}/${assetsToCopy.length}`);
    }
  });

  console.log(`Media done: ${uploaded} uploaded, ${linkedRemote} remote-linked`);

  let destInserted = 0;
  for (const translation of destsToInsert) {
    const base = destById.get(translation.destination_id);
    if (!base) {
      console.warn(`Missing dest base for ${translation.slug}`);
      continue;
    }
    const newId = randomUUID();
    const { error: baseError } = await supabase.from('destinations').insert({
      id: newId,
      country: normalizeCountry(base.country),
      region: rebrand(base.region),
      gallery: remapGallery(base.gallery, mediaMap),
      wildlife: rebrand(base.wildlife ?? []),
      best_time: rebrand(base.best_time ?? { summary: '' }),
      latitude: base.latitude ?? null,
      longitude: base.longitude ?? null,
      status: 'draft',
      deleted_at: null
    });
    if (baseError) {
      console.error(`Dest ${translation.slug}: ${baseError.message}`);
      continue;
    }
    const { error: trError } = await supabase.from('destination_translations').insert({
      destination_id: newId,
      locale: 'en',
      name: rebrand(translation.name).trim(),
      slug: translation.slug,
      summary: rebrand(translation.summary),
      description: rebrand(translation.description),
      faqs: rebrand(translation.faqs ?? []),
      keywords: rebrand(translation.keywords ?? []),
      seo_title: rebrand(translation.seo_title),
      seo_description: rebrand(translation.seo_description),
      focus_keyword: rebrand(translation.focus_keyword),
      direct_answers: rebrand(translation.direct_answers ?? []),
      published_at: null,
      og_image_id: null
    });
    if (trError) {
      console.error(`Dest translation ${translation.slug}: ${trError.message}`);
      await supabase.from('destinations').delete().eq('id', newId);
      continue;
    }
    destIdMap.set(translation.destination_id, newId);
    destInserted += 1;
    console.log(`Draft dest ${translation.slug}`);
  }

  let accomInserted = 0;
  for (const accom of accomsToInsert) {
    const newId = randomUUID();
    const destinationId = accom.destination_id
      ? destIdMap.get(accom.destination_id) ?? null
      : null;
    const { error: baseError } = await supabase.from('accommodations').insert({
      id: newId,
      destination_id: destinationId,
      country: normalizeCountry(accom.country),
      region: rebrand(accom.region),
      map_query: accom.map_query,
      property_type: accom.property_type,
      comfort_level: accom.comfort_level,
      availability: accom.availability,
      price_per_night: accom.price_per_night,
      amenities: rebrand(accom.amenities ?? []),
      room_types: rebrand(accom.room_types ?? []),
      gallery: remapGallery(accom.gallery, mediaMap),
      status: 'draft',
      deleted_at: null
    });
    if (baseError) {
      console.error(`Accom ${accom.slug}: ${baseError.message}`);
      continue;
    }
    const { error: trError } = await supabase.from('accommodation_translations').insert({
      accommodation_id: newId,
      locale: 'en',
      name: rebrand(accom.name).trim(),
      slug: accom.slug,
      summary: rebrand(accom.summary),
      description: rebrand(accom.description),
      faqs: rebrand(accom.faqs ?? []),
      keywords: rebrand(accom.keywords ?? []),
      seo_title: rebrand(accom.seo_title),
      seo_description: rebrand(accom.seo_description),
      focus_keyword: rebrand(accom.focus_keyword),
      direct_answers: rebrand(accom.direct_answers ?? []),
      published_at: null,
      og_image_id: accom.og_image_id ? mediaMap.get(accom.og_image_id) ?? null : null
    });
    if (trError) {
      console.error(`Accom translation ${accom.slug}: ${trError.message}`);
      await supabase.from('accommodations').delete().eq('id', newId);
      continue;
    }
    accomInserted += 1;
    console.log(`Draft accom ${accom.slug}`);
  }

  console.log(
    JSON.stringify(
      {
        destinationsInserted: destInserted,
        accommodationsInserted: accomInserted,
        mediaUploaded: uploaded,
        mediaRemoteLinked: linkedRemote,
        skippedDestinations: translations.length - destsToInsert.length,
        skippedAccommodations: accommodations.length - accomsToInsert.length
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
