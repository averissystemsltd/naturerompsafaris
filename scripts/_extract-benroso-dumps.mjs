import fs from 'node:fs';

const FILES = {
  destTranslations:
    'C:/Users/ADMIN/.cursor/projects/c-Users-ADMIN-Desktop-kenyatanzania-naturerompsafaris/agent-tools/b3eba931-4eb3-491b-9b73-273cd8a65b96.txt',
  accomsAL:
    'C:/Users/ADMIN/.cursor/projects/c-Users-ADMIN-Desktop-kenyatanzania-naturerompsafaris/agent-tools/ae0d6491-572d-41df-8347-8b3e3e35c48b.txt',
  accomsMZ:
    'C:/Users/ADMIN/.cursor/projects/c-Users-ADMIN-Desktop-kenyatanzania-naturerompsafaris/agent-tools/6f702686-9bb0-440b-b12d-8da6e6e9c625.txt',
  media:
    'C:/Users/ADMIN/.cursor/projects/c-Users-ADMIN-Desktop-kenyatanzania-naturerompsafaris/agent-tools/1eaad301-6ff0-404c-862d-67e7cbefb207.txt'
};

export function extractMcpJson(file) {
  const raw = fs.readFileSync(file, 'utf8');
  let text = raw;
  if (raw.trimStart().startsWith('{')) {
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed.result === 'string') {
        text = parsed.result;
      }
    } catch {
      // File is the raw MCP transcript, not a JSON wrapper.
    }
  }
  const match = text.match(/<untrusted-data-[^>]+>\r?\n(\[[\s\S]*?)\r?\n<\/untrusted-data-/);
  if (!match) {
    throw new Error(`No MCP payload in ${file}`);
  }
  return JSON.parse(match[1]);
}

export function loadDumps() {
  const destT = extractMcpJson(FILES.destTranslations);
  const accomA = extractMcpJson(FILES.accomsAL);
  const accomB = extractMcpJson(FILES.accomsMZ);
  const media = extractMcpJson(FILES.media);

  const translations = destT[0]?.translations ?? destT.translations ?? destT;
  const accommodations = [
    ...(accomA[0]?.accommodations ?? accomA[0]?.rows ?? accomA.accommodations ?? accomA.rows ?? []),
    ...(accomB[0]?.accommodations ?? accomB[0]?.rows ?? accomB.accommodations ?? accomB.rows ?? [])
  ];
  const mediaAssets = media[0]?.media ?? media.media ?? [];

  return { translations, accommodations, mediaAssets, raw: { destT, accomA, accomB, media } };
}

if (process.argv.includes('--inspect')) {
  const { translations, accommodations, mediaAssets, raw } = loadDumps();
  console.log('destT wrapper', Object.keys(raw.destT[0] ?? raw.destT));
  console.log('dest translations', translations.length, translations[0] && Object.keys(translations[0]));
  console.log('accom A wrapper', Object.keys(raw.accomA[0] ?? raw.accomA));
  console.log('accoms', accommodations.length, accommodations[0] && Object.keys(accommodations[0]));
  console.log('first accom slug', accommodations[0]?.slug, accommodations[0]?.destination_id);
  console.log('media wrapper', Object.keys(raw.media[0] ?? raw.media));
  console.log('media', mediaAssets.length, mediaAssets[0]);
}
