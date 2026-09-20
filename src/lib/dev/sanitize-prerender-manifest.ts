import fs from 'node:fs';
import path from 'node:path';

function extractFirstJsonObject(text: string): string | null {
  const start = text.indexOf('{');
  if (start < 0) {
    return null;
  }

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escape) {
        escape = false;
        continue;
      }
      if (ch === '\\') {
        escape = true;
        continue;
      }
      if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '{') {
      depth += 1;
    } else if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        const candidate = text.slice(start, i + 1);
        JSON.parse(candidate);
        return candidate;
      }
    }
  }

  return null;
}

function sanitizeManifestFile(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const text = fs.readFileSync(filePath, 'utf8');
  try {
    JSON.parse(text);
    return;
  } catch {
    try {
      const repaired = extractFirstJsonObject(text);
      if (!repaired) {
        return;
      }
      fs.writeFileSync(filePath, repaired);
    } catch {
      // Leave the file for Next to regenerate if repair also fails.
    }
  }
}

export function sanitizePrerenderManifest(): void {
  const cwd = process.cwd();
  sanitizeManifestFile(path.join(cwd, '.next', 'dev', 'prerender-manifest.json'));
  sanitizeManifestFile(path.join(cwd, '.next', 'prerender-manifest.json'));
}
